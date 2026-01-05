import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Share2, Eye, Code, Undo2, Redo2, ChevronUp, ChevronDown } from 'lucide-react';
import PreviewCanvas from '../components/v2/PreviewCanvas';
import FigmaProperties from '../components/v2/FigmaProperties';
import RunnerForm from '../components/v2/RunnerForm';
import { getTool, updateTool, publishTool, createTool } from '../services/tools';
import UnifiedNav from '../components/UnifiedNav';

// Default Template Layers
const DEFAULT_LAYERS = [
    {
        id: 'bg-1',
        type: 'rectangle',
        name: 'Background',
        zIndex: 0,
        properties: { x: 50, y: 50, width: 400, height: 500, color: '#1A1614' },
        locks: { x: 'LOCKED', y: 'LOCKED', width: 'LOCKED', height: 'LOCKED', color: 'LOCKED' }
    },
    {
        id: 'text-1',
        type: 'text',
        name: 'Main Headline',
        zIndex: 10,
        properties: { x: 50, y: 40, text: 'SYSTEM_OS v2.4', fontSize: 42, color: '#FFFFFF', textAlign: 'center' },
        locks: { x: 'LOCKED', y: 'LOCKED', text: 'CLIENT_INPUT', fontSize: 'LOCKED', color: 'LOCKED' }
    },
    {
        id: 'text-2',
        type: 'text',
        name: 'Subhead',
        zIndex: 10,
        properties: { x: 50, y: 55, text: 'Automated Governance', fontSize: 12, color: '#E3E3FD', textAlign: 'center' },
        locks: { x: 'LOCKED', y: 'LOCKED', text: 'LOCKED', fontSize: 'LOCKED', color: 'LOCKED' }
    }
];

