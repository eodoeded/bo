import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-[#FFFFFF1A] bg-[#12110D] relative z-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
            <span className="font-inter text-[16px] text-[#E3E3FD] tracking-[0.2px]">Branded Objects</span>
            <span className="text-[10px] text-[#E3E3FD]/40 font-mono uppercase tracking-widest">Deep Tech Marketing OS</span>
        </div>
        
        <div className="flex items-center gap-8">
            <a href="mailto:hello@brandedobjects.com" className="text-sm text-[#E3E3FD]/60 hover:text-[#E3E3FD] transition-colors font-inter-light">Contact</a>
            <a href="#" className="text-sm text-[#E3E3FD]/60 hover:text-[#E3E3FD] transition-colors font-inter-light">Twitter</a>
            <a href="#" className="text-sm text-[#E3E3FD]/60 hover:text-[#E3E3FD] transition-colors font-inter-light">LinkedIn</a>
        </div>

        <div className="text-[10px] text-[#E3E3FD]/20 font-mono">
            © 2025 Branded Objects Inc.
        </div>
      </div>
    </footer>
  );
}

