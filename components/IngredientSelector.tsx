import React, { useState, useMemo } from 'react';
import { CATEGORIES, PREDEFINED_INGREDIENTS, SMOOTHIE_PRESETS } from '../constants';
import { Check, Plus, Search, ChevronDown, ChevronUp, Zap, Sparkles, Dices, X } from 'lucide-react';
import { Ingredient } from '../types';

interface Props {
  selectedIds: string[];
  onToggle: (id: string) => void;
  onSelectBatch?: (ids: string[]) => void;
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

const SubCategoryGroup: React.FC<{ 
  title: string; 
  ingredients: Ingredient[]; 
  selectedIds: string[]; 
  onToggle: (id: string) => void; 
}> = ({ title, ingredients, selectedIds, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Count selected items in this group
  const selectedCount = ingredients.filter(i => selectedIds.includes(i.name)).length;

  return (
    <div className="mb-3 rounded-2xl bg-stone-950/40 border border-stone-800 overflow-hidden">
       <button 
         onClick={() => setIsExpanded(!isExpanded)}
         className="w-full flex items-center justify-between p-4 hover:bg-stone-900/50 transition-colors"
       >
         <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wide">{title}</h3>
            {selectedCount > 0 && (
              <span className="bg-roBlue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {selectedCount}
              </span>
            )}
         </div>
         {isExpanded ? <ChevronUp size={16} className="text-stone-500" /> : <ChevronDown size={16} className="text-stone-500" />}
       </button>
       
       {isExpanded && (
          <div className="p-4 pt-0 grid grid-cols-2 md:grid-cols-3 gap-3 animate-fade-in border-t border-stone-800/50 mt-2 bg-stone-900/20">
             {ingredients.map((ing) => {
                const isSelected = selectedIds.includes(ing.name);
                return (
                  <button
                    key={ing.id}
                    onClick={() => onToggle(ing.name)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                      isSelected
                        ? 'bg-roBlue-600/20 border-roBlue-500 text-roBlue-100 ring-1 ring-roBlue-500/30'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    <span className="truncate mr-2">{ing.name}</span>
                    {isSelected ? <Check size={12} className="text-roBlue-400 shrink-0" /> : <Plus size={12} className="opacity-20 shrink-0" />}
                  </button>
                );
             })}
          </div>
       )}
    </div>
  );
};

export const IngredientSelector: React.FC<Props> = ({ 
  selectedIds, 
  onToggle, 
  onSelectBatch,
  customIngredients, 
  onAddCustom, 
  onRemoveCustom 
}) => {
  const [activeTab, setActiveTab] = useState<keyof typeof CATEGORIES>('legume');
  const [customInput, setCustomInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showSurpriseOptions, setShowSurpriseOptions] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onAddCustom(customInput.trim());
      setCustomInput('');
    }
  };

  const handleSurpriseMe = (count: number) => {
    if (!onSelectBatch) return;

    // Helper to pick random item from array
    const pickRandom = (arr: Ingredient[]) => arr[Math.floor(Math.random() * arr.length)];
    const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);

    const meatOptions = PREDEFINED_INGREDIENTS.filter(i => i.category === 'carne');
    const vegOptions = PREDEFINED_INGREDIENTS.filter(i => i.category === 'legume');
    const dairyOptions = PREDEFINED_INGREDIENTS.filter(i => i.category === 'lactate');
    const baseOptions = PREDEFINED_INGREDIENTS.filter(i => i.category === 'baza');
    const fruitOptions = PREDEFINED_INGREDIENTS.filter(i => i.category === 'fructe');

    let surpriseIngredients: string[] = [];

    // 1. Core Structure (The Ardelenesc Foundation - 5 items)
    if (meatOptions.length) surpriseIngredients.push(pickRandom(meatOptions).name);
    if (vegOptions.length) {
       surpriseIngredients.push(pickRandom(vegOptions).name);
       // Ensure variety in veggies
       const secondVeg = pickRandom(vegOptions).name;
       if (!surpriseIngredients.includes(secondVeg)) surpriseIngredients.push(secondVeg);
    }
    if (dairyOptions.length) surpriseIngredients.push(pickRandom(dairyOptions).name);
    if (baseOptions.length) surpriseIngredients.push(pickRandom(baseOptions).name);

    // 2. Fill the rest up to `count` with random items from ALL valid categories
    const allOptions = [...meatOptions, ...vegOptions, ...dairyOptions, ...baseOptions, ...fruitOptions];
    
    while (surpriseIngredients.length < count) {
      const candidate = pickRandom(allOptions).name;
      if (!surpriseIngredients.includes(candidate)) {
        surpriseIngredients.push(candidate);
      }
    }

    // 3. Trim if somehow we got too many (unlikely due to logic, but safe)
    surpriseIngredients = surpriseIngredients.slice(0, count);

    onSelectBatch(shuffle(surpriseIngredients));
    setShowSurpriseOptions(false); // Close menu
  };

