import React from 'react';
import { Recipe } from '../types';
import { Clock, Flame, Trash2, ChevronRight } from 'lucide-react';

interface Props {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export const SavedRecipesList: React.FC<Props> = ({ recipes, onSelect, onDelete }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
           <Flame size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Nu ai rețete salvate</h3>
        <p className="text-slate-500 max-w-xs mx-auto">
          Generează rețete noi și salvează-le pe cele care îți plac pentru a le avea mereu la îndemână.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 px-1">Rețetele tale ({recipes.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-brand-200 cursor-pointer group" 
            onClick={() => onSelect(recipe)}
          >
            <div className="w-24 h-24 rounded-lg bg-slate-100 shrink-0 overflow-hidden relative">
               {recipe.imageUrl ? (
                 <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-brand-50 text-brand-300">
                   <Flame size={24} />
                 </div>
               )}
               {/* Overlay on hover */}
               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                 <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-brand-600 transition-colors text-lg">
                   {recipe.title}
                 </h3>
                 <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                   {recipe.description}
                 </p>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                 <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><Clock size={12} /> {recipe.cookingTime}</span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><Flame size={12} /> {recipe.caloriesPerPortion}</span>
                 </div>
                 
                 <div className="flex items-center gap-1">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onDelete(recipe.id!); }}
                     className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
                     title="Șterge"
                   >
                     <Trash2 size={16} />
                   </button>
                   <span className="p-2 text-brand-300 group-hover:text-brand-500 transition-colors group-hover:translate-x-1">
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