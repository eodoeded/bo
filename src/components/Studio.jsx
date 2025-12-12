import { motion, AnimatePresence } from 'framer-motion';
import { 
    Type, Image as ImageIcon, Sparkles, Layers, 
    Settings, Download, ChevronRight, Maximize2, 
    Move, Sliders, Box, Grid, Monitor, Eye, EyeOff,
    MousePointer, ZoomIn, ZoomOut, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight,
    Bold, Italic, Underline, MoreHorizontal,
    Check, Lock, Unlock, Trash2, ArrowLeft,
    CornerRightDown,
    Plus, Upload,
    Copy, Search, Layout,
    ArrowUp, ArrowDown,
    Save,
    BringToFront, SendToBack,
    HelpCircle
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { SmartImage } from './studio/SmartImage';
import { LayerProperties } from './studio/LayerProperties';
import { CanvasProperties } from './studio/CanvasProperties';
import { ShortcutsHelp } from './studio/ShortcutsHelp';
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

const Ruler = ({ orientation = 'horizontal', zoom = 1, pan = {x:0, y:0}, onDragStart }) => {
    const ticks = Array.from({ length: 50 });
    return (
        <div 
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onDragStart && onDragStart(orientation, e); }}
            className={`absolute bg-[#050505] border-white/10 z-10 overflow-hidden hover:bg-white/5 transition-colors cursor-crosshair ${orientation === 'horizontal' ? 'top-0 left-0 right-0 h-6 border-b flex items-end' : 'top-0 left-0 bottom-0 w-6 border-r flex flex-col items-end'}`}
        >
            {ticks.map((_, i) => {
                const value = Math.round(i * 100);
                return (
                    <div 
                        key={i} 
                        className={`absolute bg-white/20 pointer-events-none ${orientation === 'horizontal' ? 'w-px h-2' : 'h-px w-2'}`}
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
    locked: false, 
    allowContentChange: false,
    lockPosition: true, 
    opacity: 1, 
    visible: true, 
    rotation: 0,
    brightness: 100, contrast: 100, blur: 0,
    flipX: false, flipY: false,
    shadow: false, shadowColor: '#000000', shadowBlur: 10, shadowX: 0, shadowY: 4
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
    locked: false,
    allowContentChange: true,
    lockPosition: false,
    opacity: 1,
    visible: true,
    rotation: 0,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textTransform: 'none',
    flipX: false, flipY: false,
    shadow: false, shadowColor: '#000000', shadowBlur: 10, shadowX: 0, shadowY: 4
  },
  {
    id: 'ai-frame',
    type: 'AI_FRAME',
    x: 40, y: 80, width: 300, height: 350, zIndex: 5,
    locked: false,
    allowContentChange: true,
    aiPromptTemplate: "A mystical tarot card illustration of {subject}, high contrast, black and white ink drawing, woodcut style, esoteric symbols, white background, clean lines",
    src: "https://picsum.photos/270/350",
    borderWidth: 1,
    borderColor: "#4338ca",
    borderRadius: 8,
    filterType: 'dither',
    blendMode: 'screen',
    lockPosition: false,
    opacity: 1,
    visible: true,
    rotation: 0,
    brightness: 100, contrast: 100, blur: 0,
    flipX: false, flipY: false,
    shadow: false, shadowColor: '#000000', shadowBlur: 10, shadowX: 0, shadowY: 4
  }
];

// Helper for bounds
const getBounds = (items) => {
    if (items.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
    const minX = Math.min(...items.map(i => i.x));
    const minY = Math.min(...items.map(i => i.y));
    const maxX = Math.max(...items.map(i => i.x + i.width));
    const maxY = Math.max(...items.map(i => i.y + i.height));
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};

export default function Studio() {
    // App State
    const [mode, setMode] = useState('STUDIO'); // STUDIO | CLIENT
    const [activeTab, setActiveTab] = useState('components');
    const [selectedTool, setSelectedTool] = useState('select');
    const [statusMessage, setStatusMessage] = useState(null); 
    const [snapToGrid, setSnapToGrid] = useState(false); // Snap Toggle
    const [showShortcuts, setShowShortcuts] = useState(false); // Shortcuts Help
    const [guides, setGuides] = useState([]); // Ruler Guides
    const [draggedGuideId, setDraggedGuideId] = useState(null); // Current dragged guide
    
    // Canvas Viewport
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const viewportRef = useRef(null);
    const canvasContentRef = useRef(null);
    const fileInputRef = useRef(null);
    
    // History & Layers
    const [layers, setLayers, undo, redo, canUndo, canRedo] = useHistory(INITIAL_LAYERS);
    const [selectedLayerIds, setSelectedLayerIds] = useState([]); // Array of IDs
    const [canvasConfig, setCanvasConfig] = useState({
        width: 380,
        height: 500,
        backgroundColor: '#1C3A96'
    });
    const [clipboard, setClipboard] = useState([]); // For internal copy/paste

    // Client State
    const [clientSubject, setClientSubject] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState(null);

    // Interaction State
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false); 
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialLayerStates, setInitialLayerStates] = useState({}); // Map of ID -> {x,y,w,h}
    const [initialSelectionBounds, setInitialSelectionBounds] = useState(null); // For multi-resize
    const [resizeHandle, setResizeHandle] = useState(null);
    const [isPanning, setIsPanning] = useState(false);
    const [editingTextId, setEditingTextId] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const [selectionBox, setSelectionBox] = useState(null); 
    const [isAltPressed, setIsAltPressed] = useState(false);
    const [isSpacePressed, setIsSpacePressed] = useState(false); 

    // Helpers
    const selectedLayers = layers.filter(l => selectedLayerIds.includes(l.id));
    const primarySelectedLayer = selectedLayers.length > 0 ? selectedLayers[selectedLayers.length - 1] : null; 
    
    const showToast = (msg) => {
        setStatusMessage(msg);
        setTimeout(() => setStatusMessage(null), 2000);
    };

    const updateLayer = (id, updates) => {
        if (selectedLayerIds.includes(id) && selectedLayerIds.length > 1) {
            const newLayers = layers.map(l => selectedLayerIds.includes(l.id) ? { ...l, ...updates } : l);
            setLayers(newLayers);
        } else {
            const newLayers = layers.map(l => l.id === id ? { ...l, ...updates } : l);
            setLayers(newLayers);
        }
    };

    const updateLayers = (updatesMap) => {
        const newLayers = layers.map(l => updatesMap[l.id] ? { ...l, ...updatesMap[l.id] } : l);
        setLayers(newLayers);
    };

    const deleteLayer = (id) => {
        setLayers(layers.filter(l => l.id !== id));
        setSelectedLayerIds(prev => prev.filter(pid => pid !== id));
        setContextMenu(null);
    };

    const deleteSelectedLayers = () => {
        if (selectedLayerIds.length === 0) return;
        setLayers(layers.filter(l => !selectedLayerIds.includes(l.id)));
        setSelectedLayerIds([]);
    };

    const toggleVisibility = (id) => {
        const layer = layers.find(l => l.id === id);
        if (layer) {
            updateLayer(id, { visible: !layer.visible });
        }
    };

    const toggleLock = (ids) => {
        if (!ids || ids.length === 0) return;
        const targetId = ids[0];
        const layer = layers.find(l => l.id === targetId);
        if (!layer) return;
        
        const newLockedState = !layer.lockPosition; 
        
        const newLayers = layers.map(l => ids.includes(l.id) ? { ...l, lockPosition: newLockedState } : l);
        setLayers(newLayers);
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
        setSelectedLayerIds([newLayer.id]); 
        setContextMenu(null);
    };

    const duplicateSelectedLayers = () => {
        if (selectedLayerIds.length === 0) return;
        const newLayers = [...layers];
        const newIds = [];
        selectedLayerIds.forEach(id => {
            const layer = layers.find(l => l.id === id);
            if (layer) {
                const newLayer = {
                    ...layer,
                    id: `copy-${Math.random().toString(36).substr(2, 5)}`,
                    x: layer.x + 20,
                    y: layer.y + 20,
                    zIndex: newLayers.length + 1
                };
                newLayers.push(newLayer);
                newIds.push(newLayer.id);
            }
        });
        setLayers(newLayers);
        setSelectedLayerIds(newIds);
    };

    const copySelectedLayers = () => {
        if (selectedLayerIds.length === 0) return;
        const items = layers.filter(l => selectedLayerIds.includes(l.id));
        setClipboard(items);
        showToast(`Copied ${items.length} Elements`);
    };

    const pasteLayers = () => {
        if (clipboard.length === 0) return;
        const newLayers = [...layers];
        const newIds = [];
        
        clipboard.forEach(item => {
             const newLayer = {
                 ...item,
                 id: `paste-${Math.random().toString(36).substr(2, 5)}`,
                 x: item.x + 20, 
                 y: item.y + 20,
                 zIndex: newLayers.length + 1
             };
             newLayers.push(newLayer);
             newIds.push(newLayer.id);
        });
        
        setLayers(newLayers);
        setSelectedLayerIds(newIds);
        showToast(`Pasted ${clipboard.length} Elements`);
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
        newLayers.forEach((l, i) => l.zIndex = i);
        setLayers(newLayers);
    };
    
    const reorderSelectedLayers = (direction) => {
        if (selectedLayerIds.length === 0) return;
        
        let newLayers = [...layers];
        const selectedIndices = selectedLayerIds.map(id => layers.findIndex(l => l.id === id)).sort((a,b) => a - b);
        
        if (direction === 'down') { // Backward
             for (const idx of selectedIndices) {
                 if (idx > 0 && !selectedLayerIds.includes(newLayers[idx - 1].id)) {
                     [newLayers[idx], newLayers[idx - 1]] = [newLayers[idx - 1], newLayers[idx]];
                 }
             }
        } else if (direction === 'up') { // Forward
             for (let i = selectedIndices.length - 1; i >= 0; i--) {
                 const idx = selectedIndices[i];
                 if (idx < newLayers.length - 1 && !selectedLayerIds.includes(newLayers[idx + 1].id)) {
                     [newLayers[idx], newLayers[idx + 1]] = [newLayers[idx + 1], newLayers[idx]];
                 }
             }
        }
        
        newLayers.forEach((l, i) => l.zIndex = i);
        setLayers(newLayers);
    };

    // ALIGNMENT LOGIC
    const alignSelectedLayers = (alignment) => {
        if (selectedLayerIds.length === 0) return;

        if (selectedLayerIds.length === 1) {
             const layer = layers.find(l => l.id === selectedLayerIds[0]);
             if (!layer) return;
             const updates = {};
             
             if (alignment === 'left') updates.x = 0;
             if (alignment === 'center') updates.x = (canvasConfig.width - layer.width) / 2;
             if (alignment === 'right') updates.x = canvasConfig.width - layer.width;
             if (alignment === 'top') updates.y = 0;
             if (alignment === 'middle') updates.y = (canvasConfig.height - layer.height) / 2;
             if (alignment === 'bottom') updates.y = canvasConfig.height - layer.height;
             
             updateLayer(layer.id, updates);
             return;
        }

        const selectedItems = layers.filter(l => selectedLayerIds.includes(l.id));
        const minX = Math.min(...selectedItems.map(l => l.x));
        const maxX = Math.max(...selectedItems.map(l => l.x + l.width));
        const minY = Math.min(...selectedItems.map(l => l.y));
        const maxY = Math.max(...selectedItems.map(l => l.y + l.height));
        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;

        const updates = {};
        selectedItems.forEach(l => {
             const u = {};
             if (alignment === 'left') u.x = minX;
             if (alignment === 'center') u.x = midX - (l.width / 2);
             if (alignment === 'right') u.x = maxX - l.width;
             if (alignment === 'top') u.y = minY;
             if (alignment === 'middle') u.y = midY - (l.height / 2);
             if (alignment === 'bottom') u.y = maxY - l.height;
             updates[l.id] = u;
        });
        updateLayers(updates);
    };

    const distributeSelectedLayers = (axis) => { // axis: 'x' or 'y'
        if (selectedLayerIds.length < 3) return; // Need 3+ to distribute
        const items = layers.filter(l => selectedLayerIds.includes(l.id));
        const dimension = axis === 'x' ? 'width' : 'height';
        
        // Sort
        const sorted = [...items].sort((a, b) => a[axis] - b[axis]);
        
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        
        // Distribute Centers
        const startCenter = first[axis] + first[dimension] / 2;
        const endCenter = last[axis] + last[dimension] / 2;
        const totalSpan = endCenter - startCenter;
        const step = totalSpan / (sorted.length - 1);
        
        const updates = {};
        sorted.forEach((l, i) => {
            if (i === 0 || i === sorted.length - 1) return; // Pin ends
            const newCenter = startCenter + (step * i);
            updates[l.id] = { [axis]: newCenter - (l[dimension] / 2) };
        });
        
        updateLayers(updates);
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
            lockPosition: false, 
            opacity: 1, 
            visible: true, 
            rotation: 0,
            brightness: 100, contrast: 100, blur: 0,
            flipX: false, flipY: false,
            shadow: false, shadowColor: '#000000', shadowBlur: 10, shadowX: 0, shadowY: 4,
            aiPromptTemplate: type === 'AI_FRAME' ? "A render of {subject}" : undefined,
            filterType: 'none',
            blendMode: 'normal'
        };
        setLayers([...layers, newLayer]);
        setSelectedLayerIds([newLayer.id]);
    };

    const zoomToFit = () => {
        if (!viewportRef.current) return;
        const rect = viewportRef.current.getBoundingClientRect();
        const margin = 50;
        
        const scaleX = (rect.width - margin * 2) / canvasConfig.width;
        const scaleY = (rect.height - margin * 2) / canvasConfig.height;
        const newZoom = Math.min(scaleX, scaleY, 1);
        
        setZoom(newZoom);
        setPan({ x: 0, y: 0 }); 
    };

    const zoomToSelection = () => {
        if (selectedLayerIds.length === 0 || !viewportRef.current) return;
        const selectedItems = layers.filter(l => selectedLayerIds.includes(l.id));
        if (selectedItems.length === 0) return;

        const minX = Math.min(...selectedItems.map(l => l.x));
        const maxX = Math.max(...selectedItems.map(l => l.x + l.width));
        const minY = Math.min(...selectedItems.map(l => l.y));
        const maxY = Math.max(...selectedItems.map(l => l.y + l.height));
        
        const w = maxX - minX;
        const h = maxY - minY;
        
        const padding = 100;
        const rect = viewportRef.current.getBoundingClientRect();
        
        const scaleX = (rect.width - padding * 2) / w;
        const scaleY = (rect.height - padding * 2) / h;
        const newZoom = Math.min(scaleX, scaleY, 4); 
        
        const midX = minX + w / 2;
        const midY = minY + h / 2;
        
        const dx = midX - (canvasConfig.width / 2);
        const dy = midY - (canvasConfig.height / 2);
        
        setZoom(newZoom);
        setPan({ x: -dx * newZoom, y: -dy * newZoom });
    };

    // --- ACTIONS ---

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setLayers(prev => { return prev; }); 

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
                scale: 2,
                logging: false,
                useCORS: true
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
        showToast("Project Published Successfully");
    };

    // --- PASTE SUPPORT ---
    useEffect(() => {
        const handlePaste = (e) => {
            if (editingTextId) return;

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

    const getCanvasPoint = (clientX, clientY) => {
        if (!viewportRef.current) return { x: 0, y: 0 };
        const rect = viewportRef.current.getBoundingClientRect();
        
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const worldX = (mouseX - cx - pan.x) / zoom;
        const worldY = (mouseY - cy - pan.y) / zoom;

        const canvasX = worldX + (canvasConfig.width / 2);
        const canvasY = worldY + (canvasConfig.height / 2);
        
        return { x: canvasX, y: canvasY };
    };

    const handleRulerDragStart = (orientation, e) => {
        const id = `guide-${Date.now()}`;
        const point = getCanvasPoint(e.clientX, e.clientY);
        const type = orientation === 'horizontal' ? 'h' : 'v'; // Dragging from top makes horizontal guide
        const pos = type === 'h' ? point.y : point.x;
        
        setGuides(prev => [...prev, { id, type, pos }]);
        setDraggedGuideId(id);
    };

    const handleMouseDown = (e, layer = null, handle = null) => {
        if (e.button === 2) return; 
        if (editingTextId) return; 

        setContextMenu(null);

        // Pan Logic
        if (e.button === 1 || selectedTool === 'pan' || isSpacePressed) {
            setIsPanning(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            return;
        }

        const point = getCanvasPoint(e.clientX, e.clientY);

        // Layer Click
        if (layer) {
            e.stopPropagation();
            
            if (mode === 'CLIENT' && layer.locked) return;
            
            // Alt + Drag Duplicate Logic
            if (e.altKey && !layer.lockPosition && !handle) {
                let idsToDup = selectedLayerIds;
                if (!idsToDup.includes(layer.id)) {
                    idsToDup = [layer.id];
                }
                
                const newLayers = [...layers];
                const newIds = [];
                const newInitialStates = {};
                
                idsToDup.forEach(id => {
                    const l = layers.find(item => item.id === id);
                    if (l) {
                        const newLayer = {
                            ...l,
                            id: `copy-${Math.random().toString(36).substr(2, 5)}`,
                            zIndex: newLayers.length + 1
                        };
                        newLayers.push(newLayer);
                        newIds.push(newLayer.id);
                        newInitialStates[newLayer.id] = { x: newLayer.x, y: newLayer.y, width: newLayer.width, height: newLayer.height };
                    }
                });
                
                setLayers(newLayers);
                setSelectedLayerIds(newIds);
                setInitialLayerStates(newInitialStates);
                setInitialSelectionBounds(getBounds(newLayers.filter(l => newIds.includes(l.id))));
                
                setIsDragging(true);
                setDragStart({ x: e.clientX, y: e.clientY });
                return;
            }

            // Multi-select Logic
            let newSelectedIds = [...selectedLayerIds];
            if (e.shiftKey) {
                if (newSelectedIds.includes(layer.id)) {
                    newSelectedIds = newSelectedIds.filter(id => id !== layer.id);
                } else {
                    newSelectedIds.push(layer.id);
                }
            } else {
                if (!newSelectedIds.includes(layer.id)) {
                    newSelectedIds = [layer.id];
                }
            }
            setSelectedLayerIds(newSelectedIds);

            // Start Dragging
            if (mode === 'STUDIO' && (layer.locked || layer.lockPosition) && !handle) {
                // If position is locked, select but don't drag
                return;
            }

            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            
            const initialStates = {};
            newSelectedIds.forEach(id => {
                const l = layers.find(item => item.id === id);
                if (l) initialStates[id] = { x: l.x, y: l.y, width: l.width, height: l.height, fontSize: l.fontSize };
            });
            setInitialLayerStates(initialStates);
            setInitialSelectionBounds(getBounds(newSelectedIds.map(id => layers.find(l => l.id === id))));

            if (handle) {
                setIsResizing(true);
                setResizeHandle(handle);
            }
        } else {
            // Background Click -> Start Marquee
            if (e.target === viewportRef.current || e.target === canvasContentRef.current || e.target.classList.contains('canvas-bg')) {
                if (!e.shiftKey) setSelectedLayerIds([]); 
                setIsSelecting(true);
                setDragStart(point); 
                setSelectionBox({ x: point.x, y: point.y, w: 0, h: 0 });
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

        const currentCanvasPoint = getCanvasPoint(e.clientX, e.clientY);

        // Guide Dragging
        if (draggedGuideId) {
            setGuides(prev => prev.map(g => {
                if (g.id === draggedGuideId) {
                    return { ...g, pos: g.type === 'h' ? currentCanvasPoint.y : currentCanvasPoint.x };
                }
                return g;
            }));
            return;
        }

        // Marquee Selection
        if (isSelecting) {
            const x = Math.min(dragStart.x, currentCanvasPoint.x);
            const y = Math.min(dragStart.y, currentCanvasPoint.y);
            const w = Math.abs(currentCanvasPoint.x - dragStart.x);
            const h = Math.abs(currentCanvasPoint.y - dragStart.y);
            setSelectionBox({ x, y, w, h });
            return;
        }

        // Dragging & Resizing
        if (isDragging && Object.keys(initialLayerStates).length > 0) {
             const dxScreen = e.clientX - dragStart.x;
             const dyScreen = e.clientY - dragStart.y;
             const rawDx = dxScreen / zoom;
             const rawDy = dyScreen / zoom;
             
             // Snap Logic
             let dx = rawDx;
             let dy = rawDy;
             
             if (snapToGrid) {
                 dx = Math.round(rawDx / 10) * 10;
                 dy = Math.round(rawDy / 10) * 10;
             }

             // Snap to Guides (Same as before)
             if (guides.length > 0 && !isResizing && selectedLayerIds.length > 0) {
                 const activeId = selectedLayerIds[selectedLayerIds.length - 1]; 
                 const initial = initialLayerStates[activeId];
                 
                 if (initial) {
                     // ... guide snap logic ...
                     const vGuides = guides.filter(g => g.type === 'v');
                     let bestDx = dx;
                     let minDistX = 10 / zoom; 
                     vGuides.forEach(g => {
                         const distLeft = Math.abs(g.pos - (initial.x + dx));
                         if (distLeft < minDistX) { bestDx = g.pos - initial.x; minDistX = distLeft; }
                         const distCenter = Math.abs(g.pos - (initial.x + initial.width/2 + dx));
                         if (distCenter < minDistX) { bestDx = g.pos - (initial.x + initial.width/2); minDistX = distCenter; }
                         const distRight = Math.abs(g.pos - (initial.x + initial.width + dx));
                         if (distRight < minDistX) { bestDx = g.pos - (initial.x + initial.width); minDistX = distRight; }
                     });
                     dx = bestDx;

                     const hGuides = guides.filter(g => g.type === 'h');
                     let bestDy = dy;
                     let minDistY = 10 / zoom;
                     hGuides.forEach(g => {
                         const distTop = Math.abs(g.pos - (initial.y + dy));
                         if (distTop < minDistY) { bestDy = g.pos - initial.y; minDistY = distTop; }
                         const distMiddle = Math.abs(g.pos - (initial.y + initial.height/2 + dy));
                         if (distMiddle < minDistY) { bestDy = g.pos - (initial.y + initial.height/2); minDistY = distMiddle; }
                         const distBottom = Math.abs(g.pos - (initial.y + initial.height + dy));
                         if (distBottom < minDistY) { bestDy = g.pos - (initial.y + initial.height); minDistY = distBottom; }
                     });
                     dy = bestDy;
                 }
             }
             
             if (isResizing && resizeHandle && initialSelectionBounds) {
                 const oldBounds = initialSelectionBounds;
                 let newBounds = { ...oldBounds };

                 // Calculate new bounds based on handle
                 if (resizeHandle.includes('e')) newBounds.width = Math.max(10, oldBounds.width + dx);
                 if (resizeHandle.includes('w')) {
                     const newW = Math.max(10, oldBounds.width - dx);
                     newBounds.x = oldBounds.x + (oldBounds.width - newW);
                     newBounds.width = newW;
                 }
                 if (resizeHandle.includes('s')) newBounds.height = Math.max(10, oldBounds.height + dy);
                 if (resizeHandle.includes('n')) {
                     const newH = Math.max(10, oldBounds.height - dy);
                     newBounds.y = oldBounds.y + (oldBounds.height - newH);
                     newBounds.height = newH;
                 }
                 
                 // Aspect Ratio Lock (Shift) - Basic implementation for bounds
                 if (e.shiftKey) {
                     const ratio = oldBounds.width / oldBounds.height;
                     if (resizeHandle.includes('e') || resizeHandle.includes('w')) {
                         newBounds.height = newBounds.width / ratio;
                         if (resizeHandle.includes('n')) newBounds.y = oldBounds.y + (oldBounds.height - newBounds.height);
                     } else {
                         newBounds.width = newBounds.height * ratio;
                         if (resizeHandle.includes('w')) newBounds.x = oldBounds.x + (oldBounds.width - newBounds.width);
                     }
                 }

                 // Calculate Scale Factors
                 const scaleX = newBounds.width / oldBounds.width;
                 const scaleY = newBounds.height / oldBounds.height;

                 // Apply to all selected layers
                 const updates = {};
                 selectedLayerIds.forEach(id => {
                     const init = initialLayerStates[id];
                     if (!init) return;

                     // Relative position from bounds origin
                     const relX = init.x - oldBounds.x;
                     const relY = init.y - oldBounds.y;

                     const newLayer = {
                         x: newBounds.x + (relX * scaleX),
                         y: newBounds.y + (relY * scaleY),
                         width: init.width * scaleX,
                         height: init.height * scaleY
                     };

                     // Font Scaling
                     if (init.fontSize) {
                         newLayer.fontSize = init.fontSize * scaleY;
                     }

                     updates[id] = newLayer;
                 });
                 updateLayers(updates);

             } else {
                 // Moving (Multi Layer) - No changes needed here, existing logic is fine for translation
                 const updates = {};
                 selectedLayerIds.forEach(id => {
                     const layer = layers.find(l => l.id === id);
                     if (layer && !layer.lockPosition) { 
                         const init = initialLayerStates[id];
                         if (init) {
                             updates[id] = {
                                 x: init.x + dx,
                                 y: init.y + dy
                             };
                         }
                     }
                 });
                 updateLayers(updates);
             }
        }
    };

    const handleMouseUp = () => {
        // Guide Deletion Logic
        if (draggedGuideId) {
            const guide = guides.find(g => g.id === draggedGuideId);
            if (guide) {
                // If dragged out of canvas area (plus margin), delete
                const margin = 50;
                const isOut = 
                    (guide.type === 'v' && (guide.pos < -margin || guide.pos > canvasConfig.width + margin)) ||
                    (guide.type === 'h' && (guide.pos < -margin || guide.pos > canvasConfig.height + margin));
                
                if (isOut) {
                    setGuides(prev => prev.filter(g => g.id !== draggedGuideId));
                    showToast("Guide Deleted");
                }
            }
            setDraggedGuideId(null);
        }

        if (isSelecting && selectionBox) {
            const selected = [];
            layers.forEach(l => {
                if (
                    l.x < selectionBox.x + selectionBox.w &&
                    l.x + l.width > selectionBox.x &&
                    l.y < selectionBox.y + selectionBox.h &&
                    l.y + l.height > selectionBox.y
                ) {
                    if (!l.hidden && (!l.locked || mode === 'STUDIO')) {
                         selected.push(l.id);
                    }
                }
            });
            setSelectedLayerIds(prev => [...new Set([...prev, ...selected])]); 
        }

        setIsDragging(false);
        setIsResizing(false);
        setIsPanning(false);
        setIsSelecting(false);
        setResizeHandle(null);
        setInitialLayerStates({});
        setInitialSelectionBounds(null); // Clear bounds
        setSelectionBox(null);
    };

    // ... (Zoom, Alt, Context, DoubleClick, Blur, Generate, Hotkeys) ...
    // Note: Re-include all existing effects and handlers here
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

    // Alt Key & Spacebar Listener
    useEffect(() => {
        const handleKey = (e) => {
            setIsAltPressed(e.altKey);
            
            if (e.code === 'Space' && !e.repeat && !editingTextId) {
                if (e.type === 'keydown') setIsSpacePressed(true);
                if (e.type === 'keyup') setIsSpacePressed(false);
            }

            // Shortcuts Help (?)
            if (e.key === '?' && !editingTextId) {
                setShowShortcuts(prev => !prev);
            }
        };
        
        window.addEventListener('keydown', handleKey);
        window.addEventListener('keyup', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('keyup', handleKey);
        };
    }, [editingTextId]);

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

            // Copy
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                e.preventDefault();
                copySelectedLayers();
            }
            // Paste
            if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                e.preventDefault();
                pasteLayers();
            }

            // Delete
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedLayerIds.length > 0 && mode === 'STUDIO') deleteSelectedLayers();
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
                if (selectedLayerIds.length > 0) duplicateSelectedLayers();
            }
            // Layer Reordering (Z-Index)
            if (selectedLayerIds.length > 0) {
                 if (e.key === '[') reorderSelectedLayers('down');
                 if (e.key === ']') reorderSelectedLayers('up');
            }

            // Zoom Fit / Selection
            if (e.shiftKey && e.key === '1') zoomToFit();
            if (e.shiftKey && e.key === '2') zoomToSelection();

            // Nudge
            if (selectedLayerIds.length > 0 && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                const step = e.shiftKey ? 10 : 1;
                const updates = {};
                
                selectedLayerIds.forEach(id => {
                    const layer = layers.find(l => l.id === id);
                    if (layer && !layer.lockPosition) {
                        updates[id] = { ...layer };
                        if (e.key === 'ArrowUp') updates[id].y -= step;
                        if (e.key === 'ArrowDown') updates[id].y += step;
                        if (e.key === 'ArrowLeft') updates[id].x -= step;
                        if (e.key === 'ArrowRight') updates[id].x += step;
                    }
                });
                updateLayers(updates);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedLayerIds, mode, canUndo, canRedo, editingTextId, layers, zoom, pan, clipboard]);

    return (
        <div className="min-h-screen bg-[#020202] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-black" onClick={() => setContextMenu(null)}>
            
            {/* Shortcuts Modal */}
            <AnimatePresence>
                {showShortcuts && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100]"
                    >
                        <ShortcutsHelp onClose={() => setShowShortcuts(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

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
                    <IconButton icon={HelpCircle} onClick={() => setShowShortcuts(true)} title="Keyboard Shortcuts (?)" />
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-2 bg-[#0A0A0A] border border-white/10 p-1 rounded-[2px]">
                        <button 
                            onClick={() => { setMode('STUDIO'); setSelectedLayerIds([]); }}
                            className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest rounded-[1px] transition-colors ${mode === 'STUDIO' ? 'bg-[#E3E3FD] text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            Studio
                        </button>
                        <button 
                            onClick={() => { setMode('CLIENT'); setSelectedLayerIds([]); }}
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
                            </div>
                        ) : (
                            <div className="p-2 space-y-1">
                                {layers.slice().reverse().map((layer, index) => (
                                    !layer.hidden && (
                                        <div 
                                            key={layer.id} 
                                            className={`flex items-center gap-3 p-3 border ${selectedLayerIds.includes(layer.id) ? 'border-[#E3E3FD] bg-[#E3E3FD]/5' : 'border-transparent hover:bg-white/5'} transition-colors rounded-sm cursor-pointer group`} 
                                            onClick={(e) => {
                                                if(e.shiftKey) {
                                                    const newIds = selectedLayerIds.includes(layer.id) ? selectedLayerIds.filter(i => i !== layer.id) : [...selectedLayerIds, layer.id];
                                                    setSelectedLayerIds(newIds);
                                                } else {
                                                    setSelectedLayerIds([layer.id]);
                                                }
                                            }}
                                        >
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }} className="hover:text-[#E3E3FD]">
                                                    {layer.visible ? <Eye size={10} /> : <EyeOff size={10} className="text-white/40" />}
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); toggleLock([layer.id]); }} className="hover:text-[#E3E3FD]">
                                                    {layer.lockPosition ? <Lock size={10} className="text-[#E3E3FD]" /> : <Unlock size={10} className="text-white/40" />}
                                                </button>
                                            </div>
                                            <Layers size={14} className={selectedLayerIds.includes(layer.id) ? 'text-[#E3E3FD]' : 'text-white/40 group-hover:text-white'} />
                                            <span className={`font-mono text-[10px] uppercase tracking-widest ${selectedLayerIds.includes(layer.id) ? 'text-white' : 'text-white/60 group-hover:text-white'} ${!layer.visible ? 'opacity-50 line-through' : ''}`}>
                                                {layer.type} - {layer.id.slice(-4)}
                                            </span>
                                            {selectedLayerIds.includes(layer.id) && <div className="ml-auto w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>}
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
                        <IconButton icon={MousePointer} active={selectedTool === 'select' && !isSpacePressed} onClick={() => setSelectedTool('select')} title="Pointer (V)" />
                        {/* Hand Tool Removed, replaced by Spacebar behavior */}
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
                        ref={viewportRef}
                        onMouseDown={handleMouseDown}
                        onContextMenu={handleContextMenu}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        style={{ cursor: isPanning ? 'grabbing' : (isSpacePressed ? 'grab' : (selectedTool === 'select' ? 'default' : 'default')) }}
                    >
                        <Ruler orientation="horizontal" zoom={zoom} pan={pan} onDragStart={handleRulerDragStart} />
                        <Ruler orientation="vertical" zoom={zoom} pan={pan} onDragStart={handleRulerDragStart} />

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
                             {/* Marquee Box */}
                             {selectionBox && (
                                <div 
                                    className="absolute border border-[#E3E3FD] bg-[#E3E3FD]/10 z-[100] pointer-events-none"
                                    style={{
                                        left: selectionBox.x,
                                        top: selectionBox.y,
                                        width: selectionBox.w,
                                        height: selectionBox.h
                                    }}
                                />
                             )}

                             {/* Guides */}
                             {guides.map(g => (
                                <div 
                                    key={g.id}
                                    className={`absolute bg-[#E3E3FD] pointer-events-none z-[60] ${g.type === 'h' ? 'h-px w-full' : 'w-px h-full'}`}
                                    style={{
                                        [g.type === 'h' ? 'top' : 'left']: g.pos,
                                        opacity: 0.5,
                                        boxShadow: '0 0 2px rgba(0,0,0,0.5)'
                                    }}
                                />
                             ))}

                            <div 
                                ref={canvasContentRef}
                                style={{
                                    width: canvasConfig.width,
                                    height: canvasConfig.height,
                                    backgroundColor: canvasConfig.backgroundColor
                                }}
                                className={`relative shadow-2xl transition-shadow duration-300 ${isSelecting ? 'canvas-bg' : ''}`}
                            >
                                {layers.map(layer => (
                                    !layer.hidden && layer.visible !== false && (
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
                                                opacity: layer.opacity !== undefined ? layer.opacity : 1,
                                                transform: `rotate(${layer.rotation || 0}deg) scaleX(${layer.flipX ? -1 : 1}) scaleY(${layer.flipY ? -1 : 1})`, 
                                                filter: `brightness(${layer.brightness !== undefined ? layer.brightness : 100}%) contrast(${layer.contrast !== undefined ? layer.contrast : 100}%) blur(${layer.blur || 0}px)`,
                                                boxShadow: layer.shadow ? `${layer.shadowX || 0}px ${layer.shadowY || 4}px ${layer.shadowBlur || 10}px ${layer.shadowColor || '#000000'}` : 'none',
                                                whiteSpace: layer.type === 'TEXT' ? 'nowrap' : 'normal'
                                            }}
                                        >
                                            {/* Hover Outline */}
                                            {!selectedLayerIds.includes(layer.id) && mode === 'STUDIO' && (
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
                                                            fontWeight: layer.fontWeight || 'normal',
                                                            fontStyle: layer.fontStyle || 'normal',
                                                            textDecoration: layer.textDecoration || 'none',
                                                            textTransform: layer.textTransform || 'none',
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
                                                        fontWeight: layer.fontWeight || 'normal',
                                                        fontStyle: layer.fontStyle || 'normal',
                                                        textDecoration: layer.textDecoration || 'none',
                                                        textTransform: layer.textTransform || 'none',
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
                                            {selectedLayerIds.includes(layer.id) && mode === 'STUDIO' && (
                                                <>
                                                    <div className="absolute -inset-[1px] border border-[#E3E3FD] pointer-events-none z-50">
                                                        <div className="absolute -top-6 left-0 bg-[#E3E3FD] px-1.5 py-0.5 flex items-center gap-2 pointer-events-auto">
                                                            <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">{layer.id}</span>
                                                        </div>
                                                    </div>
                                                    {/* Resize Handles - Only show for primary selection */}
                                                    {selectedLayerIds.length === 1 && ['nw', 'ne', 'sw', 'se'].map(h => (
                                                        <div 
                                                            key={h}
                                                            onMouseDown={(e) => handleMouseDown(e, layer, h)}
                                                            className={`absolute bg-white border border-[#E3E3FD] z-50 cursor-${h}-resize`}
                                                            style={{
                                                                width: 8 / zoom, // Constant visual size
                                                                height: 8 / zoom,
                                                                top: h[0] === 'n' ? -4 / zoom : 'auto',
                                                                bottom: h[0] === 's' ? -4 / zoom : 'auto',
                                                                left: h[1] === 'w' ? -4 / zoom : 'auto',
                                                                right: h[1] === 'e' ? -4 / zoom : 'auto',
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
                        {contextMenu && selectedLayerIds.length > 0 && (
                            <div 
                                className="absolute bg-[#050505] border border-white/10 shadow-2xl z-50 w-48 flex flex-col p-1"
                                style={{ top: contextMenu.y, left: contextMenu.x }}
                            >
                                <button onClick={() => { duplicateSelectedLayers(); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>Duplicate</span> <span className="text-white/40 group-hover:text-black/40">Ctrl+D</span>
                                </button>
                                <button onClick={() => { toggleLock(selectedLayerIds); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>{primarySelectedLayer?.lockPosition ? 'Unlock' : 'Lock'}</span> <span className="text-white/40 group-hover:text-black/40">L</span>
                                </button>
                                
                                <div className="h-px bg-white/10 my-1"></div>
                                
                                <button onClick={() => { reorderSelectedLayers('up'); setContextMenu(null); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>Bring Forward</span> <span className="text-white/40 group-hover:text-black/40">]</span>
                                </button>
                                <button onClick={() => { reorderSelectedLayers('down'); setContextMenu(null); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>Send Backward</span> <span className="text-white/40 group-hover:text-black/40">[</span>
                                </button>
                                
                                <div className="h-px bg-white/10 my-1"></div>
                                
                                <button onClick={() => { zoomToSelection(); setContextMenu(null); }} className="text-left px-3 py-2 text-[10px] font-mono text-white hover:bg-[#E3E3FD] hover:text-black uppercase tracking-widest flex items-center justify-between group">
                                    <span>Zoom to Selection</span> <span className="text-white/40 group-hover:text-black/40">Shift+2</span>
                                </button>
                                <button onClick={() => deleteSelectedLayers()} className="text-left px-3 py-2 text-[10px] font-mono text-red-400 hover:bg-red-900/20 uppercase tracking-widest flex items-center justify-between">
                                    <span>Delete</span> <span>Del</span>
                                </button>
                            </div>
                        )}

                        {/* Zoom Controls Overlay */}
                        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest pointer-events-none">
                            VP: {canvasConfig.width}x{canvasConfig.height} // ZOOM: {Math.round(zoom * 100)}% // PAN: {Math.round(pan.x)},{Math.round(pan.y)} // SEL: {selectedLayerIds.length}
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
                        {/* Always show properties if at least one layer selected. 
                            If multiple, we pass primary but update function handles broadcasting to all. 
                        */}
                        {selectedLayerIds.length > 0 && primarySelectedLayer ? (
                            <LayerProperties 
                                layer={primarySelectedLayer} 
                                mode={mode} 
                                onUpdate={updateLayer} 
                                onDelete={deleteLayer}
                                onAlign={alignSelectedLayers}
                                onDistribute={distributeSelectedLayers} 
                            />
                        ) : (
                            <CanvasProperties 
                                config={canvasConfig}
                                onChange={setCanvasConfig}
                                snapToGrid={snapToGrid}
                                onToggleSnap={setSnapToGrid}
                                guides={guides}
                                onClearGuides={() => setGuides([])}
                            />
                        )}
                        
                        {/* Multi-selection info overlay if needed, but LayerProperties now handles the editing interface */}
                        {selectedLayerIds.length > 1 && (
                             <div className="mt-4 border-t border-white/10 pt-4">
                                 <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-2 block">{selectedLayerIds.length} Items Selected</span>
                                 <p className="font-mono text-[8px] text-white/40">Editing properties applies to all selected items.</p>
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
