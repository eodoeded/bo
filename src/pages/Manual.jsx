import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Type, Layout, MousePointer, Box } from 'lucide-react';

const Section = ({ title, children }) => (
    <div className="mb-24 border-t border-[#33302E] pt-8">
        <h2 className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-12 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#E3E3FD] rounded-full"></div>
            {title}
        </h2>
        {children}
    </div>
);

const ColorSwatch = ({ hex, name, description }) => (
    <div className="group cursor-pointer">
        <div 
            className="h-32 w-full mb-4 border border-[#33302E] rounded-2xl group-hover:border-[#E3E3FD]/50 transition-colors shadow-lg"
            style={{ backgroundColor: hex }}
        ></div>
        <div className="flex justify-between items-baseline border-b border-[#33302E] pb-2 mb-2">
            <span className="font-mono text-xs text-white uppercase tracking-widest">{name}</span>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{hex}</span>
        </div>
        <p className="font-mono text-[10px] text-white/40 leading-relaxed">{description}</p>
    </div>
);

export default function Manual() {
    return (
        <div className="min-h-screen bg-[#261E19] text-white font-montreal selection:bg-[#E3E3FD] selection:text-[#261E19]">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#261E19]/80 backdrop-blur-md">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="group flex items-center gap-3" onClick={() => window.scrollTo(0,0)}>
                            <span className="font-mono text-sm tracking-widest text-white group-hover:text-[#E3E3FD] transition-colors uppercase">[ BRANDED OBJECTS ]</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Guidelines</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
                
                {/* Intro */}
                <div className="mb-32">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest border border-[#E3E3FD]/20 bg-[#E3E3FD]/10 px-2 py-1 rounded-full">System_OS v2.5</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8 leading-[0.9]">
                        Intelligent <br/>
                        <span className="text-[#E3E3FD]">Design Systems.</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                        The visual language of Branded Objects is utilitarian, precise, and system-oriented.
                        It rejects decoration in favor of clarity. It is the interface between creative intent and automated execution.
                    </p>
                </div>

                {/* 01. Color System */}
                <Section title="01_Pigment_Data">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <ColorSwatch 
                            hex="#261E19" 
                            name="Deep Clay" 
                            description="Primary background. Warm, dense, grounded. Replaces sterile black." 
                        />
                        <ColorSwatch 
                            hex="#1A1614" 
                            name="Void Brown" 
                            description="Secondary background. Depth layer for cards and inputs." 
                        />
                        <ColorSwatch 
                            hex="#E3E3FD" 
                            name="System Lavender" 
                            description="Primary active state. Digital, sharp, high-frequency signal." 
                        />
                        <ColorSwatch 
                            hex="#FFFFFF" 
                            name="Pure Signal" 
                            description="Primary text and borders. Maximum contrast." 
                        />
                    </div>
                </Section>

                {/* 02. Typography */}
                <Section title="02_Glyph_Sets">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <div className="border border-[#33302E] p-8 mb-8 bg-[#1A1614] rounded-2xl">
                                <span className="text-6xl md:text-8xl">Aa</span>
                            </div>
                            <h3 className="text-2xl mb-2">PP Neue Montreal</h3>
                            <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">Primary Interface</p>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Used for all human-readable content, headlines, and body text. 
                                Neutral, legible, versatile.
                            </p>
                        </div>
                        <div>
                            <div className="border border-[#33302E] p-8 mb-8 bg-[#1A1614] rounded-2xl">
                                <span className="text-6xl md:text-8xl font-mono">01</span>
                            </div>
                            <h3 className="text-2xl mb-2 font-mono">Geist Mono</h3>
                            <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">Data & Logic</p>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Used for code, coordinates, status indicators, and system metadata. 
                                The voice of the machine.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 03. UI Components */}
                <Section title="03_Interface_Units">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Button Spec */}
                        <div className="space-y-4">
                            <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Action_Module</label>
                            <div className="p-8 border border-[#33302E] bg-[#1A1614] rounded-2xl flex flex-col gap-4">
                                <button className="bg-[#E3E3FD] text-[#261E19] px-6 py-3 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors rounded-full">
                                    <Box size={14} />
                                    Initialize System
                                </button>
                                <button className="border border-white/20 text-white px-6 py-3 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-white transition-colors rounded-full">
                                    View Documentation
                                </button>
                            </div>
                        </div>

                        {/* Input Spec */}
                        <div className="space-y-4">
                            <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Data_Ingest</label>
                            <div className="p-8 border border-[#33302E] bg-[#1A1614] rounded-2xl space-y-4">
                                <div>
                                    <label className="block font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-2">Project_Name</label>
                                    <div className="w-full bg-[#261E19] border border-[#33302E] p-3 text-white font-mono text-sm focus:border-[#E3E3FD] outline-none transition-colors rounded-lg">
                                        Q3_Campaign_Assets
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 04. Grid & Layout */}
                <Section title="04_Structural_Logic">
                    <div className="border border-[#33302E] bg-[#1A1614] p-8 aspect-video relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 opacity-[0.1]" style={{ 
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', 
                            backgroundSize: '40px 40px' 
                        }}></div>
                        
                        <div className="relative z-10 h-full flex items-center justify-center">
                            <div className="flex items-center gap-16">
                                <div className="w-32 h-32 border border-[#E3E3FD] rounded-full flex items-center justify-center bg-[#E3E3FD]/5">
                                    <Type className="text-[#E3E3FD]" />
                                </div>
                                <div className="w-32 h-0 border-t border-dashed border-white/20 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/40">FLOW</div>
                                </div>
                                <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center bg-[#261E19]">
                                    <Layout className="text-white/40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

            </main>
        </div>
    );
}
