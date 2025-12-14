// V2 Shared Component: LayerStack (Studio Only)
// Displays a vertical list of layers, allowing selection and reordering (future)

import React from 'react';
import { Layers, Type, Image as ImageIcon, Box, GripVertical, Plus } from 'lucide-react';

const LayerItem = ({ layer, isSelected, onSelect }) => {
    // Icon based on layer type
    const Icon = layer.type === 'text' ? Type : 
                 layer.type === 'image' ? ImageIcon : 
                 Box;

    return (
        <div 
            onClick={() => onSelect(layer.id)}
            className={`
                group flex items-center gap-3 p-3 rounded-md cursor-pointer border transition-colors
                ${isSelected 
                    ? 'bg-[#E3E3FD]/10 border-[#E3E3FD]/50 text-white' 
                    : 'bg-[#2E2824] border-transparent hover:bg-[#3A3430] text-white/60 hover:text-white'}
            `}
        >
            <GripVertical size={12} className="text-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
            <Icon size={14} className={isSelected ? 'text-[#E3E3FD]' : 'text-white/40'} />
            <span className="font-mono text-[10px] uppercase tracking-widest flex-1 truncate">
                {layer.name || layer.type}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#E3E3FD]' : 'bg-transparent'}`}></div>
        </div>
    );
};

export default function LayerStack({ layers, selectedId, onSelect, onAddLayer }) {
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1A1614]">
                <h2 className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={12} />
                    Layers
                </h2>
                <div className="flex gap-1">
                     <button 
                        onClick={() => onAddLayer('text')}
                        className="p-1.5 hover:bg-white/5 rounded text-white/40 hover:text-[#E3E3FD] transition-colors"
                        title="Add Text"
                    >
                        <Type size={14} />
                    </button>
                    <button 
                        onClick={() => onAddLayer('image')}
                        className="p-1.5 hover:bg-white/5 rounded text-white/40 hover:text-[#E3E3FD] transition-colors"
                        title="Add Image"
                    >
                        <ImageIcon size={14} />
                    </button>
                    <button 
                        onClick={() => onAddLayer('rectangle')}
                        className="p-1.5 hover:bg-white/5 rounded text-white/40 hover:text-[#E3E3FD] transition-colors"
                        title="Add Shape"
                    >
                        <Box size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-[#1A1614]">
                {/* Reverse map to show top layers at top visually (Stack order) */}
                {[...layers].reverse().map(layer => (
                    <LayerItem 
                        key={layer.id} 
                        layer={layer} 
                        isSelected={layer.id === selectedId} 
                        onSelect={onSelect} 
                    />
                ))}
            </div>
        </div>
    );
}

