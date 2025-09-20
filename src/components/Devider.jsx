export default function Divider() {
    return (
        <section className="w-full py-16 pb-26 flex flex-col items-center justify-center gap-8">
            {/* Phrase */}
            <h2
                className="
          font-inter text-center
          text-[48px] leading-[57.6px] tracking-[-1.92px]
          text-white
        "
            >
                Make complex products simple <br />
                to <span className="text-[#E3E3FD]">understand.</span>
            </h2>

            {/* Button */}
            <button
                className="
          font-inter text-[#E3E3FD]
          bg-[#3B3B3B] cursor-pointer
           border-[0.8px] border-[#FFFFFF4D]
          backdrop-blur-[6.5px]
          px-[29px] py-[15px]
          
        "
            >
            Let’s talk →

            </button>
        </section>
    );
}
