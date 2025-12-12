import { Link } from 'react-router-dom';

export default function WaitlistFooter() {
    const scrollToTop = () => {
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => emailInput.focus(), 500);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="w-full border-t border-white/10 bg-[#020202] relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-5">
                        <h3 className="font-mono text-lg tracking-widest text-white mb-6 uppercase">[ BRANDED OBJECTS ]</h3>
                        <p className="font-montreal text-white/60 text-sm max-w-md leading-relaxed mb-8">
                            A modular design system for automated brand governance. Empowering studios to create custom tools for their clients.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#E3E3FD] rounded-full animate-pulse"></div>
                            <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">All Systems Operational</span>
                        </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 md:col-start-8 space-y-6">
                         <h4 className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Platform</h4>
                         <ul className="space-y-3 font-mono text-xs text-white/60">
                            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-white/20 group-hover:bg-[#E3E3FD] transition-colors"></span>
                                <Link to="/brandguidelines" className="hover:text-white transition-colors">System Guidelines</Link>
                            </li>
                            <li onClick={scrollToTop} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-white/20 group-hover:bg-[#E3E3FD] transition-colors"></span>
                                Request Access
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <h4 className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Connect</h4>
                        <div className="flex flex-col gap-3">
                            <a href="https://www.linkedin.com/company/108913089/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                                <span className="font-mono text-xs text-[#E3E3FD] group-hover:text-white transition-colors">[ LINKEDIN ]</span>
                            </a>
                             <a href="mailto:brandedobjects@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                                <span className="font-mono text-xs text-[#E3E3FD] group-hover:text-white transition-colors">[ EMAIL ]</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">© 2025 Branded Objects Systems</span>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        {/* Legal links removed per request for simplicity/functionality */}
                    </div>
                </div>
            </div>
        </footer>
    )
}
