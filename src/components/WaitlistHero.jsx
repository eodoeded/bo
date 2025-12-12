import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Cpu, Layout, ArrowRight, Lock, Sparkles } from 'lucide-react';
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
    className={`absolute z-10 bg-[#050505] border border-white/10 p-4 ${width} shadow-2xl backdrop-blur-md`}
    style={{ left: x, top: y }}
  >
    <Corner className="top-0 left-0 border-t border-l" />
    <Corner className="bottom-0 right-0 border-b border-r" />

    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{title}</span>
      <div className="w-1 h-1 bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
    </div>
    <div className="flex flex-col gap-2 relative z-10">
        {children}
    </div>
    
    {/* Ports */}
    <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30" />
    <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30" />
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
          strokeOpacity="0.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay, ease: "easeInOut" }}
        />
        <motion.circle 
            cx="0" cy="0" r="2" fill="#E3E3FD"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            style={{ offsetPath: `path("${path}")` }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 0.5 }}
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
    setTimeout(() => {
        window.location.href = `mailto:brandedobjects@gmail.com?subject=${subject}&body=${body}`;
        setTimeout(() => setStatus('idle'), 2000);
    }, 500);
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col pt-24 pb-0 px-6 overflow-hidden bg-[#020202]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ 
          backgroundImage: 'linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
      }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
        
        {/* Left Column: Text & Form */}
        <div className="flex flex-col items-start text-left z-20 mb-12 lg:mb-0">
            <Badge className="mb-6">System v1.0 — Early Access</Badge>
            <motion.h1
            className="font-montreal font-medium text-white text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >
            Automated <span className="text-[#E3E3FD]">Brand</span><br/>Governance.
            </motion.h1>

            <motion.p
            className="font-montreal text-white/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            >
            Empower clients to generate on-brand assets without breaking the design system. 
            Studios build the logic. Clients fill the blanks.
            </motion.p>
            
            <motion.form 
            className="flex flex-col sm:flex-row w-full max-w-[440px] relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            onSubmit={handleJoin}
            >
            <div className="absolute -inset-[1px] bg-[#E3E3FD]/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
            <div className="relative flex flex-col sm:flex-row w-full bg-[#050505] border border-white/10 p-1">
                <Corner className="top-0 left-0 border-t border-l" />
                <Corner className="bottom-0 right-0 border-b border-r" />
                
                <input 
                    type="email" 
                    placeholder="studio@agency.com" 
                    className="flex-1 bg-transparent text-white px-6 py-4 font-mono text-xs focus:outline-none placeholder:text-white/20 tracking-wider"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button 
                    type="submit"
                    className="bg-white text-black px-8 py-4 font-mono text-[10px] tracking-[0.2em] hover:bg-[#E3E3FD] transition-colors whitespace-nowrap uppercase border border-transparent"
                >
                    Request Access
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
                    Redirecting to secure client...
                </motion.p>
            )}
        </div>

        {/* Right Column: Node Graph with Spot Mini */}
        <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center">
            <div className="relative w-[500px] h-[400px] scale-75 lg:scale-100">
                {/* 
                    Coordinates relative to 500x400 container.
                    Studio (Left): x=0, y=150. Width=160 (w-40). Right Port: x=160-5=155. y=150+32=182
                    Core (Center): x=200, y=100. Width=200. Left Port: x=200-5=195. y=100+100(mid)=200. Right Port: x=400-5=395.
                    Output (Right): x=440, y=150. Width=160. Left Port: x=440-5=435.
                */}

                {/* Studio Input */}
                <Node title="Design_Studio" x={0} y={150} delay={0.4} width="w-40">
                    <div className="flex items-center gap-3 text-white/60">
                        <Database size={14} />
                        <span className="font-mono text-[9px]">ASSETS</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                        <Lock size={14} className="text-[#E3E3FD]"/>
                        <span className="font-mono text-[9px] text-[#E3E3FD]">RULES</span>
                    </div>
                </Node>

                {/* System Core with Spot Mini */}
                <Node title="BrandForge_Core" x={200} y={50} delay={0.6} width="w-48">
                    <div className="h-40 w-full relative flex items-center justify-center overflow-hidden bg-white/[0.02] border border-white/5 mb-2">
                         {/* Spot Mini Animation */}
                        <motion.div
                            className="relative z-0"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src={bottomComp} alt="Bottom" className="w-[100px] object-contain opacity-90 mix-blend-screen" />
                        </motion.div>
                        <motion.div
                            className="absolute top-8"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                            style={{ zIndex: 2 }}
                        >
                            <img src={upComp} alt="Top" className="w-[50px] object-contain opacity-90 mix-blend-screen" />
                        </motion.div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="font-mono text-[8px] text-white/40">GENERATING</span>
                        <div className="flex gap-0.5">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-0.5 h-1.5 bg-[#E3E3FD] animate-pulse" style={{animationDelay: `${i*0.1}s`}}></div>
                            ))}
                        </div>
                    </div>
                </Node>

                {/* Client Output */}
                <Node title="Client_Output" x={440} y={150} delay={0.8} width="w-40">
                    <div className="flex items-center gap-3 text-white/60">
                        <Layout size={14} />
                        <span className="font-mono text-[9px]">RESULT</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                        <Sparkles size={14} className="text-[#E3E3FD]"/>
                        <span className="font-mono text-[9px]">SAFE</span>
                    </div>
                </Node>

                {/* Connections */}
                {/* 
                    Studio (0, 150) -> Out: 155, 184 (150+34 approx for port center)
                    Core (200, 50) -> In: 195, 150 (50+100 for center vert)
                    Core (200, 50) -> Out: 395, 150
                    Output (440, 150) -> In: 435, 184
                */}
                <Connection start={{x: 155, y: 184}} end={{x: 195, y: 150}} delay={0.5} />
                <Connection start={{x: 395, y: 150}} end={{x: 435, y: 184}} delay={0.7} />

            </div>
        </div>

      </div>

    </section>
  );
}
