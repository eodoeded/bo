import { motion } from 'framer-motion';
import { useState } from 'react';
import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";

export default function WaitlistHero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Update state first
    setStatus('success');
    const emailBody = email; // Capture value before clearing
    setEmail('');
    
    // Construct mailto link
    const subject = encodeURIComponent("Join Waitlist - Branded Objects");
    const body = encodeURIComponent(`Please add ${emailBody} to the Branded Objects waitlist.`);
    
    // Slight delay to ensure UI updates before opening email client
    setTimeout(() => {
        window.location.href = `mailto:brandedobjects@gmail.com?subject=${subject}&body=${body}`;
        // Reset status after opening email client
        setTimeout(() => setStatus('idle'), 2000);
    }, 500);
  };

  const slide = {
    bottomImg: bottomComp,
    upImg: upComp,
    bottomWidth: "w-[200px] md:w-[320px]",
    upWidth: "w-[110px] md:w-[170px] max-w-none",
    upOffset: "-top-10 md:-top-14",
    bottomAnimate: { y: [0, -8, 0] },
    upAnimate: { y: [0, -10, 0] }
  };

  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-start relative pt-12 md:pt-20 px-6 overflow-hidden">
      
      {/* Spot Mini Animation Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center mb-16 h-[300px] md:h-[400px]">
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 flex justify-center items-center">
                {/* Decorative Corners - Refined, thinner lines (Venice/Normal Computing style) */}
                <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[400px] pointer-events-none opacity-40">
                    {/* Top Left */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-[0.5px] border-l-[0.5px] border-white"></div>
                    {/* Top Right */}
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-[0.5px] border-r-[0.5px] border-white"></div>
                    {/* Bottom Left */}
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[0.5px] border-l-[0.5px] border-white"></div>
                    {/* Bottom Right */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[0.5px] border-r-[0.5px] border-white"></div>
                </div>
                
                {/* Fine grid lines overlay - REMOVED */}
                
                <div className="relative flex flex-col items-center justify-center h-full w-full">
                    <div className="relative flex items-center justify-center">
                        {/* Bottom Part */}
                        <motion.div
                            className={`relative z-0`} style={{ willChange: "transform" }}
                            animate={slide.bottomAnimate}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
                        >
                            <img
                                src={slide.bottomImg} 
                                alt="Bottom component"
                                decoding="async"
                                className={`relative object-contain ${slide.bottomWidth}`}
                                style={{ aspectRatio: 'auto' }}
                            />
                        </motion.div>

                        {/* Top Part */}
                        <motion.div
                            className={`absolute left-1/2 -translate-x-1/2 ${slide.upOffset}`} 
                            style={{ willChange: "transform", zIndex: 2 }}
                            animate={slide.upAnimate}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                        >
                            <img
                                src={slide.upImg} 
                                alt="Top component"
                                decoding="async"
                                className={`object-contain ${slide.upWidth}`}
                                style={{ aspectRatio: 'auto' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto pb-20">
        {/* Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
            <div className="h-[0.5px] w-12 bg-white/30"></div>
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-[#E3E3FD]/60 uppercase">
              Product for Design Agencies
            </p>
            <div className="h-[0.5px] w-12 bg-white/30"></div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-inter-light text-white text-[42px] md:text-[64px] leading-[1.05] tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Branded Objects
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-inter-light text-[#E3E3FD]/70 text-[16px] md:text-[18px] max-w-xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Create custom "mini-tools" for your clients.<br className="hidden md:block"/> Generate on-brand graphics without breaking brand rules.
        </motion.p>
        
        {/* Email Capture - Ultra thin, technical style */}
        <motion.form 
          className="flex flex-col sm:flex-row w-full max-w-[440px] relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleJoin}
        >
          <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/20 to-white/10 opacity-50 blur-[1px] group-hover:opacity-75 transition duration-500"></div>
          <div className="relative flex flex-col sm:flex-row w-full bg-[#050505] border border-white/10 p-[2px]">
            <input 
                type="email" 
                placeholder="ENTER EMAIL ADDRESS" 
                className="flex-1 bg-transparent text-white px-4 py-3 font-mono text-[11px] focus:outline-none placeholder:text-white/20 tracking-wide uppercase"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button 
                type="submit"
                className="bg-white text-black px-6 py-3 font-mono text-[10px] tracking-widest hover:bg-[#E3E3FD] transition-colors whitespace-nowrap uppercase font-bold border border-white"
            >
                Join Waitlist
            </button>
          </div>
        </motion.form>
        {status === 'success' && (
            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="mt-4 font-mono text-[10px] text-green-400 tracking-widest uppercase"
            >
                Opening email client...
            </motion.p>
        )}
      </div>
    </section>
  );
}
