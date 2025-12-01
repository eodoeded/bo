import React from 'react';
import { Settings, Plus, User } from 'lucide-react';
import { Button } from './Button';

export const Header = ({ credits, isAuthenticated, onOpenSettings, onTopUp }) => {
  return (
    <header className="h-16 border-b border-white/5 bg-[#12110d] flex items-center justify-between px-6 shrink-0 z-30 relative">
      <div className="flex items-center gap-3">
        <span className="font-inter text-[18px] text-[#E3E3FD] tracking-[0.2px] cursor-default select-none">
          Branded Objects
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Credit Balance - Minimalist */}
        {isAuthenticated ? (
            <div className="flex items-center gap-3">
               <span className="text-[10px] text-[#E3E3FD]/40 font-mono uppercase tracking-widest">Credits</span>
               <div className="flex items-center gap-2 px-2 py-1 rounded-sm bg-white/5 border border-white/10">
                 <span className="text-xs font-mono text-[#E3E3FD]">{credits}</span>
                 <button 
                    onClick={onTopUp}
                    className="text-[#E3E3FD]/40 hover:text-[#E3E3FD] transition-colors cursor-pointer"
                 >
                    <Plus size={10} />
                 </button>
               </div>
            </div>
        ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10">
                <span className="text-[10px] text-[#E3E3FD]/40 font-mono uppercase tracking-widest">Guest Mode</span>
            </div>
        )}

        <div className="w-px h-4 bg-white/10"></div>

        <button 
          onClick={onOpenSettings}
          className="text-[#E3E3FD]/40 hover:text-[#E3E3FD] transition-colors"
        >
            <Settings size={18} strokeWidth={1.5} />
        </button>
        
        {isAuthenticated ? (
            <div className="h-7 w-7 bg-[#3B3B3B] text-[#E3E3FD] text-[10px] font-mono rounded-full flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                JP
            </div>
        ) : (
            <div className="h-7 w-7 bg-white/5 text-[#E3E3FD]/40 text-[10px] rounded-full flex items-center justify-center border border-white/10">
                <User size={12} />
            </div>
        )}
      </div>
    </header>
  );
};
