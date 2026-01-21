import React from 'react';
import { Recipe } from '../types';
import { Clock, Flame, Trash2, ChevronRight, BookOpen, Utensils } from 'lucide-react';

interface Props {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export const SavedRecipesList: React.FC<Props> = ({ recipes, onSelect, onDelete }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20 bg-stone-900/60 backdrop-blur-sm rounded-3xl border border-stone-800 shadow-xl shadow-black/30 flex flex-col items-center px-6">
        <div className="relative mb-8">
           <div className="bg-brand-900/20 w-32 h-32 rounded-full flex items-center justify-center text-brand-500 shadow-inner border border-brand-900/30 animate-pulse">
              <BookOpen size={64} />
           </div>
           <div className="absolute -bottom-2 -right-2 bg-amber-600 p-2 rounded-full border-4 border-stone-900 text-white shadow-lg">
              <Utensils size={20} />
           </div>
        </div>
        <h3 className="text-2xl font-bold text-stone-100 mb-3">Cartea ta de bucate e goală</h3>
        <p className="text-stone-400 max-w-xs mx-auto text-sm leading-relaxed mb-8">
          Începe prin a selecta câteva ingrediente în generator. Salvează rețetele care îți fac cu ochiul pentru a le găsi rapid aici!
        </p>
        <div className="w-16 h-1 bg-brand-900/50 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-bold text-stone-100">Rețetele tale</h2>
         <span className="bg-brand-900/50 text-brand-300 border border-brand-900 px-3 py-1 rounded-full text-xs font-bold">{recipes.length} salvate</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-stone-900 p-4 rounded-2xl shadow-lg border border-stone-800 hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 flex gap-5 transition-all duration-500 group cursor-pointer relative overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02]" 
            onClick={() => onSelect(recipe)}
          >
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-900 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-3xl duration-700"></div>

            <div className="w-32 h-32 rounded-xl bg-stone-950 shrink-0 overflow-hidden relative shadow-inner border border-stone-800 group-hover:border-brand-500/30 transition-colors">
               {recipe.imageUrl ? (
                 <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2" 
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-stone-950 text-stone-700">
                   <Flame size={32} />
                 </div>
               )}
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-1 relative z-10">
              <div>
                 <h3 className="font-bold text-stone-100 leading-tight line-clamp-2 group-hover:text-brand-400 transition-colors text-lg mb-1.5">
                   {recipe.title}
                 </h3>
                 <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                   {recipe.description}
                 </p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                 <div className="flex items-center gap-3 text-xs font-bold text-stone-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded-md border border-stone-800 group-hover:border-stone-700 transition-colors">
                      <Clock size={12} className="text-brand-500" /> 
                      {recipe.cookingTime.replace('min','')}m
                    </span>
                    <span className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded-md border border-stone-800 group-hover:border-stone-700 transition-colors">
                      <Flame size={12} className="text-brand-500" /> 
                      {recipe.caloriesPerPortion}
                    </span>
                 </div>
                 
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onDelete(recipe.id!); }}
                     className="p-2 text-stone-600 hover:text-red-400 hover:bg-red-950/50 rounded-full transition-colors relative z-20"
                     title="Șterge"
                   >
                     <Trash2 size={18} />
                   </button>
                   <span className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-950 text-stone-500 group-hover:bg-brand-600 group-hover:text-white transition-all border border-stone-800 group-hover:border-brand-500 shadow-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 duration-300">
                     <ChevronRight size={18} />
                   </span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};