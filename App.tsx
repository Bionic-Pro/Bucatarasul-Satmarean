import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { IngredientSelector } from './components/IngredientSelector';
import { PreferenceSelector } from './components/PreferenceSelector';
import { CookingMethodSelector } from './components/CookingMethodSelector';
import { RecipeCard } from './components/RecipeCard';
import { SavedRecipesList } from './components/SavedRecipesList';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import { Inspiration } from './components/Inspiration';
import { generateRecipe } from './services/geminiService';
import { supabase } from './services/supabase';
import { Recipe, AgeGroup, MealType, UserProfile, CookingMethod } from './types';
import { Loader2, Utensils, CheckCircle, ChevronRight, ChevronLeft, Key, X, ExternalLink } from 'lucide-react';

// Helper for image compression to save localStorage space / bandwidth
const compressImage = (base64Str: string, maxWidth = 600, quality = 0.6): Promise<string> => {
  return new Promise((resolve) => {
    // If not a base64 image or too short, return as is
    if (!base64Str || !base64Str.startsWith('data:image')) {
      resolve(base64Str);
      return;
    }

    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw white background (for transparency issues when converting to jpeg)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        // Compress to JPEG
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
  });
};

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
  
  const [view, setView] = useState<'generator' | 'saved' | 'details' | 'inspiration' | 'generated'>('generator');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedSavedRecipe, setSelectedSavedRecipe] = useState<Recipe | null>(null);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showApiBanner, setShowApiBanner] = useState(true);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- AUTH & DATA LOADING ---

  useEffect(() => {
    // 1. Initial Load: Check Supabase Session or LocalStorage
    const initSession = async () => {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Fetch Profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              name: profile.full_name || session.user.email?.split('@')[0] || 'Utilizator',
              email: profile.email || session.user.email || '',
              photoURL: profile.avatar_url,
              preferences: profile.preferences || { allergens: [], avoidIngredients: '' }
            });
            if (profile.preferences) {
               setAllergens(profile.preferences.allergens || []);
               setAvoidIngredients(profile.preferences.avoidIngredients || '');
            }
          }
          // Fetch Recipes from DB
          loadRecipesFromSupabase(session.user.id);
          return;
        }
      } 
      
      // Fallback: Local Storage
      const savedUserStr = localStorage.getItem('bucataras_current_user');
      if (savedUserStr) {
        try {
          const userData = JSON.parse(savedUserStr);
          setUser(userData);
          if (userData.preferences) {
             setAllergens(userData.preferences.allergens || []);
             setAvoidIngredients(userData.preferences.avoidIngredients || '');
          }
          loadRecipesFromLocal(userData.id);
        } catch (e) {}
      } else {
        loadRecipesFromLocal('guest');
      }
    };

    initSession();

    // 2. Auth State Listener (Supabase)
    const { data: authListener } = supabase?.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
         setShowAuthModal(false);
         const { data: profile } = await supabase!
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
         
         if (profile) {
           const newUser = {
              id: profile.id,
              name: profile.full_name || 'Utilizator',
              email: profile.email || '',
              photoURL: profile.avatar_url,
              preferences: profile.preferences || { allergens: [], avoidIngredients: '' }
           };
           setUser(newUser);
           showToast(`Bine ai venit, ${newUser.name}!`, 'success');
           loadRecipesFromSupabase(newUser.id);
         }
      } else if (event === 'SIGNED_OUT') {
         setUser(null);
         setSavedRecipes([]);
         setView('generator');
         showToast("Deconectat.", 'success');
      }
    }) || { data: { subscription: { unsubscribe: () => {} } } };

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const loadRecipesFromSupabase = async (userId: string) => {
    if (!supabase) return;
    const { data, error } = await supabase.from('recipes').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      // Map DB structure back to app structure if needed (assuming 1:1 match in recipe_data)
      const mappedRecipes: Recipe[] = data.map((row: any) => ({
        ...row.recipe_data,
        id: row.id, // Use DB UUID
        imageUrl: row.image_url || row.recipe_data.imageUrl // Prefer separate col if used, or JSON
      }));
      setSavedRecipes(mappedRecipes);
    }
  };

  const loadRecipesFromLocal = (userId: string) => {
    const storageKey = `bucataras_recipes_${userId}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setSavedRecipes(JSON.parse(saved));
      else setSavedRecipes([]);
    } catch (e) {}
  };

  // --- ACTIONS ---

  const handleLoginSuccess = (name: string, email: string) => {
    // This is primarily for the fallback (Local Storage) flow
    const newUser: UserProfile = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      preferences: {
        allergens: [],
        avoidIngredients: ''
      }
    };
    setUser(newUser);
    localStorage.setItem('bucataras_current_user', JSON.stringify(newUser));
    setShowAuthModal(false);
    showToast(`Bine ai venit, ${newUser.name}!`, 'success');
    loadRecipesFromLocal(newUser.id);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      setUser(null);
      localStorage.removeItem('bucataras_current_user');
      setSavedRecipes([]);
      setView('generator');
      setShowProfileModal(false);
      showToast("Te-ai deconectat cu succes.", 'success');
    }
  };

  const handleUpdateUser = async (updatedUser: UserProfile) => {
    setUser(updatedUser);
    if (updatedUser.preferences) {
      setAllergens(updatedUser.preferences.allergens || []);
      setAvoidIngredients(updatedUser.preferences.avoidIngredients || '');
    }

    if (supabase && user) {
      // Update Supabase
      const { error } = await supabase.from('profiles').update({
        full_name: updatedUser.name,
        preferences: updatedUser.preferences
      }).eq('id', user.id);
      
      if (!error) showToast("Profil actualizat (Cloud)!", "success");
    } else {
      // Update Local
      localStorage.setItem('bucataras_current_user', JSON.stringify(updatedUser));
      showToast("Profil actualizat (Local)!", "success");
    }
  };

  const handleToggleIngredient = (name: string) => {
    setSelectedIngredients(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleSelectBatch = (ingredients: string[]) => {
    // Merge new ingredients, avoiding duplicates
    const combined = Array.from(new Set([...selectedIngredients, ...ingredients]));
    setSelectedIngredients(combined);
    showToast(`${ingredients.length} ingrediente adăugate!`, 'success');
  };

  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) {
      setError("Alege ingredientele!");
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
      setView('generated');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError("Eroare. Verifică dacă ai setat cheia API în profil.");
      if(user && !showProfileModal) {
         setShowProfileModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (recipeToSave: Recipe) => {
    let optimizedRecipe = { ...recipeToSave };
    
    // Compress image
    if (optimizedRecipe.imageUrl && optimizedRecipe.imageUrl.length > 50000) {
       try {
         const compressed = await compressImage(optimizedRecipe.imageUrl);
         optimizedRecipe.imageUrl = compressed;
       } catch (e) {
         console.warn("Failed to compress image, saving original.");
       }
    }

    if (supabase && user) {
       // --- SAVE TO SUPABASE ---
       // Check if already exists (by title for now, or ID if we persisted IDs)
       // For "save new", we just insert. For "update", we'd need the DB ID.
       // Assuming simplistic append logic for now.
       
       const recipePayload = {
         user_id: user.id,
         title: optimizedRecipe.title,
         description: optimizedRecipe.description,
         image_url: optimizedRecipe.imageUrl,
         recipe_data: optimizedRecipe
       };

       const { error } = await supabase.from('recipes').insert([recipePayload]);
       
       if (error) {
         console.error(error);
         showToast("Eroare la salvarea în Cloud.", 'error');
       } else {
         showToast(`${optimizedRecipe.title} salvată (Cloud)!`, 'success');
         loadRecipesFromSupabase(user.id);
       }

    } else {
      // --- SAVE TO LOCAL STORAGE ---
      const exists = savedRecipes.find(r => r.id === optimizedRecipe.id || r.title === optimizedRecipe.title);
      let updatedList;
      if (exists) {
        updatedList = savedRecipes.map(r => (r.id === exists.id || r.title === exists.title) ? { ...optimizedRecipe, id: r.id } : r);
      } else {
        updatedList = [optimizedRecipe, ...savedRecipes];
      }
      
      const storageKey = user ? `bucataras_recipes_${user.id}` : 'bucataras_recipes_guest';
      
      try {
        localStorage.setItem(storageKey, JSON.stringify(updatedList));
        setSavedRecipes(updatedList);
        showToast(`${optimizedRecipe.title} salvată!`, 'success');
      } catch (e: any) {
        console.error(e);
        if (e.name === 'QuotaExceededError' || e.code === 22) {
          showToast("Memorie plină! Șterge din rețetele vechi.", 'error');
        } else {
          showToast("Eroare la salvare.", 'error');
        }
      }
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    if (supabase && user) {
       // Delete from DB
       const { error } = await supabase.from('recipes').delete().eq('id', id);
       if (!error) {
         setSavedRecipes(prev => prev.filter(r => r.id !== id));
         showToast("Rețetă ștearsă (Cloud).", 'success');
         if (selectedSavedRecipe?.id === id) {
            setSelectedSavedRecipe(null);
            setView('saved');
         }
       } else {
         showToast("Eroare la ștergere.", 'error');
       }
    } else {
      // Delete Local
      const updatedList = savedRecipes.filter(r => r.id !== id);
      const storageKey = user ? `bucataras_recipes_${user.id}` : 'bucataras_recipes_guest';
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
      setSavedRecipes(updatedList);
      if (selectedSavedRecipe?.id === id) {
         setSelectedSavedRecipe(null);
         setView('saved');
      }
      showToast("Rețetă ștearsă.", 'success');
    }
  };

  const handleReset = () => {
    setCurrentRecipes([]);
    setCurrentRecipeIdx(0);
    setView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (view === 'inspiration') {
      return (
        <Inspiration onBack={() => setView('generator')} />
      );
    }

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
            <button onClick={() => setView('saved')} className="text-xs font-black uppercase tracking-widest text-stone-500 hover:text-roBlue-400 flex items-center gap-2 mb-4 transition-colors">
              <ChevronLeft size={16} /> Înapoi la colecție
            </button>
            <RecipeCard recipe={selectedSavedRecipe} isSavedMode={true} />
         </div>
       );
    }

    if (view === 'generated' && currentRecipes.length > 0) {
        return (
            <div className="animate-fade-in space-y-6">
                <div className="flex items-center justify-between mb-4 px-2">
                    <button
                        onClick={() => setView('generator')}
                        className="text-xs font-black uppercase tracking-widest text-stone-500 hover:text-roBlue-400 flex items-center gap-2 transition-colors bg-stone-900/40 px-4 py-3 rounded-xl border border-white/5 hover:bg-stone-800"
                    >
                        <ChevronLeft size={16} /> Modifică Ingredientele
                    </button>
                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest hidden sm:block">Rezultate Generale</span>
                </div>

                 {currentRecipes.length > 1 && (
                    <div className="flex items-center justify-between mb-6 bg-stone-950/80 p-4 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl">
                        <button onClick={() => setCurrentRecipeIdx(p => Math.max(0, p - 1))} disabled={currentRecipeIdx === 0} className="p-3 disabled:opacity-20 text-roBlue-500 hover:bg-white/5 rounded-2xl transition-all"><ChevronLeft size={28} /></button>
                        <div className="text-center">
                            <span className="text-[9px] font-black text-stone-600 uppercase tracking-[0.4em]">Propunerea {currentRecipeIdx + 1} din {currentRecipes.length}</span>
                            <h4 className="text-base font-black text-roYellow-400 tracking-tight">{currentRecipes[currentRecipeIdx].mealType}</h4>
                        </div>
                        <button onClick={() => setCurrentRecipeIdx(p => Math.min(currentRecipes.length - 1, p + 1))} disabled={currentRecipeIdx === currentRecipes.length - 1} className="p-3 disabled:opacity-20 text-roRed-500 hover:bg-white/5 rounded-2xl transition-all"><ChevronRight size={28} /></button>
                    </div>
                )}
                
                <RecipeCard 
                    key={currentRecipes[currentRecipeIdx].id} 
                    recipe={currentRecipes[currentRecipeIdx]} 
                    onReset={handleReset} 
                    onSave={handleSaveRecipe} 
                />
            </div>
        );
    }

    return (
      <div className="space-y-6 animate-fade-in">
        <IngredientSelector 
          selectedIds={selectedIngredients}
          onToggle={handleToggleIngredient}
          onSelectBatch={handleSelectBatch}
          customIngredients={customIngredients}
          onAddCustom={(n) => { setCustomIngredients(p => [...p, n]); setSelectedIngredients(p => [...p, n]); }}
          onRemoveCustom={(n) => { setCustomIngredients(p => p.filter(i => i !== n)); setSelectedIngredients(p => p.filter(i => i !== n)); }}
        />

        <CookingMethodSelector selectedMethod={cookingMethod} onSelect={setCookingMethod} />

        <PreferenceSelector 
          ageGroup={ageGroup} setAgeGroup={setAgeGroup}
          mealTypes={mealTypes} setMealTypes={setMealTypes}
          hideVeggies={hideVeggies} setHideVeggies={setHideVeggies}
          portions={portions} setPortions={setPortions}
          avoidIngredients={avoidIngredients} setAvoidIngredients={setAvoidIngredients}
          allergens={allergens} setAllergens={setAllergens}
          spices={spices} setSpices={setSpices}
          user={user} onUpdateUser={handleUpdateUser}
        />

        {error && <div className="bg-roRed-900/20 text-roRed-400 p-4 rounded-2xl text-xs font-bold border border-roRed-900/40 text-center">{error}</div>}

        <div className="sticky bottom-6 z-20 pb-4">
          <button
            onClick={handleGenerate}
            disabled={loading || selectedIngredients.length === 0}
            className={`w-full py-5 rounded-[2.5rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 border-b-4 ${
              loading 
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed border-stone-900'
                : selectedIngredients.length === 0 
                  ? 'bg-stone-900/80 text-stone-600 border border-stone-800' 
                  : 'bg-gradient-to-r from-roBlue-700 via-roYellow-600 to-roRed-700 text-white shadow-stone-950 border-white/20 hover:brightness-110'
            }`}
          >
            {loading ? <><Loader2 className="animate-spin" /> Pregătim...</> : <><Utensils className={selectedIngredients.length > 0 ? "animate-bounce" : ""} /> Generează Gustul Ardelenesc</>}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-0">
        {user && showApiBanner && (
           <div className="mt-4 mb-2 bg-roBlue-950/30 border border-roBlue-500/20 p-3 rounded-2xl flex items-center justify-between animate-fade-in backdrop-blur-md mx-2">
              <div className="flex items-center gap-3">
                 <div className="bg-roBlue-500/10 p-2 rounded-xl text-roBlue-400 border border-roBlue-500/20">
                   <Key size={16} />
                 </div>
                 <div className="flex flex-col">
                    <p className="text-[10px] font-black text-roBlue-200 uppercase tracking-wider">Configurare Necesară</p>
                    <p className="text-[11px] text-stone-400 font-medium leading-tight">Nu uita să setezi cheia API în profil pentru AI.</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => setShowProfileModal(true)}
                   className="px-3 py-1.5 bg-roBlue-600/20 text-roBlue-200 hover:bg-roBlue-600 hover:text-white rounded-lg text-[10px] font-bold uppercase transition-all"
                 >
                   Setează
                 </button>
                 <button onClick={() => setShowApiBanner(false)} className="p-1.5 text-stone-500 hover:text-white transition-colors">
                   <X size={14} />
                 </button>
              </div>
           </div>
        )}
        
        <Hero 
          onShowSaved={() => setView('saved')} 
          onShowInspiration={() => setView('inspiration')}
          onGoHome={() => { setView('generator'); handleReset(); }}
          isSavedView={view === 'saved' || view === 'details' || view === 'inspiration' || view === 'generated'} 
          user={user}
          onLogin={() => setShowAuthModal(true)} 
          onOpenProfile={() => setShowProfileModal(true)}
          savedCount={savedRecipes.length}
        />
        {renderContent()}
        {showProfileModal && user && (
          <ProfileModal 
            user={user} onClose={() => setShowProfileModal(false)}
            onUpdate={handleUpdateUser}
            onDelete={() => {
              const storageKey = `bucataras_recipes_${user.id}`;
              localStorage.removeItem(storageKey);
              handleLogout();
            }}
            onLogout={handleLogout}
          />
        )}
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleLoginSuccess}
          />
        )}
        {toast && (
          <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-[2rem] shadow-2xl z-50 flex items-center gap-4 animate-fade-in border-2 ${
            toast.type === 'warning' ? 'bg-roRed-950 text-roRed-100 border-roRed-800/50' :
            toast.type === 'error' ? 'bg-roRed-950 text-roRed-200 border-roRed-800' :
            'bg-roBlue-950 text-white border-roBlue-800/50'
          }`}>
             {toast.type === 'success' && <CheckCircle className="text-roYellow-400" size={20} strokeWidth={3} />}
             <span className="font-black text-[11px] uppercase tracking-widest">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;