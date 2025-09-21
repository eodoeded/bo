export default function Header() {
  return (
    <header className="w-full py-4 relative z-50">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center justify-between">
        {/* Left side: Brand */}
        <h1 className="font-inter-light text-[20px] text-[#E3E3FD] tracking-[1.5px]">
          Branded Objects
        </h1>

        {/* Right side: Link */}
        <nav>
          <a
            href="#services"
            className="font-inter-light text-[14px] text-white"
          >
            Services
          </a>
        </nav>
      </div>
    </header>
  );
}
