// V2 Shared Component: LayerStack (Studio Only)
// Displays a vertical list of layers, allowing selection and reordering (future)
// Refined for alien ant-colony aesthetic: technical precision, cellular structures, distributed organism

import React from 'react';
import { Layers, Type, Image as ImageIcon, Box, GripVertical, Trash2 } from 'lucide-react';
import { safeStopPropagation } from '../../utils/eventHelpers';

const LayerItem = ({ layer, isSelected, onSelect, onDelete }) => {
    // Icon based on layer type
    const Icon = layer.type === 'text' ? Type : 
                 layer.type === 'image' ? ImageIcon : 
                 Box;

    return (
        <div 
            onClick={() => onSelect(layer.id)}
            className={`
                group flex items-center gap-2.5 p-2.5 md:p-3 rounded-lg cursor-pointer border transition-colors relative
                ${isSelected 
                    ? 'bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-white' 
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 text-white/60 hover:text-white'}
            `}
        >
            {/* Connection Port - Left */}
            <div className={`absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border transition-colors ${
                isSelected 
                    ? 'bg-[#E3E3FD] border-[#E3E3FD] shadow-[0_0_4px_#E3E3FD]' 
                    : 'bg-[#1A1614] border-white/20 group-hover:border-white/30'
            }`}></div>
            
            <GripVertical size={11} className="text-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab shrink-0" />
            <div className={`p-1.5 rounded-md border shrink-0 ${
                isSelected 
                    ? 'bg-[#E3E3FD]/10 border-[#E3E3FD]/30' 
                    : 'bg-white/5 border-white/10 group-hover:border-white/20'
            }`}>
                <Icon size={12} className={isSelected ? 'text-[#E3E3FD]' : 'text-white/40 group-hover:text-white/60'} />
            </div>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest flex-1 truncate">
                {layer.name || layer.type}
            </span>
            {/* Status Indicator */}
            <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                isSelected 
                    ? 'bg-[#E3E3FD] shadow-[0_0_6px_#E3E3FD]' 
                    : 'bg-transparent group-hover:bg-white/20'
            }`}></div>
            
            {/* Delete Button (shown on hover/select) */}
            {onDelete && (
                <button
                    onClick={(e) => {
                        if (e && typeof e.stopPropagation === 'function') {
                            e.stopPropagation();
                        }
                        if (window.confirm(`Delete layer "${layer.name}"?`)) {
                            onDelete(layer.id);
                        }
                    }}
                    className={`p-1 hover:bg-red-900/20 border border-red-500/20 rounded-lg transition-all duration-300 shrink-0 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-[#1A1614] ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    title="Delete layer (or press Delete key)"
                >
                    <Trash2 size={10} className="text-red-400" />
                </button>
            )}
            
            {/* Connection Port - Right */}
            <div className={`absolute -right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border transition-colors ${
                isSelected 
                    ? 'bg-[#E3E3FD] border-[#E3E3FD] shadow-[0_0_4px_#E3E3FD]' 
                    : 'bg-[#1A1614] border-white/20 group-hover:border-white/30'
            }`}></div>
        </div>
    );
};

export default function LayerStack({ layers, selectedId, onSelect, onAddLayer, onDeleteLayer }) {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-3 md:p-4 border-b border-white/10 flex justify-between items-center bg-[#1A1614]">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                    <h2 className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                        <Layers size={11} className="text-white/30" />
                        LAYER_STACK
                    </h2>
                </div>
                <div className="flex gap-1">
                     <button 
                        onClick={() => onAddLayer('text')}
                        className="p-1.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 text-white/40 hover:text-[#E3E3FD] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#E3E3FD]/50 focus:ring-offset-2 focus:ring-offset-[#1A1614]"
                        title="Add Text Layer"
                    >
                        <Type size={12} />
                    </button>
                    <button 
                        onClick={() => onAddLayer('image')}
                        className="p-1.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 text-white/40 hover:text-[#E3E3FD] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#E3E3FD]/50 focus:ring-offset-2 focus:ring-offset-[#1A1614]"
                        title="Add Image Layer"
                    >
                        <ImageIcon size={12} />
                    </button>
                    <button 
                        onClick={() => onAddLayer('rectangle')}
                        className="p-1.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 text-white/40 hover:text-[#E3E3FD] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#E3E3FD]/50 focus:ring-offset-2 focus:ring-offset-[#1A1614]"
                        title="Add Rectangle Layer"
                    >
                        <Box size={12} />
                    </button>
                </div>
            </div>

            {/* Layer List */}
            <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-1.5 bg-[#1A1614]">
                {layers.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-white/10 rounded-lg">
                        <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-2">NO_LAYERS</p>
                        <p className="font-montreal text-xs text-white/30">Add layers to build your tool</p>
                    </div>
                ) : (
                    /* Reverse map to show top layers at top visually (Stack order) */
                    [...layers].reverse().map(layer => (
                        <LayerItem 
                            key={layer.id} 
                            layer={layer} 
                            isSelected={layer.id === selectedId} 
                            onSelect={onSelect}
                            onDelete={onDeleteLayer}
                        />
                    ))
                )}
            </div>
        </div>
    );
}


