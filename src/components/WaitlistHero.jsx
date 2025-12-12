import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Cpu, Layout, ArrowRight, Lock, Sparkles } from 'lucide-react';

// Shared Components (Internal to keep self-contained for now)
const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const Badge = ({ children, className = "", color = "text-[#E3E3FD]" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest border border-white/10 px-1.5 py-0.5 rounded-[1px] bg-white/[0.02] ${color} ${className}`}>
        {children}
    </span>
);

const Node = ({ title, icon: Icon, children, x, y, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="absolute z-10 bg-[#050505] border border-white/10 p-4 w-48 shadow-2xl backdrop-blur-md"
    style={{ left: x, top: y }}
  >
    {/* Tech Corners */}
    <Corner className="top-0 left-0 border-t border-l" />
    <Corner className="bottom-0 right-0 border-b border-r" />

    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{title}</span>
      <div className="w-1 h-1 bg-[#E3E3FD] animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
    </div>
    <div className="flex flex-col gap-2">
        {children}
    </div>
    
    {/* Ports */}
    <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30" />
    <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30" />
  </motion.div>
);

const Connection = ({ start, end, delay }) => {
    // Simple rectilinear path
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
    <section className="relative w-full min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-hidden bg-[#020202]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ 
          backgroundImage: 'linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
      }}></div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
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
          className="font-montreal text-white/60 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Empower clients to generate on-brand assets without breaking the design system. 
          Studios build the logic. Clients fill the blanks.
        </motion.p>
        
        {/* Email Form */}
        <motion.form 
          className="flex flex-col sm:flex-row w-full max-w-[480px] relative group"
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

      {/* Visual System Graph */}
      <div className="relative w-full max-w-5xl h-[300px] hidden md:block opacity-80">
         <div className="absolute inset-0 flex justify-center scale-90">
             {/* Studio Input */}
             <Node title="Design_Studio" x="10%" y="40%" delay={0.4}>
                <div className="flex items-center gap-3 text-white/60">
                    <Database size={14} />
                    <span className="font-mono text-[9px]">ASSET_LIBRARY</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                    <Lock size={14} className="text-[#E3E3FD]"/>
                    <span className="font-mono text-[9px] text-[#E3E3FD]">LOCK_RULES</span>
                </div>
             </Node>

             {/* System Core */}
             <Node title="BrandForge_Core" x="42%" y="40%" delay={0.6}>
                 <div className="flex items-center gap-3 text-white/60">
                    <Cpu size={14} />
                    <span className="font-mono text-[9px]">GENERATION</span>
                </div>
                 <div className="w-full bg-white/10 h-1 mt-1 overflow-hidden">
                    <motion.div className="h-full bg-[#E3E3FD]" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} />
                 </div>
             </Node>

             {/* Client Output */}
             <Node title="Client_Output" x="74%" y="40%" delay={0.8}>
                 <div className="flex items-center gap-3 text-white/60">
                    <Layout size={14} />
                    <span className="font-mono text-[9px]">SOCIAL_POST</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                    <Sparkles size={14} className="text-[#E3E3FD]"/>
                    <span className="font-mono text-[9px]">ON_BRAND</span>
                </div>
             </Node>

             {/* Connections */}
             {/* 
                Studio (10% + 192px width approx). 
                Center calc approx for 1000px width container:
                10% = 100px. Width 192. Right Port ~292px.
                42% = 420px. Left Port ~420px.
             */}
             <Connection start={{x: 292, y: 150}} end={{x: 420, y: 150}} delay={0.5} />
             <Connection start={{x: 612, y: 150}} end={{x: 740, y: 150}} delay={0.7} />

         </div>
      </div>

    </section>
  );
}
