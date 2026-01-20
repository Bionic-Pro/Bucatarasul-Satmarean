import React, { useState } from 'react';
import { CATEGORIES, PREDEFINED_INGREDIENTS } from '../constants';
import { Check, Plus, X, Search, Filter, ChevronDown } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAddCustom(customInput.trim());
      setCustomInput('');
    }
  };

  // Filter logic: Filter by category AND search term
  const filteredIngredients = PREDEFINED_INGREDIENTS.filter(i => 
    i.category === activeTab && 
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-stone-900 rounded-3xl shadow-xl shadow-black/50 overflow-hidden border border-stone-800 mb-8 transition-all duration-300">
      {/* Header Section */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-950 p-6 text-white relative overflow-hidden border-b border-brand-900 cursor-pointer group hover:bg-brand-900/80 transition-colors"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Search size={120} />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-stone-100">
              <span className="bg-brand-600 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg text-white">1</span>
              Ce ai în cămară?
            </h2>
            <p className="text-brand-200/60 text-sm mt-1 pl-10">
              {isOpen ? 'Selectează ingredientele principale.' : 'Apasă pentru a deschide lista de ingrediente.'}
            </p>
          </div>
          
          <div className={`bg-brand-900/50 p-2 rounded-full border border-brand-800 text-brand-200 shadow-lg transition-transform duration-300 group-hover:bg-brand-800 group-hover:border-brand-600 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown size={24} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="animate-fade-in">
          {/* Category Tabs */}
          <div className="bg-stone-950 border-b border-stone-800 p-3">
            <div className="flex overflow-x-auto gap-2 scrollbar-hide pb-1">
              {(Object.entries(CATEGORIES) as [keyof typeof CATEGORIES, {label: string, icon: React.ReactNode}][]).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setSearchTerm(''); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all duration-200 ${
                    activeTab === key 
                      ? 'bg-brand-700 text-white shadow-lg shadow-brand-900/50 ring-1 ring-brand-500' 
                      : 'bg-stone-900 text-stone-500 border border-stone-800 hover:bg-stone-800 hover:text-stone-300'
                  }`}
                >
                  {value.icon}
                  {value.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Grid */}
          <div className="p-6 min-h-[240px] bg-stone-900">
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-stone-500" />
              </div>
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Caută în ${CATEGORIES[activeTab].label}...`}
                className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all text-sm"
              />
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((ing) => {
                  const isSelected = selectedIds.includes(ing.name);
                  return (
                    <button
                      key={ing.id}
                      onClick={() => onToggle(ing.name)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm text-left transition-all duration-200 group ${
                        isSelected
                          ? 'bg-brand-900/50 text-white font-bold ring-1 ring-brand-500 shadow-md shadow-brand-900/20'
                          : 'bg-stone-950 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      <span>{ing.name}</span>
                      {isSelected ? (
                        <Check size={16} className="text-brand-400" />
                      ) : (
                        <Plus size={16} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-stone-600">
                  <Filter size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nu am găsit ingrediente care să conțină "{searchTerm}" în această categorie.</p>
                </div>
              )}
            </div>

            {/* Custom Input */}
            <div className="bg-stone-950 rounded-2xl p-4 border border-stone-800">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">
                Nu găsești ceva? Adaugă manual:
              </label>
              <form onSubmit={handleCustomSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="ex: Leuștean, Quinoa..."
                  className="flex-1 px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-stone-200 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!customInput.trim()}
                  className="bg-stone-800 text-white p-3 rounded-xl hover:bg-stone-700 disabled:opacity-50 transition-all shadow-lg active:scale-95 border border-stone-700"
                >
                  <Plus size={24} />
                </button>
              </form>

              {customIngredients.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {customIngredients.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 bg-brand-900/30 text-brand-300 border border-brand-900/50 px-3 py-1.5 rounded-full text-sm font-medium">
                      {item}
                      <button onClick={() => onRemoveCustom(item)} className="hover:text-red-400 ml-1 transition-colors">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};