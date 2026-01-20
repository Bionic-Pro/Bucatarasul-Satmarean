import React, { useState } from 'react';
import { ChefHat, ChevronDown } from 'lucide-react';
import { CookingMethod } from '../types';
import { COOKING_METHODS_LIST } from '../constants';

interface Props {
  selectedMethod: CookingMethod;
  onSelect: (method: CookingMethod) => void;
}

export const CookingMethodSelector: React.FC<Props> = ({ selectedMethod, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedLabel = () => {
    return COOKING_METHODS_LIST.find(m => m.id === selectedMethod)?.label || 'Orice Metodă';
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
            <ChefHat size={100} />
         </div>

         <div className="flex items-center gap-3 relative z-10">
            <span className="bg-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg text-white ring-1 ring-amber-600">2</span>
            <div>
                <h2 className="text-xl font-bold text-stone-100">Metoda de Gătire</h2>
                <p className="text-stone-500 text-sm mt-0.5">
                  {isOpen ? 'Alege cum vrei să gătești.' : `Selectat: ${getSelectedLabel()}`}
                </p>
            </div>
         </div>

         <div className={`bg-stone-900 p-2 rounded-full border border-stone-800 text-stone-400 shadow-lg transition-transform duration-300 group-hover:bg-stone-800 group-hover:text-stone-200 relative z-10 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown size={24} />
         </div>
      </div>
      
      {isOpen && (
      <div className="p-6 md:p-8 animate-fade-in">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {COOKING_METHODS_LIST.map((method) => (
              <button
                key={method.id}
                onClick={() => onSelect(method.id as CookingMethod)}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 group ${
                  selectedMethod === method.id 
                    ? 'bg-amber-900/40 border-amber-700 text-white shadow-lg ring-1 ring-amber-600' 
                    : 'bg-stone-950 border-stone-800 text-stone-500 hover:border-amber-900/40 hover:bg-stone-900 hover:text-stone-300'
                }`}
              >
                <div className={`mb-3 transition-transform duration-300 ${selectedMethod === method.id ? 'text-amber-400 scale-110' : 'text-stone-600 group-hover:text-amber-500/70'}`}>
                  {method.icon}
                </div>
                <span className="font-bold text-sm text-center">{method.label}</span>
              </button>
            ))}
        </div>
      </div>
      )}
    </div>
  );
};
