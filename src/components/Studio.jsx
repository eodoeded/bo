import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Lock, Unlock, Eye, EyeOff, 
    Download, ChevronRight, 
    Type, Image as ImageIcon, 
    Check, AlertCircle, Settings
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';

// --- VISUAL IDENTITY CONSTANTS ---
const THEME = {
    bg: "bg-[#261E19]", // Organic Brown Substrate
    panel: "bg-[#1A1614]", // Darker Container
    surface: "bg-[#2E2824]", // Light Surface
    accent: "text-[#E3E3FD]", // Lavender Signal
    accentBg: "bg-[#E3E3FD]",
    border: "border-white/10",
    radius: "rounded-2xl",
    pill: "rounded-full"
};

// --- MOCK OBJECT (The "Hardcoded" Layout) ---
// In a real app, this would be dynamic. For MVP, we prove it with one robust object.
const DEFAULT_CONFIG = {
    headline: { value: "SYSTEM_OS v2.5", locked: false, type: "text", label: "Version ID" },
    subhead: { value: "Automated Governance", locked: true, type: "text", label: "Descriptor" },
    date: { value: "Q1 2025", locked: false, type: "text", label: "Release Date" },
    accentColor: { value: "#E3E3FD", locked: true, type: "color", label: "Signal Color" }
};

// --- COMPONENTS ---

const StatusBadge = ({ mode }) => (
    <div className={`px-3 py-1 ${THEME.border} border ${THEME.pill} flex items-center gap-2 bg-white/5`}>
        <div className={`w-1.5 h-1.5 ${THEME.accentBg} animate-pulse rounded-full`}></div>
        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">
            {mode === 'AUTHOR' ? 'Authoring_Mode' : 'Execution_Mode'}
        </span>
    </div>
);

const InputField = ({ label, value, onChange, locked, mode, onToggleLock }) => {
    // If we are in Client mode and it's locked, don't show it (or show as read-only)
    if (mode === 'EXECUTE' && locked) return null;

    return (
        <div className={`group p-4 ${THEME.border} border ${THEME.radius} bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative`}>
            <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{label}</span>
                {mode === 'AUTHOR' && (
                    <button onClick={onToggleLock} className="text-white/20 hover:text-[#E3E3FD] transition-colors">
                        {locked ? <Lock size={12} /> : <Unlock size={12} />}
                    </button>
                )}
            </div>
            
            {mode === 'EXECUTE' ? (
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent text-white font-montreal text-lg focus:outline-none placeholder:text-white/20"
                    placeholder={`Enter ${label}...`}
                />
            ) : (
                <div className="flex items-center justify-between">
                    <span className={`font-montreal text-lg ${locked ? 'text-white/30' : 'text-white'}`}>
                        {value}
                    </span>
                    {locked && <span className="font-mono text-[9px] text-[#E3E3FD] bg-[#E3E3FD]/10 px-2 py-1 rounded-full">LOCKED</span>}
                </div>
            )}
        </div>
    );
};

