import React from 'react';
import { X } from 'lucide-react';

export const ShortcutsHelp = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
        <div className="bg-[#0A0A0A] border border-white/10 p-6 w-[500px] max-w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-mono text-xs font-bold text-white uppercase tracking-widest">Keyboard Shortcuts</h2>
                <button onClick={onClose}><X size={14} className="text-white/40 hover:text-white" /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-[10px]">
                <div className="space-y-4">
                    <h3 className="text-[#E3E3FD] uppercase tracking-wider">Essentials</h3>
                    <div className="flex justify-between"><span className="text-white/60">Undo</span> <span className="text-white">Ctrl + Z</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Redo</span> <span className="text-white">Ctrl + Shift + Z</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Copy</span> <span className="text-white">Ctrl + C</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Paste</span> <span className="text-white">Ctrl + V</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Delete</span> <span className="text-white">Del / Backspace</span></div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-[#E3E3FD] uppercase tracking-wider">Selection & Move</h3>
                    <div className="flex justify-between"><span className="text-white/60">Multi-Select</span> <span className="text-white">Shift + Click</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Duplicate</span> <span className="text-white">Alt + Drag</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Constrain Resize</span> <span className="text-white">Shift + Drag</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Nudge</span> <span className="text-white">Arrows</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Big Nudge</span> <span className="text-white">Shift + Arrows</span></div>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-[#E3E3FD] uppercase tracking-wider">View</h3>
                    <div className="flex justify-between"><span className="text-white/60">Pan</span> <span className="text-white">Space + Drag</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Zoom In/Out</span> <span className="text-white">Ctrl + Scroll</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Zoom to Fit</span> <span className="text-white">Shift + 1</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Zoom to Selection</span> <span className="text-white">Shift + 2</span></div>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-[#E3E3FD] uppercase tracking-wider">Arrange</h3>
                    <div className="flex justify-between"><span className="text-white/60">Bring Forward</span> <span className="text-white">]</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Send Backward</span> <span className="text-white">[</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Lock/Unlock</span> <span className="text-white">L</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Distribute</span> <span className="text-white">Properties Panel</span></div>
                </div>
            </div>
        </div>
    </div>
);

