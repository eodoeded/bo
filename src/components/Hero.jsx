import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full py-16 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Top image */}
        <img
          src={upComp}
          alt="Top Component"
          className="w-[279px] -mb-5 h-[148px] object-contain"
        />

        {/* Bottom image */}
        <img
          src={bottomComp}
          alt="Bottom Component"
          className="w-[500.5px] h-[415.8px] object-contain mt-4"
        />
        
        {/* Button from 7th push */}
        <motion.button
          className="
          font-inter text-[#E3E3FD]
          bg-[#3B3B3B] cursor-pointer
           border-[1px] border-[#FFFFFF4D]
          backdrop-blur-[6.5px]
          px-[23px] py-[12px]
          flex items-center mt-8
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
    </section>
  );
}
