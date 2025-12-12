import { motion } from 'framer-motion';
import { ArrowLeft, Box, Layout, Type, MousePointer, CreditCard, Layers, Grid as GridIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Node = ({ title, inputs = [], outputs = [], children, x, y, delay = 0, width = "w-32" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: y + 20 }}
    animate={{ opacity: 1, scale: 1, y: y }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute bg-[#1A1A1A] border border-white/10 rounded-sm p-3 ${width} shadow-xl z-10`}
    style={{ left: x, top: y }}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider">{title}</span>
      <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
    </div>
    {children}
    {/* Input Ports */}
    {inputs.map((_, i) => (
      <div key={`in-${i}`} className="absolute -left-1.5 top-4 w-3 h-3 bg-[#1A1A1A] border border-white/20 rounded-full" />
    ))}
    {/* Output Ports */}
    {outputs.map((_, i) => (
      <div key={`out-${i}`} className="absolute -right-1.5 top-4 w-3 h-3 bg-[#1A1A1A] border border-white/20 rounded-full" />
    ))}
  </motion.div>
);

const Connection = ({ start, end, delay }) => (
  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
    <motion.path
      d={`M ${start.x} ${start.y} C ${start.x + 50} ${start.y}, ${end.x - 50} ${end.y}, ${end.x} ${end.y}`}
      fill="none"
      stroke="#333"
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
    />
    <motion.path
      d={`M ${start.x} ${start.y} C ${start.x + 50} ${start.y}, ${end.x - 50} ${end.y}, ${end.x} ${end.y}`}
      fill="none"
      stroke="#E3E3FD"
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.4 }}
      transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeInOut" }}
    />
  </svg>
);

