import React, { useState, useEffect } from 'react';
import { Baby, User, Users, Coffee, UtensilsCrossed, Apple, Milk, EyeOff, Minus, Plus, Ban, Sprout, Settings2, ShieldAlert, ChevronDown, X, Utensils, Check } from 'lucide-react';
import { AgeGroup, MealType, UserProfile } from '../types';
import { ROMANIAN_SPICES, COMMON_ALLERGENS } from '../constants';

interface Props {
  ageGroup: AgeGroup;
  setAgeGroup: (val: AgeGroup) => void;
  mealTypes: MealType[];
  setMealTypes: (val: MealType[]) => void;
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
  user: UserProfile | null;
  onUpdateUser?: (updated: UserProfile) => void;
}

const isValidInput = (text: string) => /^[a-zA-ZăâîșțĂÂÎȘȚ0-9\s,.-]*$/.test(text);

export const PreferenceSelector: React.FC<Props> = ({ 
  ageGroup, setAgeGroup,
  mealTypes, setMealTypes,
  hideVeggies, setHideVeggies,
  portions, setPortions,
  avoidIngredients, setAvoidIngredients,
  allergens, setAllergens,
  spices, setSpices,
  user,
  onUpdateUser
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customAllergenInput, setCustomAllergenInput] = useState('');
  const [customSpiceInput, setCustomSpiceInput] = useState('');

  useEffect(() => {
    if (user && onUpdateUser) {
      const timeoutId = setTimeout(() => {
        if (avoidIngredients !== user.preferences.avoidIngredients) {
          onUpdateUser({
            ...user,
            preferences: { ...user.preferences, avoidIngredients: avoidIngredients.trim() }
          });
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [avoidIngredients, user, onUpdateUser]);

  const toggleMealType = (type: MealType) => {
    if (mealTypes.includes(type)) {
      if (mealTypes.length > 1) setMealTypes(mealTypes.filter(t => t !== type));
    } else {
      setMealTypes([...mealTypes, type]);
    }
  };

  return (
    <div className="bg-stone-900/40 rounded-[2rem] shadow-xl overflow-hidden mb-8 border border-white/5 transition-all">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-roRed-950/20 p-6 text-white flex items-center justify-between border-b border-roRed-800/30 cursor-pointer group hover:bg-roRed-900/30 transition-colors relative"
      >
         <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Settings2 size={80} />
         </div>
         <div className="flex items-center gap-3 relative z-10">
            <span className="bg-roRed-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border border-roRed-400/30">3</span>
            <div>
                <h2 className="text-xl font-bold text-stone-100">Preferințe & Copii</h2>
                <p className="text-roRed-200/50 text-xs mt-1.5 pl-1 font-medium">Personalizăm pentru familia ta.</p>
            </div>
         </div>
         <div className={`p-2 rounded-full border border-roRed-800 text-roRed-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown size={20} />
         </div>
      </div>
      
      {isOpen && (
      <div className="p-6 md:p-8 space-y-10 animate-fade-in bg-stone-900/20">
        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Vârstă Copil:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {[
               { val: '1-3', label: '1-3 Ani', icon: <Baby size={20}/> },
               { val: '4-8', label: '4-8 Ani', icon: <User size={20}/> },
               { val: '9-13', label: '9-13 Ani', icon: <Users size={20}/> },
               { val: 'adult', label: 'Adulți', icon: <Utensils size={20}/> },
             ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setAgeGroup(opt.val as AgeGroup)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                    ageGroup === opt.val 
                      ? 'bg-roRed-600/20 border-roRed-500 text-roRed-100 shadow-lg shadow-roRed-950/50' 
                      : 'bg-stone-950/60 border-stone-800 text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <div className={`mb-2 ${ageGroup === opt.val ? 'text-roRed-400' : 'text-stone-700'}`}>{opt.icon}</div>
                  <span className="font-bold text-[11px]">{opt.label}</span>
                </button>
             ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Tip Masă:</label>
               <div className="grid grid-cols-2 gap-2">
                 {[
                   { id: 'mic_dejun', label: 'Mic Dejun', icon: <Coffee size={16}/> },
                   { id: 'pranz_cina', label: 'Prânz / Cină', icon: <UtensilsCrossed size={16}/> },
                   { id: 'gustare', label: 'Gustare', icon: <Apple size={16}/> },
                   { id: 'smoothie', label: 'Smoothie', icon: <Milk size={16}/> },
                 ].map(m => {
                   const isSelected = mealTypes.includes(m.id as MealType);
                   return (
                    <button
                      key={m.id}
                      onClick={() => toggleMealType(m.id as MealType)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[11px] font-bold border transition-all ${
                        isSelected ? 'bg-roRed-600/20 border-roRed-500 text-roRed-100' : 'bg-stone-950/60 border-stone-800 text-stone-500'
                      }`}
                    >
                      {m.icon}
                      {m.label}
                    </button>
                   );
                 })}
               </div>
            </div>

            <div className="space-y-6">
                <div>
                   <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Porții:</label>
                   <div className="flex items-center bg-stone-950/60 rounded-xl border border-stone-800 w-fit p-1">
                      <button onClick={() => setPortions(Math.max(1, portions - 1))} className="p-3 text-stone-400 hover:text-roRed-400"><Minus size={18}/></button>
                      <span className="w-10 text-center font-bold text-roRed-100">{portions}</span>
                      <button onClick={() => setPortions(Math.min(10, portions + 1))} className="p-3 text-stone-400 hover:text-roRed-400"><Plus size={18}/></button>
                   </div>
                </div>

                {ageGroup !== 'adult' && (
                  <div className="flex items-center gap-4 bg-roRed-950/10 p-4 rounded-2xl border border-roRed-900/30">
                     <EyeOff size={24} className={hideVeggies ? 'text-roRed-400' : 'text-stone-700'} />
                     <div className="flex-1">
                        <p className="font-bold text-stone-200 text-[11px]">Ascunde Legumele</p>
                        <p className="text-[10px] text-stone-500">Pentru cei mofturoși</p>
                     </div>
                     <button onClick={() => setHideVeggies(!hideVeggies)} className={`w-10 h-5 rounded-full relative transition-colors ${hideVeggies ? 'bg-roRed-600' : 'bg-stone-800'}`}>
                        <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${hideVeggies ? 'translate-x-5' : 'translate-x-0'}`} />
                     </button>
                  </div>
                )}
            </div>
        </div>

        <div>
           <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Alergeni & Condimente:</label>
           <div className="bg-stone-950/60 rounded-2xl border border-stone-800 p-5 space-y-6">
              <div className="flex flex-wrap gap-2">
                 {COMMON_ALLERGENS.map((alg) => (
                    <button
                      key={alg.id}
                      onClick={() => setAllergens(allergens.includes(alg.label) ? allergens.filter(a => a !== alg.label) : [...allergens, alg.label])}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                        allergens.includes(alg.label) ? 'bg-roRed-900/40 border-roRed-500 text-roRed-100' : 'bg-stone-900 border-stone-800 text-stone-500'
                      }`}
                    >
                      {alg.label}
                    </button>
                 ))}
              </div>
              
              <div className="space-y-4">
                  <input
                    type="text"
                    value={avoidIngredients}
                    onChange={(e) => isValidInput(e.target.value) && setAvoidIngredients(e.target.value)}
                    placeholder="Evită (ex: Coriandru, Piper)..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-200 focus:border-roRed-500/50 outline-none"
                  />
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {ROMANIAN_SPICES.map((spice) => (
                        <button
                          key={spice}
                          onClick={() => setSpices(spices.includes(spice) ? spices.filter(s => s !== spice) : [...spices, spice])}
                          className={`text-[10px] font-bold py-2 px-1 rounded-xl border transition-all ${
                            spices.includes(spice) ? 'bg-roYellow-400/20 border-roYellow-500 text-roYellow-400' : 'bg-stone-900 border-stone-800 text-stone-600'
                          }`}
                        >
                          {spice}
                        </button>
                    ))}
                  </div>
              </div>
           </div>
        </div>
      </div>
      )}
    </div>
  );
};