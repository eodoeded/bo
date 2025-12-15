import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Database, Layout, ArrowRight, Lock, Scan, Zap } from 'lucide-react';
import bottomComp from "../assets/bottom-comp.png";

// Shared Components
const Corner = ({ className = "" }) => (
    <div className={`absolute w-1 h-1 bg-white/20 ${className}`} />
);

// Node Content Wrapper for Floating Animation
const FloatingContent = ({ children, isDragging }) => {
    return (
        <motion.div
            animate={isDragging ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full"
        >
            {children}
        </motion.div>
    );
};

const Node = ({ id, title, children, x, y, onDragStart, isDragging, width = "w-48" }) => {
  return (
    <div 
      className={`absolute z-20 cursor-grab active:cursor-grabbing`}
      style={{ 
          left: `${x}%`, 
          top: `${y}%`,
          transform: 'translate(-50%, -50%)'
      }}
      onPointerDown={(e) => onDragStart(e, id)}
    >
        <FloatingContent isDragging={isDragging}>
            <div className={`bg-[#1A1614]/90 border border-white/10 p-3 md:p-4 ${width} shadow-2xl backdrop-blur-xl group hover:border-[#E3E3FD]/50 transition-colors duration-500 relative rounded-2xl`}>
                
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">{title}</span>
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full shadow-[0_0_8px_#E3E3FD]"></div>
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                    {children}
                </div>
                
                {/* Ports - Clean Circles */}
                <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
                <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
            </div>
        </FloatingContent>
    </div>
  );
};

export default function WaitlistHero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  
  // Dragging Logic
  const containerRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  
  // Initial Positions (Percentages) - consistent across breakpoints so mobile mirrors desktop layout
  const [nodes, setNodes] = useState({
      // keep one compact node above the text, others to the right
      output: { x: 36, y: 18 },   // small, above headline
      studio: { x: 70, y: 42 },   // right cluster
      core:   { x: 74, y: 62 }    // right cluster
  });

  const handleDragStart = (e, id) => {
      e.preventDefault();
      setDraggingId(id);
      
      const container = containerRef.current;
      if (!container) return;

      const { width, height, left, top } = container.getBoundingClientRect();
      
      const nodeX = (nodes[id].x / 100) * width;
      const nodeY = (nodes[id].y / 100) * height;
      const offsetX = (e.clientX - left) - nodeX;
      const offsetY = (e.clientY - top) - nodeY;

      const onPointerMove = (moveEvent) => {
          const newMouseX = moveEvent.clientX - left;
          const newMouseY = moveEvent.clientY - top;
          
          let newNodeX = newMouseX - offsetX;
          let newNodeY = newMouseY - offsetY;
          
          newNodeX = Math.max(0, Math.min(width, newNodeX));
          newNodeY = Math.max(0, Math.min(height, newNodeY));

          setNodes(prev => ({
              ...prev,
              [id]: {
                  x: (newNodeX / width) * 100,
                  y: (newNodeY / height) * 100
              }
          }));
      };

      const onPointerUp = () => {
          setDraggingId(null);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    
    try {
        const response = await fetch("https://formspree.io/f/xblnqyya", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    <section className="relative w-full h-screen overflow-hidden bg-[#261E19]">
      
      {/* Cleaner Generative Background */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
              backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
          }}></div>
          <motion.div 
            className="absolute inset-0 opacity-[0.02]"
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ 
              backgroundImage: 'linear-gradient(90deg, rgba(227, 227, 253, 0.1) 1px, transparent 1px), linear-gradient(rgba(227, 227, 253, 0.1) 1px, transparent 1px)', 
              backgroundSize: '80px 80px' 
          }}></motion.div>
      </div>

      {/* Decorative Floating Elements - Simplified */}
      <div className="absolute top-8 left-8 md:left-12 font-mono text-[9px] text-white/20 uppercase tracking-widest hidden md:block">
          System_OS v2.5
      </div>
      <div className="absolute top-8 right-8 md:right-12 font-mono text-[9px] text-white/20 uppercase tracking-widest hidden md:block text-right">
          <span className="w-2 h-2 bg-[#E3E3FD] rounded-full inline-block mr-2 animate-pulse"></span>
          Online
      </div>

      {/* Node Graph Layer - Absolute on both, with mobile adjustments */}
      <div className="absolute inset-0 w-full h-full z-10 touch-none overflow-hidden mix-blend-screen">
          <div ref={containerRef} className="absolute inset-0 w-full h-full">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{zIndex: 10}}>
                {/* 
                    Unique Style: "Organic Connection"
                */}

                {/* Path 1: Studio -> Core */}
                <motion.path
                    d={`M ${nodes.studio.x} ${nodes.studio.y} 
                        C ${(nodes.studio.x + nodes.core.x) / 2} ${nodes.studio.y} 
                          ${(nodes.studio.x + nodes.core.x) / 2} ${nodes.core.y} 
                          ${nodes.core.x} ${nodes.core.y}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.05"
                    strokeOpacity="0.2"
                    vectorEffect="non-scaling-stroke"
                    />
                    
                    {/* Pulse Animation */}
                    <motion.path
                    d={`M ${nodes.studio.x} ${nodes.studio.y} 
                        C ${(nodes.studio.x + nodes.core.x) / 2} ${nodes.studio.y} 
                          ${(nodes.studio.x + nodes.core.x) / 2} ${nodes.core.y} 
                          ${nodes.core.x} ${nodes.core.y}`}
                    fill="none"
                    stroke="#E3E3FD"
                    strokeWidth="0.15"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                    animate={{ 
                        pathLength: [0, 0.4, 0], // Grows then shrinks
                        pathOffset: [0, 1, 1],   // Moves from start to end
                        opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                        duration: 4, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    />

                {/* Path 2: Core -> Output */}
                <motion.path
                    d={`M ${nodes.core.x} ${nodes.core.y} 
                        C ${(nodes.core.x + nodes.output.x) / 2} ${nodes.core.y} 
                          ${(nodes.core.x + nodes.output.x) / 2} ${nodes.output.y} 
                          ${nodes.output.x} ${nodes.output.y}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.05"
                    strokeOpacity="0.2"
                    vectorEffect="non-scaling-stroke"
                    />
                    
                    {/* Pulse Animation */}
                    <motion.path
                    d={`M ${nodes.core.x} ${nodes.core.y} 
                        C ${(nodes.core.x + nodes.output.x) / 2} ${nodes.core.y} 
                          ${(nodes.core.x + nodes.output.x) / 2} ${nodes.output.y} 
                          ${nodes.output.x} ${nodes.output.y}`}
                    fill="none"
                    stroke="#E3E3FD"
                    strokeWidth="0.15"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                    animate={{ 
                        pathLength: [0, 0.4, 0], 
                        pathOffset: [0, 1, 1],
                        opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                        duration: 4, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        delay: 2 // Offset timing
                    }}
                    />
            </svg>

            {/* Nodes */}
            <Node 
                id="studio" 
                title="Design_Studio" 
                x={nodes.studio.x} 
                y={nodes.studio.y} 
                onDragStart={handleDragStart} 
                isDragging={draggingId === 'studio'}
                width="w-28 md:w-48"
            >
                    <div className="flex items-center gap-2 md:gap-3 text-white/60">
                        <Database size={12} className="md:w-[14px] md:h-[14px]" />
                        <span className="font-mono text-[7px] md:text-[9px]">ASSETS_LOADED</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white/60">
                        <Lock size={12} className="text-[#E3E3FD] md:w-[14px] md:h-[14px]"/>
                        <span className="font-mono text-[7px] md:text-[9px] text-[#E3E3FD]">RULES_LOCKED</span>
                    </div>
            </Node>

            <Node 
                id="core" 
                title="Branded_Objects" 
                x={nodes.core.x} 
                y={nodes.core.y} 
                onDragStart={handleDragStart} 
                isDragging={draggingId === 'core'}
                width="w-40 md:w-64"
            >
                    {/* Spot Mini - Base Only */}
                    <div className="h-28 md:h-48 w-full relative flex items-center justify-center overflow-hidden bg-[#1A1614] border border-white/10 mb-2 shadow-inner pointer-events-none rounded-lg">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
                        <motion.div
                            className="relative z-0"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src={bottomComp} alt="Bottom" className="w-[80px] md:w-[140px] object-contain opacity-100" />
                        </motion.div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="font-mono text-[6px] md:text-[8px] text-white/40">GENERATING_ASSET_ID_8492</span>
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="w-0.5 h-1.5 bg-[#E3E3FD] rounded-full" style={{opacity: 0.2 + (i*0.15)}}></div>
                            ))}
                        </div>
                    </div>
            </Node>

            <Node 
                id="output" 
                title="Client_Output" 
                x={nodes.output.x} 
                y={nodes.output.y} 
                onDragStart={handleDragStart} 
                isDragging={draggingId === 'output'}
                width="w-28 md:w-48"
            >
                    <div className="flex items-center gap-2 md:gap-3 text-white/60">
                        <Layout size={12} className="md:w-[14px] md:h-[14px]" />
                        <span className="font-mono text-[7px] md:text-[9px]">RENDER_COMPLETE</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-white/60">
                        <Zap size={12} className="text-[#E3E3FD] md:w-[14px] md:h-[14px]"/>
                        <span className="font-mono text-[7px] md:text-[9px]">INSTANT_DELIVERY</span>
                    </div>
            </Node>
          </div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 w-full md:w-auto md:bottom-24 md:left-16 z-30 px-6 pb-12 pt-24 md:pt-0 md:pb-0 pointer-events-none">
        <div className="flex flex-col items-start text-left pointer-events-auto max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest border border-[#E3E3FD]/20 bg-[#E3E3FD]/10 px-2 py-1 rounded-full">System_OS v2.5</span>
            </div>
            
            <motion.h1
                className="font-montreal font-medium text-5xl md:text-8xl leading-[0.9] tracking-tight mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Intelligent <br/> <span className="text-[#E3E3FD]">Design Systems.</span>
            </motion.h1>

            <motion.p
                className="font-montreal text-white/70 text-lg md:text-xl max-w-md mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
            >
                Automated brand governance for scaling studios. <br/>
                Turn brand guidelines into software, not PDFs.
            </motion.p>
            
            <motion.form
                className="w-full max-w-[520px] relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                onSubmit={handleJoin}
            >
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                    <div className="relative flex flex-1 items-center bg-[#1A1614] border border-white/12 px-4 py-3 rounded-md">
                        <Scan size={16} className="text-white/30 mr-3 shrink-0" />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="studio@agency.com" 
                            className="flex-1 bg-transparent text-white pr-2 font-mono text-xs focus:outline-none placeholder:text-white/20 tracking-wider"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="bg-white text-black px-8 py-3 font-mono font-semibold text-[11px] tracking-[0.1em] hover:bg-[#E3E3FD] transition-colors whitespace-nowrap uppercase border border-transparent flex items-center gap-2 justify-center group/btn w-full md:w-auto rounded-md"
                        disabled={status === 'sending' || status === 'success'}
                    >
                        {status === 'sending' ? 'Sending...' : status === 'success' ? 'Joined' : 'Request Access'}
                        {status === 'idle' && <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />}
                    </button>
                </div>
            </motion.form>
            <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] animate-pulse rounded-full"></div>
                    Limited Studio Pilots
                </span>
                <span className="text-white/20 text-[9px] font-mono">|</span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Q1 2025 Cohort</span>
            </div>

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

    </section>
  );
}
