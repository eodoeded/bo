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
        <section className="w-full py-24 pb-32 flex flex-col items-center justify-center gap-8 relative">
             {/* Background glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#E3E3FD] opacity-[0.03] blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center gap-6 relative z-10">
                <h2 className="font-inter text-[32px] md:text-[40px] text-white tracking-tight text-center">
                    Ready to start?
                </h2>
                
                <div className="flex flex-col items-center gap-4 w-full max-w-md">
                    <div className="flex items-center gap-2 bg-[#1C1A14] border border-[#FFFFFF1A] p-1.5 pl-5 pr-1.5 rounded-full w-full transition-all hover:border-[#FFFFFF33]">
                        <span className="flex-1 text-[#E3E3FD] font-geist text-[15px] tracking-wide opacity-80 truncate">
                            {email}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCopy}
                            className="px-6 py-2.5 bg-[#3B3B3B] text-white font-inter text-[13px] font-medium rounded-full transition-colors hover:bg-[#4A4A4A]"
                        >
                            {copied ? "Copied!" : "Copy Email"}
                        </motion.button>
                    </div>
                    <p className="text-[#5C5D5E] text-[13px] font-geist">
                        Or email us directly to get a quote.
                    </p>
                </div>
            </div>
        </section>
    );
}

