import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import upComp from "./assets/up-comp.png";
import bottomComp from "./assets/bottom-comp.png";
import './index.css';

const Animation = () => {
  // Sequence state: 0 = Hook, 1 = Example (Tech), 2 = CTA
  const [scene, setScene] = useState(0);

  // Auto-advance scenes
  useEffect(() => {
    // Hook -> Example after 3s
    const timer1 = setTimeout(() => setScene(1), 3000);
    // Example -> CTA after 7s (3s + 4s duration for example)
    const timer2 = setTimeout(() => setScene(2), 7000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="w-full h-screen bg-[#12110D] flex items-center justify-center overflow-hidden relative">
      {/* Ambient Background Noise/Gradient */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, rgba(18,17,13,0) 0%, rgba(28,26,20,0.2) 100%)' }}
      />

      <AnimatePresence mode="wait">
        
        {/* SCENE 1: HOOK */}
        {scene === 0 && (
          <motion.div
            key="hook"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            transition={transition}
            className="flex flex-col items-center text-center z-10 px-6"
          >
             <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, ...transition }}
                className="font-inter-light text-white text-[42px] md:text-[64px] tracking-tight leading-tight"
             >
                Make it feel <span className="text-[#E3E3FD] italic">personal.</span>
             </motion.h1>
          </motion.div>
        )}

        {/* SCENE 2: EXAMPLE (Floating Tech) */}
        {scene === 1 && (
          <motion.div
            key="example"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={transition}
            className="flex flex-col items-center justify-center z-10 w-full h-full relative"
          >
             <div className="relative flex justify-center items-center w-full scale-90 md:scale-100">
                <motion.div
                    className="relative"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: [0, -8, 0], opacity: 1 }}
                    transition={{ 
                        y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0 },
                        opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }}
                >
                    <img
                        src={bottomComp}
                        alt="Main robot"
                        className="relative z-0 object-contain w-[300px] md:w-[500px]"
                        style={{ aspectRatio: '1001 / 546' }}
                    />
                </motion.div>

                <motion.div
                    className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: [0, -10, 0], opacity: 1 }}
                    transition={{ 
                        y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
                        opacity: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
                    }}
                >
                    <img
                        src={upComp}
                        alt="Floating component"
                        className="object-contain w-[140px] md:w-[200px]"
                        style={{ aspectRatio: '1001 / 546' }}
                    />
                </motion.div>
             </div>
             
             <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.5, ...transition }}
                className="absolute bottom-24 font-inter-light text-[#E3E3FD] text-sm uppercase tracking-[0.2em]"
             >
                System Integration
             </motion.p>
          </motion.div>
        )}

        {/* SCENE 3: CTA */}
        {scene === 2 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition}
            className="flex flex-col items-center text-center z-10 px-6"
          >
             <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, ...transition }}
                className="font-inter-light text-white text-[32px] md:text-[48px] tracking-tight leading-tight mb-8"
             >
                Ready to start?
             </motion.h2>

             <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, ...transition }}
             >
                <a 
                    href="mailto:brandedobjects@gmail.com"
                    className="font-inter text-[#E3E3FD] text-lg border-b border-[#E3E3FD]/30 pb-1 hover:text-white hover:border-white transition-colors"
                >
                    brandedobjects@gmail.com
                </a>
             </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Timeline Progress Bar (Optional visual cue) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full bg-white/20 overflow-hidden"
                style={{ width: i === 1 ? '60px' : '40px' }} // Example is longer
              >
                  {scene === i && (
                      <motion.div 
                        className="h-full bg-[#E3E3FD]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: i === 1 ? 4 : 3, ease: "linear" }}
                      />
                  )}
                  {scene > i && <div className="h-full w-full bg-[#E3E3FD]" />}
              </motion.div>
          ))}
      </div>

    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Animation />
  </React.StrictMode>
);

