import React, { useState } from 'react';
import { Recipe } from '../types';
import { Clock, Users, Flame, ChefHat, Share2, RefreshCw, Save, ImagePlus, Leaf, Info, Loader2, AlertCircle, AlertTriangle, Scale, Check, Copy } from 'lucide-react';
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
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

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
      setTimeout(() => setIsSaved(false), 2000); 
    }
  };

  const handleShare = async () => {
    const shareText = `🍽️ ${recipe.title}
📝 ${recipe.description}

⏱️ Timp: ${recipe.cookingTime}
🔥 Calorii: ${recipe.caloriesPerPortion} kcal/porție

🛒 Ingrediente:
${recipe.ingredients.map(i => `• ${i}`).join('\n')}

👨‍🍳 Mod de preparare:
${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Sfatul Sătmăreanului: ${recipe.chefTips}

Generat cu Bucătărașul Sătmărean 🇷🇴`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: shareText,
        });
      } catch (err) {
        console.log('Share cancelled', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2000);
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    }
  };

  const hasNutritionData = recipe.nutritionalDetails && recipe.nutritionalDetails.length > 0;

  return (
    <div className="animate-fade-in bg-stone-900 rounded-2xl shadow-xl overflow-hidden border border-stone-800">
      {/* Dynamic Image Header */}
      <div className="h-48 md:h-64 bg-stone-950 relative flex items-center justify-center overflow-hidden group">
         {imageUrl ? (
           <img 
              src={imageUrl} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              alt={recipe.title}
           />
         ) : (
           <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-900 flex flex-col items-center justify-center">
             <div className="relative z-10 p-4 text-center">
                <p className="text-stone-500 text-sm font-medium mb-3">Nu există imagine generată</p>
                <button 
                  onClick={handleGenerateImage}
                  disabled={generatingImage}
                  className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-full shadow-sm border border-stone-700 font-semibold text-sm transition-all transform hover:scale-105"
                >
                  {generatingImage ? <Loader2 className="animate-spin" size={16} /> : <ImagePlus size={16} />}
                  Generează Imagine AI
                </button>
             </div>
           </div>
         )}
         
         {/* Badge */}
         <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur px-3 py-1 rounded-full shadow-sm text-brand-400 font-bold uppercase tracking-wider text-xs border border-brand-900/50">
            {isSavedMode ? 'Rețetă Salvată' : 'Rețetă Generată'}
         </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-100 leading-tight">
            {recipe.title}
          </h2>
          <div className="flex gap-2 shrink-0">
             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase h-fit ${
              recipe.difficulty === 'Ușor' ? 'bg-green-900/40 text-green-400 border border-green-900' : 'bg-yellow-900/40 text-yellow-500 border border-yellow-900'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <p className="text-stone-400 mb-6 italic border-l-4 border-brand-700 pl-4 py-1 bg-stone-950/50 rounded-r-lg">
          "{recipe.description}"
        </p>

        {/* Meta Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-3 bg-stone-950 rounded-xl border border-stone-800">
            <Clock className="text-brand-500 mb-1" size={20} />
            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Timp</span>
            <span className="font-bold text-stone-200">{recipe.cookingTime}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-stone-950 rounded-xl border border-stone-800">
            <Users className="text-brand-500 mb-1" size={20} />
            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Porții</span>
            <span className="font-bold text-stone-200">{recipe.portions}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-stone-950 rounded-xl border border-stone-800">
            <Flame className="text-brand-500 mb-1" size={20} />
            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Calorii</span>
            <span className="font-bold text-stone-200">{recipe.caloriesPerPortion}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-800 mb-6">
          <button
            onClick={() => setActiveTab('prep')}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'prep' 
                ? 'border-brand-600 text-brand-500' 
                : 'border-transparent text-stone-500 hover:text-stone-300'
            }`}
          >
            <ChefHat size={18} />
            Preparare
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'nutrition' 
                ? 'border-brand-600 text-brand-500' 
                : 'border-transparent text-stone-500 hover:text-stone-300'
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
              <h3 className="text-lg font-bold text-stone-100 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-stone-800 text-brand-500 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Ingrediente
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-stone-300 text-sm">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-brand-600 rounded-full flex-shrink-0"></div>
                    <span className="leading-relaxed">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-lg font-bold text-stone-100 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-stone-800 text-brand-500 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                Pași de preparare
              </h3>
              <ol className="space-y-4">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-stone-300 text-sm group">
                    <span className="font-bold text-stone-600 group-hover:text-brand-500 transition-colors min-w-[1.5rem]">
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
             <div className="bg-brand-900/20 rounded-xl p-4 border border-brand-900/50 mb-6 flex gap-3 items-start">
                <Info className="text-brand-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-brand-100/80">
                  Valorile nutriționale sunt estimative și sunt calculate per porție medie. 
                  {recipe.caloriesPerPortion && <span className="block mt-1 font-bold">Total: {recipe.caloriesPerPortion} kcal/porție</span>}
                </p>
             </div>
             
             {hasNutritionData ? (
               <div className="grid gap-3">
                  {recipe.nutritionalDetails.map((item, idx) => {
                     // Strict Validation
                     const isCalorieValid = typeof item.calories === 'number' && item.calories > 0;
                     const isDetailValid = typeof item.details === 'string' && item.details.trim().length > 0;
                     const hasError = !isCalorieValid || !isDetailValid;

                     if (hasError) {
                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-red-950/30 border border-red-900/50 rounded-lg">
                            <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                            <div className="flex flex-col text-sm">
                              <span className="font-bold text-stone-200">{item.ingredient || 'Ingredient Necunoscut'}</span>
                              <div className="text-red-400 text-xs mt-1 space-y-0.5">
                                {!isCalorieValid && <p>• Valoarea calorică trebuie să fie pozitivă.</p>}
                                {!isDetailValid && <p>• Detaliile nutriționale lipsesc.</p>}
                              </div>
                            </div>
                          </div>
                        );
                     }

                     return (
                       <div key={idx} className="flex items-center justify-between p-3 bg-stone-950 border border-stone-800 rounded-lg hover:bg-stone-900 transition-colors">
                          <div className="flex flex-col flex-1">
                            <span className="font-semibold text-stone-200">{item.ingredient}</span>
                            <span className="text-xs text-stone-500">{item.details}</span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {item.value && item.unit && (
                                <div className="flex items-center gap-1 text-xs text-stone-400 bg-stone-900 px-2 py-1 rounded">
                                    <Scale size={12} />
                                    <span className="font-mono text-stone-300">{item.value}{item.unit}</span>
                                </div>
                            )}
                            <div className="text-right min-w-[60px]">
                                <span className="font-bold text-brand-500">{item.calories}</span>
                                <span className="text-xs text-stone-600 ml-1">kcal</span>
                            </div>
                          </div>
                       </div>
                     );
                  })}
               </div>
             ) : (
                <div className="text-center py-8 bg-stone-950 rounded-xl border border-stone-800 border-dashed">
                  <p className="text-stone-500 text-sm">Nu există detalii nutriționale valide disponibile.</p>
                </div>
             )}
          </div>
        )}

        {/* Chef Tip */}
        <div className="mt-8 bg-stone-950 border border-stone-800 rounded-xl p-4 flex gap-4">
          <div className="relative group">
            <div className="bg-stone-900 p-2 rounded-full h-fit shadow-sm text-amber-500 cursor-help border border-stone-800">
               <ChefHat size={24} />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-stone-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 border border-stone-800">
              Sfatul bucătarului expert
            </div>
          </div>
          <div>
            <h4 className="font-bold text-amber-500 text-sm mb-1">Sfatul Sătmăreanului</h4>
            <p className="text-stone-400 text-sm italic">
              "{recipe.chefTips}"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {onReset && (
            <button 
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-stone-700 rounded-xl text-stone-400 font-semibold hover:bg-stone-800 hover:text-stone-200 transition-colors"
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
                  ? 'bg-green-700 text-white shadow-green-900/30' 
                  : 'bg-brand-700 text-white shadow-brand-900/30 hover:bg-brand-600'
              }`}
            >
              {isSaved ? <CheckIcon /> : <Save size={18} />}
              {isSaved ? 'Salvat!' : 'Salvează Rețeta'}
            </button>
          )}

          {!onSave && isSavedMode && (
             <button 
               onClick={handleShare}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold shadow-lg transition-all ${
                 shareState === 'copied' 
                   ? 'bg-stone-700 text-white shadow-stone-900/30' 
                   : 'bg-brand-700 text-white shadow-brand-900/30 hover:bg-brand-600'
               }`}
             >
               {shareState === 'copied' ? <Copy size={18} /> : <Share2 size={18} />}
               {shareState === 'copied' ? 'Copiat!' : 'Trimite'}
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