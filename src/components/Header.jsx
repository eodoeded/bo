export default function Header() {
  return (
    <header className="w-full py-6 relative z-50">
      <div className="w-full max-w-7xl mx-auto px-16 flex items-center justify-between">
        {/* Left side: Brand */}
        <h1 className="font-inter font-light text-[24px] text-white">
          Branded Objects
        </h1>

        {/* Right side: Link */}
        <nav>
          <a
            href="#services"
            className="font-inter font-light text-[16px] text-white"
          >
            Services
          </a>
        </nav>
      </div>
    </header>
  );
}
