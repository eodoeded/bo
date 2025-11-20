import { motion } from 'framer-motion';

export default function Proceses() {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: [0.2, 0.8, 0.2, 1]
            }
        })
    };

    // Animation for the wireframe cube (Card 1)
    const CubeIcon = () => (
        <motion.svg
            viewBox="0 0 100 100"
            className="absolute top-1/2 right-4 -translate-y-1/2 w-[120px] opacity-30 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <motion.path
                d="M50 15 L85 35 L85 75 L50 95 L15 75 L15 35 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-white"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
             <motion.path
                d="M50 15 L50 55 L85 75 M50 55 L15 75"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-white"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
            />
        </motion.svg>
    );

    // Animation for the layers (Card 2)
    const LayersIcon = () => (
        <motion.div className="absolute top-1/2 right-8 -translate-y-1/2 w-[100px] h-[100px] opacity-30 pointer-events-none perspective-1000">
             <motion.div
                className="absolute inset-0 border border-white/50 bg-white/5"
                animate={{ y: [0, -10, 0], rotateX: [60, 50, 60], rotateZ: [45, 45, 45] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "center" }}
             />
             <motion.div
                className="absolute inset-0 border border-white/30 bg-white/5"
                animate={{ y: [20, 10, 20], rotateX: [60, 50, 60], rotateZ: [45, 45, 45] }}
                transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "center" }}
             />
        </motion.div>
    );

    // Animation for the network (Card 3)
    const NetworkIcon = () => (
        <motion.svg
            viewBox="0 0 100 100"
            className="absolute top-1/2 right-4 -translate-y-1/2 w-[120px] opacity-30 pointer-events-none"
        >
            {[...Array(5)].map((_, i) => (
                <motion.circle
                    key={i}
                    cx={50 + Math.cos(i * 1.2) * 30}
                    cy={50 + Math.sin(i * 1.2) * 30}
                    r="2"
                    fill="white"
                    animate={{ 
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{ 
                        duration: 3, 
                        delay: i * 0.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                />
            ))}
             <motion.circle cx="50" cy="50" r="3" fill="white" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
             <path d="M50 50 L70 30 M50 50 L80 60 M50 50 L30 70 M50 50 L20 40 M50 50 L50 20" stroke="white" strokeWidth="0.5" opacity="0.5" />
        </motion.svg>
    );

    return (
        <section id="services" className="w-full pt-32 pb-20">
            <div className="mx-auto max-w-[1100px] px-4 mb-12">
                <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-white/90 font-inter text-[14px] tracking-[0.3px] uppercase"
                >
                    Offerings
                </motion.h3>
            </div>
            <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">

                {/* Card 1 */}
                <motion.div 
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="relative h-[520px] w-full p-8 bg-[#141311] flex flex-col justify-between border border-[#FFFFFF1A] overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="block text-white/40 font-inter text-[12px] tracking-wider mb-6">
                            01
                        </span>
                        <h4 className="text-white font-inter text-[24px] leading-[32px] mb-4 font-light">
                            Product Visuals
                        </h4>
                        <p className="text-[#8A8B8C] font-inter text-[15px] leading-[24px] tracking-tight max-w-[90%]">
                            Hardware photography that feels effortless. Crisp shots, minimal edits, and lighting that fits the brand.
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <ul className="space-y-4 border-t border-white/10 pt-6">
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> 8–12 product photos
                            </li>
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> Detail + hero angles
                            </li>
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> Export-ready assets
                            </li>
                        </ul>
                    </div>
                    
                    <CubeIcon />
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="relative h-[520px] w-full p-8 bg-[#141311] flex flex-col justify-between border border-[#FFFFFF1A] overflow-hidden"
                >
                     <div className="relative z-10">
                        <span className="block text-white/40 font-inter text-[12px] tracking-wider mb-6">
                            02
                        </span>
                        <h4 className="text-white font-inter text-[24px] leading-[32px] mb-4 font-light">
                            Product + Website
                        </h4>
                        <p className="text-[#8A8B8C] font-inter text-[15px] leading-[24px] tracking-tight max-w-[90%]">
                           Turn the product into a digital presence. Visuals plus a high-converting landing page design.
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <ul className="space-y-4 border-t border-white/10 pt-6">
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> Everything in Visuals
                            </li>
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> Landing page design
                            </li>
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> 6–10 supporting graphics
                            </li>
                        </ul>
                    </div>

                    <LayersIcon />
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="relative h-[520px] w-full p-8 bg-[#141311] flex flex-col justify-between border border-[#FFFFFF1A] overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="block text-white/40 font-inter text-[12px] tracking-wider mb-6">
                            03
                        </span>
                        <h4 className="text-white font-inter text-[24px] leading-[32px] mb-4 font-light">
                            Full Digital System
                        </h4>
                        <p className="text-[#8A8B8C] font-inter text-[15px] leading-[24px] tracking-tight max-w-[90%]">
                            The complete engine. A full website, visual library, and design system for teams scaling up.
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <ul className="space-y-4 border-t border-white/10 pt-6">
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> Full website
                            </li>
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> 15–20 product visuals
                            </li>
                            <li className="text-[#8A8B8C] font-inter text-[13px] flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></span> Ad & Social kits
                            </li>
                        </ul>
                    </div>

                    <NetworkIcon />
                </motion.div>

            </div>
        </section>
    );
}
