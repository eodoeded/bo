import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "BUILD",
    description: "The studio builds the tool",
    detail: "Set canvas, colors, fonts. Lock brand rules."
  },
  {
    number: "02",
    title: "DEFINE",
    description: "The AI image box",
    detail: "Studio controls the prompt structure. Client fills the blank."
  },
  {
    number: "03",
    title: "DEPLOY",
    description: "Client uses their mini-tool",
    detail: "Safe, on-brand generation. No broken layouts."
  }
];

export default function WaitlistHowItWorks() {
  return (
    <section className="w-full py-24 px-6 border-t border-white/5 relative">
        {/* Fine grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[size:60px_60px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex items-end justify-between border-b border-white/10 pb-6"
        >
            <h2 className="font-inter-light text-white text-[24px] md:text-[32px] tracking-tight">SYSTEM WORKFLOW</h2>
            <span className="font-mono text-[9px] text-white/40 hidden md:block tracking-widest border border-white/10 px-2 py-1">PROCESS_V1.0</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`
                group relative p-8 md:p-10 border-b border-r border-white/10
                hover:bg-white/[0.02] transition-colors duration-500
              `}
            >
              {/* Corner Marker (Venice/Normal style) */}
              <div className="absolute top-0 right-0 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <span className="block font-mono text-white/20 text-[10px] tracking-widest mb-12">
                / {step.number}
              </span>
              
              <h3 className="font-mono text-white text-[12px] tracking-[0.2em] mb-4 uppercase">
                {step.title}
              </h3>
              
              <p className="font-inter text-white text-[18px] md:text-[20px] mb-4 leading-snug">
                {step.description}
              </p>
              
              <p className="font-inter-light text-[#E3E3FD]/50 text-[14px] leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