  const filteredIngredients = PREDEFINED_INGREDIENTS.filter(i => 
    i.category === activeTab && 
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedIngredients = useMemo(() => {
    const groups: Record<string, Ingredient[]> = {};
    const noGroup: Ingredient[] = [];

    filteredIngredients.forEach(ing => {
      if (ing.subCategory) {
        if (!groups[ing.subCategory]) groups[ing.subCategory] = [];
        groups[ing.subCategory].push(ing);
      } else {
        noGroup.push(ing);
      }
    });

    return { groups, noGroup };
  }, [filteredIngredients]);

  const hasSubCategories = Object.keys(groupedIngredients.groups).length > 0;

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
            <div className="flex flex-col gap-3">
              {/* Special Surprise Button & Options */}
              {onSelectBatch && (
                <div className="mb-2">
                  {!showSurpriseOptions ? (
                    <button
                      onClick={() => setShowSurpriseOptions(true)}
                      className="w-full bg-gradient-to-r from-roYellow-600 to-roYellow-700 hover:from-roYellow-500 hover:to-roYellow-600 text-white py-3 rounded-xl shadow-lg border border-roYellow-500/50 flex items-center justify-center gap-2 transition-all transform active:scale-95 group"
                    >
                      <Dices className="group-hover:rotate-180 transition-transform duration-500" size={18} />
                      <span className="font-black text-xs uppercase tracking-widest">Surprinde-mă (Coșul Zilei)</span>
                    </button>
                  ) : (
                    <div className="bg-roYellow-950/30 border border-roYellow-500/30 rounded-xl p-4 animate-fade-in">
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-black text-roYellow-500 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={12} /> Câte ingrediente?
                          </span>
                          <button onClick={() => setShowSurpriseOptions(false)} className="text-stone-500 hover:text-white">
                            <X size={14} />
                          </button>
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                          {[5, 7, 9, 11].map(num => (
                            <button
                              key={num}
                              onClick={() => handleSurpriseMe(num)}
                              className="bg-stone-900 hover:bg-roYellow-600 hover:text-white text-stone-300 py-3 rounded-lg border border-stone-800 hover:border-roYellow-500 transition-all font-black text-sm shadow-md"
                            >
                              {num}
                            </button>
                          ))}
                       </div>
                    </div>
                  )}
                </div>
              )}

              {/* Categories */}
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
          </div>

          <div className="p-6 bg-transparent">
            {/* Smoothie Presets Section */}
            {activeTab === 'smoothie' && !searchTerm && onSelectBatch && (
               <div className="mb-8">
                  <h3 className="text-xs font-bold text-roBlue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap size={14} className="text-roYellow-400" fill="currentColor" /> Preseturi Rapide
                  </h3>
                  <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
                    {SMOOTHIE_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => onSelectBatch(preset.ingredients)}
                        className="shrink-0 w-40 bg-stone-950/60 p-4 rounded-2xl border border-stone-800 hover:border-roBlue-500 hover:bg-stone-900 transition-all group text-left flex flex-col justify-between"
                      >
                         <div className="mb-2">
                           <span className="text-[9px] font-black uppercase text-stone-600 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800 group-hover:border-roBlue-900 group-hover:text-roBlue-400 transition-colors">
                             {preset.category}
                           </span>
                         </div>
                         <h4 className="text-xs font-bold text-stone-200 group-hover:text-white mb-2 leading-tight">
                           {preset.name}
                         </h4>
                         <div className="text-[10px] text-stone-500 line-clamp-2">
                           {preset.ingredients.slice(0, 3).join(', ')}...
                         </div>
                         <div className="mt-2 text-[10px] font-bold text-roBlue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Sparkles size={10} /> Adaugă Tot
                         </div>
                      </button>
                    ))}
                  </div>
               </div>
            )}

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

            {hasSubCategories && !searchTerm ? (
              <div className="space-y-2 mb-8">
                {Object.entries(groupedIngredients.groups).map(([subCat, items]) => (
                  <SubCategoryGroup 
                    key={subCat} 
                    title={subCat} 
                    ingredients={items} 
                    selectedIds={selectedIds} 
                    onToggle={onToggle} 
                  />
                ))}
                {groupedIngredients.noGroup.length > 0 && (
                   <SubCategoryGroup 
                     title="Altele" 
                     ingredients={groupedIngredients.noGroup} 
                     selectedIds={selectedIds} 
                     onToggle={onToggle} 
                   />
                )}
              </div>
            ) : (
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
            )}

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