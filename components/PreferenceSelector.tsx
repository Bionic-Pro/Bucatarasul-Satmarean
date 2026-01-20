import React, { useState } from 'react';
import { Baby, User, Users, Coffee, UtensilsCrossed, Apple, Milk, EyeOff, Minus, Plus, Ban, Sprout, Settings2, ShieldAlert, ChevronDown } from 'lucide-react';
import { AgeGroup, MealType } from '../types';
import { ROMANIAN_SPICES, COMMON_ALLERGENS } from '../constants';

interface Props {
  ageGroup: AgeGroup;
  setAgeGroup: (val: AgeGroup) => void;
  mealType: MealType;
  setMealType: (val: MealType) => void;
  hideVeggies: boolean;
  setHideVeggies: (val: boolean) => void;
  portions: number;
  setPortions: (val: number) => void;
  avoidIngredients: string;
  setAvoidIngredients: (val: string) => void;
  allergens: string[];
  setAllergens: (val: string[]) => void;
  spices: string[];
  setSpices: (val: string[]) => void;
}

export const PreferenceSelector: React.FC<Props> = ({ 
  ageGroup, setAgeGroup,
  mealType, setMealType,
  hideVeggies, setHideVeggies,
  portions, setPortions,
  avoidIngredients, setAvoidIngredients,
  allergens, setAllergens,
  spices, setSpices
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isChild = ageGroup !== 'adult';

  const toggleSpice = (spice: string) => {
    if (spices.includes(spice)) {
      setSpices(spices.filter(s => s !== spice));
    } else {
      setSpices([...spices, spice]);
    }
  };

  const toggleAllergen = (allergen: string) => {
    if (allergens.includes(allergen)) {
      setAllergens(allergens.filter(a => a !== allergen));
    } else {
      setAllergens([...allergens, allergen]);
    }
  };

  return (
    <div className="bg-stone-900 rounded-3xl shadow-xl shadow-black/50 overflow-hidden mb-8 border border-stone-800 transition-all duration-300">
      {/* Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-stone-950 p-6 text-white flex items-center justify-between border-b border-stone-800 cursor-pointer group hover:bg-stone-900 transition-colors relative overflow-hidden"
      >
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Settings2 size={100} />
         </div>

         <div className="flex items-center gap-3 relative z-10">
            <span className="bg-stone-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg text-stone-300 ring-1 ring-stone-700">2</span>
            <div>
                <h2 className="text-xl font-bold text-stone-100">Configurează Masa</h2>
                <p className="text-stone-500 text-sm mt-0.5">
                  {isOpen ? 'Personalizează experiența culinară.' : 'Apasă pentru a deschide opțiunile.'}
                </p>
            </div>
         </div>

         <div className={`bg-stone-900 p-2 rounded-full border border-stone-800 text-stone-400 shadow-lg transition-transform duration-300 group-hover:bg-stone-800 group-hover:text-stone-200 relative z-10 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown size={24} />
         </div>
      </div>
      
      {isOpen && (
      <div className="p-6 md:p-8 space-y-10 animate-fade-in">
        {/* Age Selector */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">
            Pentru cine gătim?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {[
               { val: '1-3', label: '1-3 Ani', sub: 'Toddler', icon: <Baby size={24}/> },
               { val: '4-8', label: '4-8 Ani', sub: 'Școlar', icon: <User size={24}/> },
               { val: '9-13', label: '9-13 Ani', sub: 'Pre-teen', icon: <User size={24}/> },
               { val: 'adult', label: 'Adulți', sub: 'General', icon: <Users size={24}/> },
             ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setAgeGroup(opt.val as AgeGroup)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 ${
                    ageGroup === opt.val 
                      ? 'bg-brand-900 border-brand-700 text-white shadow-lg shadow-brand-900/20 ring-1 ring-brand-600' 
                      : 'bg-stone-950 border-stone-800 text-stone-500 hover:border-brand-900 hover:bg-stone-900 hover:text-stone-300'
                  }`}
                >
                  <div className={`mb-2 ${ageGroup === opt.val ? 'text-brand-300' : 'text-stone-600'}`}>
                    {opt.icon}
                  </div>
                  <span className="font-bold text-sm">{opt.label}</span>
                  <span className="text-[10px] opacity-60 font-medium tracking-wide mt-1">{opt.sub}</span>
                </button>
             ))}
          </div>
        </div>

        {/* Meal Type Selector */}
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">
            Tipul Mesei
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: 'mic_dejun', label: 'Mic Dejun', icon: <Coffee size={20}/> },
              { val: 'pranz_cina', label: 'Prânz / Cină', icon: <UtensilsCrossed size={20}/> },
              { val: 'gustare', label: 'Gustare', icon: <Apple size={20}/> },
              { val: 'smoothie', label: 'Smoothie', icon: <Milk size={20}/> },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setMealType(opt.val as MealType)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all text-left ${
                  mealType === opt.val 
                    ? 'bg-brand-900 border-brand-700 text-white shadow-md font-bold ring-1 ring-brand-600' 
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                }`}
              >
                <div className={mealType === opt.val ? 'text-brand-300' : 'text-stone-600'}>
                  {opt.icon}
                </div>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Allergens Section */}
        <div className="bg-stone-950 p-5 rounded-2xl border border-red-900/30">
           <label className="block text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert size={16} /> Alergeni & Sănătate
           </label>
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COMMON_ALLERGENS.map((allergen) => {
                 const isSelected = allergens.includes(allergen.label);
                 return (
                   <button
                    key={allergen.id}
                    onClick={() => toggleAllergen(allergen.label)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected 
                        ? 'bg-red-900/50 text-red-200 border-red-700 shadow-md ring-1 ring-red-800'
                        : 'bg-stone-900 text-stone-500 border-stone-800 hover:border-red-900/50 hover:text-red-300'
                    }`}
                   >
                     {allergen.label}
                   </button>
                 );
              })}
           </div>
        </div>

        {/* Avoid Ingredients & Spices */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Ban size={14} className="text-stone-400" /> Alte Ingrediente de Evitat
            </label>
            <input 
              type="text"
              value={avoidIngredients}
              onChange={(e) => setAvoidIngredients(e.target.value)}
              placeholder="ex: broccoli, carne porc..."
              className="w-full px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-stone-200 focus:outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600 text-sm placeholder-stone-600 transition-colors"
            />
          </div>
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2">
               <Sprout size={14} className="text-amber-500" /> Condimente Preferate
            </label>
            <div className="flex flex-wrap gap-2">
              {ROMANIAN_SPICES.map(spice => (
                <button
                  key={spice}
                  onClick={() => toggleSpice(spice)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    spices.includes(spice)
                      ? 'bg-amber-900/50 text-amber-200 border-amber-700 shadow-md transform scale-105'
                      : 'bg-stone-900 text-stone-500 border-stone-800 hover:border-stone-700 hover:text-stone-300'
                  }`}
                >
                  {spice}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
            {/* Picky Eater Toggle */}
            {isChild && (
            <div className="flex-1 bg-stone-950 border border-stone-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-stone-900 p-3 rounded-full text-amber-500 shadow-sm ring-1 ring-stone-800">
                    <EyeOff size={20} />
                    </div>
                    <div>
                    <h3 className="font-bold text-stone-200 text-sm">Ascunde Legumele?</h3>
                    <p className="text-xs text-stone-500">Pentru copii mofturoși</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => setHideVeggies(!hideVeggies)}
                    className={`w-14 h-8 rounded-full transition-colors relative shadow-inner border border-stone-800 ${
                    hideVeggies ? 'bg-amber-700' : 'bg-stone-800'
                    }`}
                >
                    <div className={`absolute top-1 w-6 h-6 bg-stone-100 rounded-full shadow-md transition-transform duration-300 ${
                    hideVeggies ? 'left-7' : 'left-1'
                    }`} />
                </button>
            </div>
            )}

            {/* Portions */}
            <div className="flex-1 bg-stone-950 border border-stone-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="font-bold text-stone-200 text-sm">Număr Porții</span>
                    <span className="text-xs text-stone-500">Câtă lume mănâncă?</span>
                </div>
                <div className="flex items-center gap-3 bg-stone-900 rounded-xl p-1.5 shadow-sm border border-stone-800">
                    <button 
                        onClick={() => setPortions(Math.max(1, portions - 1))}
                        className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-brand-400 hover:bg-stone-800 rounded-lg transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                    
                    <span className="w-8 text-center text-lg font-bold text-stone-200">{portions}</span>

                    <button 
                        onClick={() => setPortions(Math.min(10, portions + 1))}
                        className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-brand-400 hover:bg-stone-800 rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
        </div>
      </div>
      )}
    </div>
  );
};