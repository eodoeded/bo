import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, Layout, Type, MousePointer, CreditCard, Layers, Grid as GridIcon, Database, Cpu, Activity, User, Mail, Send, ChevronDown, Check, AlertCircle, Terminal, BarChart2, CornerDownRight, Zap, Move, Eye, Code, Command, Github, Twitter, Disc, Lock, Unlock, Edit3, Image as ImageIcon, Linkedin, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";

// Decorative Corner Component
const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

// Tiny Technical Badge
const Badge = ({ children, className = "", color = "text-[#E3E3FD]" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest border border-white/10 px-1.5 py-0.5 rounded-[1px] bg-white/[0.02] ${color} ${className}`}>
        {children}
    </span>
);

const Node = ({ title, inputs = [], outputs = [], children, x, y, delay = 0, width = "w-32", type = "default", status }) => {
    // Offset for center-based positioning logic
    const widthVal = type === "minimal" ? 140 : parseInt(width.replace('w-', '')) * 4; 
    
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
              {/* Square "Glow" */}
              <div className="absolute -inset-4 bg-[#E3E3FD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <div className="relative bg-[#0A0A0A] border border-white/10 px-4 py-2 flex items-center justify-center shadow-xl backdrop-blur-md hover:border-[#E3E3FD]/50 transition-colors">
                 {/* Tech Corners */}
                 <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/50"></div>
                 <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/50"></div>
                 {children}
              </div>
              
              {/* Ports - Squared */}
              {inputs.map((_, i) => (
                <div key={`in-${i}`} className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] border border-[#E3E3FD]/50" />
              ))}
              {outputs.map((_, i) => (
                <div key={`out-${i}`} className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] border border-[#E3E3FD]/50" />
              ))}
           </div>
        ) : (
          <div className="bg-[#050505]/95 border border-white/10 p-3 shadow-2xl backdrop-blur-md hover:border-white/30 transition-colors group relative">
            {/* Technical Decor */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
    
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">{title}</span>
              <div className={`w-1 h-1 ${status === 'active' ? 'bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]' : 'bg-white/10'}`}></div>
            </div>
            {children}
            
            {/* Input Ports - Rectangular */}
            {inputs.map((_, i) => (
              <div key={`in-${i}`} className="absolute -left-[5px] top-8 w-1.5 h-2 bg-[#050505] border border-white/30 hover:border-[#E3E3FD] transition-colors" />
            ))}
            {/* Output Ports - Rectangular */}
            {outputs.map((_, i) => (
              <div key={`out-${i}`} className="absolute -right-[5px] top-8 w-1.5 h-2 bg-[#050505] border border-white/30 hover:border-[#E3E3FD] transition-colors" />
            ))}
          </div>
        )}
      </motion.div>
    );
};

const Connection = ({ start, end, delay, dashed = false, active = false }) => {
  // Squared / Circuit-like Path Logic with offset for correct alignment
  // Adjusting connection points to align with the new centered ports
  const midX = (start.x + end.x) / 2;
  const path = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      <motion.path
        d={path}
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeOpacity={dashed ? "0.1" : "0.1"}
        strokeDasharray={dashed ? "2 2" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      />
      
      {/* Circuit joints */}
      <rect x={start.x - 1} y={start.y - 1} width="2" height="2" fill="#fff" fillOpacity="0.4" />
      <rect x={end.x - 1} y={end.y - 1} width="2" height="2" fill="#fff" fillOpacity="0.4" />

      {(active || !dashed) && (
        <motion.path
            d={path}
            fill="none"
            stroke="#E3E3FD"
            strokeWidth="1"
            strokeLinecap="square"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ 
                pathLength: [0, 0.3, 0], 
                pathOffset: [0, 1, 1],
                opacity: [0, 1, 0]
            }}
            transition={{ 
                duration: 2.5, 
                delay: delay + 0.5, 
                ease: "linear", 
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
            <div className="w-1.5 h-1.5 bg-[#E3E3FD] group-hover:rotate-45 transition-transform duration-300"></div>
            <h2 className="font-montreal font-medium text-3xl tracking-tight text-white group-hover:translate-x-2 transition-transform duration-300">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/30 tracking-widest group-hover:text-[#E3E3FD] transition-colors">/ {number}</span>
        </div>
    </div>
);

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal overflow-x-hidden">
      
      {/* Background Grid - "Weird" glitchy pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ 
          backgroundImage: 'linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
      }}></div>
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-[#020202]/90 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
            <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#E3E3FD] group-hover:text-[#E3E3FD] transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-[#E3E3FD] transition-colors">[ BACK ]</span>
        </Link>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#E3E3FD]/50 transition-colors">
                <span className="w-1 h-1 bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]"></span>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">System V2.2</span>
            </div>
        </div>
      </nav>

      {/* Hero: Advanced Node System */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#020202]">
        
        {/* Title Centered (Reverted Preference) */}
        <div className="absolute bottom-12 left-6 md:left-12 max-w-xl z-20 pointer-events-none">
            <Badge className="mb-4 text-[#E3E3FD] border-[#E3E3FD]/20 bg-[#E3E3FD]/5">System_OS v2.2</Badge>
            <h1 className="font-montreal font-medium text-6xl md:text-8xl tracking-tight mb-6 text-white leading-[0.9]">
                Visual<br/><span className="text-[#E3E3FD]">System</span>
            </h1>
            <p className="font-montreal text-white/60 text-lg leading-relaxed max-w-md">
                A modular design language built for precision, scalability, and automated brand governance.
            </p>
        </div>

            {/* Centered Node Graph */}
            <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
                <div className="relative w-[1000px] h-[600px]">
                    {/* Input Layer */}
                    <Node title="Data_Ingest" outputs={[1]} x={50} y={250} delay={0.2} width="w-40" status="active">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/5">
                                <Database size={14} className="text-white/40"/>
                                <span className="font-mono text-[10px] text-white/60">JSON_STREAM</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="h-0.5 w-full bg-white/10 overflow-hidden">
                                    <motion.div className="h-full bg-[#E3E3FD]" animate={{x:['0%','100%']}} transition={{duration:1.5, repeat:Infinity, ease:"linear"}} />
                                </div>
                            </div>
                        </div>
                    </Node>

                    {/* Processing Layer */}
                    <Node title="Neural_Core" inputs={[1]} outputs={[1, 1]} x={350} y={150} delay={0.4} width="w-48">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                                <span>LATENCY</span>
                                <span className="text-[#E3E3FD]">12ms</span>
                            </div>
                            <div className="grid grid-cols-5 gap-1 h-6">
                                {[...Array(10)].map((_,i) => (
                                    <motion.div 
                                        key={i}
                                        className="bg-[#E3E3FD]/20 border border-[#E3E3FD]/10"
                                        animate={{opacity:[0.2, 1, 0.2]}}
                                        transition={{duration:Math.random()*2 + 1, repeat:Infinity}}
                                    />
                                ))}
                            </div>
                        </div>
                    </Node>

                    <Node title="Logic_Gate" inputs={[1]} outputs={[1]} x={350} y={400} delay={0.5} width="w-40">
                         <div className="p-2 bg-white/5 border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <Activity size={12} className="text-white/40"/>
                                <span className="font-mono text-[9px] text-[#E3E3FD]">OPTIMAL</span>
                            </div>
                            <div className="h-6 w-full flex items-end gap-[2px]">
                                {[40, 70, 30, 80, 50, 90, 60].map((h, i) => (
                                    <motion.div key={i} className="flex-1 bg-white/20" animate={{height: [`${h}%`, `${Math.random()*80+20}%`]}} transition={{duration:2, repeat:Infinity}} />
                                ))}
                            </div>
                         </div>
                    </Node>

                    {/* Output Layer */}
                    <Node type="minimal" inputs={[1, 1]} outputs={[1]} x={700} y={250} delay={0.7}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#E3E3FD]/10 flex items-center justify-center text-[#E3E3FD] border border-[#E3E3FD]/20">
                                <Cpu size={16} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-montreal font-medium text-sm text-white">Renderer</span>
                                <span className="font-mono text-[9px] text-white/40">v2.4.0-stable</span>
                            </div>
                        </div>
                    </Node>

                    {/* Final */}
                    <Node type="minimal" inputs={[1]} x={900} y={250} delay={0.9}>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#E3E3FD] uppercase">Deployment</span>
                    </Node>

                    {/* Connections - Fixed Coordinates relative to Node ports */}
                    {/* 
                        Data_Ingest (50, 250, w=160). Port Right: x=210, y=282 (250+32)
                        Neural_Core (350, 150, w=192). Port Left: x=345, y=182 (150+32). Port Right: x=542, y=182.
                        Logic_Gate (350, 400, w=160). Port Left: x=345, y=432 (400+32). Port Right: x=510, y=432.
                        Renderer (700, 250, minimal). Port Left: x=695, y=274 (250+24). Port Right: x=840, y=274.
                        Deployment (900, 250, minimal). Port Left: x=895, y=274.
                    */}
                    
                    {/* Data to Neural */}
                    <Connection start={{x: 210, y: 282}} end={{x: 345, y: 182}} delay={0.5} active={true} />
                    {/* Data to Logic */}
                    <Connection start={{x: 210, y: 282}} end={{x: 345, y: 432}} delay={0.6} active={true} />
                    
                    {/* Neural to Renderer */}
                    <Connection start={{x: 542, y: 182}} end={{x: 695, y: 274}} delay={0.8} active={true} />
                    {/* Logic to Renderer */}
                    <Connection start={{x: 510, y: 432}} end={{x: 695, y: 274}} delay={0.9} dashed={true} />
                    
                    {/* Renderer to Deployment (Deployment at 900) */}
                    <Connection start={{x: 840, y: 274}} end={{x: 895, y: 274}} delay={1.1} active={true} />
                </div>
            </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-32 px-6 md:px-12 space-y-48 relative z-10">
        
        {/* 01. Typography */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Typography" number="01" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    PP Neue Montreal serves as the primary typeface—a versatile grotesque sans serif. SF Mono provides technical contrast.
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
                    
                    <div className="text-[120px] leading-[0.85] font-montreal font-medium tracking-tight mb-12">
                        Aa Bb Cc<br/>123 456
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-white/10 bg-white/[0.02] relative group hover:bg-white/[0.04] transition-colors min-h-[200px] flex flex-col justify-between">
                            <Corner className="top-0 left-0 border-t border-l" />
                            <Corner className="bottom-0 right-0 border-b border-r" />
                            <span className="text-4xl mb-2 block">Regular</span>
                            <span className="font-mono text-xs text-white/40">400 — Body / Subheads</span>
                        </div>
                        <div className="p-8 border border-white/10 bg-white/[0.02] relative group hover:bg-white/[0.04] transition-colors min-h-[200px] flex flex-col justify-between">
                            <Corner className="top-0 left-0 border-t border-l" />
                            <Corner className="bottom-0 right-0 border-b border-r" />
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
                            <div key={i} className="group grid grid-cols-12 items-baseline border-b border-white/5 pb-8 hover:border-white/20 transition-colors cursor-crosshair">
                                <div className="col-span-12 md:col-span-3 font-mono text-xs text-white/30 group-hover:text-[#E3E3FD] transition-colors mb-2 md:mb-0">{type.role}</div>
                                <div className={`col-span-12 md:col-span-9 font-montreal ${type.size} text-white leading-none`}>{type.sample}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 02. Node Architecture (New Section) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Architecture" number="02" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                    The fundamental building blocks of the logic system. Nodes represent distinct functional units with standardized inputs and outputs.
                </p>
            </div>

            <div className="md:col-span-8 space-y-12">
                <div className="relative p-12 border border-white/10 bg-[#0A0A0A] flex items-center justify-center min-h-[400px]">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
                    <Corner className="top-0 left-0 border-t border-l" />
                    <Corner className="bottom-0 right-0 border-b border-r" />
                    
                    {/* Exploded Node View */}
                    <div className="relative">
                        {/* Labels */}
                        <div className="absolute -top-8 left-0 font-mono text-[9px] text-white/40 tracking-widest uppercase">Header / Status</div>
                        <div className="absolute top-1/2 -left-24 font-mono text-[9px] text-white/40 tracking-widest uppercase text-right w-20">Input<br/>Ports</div>
                        <div className="absolute top-1/2 -right-24 font-mono text-[9px] text-white/40 tracking-widest uppercase w-20">Output<br/>Ports</div>
                        <div className="absolute -bottom-8 left-0 font-mono text-[9px] text-white/40 tracking-widest uppercase">Content Area</div>

                        {/* The Node */}
                        <div className="w-64 bg-[#050505] border border-white/20 p-4 relative shadow-2xl">
                            {/* Lines to labels */}
                            <div className="absolute -top-4 left-4 w-px h-4 bg-white/20"></div>
                            <div className="absolute top-10 -left-4 w-4 h-px bg-white/20"></div>
                            <div className="absolute top-10 -right-4 w-4 h-px bg-white/20"></div>
                            <div className="absolute -bottom-4 left-1/2 w-px h-4 bg-white/20"></div>

                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">Image_Processor</span>
                                <div className="w-1.5 h-1.5 bg-[#E3E3FD] animate-pulse"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-white/5 rounded-sm"></div>
                                <div className="h-2 w-2/3 bg-white/5 rounded-sm"></div>
                                <div className="flex gap-2 mt-4">
                                    <span className="px-2 py-1 bg-white/5 text-[9px] font-mono text-white/40 rounded-sm">v2.1</span>
                                    <span className="px-2 py-1 bg-white/5 text-[9px] font-mono text-white/40 rounded-sm">32ms</span>
                                </div>
                            </div>
                            
                            {/* Ports */}
                            <div className="absolute -left-[5px] top-10 w-1.5 h-2 bg-[#050505] border border-[#E3E3FD] shadow-[0_0_8px_rgba(227,227,253,0.3)]"></div>
                            <div className="absolute -right-[5px] top-10 w-1.5 h-2 bg-[#050505] border border-[#E3E3FD] shadow-[0_0_8px_rgba(227,227,253,0.3)]"></div>
                        </div>
                    </div>
                </div>

                {/* 3D Asset Node Example */}
                <div className="relative p-12 border border-white/10 bg-[#0A0A0A] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    <div className="flex justify-between items-center mb-12 relative z-10">
                         <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">3D Asset Container</span>
                            <div className="h-px w-12 bg-white/10"></div>
                        </div>
                        <Badge>Experimental</Badge>
                    </div>

                    <div className="flex justify-center relative z-10">
                         <div className="bg-[#050505] border border-white/20 p-1 pb-6 shadow-2xl relative group w-64">
                            {/* Ports */}
                            <div className="absolute -left-[5px] top-8 w-1.5 h-2 bg-[#050505] border border-white/30 group-hover:border-[#E3E3FD] transition-colors"></div>
                            <div className="absolute -right-[5px] top-8 w-1.5 h-2 bg-[#050505] border border-white/30 group-hover:border-[#E3E3FD] transition-colors"></div>
                            
                            {/* Node Header */}
                            <div className="flex justify-between items-center p-3 border-b border-white/10 mb-2">
                                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Model_Viewer</span>
                                <div className="w-1.5 h-1.5 bg-[#E3E3FD]"></div>
                            </div>

                            {/* 3D Content */}
                            <div className="relative h-40 w-full flex items-center justify-center overflow-hidden bg-white/[0.02]">
                                <motion.div
                                    className="relative z-0"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <img src={bottomComp} alt="Bottom" className="w-[120px] object-contain opacity-80 mix-blend-screen grayscale" />
                                </motion.div>
                                <motion.div
                                    className="absolute top-4"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                                    style={{ zIndex: 2 }}
                                >
                                    <img src={upComp} alt="Top" className="w-[60px] object-contain opacity-90 mix-blend-screen grayscale" />
                                </motion.div>
                                {/* Grid Overlay */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            </div>

                            {/* Node Footer */}
                             <div className="px-3 pt-2 flex justify-between items-center">
                                <span className="font-mono text-[8px] text-white/30">OBJ_Loader</span>
                                <span className="font-mono text-[8px] text-[#E3E3FD]">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 border border-white/10 bg-white/[0.02]">
                        <h4 className="font-mono text-xs text-white mb-2 uppercase tracking-widest">Standard</h4>
                        <p className="font-montreal text-sm text-white/50">Full functionality with visual feedback and controls.</p>
                    </div>
                    <div className="p-6 border border-white/10 bg-white/[0.02]">
                        <h4 className="font-mono text-xs text-white mb-2 uppercase tracking-widest">Minimal</h4>
                        <p className="font-montreal text-sm text-white/50">Condensed state for pass-through or simple logic.</p>
                    </div>
                    <div className="p-6 border border-white/10 bg-white/[0.02]">
                        <h4 className="font-mono text-xs text-white mb-2 uppercase tracking-widest">Locked</h4>
                        <p className="font-montreal text-sm text-white/50">Restricted access node for brand safety.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 03. Asset Governance (New Section) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Governance" number="03" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                    The locking system allows designers to freeze critical brand assets while exposing safe parameters for client customization.
                </p>
            </div>

            <div className="md:col-span-8 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Node Configuration Side */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Configuration</span>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                        
                        <div className="bg-[#0A0A0A] border border-white/10 p-6 relative">
                            <Corner className="top-0 left-0 border-t border-l" />
                            <Corner className="bottom-0 right-0 border-b border-r" />
                            
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">IG_Story_Template</span>
                                <div className="px-2 py-1 bg-white/10 rounded-sm font-mono text-[9px] text-white/60">LOCKED_MODE</div>
                            </div>

                            <div className="space-y-4">
                                {/* Locked Param */}
                                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <ImageIcon size={14} className="text-white/40"/>
                                        <span className="font-mono text-[10px] text-white/60">BACKGROUND_IMG</span>
                                    </div>
                                    <Lock size={12} className="text-[#E3E3FD]"/>
                                </div>

                                {/* Locked Param */}
                                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Move size={14} className="text-white/40"/>
                                        <span className="font-mono text-[10px] text-white/60">LOGO_POSITION</span>
                                    </div>
                                    <Lock size={12} className="text-[#E3E3FD]"/>
                                </div>

                                {/* Unlocked Param */}
                                <div className="flex items-center justify-between p-3 bg-[#E3E3FD]/5 border border-[#E3E3FD]/20">
                                    <div className="flex items-center gap-3">
                                        <Type size={14} className="text-white"/>
                                        <span className="font-mono text-[10px] text-white">HEADLINE_TEXT</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase">Editable</span>
                                        <Edit3 size={12} className="text-[#E3E3FD]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Output Preview Side */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Client Output</span>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </div>

                        <div className="relative aspect-[9/16] bg-[#111] border border-white/10 p-6 flex flex-col justify-between overflow-hidden group">
                            {/* Background Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                            
                            {/* Logo (Locked Position) */}
                            <div className="relative z-20 w-8 h-8 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>

                            {/* Headline (Editable) */}
                            <div className="relative z-20">
                                <div className="font-montreal text-2xl leading-tight text-white mb-2">
                                    Summer<br/>Collection
                                </div>
                                <div className="h-1 w-12 bg-[#E3E3FD]"></div>
                            </div>

                            {/* Lock Overlay Indicator */}
                            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-sm">
                                    <Lock size={10} className="text-[#E3E3FD]"/>
                                    <span className="font-mono text-[9px] text-white">ASSETS_SECURE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 04. Interface & Cards */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Interface" number="04" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                    Modular components designed for data density. Strict squared corners and technical markers define the container language.
                </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 gap-8">
                {/* Feature Card */}
                <div className="group relative p-10 bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Corner className="top-0 left-0 border-t border-l" />
                    <Corner className="top-0 right-0 border-t border-r" />
                    <Corner className="bottom-0 left-0 border-b border-l" />
                    <Corner className="bottom-0 right-0 border-b border-r" />
                    
                    <div className="relative z-10 flex justify-between items-start mb-12">
                        <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500">
                            <Layers size={24} className="text-white"/>
                        </div>
                        <Badge>v1.0.4</Badge>
                    </div>
                    <h3 className="text-3xl font-medium mb-3">Modular Logic</h3>
                    <p className="text-white/50 text-lg max-w-md">Nodes can be connected to create complex logic flows without code.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Stats Card */}
                    <div className="p-8 bg-[#0A0A0A] border border-white/10 flex flex-col justify-between h-64 hover:bg-[#0F0F0F] transition-colors relative">
                        <Corner className="top-0 right-0 border-t border-r w-3 h-3 border-white/20" />
                        <div className="flex justify-between items-start">
                            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Uptime</span>
                            <Activity size={16} className="text-[#E3E3FD]"/>
                        </div>
                        <div>
                            <span className="text-5xl font-medium block mb-2">99.9%</span>
                            <span className="text-sm text-white/40">System operational</span>
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="p-8 bg-[#E3E3FD] border border-white/10 flex flex-col justify-between h-64 text-black group cursor-pointer relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="w-10 h-10 bg-black/5 flex items-center justify-center">
                                <User size={20} className="text-black/60"/>
                            </div>
                            <div className="px-3 py-1 bg-black/10 text-xs font-medium font-mono uppercase tracking-widest">Pro</div>
                        </div>
                        <div className="relative z-10">
                            <span className="text-2xl font-medium block mb-1 group-hover:translate-x-1 transition-transform">Team Plan</span>
                            <span className="text-sm text-black/60">Manage up to 10 seats</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 05. Forms & Inputs */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Contact Forms" number="05" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                    Input fields designed for focus and validation. Minimalist structure with clear active states.
                </p>
            </div>

            <div className="md:col-span-8">
                <div className="p-12 border border-white/10 bg-white/[0.01] relative">
                    <Corner className="top-0 left-0 border-t border-l" />
                    <Corner className="bottom-0 right-0 border-b border-r" />
                    
                    <div className="grid gap-8">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Full Name</label>
                                <span className="font-mono text-[9px] text-white/20">*REQUIRED</span>
                            </div>
                            <input type="text" placeholder="John Doe" className="w-full bg-[#050505] border border-white/10 p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E3E3FD] focus:bg-[#E3E3FD]/5 transition-all font-mono text-sm rounded-sm" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input type="email" placeholder="john@company.com" className="w-full bg-[#050505] border border-white/10 p-4 pl-12 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E3E3FD] focus:bg-[#E3E3FD]/5 transition-all font-mono text-sm rounded-sm" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Department</label>
                                <div className="relative">
                                    <select className="w-full bg-[#050505] border border-white/10 p-4 text-white appearance-none focus:outline-none focus:border-[#E3E3FD] focus:bg-[#E3E3FD]/5 transition-all font-mono text-sm rounded-sm">
                                        <option>Design</option>
                                        <option>Engineering</option>
                                        <option>Product</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <div className="w-2 h-2 border-r border-b border-white/40 rotate-45 mb-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Message</label>
                            <textarea rows="4" placeholder="Tell us about your project..." className="w-full bg-[#050505] border border-white/10 p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E3E3FD] focus:bg-[#E3E3FD]/5 transition-all font-mono text-sm resize-none rounded-sm"></textarea>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button className="bg-white text-black px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#E3E3FD] transition-all flex items-center gap-3 group border border-transparent hover:border-white rounded-sm">
                                <span>Send Message</span>
                                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 06. Buttons & Actions */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Actions" number="06" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                   Primary, secondary, and tertiary actions designed for clear hierarchy. Hover states introduce subtle scale and color shifts.
                </p>
            </div>
            
            <div className="md:col-span-8 space-y-12">
                 <div className="p-12 border border-white/10 bg-white/[0.01] grid gap-12 relative">
                    <Corner className="top-0 right-0 border-t border-r" />
                    <Corner className="bottom-0 left-0 border-b border-l" />

                    {/* Primary Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">Primary</span>
                            <button className="w-full bg-white text-black px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#E3E3FD] transition-all active:translate-y-0.5 rounded-sm">
                                Join Waitlist
                            </button>
                        </div>
                        <div className="space-y-4">
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">With Icon</span>
                            <button className="w-full bg-white text-black px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#E3E3FD] transition-all active:translate-y-0.5 flex items-center justify-center gap-3 group rounded-sm">
                                <span>Proceed</span>
                                <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform"/>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">Loading</span>
                            <button className="w-full bg-[#E3E3FD] text-black px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 cursor-wait opacity-80 border border-black/5 rounded-sm">
                                <div className="w-3 h-3 border border-black/30 border-t-black animate-spin rounded-full"></div>
                                <span>Processing</span>
                            </button>
                        </div>
                    </div>

                    {/* Secondary Row */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="space-y-4">
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">Secondary</span>
                            <button className="w-full bg-transparent border border-white/20 text-white px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:translate-y-0.5 rounded-sm">
                                Documentation
                            </button>
                        </div>
                        <div className="space-y-4">
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">Minimal</span>
                            <button className="w-full bg-white/5 text-white px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:translate-y-0.5 backdrop-blur-md rounded-sm">
                                Cancel
                            </button>
                        </div>
                        <div className="space-y-4">
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">Icon Only</span>
                             <div className="flex gap-4">
                                <button className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:rotate-90 rounded-sm">
                                    <GridIcon size={16} />
                                </button>
                                 <button className="w-12 h-12 bg-[#E3E3FD] flex items-center justify-center text-black hover:scale-105 transition-transform border border-white/10 rounded-sm">
                                    <Send size={16} />
                                </button>
                             </div>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* 07. Accordions & Data */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Expansion" number="07" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                   Progressive disclosure elements for dense technical information.
                </p>
            </div>
            
            <div className="md:col-span-8 space-y-8">
                 {/* Stylized Accordion */}
                <div className="border-t border-white/10">
                    {[
                        { title: "System Architecture", id: "01", content: "The platform uses a distributed node-based architecture allowing for real-time processing of high-fidelity assets." },
                        { title: "Security Protocols", id: "02", content: "End-to-end encryption with double-ratchet algorithms ensures complete data integrity during transmission." },
                        { title: "API Limits", id: "03", content: "Default rate limits are set to 1000 requests per minute for standard tiers, scalable upon request." }
                    ].map((item, i) => {
                         const [isOpen, setIsOpen] = useState(false);
                         return (
                            <div key={i} className="border-b border-white/10">
                                <button 
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full py-6 flex items-center justify-between group text-left hover:bg-white/[0.02] transition-colors px-4 -mx-4"
                                >
                                    <div className="flex items-baseline gap-6">
                                        <span className="font-mono text-[10px] text-[#E3E3FD] tracking-widest">/ {item.id}</span>
                                        <span className="font-montreal text-xl text-white group-hover:text-[#E3E3FD] transition-colors">{item.title}</span>
                                    </div>
                                    <ChevronDown size={18} className={`text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-8 pl-12 font-montreal text-white/60 leading-relaxed max-w-2xl border-l border-white/10 ml-4">
                                                {item.content}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                         );
                    })}
                </div>
            </div>
        </section>

        {/* 08. Visualizations */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Data Viz" number="08" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                   Minimalist charts and indicators for monitoring system health and usage metrics.
                </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bar Chart Mockup */}
                <div className="p-8 border border-white/10 bg-[#0A0A0A] relative overflow-hidden group">
                     <Corner className="top-0 right-0 border-t border-r" />
                     <div className="flex justify-between items-center mb-8">
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Throughput</span>
                        <BarChart2 size={16} className="text-[#E3E3FD]" />
                     </div>
                     <div className="flex items-end gap-2 h-32 border-b border-white/10 pb-px">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/5 group-hover:bg-[#E3E3FD]/20 transition-colors duration-500 relative overflow-hidden">
                                <motion.div 
                                    className="absolute bottom-0 left-0 w-full bg-[#E3E3FD]"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.05 }}
                                />
                            </div>
                        ))}
                     </div>
                     <div className="flex justify-between mt-4 font-mono text-[9px] text-white/30 uppercase tracking-widest">
                        <span>00:00</span>
                        <span>12:00</span>
                        <span>24:00</span>
                     </div>
                </div>

                {/* Circular Progress & Status */}
                <div className="space-y-8">
                     <div className="p-6 border border-white/10 bg-[#0A0A0A] flex items-center gap-6 relative">
                        <Corner className="bottom-0 left-0 border-b border-l" />
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                                <circle cx="32" cy="32" r="28" fill="none" stroke="#E3E3FD" strokeWidth="2" strokeDasharray="176" strokeDashoffset="44" strokeLinecap="round" />
                            </svg>
                            <span className="absolute font-mono text-xs text-white">75%</span>
                        </div>
                        <div>
                            <span className="font-medium text-white block mb-1">Storage Used</span>
                            <span className="text-xs text-white/40">150GB / 200GB</span>
                        </div>
                     </div>

                     <div className="p-6 border border-white/10 bg-[#0A0A0A] flex items-center justify-between relative overflow-hidden">
                         <div className="absolute left-0 top-0 w-1 h-full bg-red-500/50"></div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                <AlertCircle size={18} className="text-red-400" />
                            </div>
                            <div>
                                <span className="font-medium text-white block text-sm">Error Rate</span>
                                <span className="text-xs text-white/40 font-mono">CRITICAL_ALERT</span>
                            </div>
                         </div>
                         <span className="font-mono text-red-400 text-xs tracking-widest border border-red-500/20 px-2 py-1">+2.4%</span>
                     </div>
                </div>
            </div>
        </section>

        {/* 09. Modal & Dialog */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Overlays" number="09" />
                 <p className="font-montreal text-white/60 text-lg leading-relaxed">
                   Focused states for critical decisions or complex configuration.
                </p>
            </div>

            <div className="md:col-span-8">
                <div className="relative border border-white/10 bg-[#050505] p-12 overflow-hidden min-h-[400px] flex items-center justify-center">
                     {/* Modal Mockup */}
                     <div className="relative w-full max-w-md bg-[#0F0F0F] border border-white/10 shadow-2xl overflow-hidden transform scale-100">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-[#111]">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">Confirm Action</span>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-white/20"></div>
                                <div className="w-2 h-2 bg-white/20"></div>
                            </div>
                        </div>
                        {/* Modal Body */}
                        <div className="p-8">
                            <div className="w-12 h-12 bg-[#E3E3FD]/10 flex items-center justify-center mb-6 border border-[#E3E3FD]/20">
                                <Terminal size={24} className="text-[#E3E3FD]" />
                            </div>
                            <h4 className="text-xl font-medium text-white mb-2">Deploy to Production?</h4>
                            <p className="text-sm text-white/50 leading-relaxed mb-8">
                                This will update the live instance. All active user sessions will be preserved, but latency may increase momentarily.
                            </p>
                            <div className="flex gap-3">
                                <button className="flex-1 bg-[#E3E3FD] text-black py-3 font-medium text-sm hover:bg-white transition-colors border border-transparent">
                                    Deploy Now
                                </button>
                                <button className="flex-1 bg-transparent border border-white/10 text-white py-3 font-medium text-sm hover:bg-white/5 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        {/* Decorative scanline */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E3E3FD]/50 to-transparent opacity-20"></div>
                     </div>
                </div>
            </div>
        </section>

        {/* 10. Motion & 3D */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Motion" number="10" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                   The brand utilizes floating, component-based 3D motion to communicate modularity and assembly.
                </p>
            </div>

            <div className="md:col-span-8">
                <div className="relative border border-white/10 bg-[#0A0A0A] h-[500px] w-full overflow-hidden flex items-center justify-center">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-20" style={{ 
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }}></div>
                    
                    {/* Spot Mini Animation Recreated */}
                    <div className="relative w-full h-full flex items-center justify-center scale-125">
                         <motion.div
                            className="relative z-0"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
                        >
                            <img src={bottomComp} alt="Bottom" className="w-[320px] object-contain" />
                        </motion.div>
                        <motion.div
                            className="absolute -top-14"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                            style={{ zIndex: 2 }}
                        >
                            <img src={upComp} alt="Top" className="w-[170px] object-contain" />
                        </motion.div>
                    </div>
                    
                    {/* Tech Overlay */}
                    <div className="absolute bottom-6 left-6 font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest border border-[#E3E3FD]/30 px-2 py-1 bg-[#E3E3FD]/5">
                        Figure 1.A: Assembly Animation
                    </div>
                </div>
            </div>
        </section>

        {/* 11. Grid System */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Grid" number="11" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                   A flexible 12-column grid system that allows for asymmetrical balance and white space utilization.
                </p>
            </div>
            
            <div className="md:col-span-8">
                 <div className="grid grid-cols-12 gap-4 h-64 border border-white/10 p-4 bg-[#050505] relative">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-[#E3E3FD]/10 border border-[#E3E3FD]/10 h-full flex items-end justify-center pb-2">
                             <span className="font-mono text-[9px] text-white/20">{i+1}</span>
                        </div>
                    ))}
                    
                    {/* Floating Elements on Grid - Fixed Positioning relative to grid items */}
                    <div className="absolute top-20 left-4 right-4 flex gap-4 pointer-events-none">
                        <div className="w-[calc(33.33%-11px)] h-32 bg-[#E3E3FD]/20 border border-[#E3E3FD] flex items-center justify-center backdrop-blur-sm">
                            <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest">4 COL</span>
                        </div>
                        <div className="w-[calc(16.66%-11px)] h-16 bg-white/10 border border-white flex items-center justify-center backdrop-blur-sm mt-20 ml-auto">
                             <span className="font-mono text-[9px] text-white tracking-widest">2 COL</span>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* 12. Social Assets (New Section) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Social Assets" number="12" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed">
                   Optimized assets for LinkedIn presence. High-contrast, minimal designs for maximum visibility.
                </p>
            </div>
            
            <div className="md:col-span-8 space-y-12">
                {/* Banner Assets */}
                <div>
                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-6 block">LinkedIn Banner (1584 x 396px)</span>
                    <div className="grid grid-cols-1 gap-8">
                        {/* Option 1: Minimal Typography */}
                        <div className="group relative">
                            <div className="w-full aspect-[4/1] bg-[#020202] border border-white/10 flex items-center justify-between px-16 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E3E3FD]/5 blur-3xl rounded-full"></div>
                                
                                <div className="relative z-10">
                                    <h3 className="font-montreal text-3xl text-white tracking-tight leading-none mb-2">Branded Objects</h3>
                                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Automated Brand Governance</p>
                                </div>
                                <div className="relative z-10 flex gap-2">
                                     <div className="w-1.5 h-1.5 bg-[#E3E3FD]"></div>
                                     <div className="w-1.5 h-1.5 bg-white/20"></div>
                                     <div className="w-1.5 h-1.5 bg-white/20"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <span className="font-mono text-[10px] text-white/40">Option 01: Minimal</span>
                                <button className="flex items-center gap-2 text-[#E3E3FD] hover:text-white transition-colors">
                                    <Download size={12} />
                                    <span className="font-mono text-[10px] uppercase tracking-widest">Download .png</span>
                                </button>
                            </div>
                        </div>

                        {/* Option 2: Node System */}
                        <div className="group relative">
                            <div className="w-full aspect-[4/1] bg-[#0A0A0A] border border-white/10 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0" style={{ 
                                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
                                    backgroundSize: '40px 40px' 
                                }}></div>
                                
                                <div className="relative z-10 flex items-center gap-8 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700">
                                     <div className="w-24 h-12 border border-white/20 bg-[#020202] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                                     </div>
                                     <div className="h-px w-16 bg-white/20"></div>
                                     <div className="w-24 h-12 border border-[#E3E3FD]/50 bg-[#E3E3FD]/10 flex items-center justify-center shadow-[0_0_15px_rgba(227,227,253,0.1)]">
                                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse"></div>
                                     </div>
                                     <div className="h-px w-16 bg-white/20"></div>
                                     <div className="w-24 h-12 border border-white/20 bg-[#020202] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                                     </div>
                                </div>
                                
                                <div className="absolute bottom-4 left-6 font-mono text-[9px] text-white/30 uppercase tracking-widest">System_v2.2</div>
                            </div>
                             <div className="flex justify-between items-center mt-3">
                                <span className="font-mono text-[10px] text-white/40">Option 02: System</span>
                                <button className="flex items-center gap-2 text-[#E3E3FD] hover:text-white transition-colors">
                                    <Download size={12} />
                                    <span className="font-mono text-[10px] uppercase tracking-widest">Download .png</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Picture Assets */}
                <div className="border-t border-white/10 pt-12">
                     <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-6 block">Profile Picture (400 x 400px)</span>
                     <div className="flex gap-8">
                        {/* Option 1: Symbol */}
                        <div className="group">
                             <div className="w-32 h-32 bg-[#020202] border border-white/10 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                <div className="w-12 h-12 border-2 border-white flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-700">
                                    <div className="w-4 h-4 bg-[#E3E3FD]"></div>
                                </div>
                             </div>
                             <div className="flex justify-between items-center mt-3 w-32">
                                <span className="font-mono text-[9px] text-white/40">Symbol</span>
                                <Download size={12} className="text-[#E3E3FD] cursor-pointer hover:text-white"/>
                            </div>
                        </div>

                        {/* Option 2: Monogram */}
                        <div className="group">
                             <div className="w-32 h-32 bg-[#E3E3FD] border border-white/10 flex items-center justify-center relative text-black">
                                <span className="font-montreal font-medium text-4xl tracking-tighter">Bo.</span>
                             </div>
                             <div className="flex justify-between items-center mt-3 w-32">
                                <span className="font-mono text-[9px] text-white/40">Monogram</span>
                                <Download size={12} className="text-[#E3E3FD] cursor-pointer hover:text-white"/>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

      </div>
      
      {/* Expanded Footer Component */}
      <footer className="w-full border-t border-white/10 bg-[#020202] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                <div className="col-span-1 md:col-span-5">
                    <h3 className="font-montreal font-medium text-2xl text-white mb-6">Branded Objects</h3>
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
                        <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                            <span className="w-1 h-1 bg-white/20 group-hover:bg-[#E3E3FD] transition-colors"></span>
                            Login
                        </li>
                        <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                            <span className="w-1 h-1 bg-white/20 group-hover:bg-[#E3E3FD] transition-colors"></span>
                            Request Access
                        </li>
                    </ul>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-6">
                    <h4 className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Connect</h4>
                    <div className="flex flex-col gap-3">
                        <a href="https://www.linkedin.com/company/108913089/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                            <Linkedin size={14} className="group-hover:text-[#E3E3FD] transition-colors"/>
                            <span className="font-mono text-xs">LinkedIn</span>
                        </a>
                         <a href="mailto:brandedobjects@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                            <Mail size={14} className="group-hover:text-[#E3E3FD] transition-colors"/>
                            <span className="font-mono text-xs">Email</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">© 2025 Branded Objects Systems</span>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
}