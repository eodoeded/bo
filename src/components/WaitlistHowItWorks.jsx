import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "The studio builds the tool",
    description: "Pick canvas size, colors, fonts. Lock everything you don't want the client to change.",
    detail: "Example: Client changes text/image, but logo and colors are locked."
  },
  {
    number: "02",
    title: "The AI image box",
    description: "Studio writes a locked prompt like \"A mystical tarot illustration of {subject} in brand style\".",
    detail: "Client only types the {subject}. Safe, on-brand generation."
  },
  {
    number: "03",
    title: "Client uses their mini-tool",
    description: "Client visits their branded link. They change text, pick allowed colors, generate AI art, and export.",
    detail: "They can't break layout, typography, or style."
  }
];

export default function WaitlistHowItWorks() {
  return (
    <section className="w-full py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
        >
            <h2 className="font-inter-light text-white text-[32px] md:text-[40px] mb-4">How it Works</h2>
            <div className="h-px w-24 bg-[#C8372D]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <span className="block font-inter-light text-[#C8372D] text-[14px] tracking-wider mb-6">
                STEP {step.number}
              </span>
              <h3 className="font-inter text-white text-[20px] md:text-[24px] mb-4 group-hover:text-[#E3E3FD] transition-colors">
                {step.title}
              </h3>
              <p className="font-inter-light text-[#E3E3FD]/70 text-[16px] leading-relaxed mb-4">
                {step.description}
              </p>
              <p className="font-inter-light text-[#E3E3FD]/40 text-[14px] leading-relaxed italic border-l border-[#FFFFFF20] pl-4">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

