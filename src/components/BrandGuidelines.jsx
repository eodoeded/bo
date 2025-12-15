import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, Layout, Type, MousePointer, CreditCard, Layers, Grid as GridIcon, Database, Cpu, Activity, User, Mail, Send, ChevronDown, Check, AlertCircle, Terminal, BarChart2, CornerDownRight, Zap, Move, Eye, Code, Command, Github, Twitter, Disc, Lock, Unlock, Edit3, Image as ImageIcon, Linkedin, Download, Share2, Sliders, Hand, ZoomIn, MoreHorizontal, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import bottomComp from "../assets/bottom-comp.png";

// Decorative Corner Component
const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

// Tiny Technical Badge
const Badge = ({ children, className = "", color = "text-[#E3E3FD]" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full bg-white/[0.02] ${color} ${className}`}>
        {children}
    </span>
);

const Node = ({ title, inputs = [], outputs = [], children, x, y, delay = 0, width = "w-32", type = "default", status }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: y + 20 }}
        animate={{ opacity: 1, scale: 1, y: y }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute z-10 ${width}`}
        style={{ left: x, top: y }}
      >
        {type === "minimal" ? (
           <div className="relative group cursor-pointer">
              {/* Organic "Glow" */}
              <div className="absolute -inset-4 bg-[#E3E3FD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-full"></div>
              
              <div className="relative bg-[#261E19] border border-white/10 px-4 py-2 flex items-center justify-center shadow-xl backdrop-blur-md hover:border-[#E3E3FD]/50 transition-colors rounded-2xl">
                 {children}
              </div>
              
              {/* Ports - Circular */}
              {inputs.map((_, i) => (
                <div key={`in-${i}`} className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#261E19] border border-[#E3E3FD]/50 rounded-full" />
              ))}
              {outputs.map((_, i) => (
                <div key={`out-${i}`} className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#261E19] border border-[#E3E3FD]/50 rounded-full" />
              ))}
           </div>
        ) : (
          <div className="bg-[#261E19]/95 border border-white/10 p-4 shadow-2xl backdrop-blur-md hover:border-[#E3E3FD]/30 transition-colors group relative rounded-2xl">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-[#E3E3FD] transition-colors">{title}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]' : 'bg-white/10'}`}></div>
            </div>
            {children}
            
            {/* Input Ports - Circular */}
            {inputs.map((_, i) => (
              <div key={`in-${i}`} className="absolute -left-[5px] top-[32px] w-2 h-2 bg-[#261E19] border border-white/30 hover:border-[#E3E3FD] transition-colors rounded-full" />
            ))}
            {/* Output Ports - Circular */}
            {outputs.map((_, i) => (
              <div key={`out-${i}`} className="absolute -right-[5px] top-[32px] w-2 h-2 bg-[#261E19] border border-white/30 hover:border-[#E3E3FD] transition-colors rounded-full" />
            ))}
          </div>
        )}
      </motion.div>
    );
};

// Curved Connection Logic
const Connection = ({ start, end, delay, dashed = false, active = false }) => {
  // Bezier Control Points for organic curve
  const midX = (start.x + end.x) / 2;
  const path = `M ${start.x} ${start.y} C ${midX} ${start.y} ${midX} ${end.y} ${end.x} ${end.y}`;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      <motion.path
        d={path}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity={dashed ? "0.1" : "0.2"}
        strokeDasharray={dashed ? "4 4" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      />
      
      {/* Circuit joints - Circular */}
      <circle cx={start.x} cy={start.y} r="2" fill="#E3E3FD" fillOpacity="0.8" />
      <circle cx={end.x} cy={end.y} r="2" fill="#E3E3FD" fillOpacity="0.8" />

      {(active || !dashed) && (
        <motion.path
            d={path}
            fill="none"
            stroke="#E3E3FD" // Lavender
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ 
                pathLength: [0, 0.3, 0], 
                pathOffset: [0, 1, 1],
                opacity: [0, 1, 0]
            }}
            transition={{ 
                duration: 2.5, 
                delay: delay + 0.5, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 0.5
            }}
        />
      )}
    </svg>
  );
};