// --- MAIN PREVIEW COMPONENT ---
// This is the "Object" itself. It doesn't know about the editor. It just renders props.
const BrandedObjectRender = ({ config, id }) => {
    return (
        <div 
            id={id}
            className="w-full aspect-[4/5] bg-[#050505] relative overflow-hidden flex flex-col justify-between p-12 border border-white/5"
        >
            {/* Background Generative Element */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-[#E3E3FD] to-transparent blur-[100px] rounded-full mix-blend-screen" 
                     style={{ backgroundColor: config.accentColor.value }}></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 space-y-2">
                <div className="w-12 h-1 bg-[#E3E3FD] mb-8" style={{ backgroundColor: config.accentColor.value }}></div>
                <h1 className="font-montreal text-6xl leading-[0.9] text-white tracking-tight uppercase break-words">
                    {config.headline.value}
                </h1>
                <p className="font-mono text-xs text-white/60 tracking-widest uppercase mt-4">
                    {config.subhead.value}
                </p>
            </div>

            <div className="relative z-10 flex justify-between items-end border-t border-white/20 pt-6">
                <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-white/40 mb-1">GENERATED_OUTPUT</span>
                    <span className="font-mono text-xs text-white">{config.date.value}</span>
                </div>
                <div className="font-mono text-[8px] text-white/20">
                    ID: 8829-AF
                </div>
            </div>
        </div>
    );
};

export default function Studio() {
    const [mode, setMode] = useState('AUTHOR'); // 'AUTHOR' | 'EXECUTE'
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const previewRef = useRef(null);

    const handleUpdate = (key, newValue) => {
        setConfig(prev => ({
            ...prev,
            [key]: { ...prev[key], value: newValue }
        }));
    };

    const toggleLock = (key) => {
        setConfig(prev => ({
            ...prev,
            [key]: { ...prev[key], locked: !prev[key].locked }
        }));
    };

    const handleExport = async () => {
        if (previewRef.current) {
            const canvas = await html2canvas(previewRef.current, { scale: 2, backgroundColor: '#050505' });
            const link = document.createElement('a');
            link.download = 'branded-object-export.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className={`min-h-screen ${THEME.bg} text-white font-montreal flex flex-col overflow-hidden`}>
            
            {/* Header: Global Navigation & Mode Switch */}
            <header className={`h-16 ${THEME.panel} border-b ${THEME.border} flex items-center justify-between px-6 z-20`}>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-white/40 hover:text-white transition-colors">
                        <span className="font-mono text-[10px] uppercase tracking-widest">Back</span>
                    </Link>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
                        Studio <span className="text-[#E3E3FD]">//</span> Engine
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <StatusBadge mode={mode} />
                    <div className={`${THEME.surface} p-1 ${THEME.pill} flex gap-1 border ${THEME.border}`}>
                        <button 
                            onClick={() => setMode('AUTHOR')}
                            className={`px-4 py-1.5 ${THEME.pill} font-mono text-[9px] uppercase tracking-widest transition-colors ${mode === 'AUTHOR' ? 'bg-[#E3E3FD] text-black font-bold' : 'text-white/40 hover:text-white'}`}
                        >
                            Define
                        </button>
                        <button 
                            onClick={() => setMode('EXECUTE')}
                            className={`px-4 py-1.5 ${THEME.pill} font-mono text-[9px] uppercase tracking-widest transition-colors ${mode === 'EXECUTE' ? 'bg-[#E3E3FD] text-black font-bold' : 'text-white/40 hover:text-white'}`}
                        >
                            Execute
                        </button>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <button 
                        onClick={handleExport}
                        className="p-2 text-white/60 hover:text-[#E3E3FD] transition-colors"
                        title="Download Asset"
                    >
                        <Download size={16} />
                    </button>
                </div>
            </header>

            {/* Main Workspace: Split View */}
            <main className="flex-1 flex overflow-hidden">
                
                {/* LEFT: Input / Logic / Rules */}
                <section className="w-1/3 min-w-[400px] border-r border-white/5 p-8 overflow-y-auto relative z-10 flex flex-col">
                    <div className="mb-12">
                        <h2 className="font-montreal text-3xl mb-2">
                            {mode === 'AUTHOR' ? 'System Logic' : 'Configuration'}
                        </h2>
                        <p className="font-montreal text-white/40 text-sm">
                            {mode === 'AUTHOR' 
                                ? 'Define which variables are exposed to the client.' 
                                : 'Input data to generate the branded asset.'}
                        </p>
                    </div>

                    <div className="space-y-4 flex-1">
                        {Object.entries(config).map(([key, field]) => (
                            <InputField 
                                key={key}
                                label={field.label}
                                value={field.value}
                                locked={field.locked}
                                mode={mode}
                                onChange={(val) => handleUpdate(key, val)}
                                onToggleLock={() => toggleLock(key)}
                            />
                        ))}
                    </div>

                    {/* Contextual Hint */}
                    <div className="mt-8 p-4 border border-[#E3E3FD]/20 bg-[#E3E3FD]/5 rounded-xl flex items-start gap-3">
                        <AlertCircle size={16} className="text-[#E3E3FD] mt-0.5 shrink-0" />
                        <p className="font-mono text-[10px] text-[#E3E3FD] leading-relaxed uppercase">
                            {mode === 'AUTHOR' 
                                ? 'Tip: Locked fields will be invisible to the client in Execution mode.' 
                                : 'System: Layout rules are enforced. You cannot break the visual hierarchy.'}
                        </p>
                    </div>
                </section>

                {/* RIGHT: Preview / Output */}
                <section className="flex-1 bg-[#050505] relative flex items-center justify-center p-12">
                    {/* Organic Background Pattern for the Workspace */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{ 
                        backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
                        backgroundSize: '24px 24px' 
                    }}></div>

                    {/* The Object Container */}
                    <div className="relative shadow-2xl transition-all duration-500 ease-out transform" style={{ width: '400px' }}>
                        
                        {/* Simulation of "System Specs" floating around the object */}
                        <div className="absolute -top-12 left-0 font-mono text-[9px] text-white/20 uppercase tracking-widest">
                            Render_Engine_v1.0
                        </div>
                        <div className="absolute -top-12 right-0 font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1 h-1 bg-[#E3E3FD] rounded-full animate-pulse"></div>
                            Live
                        </div>

                        {/* The Actual Rendered Component */}
                        <div ref={previewRef}>
                            <BrandedObjectRender config={config} id="preview-canvas" />
                        </div>

                        {/* Logic Visualizer (Only in Author Mode) */}
                        <AnimatePresence>
                            {mode === 'AUTHOR' && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 pointer-events-none"
                                >
                                    {/* Visual lines connecting inputs to UI elements could go here in Phase 4 */}
                                    <div className="absolute -right-4 top-1/4 translate-x-full flex items-center gap-2">
                                        <div className="w-8 h-px bg-[#E3E3FD]/50"></div>
                                        <span className="font-mono text-[8px] text-[#E3E3FD] bg-[#261E19] px-1 border border-[#E3E3FD]/20 rounded-sm">HEADLINE_RULE</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

            </main>
        </div>
    );
}
