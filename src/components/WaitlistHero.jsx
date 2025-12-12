import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Layout, ArrowRight, Lock, Scan, Zap } from 'lucide-react';
import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";

// Shared Components
const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const Node = ({ title, children, x, y, delay = 0, width = "w-48" }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute z-10 bg-[#050505] border border-white/10 p-4 ${width} shadow-2xl backdrop-blur-md group hover:border-white/30 transition-colors hidden md:block`}
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

export default function WaitlistHero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    
    try {
        const response = await fetch("https://formspree.io/f/xblnqyya", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    } catch (error) {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col pt-32 pb-20 px-6 overflow-hidden bg-[#020202]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ 
          backgroundImage: 'linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
      }}></div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-32 left-6 md:left-12 font-mono text-[9px] text-white/10 uppercase tracking-widest hidden md:block">
          SYS_READY <br/> 37.7749° N, 122.4194° W
      </div>
      <div className="absolute bottom-12 right-6 md:right-12 font-mono text-[9px] text-white/10 uppercase tracking-widest hidden md:block text-right">
          LATENCY: 12ms <br/> SECURE_CONNECTION
      </div>

      <div className="max-w-[1400px] mx-auto w-full h-full relative z-20 flex items-center">
        
        {/* Text Content - Clear of Nodes */}
        <div className="flex flex-col items-start text-left z-30 max-w-2xl relative">
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
                        name="email"
                        placeholder="studio@agency.com" 
                        className="flex-1 bg-transparent text-white pl-10 pr-6 py-4 font-mono text-xs focus:outline-none placeholder:text-white/20 tracking-wider w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        type="submit"
                        className="bg-white text-black px-8 py-4 font-mono font-semibold text-[11px] tracking-[0.2em] hover:bg-[#E3E3FD] transition-colors whitespace-nowrap uppercase border border-transparent flex items-center gap-2 justify-center group/btn mt-2 sm:mt-0 w-full sm:w-auto"
                        disabled={status === 'sending' || status === 'success'}
                    >
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Joined' : 'Request Access'}
                        {status === 'idle' && <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />}
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
                    Added to secure waitlist.
                </motion.p>
            )}
             {status === 'error' && (
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mt-4 font-mono text-[10px] text-red-400 tracking-widest uppercase flex items-center gap-2"
                >
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    Error. Please try again.
                </motion.p>
            )}
        </div>

      </div>

      {/* Node Graph - Shifted Right to avoid overlapping text */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
            
            {/* Studio Input - Shifted from 5% to 50% */}
            <Node title="Design_Studio" x="50%" y="25%" delay={0.4} width="w-48">
                <div className="flex items-center gap-3 text-white/60">
                    <Database size={14} />
                    <span className="font-mono text-[9px]">ASSETS_LOADED</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                    <Lock size={14} className="text-[#E3E3FD]"/>
                    <span className="font-mono text-[9px] text-[#E3E3FD]">RULES_LOCKED</span>
                </div>
            </Node>

            {/* System Core - Shifted from 55% to 70% */}
            <Node title="Branded_Objects" x="70%" y="45%" delay={0.6} width="w-64">
                <div className="h-48 w-full relative flex items-center justify-center overflow-hidden bg-[#0A0A0A] border border-white/10 mb-2 shadow-inner">
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

            {/* Client Output - Shifted from 80% to 85% */}
            <Node title="Client_Output" x="85%" y="75%" delay={0.8} width="w-48">
                <div className="flex items-center gap-3 text-white/60">
                    <Layout size={14} />
                    <span className="font-mono text-[9px]">RENDER_COMPLETE</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                    <Zap size={14} className="text-[#E3E3FD]"/>
                    <span className="font-mono text-[9px]">INSTANT_DELIVERY</span>
                </div>
            </Node>

            {/* Connecting Lines - Adjusted for new positions */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0 hidden md:block">
                {/* Studio to Core: (50%+width) -> Core */}
                {/* 50vw + ~100px to 70vw */}
                <motion.path
                  d="M 800 250 C 900 250, 900 450, 1100 450" 
                  fill="none"
                  stroke="#E3E3FD"
                  strokeWidth="1"
                  strokeOpacity="0.1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                 {/* Core to Output: (70%+width) -> Output */}
                <motion.path
                  d="M 1350 500 C 1450 500, 1450 800, 1600 800" 
                  fill="none"
                  stroke="#E3E3FD"
                  strokeWidth="1"
                  strokeOpacity="0.1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
            </svg>

      </div>

    </section>
  );
}
