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

    return (
        <section className="w-full py-32 pb-40 flex flex-col items-center justify-center gap-12 relative overflow-hidden">
             {/* Subtle Ambient background instead of harsh glow */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1F1D18_0%,transparent_70%)] pointer-events-none" />

            <div className="flex flex-col items-center gap-8 relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-inter text-[32px] md:text-[48px] text-white tracking-[-0.02em] text-center font-light"
                >
                    Ready to start?
                </motion.h2>
                
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center gap-6 w-full max-w-md"
                >
                    <div className="flex items-center gap-2 bg-[#141311] border border-[#FFFFFF1A] p-2 pl-6 pr-2 rounded-full w-full shadow-lg transition-all hover:border-[#FFFFFF33] hover:bg-[#1A1915]">
                        <span className="flex-1 text-[#E3E3FD] font-geist text-[16px] tracking-wide opacity-90 truncate select-all">
                            {email}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "#4A4A4A" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCopy}
                            className="px-6 py-3 bg-[#3B3B3B] text-white font-inter text-[14px] font-medium rounded-full transition-colors"
                        >
                            {copied ? "Copied" : "Copy"}
                        </motion.button>
                    </div>
                    <a href={`mailto:${email}`} className="text-[#5C5D5E] text-[14px] font-inter hover:text-[#8A8B8C] transition-colors">
                        or email us directly
                    </a>
                </motion.div>
            </div>
        </section>
    );
}


