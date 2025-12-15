import { motion } from 'framer-motion';
import { Type, Move, Image as ImageIcon, Lock, Edit3 } from 'lucide-react';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const steps = [
  {
    number: "01",
    title: "DEFINE THE LOGIC",
    description: "Designers set the rules.",
    detail: "You build the master system. Lock fonts, positioning, and style. Define exactly what can change and what must stay fixed."
  },
  {
    number: "02",
    title: "EXPOSE SAFE CONTROLS",
    description: "Clients get a simple UI.",
    detail: "They can't break the layout. They only see safe inputs: 'Change Headline', 'Swap Product Image', 'Generate Background'."
  },
  {
    number: "03",
    title: "AUTOMATE & SCALE",
    description: "Perfect assets, instantly.",
    detail: "The system generates on-brand outputs automatically. No approval chains. No manual resizing. Just correct files."
  }
];

export default function WaitlistHowItWorks() {
  return (
    <section id="process" className="w-full py-20 md:py-32 px-6 border-t border-white/5 bg-[#261E19] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left: Steps */}
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 md:mb-16 border-l border-white/20 pl-6"
            >
                <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase block mb-4">THE_MECHANISM</span>
                <h2 className="font-montreal font-medium text-white text-4xl md:text-5xl tracking-tight leading-tight">
                    Turn brand guidelines<br/>into <span className="text-[#E3E3FD]">software rules.</span>
                </h2>
            </motion.div>

            <div className="space-y-12">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="group relative pl-6 md:pl-12 border-l border-white/10 hover:border-[#E3E3FD] transition-colors duration-500"
                    >
                        <span className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#261E19] border border-white/20 group-hover:border-[#E3E3FD] transition-colors rounded-full"></span>
                        
                        <span className="font-mono text-[9px] text-white/30 tracking-widest block mb-2 uppercase">/ {step.number}</span>
                        <h3 className="font-mono text-white text-lg tracking-widest mb-2 uppercase">{step.title}</h3>
                        <p className="font-montreal text-white/60 text-lg mb-2">{step.description}</p>
                        <p className="font-mono text-[10px] text-[#E3E3FD]/50 uppercase tracking-wide max-w-sm">{step.detail}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Right: Governance UI Representation */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#E3E3FD]/10 to-transparent blur-2xl opacity-50 rounded-3xl"></div>
            <div className="bg-[#1A1614] border border-white/10 p-8 relative rounded-3xl overflow-hidden shadow-2xl">
                
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">ACTIVE_CONFIGURATION</span>
                    </div>
                    <div className="px-2 py-1 bg-white/5 rounded-full border border-white/5">
                        <span className="font-mono text-[9px] text-white/40">ID: 882-AF</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Locked Param */}
                    <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <ImageIcon size={16} className="text-white/40"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-white/60">BACKGROUND_IMG</span>
                                <span className="font-mono text-[8px] text-white/20">Asset_Pool_A (Fixed)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#261E19] border border-white/5 rounded-full">
                            <Lock size={10} className="text-[#E3E3FD]"/>
                            <span className="font-mono text-[8px] text-white/40 uppercase">LOCKED</span>
                        </div>
                    </div>

                    {/* Locked Param */}
                    <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Move size={16} className="text-white/40"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-white/60">LOGO_POSITION</span>
                                <span className="font-mono text-[8px] text-white/20">Top_Right (Fixed)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#261E19] border border-white/5 rounded-full">
                            <Lock size={10} className="text-[#E3E3FD]"/>
                            <span className="font-mono text-[8px] text-white/40 uppercase">LOCKED</span>
                        </div>
                    </div>

                    {/* Unlocked Param */}
                    <div className="flex items-center justify-between p-4 bg-[#E3E3FD]/[0.02] border border-[#E3E3FD]/20 group hover:bg-[#E3E3FD]/5 transition-colors rounded-2xl relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E3E3FD]"></div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-[#E3E3FD]/10 rounded-lg">
                                <Type size={16} className="text-[#E3E3FD]"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-white">HEADLINE_TEXT</span>
                                <span className="font-mono text-[8px] text-[#E3E3FD]/60">Client Input Allowed</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E3E3FD]/10 border border-[#E3E3FD]/20 rounded-full">
                            <Edit3 size={10} className="text-[#E3E3FD]"/>
                            <span className="font-mono text-[8px] text-[#E3E3FD] uppercase">SAFE_EDIT</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">LOGIC_VALIDATION_ACTIVE</span>
                    <div className="flex gap-1.5">
                        {[1,2,3,4].map(i => (
                            <motion.div 
                                key={i}
                                className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"
                                style={{opacity: 0.2 + (i*0.2)}}
                                animate={{ 
                                    opacity: [0.2 + (i*0.2), 1, 0.2 + (i*0.2)],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    delay: i * 0.15,
                                    ease: "easeInOut"
                                }}
                            ></motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}
