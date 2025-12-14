import { motion } from 'framer-motion';
import { CreditCard, Shield, Zap, RefreshCw, Layers, Users } from 'lucide-react';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

export default function WaitlistBenefits() {
  return (
    <section id="value" className="w-full py-20 md:py-32 px-6 relative overflow-hidden border-t border-white/5 bg-[#261E19]">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 md:mb-24 border-b border-white/10 pb-12">
            <div className="lg:col-span-8">
                <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase block mb-6">For Studios & Agencies</span>
                <h2 className="font-montreal font-medium text-white text-4xl md:text-6xl tracking-tight leading-[0.95] mb-6">
                    Stop selling hours.<br/>
                    <span className="text-[#E3E3FD]">Start selling systems.</span>
                </h2>
            </div>
            <div className="lg:col-span-4 flex items-end justify-start lg:justify-end">
                <p className="font-montreal text-white/50 text-lg leading-relaxed max-w-sm">
                    Move from manual service work to automated product revenue. Build the logic once, let the client scale it infinitely.
                </p>
            </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1A1614] border border-white/10 p-10 relative group hover:bg-[#2E2824] transition-colors rounded-3xl"
            >
                <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                    <RefreshCw size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                </div>
                
                <h3 className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4">01 // Revenue Model</h3>
                <h4 className="font-montreal font-medium text-2xl text-white mb-4">Productised Service</h4>
                <p className="text-white/50 font-montreal text-sm leading-relaxed">
                    Don't just bill for the setup. Sell the tool as a subscription. Create recurring revenue streams from a single design system implementation.
                </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#1A1614] border border-white/10 p-10 relative group hover:bg-[#2E2824] transition-colors rounded-3xl"
            >
                <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                    <Shield size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                </div>

                <h3 className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4">02 // Governance</h3>
                <h4 className="font-montreal font-medium text-2xl text-white mb-4">Code-Enforced Brand</h4>
                <p className="text-white/50 font-montreal text-sm leading-relaxed">
                    PDF guidelines are suggestions. Branded Objects are laws. It is technically impossible for clients to break the design system you build.
                </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#1A1614] border border-white/10 p-10 relative group hover:bg-[#2E2824] transition-colors rounded-3xl"
            >
                <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                    <Zap size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                </div>

                <h3 className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4">03 // Scale</h3>
                <h4 className="font-montreal font-medium text-2xl text-white mb-4">Infinite Output</h4>
                <p className="text-white/50 font-montreal text-sm leading-relaxed">
                    Whether the client needs 5 assets or 5000, your effort remains zero. The system handles the volume without you needing to open a file.
                </p>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
