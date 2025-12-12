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

export default function WaitlistFeatures() {
  return (
    <section className="w-full py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        <div className="flex-1 sticky top-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="font-mono text-[9px] text-white/40 tracking-widest block mb-6 border-l border-white/20 pl-3">SPECIFICATIONS</span>
                <h2 className="font-inter text-white text-[32px] md:text-[40px] tracking-tight mb-6 leading-tight">
                    Everything you need to ship.
                </h2>
                <p className="font-inter-light text-[#E3E3FD]/50 text-[16px] leading-relaxed max-w-sm">
                    The MVP includes the essentials to let your clients create without chaos. Precise control over brand assets.
                </p>
            </motion.div>
        </div>

        <div className="flex-1 w-full border border-white/10">
            <div className="flex flex-col">
                {features.map((feature, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        className="flex items-center justify-between py-4 px-6 border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition-colors group"
                    >
                        <span className="font-mono text-[#E3E3FD]/60 text-[11px] tracking-wider uppercase group-hover:text-white transition-colors">{feature}</span>
                        <div className="w-1 h-1 bg-white/20 group-hover:bg-white transition-colors"></div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
