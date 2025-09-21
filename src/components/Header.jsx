export default function Header() {
  return (
    <header className="w-full py-6 relative z-50">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center justify-between">
        {/* Left side: Brand */}
        <h1 className="font-inter text-[18px] text-[#E3E3FD] tracking-[0.2px]">
          Branded Objects
        </h1>

        {/* Right side: Work */}
        <nav>
          <a
            href="#services"
            className="font-inter text-[14px] text-white tracking-[0.2px] transition-opacity hover:opacity-75"
          >
            Services
          </a>
        </nav>
      </div>
    </header>
  );
}
