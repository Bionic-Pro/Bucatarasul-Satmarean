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
import { Loader2, Utensils, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const App = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('4-8');
  const [mealTypes, setMealTypes] = useState<MealType[]>(['pranz_cina']);
  const [cookingMethod, setCookingMethod] = useState<CookingMethod>('orice');
  const [hideVeggies, setHideVeggies] = useState(false);
  const [portions, setPortions] = useState(2);
  const [avoidIngredients, setAvoidIngredients] = useState('');
  const [allergens, setAllergens] = useState<string[]>([]);
  const [spices, setSpices] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([]);
  const [currentRecipeIdx, setCurrentRecipeIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [view, setView] = useState<'generator' | 'saved' | 'details'>('generator');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedSavedRecipe, setSelectedSavedRecipe] = useState<Recipe | null>(null);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const savedUserStr = localStorage.getItem('bucataras_current_user');
    if (savedUserStr) {
      try {
        const userData = JSON.parse(savedUserStr);
        setUser(userData);
        if (userData.preferences) {
           setAllergens(userData.preferences.allergens || []);
           setAvoidIngredients(userData.preferences.avoidIngredients || '');
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const storageKey = user ? `bucataras_recipes_${user.id}` : 'bucataras_recipes';
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setSavedRecipes(JSON.parse(saved));
      else setSavedRecipes([]);
    } catch (e) {}
  }, [user]);

  const handleLogin = () => {
    const newUser: UserProfile = {
      id: crypto.randomUUID(),
      name: 'Chef Ardelean',
      email: 'chef@satmar.ro',
      photoURL: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png',
      preferences: {
        allergens: allergens,
        avoidIngredients: avoidIngredients
      }
    };
    setUser(newUser);
    localStorage.setItem('bucataras_current_user', JSON.stringify(newUser));
    showToast(`Bine ai venit, ${newUser.name}!`, 'success');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('bucataras_current_user', JSON.stringify(updatedUser));
  };

  const handleToggleIngredient = (name: string) => {
    setSelectedIngredients(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) {
      setError("Te rugăm să alegi ingredientele!");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await generateRecipe({
        ingredients: selectedIngredients,
        ageGroup,
        mealTypes,
        cookingMethod,
        hideVeggies,
        portions,
        avoidIngredients,
        allergens,
        spices
      });
      setCurrentRecipes(results);
      setCurrentRecipeIdx(0);
      setView('generator');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (err: any) {
      setError("A apărut o eroare. Încearcă din nou!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = (recipeToSave: Recipe) => {
    const exists = savedRecipes.find(r => r.id === recipeToSave.id);
    const updatedList = exists 
      ? savedRecipes.map(r => r.id === recipeToSave.id ? recipeToSave : r)
      : [recipeToSave, ...savedRecipes];
    
    const storageKey = user ? `bucataras_recipes_${user.id}` : 'bucataras_recipes';
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
    setSavedRecipes(updatedList);
    showToast("Rețetă salvată cu succes!", 'success');
  };

  const handleDeleteRecipe = (id: string) => {
    const updatedList = savedRecipes.filter(r => r.id !== id);
    const storageKey = user ? `bucataras_recipes_${user.id}` : 'bucataras_recipes';
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
    setSavedRecipes(updatedList);
    if (selectedSavedRecipe?.id === id) {
       setSelectedSavedRecipe(null);
       setView('saved');
    }
    showToast("Rețetă ștearsă.", 'success');
  };

  const handleReset = () => {
    setCurrentRecipes([]);
    setCurrentRecipeIdx(0);
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
         <div className="space-y-4 animate-fade-in">
            <button onClick={() => setView('saved')} className="text-sm font-bold text-stone-500 hover:text-roBlue-400 flex items-center gap-1 mb-2 transition-colors">
              ← Înapoi la colecție
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
          onAddCustom={(n) => { setCustomIngredients(p => [...p, n]); setSelectedIngredients(p => [...p, n]); }}
          onRemoveCustom={(n) => { setCustomIngredients(p => p.filter(i => i !== n)); setSelectedIngredients(p => p.filter(i => i !== n)); }}
        />

        <CookingMethodSelector 
          selectedMethod={cookingMethod}
          onSelect={setCookingMethod}
        />

        <PreferenceSelector 
          ageGroup={ageGroup}
          setAgeGroup={setAgeGroup}
          mealTypes={mealTypes}
          setMealTypes={setMealTypes}
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
          user={user}
          onUpdateUser={handleUpdateUser}
        />

        {error && (
          <div className="bg-roRed-900/20 text-roRed-400 p-4 rounded-2xl text-xs font-bold border border-roRed-900/40 text-center">
            {error}
          </div>
        )}

        <div className="sticky bottom-6 z-20 pb-4">
          <button
            onClick={handleGenerate}
            disabled={loading || selectedIngredients.length === 0}
            className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
              loading 
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                : selectedIngredients.length === 0 
                  ? 'bg-stone-900/80 text-stone-600 border border-stone-800' 
                  : 'bg-gradient-to-r from-roBlue-700 via-roYellow-600 to-roRed-700 text-white shadow-stone-950 border border-white/20'
            }`}
          >
            {loading ? (
              <><Loader2 className="animate-spin" /> Se pregătește meniul...</>
            ) : (
              <><Utensils className={selectedIngredients.length > 0 ? "animate-bounce" : ""} /> Generează Gustul Ardelenesc</>
            )}
          </button>
        </div>
        
        {currentRecipes.length > 0 && (
           <div className="mt-12 border-t border-white/5 pt-8 pb-12 animate-fade-in">
              {currentRecipes.length > 1 && (
                <div className="flex items-center justify-between mb-6 bg-stone-950/80 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
                  <button onClick={() => setCurrentRecipeIdx(p => Math.max(0, p - 1))} disabled={currentRecipeIdx === 0} className="p-2 disabled:opacity-30 text-roBlue-500"><ChevronLeft size={28} /></button>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">Propunerea {currentRecipeIdx + 1}</span>
                    <h4 className="text-sm font-black text-roYellow-500">{currentRecipes[currentRecipeIdx].mealType}</h4>
                  </div>
                  <button onClick={() => setCurrentRecipeIdx(p => Math.min(currentRecipes.length - 1, p + 1))} disabled={currentRecipeIdx === currentRecipes.length - 1} className="p-2 disabled:opacity-30 text-roRed-500"><ChevronRight size={28} /></button>
                </div>
              )}
              <RecipeCard 
                key={currentRecipes[currentRecipeIdx].id}
                recipe={currentRecipes[currentRecipeIdx]} 
                onReset={handleReset} 
                onSave={handleSaveRecipe}
              />
           </div>
        )}
        
        <div className="text-center text-stone-700 text-[10px] font-bold uppercase tracking-[0.3em] mt-4 pb-12 opacity-50">
          Inspirat de Tradiția Sătmăreană
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
          user={user}
          onLogin={handleLogin} 
          onOpenProfile={() => setShowProfileModal(true)}
          savedCount={savedRecipes.length}
        />
        {renderContent()}
        {showProfileModal && user && (
          <ProfileModal 
            user={user}
            onClose={() => setShowProfileModal(false)}
            onUpdate={handleUpdateUser}
            onDelete={() => {
              localStorage.removeItem('bucataras_current_user');
              localStorage.removeItem(`bucataras_recipes_${user.id}`);
              setUser(null);
              setShowProfileModal(false);
              showToast("Date șterse.", 'warning');
            }}
            onLogout={() => { setUser(null); localStorage.removeItem('bucataras_current_user'); showToast("La revedere!", 'success'); }}
          />
        )}
        {toast && (
          <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-fade-in ${
            toast.type === 'warning' ? 'bg-roRed-900 text-roRed-100 border border-roRed-800' :
            toast.type === 'error' ? 'bg-roRed-950 text-roRed-200 border border-roRed-800' :
            'bg-roBlue-950 text-white border border-roBlue-800'
          }`}>
             {toast.type === 'success' && <CheckCircle className="text-roYellow-500" size={18} />}
             <span className="font-bold text-xs">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;