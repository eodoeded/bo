import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0E0E0A] to-[#1C1A14]">
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start text-left w-1/2 pl-8">
          <h2 className="font-inter-light text-white text-[64px] leading-[72px] tracking-[-1.49px] mb-6">
            Make complex products <br /> easy to <span className="text-[#E3E3FD]">understand.</span>
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
            <motion.span
              className="ml-2"
              whileHover={{ x: 5, color: "#FFFFFF" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              →
            </motion.span>
          </motion.button>
        </div>

        {/* Right Column - Robot Images */}
        <div className="relative w-1/2 flex justify-center">
          <motion.img
            src={bottomComp}
            alt="Main robot"
            className="w-[500px] h-[400px] relative z-0"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.img
            src={upComp}
            alt="Floating component"
            className="w-[200px] h-[120px] absolute z-10 -top-8 -right-12"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
