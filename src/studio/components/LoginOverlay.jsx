import React from 'react';
import { Box } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginOverlay = ({ onLogin }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12110d] overflow-hidden">
       {/* Background Ambient Effect */}
       <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, rgba(18,17,13,0) 0%, rgba(28,26,20,0.4) 100%)' }}
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 1.0 }}
        transition={{ duration: 2 }}
      />
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
         className="relative z-10 w-full max-w-md bg-[#1C1A14]/80 backdrop-blur-xl border border-white/10 p-10 rounded-sm shadow-2xl flex flex-col items-center"
       >
          <div className="flex flex-col items-center text-center w-full">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-12 h-12 bg-[#E3E3FD] text-[#12110d] flex items-center justify-center rounded-sm mb-8 shadow-lg shadow-white/5"
              >
                 <Box size={24} strokeWidth={2.5} />
              </motion.div>
              
              <h1 className="text-3xl font-inter-light text-white mb-3 tracking-tight">Welcome to Studio</h1>
              <p className="text-[#E3E3FD]/50 text-sm mb-10 leading-relaxed max-w-xs">
                  Sign in to access the Branded Objects deep tech marketing OS.
              </p>
              
              <button 
                onClick={onLogin}
                className="group w-full flex items-center justify-center gap-3 bg-white text-[#12110d] font-medium py-3.5 px-4 rounded-sm hover:bg-[#E3E3FD] transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-white/10 active:scale-[0.98]"
              >
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 transition-transform group-hover:scale-110" alt="Google" />
                 <span className="font-inter-light font-semibold tracking-wide">Sign in with Google</span>
              </button>
              
              <div className="mt-8 flex items-center gap-4 w-full">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <div className="text-[10px] text-[#E3E3FD]/20 font-mono uppercase tracking-[0.2em]">Internal Access Only</div>
                  <div className="h-px bg-white/10 flex-1"></div>
              </div>
          </div>
       </motion.div>
    </div>
  );
};

