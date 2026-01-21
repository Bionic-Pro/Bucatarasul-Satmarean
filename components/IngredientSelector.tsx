import React, { useState } from 'react';
import { CATEGORIES, PREDEFINED_INGREDIENTS } from '../constants';
import { Check, Plus, X, Search, Filter, ChevronDown } from 'lucide-react';

interface Props {
  selectedIds: string[];
  onToggle: (id: string) => void;
  customIngredients: string[];
  onAddCustom: (name: string) => void;
  onRemoveCustom: (name: string) => void;
}

const CollapsibleHeader: React.FC<{ isOpen: boolean; onClick: () => void; step: string; title: string; subtitle: string }> = ({ isOpen, onClick, step, title, subtitle }) => (
  <div 
    onClick={onClick}
    className="bg-roBlue-950/40 p-6 text-white relative overflow-hidden border-b border-roBlue-800/50 cursor-pointer group hover:bg-roBlue-900/60 transition-colors"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Search size={100} />
    </div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-roBlue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg border border-roBlue-400/30">{step}</span>
          {title}
        </h2>
        <p className="text-roBlue-200/60 text-xs mt-1.5 pl-10 font-medium">
          {isOpen ? subtitle : 'Selectează ingredientele pe care le ai acasă.'}
        </p>
      </div>
      <div className={`p-2 rounded-full border border-roBlue-800 text-roBlue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <ChevronDown size={20} />
      </div>
    </div>
  </div>
);

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

  const filteredIngredients = PREDEFINED_INGREDIENTS.filter(i => 
    i.category === activeTab && 
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-stone-900/40 rounded-[2rem] shadow-xl overflow-hidden border border-white/5 mb-6 transition-all">
      <CollapsibleHeader 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
        step="1" 
        title="Ingrediente Locale" 
        subtitle="Ce bunătăți ai în cămară?"
      />

      {isOpen && (
        <div className="animate-fade-in">
          <div className="bg-stone-950/50 p-4 border-b border-white/5">
            <div className="flex overflow-x-auto gap-2 scrollbar-hide pb-1">
              {(Object.entries(CATEGORIES) as [keyof typeof CATEGORIES, {label: string, icon: React.ReactNode}][]).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setSearchTerm(''); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap text-xs font-bold transition-all border ${
                    activeTab === key 
                      ? 'bg-roBlue-600 text-white border-roBlue-400 shadow-lg shadow-roBlue-900/40' 
                      : 'bg-stone-900/80 text-stone-500 border-stone-800 hover:text-stone-300'
                  }`}
                >
                  {value.icon}
                  {value.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-transparent">
            <div className="relative mb-6">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Caută în ${CATEGORIES[activeTab].label}...`}
                className="w-full pl-11 pr-4 py-3 bg-stone-950 border border-stone-800 rounded-2xl text-stone-200 text-sm focus:border-roBlue-500/50 focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {filteredIngredients.map((ing) => {
                const isSelected = selectedIds.includes(ing.name);
                return (
                  <button
                    key={ing.id}
                    onClick={() => onToggle(ing.name)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold text-left transition-all border ${
                      isSelected
                        ? 'bg-roBlue-600/20 border-roBlue-500 text-roBlue-100 ring-1 ring-roBlue-500/30'
                        : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    <span>{ing.name}</span>
                    {isSelected ? <Check size={14} className="text-roBlue-400" /> : <Plus size={14} className="opacity-20" />}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleCustomSubmit} className="bg-stone-950/40 p-4 rounded-2xl border border-white/5">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3">Alt ingredient:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="ex: Magiun, Slănină..."
                  className="flex-1 px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-sm focus:border-roBlue-500/50 outline-none"
                />
                <button type="submit" className="bg-roBlue-700 p-3 rounded-xl text-white hover:bg-roBlue-600 transition-all">
                  <Plus size={24} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};