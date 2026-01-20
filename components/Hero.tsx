import React from 'react';
import { ChefHat, Clock, BookHeart, ArrowLeft, Download, UserCircle, LogIn } from 'lucide-react';
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
  onOpenProfile
}) => {
  return (
    <div className="bg-gradient-to-r from-brand-900 to-brand-950 text-white p-8 rounded-b-[2rem] shadow-2xl shadow-black/50 mb-8 relative overflow-hidden transition-all duration-500 border-b border-brand-800">
      <div className="absolute top-0 right-0 opacity-5 transform translate-x-10 -translate-y-10">
        <ChefHat size={150} />
      </div>
      
      <div className="relative z-10">
        {/* Top Controls: Install + Auth */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-brand-700/50 text-brand-100">
              Satu Mare, România
            </span>
            {canInstall && (
              <button 
                onClick={onInstall}
                className="flex items-center gap-1 bg-brand-500 text-brand-950 px-3 py-1 rounded-full text-xs font-bold hover:bg-brand-400 transition-colors shadow-lg shadow-brand-500/20"
              >
                <Download size={12} />
                App
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
             {user ? (
               <button 
                 onClick={onOpenProfile}
                 className="flex items-center gap-2 bg-stone-800/80 hover:bg-stone-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border border-stone-700 backdrop-blur-sm shadow-lg"
               >
                 {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-4 h-4 rounded-full" />
                 ) : (
                    <UserCircle size={14} />
                 )}
                 {user.name}
               </button>
             ) : (
                <button 
                  onClick={onLogin}
                  className="flex items-center gap-1 bg-white text-stone-900 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-stone-100 transition-colors shadow-lg shadow-black/20"
                >
                  <GoogleIcon />
                  Sign in
                </button>
             )}
          </div>
        </div>

        {/* Title & Navigation */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-stone-100 leading-tight mt-4">
          Bucătărașul Sătmărean
        </h1>
        <p className="text-brand-100 max-w-md text-sm md:text-base mb-6 opacity-90 leading-relaxed">
          {isSavedView 
            ? "Colecția ta de rețete preferate."
            : "Spune-ne ce ai în frigider și noi îți gătim ceva delicios în maxim 25 de minute!"
          }
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
            {isSavedView ? (
                <button 
                onClick={onGoHome}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-colors border border-white/10"
                >
                <ArrowLeft size={16} />
                Înapoi
                </button>
            ) : (
                <button 
                onClick={onShowSaved}
                className="flex items-center gap-2 bg-brand-700 hover:bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors border border-brand-600 shadow-brand-900/50"
                >
                <BookHeart size={16} />
                Rețete {user ? `(${user.preferences?.allergens?.length ? '*' : ''})` : ''}
                </button>
            )}
        </div>
        
        {!isSavedView && (
          <div className="flex items-center gap-4 text-xs font-medium text-brand-200/80 mt-6">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Max. 25 min</span>
            </div>
            <div className="w-1 h-1 bg-brand-600 rounded-full"></div>
            <div>100% Local</div>
          </div>
        )}
      </div>
    </div>
  );
};
