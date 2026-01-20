import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { IngredientSelector } from './components/IngredientSelector';
import { PreferenceSelector } from './components/PreferenceSelector';
import { RecipeCard } from './components/RecipeCard';
import { SavedRecipesList } from './components/SavedRecipesList';
import { generateRecipe } from './services/geminiService';
import { Recipe, AgeGroup, MealType } from './types';
import { Loader2, Utensils, AlertTriangle, CheckCircle } from 'lucide-react';

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
  const [allergens, setAllergens] = useState<string[]>([]);
  const [spices, setSpices] = useState<string[]>([]);
  
  // State for App Logic
  const [loading, setLoading] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // State for Views & Saved Data
  const [view, setView] = useState<'generator' | 'saved' | 'details'>('generator');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedSavedRecipe, setSelectedSavedRecipe] = useState<Recipe | null>(null);

  // State for PWA Install Prompt
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load recipes and setup PWA listener on mount
  useEffect(() => {
    // Load Recipes
    try {
      const saved = localStorage.getItem('bucataras_recipes');
      if (saved) {
        setSavedRecipes(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load recipes", e);
    }

    // PWA Install Prompt Listener
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const saveToLocalStorage = (recipes: Recipe[]): boolean => {
    try {
      localStorage.setItem('bucataras_recipes', JSON.stringify(recipes));
      setSavedRecipes(recipes);
      return true;
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        showToast("Memoria telefonului este plină! Șterge rețete vechi pentru a salva altele noi.", 'warning');
      } else {
        console.error("Failed to save", e);
        showToast("Nu am putut salva rețeta. Eroare necunoscută.", 'error');
      }
      return false;
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
        allergens,
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
    let success = false;
    
    if (!exists) {
      const updatedList = [recipeToSave, ...savedRecipes];
      success = saveToLocalStorage(updatedList);
    } else {
        // Update existing (e.g. added image)
        const updatedList = savedRecipes.map(r => r.id === recipeToSave.id ? recipeToSave : r);
        success = saveToLocalStorage(updatedList);
    }

    if (success) {
      showToast("Rețeta a fost salvată cu succes!", 'success');
    }
  };

  const handleDeleteRecipe = (id: string) => {
    const updatedList = savedRecipes.filter(r => r.id !== id);
    const success = saveToLocalStorage(updatedList);
    if (selectedSavedRecipe?.id === id) {
       setSelectedSavedRecipe(null);
       setView('saved');
    }
    if (success) showToast("Rețetă ștearsă.", 'success');
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
              className="text-sm font-semibold text-stone-500 hover:text-brand-400 flex items-center gap-1 mb-2 transition-colors"
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
          allergens={allergens}
          setAllergens={setAllergens}
          spices={spices}
          setSpices={setSpices}
        />

        {error && (
          <div className="bg-red-900/20 text-red-400 p-4 rounded-xl text-sm font-medium border border-red-900/50">
            {error}
          </div>
        )}

        <div className="sticky bottom-6 z-20">
          <button
            onClick={handleGenerate}
            disabled={loading || selectedIngredients.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              loading 
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                : selectedIngredients.length === 0 
                  ? 'bg-stone-800 text-stone-500 border border-stone-700' 
                  : 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-brand-900/50 border border-brand-600'
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
        
        <div className="text-center text-stone-600 text-xs mt-4 pb-8">
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
          onInstall={handleInstallApp}
          canInstall={!!installPrompt}
        />
        
        {renderContent()}

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 min-w-[300px] animate-fade-in ${
            toast.type === 'success' ? 'bg-stone-800 text-white border border-stone-700' :
            toast.type === 'warning' ? 'bg-amber-900 text-amber-100 border border-amber-800' :
            'bg-red-900 text-red-100 border border-red-800'
          }`}>
             {toast.type === 'success' && <CheckCircle className="text-brand-500" size={20} />}
             {toast.type === 'warning' && <AlertTriangle className="text-amber-500" size={20} />}
             {toast.type === 'error' && <AlertTriangle className="text-red-500" size={20} />}
             <span className="font-medium text-sm">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;