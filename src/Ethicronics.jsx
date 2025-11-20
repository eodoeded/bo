import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Colors
const RED = '#C8372D';
const BLACK = '#000000';
const WHITE = '#FFFFFF';
const GRAY = '#F2F2F2';

const Nav = () => (
  <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-end border-b border-black/10 bg-white z-50 relative">
    <div className="flex flex-col leading-none">
       <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8372D] mb-1">Security Protocol</span>
       <span className="font-sans text-2xl font-bold tracking-tighter">Ethicronics</span>
    </div>
    <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest">
      <a href="#" className="hover:text-[#C8372D] transition-colors">Technology</a>
      <a href="#" className="hover:text-[#C8372D] transition-colors">Platform</a>
      <a href="#" className="hover:text-[#C8372D] transition-colors">Company</a>
    </div>
    <button className="px-5 py-2 bg-black text-white font-mono text-xs uppercase tracking-widest hover:bg-[#C8372D] transition-colors">
      Get Access
    </button>
  </nav>
);

const Hero = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col md:flex-row border-b border-black/10">
      <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col justify-center border-r border-black/10 bg-white relative overflow-hidden">
        
        {/* Abstract Background Element */}
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full border-[1px] border-[#C8372D]/20 pointer-events-none"
        />
         <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-10 -top-10 w-[200px] h-[200px] rounded-full border-[1px] border-[#C8372D]/20 pointer-events-none"
        />

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
             <span className="inline-block px-2 py-1 mb-8 border border-black/10 bg-gray-50 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                Cambridge, UK
             </span>
            <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                Hardware Integrity<br/>
                <span className="text-[#C8372D]">Verified.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-black/60 max-w-xl leading-relaxed">
                The digital certificate for every PCB, chiplet, and embedded system. 
                Counterfeiting ends where <span className="text-black font-medium">Ethicronics begins</span>.
            </p>
        </motion.div>
      </div>

      <div className="w-full md:w-1/3 bg-gray-50 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-auto">
          {/* Abstract Visualization of Verification */}
          <div className="relative w-64 h-64">
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1">
                  {[...Array(64)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            delay: Math.random() * 2,
                            ease: "linear" 
                        }}
                        className="bg-[#C8372D] w-full h-full rounded-sm"
                      />
                  ))}
              </div>
               <div className="absolute inset-0 border-2 border-black mix-blend-multiply"></div>
          </div>
      </div>
    </section>
  );
};

const Feature = ({ number, title, description }) => (
    <div className="group border-r border-black/10 last:border-r-0 p-8 md:p-12 hover:bg-gray-50 transition-colors duration-500">
        <span className="font-mono text-xs text-[#C8372D] mb-4 block">0{number}</span>
        <h3 className="font-sans text-3xl font-bold mb-6 tracking-tight group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
        <p className="font-sans text-black/60 leading-relaxed max-w-sm">
            {description}
        </p>
    </div>
)

const FeatureGrid = () => (
  <section className="w-full border-b border-black/10">
      <div className="grid md:grid-cols-3">
          <Feature 
            number="1" 
            title="Design Stage" 
            description="Embed security markers directly into the layout design before a single wafer is printed." 
          />
          <Feature 
            number="2" 
            title="Fabrication" 
            description="Verify physical integrity during the manufacturing process to detect tampering or defects." 
          />
          <Feature 
            number="3" 
            title="Deployment" 
            description="Continuous, real-time monitoring of hardware health in the field via our API." 
          />
      </div>
  </section>
);

const DataSection = () => (
    <section className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 md:p-24 border-r border-black/10 bg-[#C8372D] text-white flex flex-col justify-between">
            <div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight mb-6">The Scale of the Problem</h2>
                <p className="font-sans text-lg opacity-80 max-w-md leading-relaxed">
                    Counterfeit electronics infiltrate critical supply chains, compromising safety and security globally.
                </p>
            </div>
            <div className="mt-24 font-mono text-sm opacity-60">
                SOURCE: SEMICONDUCTOR INDUSTRY ASSOCIATION
            </div>
        </div>
        <div className="w-full md:w-1/2 bg-white">
            <div className="grid grid-cols-2 h-full">
                <div className="border-r border-b border-black/10 p-12 flex flex-col justify-end">
                    <span className="font-sans text-5xl md:text-6xl font-bold text-black mb-2">$7.5B</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Annual Loss</span>
                </div>
                <div className="border-b border-black/10 p-12 flex flex-col justify-end">
                    <span className="font-sans text-5xl md:text-6xl font-bold text-black mb-2">15%</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Supply Compromised</span>
                </div>
                <div className="border-r border-black/10 p-12 flex flex-col justify-end">
                     <span className="font-sans text-5xl md:text-6xl font-bold text-black mb-2">0%</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Trust without Verification</span>
                </div>
                 <div className="p-12 flex flex-col justify-end bg-gray-50">
                     <span className="font-sans text-lg font-bold text-black mb-2">Secure your supply chain today.</span>
                     <a href="#" className="font-mono text-xs uppercase tracking-widest text-[#C8372D] border-b border-[#C8372D] self-start pb-1">Contact Sales</a>
                </div>
            </div>
        </div>
    </section>
)

const Footer = () => (
  <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12">
    <div className="flex flex-col md:flex-row justify-between items-start mb-24">
        <div>
            <h2 className="font-sans text-3xl font-bold tracking-tight mb-8">Ethicronics</h2>
            <div className="flex flex-col gap-2 font-mono text-xs text-gray-500 uppercase tracking-widest">
                <span>Cambridge, UK</span>
                <span>Est. 2022</span>
            </div>
        </div>
        <div className="flex gap-12 mt-12 md:mt-0">
            <ul className="space-y-4">
                <li><a href="#" className="font-sans text-sm hover:text-[#C8372D] transition-colors">Technology</a></li>
                <li><a href="#" className="font-sans text-sm hover:text-[#C8372D] transition-colors">Solutions</a></li>
                <li><a href="#" className="font-sans text-sm hover:text-[#C8372D] transition-colors">Insights</a></li>
            </ul>
             <ul className="space-y-4">
                <li><a href="#" className="font-sans text-sm hover:text-[#C8372D] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="font-sans text-sm hover:text-[#C8372D] transition-colors">Twitter</a></li>
                <li><a href="#" className="font-sans text-sm hover:text-[#C8372D] transition-colors">Contact</a></li>
            </ul>
        </div>
    </div>
    <div className="border-t border-white/20 pt-8 flex justify-between items-center font-mono text-[10px] text-gray-600 uppercase tracking-widest">
        <span>© 2025 Ethicronics Ltd.</span>
        <span>Designed with Pentagram</span>
    </div>
  </footer>
);

export default function Ethicronics() {
  return (
    <div className="w-full min-h-screen bg-white text-black selection:bg-[#C8372D] selection:text-white font-sans">
      <Nav />
      <Hero />
      <FeatureGrid />
      <DataSection />
      <Footer />
    </div>
  );
}
