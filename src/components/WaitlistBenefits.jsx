import { motion } from 'framer-motion';
import { Clock, TrendingUp } from 'lucide-react';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const Badge = ({ children, className = "", color = "text-[#E3E3FD]" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest border border-white/10 px-1.5 py-0.5 rounded-[1px] bg-white/[0.02] ${color} ${className}`}>
        {children}
    </span>
);

export default function WaitlistBenefits() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden border-t border-white/5 bg-[#020202]">
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            
            <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="mb-6 flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#E3E3FD]"></div>
                     <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">Value Proposition</span>
                </div>
                
                <h2 className="font-montreal font-medium text-white text-[32px] md:text-[48px] leading-[1.1] tracking-tight mb-8">
                    Reclaim your <br/><span className="text-[#E3E3FD]/40">creative time.</span>
                </h2>
                <p className="font-montreal text-white/60 text-[16px] md:text-[18px] leading-relaxed max-w-sm">
                    Studios waste 15–25 hours every month making small, repetitive assets. BrandForge handles the entropy.
                </p>
            </motion.div>

            <motion.div 
                className="flex-1 w-full grid gap-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="bg-[#050505] p-8 border border-white/10 relative group hover:border-[#E3E3FD]/30 transition-colors">
                    <Corner className="top-0 right-0 border-t border-r" />
                    <Corner className="bottom-0 left-0 border-b border-l" />
                    
                    <div className="flex justify-between items-start mb-6">
                        <Badge>Efficiency</Badge>
                        <Clock size={16} className="text-[#E3E3FD]" />
                    </div>
                    
                    <h3 className="text-white font-montreal font-medium text-xl mb-3">Focus</h3>
                    <p className="text-white/50 font-montreal text-sm leading-relaxed">
                        Stop tweaking banners. Let the client generate simple assets while you focus on the big picture.
                    </p>
                </div>

                <div className="bg-[#050505] p-8 border border-white/10 relative group hover:border-[#E3E3FD]/30 transition-colors">
                    <Corner className="top-0 right-0 border-t border-r" />
                    <Corner className="bottom-0 left-0 border-b border-l" />

                    <div className="flex justify-between items-start mb-6">
                        <Badge>Revenue</Badge>
                        <TrendingUp size={16} className="text-[#E3E3FD]" />
                    </div>

                    <h3 className="text-white font-montreal font-medium text-xl mb-3">Scale</h3>
                    <p className="text-white/50 font-montreal text-sm leading-relaxed">
                        Sell the mini-tool as part of a monthly retainer. Recurring value for your clients, recurring revenue for you.
                    </p>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
