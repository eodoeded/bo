import { motion } from 'framer-motion';

// Constants & Styles
const BLUE = '#1C3F94'; // Cambridge Blue-ish / Deep Lab Blue
const RED = '#C8372D';
const CREAM = '#F4F4F0';
const DARK_TEXT = '#1A1A1A';

// Icons
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Layout Components
const GridLines = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {/* Vertical Guides */}
        <div className="absolute left-[6%] top-0 bottom-0 w-px border-l border-dashed border-[#1C3F94]/30 md:left-[12%]" />
        <div className="absolute right-[6%] top-0 bottom-0 w-px border-r border-dashed border-[#1C3F94]/30 md:right-[12%]" />
        
        {/* Horizontal Guide - Hero Bottom */}
        <div className="absolute top-[85vh] left-0 right-0 h-px border-b border-dashed border-[#C8372D]/40" />
    </div>
);

const Nav = () => (
  <nav className="w-full py-6 px-6 md:px-[12%] flex justify-between items-center bg-[#F4F4F0] relative z-50">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 bg-[#C8372D] rounded-full flex items-center justify-center text-white font-serif italic font-bold text-xl">
         E
       </div>
       <span className="font-serif text-2xl text-[#1A1A1A] tracking-tight font-semibold">Ethicronics</span>
    </div>
    
    <div className="hidden md:flex gap-8 font-mono text-xs font-medium tracking-wide text-[#1A1A1A]/80 uppercase">
      <a href="#" className="hover:text-[#1C3F94] transition-colors">Home</a>
      <a href="#" className="hover:text-[#1C3F94] transition-colors">Technology</a>
      <a href="#" className="hover:text-[#1C3F94] transition-colors">About</a>
      <a href="#" className="hover:text-[#1C3F94] transition-colors">Blog</a>
    </div>

    <button className="bg-[#1C3F94] text-white px-6 py-2 font-mono text-xs uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors">
      Contact Us
    </button>
  </nav>
);

const Hero = () => (
    <section className="relative w-full min-h-[85vh] md:h-[85vh] overflow-hidden flex flex-col md:block">
        {/* Background Image/Texture - Adjusted for mobile stacking vs desktop positioning */}
        <div className="relative md:absolute inset-0 bg-[#E3E8F0] h-[50vh] md:h-full">
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: `repeating-linear-gradient(45deg, ${BLUE} 0, ${BLUE} 1px, transparent 0, transparent 50%)`, backgroundSize: '10px 10px' }} />
            {/* Lab overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#E3E8F0] via-transparent to-[#1C3F94]/10" />
            
            {/* Abstract Graphic */}
            <div className="absolute right-0 top-0 w-full md:w-2/3 h-full">
                 <img 
                    src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2070" 
                    alt="Lab Environment" 
                    className="w-full h-full object-cover object-top opacity-80 mix-blend-multiply grayscale contrast-125"
                 />
            </div>
        </div>

        {/* Content Box - Stacked on mobile, Floating absolute on desktop */}
        <div className="relative md:absolute md:top-1/2 md:-translate-y-1/2 left-0 md:left-[12%] z-10 w-full md:max-w-xl bg-white p-8 md:p-12 shadow-none md:shadow-2xl border-t border-b md:border border-[#1C3F94]/10 -mt-12 md:mt-0">
            <h1 className="font-serif text-4xl md:text-6xl text-[#1A1A1A] leading-[1.1] mb-6">
                Hardware Security<br/>Starts in Design
            </h1>
            <p className="font-sans text-base md:text-lg text-[#1A1A1A]/80 leading-relaxed mb-8">
                Ethicronics builds verifiable, tamper-proof hardware systems that secure the world's devices from the inside out.
            </p>
            <div className="flex gap-4">
                <button className="bg-[#1C3F94] text-white px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors">
                    Contact Us
                </button>
                <button className="border border-[#1C3F94] text-[#1C3F94] px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-[#F4F4F0] transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    </section>
);

