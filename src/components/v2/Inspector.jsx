// V2 Shared Component: Inspector (Studio Only)
// Controls for locking/unlocking and editing layer properties with Tri-State Logic

import React from 'react';
import { Lock, Eye, Edit3 } from 'lucide-react';

const PropertyControl = ({ label, value, type = "text", onChange, lockState, onCycleLock }) => {
    
    // Lock State Visuals
    const getLockIcon = () => {
        switch (lockState) {
            case 'LOCKED': return <Lock size={12} className="text-[#E3E3FD]" />;
            case 'READ_ONLY': return <Eye size={12} className="text-white/40" />;
            case 'CLIENT_INPUT': return <Edit3 size={12} className="text-[#E3E3FD]" />;
            default: return <Lock size={12} />;
        }
    };

    const getLockLabel = () => {
        switch (lockState) {
            case 'LOCKED': return 'HIDDEN';
            case 'READ_ONLY': return 'READ ONLY';
            case 'CLIENT_INPUT': return 'INPUT';
            default: return 'LOCKED';
        }
    };

    return (
        <div className="group p-3 border border-white/10 rounded-md bg-[#2E2824] hover:border-white/20 transition-colors relative">
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{label}</span>
                <button 
                    onClick={onCycleLock} 
                    className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors"
                    title="Cycle Permission: Locked -> Read Only -> Client Input"
                >
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">{getLockLabel()}</span>
                    {getLockIcon()}
                </button>
            </div>
            
            <input 
                type={type === 'number' ? 'number' : 'text'}
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#3A3430] text-white font-montreal text-sm px-2 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] placeholder:text-white/20"
                placeholder={`Enter ${label}...`}
            />
        </div>
    );
};

export default function Inspector({ selectedLayer, onUpdateLayer }) {
    if (!selectedLayer) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white/20 p-8 text-center">
                <span className="font-mono text-[10px] uppercase tracking-widest">No Layer Selected</span>
                <p className="text-xs mt-2">Select a layer to configure properties and permissions.</p>
            </div>
        );
    }

    const updateProperty = (key, value) => {
        onUpdateLayer(selectedLayer.id, {
            properties: { ...selectedLayer.properties, [key]: value }
        });
    };

    const cycleLock = (key) => {
        const states = ['LOCKED', 'READ_ONLY', 'CLIENT_INPUT'];
        const currentIdx = states.indexOf(selectedLayer.locks?.[key] || 'LOCKED');
        const nextState = states[(currentIdx + 1) % states.length];
        
        onUpdateLayer(selectedLayer.id, {
            locks: { ...selectedLayer.locks, [key]: nextState }
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="pb-4 border-b border-white/10 mb-2">
                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest block mb-1">Selected Layer</span>
                <h3 className="font-montreal text-lg text-white">{selectedLayer.name}</h3>
            </div>

            {/* Common Properties */}
            <div className="space-y-3">
                 <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-4 mb-2">Position & Layout</h4>
                 <div className="grid grid-cols-2 gap-2">
                    <PropertyControl 
                        label="X (%)" 
                        type="number"
                        value={selectedLayer.properties.x} 
                        onChange={(v) => updateProperty('x', parseFloat(v))}
                        lockState={selectedLayer.locks?.x || 'LOCKED'}
                        onCycleLock={() => cycleLock('x')}
                    />
                    <PropertyControl 
                        label="Y (%)" 
                        type="number"
                        value={selectedLayer.properties.y} 
                        onChange={(v) => updateProperty('y', parseFloat(v))}
                        lockState={selectedLayer.locks?.y || 'LOCKED'}
                        onCycleLock={() => cycleLock('y')}
                    />
                 </div>
            </div>

            {/* Text Specific */}
            {selectedLayer.type === 'text' && (
                <div className="space-y-3">
                     <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-4 mb-2">Typography</h4>
                     <PropertyControl 
                        label="Content" 
                        value={selectedLayer.properties.text} 
                        onChange={(v) => updateProperty('text', v)}
                        lockState={selectedLayer.locks?.text || 'CLIENT_INPUT'}
                        onCycleLock={() => cycleLock('text')}
                    />
                    <div className="grid grid-cols-2 gap-2">
                         <PropertyControl 
                            label="Size (px)" 
                            type="number"
                            value={selectedLayer.properties.fontSize} 
                            onChange={(v) => updateProperty('fontSize', parseInt(v))}
                            lockState={selectedLayer.locks?.fontSize || 'LOCKED'}
                            onCycleLock={() => cycleLock('fontSize')}
                        />
                         <PropertyControl 
                            label="Color" 
                            value={selectedLayer.properties.color} 
                            onChange={(v) => updateProperty('color', v)}
                            lockState={selectedLayer.locks?.color || 'LOCKED'}
                            onCycleLock={() => cycleLock('color')}
                        />
                    </div>
                </div>
            )}

            {/* Image Specific */}
            {selectedLayer.type === 'image' && (
                <div className="space-y-3">
                     <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-4 mb-2">Image Source</h4>
                     <PropertyControl 
                        label="Image URL" 
                        value={selectedLayer.properties.src} 
                        onChange={(v) => updateProperty('src', v)}
                        lockState={selectedLayer.locks?.src || 'CLIENT_INPUT'}
                        onCycleLock={() => cycleLock('src')}
                    />
                     <div className="grid grid-cols-2 gap-2">
                         <PropertyControl 
                            label="Width (px)" 
                            type="number"
                            value={selectedLayer.properties.width} 
                            onChange={(v) => updateProperty('width', parseInt(v))}
                            lockState={selectedLayer.locks?.width || 'LOCKED'}
                            onCycleLock={() => cycleLock('width')}
                        />
                         <PropertyControl 
                            label="Height (px)" 
                            type="number"
                            value={selectedLayer.properties.height} 
                            onChange={(v) => updateProperty('height', parseInt(v))}
                            lockState={selectedLayer.locks?.height || 'LOCKED'}
                            onCycleLock={() => cycleLock('height')}
                        />
                    </div>
                </div>
            )}

             {/* Rectangle Specific */}
             {selectedLayer.type === 'rectangle' && (
                <div className="space-y-3">
                     <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-4 mb-2">Style</h4>
                     <PropertyControl 
                        label="Color" 
                        value={selectedLayer.properties.color} 
                        onChange={(v) => updateProperty('color', v)}
                        lockState={selectedLayer.locks?.color || 'LOCKED'}
                        onCycleLock={() => cycleLock('color')}
                    />
                     <div className="grid grid-cols-2 gap-2">
                         <PropertyControl 
                            label="Width (px)" 
                            type="number"
                            value={selectedLayer.properties.width} 
                            onChange={(v) => updateProperty('width', parseInt(v))}
                            lockState={selectedLayer.locks?.width || 'LOCKED'}
                            onCycleLock={() => cycleLock('width')}
                        />
                         <PropertyControl 
                            label="Height (px)" 
                            type="number"
                            value={selectedLayer.properties.height} 
                            onChange={(v) => updateProperty('height', parseInt(v))}
                            lockState={selectedLayer.locks?.height || 'LOCKED'}
                            onCycleLock={() => cycleLock('height')}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
