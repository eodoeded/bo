// Lock Panel - Set permissions AFTER design is done
// This is where you lock properties for client view

import React from 'react';
import { Lock, Eye, Edit3 } from 'lucide-react';

const LockControl = ({ label, lockState, onCycleLock, propertyKey }) => {
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
        <div className="group p-3 md:p-4 border border-white/10 rounded-lg bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest">{label}</span>
                    <span className="font-mono text-[8px] text-white/20">({propertyKey})</span>
                </div>
                <button 
                    onClick={onCycleLock} 
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-colors ${getLockBadgeStyle()}`}
                    title="Cycle Permission: LOCKED -> READ_ONLY -> CLIENT_INPUT"
                >
                    <span className="font-mono text-[8px] uppercase tracking-widest">{getLockLabel()}</span>
                    {getLockIcon()}
                </button>
            </div>
        </div>
    );
};

export default function LockPanel({ selectedLayer, onUpdateLayer }) {
    if (!selectedLayer) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white/20 p-6 md:p-8 text-center">
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full mb-3"></div>
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-2">NO_LAYER_SELECTED</span>
                <p className="font-montreal text-xs text-white/30">Select a layer to set permissions.</p>
            </div>
        );
    }

    const cycleLock = (key) => {
        const states = ['LOCKED', 'READ_ONLY', 'CLIENT_INPUT'];
        const currentIdx = states.indexOf(selectedLayer.locks?.[key] || 'LOCKED');
        const nextState = states[(currentIdx + 1) % states.length];
        
        onUpdateLayer(selectedLayer.id, {
            locks: { ...selectedLayer.locks, [key]: nextState }
        });
    };

    // Get all properties that can be locked
    const getLockableProperties = () => {
        const base = [
            { key: 'x', label: 'X Position' },
            { key: 'y', label: 'Y Position' },
        ];

        if (selectedLayer.type === 'text') {
            return [
                ...base,
                { key: 'text', label: 'Text Content' },
                { key: 'fontSize', label: 'Font Size' },
                { key: 'color', label: 'Text Color' },
                { key: 'fontWeight', label: 'Font Weight' },
                { key: 'textAlign', label: 'Text Align' },
            ];
        }

        if (selectedLayer.type === 'image') {
            return [
                ...base,
                { key: 'width', label: 'Width' },
                { key: 'height', label: 'Height' },
                { key: 'src', label: 'Image Source' },
            ];
        }

        if (selectedLayer.type === 'rectangle') {
            return [
                ...base,
                { key: 'width', label: 'Width' },
                { key: 'height', label: 'Height' },
                { key: 'color', label: 'Background Color' },
            ];
        }

        return base;
    };

    return (
        <div className="flex flex-col gap-3 md:gap-4">
            {/* Header */}
            <div className="pb-3 md:pb-4 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">PERMISSIONS</span>
                </div>
                <h3 className="font-montreal text-base md:text-lg text-white">{selectedLayer.name}</h3>
                <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest mt-1">Set what clients can edit</p>
            </div>

            {/* Lock Controls */}
            <div className="space-y-2">
                {getLockableProperties().map(prop => (
                    <LockControl
                        key={prop.key}
                        label={prop.label}
                        propertyKey={prop.key}
                        lockState={selectedLayer.locks?.[prop.key] || 'LOCKED'}
                        onCycleLock={() => cycleLock(prop.key)}
                    />
                ))}
            </div>

            {/* Info */}
            <div className="mt-4 p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest mb-2">PERMISSION_TYPES:</p>
                <div className="space-y-1 text-xs text-white/40">
                    <p><span className="text-[#E3E3FD]">LOCKED</span> - Hidden from client</p>
                    <p><span className="text-white/40">READ_ONLY</span> - Visible but not editable</p>
                    <p><span className="text-[#E3E3FD]">CLIENT_INPUT</span> - Editable by client</p>
                </div>
            </div>
        </div>
    );
}

