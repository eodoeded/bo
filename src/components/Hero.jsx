import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-start relative pt-20 md:pt-24 overflow-hidden">
      {/* Subtle breathing overlay to enrich the base gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, rgba(18,17,13,0) 0%, rgba(28,26,20,0.18) 100%)' }}
        initial={{ opacity: 0.0, y: 0 }}
        animate={{ opacity: [0.0, 0.12, 0.0], y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Robot Visual - Centered in upper half */}
      <div className="relative z-10 flex justify-center items-center mb-8 w-full">
        <motion.div
          className="relative"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
        >
          <motion.img
            src={bottomComp}
            alt="Main robot"
            className="relative z-0 object-contain w-[320px] md:w-[560px]"
            style={{ aspectRatio: '1001 / 546' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </motion.div>
        <motion.div
          className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <motion.img
            src={upComp}
            alt="Floating component"
            className="object-contain w-[150px] md:w-[220px]"
            style={{ aspectRatio: '1001 / 546' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </motion.div>
      </div>

      {/* Main Content - Centered below robot */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h2
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: 18 },
            show: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.55, delay: 1.0, ease: [0.2, 0.8, 0.2, 1] }
            }
          }}
          className="font-inter-light text-white text-[36px] leading-[42px] md:text-[48px] md:leading-[56px] tracking-[0.2px] mb-6"
          style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
        >
          <motion.span className="block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>Make complex products simple</motion.span>
          <motion.span className="block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>to <span className="text-[#E3E3FD]">understand.</span></motion.span>
        </motion.h2>
        
        <motion.a
          href="mailto:brandedobjects@gmail.com"
          className="
            group font-inter-light text-[#E3E3FD] text-[14px]
            bg-[#3B3B3B] cursor-pointer
            border-[1px] border-[#FFFFFF4D]
            backdrop-blur-[6.5px]
            px-[16px] py-[8px]
            flex items-center
            transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white
          "
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 1.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Let's talk
          <span className="ml-2 inline-block transform transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[4px]">→</span>
        </motion.a>
      </div>
    </section>
  );
}
