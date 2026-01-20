import React, { useState } from 'react';
import { CATEGORIES, PREDEFINED_INGREDIENTS } from '../constants';
import { Check, Plus, X, Search } from 'lucide-react';
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
    <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden border border-white/50 mb-8">
      {/* Header Section */}
      <div className="bg-brand-900 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Search size={64} />
        </div>
        <h2 className="text-xl font-bold relative z-10 flex items-center gap-2">
          <span className="bg-brand-500 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg">1</span>
          Ce ai în cămară?
        </h2>
        <p className="text-brand-100 text-sm mt-1 relative z-10 opacity-80 pl-10">
          Selectează ingredientele principale pe care vrei să le folosim.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="bg-stone-50 border-b border-stone-200 p-3">
        <div className="flex overflow-x-auto gap-2 scrollbar-hide pb-1">
          {(Object.entries(CATEGORIES) as [keyof typeof CATEGORIES, {label: string, icon: React.ReactNode}][]).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all duration-200 ${
                activeTab === key 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20 transform scale-105' 
                  : 'bg-white text-stone-500 border border-stone-200 hover:bg-white hover:text-brand-600'
              }`}
            >
              {value.icon}
              {value.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="p-6 min-h-[240px] bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {PREDEFINED_INGREDIENTS.filter(i => i.category === activeTab).map((ing) => {
            const isSelected = selectedIds.includes(ing.name);
            return (
              <button
                key={ing.id}
                onClick={() => onToggle(ing.name)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-50 text-brand-900 font-bold ring-2 ring-brand-500 shadow-sm transform scale-[1.02]'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-transparent hover:border-stone-200'
                }`}
              >
                <span>{ing.name}</span>
                {isSelected && <Check size={16} className="text-brand-600" />}
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">
            Nu găsești ceva? Adaugă manual:
          </label>
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="ex: Leuștean, Quinoa..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 focus:outline-none focus:border-brand-500 focus:ring-0 bg-white transition-colors"
            />
            <button 
              type="submit"
              disabled={!customInput.trim()}
              className="bg-stone-800 text-white p-3 rounded-xl hover:bg-black disabled:opacity-50 transition-all shadow-lg active:scale-95"
            >
              <Plus size={24} />
            </button>
          </form>

          {customIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {customIngredients.map((item) => (
                <span key={item} className="inline-flex items-center gap-1 bg-accent-50 text-accent-700 border border-accent-200 px-3 py-1.5 rounded-full text-sm font-medium">
                  {item}
                  <button onClick={() => onRemoveCustom(item)} className="hover:text-red-500 ml-1">
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