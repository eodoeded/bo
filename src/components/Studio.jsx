import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
    Type, Image as ImageIcon, Sparkles, Layers, 
    Settings, Download, ChevronRight, Maximize2, 
    Move, Sliders, Box, Grid, Monitor, Eye,
    MousePointer, Hand, ZoomIn, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight,
    Bold, Italic, Underline, MoreHorizontal,
    Check, X, Plus, Trash2
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const Badge = ({ children, active = false, className = "" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-[1px] border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-white/5 text-white/40 border-white/10'} ${className}`}>
        {children}
    </span>
);

const IconButton = ({ icon: Icon, active, onClick, disabled }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`p-2 border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} transition-colors rounded-[1px]`}
    >
        <Icon size={14} />
    </button>
);

// Initial State for Canvas Elements
const INITIAL_ELEMENTS = [
    {
        id: 'bg',
        type: 'frame',
        x: 0, y: 0, w: 1080, h: 1350,
        fill: '#1C3A96',
        locked: true
    },
    {
        id: 'image-1',
        type: 'image',
        x: 100, y: 200, w: 880, h: 880,
        src: null, // Placeholder
        placeholder: true
    },
    {
        id: 'text-1',
        type: 'text',
        x: 540, y: 1150,
        text: 'THE HODLER',
        fontSize: 120,
        fontFamily: 'serif',
        align: 'center',
        color: '#FFFFFF'
    }
];

