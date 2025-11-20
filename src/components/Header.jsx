export default function Header() {
  return (
    <header className="w-full py-6 relative z-50">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Left side: Brand */}
        <span className="font-inter text-[18px] text-[#E3E3FD] tracking-[0.2px] cursor-default select-none">
          Branded Objects
        </span>

        {/* Right side: Navigation */}
        <nav className="flex gap-6">
        </nav>
      </div>
    </header>
  );
}
