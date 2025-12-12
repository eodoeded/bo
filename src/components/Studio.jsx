import { motion } from 'framer-motion';
import { 
    Type, Image as ImageIcon, Sparkles, Layers, 
    Settings, Download, ChevronRight, Maximize2, 
    Move, Sliders, Box, Grid, Monitor, Eye,
    MousePointer, Hand, ZoomIn, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight,
    Bold, Italic, Underline, MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const Badge = ({ children, active = false, className = "" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-[1px] border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-white/5 text-white/40 border-white/10'} ${className}`}>
        {children}
    </span>
);

const IconButton = ({ icon: Icon, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`p-2 border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white'} transition-colors rounded-[1px]`}
    >
        <Icon size={14} />
    </button>
);

const Ruler = ({ orientation = 'horizontal' }) => (
    <div className={`absolute bg-[#050505] border-white/10 z-10 ${orientation === 'horizontal' ? 'top-0 left-0 right-0 h-6 border-b flex items-end' : 'top-0 left-0 bottom-0 w-6 border-r flex flex-col items-end'}`}>
        {Array.from({ length: orientation === 'horizontal' ? 50 : 30 }).map((_, i) => (
            <div 
                key={i} 
                className={`bg-white/20 ${orientation === 'horizontal' ? 'w-px h-full mr-4' : 'h-px w-full mb-4'} ${i % 5 === 0 ? 'bg-white/40' : ''}`}
                style={{ 
                    height: orientation === 'horizontal' ? (i % 5 === 0 ? '100%' : '30%') : undefined,
                    width: orientation === 'vertical' ? (i % 5 === 0 ? '100%' : '30%') : undefined
                }}
            />
        ))}
    </div>
);

export default function Studio() {
    const [activeTab, setActiveTab] = useState('ai');
    const [selectedTool, setSelectedTool] = useState('select');
    
    return (
        <div className="min-h-screen bg-[#020202] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-black">
            
            {/* Top Bar */}
            <header className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#050505] relative z-20">
                <div className="flex items-center gap-6">
                    <Link to="/" className="font-mono text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                        <ArrowLeftIcon />
                        <span>Back</span>
                    </Link>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">Untitled_Project_01</span>
                        <Badge>Draft</Badge>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-[#0A0A0A] border border-white/5 p-1 rounded-[2px]">
                        <IconButton icon={Undo} />
                        <IconButton icon={Redo} />
                    </div>
                    <button className="px-4 py-1.5 bg-[#E3E3FD] text-black font-mono text-[10px] uppercase tracking-widest rounded-[1px] hover:bg-white transition-colors font-semibold">
                        Publish
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 grid grid-cols-12 h-[calc(100vh-3rem)]">
                
                {/* Left Panel: Assets & Layers */}
                <aside className="col-span-2 border-r border-white/10 bg-[#050505] flex flex-col">
                    {/* Tabs */}
                    <div className="grid grid-cols-2 border-b border-white/10">
                        <button className="py-3 font-mono text-[9px] uppercase tracking-widest text-[#E3E3FD] border-b border-[#E3E3FD] bg-[#E3E3FD]/5">Assets</button>
                        <button className="py-3 font-mono text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Layers</button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="p-4 space-y-6">
                            
                            {/* AI Generation */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Generative</span>
                                    <Badge active>Beta</Badge>
                                </div>
                                <button className="w-full aspect-video border border-dashed border-white/20 rounded-sm flex flex-col items-center justify-center gap-2 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-all group">
                                    <Sparkles size={16} className="text-white/40 group-hover:text-[#E3E3FD]" />
                                    <span className="font-mono text-[9px] text-white/40 group-hover:text-[#E3E3FD] uppercase tracking-widest">Generate New</span>
                                </button>
                            </div>

                            {/* Asset Grid */}
                            <div>
                                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-3">Library</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="aspect-square bg-[#0A0A0A] border border-white/10 relative group hover:border-white/30 cursor-pointer">
                                            <Corner className="top-0 left-0 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <Corner className="bottom-0 right-0 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center text-white/10 font-mono text-[8px]">IMG_{i}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>

                {/* Center: Canvas Area */}
                <main className="col-span-7 bg-[#020202] relative flex flex-col overflow-hidden">
                    
                    {/* Toolbar */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#050505] border border-white/10 p-1 flex items-center gap-1 rounded-[2px] shadow-xl">
                        <IconButton icon={MousePointer} active={selectedTool === 'select'} onClick={() => setSelectedTool('select')} />
                        <IconButton icon={Hand} active={selectedTool === 'pan'} onClick={() => setSelectedTool('pan')} />
                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                        <IconButton icon={Type} active={selectedTool === 'text'} onClick={() => setSelectedTool('text')} />
                        <IconButton icon={ImageIcon} active={selectedTool === 'image'} onClick={() => setSelectedTool('image')} />
                        <IconButton icon={Box} active={selectedTool === 'shape'} onClick={() => setSelectedTool('shape')} />
                    </div>

                    {/* Canvas Wrapper */}
                    <div className="flex-1 relative overflow-hidden bg-[#080808]">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ 
                            backgroundImage: 'radial-gradient(circle, #E3E3FD 1px, transparent 1px)', 
                            backgroundSize: '20px 20px' 
                        }}></div>
                        
                        {/* Rulers */}
                        <Ruler orientation="horizontal" />
                        <Ruler orientation="vertical" />

                        {/* Viewport */}
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative w-[400px] h-[500px] bg-white shadow-2xl group"
                            >
                                {/* Active Selection Overlay */}
                                <div className="absolute -inset-[1px] border border-[#E3E3FD] z-20 pointer-events-none">
                                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    
                                    <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5 flex items-center gap-2">
                                        <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">Artboard_1</span>
                                        <span className="font-mono text-[8px] text-black/60">1080x1350</span>
                                    </div>
                                </div>

                                {/* Content Simulation */}
                                <div className="w-full h-full bg-[#E3E3FD] p-8 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8">
                                        <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center animate-spin-slow">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                        </div>
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <h1 className="font-montreal text-6xl font-medium leading-[0.8] tracking-tighter text-black mb-4">
                                            VISUAL<br/>SYSTEM
                                        </h1>
                                        <p className="font-mono text-[10px] text-black/60 uppercase tracking-widest max-w-[200px]">
                                            Automated brand governance for the modern studio.
                                        </p>
                                    </div>

                                    <div className="relative z-10 border-t border-black pt-4 flex justify-between items-end">
                                        <div className="font-mono text-[9px] text-black/60">FIG. 01</div>
                                        <div className="font-mono text-[9px] text-black/60">2025</div>
                                    </div>

                                    {/* Grain Overlay */}
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply pointer-events-none"></div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#050505] border border-white/10 p-1 rounded-[2px]">
                            <IconButton icon={ZoomIn} />
                            <span className="font-mono text-[10px] text-white px-2">100%</span>
                        </div>
                    </div>
                </main>

                {/* Right Panel: Properties */}
                <aside className="col-span-3 border-l border-white/10 bg-[#050505] flex flex-col">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Properties</span>
                        <Settings size={12} className="text-white/40" />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                        
                        {/* Layout Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Dimensions</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex items-center gap-2 group hover:border-white/30 transition-colors">
                                    <span className="font-mono text-[9px] text-white/30">W</span>
                                    <input type="text" value="1080" className="bg-transparent font-mono text-[10px] text-white w-full focus:outline-none" />
                                </div>
                                <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex items-center gap-2 group hover:border-white/30 transition-colors">
                                    <span className="font-mono text-[9px] text-white/30">H</span>
                                    <input type="text" value="1350" className="bg-transparent font-mono text-[10px] text-white w-full focus:outline-none" />
                                </div>
                                <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex items-center gap-2 group hover:border-white/30 transition-colors">
                                    <span className="font-mono text-[9px] text-white/30">X</span>
                                    <input type="text" value="0" className="bg-transparent font-mono text-[10px] text-white w-full focus:outline-none" />
                                </div>
                                <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex items-center gap-2 group hover:border-white/30 transition-colors">
                                    <span className="font-mono text-[9px] text-white/30">Y</span>
                                    <input type="text" value="0" className="bg-transparent font-mono text-[10px] text-white w-full focus:outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Typography Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Typography</span>
                            </div>
                            <div className="bg-[#0A0A0A] border border-white/10 p-2 space-y-2">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="font-montreal text-xs text-white">PP Neue Montreal</span>
                                    <ChevronRight size={10} className="text-white/40 rotate-90" />
                                </div>
                                <div className="flex gap-1">
                                    <IconButton icon={AlignLeft} active />
                                    <IconButton icon={AlignCenter} />
                                    <IconButton icon={AlignRight} />
                                    <div className="w-px h-full bg-white/10 mx-1"></div>
                                    <IconButton icon={Bold} />
                                    <IconButton icon={Italic} />
                                    <IconButton icon={Underline} />
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[8px] text-white/40">SIZE</span>
                                        <span className="font-mono text-[10px] text-white">64px</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[8px] text-white/40">LEADING</span>
                                        <span className="font-mono text-[10px] text-white">0.9</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Effects Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Effects</span>
                                <IconButton icon={MoreHorizontal} />
                            </div>
                            
                            <div className="bg-[#0A0A0A] border border-white/10 p-3 space-y-3 relative overflow-hidden group">
                                <Corner className="top-0 left-0 border-t border-l" />
                                <Corner className="bottom-0 right-0 border-b border-r" />
                                
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] text-white">Dither</span>
                                    <div className="w-8 h-4 bg-[#E3E3FD] rounded-full relative cursor-pointer">
                                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[8px] font-mono text-white/40">
                                        <span>INTENSITY</span>
                                        <span>80%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[80%] bg-[#E3E3FD]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="p-4 border-t border-white/10">
                        <button className="w-full py-3 border border-white/20 hover:border-[#E3E3FD] hover:text-[#E3E3FD] transition-all group flex items-center justify-center gap-2 bg-white/5">
                            <Download size={14} className="group-hover:animate-bounce" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Export Asset</span>
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

// Simple internal icon wrapper for the back button
const ArrowLeftIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
);
