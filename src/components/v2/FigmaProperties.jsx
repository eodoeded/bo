// Simple Figma-like Properties Panel
// Clean, minimal, just the essentials

import React from 'react';

export default function FigmaProperties({ selectedLayer, onUpdateLayer, clientUI, onUpdateClientUI }) {
    if (!selectedLayer) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white/20 p-8 text-center">
                <span className="font-mono text-[10px] uppercase tracking-widest mb-2">NO_SELECTION</span>
                <p className="text-xs text-white/30">Select a layer to edit</p>
            </div>
        );
    }

    const updateProperty = (key, value) => {
        onUpdateLayer(selectedLayer.id, {
            properties: { ...selectedLayer.properties, [key]: value }
        });
    };

    return (
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Layer Name */}
            <div>
                <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2 block">LAYER_NAME</label>
                <input
                    type="text"
                    value={selectedLayer.name || ''}
                    onChange={(e) => {
                        if (e && e.target && onUpdateLayer) {
                            onUpdateLayer(selectedLayer.id, { name: e.target.value });
                        }
                    }}
                    className="w-full bg-white/5 border border-white/10 text-white font-montreal text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                    placeholder="Layer name"
                />
            </div>

            {/* Position */}
            <div className="space-y-2">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Position</div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-[10px] text-white/30 mb-1 block">X</label>
                        <input
                            type="number"
                            value={selectedLayer.properties.x || 0}
                            onChange={(e) => {
                                if (e && e.target) {
                                    updateProperty('x', parseFloat(e.target.value) || 0);
                                }
                            }}
                            className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] text-white/30 mb-1 block">Y</label>
                        <input
                            type="number"
                            value={selectedLayer.properties.y || 0}
                            onChange={(e) => {
                                if (e && e.target) {
                                    updateProperty('y', parseFloat(e.target.value) || 0);
                                }
                            }}
                            className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Size (for image/rectangle) */}
            {(selectedLayer.type === 'image' || selectedLayer.type === 'rectangle') && (
                <div className="space-y-2">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Size</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-[10px] text-white/30 mb-1 block">W</label>
                            <input
                                type="number"
                                value={selectedLayer.properties.width ?? 0}
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateProperty('width', parseInt(e.target.value) || 0);
                                    }
                                }}
                                className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-white/30 mb-1 block">H</label>
                            <input
                                type="number"
                                value={selectedLayer.properties.height ?? 0}
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateProperty('height', parseInt(e.target.value) || 0);
                                    }
                                }}
                                className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Text Specific */}
            {selectedLayer.type === 'text' && (
                <>
                    <div className="space-y-2">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Text</div>
                        <textarea
                            value={selectedLayer.properties.text || ''}
                            onChange={(e) => {
                                if (e && e.target) {
                                    updateProperty('text', e.target.value);
                                }
                            }}
                            className="w-full bg-white/5 border border-white/10 text-white font-montreal text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300 min-h-[80px] resize-none"
                            placeholder="Text content"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-[10px] text-white/30 mb-1 block">Size</label>
                            <input
                                type="number"
                                value={selectedLayer.properties.fontSize ?? 16}
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateProperty('fontSize', parseInt(e.target.value) || 16);
                                    }
                                }}
                                className="w-full bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-white/30 mb-1 block">Color</label>
                            <div className="flex gap-1">
                                <input
                                    type="color"
                                    value={selectedLayer.properties.color || '#FFFFFF'}
                                    onChange={(e) => {
                                        if (e && e.target) {
                                            updateProperty('color', e.target.value);
                                        }
                                    }}
                                    className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer transition-colors duration-300 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E3E3FD]/50 focus:ring-offset-2 focus:ring-offset-[#1A1614]"
                                />
                                <input
                                    type="text"
                                    value={selectedLayer.properties.color || '#FFFFFF'}
                                    onChange={(e) => {
                                        if (e && e.target) {
                                            updateProperty('color', e.target.value);
                                        }
                                    }}
                                    className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Image Specific */}
            {selectedLayer.type === 'image' && (
                <div className="space-y-2">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Image</div>
                    <input
                        type="text"
                        value={selectedLayer.properties.src || ''}
                        onChange={(e) => {
                            if (e && e.target) {
                                updateProperty('src', e.target.value);
                            }
                        }}
                        className="w-full bg-white/5 border border-white/10 text-white font-montreal text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                        placeholder="Image URL"
                    />
                </div>
            )}

            {/* Rectangle Specific */}
            {selectedLayer.type === 'rectangle' && (
                <div className="space-y-2">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Fill</div>
                    <div className="flex gap-1">
                        <input
                            type="color"
                            value={selectedLayer.properties.color || '#FFFFFF'}
                            onChange={(e) => updateProperty('color', e.target.value)}
                            className="w-8 h-8 rounded-lg border border-white/10 cursor-pointer transition-colors duration-300 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E3E3FD]/50 focus:ring-offset-2 focus:ring-offset-[#1A1614]"
                        />
                        <input
                            type="text"
                            value={selectedLayer.properties.color || '#FFFFFF'}
                            onChange={(e) => updateProperty('color', e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 text-white text-xs px-2 py-1.5 rounded focus:outline-none focus:border-white/30"
                        />
                    </div>
                </div>
            )}

            {/* Locks Section (Simple) */}
            <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Locks</div>
                <div className="space-y-1">
                    {(() => {
                        // Get all properties that can be locked
                        const lockableProps = [];
                        if (selectedLayer.properties.x !== undefined) lockableProps.push('x');
                        if (selectedLayer.properties.y !== undefined) lockableProps.push('y');
                        if (selectedLayer.properties.width !== undefined) lockableProps.push('width');
                        if (selectedLayer.properties.height !== undefined) lockableProps.push('height');
                        if (selectedLayer.properties.text !== undefined) lockableProps.push('text');
                        if (selectedLayer.properties.fontSize !== undefined) lockableProps.push('fontSize');
                        if (selectedLayer.properties.color !== undefined) lockableProps.push('color');
                        if (selectedLayer.properties.src !== undefined) lockableProps.push('src');
                        
                        return lockableProps.map(key => {
                            const currentLock = selectedLayer.locks?.[key] || 'LOCKED';
                            return (
                                <label key={key} className="flex items-center gap-2 text-xs text-white/60 cursor-pointer">
                                    <select
                                        value={currentLock}
                                        onChange={(e) => {
                                            if (e && e.target && onUpdateLayer) {
                                                const newLocks = { ...selectedLayer.locks };
                                                newLocks[key] = e.target.value;
                                                onUpdateLayer(selectedLayer.id, { locks: newLocks });
                                            }
                                        }}
                                        className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors duration-300"
                                    >
                                        <option value="LOCKED">Locked</option>
                                        <option value="READ_ONLY">Read Only</option>
                                        <option value="CLIENT_INPUT">Client Input</option>
                                    </select>
                                    <span className="text-[10px] w-20">{key}</span>
                                </label>
                            );
                        });
                    })()}
                </div>
            </div>
        </div>
    );
}

