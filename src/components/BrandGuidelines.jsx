import { motion } from 'framer-motion';
import { ArrowLeft, Box, Layout, Type, MousePointer, CreditCard, Layers, Grid as GridIcon, Database, Cpu, Activity, User, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <div className="absolute -inset-4 bg-[#E3E3FD]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="relative bg-[#0A0A0A]/80 border border-white/10 rounded-full px-5 py-2.5 flex items-center justify-center shadow-xl backdrop-blur-md hover:border-white/20 transition-colors">
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
      <div className="bg-[#050505]/90 border border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-md hover:border-white/20 transition-colors group">
        <div className="flex justify-between items-center mb-4">
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">{title}</span>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]' : 'bg-white/20'}`}></div>
        </div>
        {children}
        {/* Input Ports */}
        {inputs.map((_, i) => (
          <div key={`in-${i}`} className="absolute -left-1.5 top-8 w-3 h-3 bg-[#050505] border border-white/20 rounded-full" />
        ))}
        {/* Output Ports */}
        {outputs.map((_, i) => (
          <div key={`out-${i}`} className="absolute -right-1.5 top-8 w-3 h-3 bg-[#050505] border border-white/20 rounded-full" />
        ))}
      </div>
    )}
  </motion.div>
);

const Connection = ({ start, end, delay, dashed = false, active = false }) => {
  const midX = (start.x + end.x) / 2;
  const path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

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
      
      {(active || !dashed) && (
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
        <h2 className="font-montreal font-medium text-3xl tracking-tight text-white">{title}</h2>
        <span className="font-mono text-[10px] text-white/30 tracking-widest">/ {number}</span>
    </div>
);

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal">
      
      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-[#020202]/80 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest">Back</span>
        </Link>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></span>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">System V2.0</span>
            </div>
        </div>
      </nav>

      {/* Hero: Advanced Node System */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#020202]">
        <div className="relative w-[1000px] h-[600px]">
            <div className="absolute inset-0 opacity-[0.03] bg-[size:60px_60px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"></div>

            {/* Input Layer */}
            <Node title="Data_Ingest" outputs={[1]} x={50} y={250} delay={0.2} width="w-40" status="active">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-white/5 rounded-md">
                        <Database size={14} className="text-white/40"/>
                        <span className="font-mono text-[10px] text-white/60">JSON_STREAM</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
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
                                className="bg-[#E3E3FD]/20 rounded-[1px]"
                                animate={{opacity:[0.2, 1, 0.2]}}
                                transition={{duration:Math.random()*2 + 1, repeat:Infinity}}
                            />
                        ))}
                    </div>
                </div>
            </Node>

            <Node title="Logic_Gate" inputs={[1]} outputs={[1]} x={350} y={400} delay={0.5} width="w-40">
                 <div className="p-2 bg-white/5 rounded-md border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <Activity size={12} className="text-white/40"/>
                        <span className="font-mono text-[9px] text-green-400">OPTIMAL</span>
                    </div>
                    <div className="h-8 w-full flex items-end gap-[2px]">
                        {[40, 70, 30, 80, 50, 90, 60].map((h, i) => (
                            <motion.div key={i} className="flex-1 bg-white/20 rounded-t-[1px]" animate={{height: [`${h}%`, `${Math.random()*80+20}%`]}} transition={{duration:2, repeat:Infinity}} />
                        ))}
                    </div>
                 </div>
            </Node>

            {/* Output Layer */}
            <Node type="minimal" inputs={[1, 1]} outputs={[1]} x={700} y={250} delay={0.7}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E3E3FD]/10 flex items-center justify-center text-[#E3E3FD]">
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
        
        <div className="absolute bottom-12 left-6 md:left-12 max-w-md">
            <h1 className="font-montreal font-medium text-6xl md:text-8xl tracking-tight mb-6 text-white leading-[0.9]">
                Visual<br/><span className="text-[#E3E3FD]">System</span>
            </h1>
            <p className="font-montreal text-white/60 text-lg leading-relaxed">
                A modular design language built for precision, scalability, and automated brand governance.
            </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-32 px-6 md:px-12 space-y-48">
        
        {/* 01. Typography */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Typography" number="01" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    PP Neue Montreal serves as the primary typeface—a versatile grotesque sans serif that balances neutrality with character. SF Mono provides technical contrast.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 border border-white/10 rounded-full font-mono text-xs text-white/60">.otf</div>
                    <div className="px-4 py-2 border border-white/10 rounded-full font-mono text-xs text-white/60">.woff2</div>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                {/* Display Type */}
                <div className="border-b border-white/5 pb-16">
                    <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest mb-6 block uppercase">Primary Display</span>
                    <div className="text-[120px] leading-[0.85] font-montreal font-medium tracking-tight mb-8">
                        Aa Bb Cc<br/>123 456
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-6 border border-white/10 rounded-xl bg-white/[0.02]">
                            <span className="text-2xl mb-2 block">Regular</span>
                            <span className="font-mono text-xs text-white/40">400 — Body / Subheads</span>
                        </div>
                        <div className="p-6 border border-white/10 rounded-xl bg-white/[0.02]">
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
                            <div key={i} className="group grid grid-cols-12 items-baseline border-b border-white/5 pb-6 hover:border-white/20 transition-colors">
                                <div className="col-span-3 font-mono text-xs text-white/30">{type.role}</div>
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
                    A collection of modular cards and containers designed for data density and clarity. Rounded corners (12px/16px) soften the technical aesthetic.
                </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 gap-8">
                {/* Feature Card */}
                <div className="group relative p-10 bg-[#0A0A0A] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex justify-between items-start mb-12">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500">
                            <Layers size={24} className="text-white"/>
                        </div>
                        <ArrowLeft size={20} className="text-white/20 rotate-[135deg] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
                    </div>
                    <h3 className="text-3xl font-medium mb-3">Modular Logic</h3>
                    <p className="text-white/50 text-lg max-w-md">Nodes can be connected to create complex logic flows without code.</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {/* Stats Card */}
                    <div className="p-8 bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col justify-between h-64 hover:bg-[#0F0F0F] transition-colors">
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
                    <div className="p-8 bg-[#E3E3FD] border border-white/10 rounded-2xl flex flex-col justify-between h-64 text-black group cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                                <User size={20} className="text-black/60"/>
                            </div>
                            <div className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium">Pro</div>
                        </div>
                        <div>
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
                <div className="p-12 border border-white/10 rounded-2xl bg-white/[0.01]">
                    <div className="grid gap-8">
                        <div className="space-y-3">
                            <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Full Name</label>
                            <input type="text" placeholder="John Doe" className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E3E3FD]/50 transition-colors font-montreal" />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input type="email" placeholder="john@company.com" className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 pl-12 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E3E3FD]/50 transition-colors font-montreal" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="font-mono text-xs text-white/40 uppercase tracking-widest">Department</label>
                                <div className="relative">
                                    <select className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white appearance-none focus:outline-none focus:border-[#E3E3FD]/50 transition-colors font-montreal">
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
                            <textarea rows="4" placeholder="Tell us about your project..." className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E3E3FD]/50 transition-colors font-montreal resize-none"></textarea>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-[#E3E3FD] transition-all flex items-center gap-2 group">
                                <span>Send Message</span>
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
      
      <footer className="py-12 border-t border-white/5 text-center">
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default">© 2025 Branded Objects Systems</span>
      </footer>

    </div>
  );
}
