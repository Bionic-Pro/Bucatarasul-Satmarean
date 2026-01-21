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

  return (
    <div className="bg-stone-900/40 rounded-[2rem] shadow-xl overflow-hidden mb-6 border border-white/5 transition-all">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-roYellow-400/10 p-6 text-white flex items-center justify-between border-b border-roYellow-500/20 cursor-pointer group hover:bg-roYellow-400/20 transition-colors relative"
      >
         <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <ChefHat size={80} />
         </div>
         <div className="flex items-center gap-3 relative z-10">
            <span className="bg-roYellow-500 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border border-roYellow-300/30 text-roYellow-950">2</span>
            <div>
                <h2 className="text-xl font-bold">Modul de Gătire</h2>
                <p className="text-roYellow-100/50 text-xs mt-1.5 pl-1 font-medium">Cum pregătim mâncarea azi?</p>
            </div>
         </div>
         <div className={`p-2 rounded-full border border-roYellow-600/30 text-roYellow-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown size={20} />
         </div>
      </div>
      
      {isOpen && (
      <div className="p-6 animate-fade-in grid grid-cols-2 md:grid-cols-4 gap-3">
          {COOKING_METHODS_LIST.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelect(method.id as CookingMethod)}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all ${
                selectedMethod === method.id 
                  ? 'bg-roYellow-400/20 border-roYellow-500 text-roYellow-100 ring-1 ring-roYellow-400/30 shadow-lg shadow-roYellow-950/50' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-500 hover:text-roYellow-400 hover:bg-stone-900 hover:border-roYellow-900/30'
              }`}
            >
              <div className={`mb-3 ${selectedMethod === method.id ? 'text-roYellow-400' : 'text-stone-700'}`}>
                {method.icon}
              </div>
              <span className="font-bold text-[11px] text-center tracking-tight">{method.label}</span>
            </button>
          ))}
      </div>
      )}
    </div>
  );
};