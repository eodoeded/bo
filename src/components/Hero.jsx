import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-start relative pt-24">
      {/* Robot Visual - Centered in upper half */}
      <div className="relative flex justify-center items-center mb-12">
        <motion.img
          src={bottomComp}
          alt="Main robot"
          className="w-[560px] h-[440px] relative z-0 object-contain"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.img
          src={upComp}
          alt="Floating component"
          className="w-[220px] h-[110px] absolute z-10 -top-16 -left-12 object-contain"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content - Centered below robot */}
      <div className="flex flex-col items-center text-center">
        <h2 className="font-inter-light text-white text-[56px] leading-[64px] tracking-[0.2px] mb-8" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}>
          <span className="block">Make complex products simple</span>
          <span className="block">to <span className="text-[#E3E3FD]">understand.</span></span>
        </h2>
        
        <motion.button
          className="
            font-inter-light text-[#E3E3FD] text-[14px]
            bg-[#3B3B3B] cursor-pointer
            border-[1px] border-[#FFFFFF4D]
            backdrop-blur-[6.5px]
            px-[16px] py-[8px]
            flex items-center
          "
          whileHover={{ color: "#FFFFFF" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Let's talk
          <span className="ml-2">→</span>
        </motion.button>
      </div>
    </section>
  );
}
