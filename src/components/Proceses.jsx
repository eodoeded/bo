import cube from "../assets/cube.png";
import refine from "../assets/refine.png";
import deliver from "../assets/deliver.png";
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

    const imageVariants = {
        hover: {
            y: -10,
            rotate: 5,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        float: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

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
                    whileHover="hover"
                    className="relative h-[600px] md:h-[620px] w-full p-8 bg-gradient-to-b from-[#12110D] to-[#1C1A14] flex flex-col justify-between border border-[#FFFFFF0D] group"
                >
                    <div>
                        <span className="block text-white font-geist text-[14px] leading-[17px] tracking-[-0.28px] mb-4 opacity-60">
                            01 — Product Visuals
                        </span>
                        <h4 className="text-[#E3E3FD] font-inter text-[20px] leading-[28px] mb-4">
                            Their hardware, photographed cleanly.
                        </h4>
                        <p className="text-[#8A8B8C] font-geist text-[14px] leading-[22px] tracking-[-0.2px]">
                            Crisp shots → minimal edits → brand-aligned lighting.
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <span className="block text-white/60 font-inter text-[11px] uppercase tracking-wider mb-4">
                            you get:
                        </span>
                        <ul className="space-y-3">
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> 8–12 product photos
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> detail + hero angles
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> export-ready for site & ads
                            </li>
                        </ul>
                    </div>
                    
                     <motion.img
                        src={cube}
                        alt=""
                        variants={imageVariants}
                        animate="float"
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-[100px] opacity-15 pointer-events-none grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-500"
                    />
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover="hover"
                    className="relative h-[600px] md:h-[620px] w-full p-8 bg-gradient-to-b from-[#12110D] to-[#1C1A14] flex flex-col justify-between border border-[#FFFFFF0D] group"
                >
                    <div>
                        <span className="block text-white font-geist text-[14px] leading-[17px] tracking-[-0.28px] mb-4 opacity-60">
                            02 — Product + Website
                        </span>
                        <h4 className="text-[#E3E3FD] font-inter text-[20px] leading-[28px] mb-4">
                            Their product, turned into a sharp digital presence.
                        </h4>
                        <p className="text-[#8A8B8C] font-geist text-[14px] leading-[22px] tracking-[-0.2px]">
                            Visuals + a landing page that actually converts.
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <span className="block text-white/60 font-inter text-[11px] uppercase tracking-wider mb-4">
                            you get:
                        </span>
                        <ul className="space-y-3">
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> everything in Product Visuals
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> landing page design
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> 6–10 supporting graphics
                            </li>
                        </ul>
                    </div>

                     <motion.img
                        src={refine}
                        alt=""
                        variants={imageVariants}
                        animate="float"
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-[100px] opacity-15 pointer-events-none grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-500"
                    />
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover="hover"
                    className="relative h-[600px] md:h-[620px] w-full p-8 bg-gradient-to-b from-[#12110D] to-[#1C1A14] flex flex-col justify-between border border-[#FFFFFF0D] group"
                >
                    <div>
                        <span className="block text-white font-geist text-[14px] leading-[17px] tracking-[-0.28px] mb-4 opacity-60">
                            03 — Full Digital System
                        </span>
                        <h4 className="text-[#E3E3FD] font-inter text-[20px] leading-[28px] mb-4">
                            Their brand, built into a complete digital engine.
                        </h4>
                        <p className="text-[#8A8B8C] font-geist text-[14px] leading-[22px] tracking-[-0.2px]">
                            For teams that need the whole pipeline, not a one-off.
                        </p>
                    </div>

                    <div className="mt-auto relative z-10">
                        <span className="block text-white/60 font-inter text-[11px] uppercase tracking-wider mb-4">
                            you get:
                        </span>
                        <ul className="space-y-3">
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> full website
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> product visuals (15–20)
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> ad kit (3–5 variations)
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> social kit
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-white/20"></span> light design system
                            </li>
                        </ul>
                    </div>

                     <motion.img
                        src={deliver}
                        alt=""
                        variants={imageVariants}
                        animate="float"
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-[100px] opacity-15 pointer-events-none grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-500"
                    />
                </motion.div>

            </div>
        </section>
    );
}
