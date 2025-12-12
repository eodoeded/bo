import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Node = ({ title, inputs = [], outputs = [], children, x, y, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, y: y + 20 }}
    animate={{ opacity: 1, scale: 1, y: y }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="absolute bg-[#1A1A1A] border border-white/10 rounded-sm p-3 w-32 shadow-xl"
    style={{ left: x, top: y }}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="font-mono text-[10px] text-white/60">{title}</span>
    </div>
    {children}
    {/* Input Ports */}
    {inputs.map((_, i) => (
      <div key={i} className="absolute -left-1.5 top-4 w-3 h-3 bg-[#333] border border-white/20 rounded-full" />
    ))}
    {/* Output Ports */}
    {outputs.map((_, i) => (
      <div key={i} className="absolute -right-1.5 top-4 w-3 h-3 bg-[#333] border border-white/20 rounded-full" />
    ))}
  </motion.div>
);

const Connection = ({ start, end, delay }) => (
  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
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

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#E3E3FD] selection:text-black">
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span className="font-mono text-[11px] uppercase tracking-widest">Back to Product</span>
        </Link>
        <span className="font-mono text-[11px] text-[#E3E3FD] uppercase tracking-widest border border-[#E3E3FD]/20 px-2 py-1 rounded-sm">
            System V1.0
        </span>
      </nav>

      {/* Header / Node Visual */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="relative w-[600px] h-[400px]">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[size:20px_20px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"></div>

            {/* Nodes */}
            <Node title="Input" outputs={[1]} x={50} y={150} delay={0.2}>
                <div className="w-full h-8 bg-black/50 rounded-sm border border-white/5 flex items-center justify-center">
                    <span className="font-mono text-[9px] text-[#E3E3FD]">0.39</span>
                </div>
            </Node>

            <Node title="Process" inputs={[1]} outputs={[1]} x={250} y={150} delay={0.4}>
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-white/40"><span>H</span><span>0.39</span></div>
                    <div className="flex justify-between text-[9px] font-mono text-white/40"><span>S</span><span>0.80</span></div>
                    <div className="flex justify-between text-[9px] font-mono text-white/40"><span>L</span><span>0.94</span></div>
                </div>
            </Node>

            <Node title="Output" inputs={[1]} x={450} y={150} delay={0.6}>
                <div className="w-full h-12 bg-[#E3E3FD] rounded-sm shadow-[0_0_20px_rgba(227,227,253,0.2)]"></div>
            </Node>

            {/* Connections */}
            <Connection start={{x: 182, y: 185}} end={{x: 245, y: 185}} delay={0.5} />
            <Connection start={{x: 382, y: 185}} end={{x: 445, y: 185}} delay={0.7} />
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
            <h1 className="font-inter font-medium text-4xl tracking-tight mb-2">Design Infrastructure</h1>
            <p className="font-mono text-[11px] text-white/40 tracking-widest uppercase">Precision. Control. Logic.</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-24 px-6 space-y-32">
        
        {/* Colors */}
        <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                <h2 className="font-inter text-2xl">Color System</h2>
                <span className="font-mono text-[10px] text-white/40">01</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <div className="h-32 bg-[#020202] border border-white/10 rounded-sm"></div>
                    <div className="flex justify-between font-mono text-[10px] text-white/60">
                        <span>Void</span>
                        <span>#020202</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-32 bg-[#FFFFFF] border border-white/10 rounded-sm"></div>
                    <div className="flex justify-between font-mono text-[10px] text-white/60">
                        <span>Signal</span>
                        <span>#FFFFFF</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-32 bg-[#E3E3FD] border border-white/10 rounded-sm"></div>
                    <div className="flex justify-between font-mono text-[10px] text-white/60">
                        <span>Lavender</span>
                        <span>#E3E3FD</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-32 bg-white/5 border border-white/10 rounded-sm backdrop-blur-sm"></div>
                    <div className="flex justify-between font-mono text-[10px] text-white/60">
                        <span>Glass</span>
                        <span>5%</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Typography */}
        <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                <h2 className="font-inter text-2xl">Typography</h2>
                <span className="font-mono text-[10px] text-white/40">02</span>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <span className="font-mono text-[10px] text-[#E3E3FD] mb-4 block">PRIMARY / HEADINGS</span>
                    <p className="font-inter text-6xl leading-[0.9] tracking-tighter mb-4">Inter<br/>Tight</p>
                    <p className="font-inter-light text-white/60 text-sm max-w-xs">
                        Used for headlines and major statements. Always tracked tight (-2% to -4%). Clean, objective, modern.
                    </p>
                </div>
                <div>
                    <span className="font-mono text-[10px] text-[#E3E3FD] mb-4 block">SECONDARY / DATA</span>
                    <p className="font-mono text-2xl mb-4 tracking-widest">SF MONO</p>
                    <p className="font-inter-light text-white/60 text-sm max-w-xs">
                        Used for labels, metadata, and technical details. Always uppercase, small size (9-11px), tracked wide (+20%).
                    </p>
                </div>
            </div>
        </section>

        {/* Motion */}
        <section>
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                <h2 className="font-inter text-2xl">Motion Physics</h2>
                <span className="font-mono text-[10px] text-white/40">03</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border border-white/10 rounded-sm bg-white/[0.02]">
                    <div className="flex justify-between mb-8">
                        <span className="font-mono text-[10px] text-white/40">EASE_OUT_EXPO</span>
                        <span className="font-mono text-[10px] text-[#E3E3FD]">[0.16, 1, 0.3, 1]</span>
                    </div>
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-[#E3E3FD] w-1/2"
                            animate={{ x: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 1 }}
                        />
                    </div>
                    <p className="font-inter-light text-sm text-white/60">
                        Quick entrance, slow settling. Used for UI elements, modals, and hover states. No bounce.
                    </p>
                </div>
                
                <div className="p-8 border border-white/10 rounded-sm bg-white/[0.02]">
                    <div className="flex justify-between mb-8">
                        <span className="font-mono text-[10px] text-white/40">LINEAR_LOOP</span>
                        <span className="font-mono text-[10px] text-[#E3E3FD]">[0, 0, 1, 1]</span>
                    </div>
                    <div className="flex justify-center mb-4">
                        <motion.div 
                            className="w-4 h-4 border border-white/40"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        />
                    </div>
                    <p className="font-inter-light text-sm text-white/60">
                        Constant velocity. Used for background ambient movement and loaders.
                    </p>
                </div>
            </div>
        </section>

      </div>
      
      <footer className="py-12 border-t border-white/5 text-center">
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">© 2025 Branded Objects Systems</span>
      </footer>

    </div>
  );
}

