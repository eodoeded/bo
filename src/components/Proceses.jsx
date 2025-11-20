import { motion } from 'framer-motion';

export default function Proceses() {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: [0.2, 0.8, 0.2, 1]
            }
        })
    };

    // Shared style for all icons
    const iconStyle = "w-[140px] h-[140px] opacity-80 pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-[#E3E3FD]";
    const strokeWidth = "1";

    // Card 1: Product Visuals - Clean Geometric Composition
    const CubeIcon = () => (
        <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
            style={{ transformStyle: "preserve-3d" }}
        >
             {/* Static Frame */}
             <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
             
             {/* Moving Elements */}
             <motion.rect 
                x="30" y="30" width="40" height="40" 
                fill="none" stroke="currentColor" strokeWidth={strokeWidth} 
                animate={{ rotate: 90 }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                style={{ transformOrigin: "50px 50px" }}
             />
             
             <motion.circle 
                cx="50" cy="50" r="5" 
                fill="currentColor" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             />
        </motion.svg>
    );

    // Card 2: Product + Website - Abstract Interface Layout
    const LayersIcon = () => (
        <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
        >
             {/* Base Grid */}
             <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
             <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

             {/* Floating Panels */}
             <motion.rect
                x="25" y="35" width="30" height="40"
                fill="none" stroke="currentColor" strokeWidth={strokeWidth}
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.rect
                x="45" y="25" width="30" height="40"
                fill="none" stroke="currentColor" strokeWidth={strokeWidth}
                animate={{ y: [2, -2, 2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             />
             
             {/* Connector */}
             <motion.line
                x1="40" y1="55" x2="60" y2="45"
                stroke="currentColor" strokeWidth="0.5"
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
             />
        </motion.svg>
    );

    // Card 3: Full Digital System - Connected Nodes / System
    const NetworkIcon = () => (
         <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
        >
             <motion.g style={{ transformOrigin: "center" }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
                {/* Central Hub */}
                <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
                <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.8" />
                
                {/* Nodes */}
                {[0, 120, 240].map((angle, i) => (
                    <motion.g key={i} transform={`rotate(${angle} 50 50)`}>
                        <line x1="50" y1="38" x2="50" y2="20" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
                    </motion.g>
                ))}
             </motion.g>
        </motion.svg>
    );

    return (
        <section id="services" className="w-full pt-32 pb-32 relative z-10">
             {/* Subtle grid background for tech feel */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

            <div className="mx-auto max-w-[1200px] px-6 mb-24 text-center">
                <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[#E3E3FD] font-inter text-[14px] tracking-[0.2em] uppercase opacity-60"
                >
                    Offerings
                </motion.h3>
            </div>

            <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0">

                {/* Card 1 */}
                <motion.div 
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -8, backgroundColor: "#1A1915", transition: { duration: 0.3 } }}
                    className="relative h-[640px] w-full bg-[#141311] border border-[#FFFFFF0D] flex flex-col items-center text-center p-8 overflow-hidden group transition-colors duration-500"
                >
                    {/* Icon Container */}
                    <div className="absolute inset-0 top-0 h-[60%] flex items-center justify-center pointer-events-none">
                        <CubeIcon />
                    </div>

                    {/* Content */}
                    <div className="mt-auto relative z-10 w-full">
                        <span className="block text-[#E3E3FD]/30 font-inter font-light text-[12px] tracking-widest mb-4">01</span>
                        <h4 className="text-[#E3E3FD] font-inter text-[24px] leading-[30px] mb-4 font-light">Product Visuals</h4>
                        <p className="text-[#8A8B8C] font-inter text-[15px] leading-[24px] mb-8 max-w-[280px] mx-auto">
                            Hardware photography that feels effortless. Crisp shots, minimal edits, brand-aligned.
                        </p>
                        
                        <div className="border-t border-[#FFFFFF0D] w-full pt-6">
                            <ul className="flex flex-col gap-3 text-left px-4">
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> 8–12 product photos
                                </li>
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Detail + hero angles
                                </li>
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Export-ready assets
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -8, backgroundColor: "#1A1915", transition: { duration: 0.3 } }}
                    className="relative h-[640px] w-full bg-[#141311] border border-[#FFFFFF0D] flex flex-col items-center text-center p-8 overflow-hidden group transition-colors duration-500"
                >
                     <div className="absolute inset-0 top-0 h-[60%] flex items-center justify-center pointer-events-none">
                        <LayersIcon />
                    </div>

                    <div className="mt-auto relative z-10 w-full">
                        <span className="block text-[#E3E3FD]/30 font-inter font-light text-[12px] tracking-widest mb-4">02</span>
                        <h4 className="text-[#E3E3FD] font-inter text-[24px] leading-[30px] mb-4 font-light">Product + Website</h4>
                        <p className="text-[#8A8B8C] font-inter text-[15px] leading-[24px] mb-8 max-w-[280px] mx-auto">
                           Turn the product into a digital presence. Visuals plus a high-converting landing page.
                        </p>

                        <div className="border-t border-[#FFFFFF0D] w-full pt-6">
                            <ul className="flex flex-col gap-3 text-left px-4">
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Everything in Visuals
                                </li>
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Landing page design
                                </li>
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> 6–10 supporting graphics
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -8, backgroundColor: "#1A1915", transition: { duration: 0.3 } }}
                    className="relative h-[640px] w-full bg-[#141311] border border-[#FFFFFF0D] flex flex-col items-center text-center p-8 overflow-hidden group transition-colors duration-500"
                >
                    <div className="absolute inset-0 top-0 h-[60%] flex items-center justify-center pointer-events-none">
                        <NetworkIcon />
                    </div>

                    <div className="mt-auto relative z-10 w-full">
                        <span className="block text-[#E3E3FD]/30 font-inter font-light text-[12px] tracking-widest mb-4">03</span>
                        <h4 className="text-[#E3E3FD] font-inter text-[24px] leading-[30px] mb-4 font-light">Full Digital System</h4>
                        <p className="text-[#8A8B8C] font-inter text-[15px] leading-[24px] mb-8 max-w-[280px] mx-auto">
                            The complete engine. Full website, visual library, and design system for scaling.
                        </p>

                        <div className="border-t border-[#FFFFFF0D] w-full pt-6">
                            <ul className="flex flex-col gap-3 text-left px-4">
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Full website
                                </li>
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> 15–20 product visuals
                                </li>
                                <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Ad & Social kits
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
