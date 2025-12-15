// V2 Shared Component: RunnerForm (Client Only)
// The "Client-Safe" input form. Enforces permissions STRICTLY.
// Refined for alien ant-colony aesthetic: simplified, constrained, technical precision

import React from 'react';
import { Eye, Edit3 } from 'lucide-react';

const ClientInput = ({ label, value, onChange, type = 'text' }) => {
    return (
        <div className="group p-4 md:p-5 border border-white/10 rounded-lg bg-white/[0.02] hover:border-[#E3E3FD]/30 hover:bg-white/[0.04] transition-colors relative">
            {/* Connection Port - Left */}
            <div className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border bg-[#E3E3FD] border-[#E3E3FD] shadow-[0_0_4px_#E3E3FD]"></div>
            
            <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-[#E3E3FD]/10 border border-[#E3E3FD]/20 rounded-md">
                        <Edit3 size={10} className="text-[#E3E3FD]" />
                    </div>
                    <span className="font-mono text-[9px] md:text-[10px] text-[#E3E3FD] uppercase tracking-widest">{label}</span>
                </div>
                <span className="font-mono text-[8px] text-[#E3E3FD]/60 uppercase tracking-widest border border-[#E3E3FD]/20 bg-[#E3E3FD]/10 px-2 py-0.5 rounded-full">CLIENT_INPUT</span>
            </div>
            
            {type === 'long-text' ? (
                 <textarea 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#261E19] border border-white/10 text-white font-montreal text-sm md:text-base px-3 md:px-4 py-2.5 md:py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 placeholder:text-white/20 min-h-[100px] resize-none transition-colors"
                    placeholder={`ENTER_${label.toUpperCase().replace(/\s/g, '_')}...`}
                />
            ) : (
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#261E19] border border-white/10 text-white font-montreal text-sm md:text-base px-3 md:px-4 py-2.5 md:py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 placeholder:text-white/20 transition-colors"
                    placeholder={`ENTER_${label.toUpperCase().replace(/\s/g, '_')}...`}
                />
            )}
            
            {/* Connection Port - Right */}
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border bg-[#E3E3FD] border-[#E3E3FD] shadow-[0_0_4px_#E3E3FD]"></div>
        </div>
    );
};

const ReadOnlyField = ({ label, value }) => {
    return (
        <div className="group p-4 md:p-5 border border-white/5 rounded-lg bg-white/[0.01] hover:bg-white/[0.02] transition-colors relative opacity-70 hover:opacity-100">
            {/* Connection Port - Left (dimmed) */}
            <div className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border bg-[#1A1614] border-white/20"></div>
            
            <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-white/5 border border-white/10 rounded-md">
                        <Eye size={10} className="text-white/40" />
                    </div>
                    <span className="font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest">{label}</span>
                </div>
                <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest border border-white/10 bg-white/5 px-2 py-0.5 rounded-full">READ_ONLY</span>
            </div>
            <div className="font-montreal text-sm md:text-base text-white/60 select-none">
                {value || "—"}
            </div>
            
            {/* Connection Port - Right (dimmed) */}
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border bg-[#1A1614] border-white/20"></div>
        </div>
    );
};

export default function RunnerForm({ layers, onUpdateLayer }) {
    
    // 1. Audit Layer Config (Isolation Check)
    // We do NOT have access to builder tools here. Only raw layer data.
    
    const renderField = (layer, propKey, lockState) => {
        const uniqueKey = `${layer.id}-${propKey}`;
        const label = `${layer.name} - ${propKey.charAt(0).toUpperCase() + propKey.slice(1)}`;
        const value = layer.properties[propKey];

        // STRICT ENFORCEMENT:
        // LOCKED -> Render nothing (Hidden)
        if (lockState === 'LOCKED') return null;

        // READ_ONLY -> Render static display
        if (lockState === 'READ_ONLY') {
            return <ReadOnlyField key={uniqueKey} label={label} value={value} />;
        }

        // CLIENT_INPUT -> Render interactive control
        if (lockState === 'CLIENT_INPUT') {
            // Special handling for image src
            if (propKey === 'src' && layer.type === 'image') {
                return (
                    <ClientInput 
                        key={uniqueKey}
                        label={label}
                        value={value || ''}
                        type="text"
                        onChange={(val) => onUpdateLayer(layer.id, propKey, val)}
                    />
                );
            }
            return (
                <ClientInput 
                    key={uniqueKey}
                    label={label}
                    value={value || ''}
                    type={propKey === 'text' ? 'long-text' : 'text'}
                    onChange={(val) => onUpdateLayer(layer.id, propKey, val)}
                />
            );
        }

        return null;
    };

    const fields = layers.flatMap(layer => {
        if (!layer.locks) return [];
        return Object.entries(layer.locks).map(([propKey, lockState]) => 
            renderField(layer, propKey, lockState)
        );
    });

    const activeFields = fields.filter(f => f !== null);

    if (activeFields.length === 0) {
        return (
            <div className="p-8 md:p-12 border border-dashed border-white/10 rounded-xl text-center">
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full mx-auto mb-3"></div>
                <p className="font-mono text-[9px] md:text-xs text-white/40 uppercase tracking-widest mb-2">
                    NO_INPUTS_AVAILABLE
                </p>
                <p className="font-montreal text-sm text-white/30">
                    This tool is strictly locked.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {activeFields}
        </div>
    );
}