const Partners = () => (
    <section className="py-16 md:py-24 px-6 md:px-[12%] bg-[#F4F4F0] text-center border-b border-dashed border-[#1C3F94]/20">
        <h3 className="font-serif text-3xl italic text-[#1A1A1A] mb-12 md:mb-16 underline decoration-[#C8372D] decoration-2 underline-offset-8">Our Partners</h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-24 opacity-60 grayscale mix-blend-multiply">
            {['Gravity', 'Pax', 'Clover', 'Quantic', 'Smile'].map((logo, i) => (
                <span key={i} className="font-sans text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tighter">{logo}</span>
            ))}
        </div>
    </section>
);

const BlogCard = ({ title, desc, tag }) => (
    <div className="bg-white border border-[#1A1A1A]/10 hover:border-[#1C3F94] transition-colors group cursor-pointer">
        <div className="aspect-[4/3] bg-[#E3E8F0] overflow-hidden relative">
             <div className="absolute inset-0 bg-[#1C3F94]/5 mix-blend-multiply" />
             <img 
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" 
                alt="Lab" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[50%]" 
             />
        </div>
        <div className="p-6 md:p-8">
            <div className="mb-4">
                <span className="inline-block px-2 py-1 border border-[#C8372D]/30 text-[#C8372D] font-mono text-[10px] uppercase tracking-widest">
                    {tag}
                </span>
            </div>
            <h4 className="font-serif text-xl md:text-2xl text-[#1A1A1A] leading-tight mb-4 group-hover:text-[#1C3F94] transition-colors">
                {title}
            </h4>
            <p className="font-sans text-sm text-[#1A1A1A]/60 leading-relaxed mb-6">
                {desc}
            </p>
            <span className="text-[#1C3F94] font-mono text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Post ->
            </span>
        </div>
    </div>
);

const Blog = () => (
    <section className="py-16 md:py-24 px-6 md:px-[12%] bg-[#F4F4F0] relative">
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className="flex justify-between items-end mb-12 md:mb-16 relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A]">Latest Insights</h2>
            <a href="#" className="hidden md:flex items-center justify-center w-12 h-12 bg-[#1C3F94] text-white hover:bg-[#1A1A1A] transition-colors">
                <ArrowRight />
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <BlogCard 
                title="AI Phone Answering for Restaurants: 7 Proven Use Cases for 2025"
                desc="These days, it's hard to find a person who doesn't use AI. Given its ubiquity, what is Ethicronics' stance on automated integrity?"
                tag="Artificial Intelligence"
            />
            <BlogCard 
                title="Securing the Supply Chain: A New Protocol for Global Trade"
                desc="It's been a busy year at Ethicronics. So, we decided to take a moment to reflect. A university spin-out transforming hardware trust."
                tag="Supply Chain"
            />
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-[#1A1A1A] text-[#F4F4F0] py-16 md:py-20 px-6 md:px-[12%] border-t-4 border-[#C8372D]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
                <h2 className="font-serif text-3xl mb-6">Ethicronics</h2>
                <p className="font-mono text-sm opacity-60 max-w-xs leading-relaxed">
                    Cambridge-based hardware security. <br/>
                    Verifiable trust for the silicon age.
                </p>
            </div>
            <div>
                <h4 className="font-mono text-xs uppercase text-[#C8372D] tracking-widest mb-6">Platform</h4>
                <ul className="space-y-3 font-serif text-lg opacity-80">
                    <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Fabrication</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Monitoring</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-mono text-xs uppercase text-[#C8372D] tracking-widest mb-6">Connect</h4>
                <ul className="space-y-3 font-serif text-lg opacity-80">
                    <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
                </ul>
            </div>
        </div>
        <div className="mt-12 md:mt-20 pt-8 border-t border-[#F4F4F0]/10 flex flex-col md:flex-row justify-between items-center font-mono text-xs opacity-40 uppercase tracking-widest gap-4 md:gap-0">
            <span>© 2025 Ethicronics Ltd.</span>
            <span>Cambridge, UK</span>
        </div>
    </footer>
);

export default function Ethicronics() {
  return (
    <div className="w-full min-h-screen bg-[#F4F4F0] text-[#1A1A1A] selection:bg-[#C8372D] selection:text-white font-sans relative">
      <GridLines />
      <Nav />
      <Hero />
      <Partners />
      <Blog />
      <Footer />
    </div>
  );
}
