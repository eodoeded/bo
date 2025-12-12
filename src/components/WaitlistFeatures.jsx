import { motion } from 'framer-motion';

const features = [
    "AI IMAGE GENERATOR (NANO BANANA)",
    "BACKGROUND REMOVAL",
    "TEXT LAYERS",
    "COLOUR LAYERS",
    "IMAGE/LOGO UPLOAD",
    "LOCKING SYSTEM",
    "EXPORT BUTTON"
];

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

export default function WaitlistFeatures() {
  return (
    <section className="w-full py-24 px-6 border-t border-white/5 bg-[#020202]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        <div className="flex-1 sticky top-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                 <div className="mb-6 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#E3E3FD]"></div>
                     <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">Specifications</span>
                </div>

                <h2 className="font-montreal font-medium text-white text-[32px] md:text-[40px] tracking-tight mb-6 leading-tight">
                    Everything you need to ship.
                </h2>
                <p className="font-montreal text-white/60 text-[16px] leading-relaxed max-w-sm">
                    The MVP includes the essentials to let your clients create without chaos. Precise control over brand assets.
                </p>
            </motion.div>
        </div>

        <div className="flex-1 w-full bg-[#050505] border border-white/10 p-1 relative">
            <Corner className="top-0 left-0 border-t border-l" />
            <Corner className="bottom-0 right-0 border-b border-r" />
            
            <div className="flex flex-col">
                {features.map((feature, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        className="flex items-center justify-between py-5 px-6 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors group cursor-crosshair"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[#E3E3FD]/40 text-[9px] w-6">0{index + 1}</span>
                            <span className="font-mono text-white/60 text-[10px] tracking-widest uppercase group-hover:text-[#E3E3FD] transition-colors">{feature}</span>
                        </div>
                        <div className="w-1 h-1 bg-white/20 group-hover:bg-[#E3E3FD] transition-colors"></div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
