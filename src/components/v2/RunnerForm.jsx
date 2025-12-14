// V2 Shared Component: RunnerForm (Client Only)
// The "Client-Safe" input form. Enforces permissions STRICTLY.

import React from 'react';
import { Eye } from 'lucide-react';

const ClientInput = ({ label, value, onChange, type = 'text' }) => {
    return (
        <div className="group p-4 border border-white/10 rounded-lg bg-[#2E2824] relative">
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">{label}</span>
            </div>
            
            {type === 'long-text' ? (
                 <textarea 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#3A3430] text-white font-montreal text-lg px-3 py-3 rounded-md focus:outline-none focus:border-[#E3E3FD] border border-transparent placeholder:text-white/20 min-h-[100px] resize-none"
                    placeholder={`Enter ${label}...`}
                />
            ) : (
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#3A3430] text-white font-montreal text-lg px-3 py-3 rounded-md focus:outline-none focus:border-[#E3E3FD] border border-transparent placeholder:text-white/20"
                    placeholder={`Enter ${label}...`}
                />
            )}
        </div>
    );
};

const ReadOnlyField = ({ label, value }) => {
    return (
        <div className="group p-4 border border-white/5 rounded-lg bg-transparent relative opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Eye size={12} />
                    {label}
                </span>
                <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest border border-white/10 px-1 rounded">Read Only</span>
            </div>
            <div className="font-montreal text-lg text-white/60 select-none">
                {value || "—"}
            </div>
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
            return (
                <ClientInput 
                    key={uniqueKey}
                    label={label}
                    value={value}
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
            <div className="p-8 border border-dashed border-white/10 rounded-xl text-center">
                <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                    No inputs available. <br/> This tool is strictly locked.
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
