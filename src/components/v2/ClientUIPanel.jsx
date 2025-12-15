// Client UI Customization Panel
// Studios can customize the client-facing tool UI (logo, colors, etc.)

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

export default function ClientUIPanel({ toolId, clientUI, onUpdateClientUI }) {
    const [logoPreview, setLogoPreview] = useState(clientUI?.logo || null);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const logoUrl = reader.result;
                setLogoPreview(logoUrl);
                onUpdateClientUI({ ...clientUI, logo: logoUrl });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoPreview(null);
        onUpdateClientUI({ ...clientUI, logo: null });
    };

    const updateColor = (key, value) => {
        onUpdateClientUI({ ...clientUI, [key]: value });
    };

    return (
        <div className="flex flex-col gap-3 md:gap-4">
            {/* Header */}
            <div className="pb-3 md:pb-4 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_6px_#E3E3FD]"></div>
                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">CLIENT_UI_CUSTOMIZATION</span>
                </div>
                <p className="font-montreal text-sm text-white/60">Customize how the tool appears to clients</p>
            </div>

            {/* Logo */}
            <div className="space-y-3">
                <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-2 md:mt-4 mb-2">LOGO</h4>
                <div className="p-4 border border-white/10 rounded-lg bg-white/[0.02]">
                    {logoPreview ? (
                        <div className="relative">
                            <img 
                                src={logoPreview} 
                                alt="Logo" 
                                className="max-h-20 max-w-full object-contain mb-3"
                            />
                            <button
                                onClick={removeLogo}
                                className="absolute top-0 right-0 p-1 bg-red-900/20 border border-red-500/20 rounded hover:bg-red-900/30 transition-colors"
                            >
                                <X size={12} className="text-red-400" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-lg cursor-pointer hover:border-white/20 transition-colors">
                            <Upload size={20} className="text-white/40 mb-2" />
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">UPLOAD_LOGO</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
                <h4 className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-2 md:mt-4 mb-2">COLORS</h4>
                
                <div className="space-y-2">
                    <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                        <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2 block">Top Navigation Background</label>
                        <div className="flex gap-2">
                            <input 
                                type="color"
                                value={clientUI?.topNavBg || '#1A1614'} 
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateColor('topNavBg', e.target.value);
                                    }
                                }}
                                className="w-12 h-8 rounded border border-white/10 cursor-pointer"
                            />
                            <input 
                                type="text"
                                value={clientUI?.topNavBg || '#1A1614'} 
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateColor('topNavBg', e.target.value);
                                    }
                                }}
                                className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                        <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2 block">Top Navigation Text</label>
                        <div className="flex gap-2">
                            <input 
                                type="color"
                                value={clientUI?.topNavText || '#FFFFFF'} 
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateColor('topNavText', e.target.value);
                                    }
                                }}
                                className="w-12 h-8 rounded border border-white/10 cursor-pointer"
                            />
                            <input 
                                type="text"
                                value={clientUI?.topNavText || '#FFFFFF'} 
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateColor('topNavText', e.target.value);
                                    }
                                }}
                                className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="p-3 border border-white/10 rounded-lg bg-white/[0.02]">
                        <label className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2 block">Primary Accent</label>
                        <div className="flex gap-2">
                            <input 
                                type="color"
                                value={clientUI?.accentColor || '#E3E3FD'} 
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateColor('accentColor', e.target.value);
                                    }
                                }}
                                className="w-12 h-8 rounded border border-white/10 cursor-pointer"
                            />
                            <input 
                                type="text"
                                value={clientUI?.accentColor || '#E3E3FD'} 
                                onChange={(e) => {
                                    if (e && e.target) {
                                        updateColor('accentColor', e.target.value);
                                    }
                                }}
                                className="flex-1 bg-white/5 border border-white/10 text-white font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E3E3FD] focus:border-[#E3E3FD]/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className="mt-4 p-4 border border-white/10 rounded-lg bg-white/[0.02]">
                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">PREVIEW</p>
                <div 
                    className="p-4 rounded-lg"
                    style={{ 
                        backgroundColor: clientUI?.topNavBg || '#1A1614',
                        color: clientUI?.topNavText || '#FFFFFF'
                    }}
                >
                    <div className="flex items-center justify-between">
                        {logoPreview && (
                            <img src={logoPreview} alt="Logo" className="h-6 object-contain" />
                        )}
                        <span className="font-mono text-xs">Tool Name</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

