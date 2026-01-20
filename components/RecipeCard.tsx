import React, { useState } from 'react';
import { Recipe } from '../types';
import { Clock, Users, Flame, ChefHat, Share2, RefreshCw, Save, ImagePlus, Leaf, Info, Loader2, AlertCircle } from 'lucide-react';
import { generateRecipeImage } from '../services/geminiService';

interface Props {
  recipe: Recipe;
  onReset?: () => void;
  onSave?: (recipe: Recipe) => void;
  isSavedMode?: boolean;
}

export const RecipeCard: React.FC<Props> = ({ recipe, onReset, onSave, isSavedMode = false }) => {
  const [activeTab, setActiveTab] = useState<'prep' | 'nutrition'>('prep');
  const [imageUrl, setImageUrl] = useState<string | null>(recipe.imageUrl || null);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    try {
      const url = await generateRecipeImage(recipe.title, recipe.ingredients);
      if (url) {
        setImageUrl(url);
        recipe.imageUrl = url; 
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...recipe, imageUrl: imageUrl || undefined });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000); // Reset "Saved!" text after 2s
    }
  };

  const hasNutritionData = recipe.nutritionalDetails && recipe.nutritionalDetails.length > 0;

  return (
    <div className="animate-fade-in bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Dynamic Image Header */}
      <div className="h-48 md:h-64 bg-slate-100 relative flex items-center justify-center overflow-hidden group">
         {imageUrl ? (
           <img 
              src={imageUrl} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              alt={recipe.title}
           />
         ) : (
           <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-50 flex flex-col items-center justify-center">
             <img 
                src={`https://picsum.photos/800/400?food=${Math.floor(Math.random() * 1000)}`} 
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                alt="Generic Food background"
             />
             <div className="relative z-10 p-4 text-center">
                <p className="text-slate-500 text-sm font-medium mb-3">Nu există imagine generată</p>
                <button 
                  onClick={handleGenerateImage}
                  disabled={generatingImage}
                  className="flex items-center gap-2 bg-white/90 hover:bg-white text-brand-700 px-4 py-2 rounded-full shadow-sm border border-brand-100 font-semibold text-sm transition-all transform hover:scale-105"
                >
                  {generatingImage ? <Loader2 className="animate-spin" size={16} /> : <ImagePlus size={16} />}
                  Generează Imagine AI
                </button>
             </div>
           </div>
         )}
         
         {/* Badge */}
         <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-brand-800 font-bold uppercase tracking-wider text-xs border border-brand-100">
            {isSavedMode ? 'Rețetă Salvată' : 'Rețetă Generată'}
         </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
            {recipe.title}
          </h2>
          <div className="flex gap-2 shrink-0">
             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase h-fit ${
              recipe.difficulty === 'Ușor' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <p className="text-slate-600 mb-6 italic border-l-4 border-brand-500 pl-4 py-1 bg-slate-50 rounded-r-lg">
          "{recipe.description}"
        </p>

        {/* Meta Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Clock className="text-brand-500 mb-1" size={20} />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Timp</span>
            <span className="font-bold text-slate-800">{recipe.cookingTime}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Users className="text-brand-500 mb-1" size={20} />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Porții</span>
            <span className="font-bold text-slate-800">{recipe.portions}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Flame className="text-brand-500 mb-1" size={20} />
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Calorii</span>
            <span className="font-bold text-slate-800">{recipe.caloriesPerPortion}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('prep')}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'prep' 
                ? 'border-brand-500 text-brand-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ChefHat size={18} />
            Preparare
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'nutrition' 
                ? 'border-brand-500 text-brand-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Leaf size={18} />
            Nutriție
          </button>
        </div>

        {activeTab === 'prep' ? (
          <div className="animate-fade-in grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Ingrediente
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0"></div>
                    <span className="leading-relaxed">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                Pași de preparare
              </h3>
              <ol className="space-y-4">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700 text-sm group">
                    <span className="font-bold text-slate-400 group-hover:text-brand-500 transition-colors min-w-[1.5rem]">
                      {idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
             <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-6 flex gap-3 items-start">
                <Info className="text-green-600 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-green-800">
                  Valorile nutriționale sunt estimative și sunt calculate per porție medie.
                </p>
             </div>
             
             {hasNutritionData ? (
               <div className="grid gap-3">
                  {recipe.nutritionalDetails.map((item, idx) => {
                     // VALIDATION LOGIC
                     const isCalorieValid = typeof item.calories === 'number' && item.calories > 0;
                     const isDetailValid = typeof item.details === 'string' && item.details.trim().length > 0;
                     const hasError = !isCalorieValid || !isDetailValid;

                     if (hasError) {
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                            <AlertCircle size={18} className="text-red-500" />
                            <div className="flex flex-col text-sm">
                              <span className="font-bold text-slate-700">{item.ingredient || 'Ingredient necunoscut'}</span>
                              <span className="text-red-600">
                                Eroare validare: 
                                {!isCalorieValid && ' Calorii invalide.'}
                                {!isDetailValid && ' Lipsă detalii.'}
                              </span>
                            </div>
                          </div>
                        );
                     }

                     return (
                       <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800">{item.ingredient}</span>
                            <span className="text-xs text-slate-500">{item.details}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-brand-600">{item.calories}</span>
                            <span className="text-xs text-slate-400 ml-1">kcal</span>
                          </div>
                       </div>
                     );
                  })}
               </div>
             ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  <p className="text-slate-500 text-sm">Nu există detalii nutriționale valide disponibile.</p>
                </div>
             )}
          </div>
        )}

        {/* Chef Tip */}
        <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-4">
          <div className="relative group">
            <div className="bg-white p-2 rounded-full h-fit shadow-sm text-amber-500 cursor-help">
               <ChefHat size={24} />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
              Sfatul bucătarului expert
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-amber-900 text-sm mb-1">Sfatul Sătmăreanului</h4>
            <p className="text-amber-800 text-sm italic">
              "{recipe.chefTips}"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {onReset && (
            <button 
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-800 transition-colors"
            >
              <RefreshCw size={18} />
              Altă Rețetă
            </button>
          )}
          
          {onSave && !isSavedMode && (
            <button 
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold shadow-lg transition-all ${
                 isSaved 
                  ? 'bg-green-500 text-white shadow-green-500/30' 
                  : 'bg-brand-600 text-white shadow-brand-500/30 hover:bg-brand-700'
              }`}
            >
              {isSaved ? <CheckIcon /> : <Save size={18} />}
              {isSaved ? 'Salvat!' : 'Salvează Rețeta'}
            </button>
          )}

          {!onSave && isSavedMode && (
             <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-600 text-white rounded-xl font-semibold shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-colors">
               <Share2 size={18} />
               Trimite
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);