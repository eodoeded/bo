import { motion } from 'framer-motion';
import { Database, Image, Layers, Palette, Lock, Upload, Download } from 'lucide-react';

const features = [
    { name: "AI IMAGE GENERATOR", icon: Image },
    { name: "BACKGROUND REMOVAL", icon: Layers },
    { name: "TEXT LAYERS", icon: Database },
    { name: "COLOUR LAYERS", icon: Palette },
    { name: "IMAGE/LOGO UPLOAD", icon: Upload },
    { name: "LOCKING SYSTEM", icon: Lock },
    { name: "EXPORT BUTTON", icon: Download }
];

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

export default function WaitlistFeatures() {
  return (
    <section id="specs" className="w-full py-32 px-6 border-t border-white/5 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Sticky Header */}
        <div className="lg:col-span-4 sticky top-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                 <div className="mb-8 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#E3E3FD]"></div>
                     <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">Specifications</span>
                </div>

                <h2 className="font-montreal font-medium text-white text-4xl md:text-5xl tracking-tight mb-8 leading-[0.9]">
                    System<br/>Kernel.
                </h2>
                <p className="font-montreal text-white/60 text-lg leading-relaxed max-w-sm mb-12">
                    The MVP includes the essential modules to let your clients create without chaos. Precise control over every brand asset.
                </p>
                
                <div className="hidden lg:block font-mono text-[9px] text-white/20 uppercase tracking-widest">
                    v1.0 Release Candidate
                </div>
            </motion.div>
        </div>

        {/* Right: Technical Grid */}
        <div className="lg:col-span-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                {features.map((feature, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-[#050505] p-8 flex items-center justify-between group hover:bg-[#0A0A0A] transition-colors relative"
                    >
                        {/* Hover Corner */}
                        <Corner className="top-0 left-0 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-6">
                            <span className="font-mono text-[#E3E3FD]/20 text-[9px]">0{index + 1}</span>
                            <span className="font-mono text-white/70 text-xs tracking-widest uppercase group-hover:text-white transition-colors">{feature.name}</span>
                        </div>
                        
                        <feature.icon size={16} className="text-white/20 group-hover:text-[#E3E3FD] transition-colors" />
                    </motion.div>
                ))}
                {/* Filler for even grid if odd number */}
                <div className="bg-[#050505] p-8 hidden md:block"></div>
            </div>
        </div>

      </div>
    </section>
  );
}
