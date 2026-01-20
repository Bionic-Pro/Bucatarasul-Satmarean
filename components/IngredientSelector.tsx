import React, { useState } from 'react';
import { CATEGORIES, PREDEFINED_INGREDIENTS } from '../constants';
import { Check, Plus, X } from 'lucide-react';
import { Ingredient } from '../types';

interface Props {
  selectedIds: string[];
  onToggle: (id: string) => void;
  customIngredients: string[];
  onAddCustom: (name: string) => void;
  onRemoveCustom: (name: string) => void;
}

export const IngredientSelector: React.FC<Props> = ({ 
  selectedIds, 
  onToggle, 
  customIngredients, 
  onAddCustom, 
  onRemoveCustom 
}) => {
  const [activeTab, setActiveTab] = useState<keyof typeof CATEGORIES>('legume');
  const [customInput, setCustomInput] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAddCustom(customInput.trim());
      setCustomInput('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">1. Ce ai în cămară?</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto p-2 gap-2 scrollbar-hide">
        {(Object.entries(CATEGORIES) as [keyof typeof CATEGORIES, {label: string, icon: React.ReactNode}][]).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              activeTab === key 
                ? 'bg-brand-900 text-white shadow-md shadow-brand-900/20 ring-2 ring-brand-900' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {value.icon}
            {value.label}
          </button>
        ))}
      </div>

      {/* Ingredients Grid */}
      <div className="p-4 min-h-[200px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {PREDEFINED_INGREDIENTS.filter(i => i.category === activeTab).map((ing) => {
            const isSelected = selectedIds.includes(ing.name);
            return (
              <button
                key={ing.id}
                onClick={() => onToggle(ing.name)}
                className={`flex items-center justify-between p-3 rounded-xl border text-sm text-left transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 text-brand-900 font-semibold ring-1 ring-brand-500'
                    : 'border-slate-200 text-slate-600 hover:border-brand-200 hover:bg-slate-50'
                }`}
              >
                <span>{ing.name}</span>
                {isSelected && <Check size={16} className="text-brand-600" />}
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nu găsești ceva? Adaugă manual:
          </label>
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="ex: Leuștean, Quinoa..."
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
            <button 
              type="submit"
              disabled={!customInput.trim()}
              className="bg-slate-800 text-white p-2 rounded-xl hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              <Plus size={24} />
            </button>
          </form>

          {customIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {customIngredients.map((item) => (
                <span key={item} className="inline-flex items-center gap-1 bg-accent-50 text-accent-700 border border-accent-200 px-3 py-1 rounded-full text-sm">
                  {item}
                  <button onClick={() => onRemoveCustom(item)} className="hover:text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