export default function Studio() {
    const [activeTab, setActiveTab] = useState('components');
    const [tool, setTool] = useState('select'); // select, pan, text, image
    const [elements, setElements] = useState(INITIAL_ELEMENTS);
    const [selection, setSelection] = useState(null); // ID of selected element
    const [zoom, setZoom] = useState(1);
    
    // Canvas Refs for coordinates
    const canvasRef = useRef(null);

    // Helpers
    const selectedElement = elements.find(el => el.id === selection);

    const updateElement = (id, props) => {
        setElements(prev => prev.map(el => el.id === id ? { ...el, ...props } : el));
    };

    const handleCanvasClick = (e) => {
        if (e.target === e.currentTarget) {
            setSelection(null);
        }
    };

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
                
                {/* Left Panel */}
                <aside className="col-span-2 border-r border-white/10 bg-[#050505] flex flex-col">
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
                                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Add Element</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={() => setTool('text')} className={`flex flex-col items-center justify-center p-3 border ${tool === 'text' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                        <Type size={16} className={tool === 'text' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">Text</span>
                                    </button>
                                    <button onClick={() => setTool('image')} className={`flex flex-col items-center justify-center p-3 border ${tool === 'image' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                        <ImageIcon size={16} className={tool === 'image' ? 'text-[#E3E3FD]' : 'text-white/60'} />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60">Image</span>
                                    </button>
                                    <button onClick={() => setTool('ai')} className={`flex flex-col items-center justify-center p-3 border ${tool === 'ai' ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-white/10 hover:border-white/30'} transition-colors rounded-sm`}>
                                        <Sparkles size={16} className={tool === 'ai' ? 'text-[#E3E3FD]' : 'text-white/60'} />
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
                                {elements.slice().reverse().map((el) => (
                                    <div 
                                        key={el.id} 
                                        onClick={() => setSelection(el.id)}
                                        className={`flex items-center gap-3 p-3 border ${selection === el.id ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-transparent hover:bg-white/5'} transition-colors rounded-sm cursor-pointer group`}
                                    >
                                        {el.type === 'text' && <Type size={14} className={selection === el.id ? 'text-[#E3E3FD]' : 'text-white/40'} />}
                                        {el.type === 'image' && <ImageIcon size={14} className={selection === el.id ? 'text-[#E3E3FD]' : 'text-white/40'} />}
                                        {el.type === 'frame' && <Box size={14} className={selection === el.id ? 'text-[#E3E3FD]' : 'text-white/40'} />}
                                        <span className={`font-mono text-[10px] uppercase tracking-widest ${selection === el.id ? 'text-white' : 'text-white/60'}`}>
                                            {el.id}
                                        </span>
                                        {selection === el.id && <div className="ml-auto w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>}
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
                        <IconButton icon={MousePointer} active={tool === 'select'} onClick={() => setTool('select')} />
                        <IconButton icon={Hand} active={tool === 'pan'} onClick={() => setTool('pan')} />
                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                        <IconButton icon={Type} active={tool === 'text'} onClick={() => setTool('text')} />
                        <IconButton icon={ImageIcon} active={tool === 'image'} onClick={() => setTool('image')} />
                        <IconButton icon={Box} active={tool === 'shape'} onClick={() => setTool('shape')} />
                    </div>

                    {/* Canvas Background */}
                    <div 
                        className="flex-1 relative overflow-hidden bg-[#080808]" 
                        onMouseDown={handleCanvasClick}
                    >
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
                            backgroundImage: 'radial-gradient(circle, #E3E3FD 1px, transparent 1px)', 
                            backgroundSize: '20px 20px' 
                        }}></div>
                        
                        {/* Interactive Canvas Viewport */}
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <motion.div 
                                style={{ 
                                    width: 400, // Scaled for view
                                    height: 500, // Scaled for view
                                    scale: zoom
                                }}
                                className="relative bg-[#1C3A96] shadow-2xl group overflow-hidden"
                            >
                                {/* Render Elements */}
                                {elements.map(el => {
                                    if (el.type === 'frame') return null; // BG handled by container for now
                                    
                                    // Calculate relative positions for the scaled view (approximate for demo)
                                    // In a real app, use a real transform system
                                    const scaleX = 400 / 1080;
                                    const scaleY = 500 / 1350;
                                    
                                    const style = {
                                        position: 'absolute',
                                        left: el.x * scaleX,
                                        top: el.y * scaleY,
                                        width: el.w ? el.w * scaleX : 'auto',
                                        height: el.h ? el.h * scaleY : 'auto',
                                        color: el.color,
                                        fontSize: el.fontSize ? el.fontSize * scaleX : undefined,
                                        fontFamily: el.fontFamily,
                                        textAlign: el.align,
                                        zIndex: selection === el.id ? 10 : 1
                                    };

                                    return (
                                        <motion.div
                                            key={el.id}
                                            style={style}
                                            drag={tool === 'select'}
                                            dragMomentum={false}
                                            onDragEnd={(e, info) => {
                                                // Update position logic would go here
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelection(el.id);
                                            }}
                                            className={`cursor-pointer ${selection === el.id ? 'ring-1 ring-[#E3E3FD]' : 'hover:ring-1 hover:ring-white/20'}`}
                                        >
                                            {el.type === 'text' && el.text}
                                            {el.type === 'image' && (
                                                <div className="w-full h-full border-2 border-[#1C3A96] rounded-full flex items-center justify-center relative bg-white">
                                                    <div className="absolute inset-0 border border-[#1C3A96] rounded-full scale-110 opacity-30"></div>
                                                    <Sparkles size={24} strokeWidth={1} className="text-[#1C3A96]" />
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}

                                {/* Active Selection Overlay Bounds (Static for demo) */}
                                {selection && (
                                    <div className="absolute inset-0 border border-[#E3E3FD] pointer-events-none z-50 opacity-50">
                                        <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5">
                                            <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">{selection}</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#050505] border border-white/10 p-1 rounded-[2px]">
                            <IconButton icon={ZoomIn} onClick={() => setZoom(z => Math.min(z + 0.1, 2))} />
                            <span className="font-mono text-[10px] text-white px-2">{Math.round(zoom * 100)}%</span>
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
                        {selectedElement ? (
                            <>
                                {/* Selection Header */}
                                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                    <span className="font-mono text-[10px] text-[#E3E3FD] uppercase font-bold">{selectedElement.id}</span>
                                    <IconButton icon={Trash2} onClick={() => {
                                        setElements(prev => prev.filter(el => el.id !== selection));
                                        setSelection(null);
                                    }} />
                                </div>

                                {/* Layout */}
                                <div className="space-y-3">
                                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Dimensions</span>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['x', 'y', 'w', 'h'].map(prop => (
                                            <div key={prop} className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex items-center gap-2 focus-within:border-[#E3E3FD]">
                                                <span className="font-mono text-[9px] text-white/30 uppercase">{prop}</span>
                                                <input 
                                                    type="number" 
                                                    value={selectedElement[prop] || 0} 
                                                    onChange={(e) => updateElement(selection, { [prop]: parseInt(e.target.value) })}
                                                    className="bg-transparent font-mono text-[10px] text-white w-full focus:outline-none" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Type Specific Props */}
                                {selectedElement.type === 'text' && (
                                    <div className="space-y-3">
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Content</span>
                                        <textarea 
                                            value={selectedElement.text} 
                                            onChange={(e) => updateElement(selection, { text: e.target.value })}
                                            className="w-full bg-[#0A0A0A] border border-white/10 p-2 font-mono text-[10px] text-white focus:outline-none focus:border-[#E3E3FD] h-20"
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-white/20">
                                <MousePointer size={24} className="mb-2 opacity-50" />
                                <span className="font-mono text-[10px] uppercase tracking-widest">No Selection</span>
                            </div>
                        )}
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

const ArrowLeftIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
);

