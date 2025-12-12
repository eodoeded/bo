import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, Layout, Type, MousePointer, CreditCard, Layers, Grid as GridIcon, Database, Cpu, Activity, User, Mail, Send, ChevronDown, Check, AlertCircle, Terminal, BarChart2, CornerDownRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Decorative Corner Component
const Corner = ({ className = "" }) => (
    <div className={`absolute w-2 h-2 border-white/30 ${className}`} />
);

// Tiny Technical Badge
const Badge = ({ children, className = "", color = "text-white/40" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest border border-white/10 px-1.5 py-0.5 rounded-[2px] ${color} ${className}`}>
        {children}
    </span>
);

const Node = ({ title, inputs = [], outputs = [], children, x, y, delay = 0, width = "w-32", type = "default", status }) => (
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
             <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
             <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
             {children}
          </div>
          
          {/* Ports - Squared */}
          {inputs.map((_, i) => (
            <div key={`in-${i}`} className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0A0A0A] border border-[#E3E3FD]/50 rotate-45" />
          ))}
          {outputs.map((_, i) => (
            <div key={`out-${i}`} className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0A0A0A] border border-[#E3E3FD]/50 rotate-45" />
          ))}
       </div>
    ) : (
      <div className="bg-[#050505]/95 border border-white/10 p-4 shadow-2xl backdrop-blur-md hover:border-white/30 transition-colors group relative">
        {/* Technical Decor */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">{title}</span>
          <div className={`w-1.5 h-1.5 ${status === 'active' ? 'bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]' : 'bg-white/20'}`}></div>
        </div>
        {children}
        
        {/* Input Ports - Rectangular */}
        {inputs.map((_, i) => (
          <div key={`in-${i}`} className="absolute -left-1 top-8 w-2 h-3 bg-[#050505] border border-white/20 hover:border-[#E3E3FD] transition-colors" />
        ))}
        {/* Output Ports - Rectangular */}
        {outputs.map((_, i) => (
          <div key={`out-${i}`} className="absolute -right-1 top-8 w-2 h-3 bg-[#050505] border border-white/20 hover:border-[#E3E3FD] transition-colors" />
        ))}
      </div>
    )}
  </motion.div>
);

const Connection = ({ start, end, delay, dashed = false, active = false }) => {
  // Squared / Circuit-like Path Logic
  const midX = (start.x + end.x) / 2;
  // M start -> L midX startY -> L midX endY -> L end
  const path = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      <motion.path
        d={path}
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeOpacity={dashed ? "0.1" : "0.15"}
        strokeDasharray={dashed ? "4 4" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      />
      
      {/* Circuit joints */}
      <circle cx={start.x} cy={start.y} r="1.5" fill="#fff" fillOpacity="0.2" />
      <circle cx={end.x} cy={end.y} r="1.5" fill="#fff" fillOpacity="0.2" />
      <circle cx={(start.x + end.x) / 2} cy={start.y} r="1.5" fill="#fff" fillOpacity="0.1" />
      <circle cx={(start.x + end.x) / 2} cy={end.y} r="1.5" fill="#fff" fillOpacity="0.1" />

      {(active || !dashed) && (
        <motion.path
            d={path}
            fill="none"
            stroke="#E3E3FD"
            strokeWidth="1.5"
            strokeLinecap="square"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ 
                pathLength: [0, 0.15, 0], 
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
    <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[#E3E3FD]"></div>
            <h2 className="font-montreal font-medium text-3xl tracking-tight text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-white/10"></span>
            <span className="font-mono text-[10px] text-white/30 tracking-widest">/ {number}</span>
        </div>
    </div>
);

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
      }}></div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-[#020202]/90 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
            <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest">[ BACK ]</span>
        </Link>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]"></span>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">System V2.1</span>
            </div>
        </div>
      </nav>

      {/* Hero: Advanced Node System */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#020202]">
        <div className="relative w-[1000px] h-[600px]">
            {/* Input Layer */}
            <Node title="Data_Ingest" outputs={[1]} x={50} y={250} delay={0.2} width="w-40" status="active">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/5">
                        <Database size={14} className="text-white/40"/>
                        <span className="font-mono text-[10px] text-white/60">JSON_STREAM</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="h-1 w-full bg-white/10 overflow-hidden">
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
                    <div className="grid grid-cols-5 gap-1 h-8">
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
                        <div className="h-8 w-full flex items-end gap-[2px]">
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
            <Connection start={{x: 210, y: 280}} end={{x: 345, y: 180}} delay={0.5} active={true} />
            <Connection start={{x: 210, y: 280}} end={{x: 345, y: 430}} delay={0.6} active={true} />
            
            <Connection start={{x: 545, y: 180}} end={{x: 695, y: 265}} delay={0.8} active={true} />
            <Connection start={{x: 515, y: 430}} end={{x: 695, y: 265}} delay={0.9} dashed={true} />
            
            <Connection start={{x: 855, y: 265}} end={{x: 895, y: 265}} delay={1.1} active={true} />

        </div>
        
        <div className="absolute bottom-12 left-6 md:left-12 max-w-md z-20">
            <Badge className="mb-4 bg-white text-black border-none">System_OS v2.1</Badge>
            <h1 className="font-montreal font-medium text-6xl md:text-8xl tracking-tight mb-6 text-white leading-[0.9]">
                Visual<br/><span className="text-[#E3E3FD]">System</span>
            </h1>
            <p className="font-montreal text-white/60 text-lg leading-relaxed">
                A modular design language built for precision, scalability, and automated brand governance.
            </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-32 px-6 md:px-12 space-y-48 relative z-10">
        
        {/* 01. Typography */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Typography" number="01" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    PP Neue Montreal serves as the primary typeface—a versatile grotesque sans serif that balances neutrality with character. SF Mono provides technical contrast.
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
                    
                    <div className="text-[120px] leading-[0.85] font-montreal font-medium tracking-tight mb-8">
                        Aa Bb Cc<br/>123 456
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-6 border border-white/10 bg-white/[0.02] relative group">
                            <Corner className="top-0 left-0 border-t border-l" />
                            <Corner className="bottom-0 right-0 border-b border-r" />
                            <span className="text-2xl mb-2 block">Regular</span>
                            <span className="font-mono text-xs text-white/40">400 — Body / Subheads</span>
                        </div>
                        <div className="p-6 border border-white/10 bg-white/[0.02] relative group">
                            <Corner className="top-0 left-0 border-t border-l" />
                            <Corner className="bottom-0 right-0 border-b border-r" />
                            <span className="text-2xl font-medium mb-2 block">Medium</span>
                            <span className="font-mono text-xs text-white/40">500 — Headlines / UI</span>
                        </div>
                    </div>
                </div>

                {/* Scale */}
                <div>
                    <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest mb-8 block uppercase">Hierarchy Scale</span>
                    <div className="space-y-8">
                        {[
                            { role: 'Display XL', size: 'text-8xl', sample: 'Visual Intelligence' },
                            { role: 'Heading L', size: 'text-6xl', sample: 'System Architecture' },
                            { role: 'Heading M', size: 'text-4xl', sample: 'Modular Components' },
                            { role: 'Body L', size: 'text-xl', sample: 'The studio controls the prompt structure and safety layers.' },
                            { role: 'Caption', size: 'text-sm font-mono uppercase tracking-widest', sample: 'System_Operational_v2' },
                        ].map((type, i) => (
                            <div key={i} className="group grid grid-cols-12 items-baseline border-b border-white/5 pb-6 hover:border-white/20 transition-colors cursor-crosshair">
                                <div className="col-span-3 font-mono text-xs text-white/30 group-hover:text-[#E3E3FD] transition-colors">{type.role}</div>
                                <div className={`col-span-9 font-montreal ${type.size} text-white`}>{type.sample}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 02. Interface & Cards */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Interface" number="02" />
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

                <div className="grid grid-cols-2 gap-8">
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

        {/* 03. Forms & Inputs */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Contact Forms" number="03" />
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
                        <div className="grid grid-cols-2 gap-8">
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

        {/* 04. Buttons & Actions */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Actions" number="04" />
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

        {/* 05. Accordions & Data */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Expansion" number="05" />
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

        {/* 06. Visualizations */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Data Viz" number="06" />
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

        {/* 07. Modal & Dialog */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
             <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Overlays" number="07" />
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

      </div>
      
      <footer className="py-12 border-t border-white/5 text-center relative z-10">
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default">© 2025 Branded Objects Systems</span>
      </footer>

    </div>
  );
}