import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { UserCircle, Save, Trash2, X, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';

interface Props {
  user: UserProfile;
  onClose: () => void;
  onUpdate: (updatedUser: UserProfile) => void;
  onDelete: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<Props> = ({ user, onClose, onUpdate, onDelete, onLogout }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, name, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 w-full max-w-md rounded-3xl border border-stone-800 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-stone-950 p-6 flex justify-between items-center border-b border-stone-800">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-brand-900/50 flex items-center justify-center text-brand-400 border border-brand-800">
                <UserCircle size={24} />
             </div>
             <div>
                <h2 className="text-lg font-bold text-stone-100">Profilul Meu</h2>
                <p className="text-xs text-stone-500">Gestionează setările contului</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-400 hover:text-stone-200">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!confirmDelete ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5">Nume</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    Email <span className="opacity-50 font-normal normal-case">(Simulat)</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3.5 text-stone-600" />
                    <input 
                      type="email" 
                      value={email}
                      disabled
                      className="w-full bg-stone-950/50 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Stats/Info Badge */}
              <div className="bg-stone-800/30 rounded-xl p-4 border border-stone-800 flex gap-4">
                 <ShieldCheck className="text-brand-500 shrink-0" size={20} />
                 <div className="text-xs text-stone-400">
                    <p className="font-bold text-stone-300 mb-1">Preferințe Salvate</p>
                    <p>Alergenii și ingredientele de evitat sunt memorate automat pentru acest profil.</p>
                 </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={onLogout}
                  className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl font-semibold text-sm transition-colors border border-stone-700"
                >
                  Deconectare
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] py-3 bg-brand-700 hover:bg-brand-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-900/30 flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Salvează Modificări
                </button>
              </div>

              <div className="border-t border-stone-800 pt-4 mt-2">
                 <button 
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 text-xs font-bold transition-colors mx-auto"
                 >
                    <Trash2 size={14} /> Șterge Profilul Definitiv
                 </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-16 h-16 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-900/50">
                 <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-2">Ești sigur?</h3>
              <p className="text-stone-400 text-sm mb-6 max-w-xs mx-auto">
                Această acțiune va șterge profilul <strong>{user.name}</strong> și toate rețetele salvate asociate acestuia. Nu se poate anula.
              </p>
              <div className="flex gap-3">
                 <button 
                   onClick={() => setConfirmDelete(false)}
                   className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold text-sm"
                 >
                   Anulează
                 </button>
                 <button 
                   onClick={onDelete}
                   className="flex-1 py-3 bg-red-700 hover:bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-900/30"
                 >
                   Da, Șterge Tot
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};