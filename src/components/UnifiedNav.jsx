import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signOut, getCurrentUser } from '../services/auth';
import { isSupabaseConfigured } from '../lib/supabase';

export default function UnifiedNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const isGuidelines = location.pathname === '/brand-guidelines' || location.pathname === '/brandguidelines' || location.pathname === '/designsystem';
  const isStudio = location.pathname.startsWith('/studio');
  const isBuilder = location.pathname.includes('/builder');
  const isLogin = location.pathname === '/login';
  const isSignUp = location.pathname === '/signup';

  useEffect(() => {
    // Defer auth check to prevent blocking initial render
    const timer = setTimeout(() => {
      const checkAuth = async () => {
        if (isSupabaseConfigured()) {
          const user = await getCurrentUser();
          setIsAuthenticated(!!user);
        } else {
          setIsAuthenticated(true); // Fallback mode
        }
      };
      checkAuth();
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      if (isSupabaseConfigured()) {
        await signOut();
      }
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      navigate('/login');
    }
  };

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
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#261E19] backdrop-blur-md" style={{ willChange: 'transform' }}>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-12 md:h-14 flex items-center justify-between">
        
        {/* Brand / Logo - Left */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/" className="group flex items-center gap-2 md:gap-3" onClick={() => window.scrollTo(0,0)}>
            <span className="font-mono text-sm tracking-widest text-white group-hover:text-[#E3E3FD] transition-colors uppercase">[ BO ]</span>
          </Link>
          
          {/* Context Indicators */}
          {isStudio && (
            <>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="font-mono text-[9px] md:text-[10px] text-[#E3E3FD] uppercase tracking-widest">
                STUDIO
              </span>
              {isBuilder && (
                <>
                  <div className="h-4 w-px bg-white/10"></div>
                  <span className="font-mono text-[9px] md:text-[10px] text-white/60 uppercase tracking-widest">
                    BUILDER
                  </span>
                </>
              )}
            </>
          )}
          
          {isGuidelines && (
            <>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="font-mono text-[9px] md:text-[10px] text-white/60 uppercase tracking-widest">
                BRAND_GUIDELINES
              </span>
            </>
          )}
        </div>

        {/* Nav - Center (Desktop, Landing Only) */}
        {isLanding && (
          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            <button onClick={() => scrollToSection('process')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors relative group">
              PROCESS
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E3E3FD] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => scrollToSection('value')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors relative group">
              VALUE
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E3E3FD] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button onClick={() => scrollToSection('specs')} className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors relative group">
              SPECS
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E3E3FD] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          {isLanding && (
            <button 
              onClick={focusEmail}
              className="bg-[#E3E3FD] text-[#261E19] px-4 md:px-5 py-2 md:py-2.5 font-mono font-semibold text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white transition-colors border border-transparent rounded-lg"
            >
              <span className="hidden sm:inline">REQUEST_ACCESS</span>
              <span className="sm:hidden">ACCESS</span>
            </button>
          )}
          
          {(isGuidelines || isLogin || isSignUp) && (
            <Link 
              to="/"
              className="font-mono text-[9px] md:text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors"
            >
              BACK_TO_HOME
            </Link>
          )}

          {isStudio && isAuthenticated && (
            <>
              {isBuilder && (
                <Link
                  to="/studio"
                  className="font-mono text-[9px] md:text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors hidden sm:inline"
                >
                  BACK_TO_STUDIO
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="font-mono text-[9px] md:text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <LogOut size={12} className="md:w-[14px] md:h-[14px]" />
                <span className="hidden sm:inline">SIGN_OUT</span>
              </button>
            </>
          )}

          {/* Mobile Menu Toggle - Only show on landing */}
          {isLanding && (
            <button 
              className="md:hidden text-white/60 hover:text-white transition-colors z-50 relative" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay - Premium slide-in drawer */}
      {isMenuOpen && isLanding && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 top-12 md:top-14 w-[280px] bg-[#1A1614] border-r border-white/10 z-50 md:hidden flex flex-col shadow-2xl">
            <div className="flex flex-col p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">NAVIGATION</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <button 
                onClick={() => scrollToSection('process')} 
                className="w-full py-4 px-4 border border-white/5 rounded-lg font-mono text-[10px] text-left uppercase tracking-widest text-white/60 hover:text-white hover:border-white/10 hover:bg-white/5 transition-colors"
              >
                PROCESS
              </button>
              <button 
                onClick={() => scrollToSection('value')} 
                className="w-full py-4 px-4 border border-white/5 rounded-lg font-mono text-[10px] text-left uppercase tracking-widest text-white/60 hover:text-white hover:border-white/10 hover:bg-white/5 transition-colors"
              >
                VALUE
              </button>
              <button 
                onClick={() => scrollToSection('specs')} 
                className="w-full py-4 px-4 border border-white/5 rounded-lg font-mono text-[10px] text-left uppercase tracking-widest text-white/60 hover:text-white hover:border-white/10 hover:bg-white/5 transition-colors"
              >
                SPECIFICATIONS
              </button>
            </nav>
            <div className="p-4 border-t border-white/10">
              <button 
                onClick={focusEmail}
                className="w-full bg-[#E3E3FD] text-[#261E19] px-4 py-3 font-mono font-semibold text-[10px] uppercase tracking-widest hover:bg-white transition-colors rounded-lg"
              >
                REQUEST_ACCESS
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

