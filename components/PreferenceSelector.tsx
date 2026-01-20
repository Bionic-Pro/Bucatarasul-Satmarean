import React from 'react';
import { Baby, User, Users, Coffee, UtensilsCrossed, Apple, Milk, EyeOff, Minus, Plus, Ban, Sprout } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-6">2. Configurează Masa</h2>
      
      <div className="space-y-8">
        {/* Age Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">
            Pentru cine gătim?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {[
               { val: '1-3', label: '1-3 Ani', sub: 'Toddler', icon: <Baby size={20}/> },
               { val: '4-8', label: '4-8 Ani', sub: 'Școlar', icon: <User size={20}/> },
               { val: '9-13', label: '9-13 Ani', sub: 'Pre-teen', icon: <User size={20}/> },
               { val: 'adult', label: 'Adulți', sub: 'General', icon: <Users size={20}/> },
             ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setAgeGroup(opt.val as AgeGroup)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    ageGroup === opt.val 
                      ? 'bg-brand-900 text-white border-brand-900 shadow-md ring-2 ring-brand-900 ring-offset-1' 
                      : 'border-slate-200 text-slate-500 hover:border-brand-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={ageGroup === opt.val ? 'text-brand-100' : 'text-slate-400'}>
                    {opt.icon}
                  </div>
                  <span className="font-bold text-sm mt-1">{opt.label}</span>
                  <span className="text-[10px] opacity-70">{opt.sub}</span>
                </button>
             ))}
          </div>
        </div>

        {/* Meal Type Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">
            Tipul Mesei
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: 'mic_dejun', label: 'Mic Dejun', icon: <Coffee size={18}/> },
              { val: 'pranz_cina', label: 'Prânz / Cină', icon: <UtensilsCrossed size={18}/> },
              { val: 'gustare', label: 'Gustare', icon: <Apple size={18}/> },
              { val: 'smoothie', label: 'Smoothie', icon: <Milk size={18}/> },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setMealType(opt.val as MealType)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                  mealType === opt.val 
                    ? 'bg-brand-900 text-white border-brand-900 shadow-md font-bold' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={mealType === opt.val ? 'text-brand-100' : 'text-slate-400'}>
                  {opt.icon}
                </div>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Avoid Ingredients & Spices */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Ban size={16} /> Evită Ingrediente
            </label>
            <input 
              type="text"
              value={avoidIngredients}
              onChange={(e) => setAvoidIngredients(e.target.value)}
              placeholder="ex: nuci, gluten, piper..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
               <Sprout size={16} /> Condimente Preferate
            </label>
            <div className="flex flex-wrap gap-2">
              {ROMANIAN_SPICES.map(spice => (
                <button
                  key={spice}
                  onClick={() => toggleSpice(spice)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    spices.includes(spice)
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-amber-200'
                  }`}
                >
                  {spice}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Picky Eater Toggle (Only visible if child selected) */}
        {isChild && (
           <div className="animate-fade-in bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full text-orange-500 shadow-sm">
                   <EyeOff size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Ascunde Legumele?</h3>
                  <p className="text-xs text-slate-500">Pentru copii mofturoși</p>
                </div>
              </div>
              
              <button 
                onClick={() => setHideVeggies(!hideVeggies)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  hideVeggies ? 'bg-orange-500' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  hideVeggies ? 'left-6' : 'left-1'
                }`} />
              </button>
           </div>
        )}

        {/* Portions */}
        <div>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">
            Număr porții
          </label>
          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-2 border border-slate-200">
            <button 
              onClick={() => setPortions(Math.max(1, portions - 1))}
              className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-white rounded-lg transition-colors"
            >
              <Minus size={20} />
            </button>
            
            <div className="text-center">
              <span className="text-xl font-bold text-slate-800 block">{portions}</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase">persoane</span>
            </div>

            <button 
              onClick={() => setPortions(Math.min(10, portions + 1))}
              className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-white rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};