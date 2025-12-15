import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, CheckCircle, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import PreviewCanvas from '../components/v2/PreviewCanvas';
import RunnerForm from '../components/v2/RunnerForm';
import { getPublishedTool, trackAssetGeneration } from '../services/tools';

// Default Template Layers (Fallback)
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
    }
];

export default function ToolRunner() {
    const { id } = useParams();
    const [layers, setLayers] = useState(DEFAULT_LAYERS);
    const [isExporting, setIsExporting] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | exporting | success | error
    const [isLoading, setIsLoading] = useState(true);
    const previewRef = useRef(null);

    // Load published tool from database
    useEffect(() => {
        const loadTool = async () => {
            setIsLoading(true);
            try {
                const tool = await getPublishedTool(id);
                if (tool && tool.layers) {
                    setLayers(tool.layers);
                } else {
                    // Fallback to default if tool not found
                    setLayers(DEFAULT_LAYERS);
                }
            } catch (error) {
                console.error('Error loading tool:', error);
                setLayers(DEFAULT_LAYERS);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadTool();
    }, [id]);

    const handleUpdateLayer = (layerId, propKey, newValue) => {
        // Enforce basic validation
        // Text Length Limit (Hardcoded safety)
        if (typeof newValue === 'string' && newValue.length > 200) {
            return; // Reject input
        }

        setLayers(prev => prev.map(l => {
            if (l.id === layerId) {
                return {
                    ...l,
                    properties: { ...l.properties, [propKey]: newValue }
                };
            }
            return l;
        }));
    };

    const handleExport = async () => {
        if (previewRef.current && !isExporting) {
            setIsExporting(true);
            setStatus('exporting');
            
            try {
                // Wait for any renders/images to load
                await new Promise(r => setTimeout(r, 200));
                
                // Strict Capture Config
                const canvas = await html2canvas(previewRef.current, { 
                    scale: 3, // High Res
                    backgroundColor: null, // Transparent support
                    logging: false,
                    useCORS: true // Essential for images
                });
                
                const link = document.createElement('a');
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                link.download = `bo_${id}_${timestamp}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                // Track asset generation
                const clientInputs = {};
                layers.forEach(layer => {
                    Object.keys(layer.locks || {}).forEach(propKey => {
                        if (layer.locks[propKey] === 'CLIENT_INPUT') {
                            clientInputs[`${layer.id}.${propKey}`] = layer.properties[propKey];
                        }
                    });
                });
                await trackAssetGeneration(id, clientInputs, 'png');
                
                setStatus('success');
                setTimeout(() => setStatus('idle'), 2000);
            } catch (err) {
                console.error("Export failed", err);
                setStatus('error');
            } finally {
                setIsExporting(false);
            }
        }
    };

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
        <div className="h-screen bg-[#261E19] text-white font-montreal flex flex-col md:flex-row overflow-hidden selection:bg-[#E3E3FD] selection:text-[#261E19] relative">
            <div className="fixed inset-0 bg-[#261E19] z-0"></div>
            
            {/* Left Panel: Inputs (Isolated Environment) */}
            <aside className="w-full md:w-[400px] lg:w-[420px] bg-[#1A1614] border-r border-white/10 flex flex-col z-20 shadow-2xl relative">
                
                {/* Header */}
                <header className="h-12 md:h-14 border-b border-white/10 flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#1A1614]">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                        <span className="font-mono text-[9px] md:text-[10px] text-[#E3E3FD] uppercase tracking-widest">TOOL_RUNNER</span>
                        <span className="font-mono text-[9px] text-white/20 hidden sm:inline">|</span>
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest hidden sm:inline">ID: {id}</span>
                    </div>
                </header>
                
                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#1A1614]">
                    <div className="mb-6 md:mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                            <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">CLIENT_INPUT_MODE</span>
                        </div>
                        <h1 className="font-montreal font-medium text-xl md:text-2xl mb-2 text-white">Asset Configuration</h1>
                        <p className="font-montreal text-white/40 text-sm leading-relaxed">
                            Input authorized content below. <br className="hidden sm:inline"/>
                            Layout and styling are governed by Studio rules.
                        </p>
                    </div>
                    <RunnerForm layers={layers} onUpdateLayer={handleUpdateLayer} />
                </div>

                {/* Export Button */}
                <div className="p-4 md:p-6 border-t border-white/10 bg-[#1A1614] relative z-20 shrink-0">
                    <button 
                        onClick={handleExport}
                        disabled={isExporting || status === 'success'}
                        className={`
                            w-full h-12 md:h-14 font-mono text-[10px] md:text-[11px] uppercase tracking-widest 
                            flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg
                            ${status === 'error' 
                                ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30' 
                                : status === 'success'
                                ? 'bg-[#E3E3FD]/20 border border-[#E3E3FD]/30 text-[#E3E3FD]'
                                : 'bg-[#E3E3FD] text-[#261E19] hover:bg-white border border-transparent'
                            }
                        `}
                    >
                        {status === 'exporting' && (
                            <>
                                <div className="w-3 h-3 border-2 border-[#261E19]/20 border-t-[#261E19] rounded-full animate-spin"></div>
                                <span>RENDERING_HIGH_RES...</span>
                            </>
                        )}
                        {status === 'success' && (
                            <>
                                <CheckCircle size={14} className="md:w-[16px] md:h-[16px]" />
                                <span>DOWNLOAD_COMPLETE</span>
                            </>
                        )}
                        {status === 'error' && (
                            <>
                                <AlertTriangle size={14} className="md:w-[16px] md:h-[16px]" />
                                <span>EXPORT_FAILED</span>
                            </>
                        )}
                        {status === 'idle' && (
                            <>
                                <Download size={14} className="md:w-[16px] md:h-[16px]" />
                                <span>EXPORT_PRODUCTION_PNG</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>

            {/* Right Panel: Live Preview (Read Only) */}
            <main className="flex-1 bg-[#0A0A0A] relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ 
                    backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
                    backgroundSize: '30px 30px' 
                }}></div>
                
                {/* System Status Indicator */}
                <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2 z-10">
                    <div className="px-2 md:px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-lg flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                        <span className="font-mono text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">LIVE_PREVIEW</span>
                    </div>
                </div>

                {/* Canvas Label */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6 font-mono text-[8px] md:text-[9px] text-white/20 uppercase tracking-widest z-10">
                    CANVAS: 400x500
                </div>

                {/* The "Stage" - Cannot be touched */}
                <div className="relative shadow-2xl pointer-events-none select-none z-10" style={{ width: '400px', height: '500px', maxWidth: '100%' }}>
                    <div ref={previewRef}>
                        <PreviewCanvas layers={layers} />
                    </div>
                </div>
            </main>
        </div>
    );
}
