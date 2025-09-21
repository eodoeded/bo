import cube from "../assets/cube.png";
import refine from "../assets/refine.png";
import deliver from "../assets/deliver.png";
export default function Proceses() {
    return (
        <section className="w-full pt-6 pb-0">
            <div className="mx-auto max-w-[1100px] flex items-center justify-between">

                {/* Card 1 */}
                <div className="relative h-[577.09px] w-[371.2px] p-5 bg-gradient-to-b from-[#12110D] to-[#1C1A14]">
                    {/* Text at the top */}
                    <span className="absolute top-5 left-5 text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Kick Off
                    </span>

                    {/* Image centered */}
                    <img
                        src={cube}
                        alt="Cube"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[174px] h-[161px] object-contain"
                    />

                    <span className="absolute  text-[#5C5D5E] bottom-5 left-5  font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        We get aligned fast to start the project with full <br />
                        momentum. Few clear direction, no wasted time.
                    </span>
                </div>

                {/* Card 2 */}
                <div className="relative h-[577.09px] w-[371.2px] p-5 bg-gradient-to-b from-[#12110D] to-[#1C1A14]">
                    {/* Text at the top */}
                    <span className="absolute top-5 left-5 text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Refine
                    </span>

                    {/* Image centered */}
                    <img
                        src={refine}
                        alt="Cube"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[174px] h-[161px] object-contain"
                    />

                    <span className="absolute  text-[#5C5D5E] bottom-5 left-5  font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        This is where clarity takes shape. We refine the <br />
                        essentials into a brand that feels obvious — and <br />
                        undeniable.
                    </span>
                </div>

                {/* Card 3 */}
                <div className="relative h-[577.09px] w-[371.2px] p-5 bg-gradient-to-b from-[#12110D] to-[#1C1A14]">
                    {/* Text at the top */}
                    <span className="absolute top-5 left-5 text-white font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                        Deliver
                    </span>

                    {/* Image centered */}
                    <img
                        src={deliver}
                        alt="Cube"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[157.94px] h-[188.36px] object-contain"
                    />

                    <span className="absolute  text-[#5C5D5E] bottom-5 left-5  font-geist text-[14.1px] leading-[16.9px] tracking-[-0.28px]">
                       Everything’s in your hands: a sharp brand, clear tools, <br />
and the confidence to launch fast.
                    </span>
                </div>

            </div>
        </section>
    );
}
