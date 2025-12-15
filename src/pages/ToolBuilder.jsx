import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Share2 } from 'lucide-react';
import PreviewCanvas from '../components/v2/PreviewCanvas';
import Inspector from '../components/v2/Inspector';
import LayerStack from '../components/v2/LayerStack';
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
    const [layers, setLayers] = useState(DEFAULT_LAYERS);
    const [selectedLayerId, setSelectedLayerId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Load "saved" state if it exists
    useEffect(() => {
        const saved = localStorage.getItem(`bo_tool_${id}`);
        if (saved) {
            setLayers(JSON.parse(saved));
        }
    }, [id]);

    const handleAddLayer = (type) => {
        const newLayer = {
            id: `${type}-${Date.now()}`,
            type,
            name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            zIndex: layers.length * 10,
            properties: {
                x: 50, 
                y: 50, 
                ...(type === 'text' ? { text: 'New Text', fontSize: 24, color: '#FFFFFF' } : {}),
                ...(type === 'image' ? { src: '', width: 200, height: 200 } : {}),
                ...(type === 'rectangle' ? { width: 200, height: 200, color: '#333333' } : {})
            },
            locks: {} // Default locks
        };
        setLayers(prev => [...prev, newLayer]);
        setSelectedLayerId(newLayer.id);
    };

    const handleUpdateLayer = (layerId, updates) => {
        setLayers(prev => prev.map(l => 
            l.id === layerId ? { ...l, ...updates } : l
        ));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            localStorage.setItem(`bo_tool_${id}`, JSON.stringify(layers));
            setIsSaving(false);
        }, 800);
    };

    const selectedLayer = layers.find(l => l.id === selectedLayerId);

    return (
        <div className="h-screen bg-[#261E19] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-[#261E19] relative">
            <div className="fixed inset-0 bg-[#261E19] z-0"></div>
            <UnifiedNav />
            
            {/* Secondary Toolbar */}
            <div className="h-12 md:h-14 bg-[#1A1614] border-b border-white/10 flex items-center justify-between px-4 md:px-6 lg:px-12 mt-12 md:mt-14 shrink-0 relative z-10">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                        TOOL_ID: <span className="text-[#E3E3FD]">{id}</span>
                    </span>
                    <span className="font-mono text-[9px] text-white/20 hidden sm:inline">|</span>
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest hidden sm:inline">BUILDER_MODE</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <button 
                        onClick={handleSave}
                        className="bg-[#E3E3FD] text-[#261E19] px-4 md:px-5 py-2 md:py-2.5 font-mono font-semibold text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 rounded-lg"
                        disabled={isSaving}
                    >
                        <Save size={12} className="md:w-[14px] md:h-[14px]" />
                        {isSaving ? 'PUBLISHING...' : 'PUBLISH'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left: Layer Stack */}
                <aside className="w-full md:w-64 lg:w-72 bg-[#1A1614] border-r border-white/10 flex flex-col z-10 shrink-0">
                    <LayerStack 
                        layers={layers} 
                        selectedId={selectedLayerId} 
                        onSelect={setSelectedLayerId}
                        onAddLayer={handleAddLayer}
                    />
                </aside>

                {/* Center: Canvas Stage */}
                <main className="flex-1 bg-[#0A0A0A] relative flex items-center justify-center p-4 md:p-8 overflow-hidden min-h-[400px]">
                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ 
                        backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
                        backgroundSize: '30px 30px' 
                    }}></div>
                    
                    <div className="relative shadow-2xl transition-all duration-300" style={{ width: '400px', height: '500px', maxWidth: '100%' }}>
                        <div className="absolute -top-6 md:-top-8 left-0 font-mono text-[8px] md:text-[9px] text-white/20 uppercase tracking-widest">
                            CANVAS: 400x500
                        </div>
                        <PreviewCanvas layers={layers} />
                    </div>
                </main>

                {/* Right: Inspector */}
                <aside className="w-full md:w-80 lg:w-96 bg-[#1A1614] border-l border-white/10 flex flex-col z-10 shrink-0">
                    <div className="p-3 md:p-4 border-b border-white/10 bg-[#1A1614]">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                            <h2 className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest">PROPERTIES</h2>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 md:p-4">
                        <Inspector 
                            selectedLayer={selectedLayer} 
                            onUpdateLayer={handleUpdateLayer}
                        />
                    </div>
                    <div className="p-3 md:p-4 border-t border-white/10 bg-[#261E19]/50">
                        <div className="flex gap-2.5 items-start">
                            <div className="p-1.5 bg-[#E3E3FD]/10 border border-[#E3E3FD]/20 rounded-md shrink-0">
                                <Share2 size={11} className="text-[#E3E3FD]"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-[9px] text-white/60 uppercase tracking-widest mb-1.5">RUNNER_LINK</p>
                                <p className="font-mono text-[9px] text-[#E3E3FD] break-all select-all cursor-copy hover:text-white transition-colors">
                                    /tool/{id}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
