import React, { useState } from 'react';
import { Box } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginOverlay = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData = {
        name: email.split('@')[0],
        email: email,
        // Give 5 free credits on signup, 0 on login (unless simulated persistence)
        credits: isSignUp ? 5 : undefined 
    };

    // In a real app, we'd verify credentials here
    // For this MVP, we simulate success
    onLogin(userData);
    setIsLoading(false);
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
         className="relative z-10 w-full max-w-sm bg-[#1C1A14] border border-white/10 p-10 rounded-sm flex flex-col items-center text-center"
       >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-10 h-10 bg-[#3B3B3B] text-[#E3E3FD] flex items-center justify-center rounded-sm mb-6 border border-white/10"
          >
             <Box size={20} strokeWidth={1.5} />
          </motion.div>
          
          <h1 className="text-xl text-[#E3E3FD] mb-2 tracking-tight font-medium">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-[#E3E3FD]/40 text-xs mb-8 leading-relaxed max-w-[240px]">
              {isSignUp 
                ? 'Get started with 5 free credits.' 
                : 'Sign in to access your workspace.'}
          </p>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase tracking-wider text-[#E3E3FD]/60 pl-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#12110d] border border-white/10 rounded-sm py-2.5 px-4 text-sm text-white focus:border-[#E3E3FD] focus:outline-none placeholder:text-white/20 font-inter-light"
                    placeholder="name@company.com"
                  />
              </div>
              
              <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase tracking-wider text-[#E3E3FD]/60 pl-1">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#12110d] border border-white/10 rounded-sm py-2.5 px-4 text-sm text-white focus:border-[#E3E3FD] focus:outline-none placeholder:text-white/20 font-inter-light"
                    placeholder="••••••••"
                  />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#E3E3FD] text-[#12110d] font-medium py-2.5 rounded-sm mt-4 hover:bg-white transition-colors disabled:opacity-50 flex justify-center items-center gap-2 text-sm"
              >
                 {isLoading ? <div className="w-4 h-4 border-2 border-[#12110d] border-t-transparent rounded-full animate-spin"/> : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>
          </form>
          
          <div className="mt-6">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#E3E3FD]/40 text-xs hover:text-[#E3E3FD] transition-colors"
              >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
          </div>
       </motion.div>
    </div>
  );
};
