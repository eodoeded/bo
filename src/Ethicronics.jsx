import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Icons
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Colors
const RED = '#C8372D';
const BLUE = '#1C3F94'; // Deep Cambridge Blue
const CREAM = '#F4F4F0';
const TEXT = '#1A1A1A';

// Components

const TweedPattern = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Base Grid - Vertical */}
    <div className="absolute inset-0 flex justify-between px-4 md:px-12 opacity-10">
       {[...Array(12)].map((_, i) => (
          <div key={`v-${i}`} className="w-px h-full border-r border-dashed" style={{ borderColor: i % 2 === 0 ? RED : BLUE }}></div>
       ))}
    </div>
    
    {/* Base Grid - Horizontal */}
    <div className="absolute inset-0 flex flex-col justify-between py-12 opacity-10">
       {[...Array(12)].map((_, i) => (
          <div key={`h-${i}`} className="w-full h-px border-b border-dashed" style={{ borderColor: i % 2 === 0 ? BLUE : RED }}></div>
       ))}
    </div>

    {/* "Stitching" Overlay - creating the fabric feel */}
    <div className="absolute inset-0 opacity-[0.03]" 
         style={{ 
             backgroundImage: `repeating-linear-gradient(45deg, ${RED} 0, ${RED} 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, ${BLUE} 0, ${BLUE} 1px, transparent 0, transparent 50%)`, 
             backgroundSize: '16px 16px' 
         }}>
    </div>
  </div>
);