const SectionHeader = ({ title, number }) => (
    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
        <h2 className="font-inter text-2xl tracking-tight">{title}</h2>
        <span className="font-mono text-[10px] text-white/40">{number}</span>
    </div>
);

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#E3E3FD] selection:text-black">
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-[#020202]/80 backdrop-blur-sm border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[11px] uppercase tracking-widest">Back to Product</span>
        </Link>
        <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#E3E3FD] uppercase tracking-widest border border-[#E3E3FD]/20 px-2 py-1 rounded-sm">
                System V1.0
            </span>
        </div>
      </nav>

      {/* Hero: Node System Visual */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#050505]">
        <div className="relative w-[800px] h-[500px]">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[size:20px_20px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"></div>

            {/* Nodes - Expanding the graph */}
            <Node title="Source" outputs={[1]} x={50} y={200} delay={0.2} width="w-32">
                <div className="space-y-2">
                    <div className="h-1 w-full bg-white/10 rounded-full"></div>
                    <div className="h-1 w-2/3 bg-white/10 rounded-full"></div>
                    <div className="h-1 w-full bg-white/10 rounded-full"></div>
                </div>
            </Node>

            <Node title="Transform" inputs={[1]} outputs={[1, 1]} x={250} y={200} delay={0.4} width="w-40">
                <div className="space-y-1 py-1">
                    <div className="flex justify-between text-[9px] font-mono text-white/40"><span>SCALE</span><span>1.0</span></div>
                    <div className="flex justify-between text-[9px] font-mono text-white/40"><span>ROT</span><span>0.0</span></div>
                    <div className="flex justify-between text-[9px] font-mono text-white/40"><span>OPAC</span><span>1.0</span></div>
                </div>
            </Node>

            <Node title="Render_Main" inputs={[1]} outputs={[1]} x={500} y={100} delay={0.6} width="w-36">
                <div className="w-full h-12 bg-white/5 rounded-sm border border-white/10 flex items-center justify-center">
                    <Box size={16} className="text-white/40" />
                </div>
            </Node>

            <Node title="Render_UI" inputs={[1]} outputs={[1]} x={500} y={300} delay={0.7} width="w-36">
                <div className="w-full h-12 bg-white/5 rounded-sm border border-white/10 flex items-center justify-center">
                    <Layout size={16} className="text-white/40" />
                </div>
            </Node>

            <Node title="Composite" inputs={[1, 1]} outputs={[1]} x={700} y={200} delay={0.9} width="w-32">
                <div className="w-full h-16 bg-[#E3E3FD] rounded-sm shadow-[0_0_30px_rgba(227,227,253,0.15)] flex items-center justify-center">
                    <span className="font-mono text-[10px] text-black font-bold">FINAL</span>
                </div>
            </Node>

            {/* Connections */}
            <Connection start={{x: 182, y: 235}} end={{x: 245, y: 235}} delay={0.5} />
            
            <Connection start={{x: 410, y: 235}} end={{x: 495, y: 135}} delay={0.7} />
            <Connection start={{x: 410, y: 235}} end={{x: 495, y: 335}} delay={0.8} />
            
            <Connection start={{x: 644, y: 135}} end={{x: 695, y: 235}} delay={1.0} />
            <Connection start={{x: 644, y: 335}} end={{x: 695, y: 235}} delay={1.1} />
        </div>
        
        <div className="absolute bottom-12 left-6 md:left-12">
            <h1 className="font-inter font-medium text-5xl tracking-tighter mb-4">Design<br/>System</h1>
            <div className="flex gap-4">
                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase border-r border-white/20 pr-4">Ver 1.0.2</span>
                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">Updated Dec 12</span>
            </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-32 px-6 md:px-12 space-y-40">
        
        {/* 01. Grid System */}
        <section>
            <SectionHeader title="Grid Architecture" number="01" />
            <div className="grid grid-cols-12 gap-4 h-64 border border-white/10 p-4 bg-white/[0.01] relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                    <div className="w-full border-t border-white/5 border-dashed"></div>
                    <div className="w-full border-t border-white/5 border-dashed"></div>
                    <div className="w-full border-t border-white/5 border-dashed"></div>
                </div>
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="col-span-1 h-full bg-[#E3E3FD]/5 border-x border-[#E3E3FD]/10 flex items-end justify-center pb-2">
                        <span className="font-mono text-[9px] text-white/20">{i+1}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-8 mt-8">
                <div>
                    <span className="font-mono text-[10px] text-white/40 block mb-2">COLUMNS</span>
                    <p className="font-inter text-lg">12 / 4</p>
                </div>
                <div>
                    <span className="font-mono text-[10px] text-white/40 block mb-2">GUTTER</span>
                    <p className="font-inter text-lg">24px</p>
                </div>
                <div>
                    <span className="font-mono text-[10px] text-white/40 block mb-2">MARGIN</span>
                    <p className="font-inter text-lg">48px</p>
                </div>
            </div>
        </section>

        {/* 02. Color System */}
        <section>
            <SectionHeader title="Color Palette" number="02" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { name: 'Void', hex: '#020202', bg: 'bg-[#020202]', text: 'text-white' },
                    { name: 'Signal', hex: '#FFFFFF', bg: 'bg-white', text: 'text-black' },
                    { name: 'Lavender', hex: '#E3E3FD', bg: 'bg-[#E3E3FD]', text: 'text-black' },
                    { name: 'Carbon', hex: '#1A1A1A', bg: 'bg-[#1A1A1A]', text: 'text-white' },
                    { name: 'Glass', hex: '5%', bg: 'bg-white/5 backdrop-blur-md', text: 'text-white' },
                ].map((color, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className={`h-40 ${color.bg} border border-white/10 rounded-sm mb-3 transition-transform duration-300 group-hover:-translate-y-1 relative`}>
                            {color.name === 'Lavender' && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            )}
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <span className="font-mono text-[11px] text-white/80 uppercase tracking-wider">{color.name}</span>
                            <span className="font-mono text-[10px] text-white/40">{color.hex}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 03. Typography */}
        <section>
            <SectionHeader title="Typography" number="03" />
            <div className="grid md:grid-cols-2 gap-16 border-b border-white/5 pb-16">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Type size={16} className="text-[#E3E3FD]" />
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Display</span>
                    </div>
                    <p className="font-inter text-8xl leading-[0.8] tracking-tighter mb-8 text-white">
                        Inter<br/>Tight
                    </p>
                    <div className="space-y-4 border-l border-white/10 pl-6">
                        <div className="flex justify-between max-w-xs">
                            <span className="font-mono text-[10px] text-white/40">WEIGHTS</span>
                            <span className="font-inter text-sm">Light (300), Regular (400)</span>
                        </div>
                        <div className="flex justify-between max-w-xs">
                            <span className="font-mono text-[10px] text-white/40">TRACKING</span>
                            <span className="font-inter text-sm">-2% to -4%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Type size={16} className="text-[#E3E3FD]" />
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Technical</span>
                    </div>
                    <p className="font-mono text-4xl mb-8 tracking-widest text-white/80">
                        SF MONO
                    </p>
                    <div className="space-y-4 border-l border-white/10 pl-6">
                        <div className="flex justify-between max-w-xs">
                            <span className="font-mono text-[10px] text-white/40">USAGE</span>
                            <span className="font-inter text-sm">Labels, Data, Specs</span>
                        </div>
                        <div className="flex justify-between max-w-xs">
                            <span className="font-mono text-[10px] text-white/40">CASE</span>
                            <span className="font-inter text-sm">Uppercase Only</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Type Scale */}
            <div className="mt-16 space-y-8">
                {[
                    { size: '80px', label: 'H1 / HERO', text: 'Visual Intelligence' },
                    { size: '48px', label: 'H2 / SECTION', text: 'System Workflow' },
                    { size: '32px', label: 'H3 / CARD', text: 'Feature Set' },
                    { size: '18px', label: 'P / BODY', text: 'The studio controls the prompt structure.' },
                    { size: '11px', label: 'LABEL / UI', text: 'SYSTEM_OPERATIONAL' },
                ].map((item, i) => (
                    <div key={i} className="grid grid-cols-12 items-baseline border-b border-white/5 pb-4 last:border-0 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-sm">
                        <div className="col-span-2 font-mono text-[10px] text-white/30">{item.label}</div>
                        <div className="col-span-2 font-mono text-[10px] text-[#E3E3FD]/60">{item.size}</div>
                        <div className={`col-span-8 font-inter text-white ${item.label.includes('LABEL') ? 'font-mono tracking-widest uppercase' : 'tracking-tight'}`} style={{ fontSize: item.size }}>
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
            <div className="mb-20">
                <span className="font-mono text-[10px] text-white/40 block mb-8 uppercase tracking-widest border-l border-white/20 pl-3">Interactives</span>
                <div className="flex flex-wrap gap-8 items-center p-12 border border-white/10 bg-white/[0.01] rounded-sm">
                    <button className="bg-white text-black px-6 py-3 font-mono text-[11px] tracking-widest uppercase font-bold hover:bg-[#E3E3FD] transition-colors">
                        Primary Action
                    </button>
                    <button className="bg-transparent border border-white/20 text-white px-6 py-3 font-mono text-[11px] tracking-widest uppercase font-bold hover:border-white transition-colors">
                        Secondary Action
                    </button>
                    <button className="text-[#E3E3FD] font-mono text-[11px] tracking-widest uppercase hover:text-white transition-colors underline underline-offset-4">
                        Text Link
                    </button>
                </div>
            </div>

            {/* Form Elements */}
            <div className="mb-20">
                <span className="font-mono text-[10px] text-white/40 block mb-8 uppercase tracking-widest border-l border-white/20 pl-3">Inputs</span>
                <div className="grid md:grid-cols-2 gap-8 p-12 border border-white/10 bg-white/[0.01] rounded-sm">
                    <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Email Address</label>
                        <div className="relative group">
                            <div className="absolute -inset-[0.5px] bg-gradient-to-r from-white/20 to-white/10 opacity-50 blur-[1px] group-hover:opacity-75 transition duration-500"></div>
                            <input 
                                type="text" 
                                value="brandedobjects@gmail.com" 
                                readOnly
                                className="relative w-full bg-[#050505] border border-white/10 p-3 text-white font-mono text-[11px] focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Select Option</label>
                        <div className="relative w-full bg-[#050505] border border-white/10 p-3 flex justify-between items-center cursor-pointer hover:border-white/30 transition-colors">
                            <span className="text-white font-mono text-[11px]">CONFIGURATION_A</span>
                            <div className="w-2 h-2 border-r border-b border-white/60 transform rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div>
                <span className="font-mono text-[10px] text-white/40 block mb-8 uppercase tracking-widest border-l border-white/20 pl-3">Containers</span>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="group relative p-8 bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-colors">
                        {/* Corner markers */}
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <MousePointer size={20} className="text-white/40 mb-6 group-hover:text-[#E3E3FD] transition-colors" />
                        <h3 className="font-inter text-lg mb-2">Interactive Card</h3>
                        <p className="font-inter-light text-sm text-white/60">Hover state reveals corner markers and highlights icon.</p>
                    </div>

                    <div className="relative p-8 bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                            <Layers size={20} className="text-white" />
                        </div>
                        <h3 className="font-inter text-lg mb-2">Feature Block</h3>
                        <p className="font-inter-light text-sm text-white/60">Centered layout for core feature highlights.</p>
                    </div>

                    <div className="relative p-8 bg-[#E3E3FD] text-black border border-white/10">
                        <CreditCard size={20} className="mb-6 text-black/60" />
                        <h3 className="font-inter text-lg mb-2 font-medium">Active State</h3>
                        <p className="font-inter-light text-sm text-black/70">High contrast variant for selected or emphasized items.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 05. Iconography */}
        <section>
            <SectionHeader title="Iconography" number="05" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-white/10 border border-white/10">
                {[Box, Layout, MousePointer, CreditCard, Layers, GridIcon, Type, ArrowLeft].map((Icon, i) => (
                    <div key={i} className="aspect-square bg-[#050505] flex items-center justify-center hover:bg-[#0A0A0A] transition-colors group">
                        <Icon strokeWidth={1.5} className="text-white/60 group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
                    </div>
                ))}
            </div>
            <p className="mt-6 font-inter-light text-sm text-white/40 max-w-md">
                Using <span className="text-white">Lucide React</span>. Stroke width set to 1.5px. Icons should always be accompanied by a label or clear context.
            </p>
        </section>

      </div>
      
      <footer className="py-12 border-t border-white/5 text-center">
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">© 2025 Branded Objects Systems</span>
      </footer>

    </div>
  );
}
