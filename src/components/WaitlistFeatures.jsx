import { motion } from 'framer-motion';
import { Database, Cpu, Layout, Lock, Share2, Layers, Image, Type } from 'lucide-react';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const specs = [
    { label: "AI GENERATION", value: "Image & Text", icon: Cpu },
    { label: "LOCKING SYSTEM", value: "Strict Control", icon: Lock },
    { label: "FILE SUPPORT", value: "PNG, JPG, SVG", icon: Image },
    { label: "TYPOGRAPHY", value: "Custom Fonts", icon: Type },
    { label: "LAYERS", value: "Smart Composition", icon: Layers },
    { label: "EXPORT", value: "Instant / Batch", icon: Share2 },
];

export default function WaitlistFeatures() {
  return (
    <section id="specs" className="w-full py-20 md:py-32 px-6 border-t border-white/5 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-20 border-b border-white/10 pb-8">
             <div>
                <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase block mb-4">Specifications</span>
                <h2 className="font-montreal font-medium text-white text-4xl md:text-5xl tracking-tight leading-[0.9]">
                    Platform<br/>Specifications.
                </h2>
            </div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-8 md:mt-0">
                System_v1.0
            </div>
        </div>

        {/* Technical Data Sheet Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
            
            {/* Left: Features List */}
            <div className="bg-[#050505] p-6 md:p-12 relative">
                <Corner className="top-0 left-0 border-t border-l" />
                <h3 className="font-mono text-sm text-white/40 uppercase tracking-widest mb-8">Features</h3>
                
                <div className="space-y-6">
                    {specs.map((spec, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-between py-3 border-b border-white/5 group hover:bg-white/[0.02] transition-colors px-2 -mx-2"
                        >
                            <div className="flex items-center gap-4">
                                <spec.icon size={14} className="text-[#E3E3FD]/50 group-hover:text-[#E3E3FD] transition-colors" />
                                <span className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">{spec.label}</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#E3E3FD]">{spec.value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right: Technical Description */}
            <div className="bg-[#050505] p-6 md:p-12 relative flex flex-col justify-between">
                <Corner className="bottom-0 right-0 border-b border-r" />
                
                <div>
                    <h3 className="font-mono text-sm text-white/40 uppercase tracking-widest mb-8">System Logic</h3>
                    <p className="font-montreal text-lg text-white/60 leading-relaxed mb-8">
                        The platform operates on a strict logic system. Studios upload the design rules and assets, whilst clients interact only with the safe parameters you define.
                    </p>
                    <div className="p-6 border border-[#E3E3FD]/20 bg-[#E3E3FD]/5 mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <Lock size={12} className="text-[#E3E3FD]" />
                            <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">AI Safety Lock</span>
                        </div>
                        <p className="font-montreal text-sm text-white/80 leading-relaxed">
                            Crucially, you can lock the AI prompt structure. The client fills in the subject, but the style, lighting, and composition remain completely under your control.
                        </p>
                    </div>
                    <p className="font-montreal text-lg text-white/60 leading-relaxed">
                        Designed for high-volume output where brand consistency cannot be compromised by human error.
                    </p>
                </div>

                <div className="mt-8 md:mt-12 pt-8 border-t border-white/5 flex gap-6 md:gap-12">
                     <div>
                        <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Uptime</span>
                        <span className="font-mono text-xl text-[#E3E3FD]">99.9%</span>
                     </div>
                     <div>
                        <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Render</span>
                        <span className="font-mono text-xl text-[#E3E3FD]">&lt;200ms</span>
                     </div>
                     <div>
                        <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Security</span>
                        <span className="font-mono text-xl text-[#E3E3FD]">SOC-2</span>
                     </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
}
