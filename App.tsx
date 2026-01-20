import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { IngredientSelector } from './components/IngredientSelector';
import { PreferenceSelector } from './components/PreferenceSelector';
import { CookingMethodSelector } from './components/CookingMethodSelector';
import { RecipeCard } from './components/RecipeCard';
import { SavedRecipesList } from './components/SavedRecipesList';
import { ProfileModal } from './components/ProfileModal';
import { generateRecipe } from './services/geminiService';
import { Recipe, AgeGroup, MealType, UserProfile, CookingMethod } from './types';
import { Loader2, Utensils, AlertTriangle, CheckCircle } from 'lucide-react';

const App = () => {
  // State for Generator
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  
  // State for Preferences matching UserPreferences type
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
  const [mealType, setMealType] = useState<MealType>('pranz_cina');
  const [cookingMethod, setCookingMethod] = useState<CookingMethod>('orice');
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

  // Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const firstLoadRef = useRef(true);

  // State for PWA Install Prompt
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Auth & Persistence Logic ---

  // Load User on Mount
  useEffect(() => {
    const savedUserStr = localStorage.getItem('bucataras_current_user');
    if (savedUserStr) {
      try {
        const userData = JSON.parse(savedUserStr);
        setUser(userData);
        // Load user specific prefs
        if (userData.preferences) {
           setAllergens(userData.preferences.allergens || []);
           setAvoidIngredients(userData.preferences.avoidIngredients || '');
        }
      } catch (e) {
        console.error("Auth load error", e);
      }
    }
  }, []);

  // Load Recipes (Context Aware: Global or User specific?)
  useEffect(() => {
    const storageKey = user ? `bucataras_recipes_${user.id}` : 'bucataras_recipes';
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setSavedRecipes(JSON.parse(saved));
      } else {
        setSavedRecipes([]);
      }
    } catch (e) {
      console.error("Failed to load recipes", e);
    }
  }, [user]);

  // Sync Allergens/Avoids to User Profile whenever they change
  useEffect(() => {
    if (user && !firstLoadRef.current) {
       const updatedUser = {
         ...user,
         preferences: {
           allergens: allergens,
           avoidIngredients: avoidIngredients
         }
       };
       // Only update if actually changed to avoid loop (simplified check)
       if (JSON.stringify(user.preferences) !== JSON.stringify(updatedUser.preferences)) {
         setUser(updatedUser);
         localStorage.setItem('bucataras_current_user', JSON.stringify(updatedUser));
       }
    }
    firstLoadRef.current = false;
  }, [allergens, avoidIngredients]);

  // PWA Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // --- Handlers ---

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  const handleGoogleLogin = () => {
    // Simulate Google Sign In
    const mockUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: 'Utilizator Google',
      email: 'user@gmail.com',
      photoURL: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      preferences: {
        allergens: [],
        avoidIngredients: ''
      }
    };
    
    // Check if we have previous mock user in storage to "restore"
    setUser(mockUser);
    localStorage.setItem('bucataras_current_user', JSON.stringify(mockUser));
    
    // Reset current inputs to user defaults (empty for new user)
    setAllergens([]);
    setAvoidIngredients('');
    
    showToast(`Bun venit, ${mockUser.name}!`, 'success');
  };

  const handleUpdateProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('bucataras_current_user', JSON.stringify(updatedUser));
    showToast('Profil actualizat!', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bucataras_current_user');
    // Reset inputs
    setAllergens([]);
    setAvoidIngredients('');
    setSavedRecipes([]); // Will reload guest recipes in useEffect
    setShowProfileModal(false);
    showToast('Te-ai deconectat.', 'success');
  };

  const handleDeleteProfile = () => {
    if (user) {
      localStorage.removeItem(`bucataras_recipes_${user.id}`);
      handleLogout();
      showToast('Profil șters definitiv.', 'warning');
    }
  };

  const saveToLocalStorage = (recipes: Recipe[]): boolean => {
    const storageKey = user ? `bucataras_recipes_${user.id}` : 'bucataras_recipes';
    try {
      localStorage.setItem(storageKey, JSON.stringify(recipes));
      setSavedRecipes(recipes);
      return true;
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        showToast("Memoria telefonului este plină!", 'warning');
      } else {
        showToast("Eroare la salvare.", 'error');
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
        cookingMethod,
        hideVeggies,
        portions,
        avoidIngredients,
        allergens,
        spices
      });
      setCurrentRecipe(result);
      setView('generator'); 
    } catch (err: any) {
      setError(err.message || "Ceva nu a mers bine.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = (recipeToSave: Recipe) => {
    const exists = savedRecipes.find(r => r.id === recipeToSave.id);
    let success = false;
    if (!exists) {
      const updatedList = [recipeToSave, ...savedRecipes];
      success = saveToLocalStorage(updatedList);
    } else {
        const updatedList = savedRecipes.map(r => r.id === recipeToSave.id ? recipeToSave : r);
        success = saveToLocalStorage(updatedList);
    }
    if (success) showToast("Rețeta a fost salvată!", 'success');
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

    return (
      <div className="space-y-6">
        <IngredientSelector 
          selectedIds={selectedIngredients}
          onToggle={handleToggleIngredient}
          customIngredients={customIngredients}
          onAddCustom={handleAddCustom}
          onRemoveCustom={handleRemoveCustom}
        />

        <CookingMethodSelector 
          selectedMethod={cookingMethod}
          onSelect={setCookingMethod}
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
        
        {/* Result is rendered here only if we stay on generator view */}
        {currentRecipe && (
           <div className="mt-12 border-t border-stone-800 pt-8">
              <RecipeCard 
                recipe={currentRecipe} 
                onReset={handleReset} 
                onSave={handleSaveRecipe}
              />
           </div>
        )}
        
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
          user={user}
          onLogin={handleGoogleLogin}
          onOpenProfile={() => setShowProfileModal(true)}
        />
        
        {renderContent()}

        {showProfileModal && user && (
          <ProfileModal 
            user={user}
            onClose={() => setShowProfileModal(false)}
            onUpdate={handleUpdateProfile}
            onDelete={handleDeleteProfile}
            onLogout={handleLogout}
          />
        )}

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