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
    Plus, Upload,
    Copy, Search, Layout,
    ArrowUp, ArrowDown,
    Save
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { SmartImage } from './studio/SmartImage';
import { LayerProperties } from './studio/LayerProperties';
import { generateImage } from '../services/gemini';

// --- HISTORY SYSTEM HOOK ---
function useHistory(initialState) {
    const [history, setHistory] = useState([initialState]);
    const [index, setIndex] = useState(0);

    const setState = (newState) => {
        const nextHistory = history.slice(0, index + 1);
        nextHistory.push(newState);
        setHistory(nextHistory);
        setIndex(nextHistory.length - 1);
    };

    const undo = () => {
        if (index > 0) {
            setIndex(index - 1);
            return history[index - 1];
        }
        return history[index];
    };

    const redo = () => {
        if (index < history.length - 1) {
            setIndex(index + 1);
            return history[index + 1];
        }
        return history[index];
    };

    return [history[index], setState, undo, redo, index > 0, index < history.length - 1];
}

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

const Ruler = ({ orientation = 'horizontal', zoom = 1, pan = {x:0, y:0} }) => {
    const ticks = Array.from({ length: 50 });
    return (
        <div className={`absolute bg-[#050505] border-white/10 z-10 pointer-events-none overflow-hidden ${orientation === 'horizontal' ? 'top-0 left-0 right-0 h-6 border-b flex items-end' : 'top-0 left-0 bottom-0 w-6 border-r flex flex-col items-end'}`}>
            {ticks.map((_, i) => {
                const value = Math.round(i * 100);
                return (
                    <div 
                        key={i} 
                        className={`absolute bg-white/20 ${orientation === 'horizontal' ? 'w-px h-2' : 'h-px w-2'}`}
                        style={{
                            [orientation === 'horizontal' ? 'left' : 'top']: (i * 100 * zoom) + (orientation === 'horizontal' ? pan.x : pan.y) % (100 * zoom)
                        }}
                    >
                        <span className="absolute top-[-14px] left-[2px] font-mono text-[7px] text-white/40">
                            {value}
                        </span>
                    </div>
                )
            })}
        </div>
    );
};

