import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-start relative pt-24 overflow-hidden">
      {/* Subtle breathing overlay to enrich the base gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, rgba(18,17,13,0) 0%, rgba(28,26,20,0.18) 100%)' }}
        initial={{ opacity: 0.0, y: 0 }}
        animate={{ opacity: [0.0, 0.12, 0.0], y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Robot Visual - Centered in upper half */}
      <div className="relative z-10 flex justify-center items-center mb-10">
        <motion.img
          src={bottomComp}
          alt="Main robot"
          className="relative z-0 object-contain"
          style={{ width: '560px', aspectRatio: '1001 / 546' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.img
          src={upComp}
          alt="Floating component"
          className="absolute z-10 -top-20 left-1/2 -translate-x-1/2 object-contain"
          style={{ width: '220px', aspectRatio: '1001 / 546' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content - Centered below robot */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h2
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, filter: 'blur(10px)', y: 14 },
            show: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
            }
          }}
          className="font-inter-light text-white text-[48px] leading-[56px] tracking-[0.2px] mb-6"
          style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
        >
          <motion.span className="block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>Make complex products simple</motion.span>
          <motion.span className="block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>to <span className="text-[#E3E3FD]">understand.</span></motion.span>
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
          "
          whileHover={{ color: "#FFFFFF" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's talk
          <span
            className="ml-2 inline-block transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[4px]"
          >
            →
          </span>
        </motion.a>
      </div>
    </section>
  );
}
