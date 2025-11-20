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
  // 2: Offering List (Staggered grid)
  // 3: Branded Objects + CTA
  const [scene, setScene] = useState(0);

  useEffect(() => {
    // Force a hard refresh of state on mount to ensure no caching issues in React state
    setScene(0);
    
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

  // Hudson-Powell esque Kinetic Text variant
  const splitText = (text) => {
      return text.split(" ").map((word, i) => (
          <motion.span 
            key={i} 
            className="inline-block mr-2"
            initial={{ y: 40, opacity: 0, rotateX: 45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
              {word}
          </motion.span>
      ));
  };

  return (
    <div className="w-full h-screen bg-[#000000] flex items-center justify-center p-4">
      
      {/* Frame for recording (4:5 Aspect Ratio) */}
      <div className="relative w-full max-w-[540px] aspect-[4/5] bg-[#12110D] overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10">
        
        {/* Grid Background (Consistent with landing) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.1]" 
             style={{ backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>

        <AnimatePresence mode="wait">
          
          {/* SCENE 1: THE PROBLEM - Kinetic Typography */}
          {scene === 0 && (
            <motion.div
              key="scene1"
              className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={transition}
            >
              <h1 className="font-inter text-white text-5xl md:text-6xl font-medium tracking-tighter leading-[1.1]">
                {splitText("Your technology is")} <span className="text-[#5C5D5E] inline-block">{splitText("complex.")}</span>
              </h1>
            </motion.div>
          )}

          {/* SCENE 2: THE SOLUTION - Heroic Robot Parallax */}
          {scene === 1 && (
            <motion.div
              key="scene2"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={transition}
            >
              {/* Visual */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-[100px] bg-gradient-to-b from-[#E3E3FD]/10 to-transparent pointer-events-none"></div>
              
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                 <motion.div
                    className="relative mb-16"
                    initial={{ y: 100, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                 >
                    <motion.img
                        src={bottomComp}
                        className="w-[320px] object-contain relative z-0"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.img
                        src={upComp}
                        className="w-[140px] object-contain absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: [0, -20, 0], opacity: 1 }}
                        transition={{ 
                            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
                            opacity: { duration: 0.5 }
                        }}
                    />
                 </motion.div>

                 <motion.h1 
                    className="font-inter text-white text-4xl md:text-5xl font-medium tracking-tighter leading-tight text-center px-8 relative z-20"
                 >
                    {splitText("Your story shouldn't be.")}
                 </motion.h1>
              </div>
            </motion.div>
          )}

          {/* SCENE 3: THE OFFERINGS - Kinetic Grid */}
          {scene === 2 && (
            <motion.div
              key="scene3"
              className="absolute inset-0 flex flex-col items-center justify-center px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={transition}
            >
                <div className="grid gap-6 w-full">
                    {[
                        { id: "01", text: "Product Visuals" },
                        { id: "02", text: "Web Design" },
                        { id: "03", text: "Design Systems" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-baseline justify-between border-b border-white/10 pb-4"
                        >
                            <h2 className="font-inter text-white text-3xl md:text-4xl font-medium tracking-tight">
                                {item.text}
                            </h2>
                            <span className="text-[#5C5D5E] font-mono text-xs">{item.id}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
          )}

          {/* SCENE 4: THE BRAND / CTA - Clean Minimalist */}
          {scene === 3 && (
            <motion.div
              key="scene4"
              className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#12110D]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition}
            >
               <div className="flex flex-col items-center justify-center h-full w-full relative z-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-12"
                    >
                         {/* Geometric Logo Representation */}
                         <div className="relative w-24 h-24 mx-auto mb-8">
                             <motion.div 
                                className="absolute inset-0 border border-white/20" 
                                animate={{ rotate: 360 }} 
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                             />
                             <motion.div 
                                className="absolute inset-4 border border-[#E3E3FD]" 
                                animate={{ rotate: -360 }} 
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                             />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-2 h-2 bg-white rounded-full"></div>
                             </div>
                         </div>
                         
                         <h2 className="font-inter text-4xl tracking-tight font-medium text-white mb-3">Branded Objects</h2>
                         <p className="font-inter-light text-[#E3E3FD] opacity-60 text-sm tracking-[0.3em] uppercase">Design for Deep Tech</p>
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, ...transition }}
                        className="space-y-8"
                    >
                        <p className="font-inter text-white text-xl">Now accepting clients for Q4.</p>
                        
                        <div className="inline-block border border-white/20 px-6 py-3 rounded-full">
                             <p className="font-mono text-xs text-white uppercase tracking-widest">brandedobjects.com</p>
                        </div>
                    </motion.div>
               </div>
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
