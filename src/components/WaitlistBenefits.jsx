import { motion } from 'framer-motion';

export default function WaitlistBenefits() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            
            <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <span className="font-mono text-[10px] text-white/40 tracking-widest block mb-6">VALUE PROPOSITION</span>
                <h2 className="font-inter text-white text-[32px] md:text-[48px] leading-[1.1] tracking-tight mb-8">
                    Reclaim your <br/><span className="text-[#E3E3FD]/40">creative time.</span>
                </h2>
                <p className="font-inter-light text-[#E3E3FD]/70 text-[16px] md:text-[18px] leading-relaxed max-w-sm">
                    Studios waste 15–25 hours every month making small, repetitive assets. BrandForge handles the entropy.
                </p>
            </motion.div>

            <motion.div 
                className="flex-1 w-full grid gap-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="bg-[#0A0A0A] border border-white/10 p-8 hover:border-white/20 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-white font-mono text-sm tracking-widest uppercase">Focus</h3>
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white transition-colors"></div>
                    </div>
                    <p className="text-[#E3E3FD]/60 font-inter-light text-[15px] leading-relaxed">
                        Stop tweaking banners. Let the client generate simple assets while you focus on the big picture.
                    </p>
                </div>

                <div className="bg-[#0A0A0A] border border-white/10 p-8 hover:border-white/20 transition-colors group">
                     <div className="flex justify-between items-start mb-4">
                        <h3 className="text-white font-mono text-sm tracking-widest uppercase">Scale</h3>
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white transition-colors"></div>
                    </div>
                    <p className="text-[#E3E3FD]/60 font-inter-light text-[15px] leading-relaxed">
                        Sell the mini-tool as part of a monthly retainer. Recurring value for your clients, recurring revenue for you.
                    </p>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
