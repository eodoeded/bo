import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WaitlistHero() {
  const [email, setEmail] = useState('');

  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center relative pt-20 px-6 overflow-hidden">
      {/* Background overlay handled in App.jsx */}

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter-light text-[12px] md:text-[13px] tracking-[0.2em] text-[#E3E3FD]/60 uppercase mb-6"
        >
          Product for Design Agencies
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-inter-light text-white text-[48px] md:text-[80px] leading-[1.05] tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Branded Objects
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-inter-light text-[#E3E3FD]/80 text-[18px] md:text-[22px] max-w-2xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Create custom "mini-tools" for your clients.<br className="hidden md:block"/> Generate on-brand graphics without breaking brand rules.
        </motion.p>
        
        {/* Email Capture */}
        <motion.form 
          className="flex flex-col md:flex-row gap-3 w-full max-w-[420px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-white/5 border border-white/20 text-white px-4 py-3 font-inter-light text-[15px] focus:outline-none focus:border-white/40 transition-colors backdrop-blur-sm placeholder:text-white/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            className="bg-[#3B3B3B] text-[#E3E3FD] border border-[#FFFFFF4D] px-6 py-3 font-inter-light text-[15px] hover:bg-[#4B4B4B] transition-all whitespace-nowrap cursor-pointer"
          >
            Join Waitlist
          </button>
        </motion.form>
      </div>
    </section>
  );
}

