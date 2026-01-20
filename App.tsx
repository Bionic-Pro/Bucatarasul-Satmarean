import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { IngredientSelector } from './components/IngredientSelector';
import { PreferenceSelector } from './components/PreferenceSelector';
import { RecipeCard } from './components/RecipeCard';
import { SavedRecipesList } from './components/SavedRecipesList';
import { generateRecipe } from './services/geminiService';
import { Recipe, AgeGroup, MealType } from './types';
import { Loader2, Utensils } from 'lucide-react';

const App = () => {
  // State for Generator
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  
  // State for Preferences matching UserPreferences type
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
  const [mealType, setMealType] = useState<MealType>('pranz_cina');
  const [hideVeggies, setHideVeggies] = useState(false);
  const [portions, setPortions] = useState(2);
  const [avoidIngredients, setAvoidIngredients] = useState('');
  const [spices, setSpices] = useState<string[]>([]);
  
  // State for App Logic
  const [loading, setLoading] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // State for Views & Saved Data
  const [view, setView] = useState<'generator' | 'saved' | 'details'>('generator');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedSavedRecipe, setSelectedSavedRecipe] = useState<Recipe | null>(null);

  // Load recipes on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bucataras_recipes');
      if (saved) {
        setSavedRecipes(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load recipes", e);
    }
  }, []);

  const saveToLocalStorage = (recipes: Recipe[]) => {
    try {
      localStorage.setItem('bucataras_recipes', JSON.stringify(recipes));
      setSavedRecipes(recipes);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert("Memoria este plină! Încearcă să ștergi rețete vechi sau cele cu imagini mari.");
      } else {
        console.error("Failed to save", e);
      }
    }
  };

  const handleToggleIngredient = (name: string) => {
    setSelectedIngredients(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleAddCustom = (name: string) => {
    if (!customIngredients.includes(name)) {
      setCustomIngredients(prev => [...prev, name]);
      setSelectedIngredients(prev => [...prev, name]);
    }
  };

  const handleRemoveCustom = (name: string) => {
    setCustomIngredients(prev => prev.filter(i => i !== name));
    setSelectedIngredients(prev => prev.filter(i => i !== name));
  };

  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) {
      setError("Te rugăm să selectezi cel puțin un ingredient!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateRecipe({
        ingredients: selectedIngredients,
        ageGroup,
        mealType,
        hideVeggies,
        portions,
        avoidIngredients,
        spices
      });
      setCurrentRecipe(result);
      setView('generator'); // Stay on generator view but show card
    } catch (err: any) {
      setError(err.message || "Ceva nu a mers bine. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = (recipeToSave: Recipe) => {
    // Avoid duplicates by ID check
    const exists = savedRecipes.find(r => r.id === recipeToSave.id);
    if (!exists) {
      const updatedList = [recipeToSave, ...savedRecipes];
      saveToLocalStorage(updatedList);
    } else {
        // Update existing (e.g. added image)
        const updatedList = savedRecipes.map(r => r.id === recipeToSave.id ? recipeToSave : r);
        saveToLocalStorage(updatedList);
    }
  };

  const handleDeleteRecipe = (id: string) => {
    const updatedList = savedRecipes.filter(r => r.id !== id);
    saveToLocalStorage(updatedList);
    if (selectedSavedRecipe?.id === id) {
       setSelectedSavedRecipe(null);
       setView('saved');
    }
  };

  const handleReset = () => {
    setCurrentRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (view === 'saved') {
      return (
        <SavedRecipesList 
          recipes={savedRecipes} 
          onSelect={(r) => { setSelectedSavedRecipe(r); setView('details'); }}
          onDelete={handleDeleteRecipe}
        />
      );
    }

    if (view === 'details' && selectedSavedRecipe) {
       return (
         <div className="space-y-4">
            <button 
              onClick={() => setView('saved')}
              className="text-sm font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 mb-2"
            >
              ← Înapoi la listă
            </button>
            <RecipeCard recipe={selectedSavedRecipe} isSavedMode={true} />
         </div>
       );
    }

    // Generator View
    if (currentRecipe) {
      return (
        <RecipeCard 
          recipe={currentRecipe} 
          onReset={handleReset} 
          onSave={handleSaveRecipe}
        />
      );
    }

    return (
      <div className="space-y-6">
        <IngredientSelector 
          selectedIds={selectedIngredients}
          onToggle={handleToggleIngredient}
          customIngredients={customIngredients}
          onAddCustom={handleAddCustom}
          onRemoveCustom={handleRemoveCustom}
        />

        <PreferenceSelector 
          ageGroup={ageGroup}
          setAgeGroup={setAgeGroup}
          mealType={mealType}
          setMealType={setMealType}
          hideVeggies={hideVeggies}
          setHideVeggies={setHideVeggies}
          portions={portions}
          setPortions={setPortions}
          avoidIngredients={avoidIngredients}
          setAvoidIngredients={setAvoidIngredients}
          spices={spices}
          setSpices={setSpices}
        />

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="sticky bottom-6 z-20">
          <button
            onClick={handleGenerate}
            disabled={loading || selectedIngredients.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              loading 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : selectedIngredients.length === 0 
                  ? 'bg-slate-200 text-slate-400' 
                  : 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-brand-500/30'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Bucătarul se gândește...
              </>
            ) : (
              <>
                <Utensils className={selectedIngredients.length > 0 ? "animate-bounce" : ""} />
                Generează Rețeta
              </>
            )}
          </button>
        </div>
        
        <div className="text-center text-slate-400 text-xs mt-4 pb-8">
          Powered by AI • Rețete unice de fiecare dată • Inspirat din Satu Mare
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-0">
        <Hero 
          onShowSaved={() => setView('saved')} 
          onGoHome={() => { setView('generator'); handleReset(); }}
          isSavedView={view === 'saved' || view === 'details'}
        />
        
        {renderContent()}
      </div>
    </div>
  );
};

export default App;