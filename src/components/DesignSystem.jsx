import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UnifiedNav from './UnifiedNav';

// --- BEAM IDENTITY ASSETS ---

// The "Civic Tools" - Functional Primitives
const CIVIC_SHAPES = {
  chair: "M 30 80 L 30 40 L 60 40 L 60 80 L 50 80 L 50 50 L 40 50 L 40 80 Z M 30 40 L 30 20 Q 30 10 45 10 Q 60 10 60 20 L 60 40 Z", // Simplified Chair
  table: "M 20 80 L 30 80 L 35 40 L 65 40 L 70 80 L 80 80 L 75 30 L 25 30 Z",
  doorway: "M 30 20 L 70 20 L 70 80 L 30 80 Z",
  folder: "M 20 30 L 40 30 L 45 25 L 80 25 L 80 75 L 20 75 Z",
};

// The "Moments" - Abstract interactions
const MOMENT_SHAPES = {
  listening: "M 20 40 L 50 50 L 20 60 Q 10 50 20 40 Z M 50 50 L 80 40 Q 90 50 80 60 L 50 50", // Rough abstract ear/sound
  understanding: "M 30 30 L 30 70 M 70 30 L 70 70 M 30 50 L 70 50", // Connection
  supporting: "M 20 80 L 20 50 L 50 20 L 80 50 L 80 80 L 65 80 L 65 50 L 35 50 L 35 80 Z", // House-like
};

// --- COMPONENTS ---

