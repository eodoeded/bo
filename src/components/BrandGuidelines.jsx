import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, Layout, Type, MousePointer, CreditCard, Layers, Grid as GridIcon, Database, Cpu, Activity, User, Mail, Send, ChevronDown, Check, AlertCircle, Terminal, BarChart2, CornerDownRight, Zap, Move, Eye, Code, Command, Github, Twitter, Disc, Lock, Unlock, Edit3, Image as ImageIcon, Linkedin, Download, Share2, Sliders, Hand, ZoomIn, MoreHorizontal, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
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
          <div className="bg-[#050505]/95 border border-white/10 p-3 shadow-2xl backdrop-blur-md hover:border-[#E3E3FD]/30 transition-colors group relative">
            {/* Technical Decor */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-[#E3E3FD] transition-colors"></div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30 group-hover:border-[#E3E3FD] transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30 group-hover:border-[#E3E3FD] transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-[#E3E3FD] transition-colors"></div>
    
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-[#E3E3FD] transition-colors">{title}</span>
              <div className={`w-1 h-1 ${status === 'active' ? 'bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]' : 'bg-white/10'}`}></div>
            </div>
            {children}
            
            {/* Input Ports - Rectangular - Adjusted vertical pos to match connections */}
            {inputs.map((_, i) => (
              <div key={`in-${i}`} className="absolute -left-[5px] top-[32px] w-1.5 h-2 bg-[#050505] border border-white/30 hover:border-[#E3E3FD] transition-colors" />
            ))}
            {/* Output Ports - Rectangular - Adjusted vertical pos to match connections */}
            {outputs.map((_, i) => (
              <div key={`out-${i}`} className="absolute -right-[5px] top-[32px] w-1.5 h-2 bg-[#050505] border border-white/30 hover:border-[#E3E3FD] transition-colors" />
            ))}
          </div>
        )}
      </motion.div>
    );
};

