import React from 'react';
import { ChefHat, Clock, BookHeart, ArrowLeft, Download, UserCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  onShowSaved: () => void;
  onGoHome: () => void;
  isSavedView: boolean;
  onInstall?: () => void;
  canInstall?: boolean;
  user: UserProfile | null;
  onLogin: () => void;
  onOpenProfile: () => void;
  savedCount: number;
}

const GoogleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-1.5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const Hero: React.FC<Props> = ({ 
  onShowSaved, 
  onGoHome, 
  isSavedView, 
  onInstall, 
  canInstall,
  user,
  onLogin,
  onOpenProfile,
  savedCount
}) => {
  return (
    <div className="relative p-8 rounded-b-[2.5rem] shadow-2xl mb-8 overflow-hidden transition-all duration-500 border-b border-white/5">
      {/* Romanian Flag Tri-Gradient Background - Brightened Yellow */}
      <div className="absolute inset-0 flex">
        <div className="w-1/3 h-full bg-roBlue-950/40"></div>
        <div className="w-1/3 h-full bg-roYellow-400/20"></div>
        <div className="w-1/3 h-full bg-roRed-950/40"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-950/80"></div>
      
      <div className="relative z-10">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-roBlue-900/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-roBlue-500/30 text-roBlue-100">
              Satu Mare, România
            </span>
            {canInstall && (
              <button 
                onClick={onInstall}
                className="flex items-center gap-1 bg-roYellow-400 text-roYellow-950 px-3 py-1 rounded-full text-[10px] font-bold hover:bg-roYellow-300 transition-colors shadow-lg shadow-roYellow-500/20"
              >
                <Download size={10} />
                Instalează
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
             {user ? (
               <button 
                 onClick={onOpenProfile}
                 className="flex items-center gap-2 bg-stone-900/60 hover:bg-stone-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border border-white/10 backdrop-blur-md"
               >
                 {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-5 h-5 rounded-full border border-white/20" />
                 ) : (
                    <UserCircle size={16} />
                 )}
                 {user.name}
               </button>
             ) : (
                <button 
                  onClick={onLogin}
                  className="flex items-center gap-1 bg-white text-stone-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-stone-100 transition-colors shadow-xl"
                >
                  <GoogleIcon />
                  Sign In
                </button>
             )}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white leading-tight mt-6 tracking-tight">
          Bucătărașul <span className="text-roYellow-400">Sătmărean</span>
        </h1>
        <p className="text-stone-300 max-w-md text-sm md:text-base mb-8 opacity-90 leading-relaxed font-medium">
          {isSavedView 
            ? "Colecția ta personală de gusturi ardelenești."
            : "Rețete rapide (20-25 min) gândite pentru copii, inspirate din inima Sătmarului."
          }
        </p>

        <div className="flex items-center gap-4">
            {isSavedView ? (
                <button 
                  onClick={onGoHome}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-white/10 backdrop-blur-md"
                >
                  <ArrowLeft size={18} />
                  Generator
                </button>
            ) : (
                <button 
                  onClick={onShowSaved}
                  className="flex items-center gap-2 bg-roRed-700 hover:bg-roRed-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl transition-all border border-roRed-600 shadow-roRed-900/40"
                >
                  <BookHeart size={18} />
                  Colecția Mea {savedCount > 0 ? `(${savedCount})` : ''}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};