// --- INITIAL DATA ---
const INITIAL_LAYERS = [
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
    const [statusMessage, setStatusMessage] = useState(null); // For toasts
    
    // Canvas Viewport
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const viewportRef = useRef(null);
    const canvasContentRef = useRef(null);
    const fileInputRef = useRef(null);
    
    // History & Layers
    const [layers, setLayers, undo, redo, canUndo, canRedo] = useHistory(INITIAL_LAYERS);
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
    const [isPanning, setIsPanning] = useState(false);
    const [editingTextId, setEditingTextId] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);

    // Helpers
    const selectedLayer = layers.find(l => l.id === selectedLayerId);
    
    const showToast = (msg) => {
        setStatusMessage(msg);
        setTimeout(() => setStatusMessage(null), 2000);
    };

    const updateLayer = (id, updates) => {
        const newLayers = layers.map(l => l.id === id ? { ...l, ...updates } : l);
        setLayers(newLayers);
    };

    const deleteLayer = (id) => {
        setLayers(layers.filter(l => l.id !== id));
        if (selectedLayerId === id) setSelectedLayerId(null);
        setContextMenu(null);
    };

    const duplicateLayer = (id) => {
        const layer = layers.find(l => l.id === id);
        if (!layer) return;
        const newLayer = {
            ...layer,
            id: `copy-${Math.random().toString(36).substr(2, 5)}`,
            x: layer.x + 20,
            y: layer.y + 20,
            zIndex: layers.length + 1
        };
        setLayers([...layers, newLayer]);
        setSelectedLayerId(newLayer.id);
        setContextMenu(null);
    };

    const reorderLayer = (id, direction) => {
        const index = layers.findIndex(l => l.id === id);
        if (index === -1) return;
        
        const newLayers = [...layers];
        if (direction === 'up' && index < layers.length - 1) {
            [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
        } else if (direction === 'down' && index > 0) {
            [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
        }
        // Normalize Z-Index
        newLayers.forEach((l, i) => l.zIndex = i);
        setLayers(newLayers);
    };

    const addLayer = (type, src = null) => {
        const newLayer = {
            id: `layer-${Math.random().toString(36).substr(2, 5)}`,
            type,
            x: 50, y: 50,
            width: type === 'TEXT' ? 200 : 200,
            height: type === 'TEXT' ? 40 : 200,
            zIndex: layers.length + 1,
            text: type === 'TEXT' ? "LABEL" : undefined,
            src: type === 'IMAGE' ? (src || "https://picsum.photos/150/150") : undefined,
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

    const zoomToFit = () => {
        if (!viewportRef.current) return;
        const rect = viewportRef.current.getBoundingClientRect();
        const margin = 50;
        
        const scaleX = (rect.width - margin * 2) / canvasConfig.width;
        const scaleY = (rect.height - margin * 2) / canvasConfig.height;
        const newZoom = Math.min(scaleX, scaleY, 1); // Don't zoom in more than 100% automatically
        
        setZoom(newZoom);
        setPan({ x: 0, y: 0 }); // Center
    };

    // --- ACTIONS ---

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset to allow same file selection
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Use functional update to ensure we have latest state
        setLayers(prev => {
            // This is tricky inside a synchronous event handler with async file reading
            // Correct approach: Read first, then update.
            // For now, we will rely on side-effects for this specific user flow which is acceptable for prototypes
            return prev; 
        });

        // Simple loop for now
        files.forEach((file, idx) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                addLayer('IMAGE', ev.target.result);
            }
            reader.readAsDataURL(file);
        });
        
        showToast(`Uploading...`);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    addLayer('IMAGE', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        showToast(`Dropped ${files.length} Image(s)`);
    };

    const handleExport = async () => {
        if (!canvasContentRef.current) return;
        showToast("Exporting...");
        try {
            const canvas = await html2canvas(canvasContentRef.current, {
                backgroundColor: null,
                scale: 2, // High res
                logging: false,
                useCORS: true // Allow cross-origin images if enabled on server
            });
            const link = document.createElement('a');
            link.download = `brandforge-artifact-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast("Export Complete");
        } catch (err) {
            console.error(err);
            showToast("Export Failed");
        }
    };

    const handlePublish = () => {
        // Mock Publish
        showToast("Project Published Successfully");
    };

    // --- PASTE SUPPORT ---
    useEffect(() => {
        const handlePaste = (e) => {
            if (editingTextId) return; // Don't intercept paste when editing text

            const items = e.clipboardData?.items;
            if (!items) return;

            for (const item of items) {
                if (item.type.indexOf('image') !== -1) {
                    const blob = item.getAsFile();
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        addLayer('IMAGE', event.target.result);
                        showToast("Image Pasted");
                    };
                    reader.readAsDataURL(blob);
                }
            }
        };
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [layers, editingTextId]);

    // --- INTERACTION HANDLERS ---

    const getCanvasPoint = (e) => {
        if (!viewportRef.current) return { x: 0, y: 0 };
        const rect = viewportRef.current.getBoundingClientRect();
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const worldX = (mouseX - cx - pan.x) / zoom;
        const worldY = (mouseY - cy - pan.y) / zoom;

        const canvasX = worldX + (canvasConfig.width / 2);
        const canvasY = worldY + (canvasConfig.height / 2);
        
        return { x: canvasX, y: canvasY };
    };

    const handleMouseDown = (e, layer = null, handle = null) => {
        if (e.button === 2) return; 
        if (editingTextId) return; 

        setContextMenu(null);

        // Pan Logic
        if (e.button === 1 || selectedTool === 'pan') {
            setIsPanning(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            return;
        }

        // Selection / Drag Logic
        if (layer) {
            e.stopPropagation();
            
            if (mode === 'CLIENT' && layer.locked) return;
            // Allow selection of locked layers in Studio, but not move
            if (mode === 'STUDIO' && layer.locked) {
                setSelectedLayerId(layer.id);
                // We don't start dragging here
                return; 
            }

            setSelectedLayerId(layer.id);
            setIsDragging(true);
            
            // For dragging, we use screen coords delta
            setDragStart({ x: e.clientX, y: e.clientY });
            
            if (handle) {
                setIsResizing(true);
                setResizeHandle(handle);
                setInitialLayerState({ ...layer });
            } else {
                setInitialLayerState({ x: layer.x, y: layer.y });
            }
        } else {
            // Clicked empty space = Deselect
            if (e.target === viewportRef.current) {
                setSelectedLayerId(null);
            }
        }
    };

    const handleMouseMove = (e) => {
        if (isPanning) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            setDragStart({ x: e.clientX, y: e.clientY });
            return;
        }

        if (isDragging && selectedLayerId && initialLayerState) {
             const dxScreen = e.clientX - dragStart.x;
             const dyScreen = e.clientY - dragStart.y;
             // Convert screen delta to canvas units
             const dx = dxScreen / zoom;
             const dy = dyScreen / zoom;
             
             if (isResizing && resizeHandle) {
                 const newProps = { ...initialLayerState };

                 if (resizeHandle.includes('e')) newProps.width = Math.max(10, initialLayerState.width + dx);
                 if (resizeHandle.includes('s')) newProps.height = Math.max(10, initialLayerState.height + dy);
                 if (resizeHandle.includes('w')) {
                     newProps.width = Math.max(10, initialLayerState.width - dx);
                     newProps.x = initialLayerState.x + dx;
                 }
                 if (resizeHandle.includes('n')) {
                     newProps.height = Math.max(10, initialLayerState.height - dy);
                     newProps.y = initialLayerState.y + dy;
                 }
                 
                 const tempLayers = layers.map(l => l.id === selectedLayerId ? { ...l, ...newProps } : l);
                 setLayers(tempLayers); 
             } else {
                 // Moving
                 const tempLayers = layers.map(l => l.id === selectedLayerId ? { 
                     ...l, 
                     x: initialLayerState.x + dx, 
                     y: initialLayerState.y + dy 
                 } : l);
                 setLayers(tempLayers);
             }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setIsPanning(false);
        setResizeHandle(null);
        setInitialLayerState(null);
    };

    // Zoom to Point Logic
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const onWheel = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                
                const rect = viewport.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const worldX = (mouseX - cx - pan.x) / zoom;
                const worldY = (mouseY - cy - pan.y) / zoom;

                const delta = -e.deltaY * 0.01;
                const newZoom = Math.min(Math.max(0.1, zoom + delta), 5);
                
                const newPanX = mouseX - cx - (worldX * newZoom);
                const newPanY = mouseY - cy - (worldY * newZoom);

                setZoom(newZoom);
                setPan({ x: newPanX, y: newPanY });
            } else {
                e.preventDefault(); 
                setPan(p => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
            }
        };

        viewport.addEventListener('wheel', onWheel, { passive: false });
        return () => viewport.removeEventListener('wheel', onWheel);
    }, [zoom, pan]); 

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleDoubleClick = (e, layer) => {
        e.stopPropagation();
        if (layer && layer.type === 'TEXT' && mode === 'STUDIO' && !layer.locked) {
            setEditingTextId(layer.id);
        }
    };

    const handleTextBlur = () => {
        setEditingTextId(null);
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
            if (editingTextId) return; 

            // Delete
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedLayerId && mode === 'STUDIO') deleteLayer(selectedLayerId);
            }
            // Undo/Redo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                if (e.shiftKey) { if (canRedo) setLayers(redo()); } 
                else { if (canUndo) setLayers(undo()); }
            }
            // Duplicate
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                if (selectedLayerId) duplicateLayer(selectedLayerId);
            }
            // Zoom Fit
            if (e.shiftKey && e.key === '1') {
                zoomToFit();
            }
            // Nudge
            if (selectedLayerId && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                const step = e.shiftKey ? 10 : 1;
                const layer = layers.find(l => l.id === selectedLayerId);
                if (layer) {
                    const updates = {};
                    if (e.key === 'ArrowUp') updates.y = layer.y - step;
                    if (e.key === 'ArrowDown') updates.y = layer.y + step;
                    if (e.key === 'ArrowLeft') updates.x = layer.x - step;
                    if (e.key === 'ArrowRight') updates.x = layer.x + step;
                    updateLayer(selectedLayerId, updates);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedLayerId, mode, canUndo, canRedo, editingTextId, layers, zoom, pan]);

    return (
        <div className="min-h-screen bg-[#020202] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-black" onClick={() => setContextMenu(null)}>
            
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
                     {/* Status Toast */}
                     {statusMessage && (
                         <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 px-3 py-1 bg-[#E3E3FD] text-black font-mono text-[9px] uppercase tracking-widest rounded-[1px]"
                         >
                             <Check size={10} />
                             {statusMessage}
                         </motion.div>
                     )}

                     <div className="flex items-center gap-1 bg-[#0A0A0A] border border-white/5 p-1 rounded-[2px]">
                        <IconButton icon={Undo} onClick={() => setLayers(undo())} disabled={!canUndo} title="Undo (Ctrl+Z)" />
                        <IconButton icon={Redo} onClick={() => setLayers(redo())} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)" />
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
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
                    <button 
                        onClick={handlePublish}
                        className="px-4 py-1.5 bg-[#E3E3FD] text-black font-mono text-[10px] uppercase tracking-widest rounded-[1px] hover:bg-white transition-colors font-semibold flex items-center gap-2"
                    >
                        <Save size={12} />
                        Publish
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 grid grid-cols-12 h-[calc(100vh-3rem)]">
                
                {/* Left Panel */}
                <aside className="col-span-2 border-r border-white/10 bg-[#050505] flex flex-col">
                    <div className="grid grid-cols-2 border-b border-white/10">
                        <button onClick={() => setActiveTab('components')} className={`py-3 font-mono text-[9px] uppercase tracking-widest transition-colors ${activeTab === 'components' ? 'text-[#E3E3FD] border-b border-[#E3E3FD] bg-[#E3E3FD]/5' : 'text-white/40 hover:text-white'}`}>Components</button>
                        <button onClick={() => setActiveTab('layers')} className={`py-3 font-mono text-[9px] uppercase tracking-widest transition-colors ${activeTab === 'layers' ? 'text-[#E3E3FD] border-b border-[#E3E3FD] bg-[#E3E3FD]/5' : 'text-white/40 hover:text-white'}`}>Layers</button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {activeTab === 'components' && mode === 'STUDIO' ? (
                            <div className="p-4 space-y-6">
                                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Explore Components</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={() => addLayer('TEXT')} className="flex flex-col items-center justify-center p-3 border border-white/10 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-colors rounded-sm group"><Type size={16} className="text-white/60 group-hover:text-[#E3E3FD]" /><span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60 group-hover:text-[#E3E3FD]">Text</span></button>
                                    
                                    <button onClick={handleUploadClick} className="flex flex-col items-center justify-center p-3 border border-white/10 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-colors rounded-sm group cursor-pointer relative">
                                        <ImageIcon size={16} className="text-white/60 group-hover:text-[#E3E3FD]" />
                                        <span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60 group-hover:text-[#E3E3FD]">Image</span>
                                        <div className="absolute top-1 right-1"><Plus size={8} className="text-[#E3E3FD]" /></div>
                                    </button>
                                    <input 
                                        type="file" 
                                        multiple 
                                        className="hidden" 
                                        accept="image/*" 
                                        ref={fileInputRef}
                                        onChange={handleFileUpload} 
                                    />

                                    <button onClick={() => addLayer('AI_FRAME')} className="flex flex-col items-center justify-center p-3 border border-white/10 hover:border-[#E3E3FD] hover:bg-[#E3E3FD]/5 transition-colors rounded-sm group"><Sparkles size={16} className="text-white/60 group-hover:text-[#E3E3FD]" /><span className="font-mono text-[8px] mt-2 uppercase tracking-wider text-white/60 group-hover:text-[#E3E3FD]">AI Gen</span></button>
                                </div>
                                <div className="p-4 border border-white/10 bg-[#0A0A0A]">
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-2">Canvas Spec</span>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                         <div className="bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center"><span className="font-mono text-[9px] text-white/40">W</span><input type="number" value={canvasConfig.width} onChange={(e) => setCanvasConfig({...canvasConfig, width: Number(e.target.value)})} className="w-12 bg-transparent text-right font-mono text-[9px] text-[#E3E3FD] focus:outline-none" /></div>
                                         <div className="bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center"><span className="font-mono text-[9px] text-white/40">H</span><input type="number" value={canvasConfig.height} onChange={(e) => setCanvasConfig({...canvasConfig, height: Number(e.target.value)})} className="w-12 bg-transparent text-right font-mono text-[9px] text-[#E3E3FD] focus:outline-none" /></div>
                                    </div>
                                    <div className="w-full bg-[#050505] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                                        <span className="font-mono text-[9px] text-white/40">BG</span>
                                        <div className="flex items-center gap-2"><input type="color" value={canvasConfig.backgroundColor} onChange={(e) => setCanvasConfig({...canvasConfig, backgroundColor: e.target.value})} className="w-4 h-4 rounded-full bg-transparent border-0 p-0" /><span className="font-mono text-[9px] text-white/60">{canvasConfig.backgroundColor}</span></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-2 space-y-1">
                                {layers.slice().reverse().map((layer, index) => (
                                    !layer.hidden && (
                                        <div key={layer.id} className={`flex items-center gap-3 p-3 border ${selectedLayerId === layer.id ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-transparent hover:bg-white/5'} transition-colors rounded-sm cursor-pointer group`} onClick={() => setSelectedLayerId(layer.id)}>
                                            <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => { e.stopPropagation(); reorderLayer(layer.id, 'up'); }} className="hover:text-[#E3E3FD]"><ArrowUp size={8} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); reorderLayer(layer.id, 'down'); }} className="hover:text-[#E3E3FD]"><ArrowDown size={8} /></button>
                                            </div>
                                            <Layers size={14} className={selectedLayerId === layer.id ? 'text-[#E3E3FD]' : 'text-white/40 group-hover:text-white'} />
                                            <span className={`font-mono text-[10px] uppercase tracking-widest ${selectedLayerId === layer.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{layer.type} - {layer.id.slice(-4)}</span>
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
                        <IconButton icon={MousePointer} active={selectedTool === 'select'} onClick={() => setSelectedTool('select')} title="Pointer (V)" />
                        <IconButton icon={Hand} active={selectedTool === 'pan'} onClick={() => setSelectedTool('pan')} title="Pan (H)" />
                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                        <IconButton icon={ZoomOut} onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} title="Zoom Out" />
                        <span className="font-mono text-[9px] text-white/60 px-2 w-10 text-center">{Math.round(zoom * 100)}%</span>
                        <IconButton icon={ZoomIn} onClick={() => setZoom(z => Math.min(5, z + 0.1))} title="Zoom In" />
                    </div>

                    {/* Canvas Wrapper */}
                    <div 
                        className="flex-1 relative overflow-hidden bg-[#080808] cursor-default"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        // onWheel={handleWheel} // Removed in favor of ref-based non-passive listener
                        ref={viewportRef}
                        onMouseDown={handleMouseDown}
                        onContextMenu={handleContextMenu}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        style={{ cursor: isPanning ? 'grabbing' : (selectedTool === 'pan' ? 'grab' : 'default') }}
                    >
                        <Ruler orientation="horizontal" zoom={zoom} pan={pan} />
                        <Ruler orientation="vertical" zoom={zoom} pan={pan} />

                        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
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
                                marginLeft: -canvasConfig.width / 2,
                                marginTop: -canvasConfig.height / 2
                            }}
                        >
                            <div 
                                ref={canvasContentRef}
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
                                            onDoubleClick={(e) => handleDoubleClick(e, layer)}
                                            className="absolute group"
                                            style={{
                                                left: layer.x,
                                                top: layer.y,
                                                width: layer.width,
                                                height: layer.type === 'TEXT' ? 'auto' : layer.height,
                                                zIndex: layer.zIndex,
                                                cursor: (mode === 'CLIENT' && layer.locked) ? 'default' : 'default',
                                                border: layer.borderWidth ? `${layer.borderWidth}px solid ${layer.borderColor}` : 'none',
                                                borderRadius: layer.borderRadius ? `${layer.borderRadius}px` : '0px',
                                                mixBlendMode: layer.blendMode || 'normal',
                                                whiteSpace: layer.type === 'TEXT' ? 'nowrap' : 'normal'
                                            }}
                                        >
                                            {/* Hover Outline */}
                                            {selectedLayerId !== layer.id && mode === 'STUDIO' && (
                                                <div className="absolute inset-0 border border-[#E3E3FD] opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity"></div>
                                            )}

                                            {/* Content Rendering */}
                                            {layer.type === 'TEXT' && (
                                                editingTextId === layer.id ? (
                                                    <textarea
                                                        autoFocus
                                                        value={layer.text}
                                                        onChange={(e) => updateLayer(layer.id, { text: e.target.value })}
                                                        onBlur={handleTextBlur}
                                                        onKeyDown={(e) => { 
                                                            if(e.key === 'Enter' && !e.shiftKey) { 
                                                                handleTextBlur(); 
                                                                e.preventDefault(); 
                                                            } 
                                                            e.stopPropagation(); 
                                                        }}
                                                        style={{
                                                            color: layer.color,
                                                            fontSize: `${layer.fontSize}px`,
                                                            fontFamily: layer.fontFamily,
                                                            textAlign: layer.textAlign,
                                                            lineHeight: 1.2,
                                                            background: 'transparent',
                                                            border: 'none',
                                                            outline: 'none',
                                                            width: '100%',
                                                            height: '100%',
                                                            padding: 0,
                                                            margin: 0,
                                                            resize: 'none',
                                                            overflow: 'hidden'
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        color: layer.color,
                                                        fontSize: `${layer.fontSize}px`,
                                                        fontFamily: layer.fontFamily,
                                                        textAlign: layer.textAlign,
                                                        lineHeight: 1.2,
                                                        whiteSpace: 'pre-wrap'
                                                    }}>
                                                        {layer.text || 'Text Layer'}
                                                    </div>
                                                )
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
                                                        <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5 flex items-center gap-2 pointer-events-auto">
                                                            <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">{layer.id}</span>
                                                        </div>
                                                    </div>
                                                    {/* Resize Handles */}
                                                    {['nw', 'ne', 'sw', 'se'].map(h => (
                                                        <div 
                                                            key={h}
                                                            onMouseDown={(e) => handleMouseDown(e, layer, h)}
                                                            className={`absolute w-2 h-2 bg-white border border-[#E3E3FD] z-50 cursor-${h}-resize`}
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

                        {/* Context Menu */}
                        {contextMenu && selectedLayerId && (
                            <div 
                                className="absolute bg-[#050505] border border-white/10 shadow-2xl z-50 w-48 flex flex-col p-1"
                                style={{ top: contextMenu.y, left: contextMenu.x }}
                            >
                                <button onClick={() => { duplicateLayer(selectedLayerId); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>Duplicate</span> <span className="text-white/40 group-hover:text-black/40">Ctrl+D</span>
                                </button>
                                <button onClick={() => { reorderLayer(selectedLayerId, 'up'); setContextMenu(null); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>Bring Forward</span> <span className="text-white/40 group-hover:text-black/40">]</span>
                                </button>
                                <button onClick={() => { reorderLayer(selectedLayerId, 'down'); setContextMenu(null); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>Send Backward</span> <span className="text-white/40 group-hover:text-black/40">[</span>
                                </button>
                                <div className="h-px bg-white/10 my-1"></div>
                                <button onClick={() => deleteLayer(selectedLayerId)} className="text-left px-3 py-2 text-[10px] font-mono text-red-400 hover:bg-red-900/20 uppercase tracking-widest flex items-center justify-between">
                                    <span>Delete</span> <span>Del</span>
                                </button>
                            </div>
                        )}

                        {/* Zoom Controls Overlay */}
                        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest pointer-events-none">
                            VP: {canvasConfig.width}x{canvasConfig.height} // ZOOM: {Math.round(zoom * 100)}% // PAN: {Math.round(pan.x)},{Math.round(pan.y)}
                        </div>
                    </div>
                </main>

                {/* Right Panel */}
                <aside className="col-span-3 border-l border-white/10 bg-[#050505] flex flex-col">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Specifications</span>
                        <Maximize2 size={12} className="text-white/40" />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                        {selectedLayer ? (
                            <LayerProperties layer={selectedLayer} mode={mode} onUpdate={updateLayer} onDelete={deleteLayer} />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-white/20">
                                <MousePointer size={24} strokeWidth={1} className="mb-2" />
                                <span className="font-mono text-[10px] uppercase tracking-widest">Select an element</span>
                            </div>
                        )}
                        {mode === 'CLIENT' && (
                            <div className="pt-6 border-t border-white/10 mt-auto">
                                <h2 className="font-mono text-[9px] font-bold text-[#E3E3FD] uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={12} /> Generator Protocol</h2>
                                <div className="space-y-4">
                                   <div><label className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1.5">Subject Input</label><input type="text" value={clientSubject} onChange={(e) => setClientSubject(e.target.value)} placeholder="Enter subject..." className="w-full bg-[#0A0A0A] border border-white/10 p-2 text-xs text-white focus:border-[#E3E3FD] focus:outline-none font-mono placeholder-white/20" /></div>
                                   <button onClick={handleGenerate} disabled={isGenerating || !clientSubject} className={`w-full py-3 font-mono text-[9px] font-bold uppercase tracking-widest transition-all ${isGenerating ? 'bg-white/10 text-white/40 cursor-wait' : 'bg-[#E3E3FD] text-black hover:bg-white'}`}>{isGenerating ? 'INITIALIZING...' : 'EXECUTE GENERATION'}</button>
                                   {generationError && <div className="p-2 border border-red-900/50 bg-red-900/10 text-red-400 text-[9px] font-mono">ERROR: {generationError}</div>}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-white/10">
                        <button 
                            onClick={handleExport}
                            className="w-full py-3 border border-white/20 hover:border-[#E3E3FD] hover:text-[#E3E3FD] transition-all group flex items-center justify-center gap-2 bg-white/5"
                        >
                            <Download size={14} className="group-hover:animate-bounce" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Export Artifact</span>
                        </button>
                    </div>
                </aside>
                
                {/* Global File Input */}
                <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    accept="image/*" 
                    ref={fileInputRef}
                    onChange={handleFileUpload} 
                />
            </div>
        </div>
    );
}
