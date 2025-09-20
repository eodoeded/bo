import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0E0E0A] to-[#1C1A14]">
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start text-left w-1/2 pl-4">
          <h2 className="font-inter-light text-white text-[64px] leading-[72px] tracking-[2px] mb-6">
            <span className="block">Make complex</span>
            <span className="block">products easy to</span>
            <span className="block"><span className="text-[#E3E3FD]">understand.</span></span>
          </h2>
          
          <p className="font-inter text-white text-[16px] tracking-[0.5px] opacity-75 mb-8 max-w-[400px]">
            We are a studio that turns hardware and technology into clear, product-led visuals and identities.
          </p>
          
          <motion.button
            className="
            font-inter-light text-[#E3E3FD]
            bg-[#3B3B3B] cursor-pointer
             border-[1px] border-[#FFFFFF4D]
            backdrop-blur-[6.5px]
            px-[23px] py-[12px]
            flex items-center
          "
            whileHover={{ color: "#FFFFFF" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Let's talk
            <span className="ml-2">
              →
            </span>
          </motion.button>
        </div>

        {/* Right Column - Robot Images */}
        <div className="relative w-1/2 flex justify-center">
          <motion.img
            src={upComp}
            alt="Floating component"
            className="w-[200px] h-[100px] absolute z-10 -top-12 -right-8 object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={bottomComp}
            alt="Main robot"
            className="w-[500.5px] h-[415.8px] relative z-0 mt-4 object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
}
