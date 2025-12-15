// V2 Shared Component: Inspector (Studio Only)
// Controls for locking/unlocking and editing layer properties with Tri-State Logic
// Refined for alien ant-colony aesthetic: technical precision, lock states as cellular permissions

import React from 'react';
import { Lock, Eye, Edit3 } from 'lucide-react';

const PropertyControl = ({ label, value, type = "text", onChange, lockState, onCycleLock }) => {
    
    // Lock State Visuals
    const getLockIcon = () => {
        switch (lockState) {
            case 'LOCKED': return <Lock size={11} className="text-[#E3E3FD]" />;
            case 'READ_ONLY': return <Eye size={11} className="text-white/40" />;
            case 'CLIENT_INPUT': return <Edit3 size={11} className="text-[#E3E3FD]" />;
            default: return <Lock size={11} />;
        }
    };

    const getLockLabel = () => {
        switch (lockState) {
            case 'LOCKED': return 'LOCKED';
            case 'READ_ONLY': return 'READ_ONLY';
            case 'CLIENT_INPUT': return 'CLIENT_INPUT';
            default: return 'LOCKED';
        }
    };

    const getLockBadgeStyle = () => {
        switch (lockState) {
            case 'LOCKED': return 'border-[#E3E3FD]/20 bg-[#E3E3FD]/10 text-[#E3E3FD]';
            case 'READ_ONLY': return 'border-white/10 bg-white/5 text-white/40';
            case 'CLIENT_INPUT': return 'border-[#E3E3FD]/30 bg-[#E3E3FD]/10 text-[#E3E3FD]';
            default: return 'border-white/10 bg-white/5 text-white/40';
        }
    };

    return (
        <div className="group p-3 md:p-4 border border-white/10 rounded-lg bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-colors relative">
            {/* Connection Port - Left */}
            <div className={`absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border transition-colors ${
                lockState === 'CLIENT_INPUT' 
                    ? 'bg-[#E3E3FD] border-[#E3E3FD] shadow-[0_0_4px_#E3E3FD]' 
                    : 'bg-[#1A1614] border-white/20 group-hover:border-white/30'
            }`}></div>
            
            <div className="flex justify-between items-center mb-2.5">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{label}</span>
                <button 
                    onClick={onCycleLock} 
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-colors ${getLockBadgeStyle()}`}
                    title="Cycle Permission: LOCKED -> READ_ONLY -> CLIENT_INPUT"
                >
                    <span className="font-mono text-[8px] uppercase tracking-widest">{getLockLabel()}</span>
                    {getLockIcon()}
                </button>
            </div>
            
            <input 
                type={type === 'number' ? 'number' : 'text'}
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#261E19] border border-white/10 text-white font-mono text-[10px] md:text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 placeholder:text-white/20 transition-colors"
                placeholder={`ENTER_${label.toUpperCase().replace(/\s/g, '_')}...`}
                disabled={lockState === 'LOCKED'}
            />
            
            {/* Connection Port - Right */}
            <div className={`absolute -right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border transition-colors ${
                lockState === 'CLIENT_INPUT' 
                    ? 'bg-[#E3E3FD] border-[#E3E3FD] shadow-[0_0_4px_#E3E3FD]' 
                    : 'bg-[#1A1614] border-white/20 group-hover:border-white/30'
            }`}></div>
        </div>
    );
};

export default function Inspector({ selectedLayer, onUpdateLayer }) {
    if (!selectedLayer) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white/20 p-6 md:p-8 text-center">
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full mb-3"></div>
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-2">NO_LAYER_SELECTED</span>
                <p className="font-montreal text-xs text-white/30">Select a layer to configure properties and permissions.</p>
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
        <div className="flex flex-col gap-3 md:gap-4">
            {/* Header */}
            <div className="pb-3 md:pb-4 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">SELECTED_LAYER</span>
                </div>
                <h3 className="font-montreal text-base md:text-lg text-white">{selectedLayer.name}</h3>
                <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest mt-1">LAYER_ID: {selectedLayer.id}</p>
            </div>

            {/* Common Properties */}
            <div className="space-y-3">
                 <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">POSITION_&_LAYOUT</h4>
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
                     <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">TYPOGRAPHY</h4>
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
                     <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">IMAGE_SOURCE</h4>
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
                     <h4 className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-2 md:mt-4 mb-2">STYLE</h4>
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

