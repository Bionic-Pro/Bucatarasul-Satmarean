import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { UserCircle, Save, Trash2, X, AlertTriangle, ShieldCheck, Mail, Key, Settings2, ExternalLink } from 'lucide-react';
import { COMMON_ALLERGENS } from '../constants';

interface Props {
  user: UserProfile;
  onClose: () => void;
  onUpdate: (updatedUser: UserProfile) => void;
  onDelete: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<Props> = ({ user, onClose, onUpdate, onDelete, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'cont' | 'preferinte' | 'api'>('cont');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [allergens, setAllergens] = useState<string[]>(user.preferences.allergens || []);
  const [avoidIngredients, setAvoidIngredients] = useState(user.preferences.avoidIngredients || '');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      const aiStudio = (window as any).aistudio;
      if (aiStudio?.hasSelectedApiKey) {
        try {
          const selected = await aiStudio.hasSelectedApiKey();
          setHasKey(selected);
        } catch (e) {
          console.error("Eroare la verificarea cheii:", e);
        }
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio?.openSelectKey) {
      await aiStudio.openSelectKey();
      // Presupunem succesul conform regulilor de race condition
      setHasKey(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ 
      ...user, 
      name, 
      email, 
      preferences: { 
        ...user.preferences, 
        allergens, 
        avoidIngredients 
      } 
    });
    onClose();
  };

  const toggleAllergen = (label: string) => {
    setAllergens(prev => 
      prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 w-full max-w-lg rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
        
        {/* Header with Romanian colors indicator */}
        <div className="bg-stone-950 p-6 flex justify-between items-center border-b border-white/5 relative">
          <div className="absolute top-0 left-0 w-full h-1 flex">
             <div className="flex-1 bg-roBlue-600"></div>
             <div className="flex-1 bg-roYellow-500"></div>
             <div className="flex-1 bg-roRed-600"></div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-roBlue-950/50 flex items-center justify-center text-roBlue-400 border border-roBlue-800/50">
                <UserCircle size={24} />
             </div>
             <div>
                <h2 className="text-lg font-black text-stone-100 uppercase tracking-tight">Profil Bucătar</h2>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Personalizează experiența</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-400">
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-950/50 p-1 border-b border-white/5">
           <button 
             onClick={() => setActiveTab('cont')}
             className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${activeTab === 'cont' ? 'bg-stone-800 text-roBlue-400' : 'text-stone-600'}`}
           >
             Cont
           </button>
           <button 
             onClick={() => setActiveTab('preferinte')}
             className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${activeTab === 'preferinte' ? 'bg-stone-800 text-roYellow-500' : 'text-stone-600'}`}
           >
             Preferințe
           </button>
           <button 
             onClick={() => setActiveTab('api')}
             className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${activeTab === 'api' ? 'bg-stone-800 text-roRed-500' : 'text-stone-600'}`}
           >
             API
           </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {!confirmDelete ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'cont' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-[10px] font-black text-stone-600 uppercase tracking-widest mb-2">Nume Afișat</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-5 py-3.5 text-stone-200 text-sm focus:border-roBlue-500/50 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="bg-roBlue-950/10 rounded-2xl p-5 border border-roBlue-900/20 flex gap-4">
                     <ShieldCheck className="text-roBlue-500 shrink-0" size={24} />
                     <div>
                        <p className="font-black text-roBlue-100 text-[11px] uppercase mb-1">Securitate Date</p>
                        <p className="text-[10px] text-stone-500 leading-relaxed font-medium">Informațiile sunt salvate doar pe dispozitivul tău.</p>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferinte' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-[10px] font-black text-stone-600 uppercase tracking-widest mb-3">Alergeni Salvați</label>
                    <div className="flex flex-wrap gap-2">
                       {COMMON_ALLERGENS.map(alg => (
                         <button
                           key={alg.id}
                           type="button"
                           onClick={() => toggleAllergen(alg.label)}
                           className={`px-3 py-1.5 rounded-full text-[10px] font-black border transition-all ${
                             allergens.includes(alg.label) 
                               ? 'bg-roRed-900/40 border-roRed-500 text-roRed-100' 
                               : 'bg-stone-950 border-stone-800 text-stone-700'
                           }`}
                         >
                           {alg.label}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-stone-600 uppercase tracking-widest mb-3">Evită Automat</label>
                    <input 
                      type="text"
                      value={avoidIngredients}
                      onChange={(e) => setAvoidIngredients(e.target.value)}
                      placeholder="Separați prin virgulă..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-5 py-3.5 text-stone-200 text-sm focus:border-roYellow-500/50 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-6 animate-fade-in text-center">
                   <div className="w-16 h-16 bg-stone-950 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5 shadow-inner">
                      <Key className={hasKey ? "text-green-500" : "text-roRed-500"} size={32} />
                   </div>
                   <h3 className="text-sm font-black text-stone-100 uppercase tracking-widest">Configurare AI</h3>
                   <p className="text-[11px] text-stone-500 leading-relaxed max-w-xs mx-auto">
                     Aplicația folosește modelele Gemini Pro și Veo. Asigură-te că proiectul tău are billing activ.
                   </p>
                   
                   <div className="grid gap-3">
                     <button 
                       type="button"
                       onClick={handleSelectKey}
                       className="w-full py-4 bg-stone-800 hover:bg-stone-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border border-white/5 flex items-center justify-center gap-2"
                     >
                        <Key size={16} /> {hasKey ? "Schimbă Cheia API" : "Selectează Cheia API"}
                     </button>
                     
                     <a 
                       href="https://ai.google.dev/gemini-api/docs/billing" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-[10px] font-black text-roBlue-400 uppercase tracking-widest hover:underline flex items-center justify-center gap-1"
                     >
                       Documentație Plată <ExternalLink size={12} />
                     </a>
                   </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={onLogout}
                  className="px-6 py-4 bg-stone-800 hover:bg-stone-700 text-stone-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Ieșire
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-gradient-to-r from-roBlue-700 to-roBlue-800 hover:from-roBlue-600 hover:to-roBlue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-roBlue-950/50 flex items-center justify-center gap-2 border border-roBlue-500/30"
                >
                  <Save size={16} /> Salvează
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-20 h-20 bg-roRed-950/20 text-roRed-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-roRed-500/20">
                 <AlertTriangle size={40} />
              </div>
              <h3 className="text-2xl font-black text-stone-100 mb-3 uppercase">Confirmă Ștergerea</h3>
              <p className="text-stone-500 text-xs mb-8 max-w-xs mx-auto">
                Vei șterge profilul și toate rețetele salvate.
              </p>
              <div className="flex gap-4">
                 <button onClick={() => setConfirmDelete(false)} className="flex-1 py-4 bg-stone-800 text-stone-200 rounded-2xl font-black text-[10px] uppercase">Anulează</button>
                 <button onClick={onDelete} className="flex-1 py-4 bg-roRed-700 text-white rounded-2xl font-black text-[10px] uppercase">Șterge</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};