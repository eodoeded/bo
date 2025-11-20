import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

const Animation = () => {
  // Sequence: 
  // 0: "Your technology is complex."
  // 1: "Your story shouldn't be." (with SVG icon)
  // 2: Offering List (Card style)
  // 3: Branded Objects + CTA
  const [scene, setScene] = useState(0);

  useEffect(() => {
    setScene(0);
    const timer1 = setTimeout(() => setScene(1), 2500); // Hook
    const timer2 = setTimeout(() => setScene(2), 7000); // Solution
    const timer3 = setTimeout(() => setScene(3), 11000); // Offerings
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
  const strokeWidth = "0.6";

  // Simplified SVG Icon (Central Hub / Network) for the "Story" scene
  const NetworkIcon = () => (
    <motion.svg viewBox="0 0 100 100" className="w-[200px] h-[200px] text-[#E3E3FD]">
        <motion.g style={{ transformOrigin: "50px 50px" }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
            <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.3" />
            {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 30 * Math.cos(rad);
                const y = 50 + 30 * Math.sin(rad);
                return (
                    <g key={i}>
                        <line x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" />
                        <motion.circle cx={50} cy={50} r="1" fill="currentColor" animate={{ cx: [50, x], cy: [50, y], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "linear" }} />
                        <motion.circle cx={x} cy={y} r="2" fill="none" stroke="currentColor" strokeWidth={strokeWidth} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }} />
                    </g>
                );
            })}
            <motion.circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray="2 4" opacity="0.2" animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
        </motion.g>
    </motion.svg>
  );

  // Helper for kinetic text
  const splitText = (text) => {
      return text.split(" ").map((word, i) => (
          <motion.span 
            key={i} 
            className="inline-block mr-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
              {word}
          </motion.span>
      ));
  };

  return (
    <div className="w-full h-screen bg-[#000000] flex items-center justify-center p-4 font-inter-light">
      
      {/* Frame for recording (4:5 Aspect Ratio) */}
      <div className="relative w-full max-w-[540px] aspect-[4/5] bg-[#141311] overflow-hidden shadow-2xl border border-[#FFFFFF0D] flex flex-col">
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <AnimatePresence mode="wait">
          
          {/* SCENE 1: THE PROBLEM */}
          {scene === 0 && (
            <motion.div
              key="scene1"
              className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={transition}
            >
              <h1 className="text-white text-4xl md:text-5xl tracking-tight leading-tight">
                {splitText("Your technology is")} <span className="text-[#5C5D5E] inline-block">{splitText("complex.")}</span>
              </h1>
            </motion.div>
          )}

          {/* SCENE 2: THE SOLUTION */}
          {scene === 1 && (
            <motion.div
              key="scene2"
              className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={transition}
            >
              <div className="mb-12">
                  <NetworkIcon />
              </div>
              <h1 className="text-white text-4xl md:text-5xl tracking-tight leading-tight">
                {splitText("Your story shouldn't be.")}
              </h1>
            </motion.div>
          )}

          {/* SCENE 3: THE OFFERINGS (Card Style) */}
          {scene === 2 && (
            <motion.div
              key="scene3"
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={transition}
            >
                <div className="w-full flex flex-col gap-4">
                    {[
                        { id: "01", text: "Product Visuals" },
                        { id: "02", text: "Web Design" },
                        { id: "03", text: "Design Systems" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="group w-full border border-[#FFFFFF0D] bg-[#1A1915] p-6 flex items-center justify-between"
                        >
                            <h2 className="text-[#E3E3FD] text-2xl tracking-tight">
                                {item.text}
                            </h2>
                            <span className="text-[#5C5D5E] text-xs font-mono tracking-widest">{item.id}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
          )}

          {/* SCENE 4: CTA */}
          {scene === 3 && (
            <motion.div
              key="scene4"
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition}
            >
               <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-8"
               >
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-white text-3xl tracking-tight">Branded Objects</h2>
                        <p className="text-[#5C5D5E] text-xs tracking-[0.25em] uppercase">Design for Deep Tech</p>
                    </div>

                    <div className="w-12 h-[1px] bg-[#FFFFFF0D]"></div>

                    <p className="text-[#E3E3FD] text-xl tracking-tight">
                        Now accepting clients for Q4.
                    </p>
                    
                    <div className="mt-4">
                        <p className="text-white text-sm tracking-wide border-b border-white/20 pb-1">brandedobjects.com</p>
                    </div>
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
