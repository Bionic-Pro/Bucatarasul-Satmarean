import React from 'react';
import { Recipe } from '../types';
import { Clock, Flame, Trash2, ChevronRight, BookOpen } from 'lucide-react';

interface Props {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export const SavedRecipesList: React.FC<Props> = ({ recipes, onSelect, onDelete }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-white shadow-xl shadow-stone-200/50">
        <div className="bg-stone-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300 shadow-inner">
           <BookOpen size={48} />
        </div>
        <h3 className="text-2xl font-bold text-stone-800 mb-3">Nu ai rețete salvate</h3>
        <p className="text-stone-500 max-w-xs mx-auto text-sm leading-relaxed">
          Generează rețete noi și salvează-le pe cele care îți plac pentru a crea propria ta carte de bucate.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-bold text-stone-800">Rețetele tale</h2>
         <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-xs font-bold">{recipes.length} salvate</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10 flex gap-4 transition-all duration-300 group cursor-pointer relative overflow-hidden" 
            onClick={() => onSelect(recipe)}
          >
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-brand-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>

            <div className="w-28 h-28 rounded-xl bg-stone-100 shrink-0 overflow-hidden relative shadow-inner">
               {recipe.imageUrl ? (
                 <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">
                   <Flame size={32} />
                 </div>
               )}
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-1 relative z-10">
              <div>
                 <h3 className="font-bold text-stone-800 leading-tight line-clamp-2 group-hover:text-brand-700 transition-colors text-lg mb-1">
                   {recipe.title}
                 </h3>
                 <p className="text-xs text-stone-500 line-clamp-2">
                   {recipe.description}
                 </p>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                 <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock size={12} /> {recipe.cookingTime.replace('min','')}</span>
                    <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                    <span className="flex items-center gap-1"><Flame size={12} /> {recipe.caloriesPerPortion}</span>
                 </div>
                 
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onDelete(recipe.id!); }}
                     className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                     title="Șterge"
                   >
                     <Trash2 size={18} />
                   </button>
                   <span className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-50 text-stone-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
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