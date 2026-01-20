import React from 'react';
import { ChefHat, Clock, BookHeart, ArrowLeft } from 'lucide-react';

interface Props {
  onShowSaved: () => void;
  onGoHome: () => void;
  isSavedView: boolean;
}

export const Hero: React.FC<Props> = ({ onShowSaved, onGoHome, isSavedView }) => {
  return (
    <div className="bg-gradient-to-r from-brand-600 to-brand-900 text-white p-8 rounded-b-[2rem] shadow-lg mb-8 relative overflow-hidden transition-all duration-500">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
        <ChefHat size={150} />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-500/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-brand-400">
              Satu Mare, România
            </span>
          </div>
          
          {isSavedView ? (
            <button 
              onClick={onGoHome}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
            >
              <ArrowLeft size={16} />
              Înapoi la Generator
            </button>
          ) : (
             <button 
              onClick={onShowSaved}
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors border border-brand-400/50"
            >
              <BookHeart size={16} />
              Rețetele Mele
            </button>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Bucătărașul Sătmărean
        </h1>
        <p className="text-brand-100 max-w-md text-sm md:text-base mb-6">
          {isSavedView 
            ? "Colecția ta de rețete preferate, salvate local."
            : "Spune-ne ce ai în frigider și noi îți gătim ceva delicios în maxim 25 de minute. Perfect pentru copii mofturoși sau cine rapide!"
          }
        </p>
        
        {!isSavedView && (
          <div className="flex items-center gap-4 text-xs font-medium text-brand-200">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Gata în max. 25 min</span>
            </div>
            <div className="w-1 h-1 bg-brand-400 rounded-full"></div>
            <div>100% Local</div>
          </div>
        )}
      </div>
    </div>
  );
};
