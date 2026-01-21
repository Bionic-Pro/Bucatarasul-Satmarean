
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { Clock, Users, Flame, ChefHat, Share2, RefreshCw, Save, ImagePlus, Leaf, Info, Loader2, AlertTriangle, Scale, Check, Copy } from 'lucide-react';
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

  // Sync image URL if recipe object updates (e.g. switching between list items)
  useEffect(() => {
    setImageUrl(recipe.imageUrl || null);
    setIsSaved(false); // Reset saved state visually when switching recipes
  }, [recipe.id]);

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
      // Create a fresh copy to ensure all fields are captured
      const recipeToSave = { 
        ...recipe, 
        imageUrl: imageUrl || undefined,
        id: recipe.id || crypto.randomUUID() 
      };
      onSave(recipeToSave);
      setIsSaved(true);
      // We don't timeout the success state so user knows it's definitely in their collection
    }
  };

  const handleShare = async () => {
    const shareText = `🍽️ ${recipe.title}\n📝 ${recipe.description}\n\n⏱️ Timp: ${recipe.cookingTime}\n🔥 Calorii: ${recipe.caloriesPerPortion} kcal/porție\n\n🛒 Ingrediente:\n${recipe.ingredients.map(i => `• ${i}`).join('\n')}\n\n👨‍🍳 Mod de preparare:\n${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nSfatul Sătmăreanului: ${recipe.chefTips}\n\nGenerat cu Bucătărașul Sătmărean 🇷🇴`;

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
    <div className="animate-fade-in bg-stone-900 rounded-[2rem] shadow-2xl overflow-hidden border border-white/5">
      {/* Dynamic Image Header */}
      <div className="h-56 md:h-72 bg-stone-950 relative flex items-center justify-center overflow-hidden group">
         {imageUrl ? (
           <img 
              src={imageUrl} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              alt={recipe.title}
           />
         ) : (
           <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-950 flex flex-col items-center justify-center">
             <div className="relative z-10 p-4 text-center">
                <ChefHat size={48} className="mx-auto mb-4 text-stone-800 opacity-50" />
                <button 
                  onClick={handleGenerateImage}
                  disabled={generatingImage}
                  className="flex items-center gap-2 bg-roBlue-700 hover:bg-roBlue-600 text-white px-5 py-2.5 rounded-xl shadow-xl border border-roBlue-500/30 font-bold text-sm transition-all transform hover:scale-105"
                >
                  {generatingImage ? <Loader2 className="animate-spin" size={18} /> : <ImagePlus size={18} />}
                  Imagine AI
                </button>
             </div>
           </div>
         )}
         
         {/* Badge */}
         <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg text-roYellow-400 font-bold uppercase tracking-[0.1em] text-[10px] border border-roYellow-500/30">
            {recipe.mealType || (isSavedMode ? 'Rețetă Salvată' : 'Rețetă Generată')}
         </div>
      </div>

      <div className="p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
          <h2 className="text-3xl font-black text-stone-100 leading-tight tracking-tight">
            {recipe.title}
          </h2>
          <div className="flex gap-2 shrink-0">
             <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider h-fit border ${
              recipe.difficulty === 'Ușor' ? 'bg-green-900/20 text-green-400 border-green-800/50' : 'bg-roYellow-900/20 text-roYellow-400 border-roYellow-800/50'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <p className="text-stone-400 mb-8 italic border-l-4 border-roBlue-700 pl-5 py-2 bg-stone-950/40 rounded-r-2xl leading-relaxed">
          "{recipe.description}"
        </p>

        {/* Meta Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center p-4 bg-stone-950/60 rounded-2xl border border-white/5">
            <Clock className="text-roBlue-400 mb-2" size={24} />
            <span className="text-[9px] text-stone-600 uppercase font-black tracking-widest">Timp</span>
            <span className="font-bold text-stone-200 text-sm">{recipe.cookingTime}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-stone-950/60 rounded-2xl border border-white/5">
            <Users className="text-roYellow-500 mb-2" size={24} />
            <span className="text-[9px] text-stone-600 uppercase font-black tracking-widest">Porții</span>
            <span className="font-bold text-stone-200 text-sm">{recipe.portions}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-stone-950/60 rounded-2xl border border-white/5">
            <Flame className="text-roRed-500 mb-2" size={24} />
            <span className="text-[9px] text-stone-600 uppercase font-black tracking-widest">Calorii</span>
            <span className="font-bold text-stone-200 text-sm">{recipe.caloriesPerPortion}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveTab('prep')}
            className={`flex-1 py-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'prep' 
                ? 'border-roBlue-600 text-roBlue-400' 
                : 'border-transparent text-stone-600 hover:text-stone-400'
            }`}
          >
            <ChefHat size={18} />
            Preparare
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex-1 py-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'nutrition' 
                ? 'border-roRed-600 text-roRed-400' 
                : 'border-transparent text-stone-600 hover:text-stone-400'
            }`}
          >
            <Leaf size={18} />
            Nutriție
          </button>
        </div>

        {activeTab === 'prep' ? (
          <div className="animate-fade-in grid md:grid-cols-2 gap-10">
            {/* Ingredients */}
            <div>
              <h3 className="text-sm font-black text-stone-100 mb-6 flex items-center gap-3 uppercase tracking-wider">
                <span className="w-7 h-7 bg-roBlue-950 text-roBlue-400 rounded-lg flex items-center justify-center text-xs border border-roBlue-800">1</span>
                Ingrediente
              </h3>
              <ul className="space-y-4">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-stone-300 text-sm group">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-roBlue-600 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                    <span className="leading-relaxed font-medium">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h3 className="text-sm font-black text-stone-100 mb-6 flex items-center gap-3 uppercase tracking-wider">
                <span className="w-7 h-7 bg-roRed-950 text-roRed-400 rounded-lg flex items-center justify-center text-xs border border-roRed-800">2</span>
                Gătire
              </h3>
              <ol className="space-y-5">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4 text-stone-300 text-sm group">
                    <span className="font-black text-stone-700 group-hover:text-roRed-500 transition-colors min-w-[1.2rem] text-xs">
                      {idx + 1}.
                    </span>
                    <span className="leading-relaxed font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
             <div className="bg-roBlue-900/10 rounded-2xl p-5 border border-roBlue-900/30 mb-8 flex gap-4 items-start">
                <Info className="text-roBlue-500 shrink-0 mt-0.5" size={24} />
                <p className="text-xs text-roBlue-200/80 leading-relaxed font-medium">
                  Valorile nutriționale sunt estimate per porție de specialistul nostru AI. 
                  <span className="block mt-2 font-black text-roBlue-400">Total: {recipe.caloriesPerPortion} kcal</span>
                </p>
             </div>
             
             {hasNutritionData ? (
               <div className="grid gap-3">
                  {recipe.nutritionalDetails.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-stone-950/60 border border-white/5 rounded-2xl hover:bg-stone-900 transition-all">
                      <div className="flex flex-col">
                        <span className="font-bold text-stone-200 text-sm">{item.ingredient}</span>
                        <span className="text-[10px] text-stone-600 uppercase font-black">{item.details}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-roBlue-400 text-lg">{item.calories}</span>
                        <span className="text-[10px] text-stone-700 ml-1 font-black">KCAL</span>
                      </div>
                    </div>
                  ))}
               </div>
             ) : (
                <div className="text-center py-12 bg-stone-950/40 rounded-3xl border border-white/5 border-dashed">
                  <p className="text-stone-600 text-sm font-medium">Informații nutriționale indisponibile.</p>
                </div>
             )}
          </div>
        )}

        {/* Chef Tip */}
        <div className="mt-10 bg-roYellow-400/5 border border-roYellow-500/10 rounded-3xl p-6 flex gap-5">
          <div className="bg-roYellow-500/10 p-3 rounded-2xl h-fit border border-roYellow-500/20 text-roYellow-500">
             <ChefHat size={32} />
          </div>
          <div>
            <h4 className="font-black text-roYellow-500 text-[10px] uppercase tracking-widest mb-2">Sfatul Sătmăreanului</h4>
            <p className="text-stone-300 text-sm italic font-medium leading-relaxed">
              "{recipe.chefTips}"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {onReset && (
            <button 
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 py-4 border border-stone-800 rounded-2xl text-stone-500 font-bold text-sm hover:bg-stone-800 hover:text-stone-200 transition-all"
            >
              <RefreshCw size={18} />
              Reîncepe
            </button>
          )}
          
          {onSave && !isSavedMode && (
            <button 
              onClick={handleSave}
              disabled={isSaved}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all transform active:scale-95 ${
                 isSaved 
                  ? 'bg-green-700 text-white cursor-default shadow-green-900/40 border border-green-600' 
                  : 'bg-gradient-to-r from-roBlue-700 to-roBlue-800 text-white hover:from-roBlue-600 hover:to-roBlue-700 shadow-roBlue-900/40 border border-roBlue-500/30'
              }`}
            >
              {isSaved ? <Check size={20} strokeWidth={3} /> : <Save size={18} />}
              {isSaved ? 'SALVAT ÎN COLECȚIE' : 'SALVEAZĂ REȚETA'}
            </button>
          )}

          {!onSave && isSavedMode && (
             <button 
               onClick={handleShare}
               className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all transform active:scale-95 ${
                 shareState === 'copied' 
                   ? 'bg-stone-700 text-white' 
                   : 'bg-roRed-700 text-white hover:bg-roRed-600 shadow-roRed-900/40 border border-roRed-500/30'
               }`}
             >
               {shareState === 'copied' ? <Check size={18} /> : <Share2 size={18} />}
               {shareState === 'copied' ? 'COPIAT' : 'TRIMITE REȚETA'}
             </button>
          )}
        </div>
      </div>
    </div>
  );
};
