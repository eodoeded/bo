import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Divider() {
    const [copied, setCopied] = useState(false);
    const email = "brandedobjects@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] };

    return (
        <section className="w-full py-12 md:py-24 flex flex-col items-center justify-center gap-8 md:gap-10 relative overflow-hidden">
            {/* Subtle Ambient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1F1D18_0%,transparent_70%)] pointer-events-none" />

            <div className="flex flex-col items-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={transition}
                    className="font-inter-light text-white text-[32px] leading-[38px] md:text-[48px] md:leading-[56px] max-w-[22ch] md:max-w-none tracking-[0.2px] mb-6 text-center"
                >
                    Ready to start?
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...transition, delay: 0.1 }}
                    className="flex flex-col items-center gap-6 w-full max-w-md"
                >
                     <div className="flex items-center gap-3 mb-2">
                        <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_rgba(227,227,253,0.6)]"></span>
                        <span className="text-[#E3E3FD]/60 font-inter-light text-[11px] tracking-[0.2em] uppercase">3/4 spots available for Q4</span>
                    </div>

                    <motion.button
                        type="button"
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        whileTap="hover"
                        onClick={handleCopy}
                        variants={{ rest: { color: "#E3E3FD", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }, hover: { color: "#FFFFFF", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } }}
                        className="
                            group font-inter-light text-[#E3E3FD] text-[14px]
                            bg-[#3B3B3B] cursor-pointer
                            border-[1px] border-[#FFFFFF4D]
                            backdrop-blur-[6.5px]
                            px-[20px] py-[10px]
                            flex items-center
                        "
                    >
                        {copied ? "Email Copied" : "Copy Email"}
                        <motion.span variants={{ rest: { x: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }, hover: { x: 4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } }} className="ml-2 inline-block">→</motion.span>
                    </motion.button>
                    
                    <div className="flex flex-col items-center gap-1 mt-2">
                        <span className="text-[#5C5D5E] text-[13px] font-inter-light selection:bg-white/20 selection:text-white tracking-wide">
                           {email}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


