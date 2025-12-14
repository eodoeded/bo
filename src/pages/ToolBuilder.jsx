import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Share2 } from 'lucide-react';
import PreviewCanvas from '../components/v2/PreviewCanvas';
import Inspector from '../components/v2/Inspector';
import LayerStack from '../components/v2/LayerStack';

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
        <div className="h-screen bg-[#261E19] text-white font-montreal flex flex-col overflow-hidden selection:bg-[#E3E3FD] selection:text-[#261E19]">
            {/* Toolbar */}
            <header className="h-14 bg-[#1A1614] border-b border-white/10 flex items-center justify-between px-4 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/studio" className="p-2 text-white/40 hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">
                        Builder <span className="text-white/20">//</span> {id}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleSave}
                        className="bg-[#E3E3FD] text-[#261E19] px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                    >
                        <Save size={12} />
                        {isSaving ? 'Saving...' : 'Publish'}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Left: Layer Stack */}
                <aside className="w-64 bg-[#1A1614] border-r border-white/10 flex flex-col z-10">
                    <LayerStack 
                        layers={layers} 
                        selectedId={selectedLayerId} 
                        onSelect={setSelectedLayerId}
                        onAddLayer={handleAddLayer}
                    />
                </aside>

                {/* Center: Canvas Stage */}
                <main className="flex-1 bg-[#0A0A0A] relative flex items-center justify-center p-8 overflow-hidden">
                     <div className="absolute inset-0 opacity-[0.05]" style={{ 
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }}></div>
                    
                    <div className="relative shadow-2xl transition-all duration-300" style={{ width: '400px', height: '500px' }}>
                        <div className="absolute -top-8 left-0 font-mono text-[9px] text-white/20 uppercase tracking-widest">Canvas: 400x500 (Scale)</div>
                        <PreviewCanvas layers={layers} />
                    </div>
                </main>

                {/* Right: Inspector */}
                <aside className="w-80 bg-[#1A1614] border-l border-white/10 flex flex-col z-10">
                    <div className="p-4 border-b border-white/10">
                        <h2 className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Properties</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <Inspector 
                            selectedLayer={selectedLayer} 
                            onUpdateLayer={handleUpdateLayer}
                        />
                    </div>
                    <div className="p-4 border-t border-white/10 bg-[#261E19]/50">
                        <div className="flex gap-2 items-start">
                            <Share2 size={12} className="text-[#E3E3FD] mt-0.5 shrink-0"/>
                            <div>
                                <p className="font-mono text-[9px] text-white/60 uppercase tracking-widest mb-1">Runner Link</p>
                                <p className="font-mono text-[9px] text-[#E3E3FD] break-all select-all cursor-copy">
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