const ShapeCard = ({ name, path, label, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center gap-4 group"
  >
    <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative">
        {/* Dotted Border Hover */}
        <div className="absolute inset-0 border border-dashed border-[#261E19]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#261E19] fill-current">
            <path d={path} />
        </svg>
    </div>
    <div className="text-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#261E19]/60 block">{label}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#261E19] font-bold">{name}</span>
    </div>
  </motion.div>
);

const SectionHeading = ({ number, title, subtitle }) => (
    <div className="mb-16 md:mb-24">
        <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-xs text-[#261E19]/40">{number}</span>
            <h2 className="font-montreal text-4xl md:text-5xl text-[#261E19]">{title}</h2>
        </div>
        {subtitle && (
            <p className="font-mono text-xs text-[#261E19]/60 max-w-md ml-8 md:ml-10 leading-relaxed uppercase tracking-wide">
                {subtitle}
            </p>
        )}
    </div>
);

const ColorSwatch = ({ color, name, hex, dark = false }) => (
    <div className="flex flex-col gap-3 group">
        <div 
            className="w-full aspect-[3/4] rounded-lg border border-[#261E19]/10 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ backgroundColor: color }}
        >
            <div className={`absolute bottom-3 left-3 font-mono text-[10px] ${dark ? 'text-white' : 'text-[#261E19]'}`}>
                {hex}
            </div>
        </div>
        <div>
            <h4 className="font-montreal text-lg text-[#261E19] leading-none mb-1">{name}</h4>
            <span className="font-mono text-[9px] uppercase text-[#261E19]/40">Primary Palette</span>
        </div>
    </div>
);

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-[#F2EBE3] text-[#261E19] font-montreal selection:bg-[#E3E3FD] selection:text-[#261E19]">
      <UnifiedNav />

      {/* --- HERO --- */}
      <header className="pt-40 pb-20 px-6 md:px-12 border-b border-[#261E19]/10">
        <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 bg-[#261E19] text-[#F2EBE3] font-mono text-xs uppercase tracking-widest mb-8 rounded-full"
                    >
                        Design System v2.0
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl md:text-[10vw] leading-[0.85] font-medium tracking-tight mb-8"
                    >
                        Beam<span className="text-[#E3E3FD]">.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-[#261E19]/60 max-w-xl leading-relaxed"
                    >
                        AI tools that make space for human connections.
                        <br/>
                        <span className="text-sm font-mono uppercase tracking-widest mt-4 block text-[#261E19]/40">Powering Welfare Since 2010</span>
                    </motion.p>
                </div>

                {/* Generative Hero Graphic */}
                <div className="w-full md:w-1/3 aspect-square relative">
                    <div className="absolute inset-0 bg-[#E3E3FD] rounded-full mix-blend-multiply opacity-50 blur-3xl animate-pulse" />
                    <div className="absolute inset-10 bg-[#D1FF1A] rounded-full mix-blend-multiply opacity-30 blur-2xl" />
                    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 animate-[spin_60s_linear_infinite]">
                        <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="#261E19" strokeWidth="0.5" strokeDasharray="2 2" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#261E19" strokeWidth="0.5" />
                        <path d="M50 20 L50 80 M 20 50 L 80 50" stroke="#261E19" strokeWidth="0.5" />
                    </svg>
                </div>
            </div>
        </div>
      </header>

      <main className="px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* --- 01. CIVIC TOOLS --- */}
        <section className="py-32 border-b border-[#261E19]/10">
            <SectionHeading 
                number="01" 
                title="Civic Tools" 
                subtitle="Based on frontline realities: social work, conversations, policing, welfare."
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
                <ShapeCard name="Chair" label="Support" path={CIVIC_SHAPES.chair} delay={0} />
                <ShapeCard name="Table" label="Foundation" path={CIVIC_SHAPES.table} delay={0.1} />
                <ShapeCard name="Doorway" label="Access" path={CIVIC_SHAPES.doorway} delay={0.2} />
                <ShapeCard name="Folder" label="Memory" path={CIVIC_SHAPES.folder} delay={0.3} />
            </div>
        </section>

        {/* --- 02. MOMENTS --- */}
        <section className="py-32 border-b border-[#261E19]/10">
            <SectionHeading 
                number="02" 
                title="Moments" 
                subtitle="Abstract representations of human-AI interaction states."
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
                <ShapeCard name="Listening" label="Input" path={MOMENT_SHAPES.listening} delay={0} />
                <ShapeCard name="Understanding" label="Process" path={MOMENT_SHAPES.understanding} delay={0.1} />
                <ShapeCard name="Supporting" label="Output" path={MOMENT_SHAPES.supporting} delay={0.2} />
            </div>
        </section>

        {/* --- 03. TYPOGRAPHY & COLOR --- */}
        <section className="py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                
                {/* Typography */}
                <div>
                    <SectionHeading 
                        number="03" 
                        title="Typography" 
                        subtitle="Humanist sans-serif for warmth. Monospace for precision."
                    />
                    
                    <div className="space-y-12">
                        <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#261E19]/40 mb-2 block">Display Type</span>
                            <div className="text-6xl md:text-8xl leading-[0.9] text-[#261E19] font-medium tracking-tight">
                                Human<br/>Services
                            </div>
                            <p className="mt-4 text-[#261E19]/60 font-montreal text-lg">PP Neue Montreal</p>
                        </div>
                        
                        <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#261E19]/40 mb-2 block">Technical Type</span>
                            <div className="font-mono text-xl md:text-2xl text-[#261E19] border-l-2 border-[#E3E3FD] pl-6 py-2">
                                function calibrate_empathy() {'{'}<br/>
                                &nbsp;&nbsp;return true;<br/>
                                {'}'}
                            </div>
                            <p className="mt-4 text-[#261E19]/60 font-montreal text-lg">Space Grotesk / Mono</p>
                        </div>
                    </div>
                </div>

                {/* Color */}
                <div>
                    <SectionHeading 
                        number="04" 
                        title="Palette" 
                        subtitle="Earthy grounds with digital signals."
                    />
                    
                    <div className="grid grid-cols-2 gap-6">
                        <ColorSwatch color="#261E19" name="Void Brown" hex="#261E19" dark />
                        <ColorSwatch color="#F2EBE3" name="Civic Cream" hex="#F2EBE3" />
                        <ColorSwatch color="#E3E3FD" name="Beam Lavender" hex="#E3E3FD" />
                        <ColorSwatch color="#D1FF1A" name="Signal Volt" hex="#D1FF1A" />
                    </div>
                </div>

            </div>
        </section>

        {/* --- 05. UI COMPONENTS --- */}
        <section className="py-32 border-t border-[#261E19]/10 bg-[#261E19] -mx-6 md:-mx-12 px-6 md:px-12 text-[#F2EBE3]">
             <div className="max-w-[1600px] mx-auto">
                <SectionHeading 
                    number="05" 
                    title="Interface" 
                    subtitle="Tools for the automated welfare state."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-[#3E342F] rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6">
                            <div className="w-2 h-2 bg-[#D1FF1A] rounded-full animate-pulse" />
                        </div>
                        <h3 className="text-2xl mb-2">Auto Note-taker</h3>
                        <p className="text-white/40 font-mono text-xs mb-12 max-w-[200px]">
                            Automated transcription for sensitive casework.
                        </p>
                        <div className="h-32 flex items-end">
                            <div className="w-full bg-[#261E19] rounded-lg p-4 font-mono text-[10px] text-[#E3E3FD]">
                                > Recording started...<br/>
                                > Speaker A identified<br/>
                                > Sentiment: Stable
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#E3E3FD] rounded-2xl p-8 relative overflow-hidden group text-[#261E19]">
                        <div className="absolute top-0 right-0 p-6">
                            <div className="w-2 h-2 bg-[#261E19] rounded-full" />
                        </div>
                        <h3 className="text-2xl mb-2">Real-time Translator</h3>
                        <p className="text-[#261E19]/40 font-mono text-xs mb-12 max-w-[200px]">
                            Bridging language gaps in municipal services.
                        </p>
                        <div className="h-32 flex items-center justify-center relative">
                             <div className="absolute inset-0 border border-dashed border-[#261E19]/20 rounded-full animate-[spin_10s_linear_infinite]" />
                             <span className="font-montreal text-4xl">Aa</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#F2EBE3] rounded-2xl p-8 relative overflow-hidden group text-[#261E19]">
                        <h3 className="text-2xl mb-2">Report Generator</h3>
                        <p className="text-[#261E19]/40 font-mono text-xs mb-12 max-w-[200px]">
                            From raw data to policy documents.
                        </p>
                        <button className="w-full py-4 bg-[#261E19] text-[#F2EBE3] font-mono text-xs uppercase tracking-widest rounded-lg hover:bg-[#D1FF1A] hover:text-[#261E19] transition-colors">
                            Generate PDF
                        </button>
                    </div>
                </div>
             </div>
        </section>

      </main>
      
      <footer className="py-12 bg-[#261E19] text-[#F2EBE3] border-t border-[#F2EBE3]/10 text-center font-mono text-xs uppercase tracking-widest">
        &copy; 2025 Beam Tech Labs. Powering Welfare.
      </footer>
    </div>
  );
}
