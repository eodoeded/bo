import { motion } from 'framer-motion';
import { ArrowLeft, Box, Layout, Type, MousePointer, CreditCard, Layers, Grid as GridIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Node = ({ title, inputs = [], outputs = [], children, x, y, delay = 0, width = "w-32", type = "default" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: y + 20 }}
    animate={{ opacity: 1, scale: 1, y: y }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute z-10 ${width}`}
    style={{ left: x, top: y }}
  >
    {type === "minimal" ? (
       <div className="relative group">
          <div className="absolute -inset-2 bg-[#E3E3FD]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
          <div className="relative bg-[#0A0A0A] border border-white/10 rounded-full px-4 py-2 flex items-center justify-center shadow-xl backdrop-blur-md">
             {children}
          </div>
          {/* Ports */}
          {inputs.map((_, i) => (
            <div key={`in-${i}`} className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] border border-[#E3E3FD]/50 rounded-full" />
          ))}
          {outputs.map((_, i) => (
            <div key={`out-${i}`} className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] border border-[#E3E3FD]/50 rounded-full" />
          ))}
       </div>
    ) : (
      <div className="bg-[#050505]/90 border border-white/10 rounded-lg p-3 shadow-2xl backdrop-blur-md">
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{title}</span>
          <div className="w-1 h-1 bg-[#E3E3FD] rounded-full animate-pulse"></div>
        </div>
        {children}
        {/* Input Ports */}
        {inputs.map((_, i) => (
          <div key={`in-${i}`} className="absolute -left-1 top-6 w-2 h-2 bg-[#050505] border border-white/20 rounded-full" />
        ))}
        {/* Output Ports */}
        {outputs.map((_, i) => (
          <div key={`out-${i}`} className="absolute -right-1 top-6 w-2 h-2 bg-[#050505] border border-white/20 rounded-full" />
        ))}
      </div>
    )}
  </motion.div>
);

const Connection = ({ start, end, delay, dashed = false }) => {
  // Calculate control points for smooth bezier
  const midX = (start.x + end.x) / 2;
  const path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      {/* Base Line */}
      <motion.path
        d={path}
        fill="none"
        stroke={dashed ? "#ffffff" : "#ffffff"}
        strokeWidth="0.5"
        strokeOpacity="0.1"
        strokeDasharray={dashed ? "4 4" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      />
      
      {/* Animated Pill / Pulse */}
      {!dashed && (
        <motion.path
            d={path}
            fill="none"
            stroke="#E3E3FD"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ 
                pathLength: [0, 0.15, 0], 
                pathOffset: [0, 1, 1],
                opacity: [0, 1, 0]
            }}
            transition={{ 
                duration: 3, 
                delay: delay + 0.5, 
                ease: "linear", 
                repeat: Infinity,
                repeatDelay: 1
            }}
        />
      )}

      {/* Dashed Line Flow */}
      {dashed && (
         <motion.path
            d={path}
            fill="none"
            stroke="#E3E3FD"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -20 }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            className="opacity-30"
         />
      )}
    </svg>
  );
};

const SectionHeader = ({ title, number }) => (
    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
        <h2 className="font-inter-light text-2xl tracking-tight text-white/90">{title}</h2>
        <span className="font-mono text-[9px] text-white/30">{number}</span>
    </div>
);

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#E3E3FD] selection:text-black font-inter-light">
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-[#020202]/80 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Back to Product</span>
        </Link>
        <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_10px_#E3E3FD]"></span>
            <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest border border-[#E3E3FD]/10 px-3 py-1 rounded-full bg-[#E3E3FD]/5">
                System V1.0
            </span>
        </div>
      </nav>

      {/* Hero: Node System Visual */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#020202]">
        <div className="relative w-[900px] h-[500px]">
            {/* Background Grid - Ultra subtle */}
            <div className="absolute inset-0 opacity-[0.02] bg-[size:40px_40px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"></div>

            {/* NODE GRAPH */}
            
            {/* 1. Input Node */}
            <Node title="Source" outputs={[1]} x={50} y={220} delay={0.2} width="w-32">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center"><Box size={12} className="text-white/40"/></div>
                        <span className="font-mono text-[9px] text-white/40">RAW_DATA</span>
                    </div>
                    <div className="h-[1px] w-full bg-white/5"></div>
                    <div className="flex gap-1">
                        <div className="h-1 w-full bg-white/10 rounded-full"></div>
                        <div className="h-1 w-1/3 bg-[#E3E3FD]/40 rounded-full"></div>
                    </div>
                </div>
            </Node>

            {/* 2. Process Node (Top) */}
            <Node title="Logic" inputs={[1]} outputs={[1]} x={300} y={100} delay={0.4} width="w-40">
                <div className="space-y-1.5 py-1">
                    <div className="flex justify-between text-[9px] font-mono text-white/30"><span>RULE_01</span><span className="text-[#E3E3FD]">PASS</span></div>
                    <div className="flex justify-between text-[9px] font-mono text-white/30"><span>RULE_02</span><span className="text-[#E3E3FD]">PASS</span></div>
                    <div className="w-full bg-white/5 rounded-full h-1 mt-1 overflow-hidden">
                        <motion.div className="h-full bg-[#E3E3FD]" initial={{width:0}} animate={{width:"100%"}} transition={{duration:2, repeat:Infinity}} />
                    </div>
                </div>
            </Node>

            {/* 3. Style Node (Bottom) */}
            <Node title="Style" inputs={[1]} outputs={[1]} x={300} y={340} delay={0.5} width="w-40">
                 <div className="grid grid-cols-3 gap-1">
                    <div className="aspect-square rounded-sm bg-white/5"></div>
                    <div className="aspect-square rounded-sm bg-white/10"></div>
                    <div className="aspect-square rounded-sm bg-[#E3E3FD]/20 border border-[#E3E3FD]/20"></div>
                 </div>
            </Node>

            {/* 4. Render Node (Minimal Pill Style) */}
            <Node type="minimal" inputs={[1, 1]} outputs={[1]} x={600} y={220} delay={0.7} width="w-auto">
                <div className="flex items-center gap-3">
                    <Layout size={14} className="text-[#E3E3FD]" />
                    <span className="font-inter text-xs text-white">Composite_View</span>
                </div>
            </Node>

            {/* 5. Final Output */}
            <Node type="minimal" inputs={[1]} x={800} y={220} delay={0.9} width="w-auto">
                <div className="flex items-center gap-2 text-[#E3E3FD]">
                    <span className="w-2 h-2 rounded-full bg-[#E3E3FD] shadow-[0_0_10px_#E3E3FD]"></span>
                    <span className="font-mono text-[10px] tracking-widest uppercase">beam.org</span>
                </div>
            </Node>

            {/* Connections */}
            {/* Source -> Logic */}
            <Connection start={{x: 182, y: 250}} end={{x: 295, y: 130}} delay={0.5} />
            {/* Source -> Style */}
            <Connection start={{x: 182, y: 250}} end={{x: 295, y: 370}} delay={0.6} dashed={true} />
            
            {/* Logic -> Render */}
            <Connection start={{x: 465, y: 130}} end={{x: 595, y: 235}} delay={0.8} />
            {/* Style -> Render */}
            <Connection start={{x: 465, y: 370}} end={{x: 595, y: 235}} delay={0.9} />
            
            {/* Render -> Final */}
            <Connection start={{x: 740, y: 235}} end={{x: 795, y: 235}} delay={1.1} dashed={true} />

        </div>
        
        <div className="absolute bottom-12 left-6 md:left-12">
            <h1 className="font-inter-light font-light text-5xl md:text-7xl tracking-tighter mb-6 text-white">
                Design<br/>System
            </h1>
            <div className="flex gap-6 items-center">
                <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Version</span>
                    <span className="font-inter-light text-sm text-white/80">1.0.2</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10"></div>
                <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Status</span>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="font-inter-light text-sm text-white/80">Active</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-32 px-6 md:px-12 space-y-40">
        
        {/* 01. Grid System */}
        <section>
            <SectionHeader title="Grid Architecture" number="01" />
            <div className="grid grid-cols-12 gap-4 h-64 border border-white/10 p-4 bg-white/[0.01] relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                    <div className="w-full border-t border-white/5 border-dashed"></div>
                    <div className="w-full border-t border-white/5 border-dashed"></div>
                    <div className="w-full border-t border-white/5 border-dashed"></div>
                </div>
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="col-span-1 h-full bg-[#E3E3FD]/5 border-x border-[#E3E3FD]/10 flex items-end justify-center pb-2 rounded-sm">
                        <span className="font-mono text-[9px] text-white/20">{i+1}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-8 mt-8">
                <div>
                    <span className="font-mono text-[9px] text-white/30 block mb-2 tracking-widest">COLUMNS</span>
                    <p className="font-inter-light text-lg text-white/80">12 / 4</p>
                </div>
                <div>
                    <span className="font-mono text-[9px] text-white/30 block mb-2 tracking-widest">GUTTER</span>
                    <p className="font-inter-light text-lg text-white/80">24px</p>
                </div>
                <div>
                    <span className="font-mono text-[9px] text-white/30 block mb-2 tracking-widest">MARGIN</span>
                    <p className="font-inter-light text-lg text-white/80">48px</p>
                </div>
            </div>
        </section>

        {/* 02. Color System */}
        <section>
            <SectionHeader title="Color Palette" number="02" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                    { name: 'Void', hex: '#020202', bg: 'bg-[#020202]', text: 'text-white' },
                    { name: 'Signal', hex: '#FFFFFF', bg: 'bg-white', text: 'text-black' },
                    { name: 'Lavender', hex: '#E3E3FD', bg: 'bg-[#E3E3FD]', text: 'text-black' },
                    { name: 'Carbon', hex: '#1A1A1A', bg: 'bg-[#1A1A1A]', text: 'text-white' },
                    { name: 'Glass', hex: '5%', bg: 'bg-white/5 backdrop-blur-md', text: 'text-white' },
                ].map((color, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className={`h-32 ${color.bg} border border-white/10 rounded-xl mb-4 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            {color.name === 'Lavender' && (
                                <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                            )}
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest">{color.name}</span>
                            <span className="font-mono text-[9px] text-white/30">{color.hex}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 03. Typography */}
        <section>
            <SectionHeader title="Typography" number="03" />
            <div className="grid md:grid-cols-2 gap-24 border-b border-white/5 pb-20">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                            <Type size={14} className="text-[#E3E3FD]" />
                        </div>
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Display</span>
                    </div>
                    <p className="font-inter-light font-light text-8xl leading-[0.8] tracking-tighter mb-8 text-white">
                        Inter<br/><span className="text-white/20">Light</span>
                    </p>
                    <div className="space-y-6 border-l border-white/10 pl-8">
                        <div className="flex justify-between max-w-xs items-baseline">
                            <span className="font-mono text-[9px] text-white/30 tracking-widest">WEIGHTS</span>
                            <span className="font-inter-light text-sm text-white/80">Light (300)</span>
                        </div>
                        <div className="flex justify-between max-w-xs items-baseline">
                            <span className="font-mono text-[9px] text-white/30 tracking-widest">TRACKING</span>
                            <span className="font-inter-light text-sm text-white/80">-2% to -4%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                            <Type size={14} className="text-[#E3E3FD]" />
                        </div>
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Technical</span>
                    </div>
                    <p className="font-mono text-4xl mb-8 tracking-widest text-white/80">
                        SF MONO
                    </p>
                    <div className="space-y-6 border-l border-white/10 pl-8">
                        <div className="flex justify-between max-w-xs items-baseline">
                            <span className="font-mono text-[9px] text-white/30 tracking-widest">USAGE</span>
                            <span className="font-inter-light text-sm text-white/80">Labels, Data, Specs</span>
                        </div>
                        <div className="flex justify-between max-w-xs items-baseline">
                            <span className="font-mono text-[9px] text-white/30 tracking-widest">CASE</span>
                            <span className="font-inter-light text-sm text-white/80">Uppercase Only</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Type Scale */}
            <div className="mt-20 space-y-6">
                {[
                    { size: '80px', label: 'H1 / HERO', text: 'Visual Intelligence' },
                    { size: '48px', label: 'H2 / SECTION', text: 'System Workflow' },
                    { size: '32px', label: 'H3 / CARD', text: 'Feature Set' },
                    { size: '18px', label: 'P / BODY', text: 'The studio controls the prompt structure.' },
                    { size: '11px', label: 'LABEL / UI', text: 'SYSTEM_OPERATIONAL' },
                ].map((item, i) => (
                    <div key={i} className="grid grid-cols-12 items-baseline border-b border-white/5 pb-6 last:border-0 hover:bg-white/[0.02] transition-colors px-6 -mx-6 rounded-lg group">
                        <div className="col-span-2 font-mono text-[9px] text-white/20 tracking-widest group-hover:text-[#E3E3FD] transition-colors">{item.label}</div>
                        <div className="col-span-2 font-mono text-[9px] text-white/20">{item.size}</div>
                        <div className={`col-span-8 font-inter-light text-white/90 ${item.label.includes('LABEL') ? 'font-mono tracking-widest uppercase' : 'tracking-tight'}`} style={{ fontSize: item.size }}>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 04. UI Components */}
        <section>
            <SectionHeader title="Interface Components" number="04" />
            
            {/* Buttons */}
            <div className="mb-24">
                <span className="font-mono text-[9px] text-white/30 block mb-8 uppercase tracking-widest border-l border-white/20 pl-3">Interactives</span>
                <div className="flex flex-wrap gap-8 items-center p-16 border border-white/5 bg-white/[0.01] rounded-2xl">
                    <button className="bg-white text-black px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-[#E3E3FD] transition-all rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transform hover:-translate-y-0.5">
                        Primary Action
                    </button>
                    <button className="bg-transparent border border-white/20 text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:border-white transition-all rounded-full hover:bg-white/5">
                        Secondary Action
                    </button>
                    <button className="text-[#E3E3FD] font-mono text-[10px] tracking-widest uppercase hover:text-white transition-colors border-b border-[#E3E3FD]/30 hover:border-white pb-0.5">
                        Text Link
                    </button>
                </div>
            </div>

            {/* Form Elements */}
            <div className="mb-24">
                <span className="font-mono text-[9px] text-white/30 block mb-8 uppercase tracking-widest border-l border-white/20 pl-3">Inputs</span>
                <div className="grid md:grid-cols-2 gap-12 p-16 border border-white/5 bg-white/[0.01] rounded-2xl">
                    <div className="space-y-3">
                        <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/20 to-white/10 opacity-50 blur-[1px] group-hover:opacity-100 transition duration-500 rounded-full"></div>
                            <input 
                                type="text" 
                                value="brandedobjects@gmail.com" 
                                readOnly
                                className="relative w-full bg-[#050505] border border-white/10 p-4 text-white font-mono text-[11px] focus:outline-none rounded-full pl-6"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest ml-1">Select Option</label>
                        <div className="relative w-full bg-[#050505] border border-white/10 p-4 flex justify-between items-center cursor-pointer hover:border-white/30 transition-colors rounded-full px-6">
                            <span className="text-white font-mono text-[11px]">CONFIGURATION_A</span>
                            <div className="w-1.5 h-1.5 border-r border-b border-white/60 transform rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div>
                <span className="font-mono text-[9px] text-white/30 block mb-8 uppercase tracking-widest border-l border-white/20 pl-3">Containers</span>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="group relative p-10 bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all rounded-xl hover:-translate-y-1 duration-500">
                        {/* Corner markers */}
                        <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[#E3E3FD]/10 transition-colors">
                            <MousePointer size={16} className="text-white/40 group-hover:text-[#E3E3FD] transition-colors" />
                        </div>
                        <h3 className="font-inter-light text-lg mb-3 text-white/90">Interactive Card</h3>
                        <p className="font-inter-light text-sm text-white/50 leading-relaxed">Hover state reveals corner markers and highlights icon.</p>
                    </div>

                    <div className="relative p-10 bg-[#0A0A0A] border border-white/5 flex flex-col items-center justify-center text-center rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                            <Layers size={18} className="text-white/80" />
                        </div>
                        <h3 className="font-inter-light text-lg mb-3 text-white/90">Feature Block</h3>
                        <p className="font-inter-light text-sm text-white/50 leading-relaxed">Centered layout for core feature highlights.</p>
                    </div>

                    <div className="relative p-10 bg-[#E3E3FD] text-black border border-white/10 rounded-xl shadow-[0_0_30px_rgba(227,227,253,0.1)]">
                        <CreditCard size={20} className="mb-8 text-black/60" />
                        <h3 className="font-inter-light font-medium text-lg mb-3">Active State</h3>
                        <p className="font-inter-light text-sm text-black/60 leading-relaxed">High contrast variant for selected or emphasized items.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 05. Iconography */}
        <section>
            <SectionHeader title="Iconography" number="05" />
            <div className="grid grid-cols-2 md:grid-cols-8 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden">
                {[Box, Layout, MousePointer, CreditCard, Layers, GridIcon, Type, ArrowLeft].map((Icon, i) => (
                    <div key={i} className="aspect-square bg-[#050505] flex items-center justify-center hover:bg-[#0A0A0A] transition-colors group cursor-crosshair">
                        <Icon strokeWidth={1.2} className="text-white/40 group-hover:text-[#E3E3FD] transition-all group-hover:scale-110 duration-300" />
                    </div>
                ))}
            </div>
            <p className="mt-8 font-inter-light text-sm text-white/40 max-w-md border-l border-white/10 pl-4">
                Using <span className="text-white">Lucide React</span>. Stroke width set to 1.2px for a refined look. Icons should always be accompanied by a label or clear context.
            </p>
        </section>

      </div>
      
      <footer className="py-12 border-t border-white/5 text-center">
        <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default">© 2025 Branded Objects Systems</span>
      </footer>

    </div>
  );
}
