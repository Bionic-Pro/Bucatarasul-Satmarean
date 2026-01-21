import React, { useState } from 'react';
import { Baby, User, Users, Coffee, UtensilsCrossed, Apple, Milk, EyeOff, Minus, Plus, Ban, Sprout, Settings2, ShieldAlert, ChevronDown, X, Utensils } from 'lucide-react';
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

// Validator for basic text inputs (letters, numbers, basic punctuation)
const isValidInput = (text: string) => /^[a-zA-ZăâîșțĂÂÎȘȚ0-9\s,.-]*$/.test(text);

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
  const [customAllergenInput, setCustomAllergenInput] = useState('');
  
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

  const handleCustomAllergenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customAllergenInput.trim();
    // Validation: Only allow non-empty alphanumeric inputs
    if (val && isValidInput(val) && !allergens.includes(val)) {
      setAllergens([...allergens, val]);
      setCustomAllergenInput('');
    }
  };

  const handleAvoidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (isValidInput(val)) {
          setAvoidIngredients(val);
      }
  };

  const removeCustomAllergen = (val: string) => {
    setAllergens(allergens.filter(a => a !== val));
  };

  const customAllergens = allergens.filter(a => !COMMON_ALLERGENS.some(ca => ca.label === a));

  return (
    <div className="bg-stone-900 rounded-3xl shadow-xl shadow-black/50 overflow-hidden mb-8 border border-stone-800 transition-all duration-300">
      {/* Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-stone-950 p-6 text-white flex items-center justify-between border-b border-stone-800 cursor-pointer group hover:bg-stone-900 transition-colors relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Settings2 size={100} />
         </div>

         <div className="flex items-center gap-3 relative z-10">
            <span className="bg-stone-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg text-stone-300 ring-2 ring-stone-700">3</span>
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
               { val: '9-13', label: '9-13 Ani', sub: 'Preadolescent', icon: <Users size={24}/> },
               { val: 'adult', label: 'Adulți', sub: 'Standard', icon: <Utensils size={24}/> },
             ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setAgeGroup(opt.val as AgeGroup)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 group ${
                    ageGroup === opt.val 
                      ? 'bg-brand-900/30 border-brand-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.1)] ring-1 ring-brand-900' 
                      : 'bg-stone-950 border-stone-800 text-stone-500 hover:bg-stone-900 hover:border-stone-700'
                  }`}
                >
                  <div className={`mb-2 transition-transform duration-300 ${ageGroup === opt.val ? 'text-brand-400 scale-110' : 'text-stone-600'}`}>
                    {opt.icon}
                  </div>
                  <span className="font-bold text-sm">{opt.label}</span>
                  <span className="text-[10px] opacity-60 uppercase tracking-wider mt-1">{opt.sub}</span>
                </button>
             ))}
          </div>
        </div>

        {/* Meal Type & Hide Veggies */}
        <div className="grid md:grid-cols-2 gap-8">
            <div>
               <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">
                  Tipul Mesei
               </label>
               <div className="grid grid-cols-2 gap-2">
                 {[
                   { id: 'mic_dejun', label: 'Mic Dejun', icon: <Coffee size={18}/> },
                   { id: 'pranz_cina', label: 'Prânz / Cină', icon: <UtensilsCrossed size={18}/> },
                   { id: 'gustare', label: 'Gustare', icon: <Apple size={18}/> },
                   { id: 'smoothie', label: 'Smoothie', icon: <Milk size={18}/> },
                 ].map(m => (
                   <button
                     key={m.id}
                     onClick={() => setMealType(m.id as MealType)}
                     className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold border transition-all ${
                       mealType === m.id
                         ? 'bg-brand-900/20 border-brand-500 text-white shadow-sm ring-1 ring-brand-900'
                         : 'bg-stone-950 border-stone-800 text-stone-500 hover:bg-stone-900 hover:border-stone-700'
                     }`}
                   >
                     <span className={mealType === m.id ? 'text-brand-400' : 'text-stone-600'}>{m.icon}</span>
                     {m.label}
                   </button>
                 ))}
               </div>
            </div>

            <div className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">
                      Număr Porții
                   </label>
                   <div className="flex items-center bg-stone-950 rounded-xl border border-stone-800 w-fit p-1">
                      <button 
                        onClick={() => setPortions(Math.max(1, portions - 1))}
                        className="p-3 hover:bg-stone-900 rounded-lg text-stone-400 transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-12 text-center font-bold text-xl text-stone-200">{portions}</span>
                      <button 
                        onClick={() => setPortions(Math.min(10, portions + 1))}
                        className="p-3 hover:bg-stone-900 rounded-lg text-stone-400 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                   </div>
                </div>

                {isChild && (
                  <div className="flex items-center gap-4 bg-stone-950 p-4 rounded-xl border border-stone-800">
                     <div className={`p-2 rounded-full transition-colors ${hideVeggies ? 'bg-brand-900/30 text-brand-400' : 'bg-stone-900 text-stone-600'}`}>
                        <EyeOff size={24} />
                     </div>
                     <div className="flex-1">
                        <p className="font-bold text-stone-200 text-sm">Ascunde Legumele</p>
                        <p className="text-xs text-stone-500">Ideal pentru micii mofturoși</p>
                     </div>
                     <button 
                       onClick={() => setHideVeggies(!hideVeggies)}
                       className={`w-12 h-6 rounded-full transition-colors relative ${hideVeggies ? 'bg-brand-600' : 'bg-stone-800'}`}
                     >
                       <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${hideVeggies ? 'translate-x-6' : 'translate-x-0'}`} />
                     </button>
                  </div>
                )}
            </div>
        </div>

        {/* Restrictions & Allergens */}
        <div>
           <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert size={16} /> Restricții & Alergeni
           </label>

           <div className="bg-stone-950 rounded-2xl border border-stone-800 p-4 space-y-6">
              <div className="flex flex-wrap gap-2">
                 {COMMON_ALLERGENS.map((alg) => {
                    const isSelected = allergens.includes(alg.label);
                    return (
                      <button
                        key={alg.id}
                        onClick={() => toggleAllergen(alg.label)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-red-900/30 border-red-500 text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.1)] ring-1 ring-red-900'
                            : 'bg-stone-900 border-stone-800 text-stone-500 hover:border-stone-700 hover:text-stone-300'
                        }`}
                      >
                        {isSelected ? <Ban size={12} /> : null}
                        {alg.label}
                      </button>
                    );
                 })}
              </div>

              <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-stone-500 mb-2 block uppercase tracking-wide">Ingrediente de evitat:</label>
                    <input
                      type="text"
                      value={avoidIngredients}
                      onChange={handleAvoidChange}
                      placeholder="ex: Coriandru, Piper, Ardei iute..."
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-300 focus:outline-none focus:border-red-900/50 transition-colors placeholder-stone-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-500 mb-2 block uppercase tracking-wide">Altă restricție (manual):</label>
                    <form onSubmit={handleCustomAllergenSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={customAllergenInput}
                        onChange={(e) => isValidInput(e.target.value) && setCustomAllergenInput(e.target.value)}
                        placeholder="Adaugă o restricție..."
                        className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-300 focus:outline-none focus:border-red-900/50 transition-colors placeholder-stone-700"
                      />
                      <button 
                        type="submit"
                        disabled={!customAllergenInput.trim()}
                        className="bg-stone-800 text-stone-400 p-3 rounded-xl border border-stone-700 hover:bg-stone-700 hover:text-stone-200 transition-all disabled:opacity-30"
                      >
                        <Plus size={20} />
                      </button>
                    </form>
                  </div>
              </div>

              {customAllergens.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {customAllergens.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 bg-red-950/40 text-red-300 border border-red-900/50 px-3 py-1.5 rounded-lg text-xs font-bold">
                      {item}
                      <button onClick={() => removeCustomAllergen(item)} className="hover:text-red-100 p-0.5 transition-colors">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
           </div>
        </div>
        
        {/* Spices */}
        <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sprout size={16} className="text-amber-500" /> Condimente Preferate
           </label>
           <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {ROMANIAN_SPICES.map((spice) => {
                 const isSelected = spices.includes(spice);
                 return (
                    <button
                      key={spice}
                      onClick={() => toggleSpice(spice)}
                      className={`text-[10px] md:text-xs font-bold py-2 px-1 rounded-xl border transition-all ${
                         isSelected 
                           ? 'bg-amber-900/20 border-amber-600 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)] ring-1 ring-amber-900'
                           : 'bg-stone-950 border-stone-800 text-stone-500 hover:bg-stone-900 hover:border-stone-700 hover:text-stone-300'
                      }`}
                    >
                      {spice}
                    </button>
                 );
              })}
           </div>
        </div>
      </div>
      )}
    </div>
  );
};