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
    <section className="w-full py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex items-end justify-between border-b border-white/10 pb-6"
        >
            <h2 className="font-inter-light text-white text-[24px] md:text-[32px] tracking-tight">SYSTEM WORKFLOW</h2>
            <span className="font-mono text-[10px] text-white/40 hidden md:block tracking-widest">PROCESS_V1.0</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 bg-white/[0.01]">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`
                group relative p-8 md:p-10 border-b md:border-b-0 border-white/10
                ${index !== steps.length - 1 ? 'md:border-r' : ''}
                hover:bg-white/[0.02] transition-colors duration-500
              `}
            >
              {/* Corner Marker */}
              <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <span className="block font-mono text-white/20 text-[10px] tracking-widest mb-12">
                / {step.number}
              </span>
              
              <h3 className="font-mono text-white text-[14px] tracking-widest mb-4">
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
