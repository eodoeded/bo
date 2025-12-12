import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Cpu, Layout, ArrowRight, Lock, Sparkles, Scan, Activity, Zap } from 'lucide-react';
import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";

// Shared Components
const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const Badge = ({ children, className = "", color = "text-[#E3E3FD]" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest border border-white/10 px-1.5 py-0.5 rounded-[1px] bg-white/[0.02] ${color} ${className}`}>
        {children}
    </span>
);

const Node = ({ title, icon: Icon, children, x, y, delay = 0, width = "w-48" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute z-10 bg-[#050505] border border-white/10 p-4 ${width} shadow-2xl backdrop-blur-md group hover:border-white/30 transition-colors`}
    style={{ left: x, top: y }}
  >
    <Corner className="top-0 left-0 border-t border-l group-hover:border-white transition-colors" />
    <Corner className="bottom-0 right-0 border-b border-r group-hover:border-white transition-colors" />

    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{title}</span>
      <div className="w-1 h-1 bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
    </div>
    <div className="flex flex-col gap-2 relative z-10">
        {children}
    </div>
    
    {/* Ports */}
    <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30 group-hover:border-[#E3E3FD] transition-colors" />
    <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30 group-hover:border-[#E3E3FD] transition-colors" />
  </motion.div>
);

const Connection = ({ start, end, delay }) => {
    const midX = (start.x + end.x) / 2;
    const path = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
  
    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
        <motion.path
          d={path}
          fill="none"
          stroke="#E3E3FD"
          strokeWidth="1"
          strokeOpacity="0.1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay, ease: "easeInOut" }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="#E3E3FD"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0.4, 0], opacity: [0, 1, 0], pathOffset: [0, 1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: delay + 0.5 }}
        />
      </svg>
    );
};

export default function WaitlistHero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('success');
    const emailBody = email; 
    setEmail('');
    const subject = encodeURIComponent("Join Waitlist - Branded Objects");
    const body = encodeURIComponent(`Please add ${emailBody} to the Branded Objects waitlist.`);
    
    // Simulate "sending" state before opening client
    setTimeout(() => {
        window.location.href = `mailto:brandedobjects@gmail.com?subject=${subject}&body=${body}`;
        setTimeout(() => setStatus('idle'), 2000);
    }, 800);
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col pt-32 pb-0 px-6 overflow-hidden bg-[#020202]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ 
          backgroundImage: 'linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
      }}></div>

      {/* Decorative Floating Elements (Subtler) */}
      <div className="absolute top-32 left-6 md:left-12 font-mono text-[9px] text-white/10 uppercase tracking-widest hidden md:block">
          SYS_READY <br/> 37.7749° N, 122.4194° W
      </div>
      <div className="absolute bottom-12 right-6 md:right-12 font-mono text-[9px] text-white/10 uppercase tracking-widest hidden md:block text-right">
          LATENCY: 12ms <br/> SECURE_CONNECTION
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center relative z-20">
        
        {/* Left Column: Text & Form */}
        <div className="flex flex-col items-start text-left z-20 mb-12 lg:mb-0 lg:-mt-20">
            {/* Simplified Header - Removed complex badge stack */}
            <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Early Access Protocol</span>
            </div>
            
            <motion.h1
                className="font-montreal font-medium text-white text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Client-Safe <br/><span className="text-[#E3E3FD]">Design Tools.</span>
            </motion.h1>

            <motion.p
                className="font-montreal text-white/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed border-l border-white/10 pl-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
            >
                Empower clients to generate on-brand assets. <br/>
                You define the logic. They fill the blanks.
            </motion.p>
            
            <motion.form 
                className="flex flex-col sm:flex-row w-full max-w-[460px] relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                onSubmit={handleJoin}
            >
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#E3E3FD]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                <div className="relative flex flex-col sm:flex-row w-full bg-[#050505] border border-white/10 p-1">
                    <Corner className="top-0 left-0 border-t border-l" />
                    <Corner className="bottom-0 right-0 border-b border-r" />
                    
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-4 pointer-events-none">
                        <Scan size={14} className="text-white/20" />
                    </div>

                    <input 
                        type="email" 
                        placeholder="studio@agency.com" 
                        className="flex-1 bg-transparent text-white pl-10 pr-6 py-4 font-mono text-xs focus:outline-none placeholder:text-white/20 tracking-wider"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="bg-white text-black px-8 py-4 font-mono font-semibold text-[11px] tracking-[0.2em] hover:bg-[#E3E3FD] transition-colors whitespace-nowrap uppercase border border-transparent flex items-center gap-2 group/btn"
                    >
                        Request Access
                        <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </motion.form>
             {status === 'success' && (
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mt-4 font-mono text-[10px] text-[#E3E3FD] tracking-widest uppercase flex items-center gap-2"
                >
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] animate-pulse rounded-full"></div>
                    Opening secure channel...
                </motion.p>
            )}
        </div>

      </div>

      {/* Right Column: Node Graph with Spot Mini - Unrestrained & Spread */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none z-10">
            {/* Graph Container - No Border, Full Spread */}
            <div className="relative w-full h-full">
                
                {/* 
                    Unrestrained Coordinates. 
                    Using percentage based positioning or wider spread.
                    Studio: Top Leftish.
                    Core: Center Rightish.
                    Output: Bottom Rightish.
                */}

                {/* Studio Input - Top Left of area */}
                <Node title="Design_Studio" x="10%" y="20%" delay={0.4} width="w-48">
                    <div className="flex items-center gap-3 text-white/60">
                        <Database size={14} />
                        <span className="font-mono text-[9px]">ASSETS_LOADED</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                        <Lock size={14} className="text-[#E3E3FD]"/>
                        <span className="font-mono text-[9px] text-[#E3E3FD]">RULES_LOCKED</span>
                    </div>
                </Node>

                {/* System Core with Spot Mini - Center */}
                <Node title="Branded_Objects" x="40%" y="45%" delay={0.6} width="w-64">
                    <div className="h-48 w-full relative flex items-center justify-center overflow-hidden bg-[#0A0A0A] border border-white/10 mb-2 shadow-inner">
                         {/* Spot Mini Animation */}
                         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
                        <motion.div
                            className="relative z-0"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src={bottomComp} alt="Bottom" className="w-[140px] object-contain opacity-100" />
                        </motion.div>
                        <motion.div
                            className="absolute top-16"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                            style={{ zIndex: 2 }}
                        >
                            <img src={upComp} alt="Top" className="w-[70px] object-contain opacity-100" />
                        </motion.div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="font-mono text-[8px] text-white/40">GENERATING_ASSET_ID_8492</span>
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="w-0.5 h-1.5 bg-[#E3E3FD]" style={{opacity: 0.2 + (i*0.15)}}></div>
                            ))}
                        </div>
                    </div>
                </Node>

                {/* Client Output - Bottom Right */}
                <Node title="Client_Output" x="75%" y="70%" delay={0.8} width="w-48">
                    <div className="flex items-center gap-3 text-white/60">
                        <Layout size={14} />
                        <span className="font-mono text-[9px]">RENDER_COMPLETE</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                        <Zap size={14} className="text-[#E3E3FD]"/>
                        <span className="font-mono text-[9px]">INSTANT_DELIVERY</span>
                    </div>
                </Node>

                {/* Connections (Calculated loosely based on % to px approx for SVG) 
                    Note: SVG needs absolute units or viewBox. 
                    Let's use a full screen SVG with percentage coordinates via layout.
                    Actually, React refs would be best for exact connections, but for this effect,
                    hardcoded approximate percentages converted to viewport units works if responsive.
                    Or just lines that fade out.
                    Let's try drawing long connecting lines that span the distance.
                */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
                    {/* Studio -> Core */}
                    <motion.path
                      d="M 200 250 L 400 250 L 400 500 L 550 500" // Approx path based on laptop screen
                      fill="none"
                      stroke="#E3E3FD"
                      strokeWidth="1"
                      strokeOpacity="0.15"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                     {/* Core -> Output */}
                    <motion.path
                      d="M 850 500 L 950 500 L 950 750 L 1050 750" // Approx path
                      fill="none"
                      stroke="#E3E3FD"
                      strokeWidth="1"
                      strokeOpacity="0.15"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                </svg>

            </div>
        </div>

    </section>
  );
}
