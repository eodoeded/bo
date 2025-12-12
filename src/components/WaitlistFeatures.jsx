import { motion } from 'framer-motion';

const features = [
    "AI image generator",
    "Background removal",
    "Text layers",
    "Colour layers",
    "Image/logo upload",
    "Locking system",
    "Export button"
];

export default function WaitlistFeatures() {
  return (
    <section className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        <div className="flex-1">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-inter-light text-white text-[32px] md:text-[40px] mb-6"
            >
                Everything you need to ship.
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-inter-light text-[#E3E3FD]/60 text-[18px] mb-8"
            >
                The MVP includes the essentials to let your clients create without chaos.
            </motion.p>
        </div>

        <div className="flex-1 w-full">
            <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-4 py-3 border-b border-white/10"
                    >
                        <div className="w-1.5 h-1.5 bg-[#C8372D] rounded-full"></div>
                        <span className="font-inter-light text-[#E3E3FD] text-[16px]">{feature}</span>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}

