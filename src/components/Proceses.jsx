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

    // Shared style for all icons to ensure consistency
    const iconStyle = "w-[140px] h-[140px] opacity-80 pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-[#E3E3FD]";
    const strokeWidth = "0.8";

    // Card 1: Rotating Wireframe Cube
    const CubeIcon = () => (
        <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
            animate={{ rotateY: 360, rotateX: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
        >
            <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
            >
                 {/* Back Face */}
                <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.3" />
                {/* Front Face */}
                <rect x="35" y="35" width="50" height="50" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
                {/* Connecting Lines */}
                <line x1="25" y1="25" x2="35" y2="35" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.5" />
                <line x1="75" y1="25" x2="85" y2="35" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.5" />
                <line x1="25" y1="75" x2="35" y2="85" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.5" />
                <line x1="75" y1="75" x2="85" y2="85" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.5" />
            </motion.g>
        </motion.svg>
    );

    // Card 2: Floating Planes (Website/Layers)
    const LayersIcon = () => (
        <motion.div className={iconStyle + " flex items-center justify-center perspective-1000"}>
             <motion.div
                className="absolute w-16 h-16 border border-[#E3E3FD]/80"
                animate={{ 
                    rotateX: [60, 50, 60], 
                    rotateZ: [0, 360],
                    y: [0, -10, 0]
                }}
                transition={{ 
                    rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
             />
             <motion.div
                className="absolute w-20 h-20 border border-[#E3E3FD]/40"
                animate={{ 
                    rotateX: [60, 70, 60], 
                    rotateZ: [360, 0],
                    y: [20, 30, 20]
                }}
                transition={{ 
                    rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotateZ: { duration: 30, repeat: Infinity, ease: "linear" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
             />
        </motion.div>
    );

    // Card 3: Digital System (Connecting Nodes Sphere)
    const NetworkIcon = () => (
         <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
             <motion.g style={{ transformOrigin: "center" }}>
                {/* Orbital Rings */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" transform="rotate(45 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" transform="rotate(-45 50 50)" />
                
                {/* Central Core */}
                <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth={strokeWidth} />
                
                {/* Satellites */}
                <motion.circle cx="50" cy="15" r="2" fill="currentColor" 
                    animate={{ r: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="85" cy="50" r="2" fill="currentColor"
                    animate={{ r: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
                 <motion.circle cx="15" cy="50" r="2" fill="currentColor"
                    animate={{ r: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1.0, repeat: Infinity }} />
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
                    {/* Icon Container - Centered & Large */}
                    <div className="absolute inset-0 top-0 h-[60%] flex items-center justify-center pointer-events-none">
                        <CubeIcon />
                         {/* Glow behind icon */}
                         <div className="absolute w-[120px] h-[120px] bg-[#E3E3FD] opacity-[0.02] blur-[60px] rounded-full pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500" />
                    </div>

                    {/* Content - Pushed to bottom */}
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
                        <div className="absolute w-[120px] h-[120px] bg-[#E3E3FD] opacity-[0.02] blur-[60px] rounded-full pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500" />
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
                        <div className="absolute w-[120px] h-[120px] bg-[#E3E3FD] opacity-[0.02] blur-[60px] rounded-full pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500" />
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
