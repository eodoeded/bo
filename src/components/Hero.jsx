import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";

export default function Hero() {
  return (
    <section className="w-full py-16 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Top image */}
        <img
          src={upComp}
          alt="Top Component"
          className="w-[279px] -mb-5 h-[148px] object-contain"
        />

        {/* Bottom image */}
        <img
          src={bottomComp}
          alt="Bottom Component"
          className="w-[500.5px] h-[415.8px] object-contain mt-4"
        />
      </div>
    </section>
  );
}
