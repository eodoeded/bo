import { motion } from 'framer-motion';
import { 
    Type, Image as ImageIcon, Sparkles, Layers, 
    Settings, Download, ChevronRight, Maximize2, 
    Move, Sliders, Box, Grid, Monitor, Eye,
    MousePointer, Hand, ZoomIn, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight,
    Bold, Italic, Underline, MoreHorizontal,
    Check, Lock, Unlock, Trash2, ArrowLeft
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SmartImage } from './studio/SmartImage';
import { LayerProperties } from './studio/LayerProperties';
import { generateImage } from '../services/gemini';

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
        className={`p-2 border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white'} ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'} transition-colors rounded-[1px]`}
    >
        <Icon size={14} />
    </button>
);

const Ruler = ({ orientation = 'horizontal' }) => (
    <div className={`absolute bg-[#050505] border-white/10 z-10 pointer-events-none ${orientation === 'horizontal' ? 'top-0 left-0 right-0 h-6 border-b flex items-end' : 'top-0 left-0 bottom-0 w-6 border-r flex flex-col items-end'}`}>
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

// --- INITIAL DATA ---
const INITIAL_LAYERS = [
  {
    id: 'frame-bg',
    type: 'TEXT', // Using TEXT as a placeholder for frame, or actually just use a shape later. 
    // In this simplified version, we'll assume the canvas BG is handled by config, but we can add shapes.
    // For now, let's replicate the 'tarot' example
    x: 0, y: 0, width: 0, height: 0, zIndex: 0, locked: true, allowContentChange: false,
    text: '', // invisible
    hidden: true
  },
  {
    id: 'brand-logo',
    type: 'IMAGE',
    x: 160, y: 30, width: 40, height: 40, zIndex: 11,
    src: "https://cdn-icons-png.flaticon.com/512/7510/7510065.png",
    locked: true,
    allowContentChange: false,
  },
  {
    id: 'card-title',
    type: 'TEXT',
    x: 40, y: 450, width: 300, height: 40, zIndex: 12,
    text: "THE HODLER",
    color: "#ffffff",
    fontSize: 32,
    fontFamily: "Cinzel",
    textAlign: "center",
    locked: true,
    allowContentChange: true,
  },
  {
    id: 'ai-frame',
    type: 'AI_FRAME',
    x: 40, y: 80, width: 300, height: 350, zIndex: 5,
    locked: true,
    allowContentChange: true,
    aiPromptTemplate: "A mystical tarot card illustration of {subject}, high contrast, black and white ink drawing, woodcut style, esoteric symbols, white background, clean lines",
    src: "https://picsum.photos/270/350",
    borderWidth: 1,
    borderColor: "#4338ca",
    borderRadius: 8,
    filterType: 'dither',
    blendMode: 'screen'
  }
];

export default function Studio() {
    // App State
    const [mode, setMode] = useState('STUDIO'); // STUDIO | CLIENT
    const [activeTab, setActiveTab] = useState('components');
    const [selectedTool, setSelectedTool] = useState('select');
    
    // Canvas State
    const [layers, setLayers] = useState(INITIAL_LAYERS);
    const [selectedLayerId, setSelectedLayerId] = useState(null);
    const [canvasConfig, setCanvasConfig] = useState({
        width: 380,
        height: 500,
        backgroundColor: '#1C3A96'
    });

    // Client State
    const [clientSubject, setClientSubject] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState(null);

    // Interaction State
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    // Helpers
    const selectedLayer = layers.find(l => l.id === selectedLayerId);
    
    const updateLayer = (id, updates) => {
        setLayers(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    };

    const deleteLayer = (id) => {
        setLayers(prev => prev.filter(l => l.id !== id));
        if (selectedLayerId === id) setSelectedLayerId(null);
    };

    const addLayer = (type) => {
        const newLayer = {
            id: `layer-${Math.random().toString(36).substr(2, 5)}`,
            type,
            x: 20, y: 20,
            width: type === 'TEXT' ? 200 : 150,
            height: type === 'TEXT' ? 40 : 150,
            zIndex: layers.length + 1,
            text: type === 'TEXT' ? "LABEL" : undefined,
            src: type === 'IMAGE' ? "https://picsum.photos/150/150" : undefined,
            color: "#ffffff",
            fontSize: 16,
            fontFamily: "Inter",
            textAlign: "left",
            locked: false,
            allowContentChange: true,
            aiPromptTemplate: type === 'AI_FRAME' ? "A render of {subject}" : undefined,
            filterType: 'none',
            blendMode: 'normal'
        };
        setLayers([...layers, newLayer]);
        setSelectedLayerId(newLayer.id);
    };

    // Handlers
    const handleMouseDown = (e, layer) => {
        if (mode === 'CLIENT' && layer.locked) return;
        
        e.stopPropagation();
        setSelectedLayerId(layer.id);
        if (selectedTool === 'select') {
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - layer.x,
                y: e.clientY - layer.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !selectedLayerId || selectedTool !== 'select') return;
        
        const layer = layers.find(l => l.id === selectedLayerId);
        if (!layer) return;

        // Simple relative drag (in a real app, map screen coords to canvas space)
        // For this demo, assuming canvas is 1:1 with pointer or simple offset
        // We need to account for the canvas container offset
        // But simplifying: update x/y relative to the initial click offset
        
        // Actually, since we don't have the canvas rect in state, let's just use delta
        // But better:
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        updateLayer(selectedLayerId, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleGenerate = async () => {
        if (!clientSubject.trim()) return;
        
        const aiLayer = layers.find(l => l.type === 'AI_FRAME' && l.allowContentChange);
        if (!aiLayer || !aiLayer.aiPromptTemplate) {
            setGenerationError("NO_ACTIVE_AI_FRAME");
            return;
        }

        setIsGenerating(true);
        setGenerationError(null);

        try {
            const prompt = aiLayer.aiPromptTemplate.replace('{subject}', clientSubject);
            // Call our service
            const base64Image = await generateImage(prompt);
            updateLayer(aiLayer.id, { src: base64Image });
        } catch (e) {
            console.error(e);
            setGenerationError("FAILED"); // Keep it simple
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-black">
            
            {/* Top Bar */}
            <header className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#050505] relative z-20">
                <div className="flex items-center gap-6">
                    <Link to="/" className="font-mono text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                        <ArrowLeft size={12} />
                        <span>Back</span>
                    </Link>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">BrandForge <span className="text-white/40">//</span> CONFIGURATOR</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-[#0A0A0A] border border-white/10 p-1 rounded-[2px]">
                        <button 
                            onClick={() => { setMode('STUDIO'); setSelectedLayerId(null); }}
                            className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest rounded-[1px] transition-colors ${mode === 'STUDIO' ? 'bg-[#E3E3FD] text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            Studio
                        </button>
                        <button 
                            onClick={() => { setMode('CLIENT'); setSelectedLayerId(null); }}
                            className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest rounded-[1px] transition-colors ${mode === 'CLIENT' ? 'bg-[#E3E3FD] text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            Client
                        </button>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <button className="px-4 py-1.5 bg-[#E3E3FD] text-black font-mono text-[10px] uppercase tracking-widest rounded-[1px] hover:bg-white transition-colors font-semibold">
                        Publish
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <div 
                className="flex-1 grid grid-cols-12 h-[calc(100vh-3rem)]"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                
                {/* Left Panel: Components & Layers */}
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
                        {activeTab === 'components' && mode === 'STUDIO' ? (
                            <div className="p-4 space-y-6">
                                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Explore Components</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={() => addLayer('TEXT')} className="flex flex-col items-center justify-center p-3 border border-white/10 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-colors rounded-sm group">
                                        <Type size={16} className="text-white/60 group-hover:text-[#E3E3FD]" />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60 group-hover:text-[#E3E3FD]">Text</span>
                                    </button>
                                    <button onClick={() => addLayer('IMAGE')} className="flex flex-col items-center justify-center p-3 border border-white/10 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-colors rounded-sm group">
                                        <ImageIcon size={16} className="text-white/60 group-hover:text-[#E3E3FD]" />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60 group-hover:text-[#E3E3FD]">Image</span>
                                    </button>
                                    <button onClick={() => addLayer('AI_FRAME')} className="flex flex-col items-center justify-center p-3 border border-white/10 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-colors rounded-sm group">
                                        <Sparkles size={16} className="text-white/60 group-hover:text-[#E3E3FD]" />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60 group-hover:text-[#E3E3FD]">AI Gen</span>
                                    </button>
                                </div>

                                <div className="p-4 border border-white/10 bg-[#0A0A0A]">
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-2">Canvas Spec</span>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                         <div className="bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                            <span className="font-mono text-[9px] text-white/40">W</span>
                                            <input 
                                                type="number" 
                                                value={canvasConfig.width}
                                                onChange={(e) => setCanvasConfig({...canvasConfig, width: Number(e.target.value)})}
                                                className="w-12 bg-transparent text-right font-mono text-[9px] text-[#E3E3FD] focus:outline-none"
                                            />
                                         </div>
                                         <div className="bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                            <span className="font-mono text-[9px] text-white/40">H</span>
                                            <input 
                                                type="number" 
                                                value={canvasConfig.height}
                                                onChange={(e) => setCanvasConfig({...canvasConfig, height: Number(e.target.value)})}
                                                className="w-12 bg-transparent text-right font-mono text-[9px] text-[#E3E3FD] focus:outline-none"
                                            />
                                         </div>
                                    </div>
                                    <div className="w-full bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                        <span className="font-mono text-[9px] text-white/40">BG</span>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="color" 
                                                value={canvasConfig.backgroundColor}
                                                onChange={(e) => setCanvasConfig({...canvasConfig, backgroundColor: e.target.value})}
                                                className="w-4 h-4 rounded-full bg-transparent border-0 p-0"
                                            />
                                            <span className="font-mono text-[9px] text-white/60">{canvasConfig.backgroundColor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-2 space-y-1">
                                {layers.slice().reverse().map((layer) => (
                                    !layer.hidden && (
                                        <div 
                                            key={layer.id} 
                                            onClick={() => setSelectedLayerId(layer.id)}
                                            className={`flex items-center gap-3 p-3 border ${selectedLayerId === layer.id ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-transparent hover:bg-white/5'} transition-colors rounded-sm cursor-pointer group`}
                                        >
                                            <Layers size={14} className={selectedLayerId === layer.id ? 'text-[#E3E3FD]' : 'text-white/40 group-hover:text-white'} />
                                            <span className={`font-mono text-[10px] uppercase tracking-widest ${selectedLayerId === layer.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                                {layer.type} - {layer.id.slice(-4)}
                                            </span>
                                            {selectedLayerId === layer.id && <div className="ml-auto w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>}
                                        </div>
                                    )
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
                        <IconButton icon={ZoomIn} onClick={() => {}} />
                    </div>

                    {/* Canvas Wrapper */}
                    <div className="flex-1 relative overflow-hidden bg-[#080808]">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ 
                            backgroundImage: 'radial-gradient(circle, #E3E3FD 1px, transparent 1px)', 
                            backgroundSize: '20px 20px' 
                        }}></div>
                        
                        <Ruler orientation="horizontal" />
                        <Ruler orientation="vertical" />

                        {/* Viewport */}
                        <div className="absolute inset-0 flex items-center justify-center p-12 overflow-hidden">
                            <div 
                                ref={canvasRef}
                                style={{
                                    width: canvasConfig.width,
                                    height: canvasConfig.height,
                                    backgroundColor: canvasConfig.backgroundColor
                                }}
                                className="relative shadow-2xl transition-all duration-300"
                                onClick={() => setSelectedLayerId(null)}
                            >
                                {layers.map(layer => (
                                    !layer.hidden && (
                                        <div
                                            key={layer.id}
                                            onMouseDown={(e) => handleMouseDown(e, layer)}
                                            className="absolute"
                                            style={{
                                                left: layer.x,
                                                top: layer.y,
                                                width: layer.width,
                                                height: layer.type === 'TEXT' ? 'auto' : layer.height,
                                                zIndex: layer.zIndex,
                                                cursor: (mode === 'CLIENT' && layer.locked) ? 'default' : (selectedTool === 'select' ? 'move' : 'default'),
                                                border: layer.borderWidth ? `${layer.borderWidth}px solid ${layer.borderColor}` : 'none',
                                                borderRadius: layer.borderRadius ? `${layer.borderRadius}px` : '0px',
                                                mixBlendMode: layer.blendMode || 'normal'
                                            }}
                                        >
                                            {/* Selection Outline */}
                                            {selectedLayerId === layer.id && (
                                                <div className="absolute -inset-[1px] border border-[#E3E3FD] pointer-events-none z-50">
                                                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-[#E3E3FD] bg-[#020202]"></div>
                                                    <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5 flex items-center gap-2">
                                                        <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">{layer.id}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Content Rendering */}
                                            {layer.type === 'TEXT' && (
                                                <div style={{
                                                    color: layer.color,
                                                    fontSize: `${layer.fontSize}px`,
                                                    fontFamily: layer.fontFamily,
                                                    textAlign: layer.textAlign,
                                                    lineHeight: 1.2
                                                }}>
                                                    {layer.text}
                                                </div>
                                            )}

                                            {layer.type === 'IMAGE' && (
                                                <SmartImage 
                                                    src={layer.src} 
                                                    className="w-full h-full object-contain pointer-events-none"
                                                    filterType={layer.filterType}
                                                    width={layer.width}
                                                    height={layer.height}
                                                />
                                            )}

                                            {layer.type === 'AI_FRAME' && (
                                                <div className="w-full h-full bg-black/20 relative overflow-hidden flex items-center justify-center">
                                                    {layer.src && !layer.src.startsWith('http') ? ( 
                                                        // Base64 or specific generated content
                                                        <SmartImage 
                                                            src={layer.src}
                                                            className="w-full h-full object-cover pointer-events-none"
                                                            filterType={layer.filterType}
                                                            width={layer.width}
                                                            height={layer.height}
                                                        />
                                                     ) : layer.src ? (
                                                        <img src={layer.src} className="w-full h-full object-cover opacity-50 grayscale" alt="placeholder" />
                                                     ) : (
                                                        <div className="flex flex-col items-center opacity-30">
                                                            <Sparkles size={32} strokeWidth={1} className="text-white mb-2" />
                                                            <span className="font-mono text-[8px] uppercase tracking-widest text-white">AI Canvas</span>
                                                        </div>
                                                     )}
                                                     
                                                     {isGenerating && (
                                                         <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                                                             <span className="font-mono text-[10px] text-[#E3E3FD] animate-pulse">GENERATING...</span>
                                                         </div>
                                                     )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#050505] border border-white/10 p-1 rounded-[2px]">
                            <IconButton icon={ZoomIn} />
                            <span className="font-mono text-[10px] text-white px-2">100%</span>
                        </div>
                        
                        {/* Viewport Info */}
                        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest">
                            VP: {canvasConfig.width}x{canvasConfig.height} // ZOOM: 100%
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
                        {selectedLayer ? (
                            <LayerProperties 
                                layer={selectedLayer}
                                mode={mode}
                                onUpdate={updateLayer}
                                onDelete={deleteLayer}
                            />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-white/20">
                                <MousePointer size={24} strokeWidth={1} className="mb-2" />
                                <span className="font-mono text-[10px] uppercase tracking-widest">Select an element</span>
                            </div>
                        )}

                        {/* CLIENT GENERATOR PANEL */}
                        {mode === 'CLIENT' && (
                            <div className="pt-6 border-t border-white/10 mt-auto">
                                <h2 className="font-mono text-[9px] font-bold text-[#E3E3FD] uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Sparkles size={12} /> Generator Protocol
                                </h2>
                                
                                <div className="space-y-4">
                                   <div>
                                     <label className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1.5">Subject Input</label>
                                     <input 
                                       type="text"
                                       value={clientSubject}
                                       onChange={(e) => setClientSubject(e.target.value)}
                                       placeholder="Enter subject..."
                                       className="w-full bg-[#0A0A0A] border border-white/10 p-2 text-xs text-white focus:border-[#E3E3FD] focus:outline-none font-mono placeholder-white/20"
                                     />
                                   </div>

                                   <button
                                     onClick={handleGenerate}
                                     disabled={isGenerating || !clientSubject}
                                     className={`w-full py-3 font-mono text-[9px] font-bold uppercase tracking-widest transition-all
                                       ${isGenerating 
                                         ? 'bg-white/10 text-white/40 cursor-wait' 
                                         : 'bg-[#E3E3FD] text-black hover:bg-white'}`}
                                   >
                                     {isGenerating ? 'INITIALIZING...' : 'EXECUTE GENERATION'}
                                   </button>

                                   {generationError && (
                                      <div className="p-2 border border-red-900/50 bg-red-900/10 text-red-400 text-[9px] font-mono">
                                         ERROR: {generationError}
                                      </div>
                                   )}
                                </div>
                            </div>
                        )}
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
