import React, { useState } from 'react';
import { X, UserPlus, LogIn, ChefHat, Mail, User, Key, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Props {
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (supabase) {
        // --- SUPABASE FLOW ---
        if (isRegister) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name,
                avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
              },
            },
          });
          if (error) throw error;
          if (data.user) {
            // onSuccess handled by App.tsx listener, but we can close modal
            onClose();
          }
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          if (data.user) {
            onClose();
          }
        }
      } else {
        // --- LOCAL FALLBACK FLOW (No Keys) ---
        // Simulate a network delay
        await new Promise(r => setTimeout(r, 800));
        
        if (isRegister && !name.trim()) {
          throw new Error("Te rugăm să introduci un nume.");
        }
        
        // Mock success
        onSuccess(
          name.trim() || email.split('@')[0], 
          email.trim() || `${name.toLowerCase().replace(/\s/g, '')}@bucatar.ro`
        );
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "A apărut o eroare. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 w-full max-w-md rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 flex">
           <div className="flex-1 bg-roBlue-600"></div>
           <div className="flex-1 bg-roYellow-500"></div>
           <div className="flex-1 bg-roRed-600"></div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-roBlue-950/40 p-3 rounded-2xl text-roBlue-400 border border-roBlue-800/50">
              <ChefHat size={32} />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-500">
              <X size={24} />
            </button>
          </div>

          <h2 className="text-2xl font-black text-stone-100 mb-2 uppercase tracking-tight">
            {isRegister ? 'Creează Cont' : 'Autentificare'}
          </h2>
          <p className="text-stone-500 text-xs mb-6 font-medium">
            {isRegister 
              ? 'Alătură-te comunității și salvează rețetele preferate.' 
              : 'Bine ai revenit! Loghează-te pentru a accesa rețetele.'}
          </p>

          {!supabase && (
            <div className="bg-roYellow-900/10 border border-roYellow-500/20 p-4 rounded-2xl flex gap-3 mb-6 items-start relative overflow-hidden">
               <div className="bg-roYellow-500/10 p-2 rounded-lg text-roYellow-500 shrink-0 border border-roYellow-500/20">
                  <Key size={18} />
               </div>
               <div>
                  <h3 className="text-roYellow-500 font-black text-[10px] uppercase tracking-widest mb-1">Mod Demo (Fără Database)</h3>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Supabase nu este configurat. Contul va fi salvat doar local în browserul tău.
                  </p>
               </div>
            </div>
          )}

          {error && (
            <div className="bg-roRed-900/20 text-roRed-400 p-3 rounded-xl mb-4 text-xs font-bold border border-roRed-900/50 flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Numele tău"
                  className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-5 py-4 text-stone-200 text-sm focus:border-roBlue-500/50 outline-none transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresa de Email"
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-5 py-4 text-stone-200 text-sm focus:border-roBlue-500/50 outline-none transition-all"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parola"
                minLength={6}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-5 py-4 text-stone-200 text-sm focus:border-roBlue-500/50 outline-none transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-roBlue-700 to-roBlue-800 hover:from-roBlue-600 hover:to-roBlue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-roBlue-950/50 flex items-center justify-center gap-3 border border-roBlue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isRegister ? <UserPlus size={18} /> : <LogIn size={18} />)}
              {isRegister ? 'Creează Cont' : 'Intră în Cont'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
             <button 
               type="button"
               onClick={() => { setIsRegister(!isRegister); setError(null); }}
               className="text-xs font-bold text-stone-500 hover:text-white transition-colors"
             >
               {isRegister ? 'Ai deja cont? Autentifică-te' : 'Nu ai cont? Înregistrează-te'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};