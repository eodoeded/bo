import cube from "../assets/cube.png";
import refine from "../assets/refine.png";
import deliver from "../assets/deliver.png";

export default function Proceses() {
    return (
        <section id="services" className="w-full pt-20 pb-10">
            <div className="mx-auto max-w-[1100px] px-4">
                <h3 className="text-white/90 font-inter text-[14px] tracking-[0.3px] mb-4">Offerings</h3>
            </div>
            <div className="mx-auto max-w-[1100px] grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">

                {/* Card 1 */}
                <div className="relative h-[600px] md:h-[620px] w-full p-6 bg-gradient-to-b from-[#12110D] to-[#1C1A14] flex flex-col justify-between border border-[#FFFFFF0D]">
                    <div>
                        <span className="block text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px] mb-3">
                            01 — Product Visuals
                        </span>
                        <h4 className="text-[#E3E3FD] font-inter text-[18px] leading-[24px] mb-4">
                            Their hardware, photographed cleanly.
                        </h4>
                        <p className="text-[#5C5D5E] font-geist text-[14px] leading-[20px] tracking-[-0.2px]">
                            Crisp shots → minimal edits → brand-aligned lighting.
                        </p>
                    </div>

                    <div className="mt-auto">
                        <span className="block text-white/80 font-inter text-[12px] uppercase tracking-wider mb-3">
                            you get:
                        </span>
                        <ul className="space-y-2">
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                8–12 product photos
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                detail + hero angles
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                export-ready for site & ads
                            </li>
                        </ul>
                    </div>
                    
                     {/* Optional decorative image - keeping it subtle or removing if too busy */}
                     <img
                        src={cube}
                        alt=""
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-[80px] opacity-20 pointer-events-none"
                    />
                </div>

                {/* Card 2 */}
                <div className="relative h-[600px] md:h-[620px] w-full p-6 bg-gradient-to-b from-[#12110D] to-[#1C1A14] flex flex-col justify-between border border-[#FFFFFF0D]">
                    <div>
                        <span className="block text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px] mb-3">
                            02 — Product + Website
                        </span>
                        <h4 className="text-[#E3E3FD] font-inter text-[18px] leading-[24px] mb-4">
                            Their product, turned into a sharp digital presence.
                        </h4>
                        <p className="text-[#5C5D5E] font-geist text-[14px] leading-[20px] tracking-[-0.2px]">
                            Visuals + a landing page that actually converts.
                        </p>
                    </div>

                    <div className="mt-auto">
                        <span className="block text-white/80 font-inter text-[12px] uppercase tracking-wider mb-3">
                            you get:
                        </span>
                        <ul className="space-y-2">
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                everything in Product Visuals
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                landing page design (hero → sections → UI blocks)
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                6–10 supporting graphics (screens, diagrams, overlays)
                            </li>
                        </ul>
                    </div>

                     <img
                        src={refine}
                        alt=""
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-[80px] opacity-20 pointer-events-none"
                    />
                </div>

                {/* Card 3 */}
                <div className="relative h-[600px] md:h-[620px] w-full p-6 bg-gradient-to-b from-[#12110D] to-[#1C1A14] flex flex-col justify-between border border-[#FFFFFF0D]">
                    <div>
                        <span className="block text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px] mb-3">
                            03 — Full Digital System
                        </span>
                        <h4 className="text-[#E3E3FD] font-inter text-[18px] leading-[24px] mb-4">
                            Their brand, built into a complete digital engine.
                        </h4>
                        <p className="text-[#5C5D5E] font-geist text-[14px] leading-[20px] tracking-[-0.2px]">
                            For teams that need the whole pipeline, not a one-off.
                        </p>
                    </div>

                    <div className="mt-auto">
                        <span className="block text-white/80 font-inter text-[12px] uppercase tracking-wider mb-3">
                            you get:
                        </span>
                        <ul className="space-y-2">
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                full website
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                product visuals (15–20)
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                ad kit (3–5 variations)
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                social kit
                            </li>
                            <li className="text-[#8A8B8C] font-geist text-[13px] leading-[18px] border-b border-white/5 pb-2">
                                light design system (type, colour, spacing)
                            </li>
                        </ul>
                    </div>

                     <img
                        src={deliver}
                        alt=""
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-[80px] opacity-20 pointer-events-none"
                    />
                </div>

            </div>
        </section>
    );
}
