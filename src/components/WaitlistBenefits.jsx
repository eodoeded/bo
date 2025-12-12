import { motion } from 'framer-motion';

export default function WaitlistBenefits() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="font-inter-light text-white text-[32px] md:text-[40px] mb-8">
                Reclaim your creative time.
            </h2>
            <p className="font-inter-light text-[#E3E3FD]/70 text-[18px] md:text-[20px] leading-relaxed mb-12 max-w-2xl mx-auto">
                Studios waste 15–25 hours every month making small, repetitive assets for clients. 
                <br className="hidden md:block" />
                <span className="text-white">BrandForge handles the small stuff.</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                <div className="bg-[#1C1C1C] border border-white/10 p-6 rounded-sm backdrop-blur-sm">
                    <h3 className="text-white font-inter text-lg mb-2">Focus on Real Creative</h3>
                    <p className="text-[#E3E3FD]/60 font-inter-light text-sm">Stop tweaking banners. Let the client generate simple assets while you focus on the big picture.</p>
                </div>
                <div className="bg-[#1C1C1C] border border-white/10 p-6 rounded-sm backdrop-blur-sm">
                    <h3 className="text-white font-inter text-lg mb-2">New Revenue Stream</h3>
                    <p className="text-[#E3E3FD]/60 font-inter-light text-sm">Sell the mini-tool as part of a monthly retainer. Recurring value for your clients.</p>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}