export default function ToolBuilder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [layers, setLayers] = useState(DEFAULT_LAYERS);
    const [selectedLayerId, setSelectedLayerId] = useState(null);
    const [selectedLayerIds, setSelectedLayerIds] = useState(new Set()); // Multi-select
    const [isSaving, setIsSaving] = useState(false);
    const [toolName, setToolName] = useState('New Tool');
    const [toolStatus, setToolStatus] = useState('draft');
    const [isLoading, setIsLoading] = useState(true);
    const [layersPanelOpen, setLayersPanelOpen] = useState(true);
    const [previewMode, setPreviewMode] = useState('studio'); // 'studio' | 'client'
    
    // Undo/Redo system
    const [history, setHistory] = useState([DEFAULT_LAYERS]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [clientUI, setClientUI] = useState({
        logo: null,
        topNavBg: '#1A1614',
        topNavText: '#FFFFFF',
        accentColor: '#E3E3FD'
    });

    // Load tool from database
    useEffect(() => {
        // Defer loading to prevent blocking initial render
        const timer = setTimeout(() => {
            const loadTool = async () => {
                setIsLoading(true);
                try {
                    if (id === 'new') {
                    // Create new tool
                    const newTool = await createTool('New Tool');
                    navigate(`/studio/builder/${newTool.id}`, { replace: true });
                    const newLayers = newTool.layers || DEFAULT_LAYERS;
                    setLayers(newLayers);
                    setHistory([newLayers]);
                    setHistoryIndex(0);
                    setToolName(newTool.name);
                    setToolStatus(newTool.status);
                } else {
                    // Load existing tool
                    const tool = await getTool(id);
                    if (tool) {
                        setLayers(tool.layers || DEFAULT_LAYERS);
                        setToolName(tool.name);
                        setToolStatus(tool.status);
                        setClientUI(tool.clientUI || {
                            logo: null,
                            topNavBg: '#1A1614',
                            topNavText: '#FFFFFF',
                            accentColor: '#E3E3FD'
                        });
                    } else {
                        // Tool not found, create new
                        const newTool = await createTool('New Tool');
                        navigate(`/studio/builder/${newTool.id}`, { replace: true });
                        const fallbackLayers = newTool.layers || DEFAULT_LAYERS;
                        setLayers(fallbackLayers);
                        setHistory([fallbackLayers]);
                        setHistoryIndex(0);
                        setToolName(newTool.name);
                        setToolStatus(newTool.status);
                    }
                }
            } catch (error) {
                console.error('Error loading tool:', error);
                // Fallback to default layers
                setLayers(DEFAULT_LAYERS);
                setHistory([DEFAULT_LAYERS]);
                setHistoryIndex(0);
            } finally {
                setIsLoading(false);
            }
        };
        loadTool();
        }, 50);
        return () => clearTimeout(timer);
    }, [id, navigate]);

    const handleAddLayer = (type) => {
        // Default locks based on type
        const defaultLocks = type === 'text' 
            ? { x: 'LOCKED', y: 'LOCKED', fontSize: 'LOCKED', color: 'LOCKED', text: 'CLIENT_INPUT' }
            : type === 'image'
            ? { x: 'LOCKED', y: 'LOCKED', width: 'LOCKED', height: 'LOCKED', src: 'CLIENT_INPUT' }
            : { x: 'LOCKED', y: 'LOCKED', width: 'LOCKED', height: 'LOCKED', color: 'LOCKED' };
        
        const newLayer = {
            id: `${type}-${Date.now()}`,
            type,
            name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            zIndex: layers.length * 10,
            properties: {
                x: 50, 
                y: 50, 
                ...(type === 'text' ? { text: 'New Text', fontSize: 24, color: '#FFFFFF', textAlign: 'center' } : {}),
                ...(type === 'image' ? { src: '', width: 200, height: 200 } : {}),
                ...(type === 'rectangle' ? { width: 200, height: 200, color: '#333333' } : {})
            },
            locks: defaultLocks
        };
        setLayers(prev => {
            const newLayers = [...prev, newLayer];
            setTimeout(() => addToHistory(newLayers), 0);
            return newLayers;
        });
        setSelectedLayerId(newLayer.id);
        setSelectedLayerIds(new Set([newLayer.id]));
    };

    const handleDuplicateLayer = (layerId) => {
        const layer = layers.find(l => l.id === layerId);
        if (!layer) return;
        
        const duplicated = {
            ...layer,
            id: `${layer.type}-${Date.now()}`,
            name: `${layer.name} Copy`,
            properties: {
                ...layer.properties,
                x: layer.properties.x + 5, // Offset slightly
                y: layer.properties.y + 5
            }
        };
        setLayers(prev => {
            const newLayers = [...prev, duplicated];
            setTimeout(() => addToHistory(newLayers), 0);
            return newLayers;
        });
        setSelectedLayerId(duplicated.id);
        setSelectedLayerIds(new Set([duplicated.id]));
    };

    const handleCopyLayer = (layerId) => {
        const layer = layers.find(l => l.id === layerId);
        if (layer) {
            navigator.clipboard.writeText(JSON.stringify(layer));
        }
    };

    const handlePasteLayer = async () => {
        try {
            const text = await navigator.clipboard.readText();
            
            // Try to parse as JSON (internal paste)
            try {
                const pasted = JSON.parse(text);
                if (pasted.type && pasted.properties) {
                    const newLayer = {
                        ...pasted,
                        id: `${pasted.type}-${Date.now()}`,
                        name: `${pasted.name || 'Pasted'} Copy`,
                        properties: {
                            ...pasted.properties,
                            x: (pasted.properties.x || 50) + 5,
                            y: (pasted.properties.y || 50) + 5
                        }
                    };
                    setLayers(prev => [...prev, newLayer]);
                    setSelectedLayerId(newLayer.id);
                    setSelectedLayerIds(new Set([newLayer.id]));
                    return;
                }
            } catch (e) {
                // Not JSON, continue
            }
            
            // Try to parse as SVG
            if (text.trim().startsWith('<svg') || text.trim().startsWith('<?xml')) {
                const svgBlob = new Blob([text], { type: 'image/svg+xml' });
                const svgUrl = URL.createObjectURL(svgBlob);
                
                const newLayer = {
                    id: `image-${Date.now()}`,
                    type: 'image',
                    name: 'Pasted SVG',
                    zIndex: layers.length * 10,
                    properties: {
                        x: 50,
                        y: 50,
                        src: svgUrl,
                        width: 200,
                        height: 200
                    },
                    locks: {}
                };
                setLayers(prev => [...prev, newLayer]);
                setSelectedLayerId(newLayer.id);
                setSelectedLayerIds(new Set([newLayer.id]));
                return;
            }
            
            // Fallback: create text layer
            const newLayer = {
                id: `text-${Date.now()}`,
                type: 'text',
                name: 'Pasted Content',
                zIndex: layers.length * 10,
                properties: {
                    x: 50,
                    y: 50,
                    text: text.substring(0, 100),
                    fontSize: 24,
                    color: '#FFFFFF'
                },
                locks: {}
            };
            setLayers(prev => [...prev, newLayer]);
            setSelectedLayerId(newLayer.id);
            setSelectedLayerIds(new Set([newLayer.id]));
        } catch (error) {
            console.error('Failed to paste:', error);
        }
    };

    // Add to history for undo/redo
    const addToHistory = (newLayers) => {
        setHistory(prev => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(JSON.parse(JSON.stringify(newLayers))); // Deep clone
            if (newHistory.length > 50) newHistory.shift(); // Limit history size
            setHistoryIndex(newHistory.length - 1);
            return newHistory;
        });
    };

    const handleUpdateLayer = (layerId, updates) => {
        setLayers(prev => {
            const newLayers = prev.map(l => 
                l.id === layerId ? { ...l, ...updates } : l
            );
            setTimeout(() => addToHistory(newLayers), 0); // Add to history after state update
            return newLayers;
        });
    };
    
    const handleUndo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setLayers(JSON.parse(JSON.stringify(history[newIndex])));
        }
    };
    
    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setLayers(JSON.parse(JSON.stringify(history[newIndex])));
        }
    };

    // Handler for client preview mode - enforces locks like ToolRunner
    const handleClientUpdateLayer = (layerId, propKey, newValue) => {
        const layer = layers.find(l => l.id === layerId);
        if (!layer) return;
        
        const lockState = layer.locks?.[propKey];
        if (lockState !== 'CLIENT_INPUT') {
            return; // Reject - property is locked
        }

        // Enforce validation
        if (typeof newValue === 'string' && newValue.length > 200) {
            return;
        }

        setLayers(prev => prev.map(l => {
            if (l.id === layerId && l.locks?.[propKey] === 'CLIENT_INPUT') {
                return {
                    ...l,
                    properties: { ...l.properties, [propKey]: newValue }
                };
            }
            return l;
        }));
    };

    const handleDeleteLayer = (layerId) => {
        setLayers(prev => {
            const newLayers = prev.filter(l => l.id !== layerId);
            setTimeout(() => addToHistory(newLayers), 0);
            return newLayers;
        });
        if (selectedLayerId === layerId) {
            setSelectedLayerId(null);
        }
    };
    
    const handleReorderLayer = (fromIndex, toIndex) => {
        setLayers(prev => {
            const newLayers = [...prev];
            const [moved] = newLayers.splice(fromIndex, 1);
            newLayers.splice(toIndex, 0, moved);
            // Update zIndex based on new order
            const updatedLayers = newLayers.map((layer, idx) => ({
                ...layer,
                zIndex: idx * 10
            }));
            setTimeout(() => addToHistory(updatedLayers), 0);
            return updatedLayers;
        });
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't handle shortcuts if typing in input/textarea
            if (e.target.matches('input, textarea')) return;
            
            const selectedLayer = layers.find(l => l.id === selectedLayerId);
            if (!selectedLayer) {
                // Global shortcuts (no selection needed)
                if (e.key === 'Escape') {
                    setSelectedLayerId(null);
                }
                return;
            }
            
            // Delete key - delete selected layer
            if (e.key === 'Delete' || e.key === 'Backspace') {
                e.preventDefault();
                handleDeleteLayer(selectedLayerId);
            }
            // Escape - deselect
            else if (e.key === 'Escape') {
                setSelectedLayerId(null);
            }
            // Arrow keys - nudge layer (1px, Shift = 10px)
            else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                const nudgeAmount = e.shiftKey ? 10 : 1;
                const isXLocked = selectedLayer.locks?.x === 'LOCKED';
                const isYLocked = selectedLayer.locks?.y === 'LOCKED';
                
                let deltaX = 0;
                let deltaY = 0;
                
                if (e.key === 'ArrowLeft' && !isXLocked) deltaX = -nudgeAmount;
                else if (e.key === 'ArrowRight' && !isXLocked) deltaX = nudgeAmount;
                else if (e.key === 'ArrowUp' && !isYLocked) deltaY = -nudgeAmount;
                else if (e.key === 'ArrowDown' && !isYLocked) deltaY = nudgeAmount;
                
                if (deltaX !== 0 || deltaY !== 0) {
                    // Convert pixel nudge to percentage (canvas is 400x500)
                    const canvasWidth = 400;
                    const canvasHeight = 500;
                    const percentDeltaX = (deltaX / canvasWidth) * 100;
                    const percentDeltaY = (deltaY / canvasHeight) * 100;
                    
                    const newX = Math.max(0, Math.min(100, selectedLayer.properties.x + percentDeltaX));
                    const newY = Math.max(0, Math.min(100, selectedLayer.properties.y + percentDeltaY));
                    
                    handleUpdateLayer(selectedLayerId, {
                        properties: {
                            ...selectedLayer.properties,
                            x: newX,
                            y: newY
                        }
                    });
                }
            }
            // Cmd+D / Ctrl+D - Duplicate
            else if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
                e.preventDefault();
                handleDuplicateLayer(selectedLayerId);
            }
            // Cmd+C / Ctrl+C - Copy
            else if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
                e.preventDefault();
                handleCopyLayer(selectedLayerId);
            }
            // Cmd+V / Ctrl+V - Paste
            else if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
                e.preventDefault();
                handlePasteLayer();
            }
            // Cmd+Z / Ctrl+Z - Undo
            else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                handleUndo();
            }
            // Cmd+Shift+Z / Ctrl+Shift+Z - Redo
            else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
                e.preventDefault();
                handleRedo();
            }
            // Cmd+A / Ctrl+A - Select all
            else if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                e.preventDefault();
                setSelectedLayerIds(new Set(layers.map(l => l.id)));
                if (layers.length > 0) {
                    setSelectedLayerId(layers[layers.length - 1].id); // Select last layer as primary
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedLayerId, layers]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSave = async () => {
        if (id === 'new') return;
        
        setIsSaving(true);
        try {
            await updateTool(id, {
                layers,
                name: toolName
            });
            // Small delay for UX
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Error saving tool:', error);
            alert('Failed to save tool. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async () => {
        if (id === 'new') return;
        
        setIsSaving(true);
        try {
            // First save the layers
            await updateTool(id, { layers, name: toolName });
            // Then publish
            const published = await publishTool(id);
            setToolStatus(published.status);
        } catch (error) {
            console.error('Error publishing tool:', error);
            alert('Failed to publish tool. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const selectedLayer = layers.find(l => l.id === selectedLayerId);

    // Auto-save on layer changes (debounced)
    useEffect(() => {
        if (id === 'new' || isLoading) return;
        
        const timeoutId = setTimeout(() => {
            updateTool(id, { layers }).catch(err => console.error('Auto-save failed:', err));
        }, 2000); // Debounce 2 seconds
        
        return () => clearTimeout(timeoutId);
    }, [layers, id, isLoading]);

    if (isLoading) {
        return (
            <div className="h-screen bg-[#261E19] text-white font-montreal flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#E3E3FD]/20 border-t-[#E3E3FD] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">LOADING_TOOL...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#261E19] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-[#261E19] relative">
            <div className="fixed inset-0 bg-[#261E19] z-0"></div>
            <UnifiedNav />
            
            {/* Secondary Toolbar */}
            <div className="h-12 md:h-14 bg-[#1A1614] border-b border-white/10 flex items-center justify-between px-4 md:px-6 lg:px-12 mt-12 md:mt-14 shrink-0 relative z-10">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <input
                            type="text"
                            value={toolName}
                            onChange={(e) => {
                                setToolName(e.target.value);
                                // Auto-save name (debounced)
                                if (id !== 'new') {
                                    clearTimeout(window.toolNameSaveTimeout);
                                    window.toolNameSaveTimeout = setTimeout(() => {
                                        updateTool(id, { name: e.target.value }).catch(err => console.error('Auto-save name failed:', err));
                                    }, 1000);
                                }
                            }}
                            className="bg-transparent border-none font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest focus:outline-none focus:bg-white/5 px-3 py-2 rounded-lg max-w-[200px] min-w-0 flex-1 transition-colors"
                            placeholder="TOOL_NAME"
                        />
                        <span className="font-mono text-[9px] text-white/20 hidden sm:inline">|</span>
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                            TOOL_ID: <span className="text-[#E3E3FD]">{id}</span>
                        </span>
                        <span className="font-mono text-[9px] text-white/20 hidden sm:inline">|</span>
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest hidden sm:inline">
                            {toolStatus === 'published' ? 'PUBLISHED' : 'DRAFT'} // BUILDER_MODE
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Undo/Redo Buttons */}
                    <div className="flex items-center gap-1 border-r border-white/10 pr-3">
                        <button
                            onClick={handleUndo}
                            disabled={historyIndex <= 0}
                            className="p-2 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-white/5"
                            title="Undo (Ctrl+Z)"
                        >
                            <Undo2 size={14} />
                        </button>
                        <button
                            onClick={handleRedo}
                            disabled={historyIndex >= history.length - 1}
                            className="p-2 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-white/5"
                            title="Redo (Ctrl+Shift+Z)"
                        >
                            <Redo2 size={14} />
                        </button>
                    </div>
                    {/* Preview Mode Toggle */}
                    <div className="bg-[#1A1614] p-1 rounded-lg border border-white/10 flex gap-1">
                        <button
                            onClick={() => setPreviewMode('studio')}
                            className={`px-3 py-1.5 rounded font-mono text-[9px] uppercase tracking-widest transition-colors flex items-center gap-1.5 ${
                                previewMode === 'studio'
                                    ? 'bg-[#E3E3FD] text-[#261E19]'
                                    : 'text-white/40 hover:text-white'
                            }`}
                        >
                            <Code size={11} />
                            STUDIO
                        </button>
                        <button
                            onClick={() => setPreviewMode('client')}
                            className={`px-3 py-1.5 rounded font-mono text-[9px] uppercase tracking-widest transition-colors flex items-center gap-1.5 ${
                                previewMode === 'client'
                                    ? 'bg-[#E3E3FD] text-[#261E19]'
                                    : 'text-white/40 hover:text-white'
                            }`}
                        >
                            <Eye size={11} />
                            CLIENT
                        </button>
                    </div>
                    <button 
                        onClick={handlePublish}
                        className="bg-[#E3E3FD] text-[#261E19] px-4 md:px-5 py-2 md:py-2.5 font-mono font-semibold text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 rounded-lg"
                        disabled={isSaving || id === 'new'}
                    >
                        <Save size={12} className="md:w-[14px] md:h-[14px]" />
                        {isSaving ? 'PUBLISHING...' : toolStatus === 'published' ? 'REPUBLISH' : 'PUBLISH'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden relative">
                {previewMode === 'studio' ? (
                    <>
                        {/* Left: Layers (Collapsible) */}
                        {layersPanelOpen && (
                            <aside className="w-64 bg-[#1A1614] border-r border-white/10 flex flex-col shrink-0 relative z-10">
                                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                                    <span className="text-xs text-white/60 font-mono uppercase tracking-widest">Layers</span>
                                    <button
                                        onClick={() => setLayersPanelOpen(false)}
                                        className="text-white/40 hover:text-white transition-colors text-xs"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                                    {[...layers].reverse().map((layer, reverseIdx) => {
                                        const actualIdx = layers.length - 1 - reverseIdx;
                                        return (
                                            <div
                                                key={layer.id}
                                                className={`p-3 rounded-lg cursor-pointer text-xs transition-colors border flex items-center justify-between gap-2 group ${
                                                    selectedLayerId === layer.id 
                                                        ? 'bg-[#E3E3FD]/10 text-white border-[#E3E3FD]/30' 
                                                        : 'text-white/60 hover:bg-white/5 hover:text-white border-white/5'
                                                }`}
                                            >
                                                <div
                                                    onClick={() => {
                                                        setSelectedLayerId(layer.id);
                                                        setSelectedLayerIds(new Set([layer.id]));
                                                    }}
                                                    className="flex-1 truncate"
                                                >
                                                    {layer.name || layer.type}
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={(e) => {
                                                            if (e && typeof e.stopPropagation === 'function') {
                                                                e.stopPropagation();
                                                            }
                                                            if (actualIdx > 0) {
                                                                handleReorderLayer(actualIdx, actualIdx - 1);
                                                            }
                                                        }}
                                                        disabled={actualIdx === 0}
                                                        className="p-1 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                                        title="Move up"
                                                    >
                                                        <ChevronUp size={12} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            if (e && typeof e.stopPropagation === 'function') {
                                                                e.stopPropagation();
                                                            }
                                                            if (actualIdx < layers.length - 1) {
                                                                handleReorderLayer(actualIdx, actualIdx + 1);
                                                            }
                                                        }}
                                                        disabled={actualIdx === layers.length - 1}
                                                        className="p-1 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                                        title="Move down"
                                                    >
                                                        <ChevronDown size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pt-2 border-t border-white/10 space-y-1">
                                        <button
                                            onClick={() => handleAddLayer('text')}
                                            className="w-full p-2 text-left text-xs text-white/40 hover:bg-white/5 hover:text-white rounded transition-colors"
                                        >
                                            + Text
                                        </button>
                                        <button
                                            onClick={() => handleAddLayer('image')}
                                            className="w-full p-2 text-left text-xs text-white/40 hover:bg-white/5 hover:text-white rounded transition-colors"
                                        >
                                            + Image
                                        </button>
                                        <button
                                            onClick={() => handleAddLayer('rectangle')}
                                            className="w-full p-2 text-left text-xs text-white/40 hover:bg-white/5 hover:text-white rounded transition-colors"
                                        >
                                            + Rectangle
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        )}

                        {/* Center: Canvas */}
                        <main className="flex-1 bg-[#0A0A0A] relative flex items-center justify-center overflow-hidden min-w-0">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
                                backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
                                backgroundSize: '30px 30px' 
                            }}></div>
                            
                            {!layersPanelOpen && (
                                <button
                                    onClick={() => setLayersPanelOpen(true)}
                                    className="absolute top-4 left-4 z-20 bg-[#1A1614] border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white hover:border-[#E3E3FD]/30 rounded-lg transition-colors"
                                >
                                    Layers
                                </button>
                            )}
                            
                            <div className="relative z-10" style={{ width: '400px', height: '500px', maxWidth: '100%' }}>
                                <PreviewCanvas 
                                    layers={layers} 
                                    selectedLayerId={selectedLayerId}
                                    selectedLayerIds={selectedLayerIds}
                                    onSelectLayer={(id) => {
                                        setSelectedLayerId(id);
                                        setSelectedLayerIds(id ? new Set([id]) : new Set());
                                    }}
                                    onSelectLayers={(ids) => {
                                        const idsSet = new Set(ids);
                                        setSelectedLayerIds(idsSet);
                                        setSelectedLayerId(ids.length > 0 ? ids[ids.length - 1] : null);
                                    }}
                                    onUpdateLayer={handleUpdateLayer}
                                    isStudio={true}
                                />
                            </div>
                        </main>

                        {/* Right: Properties */}
                        <aside className="w-80 bg-[#1A1614] border-l border-white/10 flex flex-col shrink-0 relative z-10">
                            <div className="p-3 border-b border-white/10">
                                <span className="text-xs text-white/60 font-mono uppercase tracking-widest">Properties</span>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <FigmaProperties 
                                    selectedLayer={selectedLayer} 
                                    onUpdateLayer={handleUpdateLayer}
                                    clientUI={clientUI}
                                    onUpdateClientUI={(newClientUI) => {
                                        setClientUI(newClientUI);
                                        if (id !== 'new') {
                                            updateTool(id, { client_ui: newClientUI }).catch(err => console.error('Failed to save client UI:', err));
                                        }
                                    }}
                                />
                            </div>
                            <div className="p-3 border-t border-white/10">
                                <div className="text-[10px] text-white/40 mb-1">Share</div>
                                <div className="text-xs text-[#E3E3FD] font-mono break-all">/tool/{id}</div>
                            </div>
                        </aside>
                    </>
                ) : (
                    <>
                        {/* Client Preview Mode: Left Panel with Form */}
                        <aside className="w-[400px] lg:w-[420px] bg-[#1A1614] border-r border-white/10 flex flex-col shrink-0 relative z-10">
                            <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-[#1A1614]">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                                    <span className="font-mono text-[9px] md:text-[10px] text-[#E3E3FD] uppercase tracking-widest">CLIENT_PREVIEW</span>
                                    <span className="font-mono text-[9px] text-white/20 hidden sm:inline">|</span>
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest hidden sm:inline">READ_ONLY</span>
                                </div>
                            </header>
                            <div className="flex-1 overflow-y-auto p-6 bg-[#1A1614]">
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">CLIENT_INPUT_MODE</span>
                                    </div>
                                    <h1 className="font-montreal font-medium text-2xl mb-2 text-white">ASSET_CONFIGURATION</h1>
                                    <p className="font-montreal text-white/40 text-sm leading-relaxed">
                                        PREVIEW_OF_CLIENT_EXPERIENCE. <br className="hidden sm:inline"/>
                                        LAYOUT_&_STYLING_GOVERNED_BY_STUDIO_RULES.
                                    </p>
                                </div>
                                <RunnerForm layers={layers} onUpdateLayer={handleClientUpdateLayer} />
                            </div>
                        </aside>

                        {/* Client Preview Mode: Right Panel with Canvas */}
                        <main className="flex-1 bg-[#0A0A0A] relative flex items-center justify-center p-8 overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
                                backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
                                backgroundSize: '30px 30px' 
                            }}></div>
                            
                            {/* System Status Indicator */}
                            <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                                <div className="px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-lg flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">LIVE_PREVIEW</span>
                                </div>
                            </div>

                            {/* Canvas Label */}
                            <div className="absolute top-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest z-10">
                                CANVAS: 400x500
                            </div>

                            {/* The "Stage" - Read-only preview */}
                            <div className="relative shadow-2xl pointer-events-none select-none z-10" style={{ width: '400px', height: '500px', maxWidth: '100%' }}>
                                <PreviewCanvas layers={layers} isStudio={false} />
                            </div>
                        </main>
                    </>
                )}
            </div>
        </div>
    );
}
