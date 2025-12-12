import { motion } from 'framer-motion';
import { Clock, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

export default function WaitlistBenefits() {
  return (
    <section id="value" className="w-full py-32 px-6 relative overflow-hidden border-t border-white/5 bg-[#020202]">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8"
        >
            <div>
                <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase block mb-4">Value Proposition</span>
                <h2 className="font-montreal font-medium text-white text-4xl md:text-6xl tracking-tight leading-[0.9]">
                    Entropy.<br/>Solved.
                </h2>
            </div>
            <p className="font-montreal text-white/50 text-lg md:text-xl max-w-md leading-relaxed text-right md:text-right">
                Studios waste 15–25 hours every month on "quick edits." Branded Objects automates the mundane.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1 */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#050505] border border-white/10 p-12 relative group hover:border-white/20 transition-all duration-500"
            >
                <Corner className="top-0 right-0 border-t border-r" />
                <Corner className="bottom-0 left-0 border-b border-l" />
                
                <div className="flex justify-between items-start mb-16">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#E3E3FD] transition-colors">
                        <Clock size={20} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                    </div>
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest group-hover:text-[#E3E3FD] transition-colors">01 / Focus</span>
                </div>
                
                <h3 className="font-montreal font-medium text-white text-3xl mb-4">Reclaim Creative Time</h3>
                <p className="text-white/50 font-montreal text-lg leading-relaxed max-w-sm">
                    Stop resizing banners. Let the client generate simple assets while you focus on the big picture strategy.
                </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#050505] border border-white/10 p-12 relative group hover:border-white/20 transition-all duration-500"
            >
                <Corner className="top-0 right-0 border-t border-r" />
                <Corner className="bottom-0 left-0 border-b border-l" />

                <div className="flex justify-between items-start mb-16">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#E3E3FD] transition-colors">
                        <TrendingUp size={20} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                    </div>
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest group-hover:text-[#E3E3FD] transition-colors">02 / Scale</span>
                </div>
                
                <h3 className="font-montreal font-medium text-white text-3xl mb-4">Recurring Revenue</h3>
                <p className="text-white/50 font-montreal text-lg leading-relaxed max-w-sm">
                    Sell the tool as part of a retainer. Provide ongoing value to your clients without ongoing manual labor.
                </p>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
