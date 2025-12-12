import { motion } from 'framer-motion';
import { 
    Type, Image as ImageIcon, Sparkles, Layers, 
    Settings, Download, ChevronRight, Maximize2, 
    Move, Sliders, Box, Grid, Monitor, Eye,
    MousePointer, Hand, ZoomIn, ZoomOut, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight,
    Bold, Italic, Underline, MoreHorizontal,
    Check, Lock, Unlock, Trash2, ArrowLeft,
    CornerRightDown,
    Plus
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SmartImage } from './studio/SmartImage';
import { LayerProperties } from './studio/LayerProperties';
import { generateImage } from '../services/gemini';

const Corner = ({ className = "" }) => (
    <div className={`absolute w-1.5 h-1.5 border-white/40 ${className}`} />
);

const IconButton = ({ icon: Icon, active, onClick, disabled, title }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-2 border ${active ? 'bg-[#E3E3FD] text-black border-[#E3E3FD]' : 'bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white'} ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'} transition-colors rounded-[1px]`}
    >
        <Icon size={14} />
    </button>
);

const Ruler = ({ orientation = 'horizontal', zoom = 1, offset = 0 }) => (
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
    type: 'TEXT',
    x: 0, y: 0, width: 0, height: 0, zIndex: 0, locked: true, allowContentChange: false,
    text: '', 
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
    const [selectedTool, setSelectedTool] = useState('select'); // select | pan | zoom
    
    // Canvas Viewport State
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const viewportRef = useRef(null);
    
    // Canvas Content State
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
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialLayerState, setInitialLayerState] = useState(null);
    const [resizeHandle, setResizeHandle] = useState(null);

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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const newLayer = {
                id: `img-${Math.random().toString(36).substr(2, 5)}`,
                type: 'IMAGE',
                x: 50, y: 50,
                width: 200, height: 200,
                zIndex: layers.length + 1,
                src: event.target.result,
                locked: false,
                allowContentChange: true,
                filterType: 'none',
                blendMode: 'normal'
            };
            setLayers([...layers, newLayer]);
            setSelectedLayerId(newLayer.id);
        };
        reader.readAsDataURL(file);
    };

    // --- INTERACTION HANDLERS ---

    const getCanvasPoint = (e) => {
        // Returns coordinates relative to the canvas origin (0,0), accounting for zoom and pan
        // We don't rely on e.nativeEvent.offsetX because the target changes
        // Instead, we use clientX/Y relative to the viewport container center
        if (!viewportRef.current) return { x: 0, y: 0 };
        
        const rect = viewportRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Mouse relative to viewport center
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;
        
        // Adjust for pan and zoom to get canvas space coordinate
        // Canvas is centered at (0,0) visually when pan is 0,0
        // So: CanvasX = (MouseX - PanX) / Zoom
        // But our canvas origin (top-left) is shifted by width/2, height/2 relative to center
        // Let's assume the "Canvas Component" is centered.
        // Its top-left in "Center Space" is (-W/2, -H/2)
        
        const viewX = (mouseX - pan.x) / zoom;
        const viewY = (mouseY - pan.y) / zoom;
        
        // Convert to canvas local coords (0,0 at top-left)
        // Since the div is centered, we add half width/height
        const canvasX = viewX + (canvasConfig.width / 2);
        const canvasY = viewY + (canvasConfig.height / 2);
        
        return { x: canvasX, y: canvasY, rawX: e.clientX, rawY: e.clientY };
    };

    const handleMouseDown = (e, layer = null, handle = null) => {
        e.stopPropagation();
        
        if (selectedTool === 'pan' || (e.button === 1) || e.target === viewportRef.current) {
            // Pan Start
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            setInitialLayerState('pan'); // hijack this var for mode
            return;
        }

        // Layer Interaction
        if (layer) {
            if (mode === 'CLIENT' && layer.locked) return;
            
            setSelectedLayerId(layer.id);
            setIsDragging(true);
            const pt = getCanvasPoint(e);
            setDragStart({ x: pt.x, y: pt.y });
            
            if (handle) {
                setIsResizing(true);
                setResizeHandle(handle);
                setInitialLayerState({ ...layer }); // Copy layer state
            } else {
                // Moving
                setInitialLayerState({ x: layer.x, y: layer.y });
            }
        } else {
            // Clicked empty space
            setSelectedLayerId(null);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        if (initialLayerState === 'pan') {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            setDragStart({ x: e.clientX, y: e.clientY }); // Incremental
            return;
        }

        if (selectedLayerId && selectedTool === 'select') {
             const pt = getCanvasPoint(e);
             
             if (isResizing && resizeHandle) {
                 const layer = layers.find(l => l.id === selectedLayerId);
                 const dx = pt.x - dragStart.x;
                 const dy = pt.y - dragStart.y;
                 
                 const newProps = { ...initialLayerState };

                 // Simple resize logic (bottom-right only for MVP, or specific handles)
                 if (resizeHandle === 'se') {
                     newProps.width = Math.max(10, initialLayerState.width + dx);
                     newProps.height = Math.max(10, initialLayerState.height + dy);
                 } else if (resizeHandle === 'sw') {
                     newProps.width = Math.max(10, initialLayerState.width - dx);
                     newProps.x = initialLayerState.x + dx;
                     newProps.height = Math.max(10, initialLayerState.height + dy);
                 } else if (resizeHandle === 'ne') {
                     newProps.width = Math.max(10, initialLayerState.width + dx);
                     newProps.height = Math.max(10, initialLayerState.height - dy);
                     newProps.y = initialLayerState.y + dy;
                 } else if (resizeHandle === 'nw') {
                     newProps.width = Math.max(10, initialLayerState.width - dx);
                     newProps.x = initialLayerState.x + dx;
                     newProps.height = Math.max(10, initialLayerState.height - dy);
                     newProps.y = initialLayerState.y + dy;
                 }
                 
                 updateLayer(selectedLayerId, newProps);
             } else {
                 // Moving
                 const dx = pt.x - dragStart.x;
                 const dy = pt.y - dragStart.y;
                 
                 updateLayer(selectedLayerId, {
                     x: initialLayerState.x + dx,
                     y: initialLayerState.y + dy
                 });
             }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
        setInitialLayerState(null);
    };

    const handleWheel = (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = -e.deltaY * 0.002;
            setZoom(z => Math.min(Math.max(0.1, z + delta), 5));
        } else {
            // Pan with scroll
            setPan(p => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
        }
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
            const base64Image = await generateImage(prompt);
            updateLayer(aiLayer.id, { src: base64Image });
        } catch (e) {
            console.error(e);
            setGenerationError("FAILED");
        } finally {
            setIsGenerating(false);
        }
    };

    // Hotkeys
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedLayerId && mode === 'STUDIO') {
                    deleteLayer(selectedLayerId);
                }
            }
            if (e.key === ' ') {
                // Space for pan (could implement hold-to-pan)
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedLayerId, mode]);

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
            <div className="flex-1 grid grid-cols-12 h-[calc(100vh-3rem)]">
                
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
                                    <label className="flex flex-col items-center justify-center p-3 border border-white/10 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-colors rounded-sm group cursor-pointer">
                                        <ImageIcon size={16} className="text-white/60 group-hover:text-[#E3E3FD]" />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60 group-hover:text-[#E3E3FD]">Image</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </label>
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
                        <IconButton icon={MousePointer} active={selectedTool === 'select'} onClick={() => setSelectedTool('select')} title="Select (V)" />
                        <IconButton icon={Hand} active={selectedTool === 'pan'} onClick={() => setSelectedTool('pan')} title="Pan (H)" />
                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                        <IconButton icon={ZoomOut} onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} title="Zoom Out" />
                        <span className="font-mono text-[9px] text-white/60 px-2 w-10 text-center">{Math.round(zoom * 100)}%</span>
                        <IconButton icon={ZoomIn} onClick={() => setZoom(z => Math.min(5, z + 0.1))} title="Zoom In" />
                    </div>

                    {/* Canvas Wrapper */}
                    <div 
                        className="flex-1 relative overflow-hidden bg-[#080808]"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onWheel={handleWheel}
                        ref={viewportRef}
                        onMouseDown={(e) => handleMouseDown(e)}
                    >
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
                            backgroundImage: 'radial-gradient(circle, #E3E3FD 1px, transparent 1px)', 
                            backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                            backgroundPosition: `${pan.x}px ${pan.y}px`
                        }}></div>
                        
                        {/* Viewport Content */}
                        <div 
                            className="absolute transform-gpu origin-center"
                            style={{
                                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                left: '50%',
                                top: '50%',
                                // We center the canvas div so that (0,0) translation puts its center at viewport center
                                marginLeft: -canvasConfig.width / 2,
                                marginTop: -canvasConfig.height / 2
                            }}
                        >
                            <div 
                                style={{
                                    width: canvasConfig.width,
                                    height: canvasConfig.height,
                                    backgroundColor: canvasConfig.backgroundColor
                                }}
                                className="relative shadow-2xl transition-shadow duration-300"
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
                                                cursor: (mode === 'CLIENT' && layer.locked) ? 'default' : (selectedTool === 'select' ? 'move' : (selectedTool === 'pan' ? 'grab' : 'default')),
                                                border: layer.borderWidth ? `${layer.borderWidth}px solid ${layer.borderColor}` : 'none',
                                                borderRadius: layer.borderRadius ? `${layer.borderRadius}px` : '0px',
                                                mixBlendMode: layer.blendMode || 'normal',
                                                whiteSpace: layer.type === 'TEXT' ? 'nowrap' : 'normal'
                                            }}
                                        >
                                            {/* Content Rendering */}
                                            {layer.type === 'TEXT' && (
                                                <div style={{
                                                    color: layer.color,
                                                    fontSize: `${layer.fontSize}px`,
                                                    fontFamily: layer.fontFamily,
                                                    textAlign: layer.textAlign,
                                                    lineHeight: 1.2
                                                }}>
                                                    {layer.text || 'Text Layer'}
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

                                            {/* Selection Outline & Handles */}
                                            {selectedLayerId === layer.id && mode === 'STUDIO' && (
                                                <>
                                                    <div className="absolute -inset-[1px] border border-[#E3E3FD] pointer-events-none z-50">
                                                        <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5 flex items-center gap-2">
                                                            <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">{layer.id}</span>
                                                        </div>
                                                    </div>
                                                    {/* Resize Handles */}
                                                    {['nw', 'ne', 'sw', 'se'].map(h => (
                                                        <div 
                                                            key={h}
                                                            onMouseDown={(e) => handleMouseDown(e, layer, h)}
                                                            className={`absolute w-2 h-2 bg-[#E3E3FD] border border-black z-50 cursor-${h}-resize`}
                                                            style={{
                                                                top: h[0] === 'n' ? -4 : 'auto',
                                                                bottom: h[0] === 's' ? -4 : 'auto',
                                                                left: h[1] === 'w' ? -4 : 'auto',
                                                                right: h[1] === 'e' ? -4 : 'auto',
                                                            }}
                                                        />
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Zoom Controls Overlay */}
                        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest pointer-events-none">
                            VP: {canvasConfig.width}x{canvasConfig.height} // ZOOM: {Math.round(zoom * 100)}% // PAN: {Math.round(pan.x)},{Math.round(pan.y)}
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
