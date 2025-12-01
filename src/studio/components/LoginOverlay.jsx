import React, { useState, useEffect } from 'react';
import { Box } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginOverlay = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Persist login state
    localStorage.setItem('bo_studio_auth', 'true');
    localStorage.setItem('bo_studio_user', JSON.stringify({
      name: 'JP',
      email: 'jp@brandedobjects.com',
      avatar: 'JP'
    }));
    
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12110d] overflow-hidden font-inter-light">
       {/* Background Ambient Effect */}
       <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, rgba(18,17,13,0) 0%, rgba(28,26,20,0.8) 100%)' }}
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 1.0 }}
        transition={{ duration: 2 }}
      />
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
         className="relative z-10 w-full max-w-sm bg-[#1C1A14] border border-white/10 p-12 rounded-sm flex flex-col items-center text-center"
       >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-10 h-10 bg-[#3B3B3B] text-[#E3E3FD] flex items-center justify-center rounded-sm mb-8 border border-white/10"
          >
             <Box size={20} strokeWidth={1.5} />
          </motion.div>
          
          <h1 className="text-xl text-[#E3E3FD] mb-2 tracking-tight font-medium">Studio Access</h1>
          <p className="text-[#E3E3FD]/40 text-xs mb-10 leading-relaxed max-w-[240px]">
              Sign in to access the Branded Objects deep tech marketing OS.
          </p>
          
          <motion.button 
            type="button"
            initial="rest"
            animate="rest"
            whileHover={isLoading ? "rest" : "hover"}
            whileTap={isLoading ? "rest" : "hover"}
            onClick={handleLogin}
            disabled={isLoading}
            variants={{ rest: { color: "#E3E3FD", transition: { duration: 0.2 } }, hover: { color: "#FFFFFF", transition: { duration: 0.2 } } }}
            className="
              group w-full font-inter-light text-[#E3E3FD] text-[13px]
              bg-[#3B3B3B] cursor-pointer
              border-[1px] border-[#FFFFFF4D]
              backdrop-blur-[6.5px]
              px-[16px] py-[10px]
              flex items-center justify-center gap-3
              disabled:opacity-50 disabled:cursor-wait
            "
          >
             {isLoading ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
             ) : (
               <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="Google" />
             )}
             <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
          </motion.button>
          
          <div className="mt-8 flex items-center gap-4 w-full opacity-30">
              <div className="h-px bg-white/20 flex-1"></div>
              <div className="text-[9px] text-[#E3E3FD] font-mono uppercase tracking-[0.2em]">Restricted</div>
              <div className="h-px bg-white/20 flex-1"></div>
          </div>
       </motion.div>
    </div>
  );
};
