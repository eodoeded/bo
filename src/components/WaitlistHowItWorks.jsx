import { motion } from 'framer-motion';
import { Settings, Image, Share } from 'lucide-react';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const steps = [
  {
    number: "01",
    title: "Configure",
    icon: Settings,
    description: "The studio builds the tool",
    detail: "Set canvas, colors, fonts. Lock brand rules."
  },
  {
    number: "02",
    title: "Generate",
    icon: Image,
    description: "The AI image box",
    detail: "Studio controls the prompt. Client fills the blank."
  },
  {
    number: "03",
    title: "Deploy",
    icon: Share,
    description: "Client exports assets",
    detail: "Safe, on-brand generation. No broken layouts."
  }
];

export default function WaitlistHowItWorks() {
  return (
    <section className="w-full py-32 px-6 border-t border-white/5 bg-[#020202] relative">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 flex items-end justify-between border-b border-white/10 pb-6"
        >
            <h2 className="font-montreal font-medium text-white text-3xl tracking-tight">System Workflow</h2>
            <span className="font-mono text-[9px] text-white/40 hidden md:block tracking-widest border border-white/10 px-2 py-1">PROCESS_V1.0</span>
        </motion.div>

        {/* Process Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-12 left-0 w-full h-px bg-white/10 hidden md:block z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative z-10"
            >
               {/* Node Card */}
              <div className="bg-[#050505] border border-white/10 p-8 h-full group hover:border-white/20 transition-colors duration-500 relative">
                  <Corner className="top-0 right-0 border-t border-r" />
                  <Corner className="bottom-0 left-0 border-b border-l" />

                  {/* Icon Node Top */}
                  <div className="w-24 h-24 bg-[#020202] border border-white/10 flex items-center justify-center mb-8 mx-auto relative z-20 group-hover:border-[#E3E3FD]/50 transition-colors">
                      <step.icon size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                      <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30 hidden md:block"></div>
                      <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-1.5 h-2 bg-[#050505] border border-white/30 hidden md:block"></div>
                  </div>

                  <div className="text-center">
                      <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest block mb-4 uppercase">
                        Step {step.number}
                      </span>
                      <h3 className="font-montreal font-medium text-white text-2xl mb-4">
                        {step.title}
                      </h3>
                      <p className="font-montreal text-white/60 text-lg mb-4 leading-snug">
                        {step.description}
                      </p>
                      <p className="font-mono text-[10px] text-white/40 uppercase tracking-wide leading-relaxed">
                        {step.detail}
                      </p>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
