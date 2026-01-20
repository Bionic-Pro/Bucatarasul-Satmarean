import React from 'react';
import { ChefHat, Clock, BookHeart, ArrowLeft, Download } from 'lucide-react';

interface Props {
  onShowSaved: () => void;
  onGoHome: () => void;
  isSavedView: boolean;
  onInstall?: () => void;
  canInstall?: boolean;
}

export const Hero: React.FC<Props> = ({ onShowSaved, onGoHome, isSavedView, onInstall, canInstall }) => {
  return (
    <div className="bg-gradient-to-r from-brand-900 to-brand-950 text-white p-8 rounded-b-[2rem] shadow-2xl shadow-black/50 mb-8 relative overflow-hidden transition-all duration-500 border-b border-brand-800">
      <div className="absolute top-0 right-0 opacity-5 transform translate-x-10 -translate-y-10">
        <ChefHat size={150} />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-brand-700/50 text-brand-100">
              Satu Mare, România
            </span>
            {canInstall && (
              <button 
                onClick={onInstall}
                className="flex items-center gap-1 bg-brand-500 text-brand-950 px-3 py-1 rounded-full text-xs font-bold hover:bg-brand-400 transition-colors shadow-lg shadow-brand-500/20"
              >
                <Download size={12} />
                Instalează App
              </button>
            )}
          </div>
          
          {isSavedView ? (
            <button 
              onClick={onGoHome}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-colors border border-white/10"
            >
              <ArrowLeft size={16} />
              Înapoi
            </button>
          ) : (
             <button 
              onClick={onShowSaved}
              className="flex items-center gap-2 bg-brand-700 hover:bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors border border-brand-600 shadow-brand-900/50"
            >
              <BookHeart size={16} />
              Rețetele Mele
            </button>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-stone-100 leading-tight">
          Bucătărașul Sătmărean
        </h1>
        <p className="text-brand-100 max-w-md text-sm md:text-base mb-6 opacity-90 leading-relaxed">
          {isSavedView 
            ? "Colecția ta de rețete preferate, salvate local pe dispozitiv."
            : "Spune-ne ce ai în frigider și noi îți gătim ceva delicios în maxim 25 de minute. Perfect pentru copii mofturoși sau cine rapide!"
          }
        </p>
        
        {!isSavedView && (
          <div className="flex items-center gap-4 text-xs font-medium text-brand-200/80">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Gata în max. 25 min</span>
            </div>
            <div className="w-1 h-1 bg-brand-600 rounded-full"></div>
            <div>100% Local</div>
          </div>
        )}
      </div>
    </div>
  );
};