const Connection = ({ start, end, delay, dashed = false, active = false }) => {
  const midX = (start.x + end.x) / 2;
  const path = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      <motion.path
        d={path}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity={dashed ? "0.2" : "0.3"} // Increased opacity
        strokeDasharray={dashed ? "4 4" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      />
      
      {/* Circuit joints */}
      <rect x={start.x - 1.5} y={start.y - 1.5} width="3" height="3" fill="#E3E3FD" fillOpacity="0.8" />
      <rect x={end.x - 1.5} y={end.y - 1.5} width="3" height="3" fill="#E3E3FD" fillOpacity="0.8" />

      {(active || !dashed) && (
        <motion.path
            d={path}
            fill="none"
            stroke="#E3E3FD" // Lavender
            strokeWidth="1.5"
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
            <div className="w-1.5 h-1.5 bg-[#E3E3FD] group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_8px_#E3E3FD]"></div>
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
        className={`p-2 border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white'} transition-colors rounded-[1px]`}
    >
        <Icon size={14} />
    </button>
);

export default function BrandGuidelines() {
  const downloadRef1 = useRef(null);
  const downloadRef2 = useRef(null);
  const downloadRef3 = useRef(null);
  const downloadRef4 = useRef(null);

  const handleDownload = async (ref, name) => {
    if (ref.current) {
        try {
            const canvas = await html2canvas(ref.current, {
                backgroundColor: '#020202',
                scale: 4 // High res (2x standard banner size roughly)
            });
            const link = document.createElement('a');
            link.download = `branded-objects-${name}.png`;
            link.href = canvas.toDataURL();
            link.click();
        } catch (error) {
            console.error('Download failed:', error);
        }
    }
  };

  return (
    <div className="min-h-screen bg-[#261E19] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal overflow-x-hidden">
      
      {/* Background Grid - "Weird" glitchy pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ 
          backgroundImage: 'linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
      }}></div>
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-[#261E19]/90 backdrop-blur-md border-b border-white/5">
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
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#261E19]">
        
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
                    
                    <div className="text-[120px] leading-[0.85] font-montreal font-medium tracking-tight mb-12 text-white hover:text-[#E3E3FD] transition-colors duration-500 cursor-default">
                        Aa Bb Cc<br/>123 456
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-white/10 bg-white/[0.02] relative group hover:bg-white/[0.04] transition-colors min-h-[200px] flex flex-col justify-between hover:border-[#E3E3FD]/50">
                            <Corner className="top-0 left-0 border-t border-l" />
                            <Corner className="bottom-0 right-0 border-b border-r" />
                            <span className="text-4xl mb-2 block">Regular</span>
                            <span className="font-mono text-xs text-white/40">400 — Body / Subheads</span>
                        </div>
                        <div className="p-8 border border-white/10 bg-white/[0.02] relative group hover:bg-white/[0.04] transition-colors min-h-[200px] flex flex-col justify-between hover:border-[#E3E3FD]/50">
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
                    The Studio interface components. Designed for density and precision.
                </p>
            </div>
            
            <div className="md:col-span-8 space-y-12">
                {/* Toolbar */}
                <div className="bg-[#050505] border border-white/10 p-8">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Floating Toolbar</span>
                    <div className="inline-flex bg-[#050505] border border-white/10 p-1 items-center gap-1 rounded-[2px] shadow-xl">
                        <IconButton icon={MousePointer} active={true} />
                        <IconButton icon={Hand} />
                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                        <IconButton icon={Type} />
                        <IconButton icon={ImageIcon} />
                        <IconButton icon={Box} />
                    </div>
                </div>

                {/* Property Item */}
                <div className="bg-[#050505] border border-white/10 p-8">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Property Control</span>
                    <div className="grid grid-cols-2 gap-4 max-w-sm">
                        <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex items-center gap-2 group hover:border-white/30 transition-colors">
                            <span className="font-mono text-[9px] text-white/30">W</span>
                            <span className="font-mono text-[10px] text-white">1080</span>
                        </div>
                        <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex items-center gap-2 group hover:border-white/30 transition-colors">
                            <span className="font-mono text-[9px] text-white/30">H</span>
                            <span className="font-mono text-[10px] text-white">1350</span>
                        </div>
                    </div>
                </div>

                {/* Effects Panel */}
                <div className="bg-[#050505] border border-white/10 p-8">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Effect Panel</span>
                    <div className="bg-[#0A0A0A] border border-white/10 p-3 space-y-3 relative overflow-hidden group max-w-sm">
                        <Corner className="top-0 left-0 border-t border-l" />
                        <Corner className="bottom-0 right-0 border-b border-r" />
                        
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
                    Public-facing components for the marketing site. Bold, high-contrast, informative.
                </p>
            </div>
            
            <div className="md:col-span-8 space-y-12">
                {/* Benefit Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#050505] border border-white/10 p-8 relative group hover:bg-[#080808] transition-colors">
                        <Corner className="top-0 right-0 border-t border-r" />
                        <Corner className="bottom-0 left-0 border-b border-l" />
                        
                        <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors">
                            <CreditCard size={20} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                        </div>
                        
                        <h3 className="font-mono text-sm text-[#E3E3FD] uppercase tracking-widest mb-3">01 // Revenue</h3>
                        <h4 className="font-montreal font-medium text-2xl text-white mb-4">Productised Service</h4>
                        <p className="text-white/50 font-montreal text-sm leading-relaxed">
                            Don't just bill for hours. Sell the tool as a subscription.
                        </p>
                    </div>
                    
                    {/* Feature Row */}
                    <div className="bg-[#050505] p-8 relative flex flex-col justify-center">
                        <Corner className="top-0 left-0 border-t border-l" />
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

        {/* 15. Interactive Nodes */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Interactive Node" number="15" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    The floating, draggable node component used in the hero section.
                </p>
            </div>
            
            <div className="md:col-span-8 h-[400px] bg-[#050505] relative overflow-hidden border border-white/10">
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ 
                    backgroundImage: 'linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}></div>
                
                {/* Static Representation of Hero Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="bg-[#050505] border border-white/10 p-4 shadow-2xl backdrop-blur-md group hover:border-white/30 transition-colors relative">
                            <Corner className="top-0 left-0 border-t border-l group-hover:border-white transition-colors" />
                            <Corner className="bottom-0 right-0 border-b border-r group-hover:border-white transition-colors" />

                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">Branded_Objects</span>
                                <div className="w-1 h-1 bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
                            </div>
                            
                            <div className="h-32 w-full relative flex items-center justify-center overflow-hidden bg-[#0A0A0A] border border-white/10 mb-2 shadow-inner">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
                                <motion.div
                                    className="relative z-0"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <img src={bottomComp} alt="Bottom" className="w-[100px] object-contain opacity-100" />
                                </motion.div>
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <span className="font-mono text-[8px] text-white/40">GENERATING_ASSET</span>
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="w-0.5 h-1.5 bg-[#E3E3FD]" style={{opacity: 0.2 + (i*0.15)}}></div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30 group-hover:border-[#E3E3FD] transition-colors" />
                            <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30 group-hover:border-[#E3E3FD] transition-colors" />
                        </div>
                    </motion.div>
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