const SectionHeader = ({ title, number }) => (
    <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6 group cursor-crosshair">
        <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_#E3E3FD]"></div>
            <h2 className="font-montreal font-medium text-3xl tracking-tight text-white group-hover:translate-x-2 transition-transform duration-300">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/30 tracking-widest group-hover:text-[#E3E3FD] transition-colors">/ {number}</span>
        </div>
    </div>
);

// Helper for Studio UI components in Brand Guidelines
const IconButton = ({ icon: Icon, active }) => (
    <button 
        className={`p-2 border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white'} transition-colors rounded-lg`}
    >
        <Icon size={14} />
    </button>
);

export default function BrandGuidelines() {
  const downloadRef1 = useRef(null);

  return (
    <div className="min-h-screen bg-[#261E19] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal overflow-x-hidden relative">
      {/* Organic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ 
          backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
      }}></div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-[#261E19]/90 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
            <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/10 rounded-full group-hover:border-[#E3E3FD] group-hover:text-[#E3E3FD] transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-[#E3E3FD] transition-colors">[ BACK ]</span>
        </Link>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#E3E3FD]/50 transition-colors rounded-full">
                <span className="w-1.5 h-1.5 bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD] rounded-full"></span>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">System V2.5</span>
            </div>
        </div>
      </nav>

      {/* Hero: Advanced Node System */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#261E19]">
        
        {/* Generative Background */}
        <div className="absolute inset-0 pointer-events-none">
             <motion.div 
                className="absolute inset-0 opacity-[0.02]"
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ 
                backgroundImage: 'linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
                backgroundSize: '80px 80px' 
            }}></motion.div>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 max-w-xl z-20 pointer-events-none">
            <Badge className="mb-4 text-[#E3E3FD] border-[#E3E3FD]/20 bg-[#E3E3FD]/5">System_OS v2.5</Badge>
            <h1 className="font-montreal font-medium text-6xl md:text-8xl tracking-tight mb-6 text-white leading-[0.9]">
                Intelligent<br/><span className="text-[#E3E3FD]">Design Systems.</span>
            </h1>
            <p className="font-montreal text-white/60 text-lg leading-relaxed max-w-md">
                The same node language as the landing: Studio inputs, governed logic, pristine outputs.
            </p>
        </div>

            {/* Centered Node Graph */}
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-[1000px] h-[600px] scale-[0.35] md:scale-100 origin-center transition-transform duration-500 mix-blend-screen">
                    {/* Input Layer */}
                    <Node title="Design_Studio" outputs={[1]} x={50} y={250} delay={0.2} width="w-40" status="active">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/5 rounded-lg">
                                <Database size={14} className="text-white/40"/>
                                <span className="font-mono text-[10px] text-white/60">ASSET_FEED</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="h-1 w-full bg-white/10 overflow-hidden rounded-full">
                                    <motion.div className="h-full bg-[#E3E3FD]" animate={{x:['0%','100%']}} transition={{duration:1.5, repeat:Infinity, ease:"linear"}} />
                                </div>
                            </div>
                        </div>
                    </Node>

                    {/* Processing Layer */}
                    <Node title="Logic_Core" inputs={[1]} outputs={[1, 1]} x={350} y={150} delay={0.4} width="w-48">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                                <span>Governance</span>
                                <span className="text-[#E3E3FD]">Locked</span>
                            </div>
                            <div className="grid grid-cols-5 gap-1 h-6">
                                {[...Array(10)].map((_,i) => (
                                    <motion.div 
                                        key={i}
                                        className="bg-[#E3E3FD]/20 border border-[#E3E3FD]/10 rounded-sm"
                                        animate={{opacity:[0.2, 1, 0.2]}}
                                        transition={{duration:Math.random()*2 + 1, repeat:Infinity}}
                                    />
                                ))}
                            </div>
                        </div>
                    </Node>

                    <Node title="Compliance_Gate" inputs={[1]} outputs={[1]} x={350} y={400} delay={0.5} width="w-40">
                         <div className="p-2 bg-white/5 border border-white/5 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <Activity size={12} className="text-white/40"/>
                                <span className="font-mono text-[9px] text-[#E3E3FD]">ON_POLICY</span>
                            </div>
                            <div className="h-6 w-full flex items-end gap-[2px]">
                                {[40, 70, 30, 80, 50, 90, 60].map((h, i) => (
                                    <motion.div key={i} className="flex-1 bg-white/20 rounded-t-sm" animate={{height: [`${h}%`, `${Math.random()*80+20}%`]}} transition={{duration:2, repeat:Infinity}} />
                                ))}
                            </div>
                         </div>
                    </Node>

                    {/* Output Layer */}
                    <Node type="minimal" inputs={[1, 1]} outputs={[1]} x={700} y={250} delay={0.7}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#E3E3FD]/10 flex items-center justify-center text-[#E3E3FD] border border-[#E3E3FD]/20 rounded-full">
                                <Cpu size={16} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-montreal font-medium text-sm text-white">Renderer</span>
                                <span className="font-mono text-[9px] text-white/40">v2.5-stable</span>
                            </div>
                        </div>
                    </Node>

                    {/* Final */}
                    <Node type="minimal" inputs={[1]} x={900} y={250} delay={0.9}>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#E3E3FD] uppercase">Client_Output</span>
                    </Node>

                    {/* Connections */}
                    <Connection start={{x: 215, y: 286}} end={{x: 345, y: 186}} delay={0.5} active={true} />
                    <Connection start={{x: 215, y: 286}} end={{x: 345, y: 436}} delay={0.6} active={true} />
                    <Connection start={{x: 547, y: 186}} end={{x: 696, y: 275}} delay={0.8} active={true} />
                    <Connection start={{x: 515, y: 436}} end={{x: 696, y: 275}} delay={0.9} dashed={true} />
                    <Connection start={{x: 844, y: 275}} end={{x: 896, y: 275}} delay={1.1} active={true} />
                </div>
            </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-32 px-6 md:px-12 space-y-48 relative z-10">
        
        {/* 00. Identity System */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Identity System" number="00" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Mirrors the landing experience: a tri-node flow (Studio → Logic → Output), a night-mode canvas (#261E19), and lavender signal accents (#E3E3FD).
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Primary</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Secondary</Badge>
                    <Badge className="bg-[#1A1614] border-white/10 text-white/70">Panels</Badge>
                </div>
            </div>

            <div className="md:col-span-8 space-y-8">
                {/* Palette */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: 'Background', swatch: '#261E19', detail: 'Surface / Backdrop' },
                        { name: 'Signal', swatch: '#E3E3FD', detail: 'Accents / Status' },
                        { name: 'Ink', swatch: '#FFFFFF', detail: 'Copy / Inputs' }
                    ].map((tone) => (
                        <div key={tone.name} className="p-6 border border-white/10 bg-white/[0.02] rounded-2xl flex items-center gap-4 hover:border-[#E3E3FD]/40 transition-colors">
                            <div className="w-12 h-12 rounded-xl border border-white/10" style={{ backgroundColor: tone.swatch }}></div>
                            <div>
                                <p className="font-montreal text-white">{tone.name}</p>
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{tone.detail} — {tone.swatch}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Node Language Snapshot */}
                <div className="bg-[#1A1614] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Node Language — Matches Landing</span>
                    <div className="relative h-[200px]">
                        <Connection start={{x: 80, y: 100}} end={{x: 240, y: 60}} delay={0.2} active />
                        <Connection start={{x: 80, y: 100}} end={{x: 240, y: 140}} delay={0.3} active />
                        <Connection start={{x: 400, y: 100}} end={{x: 540, y: 100}} delay={0.5} active />
                        <Node type="minimal" outputs={[1]} x={60} y={120} delay={0.1} width="w-28">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#E3E3FD] rounded-full animate-pulse"></div>
                                <span className="font-mono text-[10px] text-white">Studio_Input</span>
                            </div>
                        </Node>
                        <Node type="minimal" inputs={[1]} outputs={[1]} x={240} y={80} delay={0.2} width="w-32">
                            <div className="flex items-center gap-2">
                                <Shield size={14} className="text-[#E3E3FD]" />
                                <span className="font-mono text-[10px] text-white">Logic_Core</span>
                            </div>
                        </Node>
                        <Node type="minimal" inputs={[1]} x={520} y={80} delay={0.4} width="w-32">
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-[#E3E3FD]" />
                                <span className="font-mono text-[10px] text-white">Client_Output</span>
                            </div>
                        </Node>
                    </div>
                </div>

                {/* CTA Spec */}
                <div className="bg-[#261E19] border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Scan size={16} className="text-[#E3E3FD]" />
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">CTA: Request Access</span>
                    </div>
                    <p className="font-montreal text-white/60 leading-relaxed">
                        Form matches landing: pill input with scan icon, lavender placeholder, button on the same baseline.
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#1A1614] border border-white/10 p-2 rounded-2xl max-w-xl">
                        <div className="flex items-center gap-2 px-3 py-3.5 flex-1">
                            <Scan size={14} className="text-white/30" />
                            <span className="font-mono text-[11px] text-white/50">studio@agency.com</span>
                        </div>
                        <div className="bg-white text-black px-6 py-3.5 font-mono text-[11px] tracking-[0.1em] uppercase rounded-xl sm:rounded-full text-center">
                            Request Access
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 01. Typography */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Typography" number="01" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    PP Neue Montreal serves as the primary typeface. Technical, legible, yet soft.
                </p>
                <div className="flex gap-4">
                    <Badge>.otf</Badge>
                    <Badge>.woff2</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                {/* Display Type */}
                <div className="border-b border-white/5 pb-16">
                    <div className="flex items-center gap-4 mb-6">
                         <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Primary Display</span>
                         <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="text-[120px] leading-[0.85] font-montreal font-medium tracking-tight mb-12 text-white hover:text-[#E3E3FD] transition-colors duration-500 cursor-default">
                        Aa Bb Cc<br/>123 456
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-white/10 bg-white/[0.02] relative group hover:bg-white/[0.04] transition-colors min-h-[200px] flex flex-col justify-between hover:border-[#E3E3FD]/50 rounded-2xl">
                            <span className="text-4xl mb-2 block">Regular</span>
                            <span className="font-mono text-xs text-white/40">400 — Body / Subheads</span>
                        </div>
                        <div className="p-8 border border-white/10 bg-white/[0.02] relative group hover:bg-white/[0.04] transition-colors min-h-[200px] flex flex-col justify-between hover:border-[#E3E3FD]/50 rounded-2xl">
                            <span className="text-4xl font-medium mb-2 block">Medium</span>
                            <span className="font-mono text-xs text-white/40">500 — Headlines / UI</span>
                        </div>
                    </div>
                </div>

                {/* Scale */}
                <div>
                    <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest mb-12 block uppercase">Hierarchy Scale</span>
                    <div className="space-y-12">
                        {[
                            { role: 'Display XL', size: 'text-6xl md:text-8xl', sample: 'Visual Intelligence' },
                            { role: 'Heading L', size: 'text-5xl md:text-6xl', sample: 'System Architecture' },
                            { role: 'Heading M', size: 'text-3xl md:text-4xl', sample: 'Modular Components' },
                            { role: 'Body L', size: 'text-xl', sample: 'The studio controls the prompt structure and safety layers.' },
                            { role: 'Caption', size: 'text-sm font-mono uppercase tracking-widest', sample: 'System_Operational_v2' },
                        ].map((type, i) => (
                            <div key={i} className="group grid grid-cols-12 items-baseline border-b border-white/5 pb-8 hover:border-[#E3E3FD]/30 transition-colors cursor-crosshair">
                                <div className="col-span-12 md:col-span-3 font-mono text-xs text-white/30 group-hover:text-[#E3E3FD] transition-colors mb-2 md:mb-0">{type.role}</div>
                                <div className={`col-span-12 md:col-span-9 font-montreal ${type.size} text-white leading-none`}>{type.sample}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 13. Application UI */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Application UI" number="13" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    The Studio interface components. Designed for density, precision, and organic flow.
                </p>
            </div>
            
            <div className="md:col-span-8 space-y-12">
                {/* Toolbar */}
                <div className="bg-[#261E19] border border-white/10 p-8 rounded-3xl">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Floating Toolbar</span>
                    <div className="inline-flex bg-[#1A1614] border border-white/10 p-2 items-center gap-1 rounded-2xl shadow-xl">
                        <IconButton icon={MousePointer} active={true} />
                        <IconButton icon={Hand} />
                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                        <IconButton icon={Type} />
                        <IconButton icon={ImageIcon} />
                        <IconButton icon={Box} />
                    </div>
                </div>

                {/* Property Item */}
                <div className="bg-[#261E19] border border-white/10 p-8 rounded-3xl">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Property Control</span>
                    <div className="grid grid-cols-2 gap-4 max-w-sm">
                        <div className="bg-[#1A1614] border border-white/10 px-3 py-2 flex items-center gap-2 group hover:border-white/30 transition-colors rounded-lg">
                            <span className="font-mono text-[9px] text-white/30">W</span>
                            <span className="font-mono text-[10px] text-white">1080</span>
                        </div>
                        <div className="bg-[#1A1614] border border-white/10 px-3 py-2 flex items-center gap-2 group hover:border-white/30 transition-colors rounded-lg">
                            <span className="font-mono text-[9px] text-white/30">H</span>
                            <span className="font-mono text-[10px] text-white">1350</span>
                        </div>
                    </div>
                </div>

                {/* Effects Panel */}
                <div className="bg-[#261E19] border border-white/10 p-8 rounded-3xl">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Effect Panel</span>
                    <div className="bg-[#1A1614] border border-white/10 p-4 space-y-3 relative overflow-hidden group max-w-sm rounded-xl">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white">Dither</span>
                            <div className="w-8 h-4 bg-[#E3E3FD] rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-mono text-white/40">
                                <span>INTENSITY</span>
                                <span>80%</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[80%] bg-[#E3E3FD]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 14. Marketing Components */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Marketing" number="14" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Public-facing components. Bold, high-contrast, informative.
                </p>
            </div>
            
            <div className="md:col-span-8 space-y-12">
                {/* Benefit Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#261E19] border border-white/10 p-8 relative group hover:bg-[#2E2824] transition-colors rounded-3xl">
                        
                        <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                            <CreditCard size={20} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                        </div>
                        
                        <h3 className="font-mono text-sm text-[#E3E3FD] uppercase tracking-widest mb-3">01 // Revenue</h3>
                        <h4 className="font-montreal font-medium text-2xl text-white mb-4">Productised Service</h4>
                        <p className="text-white/50 font-montreal text-sm leading-relaxed">
                            Don't just bill for hours. Sell the tool as a subscription.
                        </p>
                    </div>
                    
                    {/* Feature Row */}
                    <div className="bg-[#261E19] p-8 relative flex flex-col justify-center rounded-3xl border border-white/10">
                        <div className="flex items-center justify-between py-3 border-b border-white/5 group hover:bg-white/[0.02] transition-colors px-2">
                            <div className="flex items-center gap-4">
                                <Cpu size={14} className="text-[#E3E3FD]/50 group-hover:text-[#E3E3FD] transition-colors" />
                                <span className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">AI GENERATION</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#E3E3FD]">v1.4</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/5 group hover:bg-white/[0.02] transition-colors px-2">
                            <div className="flex items-center gap-4">
                                <Lock size={14} className="text-[#E3E3FD]/50 group-hover:text-[#E3E3FD] transition-colors" />
                                <span className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">LOCKING</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#E3E3FD]">Strict</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
      
      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#261E19] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                <div className="col-span-1 md:col-span-5">
                    <h3 className="font-mono text-lg tracking-widest text-white mb-6 uppercase">[ BO ]</h3>
                    <p className="font-montreal text-white/60 text-sm max-w-md leading-relaxed mb-8">
                        A modular design system for automated brand governance. Empowering studios to create custom tools for their clients.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#E3E3FD] rounded-full animate-pulse"></div>
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">All Systems Operational</span>
                    </div>
                </div>
                
                <div className="col-span-1 md:col-span-3 md:col-start-8 space-y-6">
                     <h4 className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Platform</h4>
                     <ul className="space-y-3 font-mono text-xs text-white/60">
                        {/* Links removed */}
                    </ul>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-6">
                    <h4 className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Connect</h4>
                    <div className="flex flex-col gap-3">
                        <a href="https://www.linkedin.com/company/108913089/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                            <span className="font-mono text-xs text-[#E3E3FD] group-hover:text-white transition-colors">[ LINKEDIN ]</span>
                        </a>
                         <a href="mailto:brandedobjects@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                            <span className="font-mono text-xs text-[#E3E3FD] group-hover:text-white transition-colors">[ EMAIL ]</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest"></span>
                <div className="flex gap-8 mt-4 md:mt-0">
                    {/* Copyright and legal links removed */}
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
}
