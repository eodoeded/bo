import upComp from "../assets/up-comp.png";
import bottomComp from "../assets/bottom-comp.png";
import core1 from "../assets/core1.png";
import legs1 from "../assets/legs1.png";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const slides = [
  {
    id: 0,
    label: "BOSTON DYNAMICS SPOT",
    bottomImg: bottomComp,
    upImg: upComp,
    // Increased width of top image by ~50% (130px -> 200px / 220px -> 330px)
    bottomWidth: "w-[200px] md:w-[320px]",
    upWidth: "w-[280px] md:w-[480px]",
    // Adjusted offset for larger top - brought closer to body (reduced negative offset)
    upOffset: "-top-8 md:-top-10",
    // Animation variants for Spot
    bottomAnimate: { y: [0, -8, 0] },
    upAnimate: { y: [0, -10, 0] }
  },
  {
    id: 1,
    label: "KEN ISAACS 9x9 MICROHOUSE",
    bottomImg: legs1,
    upImg: core1,
    // Increased width of top image by ~3x (220px -> 660px / 420px -> 1200px is too big, scaling logically to be DOMINANT)
    // Let's make it significantly larger than the legs to match request "top pod part should be 3x bigger comparitively"
    bottomWidth: "w-[280px] md:w-[320px]", 
    // Use max-w-none to break out of container constraints and ensure it's ACTUALLY 2x bigger
    upWidth: "w-[250px] md:w-[400px] max-w-none", 
    upOffset: "-top-28 md:-top-48 -ml-2 md:-ml-5", // Move UP more and LEFT slightly
    // Float feel
    bottomAnimate: { y: [0, -6, 0] },
    upAnimate: { y: [0, -12, 0] }
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-start relative pt-12 md:pt-16 px-6 md:px-0 overflow-hidden">
      {/* Subtle breathing overlay to enrich the base gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, rgba(18,17,13,0) 0%, rgba(28,26,20,0.18) 100%)' }}
        initial={{ opacity: 0.0, y: 0 }}
        animate={{ opacity: [0.0, 0.12, 0.0], y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Carousel Container - Reduced Fixed Height to bring text closer */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center mb-2 md:mb-6 h-[300px] md:h-[400px]">
        
        {/* Navigation Arrows */}
        <button 
            onClick={prevSlide}
            className="absolute left-0 md:left-12 z-20 p-4 text-white/20 hover:text-white transition-colors cursor-pointer hidden md:block top-1/2 -translate-y-1/2"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M15 18l-6-6 6-6" />
            </svg>
        </button>

        <button 
            onClick={nextSlide}
            className="absolute right-0 md:right-12 z-20 p-4 text-white/20 hover:text-white transition-colors cursor-pointer hidden md:block top-1/2 -translate-y-1/2"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M9 18l6-6-6-6" />
            </svg>
        </button>

        {/* Image Slide Area (Centered Vertically) */}
        <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={slide.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -50 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex justify-center items-center"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Bottom Part (Legs/Base) */}
                        <motion.div
                            className="relative" style={{ willChange: "transform" }}
                            animate={slide.bottomAnimate}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
                        >
                            <img
                                src={slide.bottomImg} 
                                alt="Base component"
                                className={`relative z-0 object-contain ${slide.bottomWidth}`}
                                style={{ aspectRatio: 'auto' }}
                            />
                        </motion.div>

                        {/* Top Part (Core/Upper) */}
                        <motion.div
                            className={`absolute left-1/2 -translate-x-1/2 ${slide.upOffset}`} 
                            style={{ willChange: "transform" }}
                            animate={slide.upAnimate}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                        >
                            <img
                                src={slide.upImg} 
                                alt="Core component"
                                className={`object-contain ${slide.upWidth}`}
                                style={{ aspectRatio: 'auto' }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Label - Positioned Absolute Bottom of Container */}
        <div className="absolute bottom-2 md:bottom-4 z-10 w-full text-center">
             <AnimatePresence mode="wait">
                <motion.p 
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-inter-light text-[10px] md:text-[11px] tracking-[0.25em] text-[#E3E3FD]/40 uppercase whitespace-nowrap"
                >
                    {slide.label}
                </motion.p>
             </AnimatePresence>
        </div>

        {/* Mobile Arrows (Bottom, below label) */}
        <div className="absolute bottom-0 flex gap-8 md:hidden z-20">
             <button onClick={prevSlide} className="p-2 text-white/20 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6" /></svg></button>
             <button onClick={nextSlide} className="p-2 text-white/20 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6" /></svg></button>
        </div>

      </div>

      {/* Main Content - Centered below carousel */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-0">
        <motion.h2
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: 18 },
            show: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.55, delay: 1.0, ease: [0.2, 0.8, 0.2, 1] }
            }
          }}
          className="font-inter-light text-white text-[32px] leading-[38px] md:text-[48px] md:leading-[56px] tracking-[0.2px] mb-8 md:mb-10"
          style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}
        >
          <motion.span className="block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>Make complex products simple</motion.span>
          <motion.span className="block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>to <span className="text-[#E3E3FD]">understand.</span></motion.span>
        </motion.h2>
        
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 1.45, ease: [0.2, 0.8, 0.2, 1] }}>
          <motion.button
            type="button"
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap="hover"
            data-cal-link="branded-objects-nro6hy/15min"
            data-cal-namespace="15min"
            data-cal-config='{"layout":"month_view","theme":"dark"}'
            variants={{ rest: { color: "#E3E3FD", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }, hover: { color: "#FFFFFF", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } }}
            className="
              group font-inter-light text-[#E3E3FD] text-[14px]
              bg-[#3B3B3B] cursor-pointer
              border-[1px] border-[#FFFFFF4D]
              backdrop-blur-[6.5px]
              px-[16px] py-[8px]
              flex items-center
            "
          >
            Let's talk
            <motion.span variants={{ rest: { x: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }, hover: { x: 4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } }} className="ml-2 inline-block">→</motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
