export default function WaitlistFooter() {
    return (
        <footer className="w-full py-20 px-6 border-t border-white/5 mt-0 bg-[#050505]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="max-w-lg">
                    <p className="font-inter-light text-[#E3E3FD]/60 text-sm leading-relaxed mb-8">
                        Branded Objects lets studios create custom, locked-down design tools that help clients make their own on-brand graphics with AI without ever breaking the brand.
                    </p>
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="font-mono text-white text-xs tracking-widest uppercase">Operational</span>
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-4">
                     <span className="font-mono text-[#E3E3FD]/20 text-[10px] tracking-[0.2em] uppercase">© 2025 Branded Objects</span>
                     <span className="font-mono text-[#E3E3FD]/20 text-[10px] tracking-[0.2em] uppercase">San Francisco / London</span>
                </div>
            </div>
        </footer>
    )
}
