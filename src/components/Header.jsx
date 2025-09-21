export default function Header() {
  return (
    <header className="w-full py-6 relative z-50">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center justify-between">
        {/* Left side: Brand */}
        <h1 className="font-inter-light text-[18px] text-[#E3E3FD] tracking-[1.0px]">
          Branded Objects
        </h1>

        {/* Right side: Work */}
        <nav>
          <a
            href="#work"
            className="font-inter-light text-[16px] text-[#E3E3FD] tracking-[1.0px]"
          >
            Work
          </a>
        </nav>
      </div>
    </header>
  );
}
