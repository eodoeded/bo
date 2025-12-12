import React from 'react';
import { Monitor, Smartphone, Layout, PenTool, Hash, Palette } from 'lucide-react';

const PRESETS = [
    { label: "IG Story", width: 1080, height: 1920, icon: Smartphone },
    { label: "IG Post", width: 1080, height: 1080, icon: Layout },
    { label: "LinkedIn", width: 1584, height: 396, icon: Monitor },
    { label: "Twitter", width: 1500, height: 500, icon: Monitor },
    { label: "A4", width: 595, height: 842, icon: PenTool }, // Approx 72dpi
];

const COLORS = [
    '#1C3A96', '#020202', '#FFFFFF', '#FF5733', '#10B981', '#3B82F6'
];

export const CanvasProperties = ({ config, onChange }) => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
                    <Hash size={12} /> Canvas Settings
                </h3>
                
                {/* Dimensions */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                        <span className="font-mono text-[9px] text-white/40">W</span>
                        <input 
                            type="number" 
                            value={config.width}
                            onChange={(e) => onChange({ ...config, width: Number(e.target.value) })}
                            className="w-12 bg-transparent text-right font-mono text-[9px] text-white focus:outline-none focus:text-[#E3E3FD]"
                        />
                    </div>
                    <div className="bg-[#0A0A0A] border border-white/10 px-2 py-1.5 flex justify-between items-center">
                        <span className="font-mono text-[9px] text-white/40">H</span>
                        <input 
                            type="number" 
                            value={config.height}
                            onChange={(e) => onChange({ ...config, height: Number(e.target.value) })}
                            className="w-12 bg-transparent text-right font-mono text-[9px] text-white focus:outline-none focus:text-[#E3E3FD]"
                        />
                    </div>
                </div>

                {/* Presets */}
                <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((preset) => (
                        <button 
                            key={preset.label}
                            onClick={() => onChange({ ...config, width: preset.width, height: preset.height })}
                            className="flex items-center gap-2 p-2 border border-transparent hover:border-[#E3E3FD] bg-white/5 hover:bg-white/10 transition-all rounded-[1px] group"
                        >
                            <preset.icon size={12} className="text-white/40 group-hover:text-[#E3E3FD]" />
                            <span className="font-mono text-[8px] text-white/60 group-hover:text-white uppercase tracking-wider">{preset.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
                    <Palette size={12} /> Background
                </h3>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-2 bg-[#0A0A0A] border border-white/10 p-2">
                        <input 
                            type="color" 
                            value={config.backgroundColor}
                            onChange={(e) => onChange({ ...config, backgroundColor: e.target.value })}
                            className="w-6 h-6 rounded-sm bg-transparent border-0 p-0 cursor-pointer"
                        />
                        <span className="font-mono text-[9px] text-white/60 uppercase">{config.backgroundColor}</span>
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                        {COLORS.map(color => (
                            <button
                                key={color}
                                onClick={() => onChange({ ...config, backgroundColor: color })}
                                className="w-full aspect-square rounded-full border border-white/10 hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

