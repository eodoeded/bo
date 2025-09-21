import cube from "../assets/cube.png";
import refine from "../assets/refine.png";
import deliver from "../assets/deliver.png";
export default function Proceses() {
    return (
        <section id="services" className="w-full pt-24 pb-0">
            <div className="mx-auto max-w-[1100px] px-4">
                <h3 className="text-white/90 font-inter text-[14px] tracking-[0.3px] mb-4">Services</h3>
            </div>
            <div className="mx-auto max-w-[1100px] flex items-center justify-between">

                {/* Card 1 */}
                <div className="relative h-[577.09px] w-[371.2px] p-5 bg-gradient-to-b from-[#12110D] to-[#1C1A14]">
                    {/* Text at the top */}
                    <span className="absolute top-5 left-5 text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Images
                    </span>

                    {/* Image centered */}
                    <img
                        src={cube}
                        alt="Cube"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[174px] h-[161px] object-contain"
                    />

                    <span className="absolute  text-[#5C5D5E] bottom-5 left-5  font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Photographs, renders, and diagrams of your product.
                    </span>
                </div>

                {/* Card 2 */}
                <div className="relative h-[577.09px] w-[371.2px] p-5 bg-gradient-to-b from-[#12110D] to-[#1C1A14]">
                    {/* Text at the top */}
                    <span className="absolute top-5 left-5 text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Ads
                    </span>

                    {/* Image centered */}
                    <img
                        src={refine}
                        alt="Cube"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[174px] h-[161px] object-contain"
                    />

                    <span className="absolute  text-[#5C5D5E] bottom-5 left-5  font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Those same visuals in motion: films, loops, and campaigns that show the product in use.
                    </span>
                </div>

                {/* Card 3 */}
                <div className="relative h-[577.09px] w-[371.2px] p-5 bg-gradient-to-b from-[#12110D] to-[#1C1A14]">
                    {/* Text at the top */}
                    <span className="absolute top-5 left-5 text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Brand
                    </span>

                    {/* Image centered */}
                    <img
                        src={deliver}
                        alt="Cube"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[157.94px] h-[188.36px] object-contain"
                    />

                    <span className="absolute  text-[#5C5D5E] bottom-5 left-5  font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                       A consistent product-led look carried across your website, social, and paid ads. The product itself becomes the identity.
                    </span>
                </div>

            </div>
        </section>
    );
}
