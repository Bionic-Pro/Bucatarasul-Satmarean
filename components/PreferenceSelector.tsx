import React from 'react';
import { Baby, User, Users, Coffee, UtensilsCrossed, Apple, Milk, EyeOff, Minus, Plus, Ban, Sprout, Settings2 } from 'lucide-react';
import { AgeGroup, MealType } from '../types';
import { ROMANIAN_SPICES } from '../constants';

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
  spices: string[];
  setSpices: (val: string[]) => void;
}

export const PreferenceSelector: React.FC<Props> = ({ 
  ageGroup, setAgeGroup,
  mealType, setMealType,
  hideVeggies, setHideVeggies,
  portions, setPortions,
  avoidIngredients, setAvoidIngredients,
  spices, setSpices
}) => {
  
  const isChild = ageGroup !== 'adult';

  const toggleSpice = (spice: string) => {
    if (spices.includes(spice)) {
      setSpices(spices.filter(s => s !== spice));
    } else {
      setSpices([...spices, spice]);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-stone-900 p-6 text-white flex items-center gap-2">
         <span className="bg-stone-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">2</span>
         <div>
            <h2 className="text-xl font-bold">Configurează Masa</h2>
            <p className="text-stone-400 text-xs mt-0.5">Personalizează experiența culinară</p>
         </div>
         <Settings2 className="ml-auto text-stone-700 opacity-20" size={48} />
      </div>
      
      <div className="p-6 md:p-8 space-y-10">
        {/* Age Selector */}
        <div>
          <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
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
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                    ageGroup === opt.val 
                      ? 'bg-brand-900 border-brand-900 text-white shadow-lg shadow-brand-900/20 transform scale-[1.02]' 
                      : 'bg-white border-stone-100 text-stone-400 hover:border-brand-200 hover:bg-brand-50/30'
                  }`}
                >
                  <div className={`mb-2 ${ageGroup === opt.val ? 'text-brand-200' : 'text-stone-300'}`}>
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
          <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
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
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all text-left ${
                  mealType === opt.val 
                    ? 'bg-brand-900 border-brand-900 text-white shadow-md font-bold' 
                    : 'bg-white border-stone-100 text-stone-600 hover:bg-stone-50 hover:border-stone-200'
                }`}
              >
                <div className={mealType === opt.val ? 'text-brand-200' : 'text-stone-300'}>
                  {opt.icon}
                </div>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Avoid Ingredients & Spices */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Ban size={14} className="text-red-400" /> Evită Ingrediente
            </label>
            <input 
              type="text"
              value={avoidIngredients}
              onChange={(e) => setAvoidIngredients(e.target.value)}
              placeholder="ex: nuci, gluten, piper..."
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-white text-sm"
            />
          </div>
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
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
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md transform scale-105'
                      : 'bg-white text-stone-500 border-stone-200 hover:border-amber-300 hover:text-amber-600'
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
            <div className="flex-1 bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full text-orange-500 shadow-sm ring-1 ring-orange-100">
                    <EyeOff size={20} />
                    </div>
                    <div>
                    <h3 className="font-bold text-stone-800 text-sm">Ascunde Legumele?</h3>
                    <p className="text-xs text-stone-500">Pentru copii mofturoși</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => setHideVeggies(!hideVeggies)}
                    className={`w-14 h-8 rounded-full transition-colors relative shadow-inner ${
                    hideVeggies ? 'bg-orange-500' : 'bg-stone-300'
                    }`}
                >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    hideVeggies ? 'left-7' : 'left-1'
                    }`} />
                </button>
            </div>
            )}

            {/* Portions */}
            <div className="flex-1 bg-stone-50 border border-stone-100 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="font-bold text-stone-800 text-sm">Număr Porții</span>
                    <span className="text-xs text-stone-500">Câtă lume mănâncă?</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-1.5 shadow-sm border border-stone-100">
                    <button 
                        onClick={() => setPortions(Math.max(1, portions - 1))}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-brand-600 hover:bg-stone-50 rounded-lg transition-colors"
                    >
                        <Minus size={18} />
                    </button>
                    
                    <span className="w-8 text-center text-lg font-bold text-stone-800">{portions}</span>

                    <button 
                        onClick={() => setPortions(Math.min(10, portions + 1))}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-brand-600 hover:bg-stone-50 rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};