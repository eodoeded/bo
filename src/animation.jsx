import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import upComp from "./assets/up-comp.png";
import bottomComp from "./assets/bottom-comp.png";
import './index.css';

const Animation = () => {
  // Sequence: 
  // 0: "Your technology is complex."
  // 1: [Robot Visual] + "Your story shouldn't be."
  // 2: Offering List
  // 3: Branded Objects + CTA
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setScene(1), 2500); // Hook duration
    const timer2 = setTimeout(() => setScene(2), 7000); // Example duration
    const timer3 = setTimeout(() => setScene(3), 11000); // Offerings duration
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="w-full h-screen bg-[#000000] flex items-center justify-center p-4">
      
      {/* Frame for recording (4:5 Aspect Ratio - Standard Vertical Video/LinkedIn) */}
      <div className="relative w-full max-w-[540px] aspect-[4/5] bg-[#12110D] overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10">
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.1]" 
             style={{ backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>

        <AnimatePresence mode="wait">
          
          {/* SCENE 1: THE PROBLEM */}
          {scene === 0 && (
            <motion.div
              key="scene1"
              className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
              exit={{ opacity: 0, y: -20 }}
              transition={transition}
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                className="font-inter text-white text-5xl md:text-6xl font-medium tracking-tighter leading-[1.1]"
              >
                Your technology is <span className="text-[#5C5D5E]">complex.</span>
              </motion.h1>
            </motion.div>
          )}

          {/* SCENE 2: THE SOLUTION */}
          {scene === 1 && (
            <motion.div
              key="scene2"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={transition}
            >
              {/* Visual */}
              <div className="relative w-full h-1/2 flex items-center justify-center mb-12">
                 <motion.div
                    className="relative"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                 >
                    <motion.img
                        src={bottomComp}
                        className="w-[280px] object-contain relative z-0"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.img
                        src={upComp}
                        className="w-[120px] object-contain absolute -top-12 left-1/2 -translate-x-1/2 z-10"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: [0, -10, 0], opacity: 1 }}
                        transition={{ 
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
                            opacity: { duration: 0.5 }
                        }}
                    />
                 </motion.div>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ...transition }}
                className="font-inter text-white text-4xl md:text-5xl font-medium tracking-tighter leading-tight text-center px-8"
              >
                Your story shouldn't be.
              </motion.h1>
            </motion.div>
          )}

          {/* SCENE 3: THE OFFERINGS */}
          {scene === 2 && (
            <motion.div
              key="scene3"
              className="absolute inset-0 flex flex-col items-start justify-center px-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={transition}
            >
                <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-12"
                >
                    Services
                </motion.p>

                <div className="space-y-8">
                    {[
                        "Product Visuals",
                        "Web Design",
                        "Design Systems"
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-4"
                        >
                            <span className="text-[#5C5D5E] font-mono text-sm">0{i + 1}</span>
                            <h2 className="font-inter text-white text-3xl md:text-4xl font-medium tracking-tight">
                                {item}
                            </h2>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
          )}

          {/* SCENE 4: THE BRAND / CTA */}
          {scene === 3 && (
            <motion.div
              key="scene4"
              className="absolute inset-0 flex flex-col items-center justify-between py-24 px-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition}
            >
               <div className="flex-1 flex flex-col justify-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8"
                    >
                         {/* Abstract Logo Mark placeholder if no logo file */}
                         <div className="w-20 h-20 bg-white mx-auto mb-6 rotate-45 mix-blend-exclusion"></div>
                         <h2 className="font-inter text-3xl tracking-[0.2em] uppercase text-white mb-2">Branded Objects</h2>
                         <p className="font-inter-light text-[#E3E3FD] opacity-60 text-sm tracking-widest uppercase">Design for Deep Tech</p>
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, ...transition }}
                        className="space-y-2"
                    >
                        <p className="font-inter text-white text-xl">Now accepting clients for Q4.</p>
                    </motion.div>
               </div>

               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1 }}
                 className="w-full border-t border-white/20 pt-6"
               >
                   <p className="font-mono text-xs text-[#5C5D5E] uppercase tracking-widest">brandedobjects.com</p>
               </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
        
      </div>
      
      <p className="fixed bottom-8 text-[#5C5D5E] font-mono text-xs uppercase tracking-widest">
        4:5 Aspect Ratio • 1080x1350 • Ready to Record
      </p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Animation />
  </React.StrictMode>
);
