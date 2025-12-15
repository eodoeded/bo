import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function UnifiedNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isGuidelines = location.pathname === '/brandguidelines' || location.pathname === '/brand-guidelines';
  const isStudio = location.pathname.startsWith('/studio');

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
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#261E19] backdrop-blur-md">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-12 md:h-14 flex items-center justify-between">
        
        {/* Brand / Logo - Left */}
        <div className="flex items-center gap-4">
          <Link to="/" className="group flex items-center gap-3" onClick={() => window.scrollTo(0,0)}>
            <span className="font-mono text-sm tracking-widest text-white group-hover:text-[#E3E3FD] transition-colors uppercase">[ BO ]</span>
          </Link>
          
          {/* Context Divider */}
          {isStudio && (
            <>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">
                {location.pathname.includes('/builder') ? 'Builder' : 'Studio'}
              </span>
            </>
          )}
        </div>

        {/* Nav - Center (Desktop, Landing Only) */}
        {isLanding && (
          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => scrollToSection('process')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors relative group">
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E3E3FD] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => scrollToSection('value')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors relative group">
              Value
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E3E3FD] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => scrollToSection('specs')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors relative group">
              Specs
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E3E3FD] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {isLanding && (
            <button 
              onClick={focusEmail}
              className="bg-white text-black px-4 md:px-5 py-2 md:py-2.5 font-mono font-semibold text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-[#E3E3FD] transition-colors border border-transparent rounded-sm"
            >
              Request Access
            </button>
          )}
          
          {isGuidelines && (
            <Link 
              to="/"
              className="font-mono text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors"
            >
              Back to Home
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white/60 hover:text-white transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && isLanding && (
        <div className="fixed inset-0 top-12 md:top-14 bg-[#261E19] z-40 flex flex-col p-6 border-t border-white/10 md:hidden">
          <button onClick={() => scrollToSection('process')} className="py-4 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60">Process</button>
          <button onClick={() => scrollToSection('value')} className="py-4 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60">Value</button>
          <button onClick={() => scrollToSection('specs')} className="py-4 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60">Specifications</button>
        </div>
      )}
    </header>
  );
}

