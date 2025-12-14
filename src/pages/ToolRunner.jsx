import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, CheckCircle, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import PreviewCanvas from '../components/v2/PreviewCanvas';
import RunnerForm from '../components/v2/RunnerForm';

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
    const previewRef = useRef(null);

    // Hydrate from "DB" (localStorage)
    useEffect(() => {
        const saved = localStorage.getItem(`bo_tool_${id}`);
        if (saved) {
            setLayers(JSON.parse(saved));
        }
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

    return (
        <div className="h-screen bg-[#261E19] text-white font-montreal flex flex-col md:flex-row overflow-hidden selection:bg-[#E3E3FD] selection:text-[#261E19]">
            
            {/* Left Panel: Inputs (Isolated Environment) */}
            <aside className="w-full md:w-[400px] bg-[#1A1614] border-r border-white/10 flex flex-col z-20 shadow-2xl relative">
                
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-[#1A1614]">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Tool Runner // {id}</span>
                    </div>
                </header>
                
                <div className="flex-1 overflow-y-auto p-6 bg-[#1A1614]">
                    <div className="mb-8">
                        <h1 className="font-medium text-2xl mb-2">Asset Configuration</h1>
                        <p className="text-white/40 text-sm">
                            Input authorized content below. <br/>
                            Layout and styling are governed by Studio rules.
                        </p>
                    </div>
                    <RunnerForm layers={layers} onUpdateLayer={handleUpdateLayer} />
                </div>

                <div className="p-6 border-t border-white/10 bg-[#1A1614] relative z-20">
                    <button 
                        onClick={handleExport}
                        disabled={isExporting}
                        className={`
                            w-full h-12 font-mono text-[11px] uppercase tracking-widest 
                            flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-300
                            ${status === 'error' ? 'bg-red-900 text-white' : 'bg-[#E3E3FD] text-[#261E19] hover:bg-white'}
                        `}
                    >
                        {status === 'exporting' && <span>Rendering High-Res...</span>}
                        {status === 'success' && <span className="flex items-center gap-2"><CheckCircle size={14}/> Download Complete</span>}
                        {status === 'error' && <span className="flex items-center gap-2"><AlertTriangle size={14}/> Export Failed</span>}
                        {status === 'idle' && (
                            <>
                                <Download size={16} />
                                Export Production PNG
                            </>
                        )}
                    </button>
                </div>
            </aside>

            {/* Right Panel: Live Monitor (Read Only) */}
            <main className="flex-1 bg-[#050505] relative flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                    <div className="px-2 py-1 bg-white/5 border border-white/10 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>
                        <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Live Monitor</span>
                    </div>
                </div>

                {/* The "Stage" - Cannot be touched */}
                <div className="relative shadow-2xl pointer-events-none select-none" style={{ width: '400px', height: '500px' }}>
                    <div ref={previewRef}>
                        <PreviewCanvas layers={layers} />
                    </div>
                </div>
            </main>
        </div>
    );
}
