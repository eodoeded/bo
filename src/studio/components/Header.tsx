import React from 'react';
import { Box, Settings, User, CreditCard, Plus } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  credits: number;
}

export const Header: React.FC<HeaderProps> = ({ credits }) => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-30 relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-sm">
          <Box size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-gray-900">branded objects</span>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Deep Tech Marketing OS</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <div className="text-sm font-medium text-gray-900 border-b-2 border-black pb-0.5">Studio</div>
      </nav>

      <div className="flex items-center gap-4">
        {/* Credit Balance Widget */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-full pl-4 pr-1.5 py-1.5 border border-gray-200">
           <div className="flex flex-col items-end leading-none mr-1">
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Balance</span>
              <span className="text-sm font-bold text-gray-900 font-mono">{credits} CR</span>
           </div>
           <Button variant="primary" className="h-7 px-3 text-xs rounded-full">
              <Plus size={12} className="mr-1" /> Top Up
           </Button>
        </div>

        <div className="w-px h-6 bg-gray-200 mx-2"></div>

        <button className="text-gray-400 hover:text-gray-900">
            <Settings size={20} />
        </button>
        <div className="h-8 w-8 bg-gray-900 text-white rounded-full flex items-center justify-center border border-gray-200">
            <span className="text-xs font-bold">JP</span>
        </div>
      </div>
    </header>
  );
};