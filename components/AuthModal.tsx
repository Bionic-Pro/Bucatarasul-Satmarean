import React, { useState } from 'react';
import { X, UserPlus, LogIn, ChefHat, Mail, User, Key, AlertTriangle } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSuccess(name.trim(), email.trim() || `${name.toLowerCase().replace(/\s/g, '')}@bucatar.ro`);
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

          <h2 className="text-2xl font-black text-stone-100 mb-2 uppercase tracking-tight">Bine ai venit!</h2>
          <p className="text-stone-500 text-xs mb-6 font-medium">Creează-ți propriul profil de bucătar pentru a salva rețetele preferate.</p>

          {/* API Key Warning Banner */}
          <div className="bg-roYellow-900/10 border border-roYellow-500/20 p-4 rounded-2xl flex gap-3 mb-8 items-start relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-roYellow-500/5 rounded-full blur-xl -mr-4 -mt-4"></div>
             <div className="bg-roYellow-500/10 p-2 rounded-lg text-roYellow-500 shrink-0 border border-roYellow-500/20">
                <Key size={18} />
             </div>
             <div>
                <h3 className="text-roYellow-500 font-black text-[10px] uppercase tracking-widest mb-1">Notă Importantă</h3>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Pentru a genera rețete cu AI, va fi necesar să configurezi o <strong>Cheie API Google Gemini</strong> (gratuită) în setările profilului după ce te autentifici.
                </p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Numele tău"
                  className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-5 py-4 text-stone-200 text-sm focus:border-roBlue-500/50 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (opțional)"
                  className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-5 py-4 text-stone-200 text-sm focus:border-roBlue-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-roBlue-700 to-roBlue-800 hover:from-roBlue-600 hover:to-roBlue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-roBlue-950/50 flex items-center justify-center gap-3 border border-roBlue-500/30"
            >
              <UserPlus size={18} /> Începe Gătitul
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
             <p className="text-[10px] text-stone-600 font-bold uppercase tracking-widest">Aplicația este destinată utilizării individuale</p>
          </div>
        </div>
      </div>
    </div>
  );
};