const Nav = () => (
  <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center border-b-2 border-dashed border-[#1C3F94]/20 relative z-10 bg-[#F4F4F0]/90 backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-[#1C3F94] relative flex items-center justify-center text-white font-serif italic font-bold text-2xl shadow-[4px_4px_0px_0px_#C8372D]">
         <span className="z-10">E</span>
         <div className="absolute inset-0 border-2 border-dashed border-white/30 m-0.5"></div>
      </div>
      <span className="font-serif text-2xl text-[#1A1A1A] tracking-tight font-bold">Ethicronics</span>
    </div>
    <div className="hidden md:flex gap-8 font-mono text-sm font-medium tracking-wide text-[#1A1A1A]/80 uppercase">
      <a href="#" className="hover:text-[#C8372D] transition-colors hover:underline decoration-dashed underline-offset-4">Technology</a>
      <a href="#" className="hover:text-[#C8372D] transition-colors hover:underline decoration-dashed underline-offset-4">About</a>
      <a href="#" className="hover:text-[#C8372D] transition-colors hover:underline decoration-dashed underline-offset-4">Blog</a>
    </div>
    <button className="group relative px-6 py-2 font-mono text-sm font-bold uppercase tracking-wider text-[#1C3F94] overflow-hidden">
      <span className="absolute inset-0 border-2 border-[#1C3F94] skew-x-12"></span>
      <span className="absolute inset-0 border-2 border-dashed border-[#C8372D] -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="relative z-10 group-hover:text-[#C8372D] transition-colors">Contact us</span>
    </button>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center px-6 md:px-12 py-20 overflow-hidden">
      
      <div className="max-w-5xl z-10 relative">
        {/* Decorative "Tag" */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8 px-3 py-1 bg-[#C8372D]/10 border border-dashed border-[#C8372D] text-[#C8372D] font-mono text-xs uppercase tracking-widest"
        >
            <ShieldCheck />
            <span>Cambridge, UK</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#1A1A1A] leading-[0.95] mb-12 tracking-tight"
        >
          Hardware Integrity <br/>
          <span className="relative inline-block">
             <span className="relative z-10 text-[#1C3F94] italic font-light">Weaved into Silicon</span>
             <svg className="absolute w-full h-4 bottom-2 left-0 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="#C8372D" strokeWidth="2" strokeDasharray="4 4" fill="none" />
             </svg>
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row gap-12 items-start max-w-4xl"
        >
             <p className="font-sans text-xl md:text-2xl text-[#1A1A1A] leading-relaxed flex-1">
               Ethicronics is a Cambridge-based deep-tech startup building software to verify <span className="font-serif italic text-[#C8372D]">hardware integrity at scale</span>.
             </p>
             <div className="flex-1 border-l-2 border-dashed border-[#1C3F94]/30 pl-8 relative">
                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#C8372D] rounded-full"></div>
                <p className="font-mono text-sm text-[#1A1A1A]/70 leading-relaxed mb-6">
                  Think “digital certificate for every PCB, chiplet or embedded system” to counter counterfeits and tampering.
                </p>
                <button className="text-[#1C3F94] font-bold border-b-2 border-[#C8372D] hover:text-[#C8372D] transition-colors pb-1 font-mono text-sm uppercase tracking-wider">
                  Discover the Platform ->
                </button>
             </div>
        </motion.div>
      </div>
      
      {/* Abstract Visual - "Plaid PCB" */}
      <div className="absolute right-0 top-0 h-full w-full md:w-5/12 pointer-events-none opacity-20 md:opacity-100">
         <div className="w-full h-full bg-[#1C3F94]/5 border-l border-dashed border-[#1C3F94] relative overflow-hidden">
            {/* Grid lines */}
            {[...Array(20)].map((_, i) => (
               <div key={i} className="absolute w-full h-px bg-[#1C3F94]/10" style={{ top: `${i * 5}%` }}></div>
            ))}
            {[...Array(20)].map((_, i) => (
               <div key={i} className="absolute h-full w-px bg-[#C8372D]/10" style={{ left: `${i * 5}%` }}></div>
            ))}
            
            {/* Animated Chip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-64 h-64">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-[#1C3F94] rounded-full"
                    ></motion.div>
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-8 border border-dashed border-[#C8372D] rounded-full"
                    ></motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white shadow-[8px_8px_0px_0px_#1C3F94] border border-[#1A1A1A] flex items-center justify-center p-4">
                            <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`bg-${i % 2 === 0 ? '[#C8372D]' : '[#1C3F94]'} opacity-${i % 3 === 0 ? '100' : '20'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};

const FeatureGrid = () => (
  <section className="py-24 px-6 md:px-12 bg-white border-y-2 border-dashed border-[#1C3F94]/10 relative">
      <div className="grid md:grid-cols-3 gap-px bg-[#1C3F94]/10 border border-[#1C3F94]/10">
          {[
              { title: "Design Stage", desc: "Embed security markers directly into the layout design.", color: RED },
              { title: "Fabrication", desc: "Verify integrity during the manufacturing process.", color: BLUE },
              { title: "Deployment", desc: "Continuous monitoring of hardware health in the field.", color: TEXT }
          ].map((item, i) => (
              <div key={i} className="bg-[#F4F4F0] p-12 hover:bg-white transition-colors group">
                  <div className="w-12 h-12 border-2 border-dashed mb-8 flex items-center justify-center font-mono text-lg font-bold" style={{ borderColor: item.color, color: item.color }}>
                      0{i + 1}
                  </div>
                  <h3 className="font-serif text-3xl mb-4" style={{ color: item.color }}>{item.title}</h3>
                  <p className="font-sans text-[#1A1A1A]/70 leading-relaxed">{item.desc}</p>
                  
                  <div className="mt-8 w-full h-1 bg-[#1A1A1A]/5 overflow-hidden">
                      <div className="h-full w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: item.color }}></div>
                  </div>
              </div>
          ))}
      </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1A1A1A] text-[#F4F4F0] py-20 px-6 md:px-12 relative overflow-hidden">
    {/* Tweed pattern overlay for footer */}
    <div className="absolute inset-0 opacity-[0.05]" 
         style={{ 
             backgroundImage: `repeating-linear-gradient(45deg, #FFF 0, #FFF 1px, transparent 0, transparent 50%)`, 
             backgroundSize: '8px 8px' 
         }}>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
      <div className="col-span-2">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-8 h-8 border border-dashed border-[#F4F4F0] flex items-center justify-center font-serif italic">E</div>
           <h2 className="font-serif text-3xl">Ethicronics</h2>
        </div>
        <p className="font-mono text-sm opacity-70 max-w-md leading-relaxed mb-8">
          COUNTERING COUNTERFEITS.<br/>
          SECURING THE SUPPLY CHAIN.<br/>
          CAMBRIDGE, UNITED KINGDOM.
        </p>
        <div className="flex gap-4">
           <input type="email" placeholder="Enter your email" className="bg-transparent border-b border-dashed border-[#F4F4F0]/30 py-2 px-0 w-64 focus:outline-none focus:border-[#C8372D] font-mono text-sm text-[#F4F4F0]" />
           <button className="text-[#C8372D] font-mono text-sm uppercase hover:text-white transition-colors">Subscribe</button>
        </div>
      </div>
      
      <div>
         <h4 className="font-mono text-xs uppercase tracking-widest text-[#C8372D] mb-6">Sitemap</h4>
         <ul className="space-y-4 font-serif text-lg opacity-80">
            <li><a href="#" className="hover:text-[#C8372D] transition-colors decoration-dashed hover:underline">Technology</a></li>
            <li><a href="#" className="hover:text-[#C8372D] transition-colors decoration-dashed hover:underline">Solutions</a></li>
            <li><a href="#" className="hover:text-[#C8372D] transition-colors decoration-dashed hover:underline">Company</a></li>
         </ul>
      </div>

      <div>
         <h4 className="font-mono text-xs uppercase tracking-widest text-[#C8372D] mb-6">Connect</h4>
         <ul className="space-y-4 font-serif text-lg opacity-80">
            <li><a href="#" className="hover:text-[#C8372D] transition-colors decoration-dashed hover:underline">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[#C8372D] transition-colors decoration-dashed hover:underline">X / Twitter</a></li>
            <li><a href="#" className="hover:text-[#C8372D] transition-colors decoration-dashed hover:underline">Contact</a></li>
         </ul>
      </div>
    </div>
    
    <div className="mt-20 pt-8 border-t border-dashed border-[#F4F4F0]/20 flex flex-col md:flex-row justify-between items-center font-mono text-xs opacity-50 uppercase tracking-widest">
        <p>© 2025 ETHICRONICS LTD.</p>
        <p>DESIGNED WITH PENTAGRAM</p>
    </div>
  </footer>
);

export default function Ethicronics() {
  return (
    <div className="w-full min-h-screen bg-[#F4F4F0] text-[#1A1A1A] selection:bg-[#C8372D] selection:text-white">
      <TweedPattern />
      <Nav />
      <Hero />
      <FeatureGrid />
      <Footer />
    </div>
  );
}
