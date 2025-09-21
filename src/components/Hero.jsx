import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-start relative pt-24">
      {/* Robot Visual - Centered in upper half */}
      <div className="relative flex justify-center items-center mb-10">
        <motion.img
          src={bottomComp}
          alt="Main robot"
          className="w-[440px] h-[340px] relative z-0 object-contain"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.img
          src={upComp}
          alt="Floating component"
          className="w-[190px] h-[95px] absolute z-10 -top-14 -left-10 object-contain"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content - Centered below robot */}
      <div className="flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter-light text-white text-[48px] leading-[56px] tracking-[0.2px] mb-6"
          style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
        >
          <span className="block">Make complex products simple</span>
          <span className="block">to <span className="text-[#E3E3FD]">understand.</span></span>
        </motion.h2>
        
        <motion.a
          className="
            font-inter-light text-[#E3E3FD] text-[14px]
            bg-[#3B3B3B] cursor-pointer
            border-[1px] border-[#FFFFFF4D]
            backdrop-blur-[6.5px]
            px-[16px] py-[8px]
            flex items-center
          "
          whileHover={{ color: "#FFFFFF" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          href="mailto:brandedobjects@gmail.com"
        >
          Let's talk
          <motion.span className="ml-2 inline-block" whileHover={{ x: 6 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>→</motion.span>
        </motion.a>
      </div>
    </section>
  );
}
