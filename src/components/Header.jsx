export default function Header() {
  return (
    <header className="w-full py-4">
      <div className="mx-auto max-w-[1100px] px-4 flex items-center justify-between">
        {/* Left side: Brand */}
        <h1 className="font-inter text-[25.23px] text-[#E3E3FD]">
          Branded Objects
        </h1>

        {/* Right side: Link */}
        <nav>
          <a
            href="#services"
            className="font-inter text-[13.89px] text-white "
          >
            Services
          </a>
        </nav>
      </div>
    </header>
  );
}
