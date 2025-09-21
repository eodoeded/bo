import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full h-screen flex items-start justify-center bg-gradient-to-b from-[#0E0E0A] to-[#2A271E] pt-16">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-start justify-between">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start text-left w-1/2 pl-0">
          <h2 className="font-inter-light text-white text-[45px] leading-[50px] tracking-[1.4px] mb-4" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}>
            <span className="block">Make complex products</span>
            <span className="block">easy to <span className="text-[#E3E3FD]">understand.</span></span>
          </h2>
          
          <p className="font-inter text-white text-[14px] tracking-[0.4px] opacity-75 mb-6 max-w-[350px]" style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}>
            We are a studio that turns hardware and technology into clear, product-led visuals and identities.
          </p>
          
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
            <span className="ml-2">
              →
            </span>
          </motion.button>
        </div>

        {/* Right Column - Robot Images */}
        <div className="relative w-1/2 flex justify-center items-center">
          <motion.img
            src={bottomComp}
            alt="Main robot"
            className="w-[500px] h-[400px] relative z-0 object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.img
            src={upComp}
            alt="Floating component"
            className="w-[200px] h-[100px] absolute z-10 -top-16 -left-12 object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
