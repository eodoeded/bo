import { motion } from 'framer-motion';
import { 
    Type, Image as ImageIcon, Sparkles, Layers, 
    Settings, Download, ChevronRight, Maximize2, 
    Move, Sliders, Box, Grid, Monitor, Eye
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const Badge = ({ children, active = false }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-[1px] border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-white/5 text-white/40 border-white/10'}`}>
        {children}
    </span>
);

export default function Studio() {
    const [activeTab, setActiveTab] = useState('ai');
    
    return (
        <div className="min-h-screen bg-[#020202] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-black">
            
            {/* Top Bar */}
            <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-[#020202] relative z-20">
                <div className="flex items-center gap-4">
                    <Link to="/" className="font-mono text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest">[ BACK ]</Link>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="font-mono text-[10px] text-white uppercase tracking-widest">BRANDED OBJECTS <span className="text-white/40">//</span> CONFIGURATOR</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-[#E3E3FD] text-black font-mono text-[9px] uppercase tracking-widest rounded-[1px]">Studio</button>
                    <button className="px-3 py-1 bg-transparent text-white/40 hover:text-white font-mono text-[9px] uppercase tracking-widest transition-colors">Client</button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 grid grid-cols-12 h-[calc(100vh-3.5rem)]">
                
                {/* Left Panel: Components */}
                <aside className="col-span-2 border-r border-white/10 bg-[#050505] flex flex-col">
                    <div className="p-4 border-b border-white/10">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Explore Components</span>
                        <div className="grid grid-cols-3 gap-2">
                            <button className={`flex flex-col items-center justify-center p-3 border ${activeTab === 'text' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                <Type size={16} className={activeTab === 'text' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">Text</span>
                            </button>
                            <button className={`flex flex-col items-center justify-center p-3 border ${activeTab === 'image' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                <ImageIcon size={16} className={activeTab === 'image' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">Image</span>
                            </button>
                            <button 
                                onClick={() => setActiveTab('ai')}
                                className={`flex flex-col items-center justify-center p-3 border ${activeTab === 'ai' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}
                            >
                                <Sparkles size={16} className={activeTab === 'ai' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">AI Gen</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-1">
                            {['AI Canvas', 'The Hodler', 'Image/Frame', 'Overlay_01', 'Signature'].map((layer, i) => (
                                <div key={i} className={`flex items-center gap-3 p-3 border ${i === 0 ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-transparent hover:bg-white/5'} transition-colors rounded-sm cursor-pointer group`}>
                                    <Layers size={14} className={i === 0 ? 'text-[#E3E3FD]' : 'text-white/40 group-hover:text-white'} />
                                    <span className={`font-mono text-[10px] uppercase tracking-widest ${i === 0 ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{layer}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-white/10">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-2">Canvas Spec</span>
                        <div className="flex gap-2 mb-2">
                             <div className="flex-1 bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                <span className="font-mono text-[9px] text-white/40">W</span>
                                <span className="font-mono text-[9px] text-[#E3E3FD]">1080</span>
                             </div>
                             <div className="flex-1 bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                <span className="font-mono text-[9px] text-white/40">H</span>
                                <span className="font-mono text-[9px] text-[#E3E3FD]">1350</span>
                             </div>
                        </div>
                        <div className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                            <span className="font-mono text-[9px] text-white/40">BG</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#1a2b4b]"></div>
                                <span className="font-mono text-[9px] text-white/60">#1A2B4B</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Center: Canvas */}
                <main className="col-span-7 bg-[#020202] relative flex items-center justify-center p-12 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
                        backgroundImage: 'radial-gradient(circle, #E3E3FD 1px, transparent 1px)', 
                        backgroundSize: '20px 20px' 
                    }}></div>

                    {/* The Canvas */}
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-[380px] h-[500px] bg-[#1C3A96] shadow-2xl group"
                    >
                        {/* Selected Layer Outline */}
                        <div className="absolute top-8 left-8 right-8 bottom-24 border border-[#E3E3FD] z-20 pointer-events-none">
                            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                            <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5">
                                <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">AI_Canvas</span>
                            </div>
                        </div>

                        {/* Content */}
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
                            <h2 className="font-serif text-3xl text-white tracking-wider">THE HODLER</h2>
                        </div>
                    </motion.div>

                    {/* Viewport Info */}
                    <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest">
                        VP: 380x500 // ZOOM: 100%
                    </div>
                </main>

                {/* Right Panel: Specifications */}
                <aside className="col-span-3 border-l border-white/10 bg-[#050505] flex flex-col">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Specifications</span>
                        <Maximize2 size={12} className="text-white/40" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        
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
                                    <input type="number" value="1" className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-[#E3E3FD]" />
                                </div>
                                <div>
                                    <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Radius</label>
                                    <input type="number" value="8" className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-[#E3E3FD]" />
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
                                    <span className="font-mono text-[10px] text-white">270</span>
                                </div>
                                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                                    <span className="font-mono text-[9px] text-white/30 w-6">H</span>
                                    <span className="font-mono text-[10px] text-white">350</span>
                                </div>
                             </div>
                        </div>

                    </div>

                    <div className="p-6 border-t border-white/10">
                        <button className="w-full py-4 border border-white/20 hover:border-white hover:bg-white/5 transition-all group flex items-center justify-center gap-3">
                            <Download size={14} className="text-white/60 group-hover:text-white" />
                            <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em]">Export Artifact</span>
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

