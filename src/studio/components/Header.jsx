import React from 'react';
import { Box, Settings, User, CreditCard, Plus } from 'lucide-react';
import { Button } from './Button';

export const Header = ({ credits }) => {
  return (
    <header className="h-16 border-b border-white/10 bg-[#12110d] flex items-center justify-between px-6 shrink-0 z-30 relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#E3E3FD] text-[#12110d] flex items-center justify-center rounded-sm">
          <Box size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col font-inter-light">
            <span className="font-semibold text-sm tracking-tight text-white">branded objects</span>
            <span className="text-[10px] text-[#E3E3FD]/40 font-mono uppercase tracking-widest">Deep Tech Marketing OS</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <div className="text-sm font-medium text-white border-b-2 border-white pb-0.5">Studio</div>
      </nav>

      <div className="flex items-center gap-4">
        {/* Credit Balance Widget */}
        <div className="flex items-center gap-3 bg-white/5 rounded-full pl-4 pr-1.5 py-1.5 border border-white/10">
           <div className="flex flex-col items-end leading-none mr-1">
              <span className="text-[10px] text-[#E3E3FD]/40 font-medium uppercase tracking-wide font-inter-light">Balance</span>
              <span className="text-sm font-bold text-white font-mono">{credits} CR</span>
           </div>
           <Button variant="primary" className="h-7 px-3 text-xs rounded-full bg-[#E3E3FD] text-[#12110d] hover:bg-white border-none">
              <Plus size={12} className="mr-1" /> Top Up
           </Button>
        </div>

        <div className="w-px h-6 bg-white/10 mx-2"></div>

        <button className="text-[#E3E3FD]/40 hover:text-white transition-colors">
            <Settings size={20} />
        </button>
        <div className="h-8 w-8 bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
            <span className="text-xs font-bold">JP</span>
        </div>
      </div>
    </header>
  );
};
