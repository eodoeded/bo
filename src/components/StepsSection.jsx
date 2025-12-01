import React from 'react';
import { motion } from 'framer-motion';

export default function StepsSection() {
    const transition = { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                ...transition
            }
        })
    };

    // Shared style for all icons
    const iconStyle = "w-[160px] h-[160px] opacity-90 pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-[#E3E3FD]";
    const strokeWidth = "0.6";

    // Icon 1: System Icon (Upload Geometry - Nodes/Structure)
    const SystemIcon = () => (
         <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
        >
             <motion.g style={{ transformOrigin: "50px 50px" }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
                
                {/* Central Hub */}
                <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.8" />
                <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.3" />

                {/* Connected Nodes */}
                {[0, 72, 144, 216, 288].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + 30 * Math.cos(rad);
                    const y = 50 + 30 * Math.sin(rad);
                    
                    return (
                        <g key={i}>
                            {/* Connection Line with Pulse */}
                            <line x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" />
                            <motion.circle 
                                cx={50} cy={50} r="1" fill="currentColor"
                                animate={{ cx: [50, x], cy: [50, y], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* Node */}
                            <motion.circle 
                                cx={x} cy={y} r="2" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </g>
                    );
                })}

                {/* Outer Data Ring */}
                 <motion.circle 
                    cx="50" cy="50" r="42" 
                    fill="none" stroke="currentColor" strokeWidth={strokeWidth} 
                    strokeDasharray="2 4"
                    opacity="0.2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 />
             </motion.g>
        </motion.svg>
    );

    // Icon 2: Interface Icon (Define Context - Layers/Stacking)
    const InterfaceIcon = () => (
        <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
        >
            {/* Perspective group */}
            <g style={{ transform: "translate(50px, 50px)" }}>
                
                {/* Bottom Layer - Base/Infrastructure */}
                <motion.path
                    d="M-30 10 L0 25 L30 10 L0 -5 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    opacity="0.3"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Middle Layer - Content/Structure */}
                <motion.path
                    d="M-30 -5 L0 10 L30 -5 L0 -20 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    opacity="0.6"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Top Layer - UI/Interface */}
                <motion.path
                    d="M-30 -20 L0 -5 L30 -20 L0 -35 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Connecting vertical lines (dynamic) */}
                <motion.line x1="0" y1="25" x2="0" y2="-35" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" 
                    animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.line x1="-30" y1="10" x2="-30" y2="-20" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" 
                     animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                />
                <motion.line x1="30" y1="10" x2="30" y2="-20" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2"
                     animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2, delay: 1.0, repeat: Infinity }}
                />

                {/* Floating Particles representing data flow */}
                 <motion.circle cx="0" cy="-45" r="1.5" fill="currentColor" 
                    animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                 />
            </g>
        </motion.svg>
    );

    // Icon 3: Camera Icon (Generate Assets - Rendering/Focus)
    const CameraIcon = () => (
        <motion.svg
            viewBox="0 0 100 100"
            className={iconStyle}
        >
             <motion.g 
                style={{ transformOrigin: "50px 50px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             >
                {/* Outer Ring */}
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.3" strokeDasharray="4 4" />
                
                {/* Shutter Blades Abstract */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.line
                        key={i}
                        x1="50" y1="25" x2="50" y2="10"
                        stroke="currentColor" strokeWidth={strokeWidth}
                        transform={`rotate(${angle} 50 50)`}
                    />
                ))}

                {/* Inner Focus */}
                <motion.rect 
                    x="35" y="35" width="30" height="30" 
                    fill="none" stroke="currentColor" strokeWidth={strokeWidth}
                    animate={{ scale: [1, 0.8, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "50px 50px" }}
                />
                
                {/* Center Point */}
                <circle cx="50" cy="50" r="1.5" fill="currentColor" />
             </motion.g>
        </motion.svg>
    );

    return (
        <section className="w-full pt-12 md:pt-24 pb-24 relative z-10">
            <div className="mx-auto max-w-[1200px] px-6 text-center">
                <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={transition}
                    className="text-[#E3E3FD] font-inter-light text-[12px] tracking-[0.25em] uppercase opacity-60 mb-24"
                >
                    How it works
                </motion.h3>
            </div>

            <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0">

                {/* Step 1 */}
                <motion.div 
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    whileHover={{ y: -8, backgroundColor: "#1A1915", transition: { duration: 0.3 } }}
                    className="relative h-[640px] w-full bg-[#141311] border border-[#FFFFFF0D] flex flex-col items-center text-center p-8 overflow-hidden group transition-colors duration-500"
                >
                    <div className="absolute inset-0 top-0 h-[60%] flex items-center justify-center pointer-events-none">
                        <SystemIcon />
                    </div>

                    <div className="mt-auto relative z-10 w-full">
                        <span className="block text-[#E3E3FD]/40 font-inter-light text-[11px] tracking-[0.2em] mb-5">STEP 01</span>
                        <h4 className="text-[#E3E3FD] font-inter-light text-[24px] leading-[32px] mb-4">Upload Geometry</h4>
                        <p className="text-[#8A8B8C] font-inter-light text-[15px] leading-[24px] mb-8 max-w-[280px] mx-auto tracking-wide">
                            Drag & drop your 3D CAD files (.step, .glb, .obj) directly into the secure studio viewport.
                        </p>
                        
                        <div className="border-t border-[#FFFFFF0D] w-full pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <ul className="flex flex-col gap-3 text-left px-4 items-center">
                                <li className="text-[#8A8B8C] font-inter-light text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Secure encryption
                                </li>
                                <li className="text-[#8A8B8C] font-inter-light text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Auto-optimization
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Step 2 */}
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
                        <InterfaceIcon />
                    </div>

                    <div className="mt-auto relative z-10 w-full">
                         <span className="block text-[#E3E3FD]/40 font-inter-light text-[11px] tracking-[0.2em] mb-5">STEP 02</span>
                        <h4 className="text-[#E3E3FD] font-inter-light text-[24px] leading-[32px] mb-4">Define Context</h4>
                        <p className="text-[#8A8B8C] font-inter-light text-[15px] leading-[24px] mb-8 max-w-[280px] mx-auto tracking-wide">
                           Describe your desired material, lighting, and environment, or upload a reference image.
                        </p>

                        <div className="border-t border-[#FFFFFF0D] w-full pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <ul className="flex flex-col gap-3 text-left px-4 items-center">
                                <li className="text-[#8A8B8C] font-inter-light text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Material library
                                </li>
                                <li className="text-[#8A8B8C] font-inter-light text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Lighting presets
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Step 3 */}
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
                        <CameraIcon />
                    </div>

                    <div className="mt-auto relative z-10 w-full">
                         <span className="block text-[#E3E3FD]/40 font-inter-light text-[11px] tracking-[0.2em] mb-5">STEP 03</span>
                        <h4 className="text-[#E3E3FD] font-inter-light text-[24px] leading-[32px] mb-4">Generate Assets</h4>
                        <p className="text-[#8A8B8C] font-inter-light text-[15px] leading-[24px] mb-8 max-w-[280px] mx-auto tracking-wide">
                            AI instantly renders photorealistic marketing assets, perfectly aligned and lighting-matched.
                        </p>

                        <div className="border-t border-[#FFFFFF0D] w-full pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <ul className="flex flex-col gap-3 text-left px-4 items-center">
                                <li className="text-[#8A8B8C] font-inter-light text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> 4K Resolution
                                </li>
                                <li className="text-[#8A8B8C] font-inter-light text-[13px] flex items-center gap-3">
                                    <span className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-50"></span> Transparent background
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
