import { motion } from 'framer-motion';
import { 
    Type, Image as ImageIcon, Sparkles, Layers, 
    Settings, Download, ChevronRight, Maximize2, 
    Move, Sliders, Box, Grid, Monitor, Eye,
    MousePointer, Hand, ZoomIn, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight,
    Bold, Italic, Underline, MoreHorizontal,
    Check
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
    const [activeTab, setActiveTab] = useState('components');
    const [selectedTool, setSelectedTool] = useState('select');
    const [canvasText, setCanvasText] = useState("THE HODLER");
    const [width, setWidth] = useState("1080");
    const [height, setHeight] = useState("1350");
    const [ditherIntensity, setDitherIntensity] = useState(80);
    
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
                        <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">BrandForge <span className="text-white/40">//</span> CONFIGURATOR</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-[#E3E3FD] text-black font-mono text-[9px] uppercase tracking-widest rounded-[1px]">Studio</button>
                        <button className="px-3 py-1 bg-transparent text-white/40 hover:text-white font-mono text-[9px] uppercase tracking-widest transition-colors">Client</button>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
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
                
                {/* Left Panel: Components & Layers */}
                <aside className="col-span-2 border-r border-white/10 bg-[#050505] flex flex-col">
                    {/* Tabs */}
                    <div className="grid grid-cols-2 border-b border-white/10">
                        <button 
                            onClick={() => setActiveTab('components')}
                            className={`py-3 font-mono text-[9px] uppercase tracking-widest transition-colors ${activeTab === 'components' ? 'text-[#E3E3FD] border-b border-[#E3E3FD] bg-[#E3E3FD]/5' : 'text-white/40 hover:text-white'}`}
                        >
                            Components
                        </button>
                        <button 
                            onClick={() => setActiveTab('layers')}
                            className={`py-3 font-mono text-[9px] uppercase tracking-widest transition-colors ${activeTab === 'layers' ? 'text-[#E3E3FD] border-b border-[#E3E3FD] bg-[#E3E3FD]/5' : 'text-white/40 hover:text-white'}`}
                        >
                            Layers
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {activeTab === 'components' ? (
                            <div className="p-4 space-y-6">
                                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Explore Components</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={() => setSelectedTool('text')} className={`flex flex-col items-center justify-center p-3 border ${selectedTool === 'text' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                        <Type size={16} className={selectedTool === 'text' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">Text</span>
                                    </button>
                                    <button onClick={() => setSelectedTool('image')} className={`flex flex-col items-center justify-center p-3 border ${selectedTool === 'image' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                        <ImageIcon size={16} className={selectedTool === 'image' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">Image</span>
                                    </button>
                                    <button onClick={() => setSelectedTool('ai')} className={`flex flex-col items-center justify-center p-3 border ${selectedTool === 'ai' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                        <Sparkles size={16} className={selectedTool === 'ai' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">AI Gen</span>
                                    </button>
                                </div>

                                <div className="p-4 border border-white/10 bg-[#0A0A0A]">
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-2">Canvas Spec</span>
                                    <div className="flex gap-2 mb-2">
                                         <div className="flex-1 bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                            <span className="font-mono text-[9px] text-white/40">W</span>
                                            <span className="font-mono text-[9px] text-[#E3E3FD]">1080</span>
                                         </div>
                                         <div className="flex-1 bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                            <span className="font-mono text-[9px] text-white/40">H</span>
                                            <span className="font-mono text-[9px] text-[#E3E3FD]">1350</span>
                                         </div>
                                    </div>
                                    <div className="w-full bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                        <span className="font-mono text-[9px] text-white/40">BG</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#1C3A96]"></div>
                                            <span className="font-mono text-[9px] text-white/60">#1C3A96</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-2 space-y-1">
                                {['AI Canvas', 'The Hodler', 'Image/Frame', 'Overlay_01', 'Signature'].map((layer, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-3 border ${i === 0 ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-transparent hover:bg-white/5'} transition-colors rounded-sm cursor-pointer group`}>
                                        <Layers size={14} className={i === 0 ? 'text-[#E3E3FD]' : 'text-white/40 group-hover:text-white'} />
                                        <span className={`font-mono text-[10px] uppercase tracking-widest ${i === 0 ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{layer}</span>
                                        {i === 0 && <div className="ml-auto w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>}
                                    </div>
                                ))}
                            </div>
                        )}
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
                                className="relative w-[380px] h-[500px] bg-[#1C3A96] shadow-2xl group"
                            >
                                {/* Active Selection Overlay */}
                                <div className="absolute top-8 left-8 right-8 bottom-24 border border-[#E3E3FD] z-20 pointer-events-none">
                                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                    
                                    <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5 flex items-center gap-2">
                                        <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">AI_Canvas</span>
                                    </div>
                                </div>

                                {/* Content Simulation */}
                                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                                    <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
                                        {/* Placeholder for Bear Illustration */}
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
                                        <div className="text-[#1C3A96] w-full h-full p-4 flex flex-col items-center justify-center border-4 border-[#1C3A96]/10">
                                            <div className="w-48 h-48 border-2 border-[#1C3A96] rounded-full flex items-center justify-center mb-4 relative">
                                                <div className="absolute inset-0 border border-[#1C3A96] rounded-full scale-110 opacity-30"></div>
                                                <Sparkles size={48} strokeWidth={1} />
                                            </div>
                                            <div className="h-1 w-24 bg-[#1C3A96]/20"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 w-full text-center">
                                    <h2 className="font-serif text-3xl text-white tracking-wider">{canvasText}</h2>
                                </div>
                            </motion.div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#050505] border border-white/10 p-1 rounded-[2px]">
                            <IconButton icon={ZoomIn} />
                            <span className="font-mono text-[10px] text-white px-2">100%</span>
                        </div>
                        
                        {/* Viewport Info */}
                        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest">
                            VP: 380x500 // ZOOM: 100%
                        </div>
                    </div>
                </main>

                {/* Right Panel: Specifications */}
                <aside className="col-span-3 border-l border-white/10 bg-[#050505] flex flex-col">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Specifications</span>
                        <Maximize2 size={12} className="text-white/40" />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                        
                        {/* Prompt Template */}
                        <div>
                            <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest block mb-4">Prompt Template</span>
                            <div className="bg-[#0A0A0A] border border-white/10 p-4 font-mono text-xs text-white/60 leading-relaxed relative group">
                                <Corner className="top-0 left-0 border-t border-l" />
                                <Corner className="bottom-0 right-0 border-b border-r" />
                                <p>
                                    A mystical tarot card illustration of <span className="text-[#E3E3FD]">{'{subject}'}</span>, high contrast, black and white ink drawing, woodcut style, esoteric symbols, white background, clean lines. No text!.
                                </p>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="w-1 h-4 bg-white/10"></span>
                                <span className="font-mono text-[9px] text-white/40">Variable: <span className="text-[#E3E3FD]">{'{subject}'}</span></span>
                            </div>
                        </div>

                        {/* Processing Unit */}
                        <div>
                            <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest block mb-4">Processing Unit</span>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Filter</label>
                                    <div className="bg-[#0A0A0A] border border-white/10 px-3 py-2 flex justify-between items-center">
                                        <span className="font-mono text-[10px] text-white">Threshold</span>
                                        <Sliders size={10} className="text-white/40" />
                                    </div>
                                </div>
                                <div>
                                    <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Blend Mode</label>
                                    <div className="bg-[#0A0A0A] border border-white/10 px-3 py-2 flex justify-between items-center">
                                        <span className="font-mono text-[10px] text-white">Screen</span>
                                        <ChevronRight size={10} className="text-white/40 rotate-90" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 border border-[#E3E3FD]/20 bg-[#E3E3FD]/5">
                                <div className="w-3 h-3 bg-[#E3E3FD] flex items-center justify-center">
                                    <Check size={10} className="text-black" />
                                </div>
                                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Allow Client Modification</span>
                            </div>
                        </div>

                        {/* Border Style */}
                        <div>
                             <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Border Style</span>
                             <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Width</label>
                                    <input type="number" defaultValue="1" className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-[#E3E3FD]" />
                                </div>
                                <div>
                                    <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Radius</label>
                                    <input type="number" defaultValue="8" className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-[#E3E3FD]" />
                                </div>
                                <div>
                                    <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Color</label>
                                    <div className="w-full h-[26px] bg-[#1C3A96] border border-white/10"></div>
                                </div>
                             </div>
                        </div>
                        
                        {/* Transform */}
                         <div>
                             <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Transform</span>
                             <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                                    <span className="font-mono text-[9px] text-white/30 w-6">X</span>
                                    <span className="font-mono text-[10px] text-white">35</span>
                                </div>
                                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                                    <span className="font-mono text-[9px] text-white/30 w-6">Y</span>
                                    <span className="font-mono text-[10px] text-white">87</span>
                                </div>
                                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                                    <span className="font-mono text-[9px] text-white/30 w-6">W</span>
                                    <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full bg-transparent font-mono text-[10px] text-white focus:outline-none" />
                                </div>
                                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                                    <span className="font-mono text-[9px] text-white/30 w-6">H</span>
                                    <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-transparent font-mono text-[10px] text-white focus:outline-none" />
                                </div>
                             </div>
                        </div>

                    </div>

                    <div className="p-4 border-t border-white/10">
                        <button className="w-full py-3 border border-white/20 hover:border-[#E3E3FD] hover:text-[#E3E3FD] transition-all group flex items-center justify-center gap-2 bg-white/5">
                            <Download size={14} className="group-hover:animate-bounce" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Export Artifact</span>
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
