// Design Panel - Normal Figma-like properties (no locks)
// Design freely, locks come later

import React from 'react';

const PropertyInput = ({ label, value, type = "text", onChange, disabled = false }) => {
    return (
        <div className="group p-3 md:p-4 border border-white/10 rounded-lg bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-center mb-2.5">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{label}</span>
            </div>
            
            {type === 'color' ? (
                <div className="flex gap-2">
                    <input 
                        type="color"
                        value={value || '#FFFFFF'} 
                        onChange={(e) => onChange(e.target.value)}
                        className="w-12 h-8 rounded border border-white/10 cursor-pointer"
                        disabled={disabled}
                    />
                    <input 
                        type="text"
                        value={value || ''} 
                        onChange={(e) => onChange(e.target.value)}
                        className="flex-1 bg-[#261E19] border border-white/10 text-white font-mono text-[10px] md:text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 placeholder:text-white/20 transition-colors"
                        placeholder="#FFFFFF"
                        disabled={disabled}
                    />
                </div>
            ) : type === 'textarea' ? (
                <textarea 
                    value={value || ''} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#261E19] border border-white/10 text-white font-montreal text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 placeholder:text-white/20 transition-colors min-h-[80px] resize-none"
                    placeholder={`Enter ${label.toLowerCase()}...`}
                    disabled={disabled}
                />
            ) : (
                <input 
                    type={type === 'number' ? 'number' : 'text'}
                    value={value || ''} 
                    onChange={(e) => onChange(type === 'number' ? (type.includes('float') ? parseFloat(e.target.value) : parseInt(e.target.value)) : e.target.value)}
                    className="w-full bg-[#261E19] border border-white/10 text-white font-mono text-[10px] md:text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 placeholder:text-white/20 transition-colors"
                    placeholder={`Enter ${label.toLowerCase()}...`}
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export default function DesignPanel({ selectedLayer, onUpdateLayer }) {
    if (!selectedLayer) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white/20 p-6 md:p-8 text-center">
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full mb-3"></div>
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-2">NO_LAYER_SELECTED</span>
                <p className="font-montreal text-xs text-white/30">Select a layer to edit properties.</p>
            </div>
        );
    }

    const updateProperty = (key, value) => {
        onUpdateLayer(selectedLayer.id, {
            properties: { ...selectedLayer.properties, [key]: value }
        });
    };

    return (
        <div className="flex flex-col gap-3 md:gap-4">
            {/* Header */}
            <div className="pb-3 md:pb-4 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">DESIGN_PROPERTIES</span>
                </div>
                <h3 className="font-montreal text-base md:text-lg text-white">{selectedLayer.name}</h3>
            </div>

            {/* Position & Size */}
            <div className="space-y-3">
                <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">POSITION & SIZE</h4>
                <div className="grid grid-cols-2 gap-2">
                    <PropertyInput 
                        label="X (%)" 
                        type="number"
                        value={selectedLayer.properties.x} 
                        onChange={(v) => updateProperty('x', v)}
                    />
                    <PropertyInput 
                        label="Y (%)" 
                        type="number"
                        value={selectedLayer.properties.y} 
                        onChange={(v) => updateProperty('y', v)}
                    />
                    {(selectedLayer.type === 'image' || selectedLayer.type === 'rectangle') && (
                        <>
                            <PropertyInput 
                                label="Width (px)" 
                                type="number"
                                value={selectedLayer.properties.width} 
                                onChange={(v) => updateProperty('width', v)}
                            />
                            <PropertyInput 
                                label="Height (px)" 
                                type="number"
                                value={selectedLayer.properties.height} 
                                onChange={(v) => updateProperty('height', v)}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Text Specific */}
            {selectedLayer.type === 'text' && (
                <div className="space-y-3">
                    <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">TYPOGRAPHY</h4>
                    <PropertyInput 
                        label="Text Content" 
                        type="textarea"
                        value={selectedLayer.properties.text} 
                        onChange={(v) => updateProperty('text', v)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <PropertyInput 
                            label="Font Size (px)" 
                            type="number"
                            value={selectedLayer.properties.fontSize} 
                            onChange={(v) => updateProperty('fontSize', v)}
                        />
                        <PropertyInput 
                            label="Color" 
                            type="color"
                            value={selectedLayer.properties.color} 
                            onChange={(v) => updateProperty('color', v)}
                        />
                    </div>
                    <PropertyInput 
                        label="Font Weight" 
                        type="number"
                        value={selectedLayer.properties.fontWeight || 400} 
                        onChange={(v) => updateProperty('fontWeight', v)}
                    />
                    <select
                        value={selectedLayer.properties.textAlign || 'center'}
                        onChange={(e) => updateProperty('textAlign', e.target.value)}
                        className="w-full bg-[#261E19] border border-white/10 text-white font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            )}

            {/* Image Specific */}
            {selectedLayer.type === 'image' && (
                <div className="space-y-3">
                    <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">IMAGE</h4>
                    <PropertyInput 
                        label="Image URL" 
                        type="text"
                        value={selectedLayer.properties.src} 
                        onChange={(v) => updateProperty('src', v)}
                    />
                </div>
            )}

            {/* Rectangle Specific */}
            {selectedLayer.type === 'rectangle' && (
                <div className="space-y-3">
                    <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">STYLE</h4>
                    <PropertyInput 
                        label="Background Color" 
                        type="color"
                        value={selectedLayer.properties.color} 
                        onChange={(v) => updateProperty('color', v)}
                    />
                </div>
            )}
        </div>
    );
}

