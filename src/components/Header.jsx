import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const focusEmail = () => {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.focus();
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#020202]/80 backdrop-blur-md">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-12">
            <Link to="/" className="group flex items-center gap-3" onClick={() => window.scrollTo(0,0)}>
                <div className="w-10 h-10 border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-[#E3E3FD]/50 transition-colors">
                    <span className="font-mono text-sm tracking-widest text-white group-hover:text-[#E3E3FD] transition-colors">[ B ]</span>
                </div>
                <span className="font-montreal font-medium text-lg text-white tracking-tight hidden md:block group-hover:text-[#E3E3FD] transition-colors">Branded Objects</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                <button onClick={() => scrollToSection('process')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors">Process</button>
                <button onClick={() => scrollToSection('value')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors">Value</button>
                <button onClick={() => scrollToSection('specs')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors">Specs</button>
                <Link to="/brandguidelines" className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1">
                    System <div className="w-1 h-1 bg-[#E3E3FD] rounded-full animate-pulse ml-1"></div>
                </Link>
            </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-white/5 bg-white/[0.02] rounded-full">
                <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse"></div>
                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">v1.0 Operational</span>
            </div>
            
            <button 
                onClick={focusEmail}
                className="bg-white text-black px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest hover:bg-[#E3E3FD] transition-colors border border-transparent"
            >
                Request Access
            </button>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-white/60 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-[#020202] z-40 flex flex-col p-6 border-t border-white/10 md:hidden">
             <button onClick={() => scrollToSection('process')} className="py-4 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60">Process</button>
             <button onClick={() => scrollToSection('value')} className="py-4 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60">Value</button>
             <button onClick={() => scrollToSection('specs')} className="py-4 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60">Specifications</button>
             <Link to="/brandguidelines" className="py-4 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60">System Guidelines</Link>
        </div>
      )}
    </header>
  );
}
