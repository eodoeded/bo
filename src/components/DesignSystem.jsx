import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { 
    RefreshCw, Shield, Zap, CreditCard, Layout, Lock, Eye, Edit3, 
    Type, Image as ImageIcon, Box, Layers, GripVertical, Plus, 
    Database, Scan, ArrowRight, CheckCircle, AlertTriangle, Download,
    MousePointer, Hand, Clock, Save, Cpu, Activity
} from 'lucide-react';
import UnifiedNav from './UnifiedNav';
import Inspector from './v2/Inspector';
import LayerStack from './v2/LayerStack';

// Section Header Component
const SectionHeader = ({ title, number }) => (
    <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6 group cursor-crosshair">
        <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_#E3E3FD]"></div>
            <h2 className="font-montreal font-medium text-3xl tracking-tight text-white group-hover:translate-x-2 transition-transform duration-300">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/30 tracking-widest group-hover:text-[#E3E3FD] transition-colors">/ {number}</span>
        </div>
    </div>
);

// Badge Component
const Badge = ({ children, className = "", color = "text-[#E3E3FD]" }) => (
    <span className={`font-mono text-[9px] uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full bg-white/[0.02] ${color} ${className}`}>
        {children}
    </span>
);

export default function DesignSystem() {
    // State for interactive examples
    const [selectedLayer, setSelectedLayer] = useState({
        id: 'demo-1',
        name: 'HEADLINE_TEXT',
        type: 'text',
        properties: { x: 50, y: 40, text: 'Sample Headline', fontSize: 42, color: '#FFFFFF' },
        locks: { x: 'LOCKED', y: 'LOCKED', text: 'CLIENT_INPUT', fontSize: 'LOCKED', color: 'LOCKED' }
    });
    const [layers, setLayers] = useState([
        { id: '1', name: 'HEADLINE_TEXT', type: 'text', zIndex: 10 },
        { id: '2', name: 'BACKGROUND_IMG', type: 'image', zIndex: 0 },
        { id: '3', name: 'LOGO', type: 'image', zIndex: 5 }
    ]);
    const [buttonHover, setButtonHover] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [nodePositions, setNodePositions] = useState({ studio: { x: 24, y: 22 }, core: { x: 58, y: 58 }, output: { x: 78, y: 34 } });
    const [draggingNode, setDraggingNode] = useState(null);
    const containerRef = useRef(null);

    return (
    <div className="min-h-screen bg-[#261E19] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal overflow-x-hidden relative">
      <div className="fixed inset-0 bg-[#261E19] z-0"></div>
      
      <UnifiedNav />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ 
          backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
      }}></div>

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-[#261E19] mt-12 md:mt-14">
        <div className="absolute bottom-12 left-6 md:left-12 max-w-2xl z-20 pointer-events-none">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">SYSTEM_OS v2.5</span>
                <span className="font-mono text-[9px] text-white/20">|</span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">ALL_MODULES_OPERATIONAL</span>
              </div>
            <h1 className="font-montreal font-medium text-6xl md:text-8xl tracking-tight mb-6 text-white leading-[0.9]">
                Design<br/><span className="text-[#E3E3FD]">System</span>
            </h1>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4 leading-relaxed max-w-lg">
                MONO-MATERIAL ARCHITECTURE // GROWN RATHER THAN MANUFACTURED // ZERO TEXTURE VARIATION // BIOLUMINESCENT SIGNAL MARKERS
            </p>
            <p className="font-montreal text-white/60 text-base leading-relaxed max-w-lg">
                Complete specification for the Branded Objects visual language. Every component, connection pattern, and constraint. Built for agencies automating brand governance at scale.
            </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-32 px-6 md:px-12 space-y-48 relative z-10 mt-12 md:mt-14">
        
        {/* 00. Material Philosophy */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Material Philosophy" number="00" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    The core aesthetic principle. Mono-material restraint creates premium through limitation. Grown, not manufactured.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Mono-Material</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Grown</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Signal</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Mono-Material Restraint */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Mono-Material Restraint</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-3xl space-y-6">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-3">Single Base Material</p>
                            <p className="font-montreal text-base text-white/60 leading-relaxed mb-4">
                                One dark brown-black canvas (#261E19) dominates every surface. Zero texture variation. No gradients, no patterns beyond the minimal grid. The material feels grown, not manufactured—like a subterranean hive structure extruded from a single substance.
                            </p>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-full h-16 rounded-lg bg-[#261E19] border border-white/10"></div>
                                <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest">#261E19</div>
                            </div>
                        </div>
                        
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-3">Bioluminescent Signals</p>
                            <p className="font-montreal text-base text-white/60 leading-relaxed mb-4">
                                Lavender (#E3E3FD) appears only as signal markers—like bioluminescent navigation beacons in a dark alien hive. Maximum 10% of any view. Used for: active states, hover borders, status indicators, connection pulses. Never as background or decoration.
                            </p>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-full h-16 rounded-lg bg-[#E3E3FD] border border-[#E3E3FD]/20"></div>
                                <div className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">#E3E3FD</div>
                            </div>
                        </div>
                        
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-3">Opacity Layers for Depth</p>
                            <p className="font-montreal text-base text-white/60 leading-relaxed mb-4">
                                White text uses opacity layers (white → white/70 → white/60 → white/40) to create depth without breaking the mono-material illusion. No color variation, only opacity variation. Like layers of the same material at different densities.
                            </p>
                            <div className="space-y-2 mt-4">
                                <div className="font-montreal text-white">Primary Text (white)</div>
                                <div className="font-montreal text-white/70">Secondary Text (white/70)</div>
                                <div className="font-montreal text-white/60">Tertiary Text (white/60)</div>
                                <div className="font-montreal text-white/40">Quaternary Text (white/40)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grown vs Manufactured */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Grown vs Manufactured</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-3xl space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                <p className="font-mono text-xs text-red-400 uppercase tracking-widest mb-3">❌ Manufactured</p>
                                <ul className="space-y-2 font-montreal text-sm text-white/60">
                                    <li>• Sharp corners, hard edges</li>
                                    <li>• Gradients, textures, patterns</li>
                                    <li>• Multiple materials, color variety</li>
                                    <li>• Decoration for decoration's sake</li>
                                    <li>• Human-friendly, warm, inviting</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-[#E3E3FD]/10 border border-[#E3E3FD]/20 rounded-2xl">
                                <p className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-3">✅ Grown</p>
                                <ul className="space-y-2 font-montreal text-sm text-white/60">
                                    <li>• Organic curves, cellular structures</li>
                                    <li>• Mono-material, zero texture</li>
                                    <li>• Single base color, opacity layers</li>
                                    <li>• Every surface serves exact function</li>
                                    <li>• Alien, optimized, non-human logic</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* 00b. Foundation */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Foundation" number="00b" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-6">
                    The core building blocks: colors, typography, spacing, and border radius. These are the atoms of the system.
                </p>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg mb-8">
                    <p className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-2">Material Philosophy</p>
                    <p className="font-montreal text-sm text-white/60 leading-relaxed">
                        Mono-material restraint. One dark base dominates. Lavender as bioluminescent signal markers. Grown rather than manufactured. Zero texture variation.
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Colors</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Typography</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Spacing</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Radius</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Color System */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Color System</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    {/* Primary Palette */}
                    <div className="mb-12">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Primary Palette</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { 
                                    name: 'Background', 
                                    value: '#261E19', 
                                    usage: 'Main canvas / Surface',
                                    description: 'The dark brown foundation. Fixed, never scrolls behind content. Used for all page backgrounds.'
                                },
                                { 
                                    name: 'Signal', 
                                    value: '#E3E3FD', 
                                    usage: 'Bioluminescent Marker',
                                    description: 'Lavender bioluminescence. Use as signal markers in dark hive. Maximum 10% of any view. Feels like alien navigation beacons, not decoration.'
                                },
                                { 
                                    name: 'Ink', 
                                    value: '#FFFFFF', 
                                    usage: 'Primary Text',
                                    description: 'White text. Use opacity for hierarchy: white (primary), white/70 (secondary), white/40 (tertiary).'
                                }
                            ].map((color) => (
                                <div key={color.name} className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl hover:border-[#E3E3FD]/30 transition-colors">
                                    <div className="w-full h-24 rounded-lg mb-4 border border-white/10" style={{ backgroundColor: color.value }}></div>
                                    <p className="font-montreal text-white mb-1">{color.name}</p>
                                    <p className="font-mono text-[10px] text-white/40 mb-3">{color.value}</p>
                                    <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-2">{color.usage}</p>
                                    <p className="font-montreal text-sm text-white/50 leading-relaxed">{color.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Palette */}
                    <div className="mb-12">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Secondary Palette</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: 'Card BG', value: '#1A1614', usage: 'Card backgrounds' },
                                { name: 'Deep BG', value: '#0A0A0A', usage: 'Canvas stage' },
                                { name: 'Hover', value: '#2E2824', usage: 'Hover states' },
                                { name: 'Border', value: 'rgba(255,255,255,0.1)', usage: 'Default borders' }
                            ].map((color) => (
                                <div key={color.name} className="bg-[#1A1614] border border-white/10 p-4 rounded-lg">
                                    <div className="w-full h-16 rounded mb-3 border border-white/10" style={{ backgroundColor: color.value }}></div>
                                    <p className="font-mono text-[9px] text-white/60 mb-1">{color.name}</p>
                                    <p className="font-mono text-[8px] text-white/30">{color.value}</p>
                                    <p className="font-mono text-[8px] text-white/20 mt-1">{color.usage}</p>
                                </div>
              ))}
           </div>
            </div>

                    {/* Text Opacity Scale */}
                    <div>
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Text Opacity Hierarchy</p>
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                            {[
                                { opacity: 'text-white', label: 'Primary', usage: 'Headings, important content' },
                                { opacity: 'text-white/70', label: 'Secondary', usage: 'Body text, descriptions' },
                                { opacity: 'text-white/60', label: 'Tertiary', usage: 'Metadata, captions' },
                                { opacity: 'text-white/40', label: 'Quaternary', usage: 'Labels, disabled states' },
                                { opacity: 'text-white/20', label: 'Placeholder', usage: 'Input placeholders only' }
                            ].map((level) => (
                                <div key={level.opacity} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <div>
                                        <p className={`font-montreal ${level.opacity} text-lg mb-1`}>Sample Text</p>
                                        <p className="font-mono text-[9px] text-white/30">{level.label} — {level.usage}</p>
                                    </div>
                                    <code className="font-mono text-[9px] text-white/40">{level.opacity}</code>
                                </div>
            ))}
          </div>
                    </div>
                </div>

                {/* Typography */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Typography</span>
                         <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    {/* Font Families */}
                    <div className="mb-12">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Font Families</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                                <p className="font-montreal text-4xl mb-4">PP Neue Montreal</p>
                                <p className="font-mono text-[9px] text-white/40 mb-2">Display & Body</p>
                                <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                    Primary typeface for all human-facing content. Use <span className="text-white">Medium (500)</span> for headings, <span className="text-white">Book (400)</span> for body text.
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="font-montreal font-medium text-xl">Medium — Headlines</p>
                                    <p className="font-montreal text-lg">Book — Body Text</p>
                                </div>
                            </div>
                            <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                                <p className="font-mono text-2xl mb-4">SF Mono</p>
                                <p className="font-mono text-[9px] text-white/40 mb-2">System & Technical</p>
                                <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                    Monospace font for all system text: labels, badges, code, technical metadata. Always uppercase with <code className="text-white/80">tracking-widest</code>.
                                </p>
                                <div className="mt-4 space-y-2">
                                    <p className="font-mono text-xs uppercase tracking-widest">SYSTEM_LABEL</p>
                                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">Status Badge</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Type Scale */}
                    <div>
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Type Scale</p>
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-8">
                            {[
                                { role: 'Display XL', size: 'text-6xl md:text-8xl', sample: 'Visual Intelligence', font: 'font-montreal font-medium' },
                                { role: 'Heading L', size: 'text-5xl md:text-6xl', sample: 'System Architecture', font: 'font-montreal font-medium' },
                                { role: 'Heading M', size: 'text-3xl md:text-4xl', sample: 'Modular Components', font: 'font-montreal font-medium' },
                                { role: 'Body L', size: 'text-xl', sample: 'The studio controls the prompt structure.', font: 'font-montreal' },
                                { role: 'Body', size: 'text-base', sample: 'Regular body text for descriptions and content.', font: 'font-montreal' },
                                { role: 'Label', size: 'text-xs', sample: 'SYSTEM_LABEL', font: 'font-mono uppercase tracking-widest' },
                                { role: 'Caption', size: 'text-[9px]', sample: 'Status Badge', font: 'font-mono uppercase tracking-widest' }
                            ].map((type, i) => (
                                <div key={i} className="group grid grid-cols-12 items-baseline border-b border-white/5 pb-6 hover:border-[#E3E3FD]/30 transition-colors last:border-0">
                                    <div className="col-span-12 md:col-span-3 font-mono text-xs text-white/30 group-hover:text-[#E3E3FD] transition-colors mb-2 md:mb-0">{type.role}</div>
                                    <div className={`col-span-12 md:col-span-9 ${type.font} ${type.size} text-white leading-none`}>{type.sample}</div>
                                </div>
            ))}
          </div>
                    </div>
                </div>

                {/* Spacing Scale */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Spacing Scale</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Base Unit: 4px</p>
                        <div className="space-y-6">
                            {[
                                { name: 'Section Vertical', value: 'py-20 md:py-32', pixels: '80px / 128px', usage: 'Between major sections' },
                                { name: 'Card Padding Large', value: 'p-10', pixels: '40px', usage: 'Benefit cards, feature cards' },
                                { name: 'Card Padding Medium', value: 'p-8', pixels: '32px', usage: 'Standard cards, panels' },
                                { name: 'Card Padding Small', value: 'p-6', pixels: '24px', usage: 'Compact cards, inputs' },
                                { name: 'Grid Gap Large', value: 'gap-6', pixels: '24px', usage: 'Card grids' },
                                { name: 'Grid Gap Medium', value: 'gap-4', pixels: '16px', usage: 'Form elements' },
                                { name: 'Grid Gap Small', value: 'gap-2', pixels: '8px', usage: 'Tight groups, badges' },
                                { name: 'Container Padding', value: 'px-6 md:px-12', pixels: '24px / 48px', usage: 'Page margins' }
                            ].map((spacing, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg">
                                    <div>
                                        <p className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">{spacing.name}</p>
                                        <p className="font-mono text-[9px] text-white/30 mt-1">{spacing.usage}</p>
        </div>
                                    <div className="text-right">
                                        <code className="font-mono text-[10px] text-[#E3E3FD] block">{spacing.value}</code>
                                        <span className="font-mono text-[9px] text-white/40">{spacing.pixels}</span>
        </div>
    </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Border Radius */}
              <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Border Radius</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'Small', value: 'rounded-lg', pixels: '8px', usage: 'Inputs, badges, small elements' },
                            { name: 'Medium', value: 'rounded-2xl', pixels: '16px', usage: 'Icon containers, nodes, small cards' },
                            { name: 'Large', value: 'rounded-3xl', pixels: '24px', usage: 'Main cards, panels, major components' },
                            { name: 'Full', value: 'rounded-full', pixels: '50%', usage: 'Pills, status dots, circular icons' }
                        ].map((radius) => (
                            <div key={radius.name} className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                                <div className={`w-full h-20 mb-4 bg-[#261E19] border border-white/10 ${radius.value}`}></div>
                                <p className="font-montreal text-white mb-1">{radius.name}</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-1">{radius.value}</code>
                                <p className="font-mono text-[9px] text-white/40">{radius.pixels} — {radius.usage}</p>
                            </div>
                        ))}
                    </div>
                </div>

        </div>
        </section>

        {/* 01. Navigation */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Navigation" number="01" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    The fixed navigation system. Context-aware, minimal, always present. Like a nervous system—always active, adapting to context.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">UnifiedNav</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Context-Aware</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Fixed</Badge>
        </div>
    </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Component Overview */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Component Structure</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                        {/* Organic background pattern */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, #E3E3FD 1px, transparent 0)',
                            backgroundSize: '24px 24px'
      }}></div>

                        <div className="relative z-10">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">UnifiedNav Component</p>
                            
                            {/* Visual Nav Example */}
                            <div className="bg-[#261E19] border border-white/10 rounded-2xl overflow-hidden mb-6">
                                <div className="h-12 md:h-14 bg-[#261E19] border-b border-white/5 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
                                        <span className="font-mono text-sm tracking-widest text-white uppercase">[ BO ]</span>
                                        <div className="h-4 w-px bg-white/10"></div>
                                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Studio</span>
        </div>
                                    <div className="flex items-center gap-4">
                                        <button className="bg-white text-black px-5 py-2.5 font-mono font-semibold text-[11px] uppercase tracking-widest hover:bg-[#E3E3FD] transition-colors rounded-sm">
                                            Request Access
    </button>
        </div>
    </div>
        </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Height</p>
                                    <p className="font-montreal text-sm text-white/70">h-12 md:h-14 (48px / 56px)</p>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Background</p>
                                    <p className="font-montreal text-sm text-white/70">bg-[#261E19] with backdrop-blur-md</p>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Border</p>
                                    <p className="font-montreal text-sm text-white/70">border-b border-white/5</p>
                                </div>
                        </div>
                        </div>
                    </div>
        </div>

                {/* Context States */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Context States</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Landing State */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl hover:border-[#E3E3FD]/30 transition-colors">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 bg-[#E3E3FD] rounded-full"></div>
                                <p className="font-mono text-[10px] text-white uppercase tracking-widest">Landing Page</p>
                                </div>
                            <div className="space-y-3 mb-4">
                                <div className="h-10 bg-[#261E19] border border-white/10 rounded-lg flex items-center justify-between px-4">
                                    <span className="font-mono text-xs text-white/60">[ BO ]</span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[9px] text-white/40">Process</span>
                                        <span className="font-mono text-[9px] text-white/40">Value</span>
                                        <span className="font-mono text-[9px] text-white/40">Specs</span>
                            </div>
                                    <button className="bg-white text-black px-3 py-1.5 font-mono text-[9px] uppercase rounded-sm">Request Access</button>
                        </div>
                            </div>
                            <p className="font-mono text-[9px] text-white/30">Shows center nav links + CTA button</p>
                        </div>

                        {/* Studio State */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl hover:border-[#E3E3FD]/30 transition-colors">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                                <p className="font-mono text-[10px] text-white uppercase tracking-widest">Studio / Builder</p>
                            </div>
                            <div className="space-y-3 mb-4">
                                <div className="h-10 bg-[#261E19] border border-white/10 rounded-lg flex items-center justify-between px-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-white/60">[ BO ]</span>
                                        <div className="h-3 w-px bg-white/10"></div>
                                        <span className="font-mono text-[9px] text-[#E3E3FD]">Studio</span>
                            </div>
                        </div>
                            </div>
                            <p className="font-mono text-[9px] text-white/30">Shows context divider (Studio/Builder)</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Navigation Links</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
            
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Link Pattern</p>
                        <div className="space-y-4">
                            {['Process', 'Value', 'Specs'].map((link, i) => (
                                <div key={i} className="group relative">
                                    <button className="font-mono text-[11px] text-white/60 hover:text-white uppercase tracking-widest transition-colors relative w-full text-left">
                                        {link}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E3E3FD] group-hover:w-full transition-all duration-300"></span>
    </button>
                                    <div className="mt-2 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                                        <code className="font-mono text-[9px] text-white/40">
                                            {`hover:text-white + underline animation`}
                                        </code>
                                    </div>
                            </div>
                                ))}
                            </div>
                         </div>
        </div>

                {/* Mobile Menu */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Mobile Menu</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Mobile Overlay Pattern</p>
                        <div className="space-y-2 border border-white/10 rounded-lg overflow-hidden">
                            <button className="w-full py-4 px-6 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/[0.02] transition-colors">
                                Process
                            </button>
                            <button className="w-full py-4 px-6 border-b border-white/5 font-mono text-xs text-left uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/[0.02] transition-colors">
                                Value
                            </button>
                            <button className="w-full py-4 px-6 font-mono text-xs text-left uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/[0.02] transition-colors">
                                Specifications
                            </button>
                            </div>
                        <p className="font-mono text-[9px] text-white/30 mt-4">Full-screen overlay from top, slides down on mobile</p>
                        </div>
                </div>

                {/* Brand Mark */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Brand Mark</span>
                        <div className="h-px flex-1 bg-white/10"></div>
            </div>
            
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                                <span className="font-mono text-lg tracking-widest text-white hover:text-[#E3E3FD] transition-colors uppercase">[ BO ]</span>
                </div>
                            <div className="flex-1">
                                <p className="font-montreal text-white mb-1">[ BO ]</p>
                                <p className="font-mono text-[9px] text-white/40">font-mono text-sm tracking-widest uppercase</p>
                                <p className="font-mono text-[9px] text-white/30 mt-1">Hover: text-[#E3E3FD]</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-[9px] text-white/40 mb-2">Usage</p>
                            <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                Always left-aligned. Links to home. The brackets create a "system" feel—like a command or identifier.
                            </p>
                        </div>
                    </div>
        </div>

                {/* Technical Specs */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Technical Specifications</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
            
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        {[
                            { prop: 'Position', value: 'fixed top-0 left-0 w-full z-50' },
                            { prop: 'Max Width', value: '1400px (centered)' },
                            { prop: 'Padding', value: 'px-6 md:px-12' },
                            { prop: 'Backdrop', value: 'backdrop-blur-md' },
                            { prop: 'Transition', value: '300ms ease-in-out' }
                        ].map((spec, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg">
                                <span className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">{spec.prop}</span>
                                <code className="font-mono text-[10px] text-[#E3E3FD]">{spec.value}</code>
                                </div>
                        ))}
                            </div>
                        </div>

                            </div>
      </section>

        {/* 02. Cards */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Cards" number="02" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Modular containers. Like cells in an organism—each self-contained, but part of a larger system. Standard structure, infinite variations.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Standard</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Benefit</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Tool</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
        
                {/* Standard Card Structure */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Standard Card Pattern</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    {/* Live Example */}
                    <div className="mb-8">
             <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#1A1614] border border-white/10 p-10 rounded-3xl relative group hover:bg-[#2E2824] hover:border-[#E3E3FD]/50 transition-colors"
                        >
                            {/* Icon Container */}
                            <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                                <RefreshCw size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
        </div>

                            {/* Badge */}
                            <span className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4 block">01 // Revenue Model</span>
                            
                            {/* Title */}
                            <h3 className="font-montreal font-medium text-2xl text-white mb-4">Productised Service</h3>
                            
                            {/* Description */}
                            <p className="text-white/50 font-montreal text-sm leading-relaxed">
                                Don't just bill for the setup. Sell the tool as a subscription. Create recurring revenue streams from a single design system implementation.
            </p>
      </motion.div>
        </div>

                    <div className="mt-6 bg-[#261E19] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Structure Breakdown</p>
                        <div className="space-y-3 font-mono text-[9px] text-white/40">
                            <div className="flex justify-between">
                                <span>Background:</span>
                                <code className="text-[#E3E3FD]">bg-[#1A1614]</code>
                            </div>
                            <div className="flex justify-between">
                                <span>Border:</span>
                                <code className="text-[#E3E3FD]">border border-white/10</code>
                                </div>
                            <div className="flex justify-between">
                                <span>Padding:</span>
                                <code className="text-[#E3E3FD]">p-8 md:p-10</code>
                            </div>
                            <div className="flex justify-between">
                                <span>Radius:</span>
                                <code className="text-[#E3E3FD]">rounded-3xl</code>
                        </div>
                            <div className="flex justify-between">
                                <span>Hover BG:</span>
                                <code className="text-[#E3E3FD]">hover:bg-[#2E2824]</code>
                        </div>
                            <div className="flex justify-between">
                                <span>Hover Border:</span>
                                <code className="text-[#E3E3FD]">hover:border-[#E3E3FD]/50</code>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Variants */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Card Variants</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Benefit Card - Live */}
                                    <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#1A1614] border border-white/10 p-10 relative group hover:bg-[#2E2824] transition-colors rounded-3xl"
                        >
                            <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                                <Shield size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                            </div>
                            <h3 className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4">02 // Governance</h3>
                            <h4 className="font-montreal font-medium text-2xl text-white mb-4">Code-Enforced Brand</h4>
                            <p className="text-white/50 font-montreal text-sm leading-relaxed">
                                PDF guidelines are suggestions. Branded Objects are laws.
                            </p>
                        </motion.div>

                        {/* Tool Card - Live */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#1A1614] border border-white/10 p-8 md:p-10 hover:border-[#E3E3FD]/50 hover:bg-[#2E2824] transition-colors rounded-3xl relative group"
                        >
                            <div className="absolute top-6 right-6">
                                <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-[#E3E3FD]/20 bg-[#E3E3FD]/10 text-[#E3E3FD] rounded-lg">Live</span>
                            </div>
                            <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                                <Layout size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                            </div>
                            <h3 className="font-montreal font-medium text-2xl mb-4 group-hover:text-[#E3E3FD] transition-colors">Social_Story_v1</h3>
                            <div className="space-y-2.5 mb-4">
                                <div className="flex items-center gap-2 text-white/40">
                                    <Clock size={12} className="text-white/30" />
                                    <p className="font-mono text-[10px] uppercase tracking-widest">LAST_EDIT: 2 mins ago</p>
                                </div>
                                <div className="flex items-center gap-2 text-white/40">
                                    <Database size={12} className="text-white/30" />
                                    <p className="font-mono text-[10px] uppercase tracking-widest">OUTPUTS: 1,247</p>
                                </div>
                                <div className="flex items-center gap-2 text-white/40">
                                    <Activity size={12} className="text-white/30" />
                                    <p className="font-mono text-[10px] uppercase tracking-widest">LATENCY: 12ms</p>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-white/5">
                                <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">TOOL_ID: x9z-22a</p>
                            </div>
                        </motion.div>

                        {/* Feature Card - Live */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#1A1614] border border-white/10 p-10 relative group hover:bg-[#2E2824] transition-colors rounded-3xl"
                        >
                            <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                                <Zap size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                            </div>
                            <h3 className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4">03 // Scale</h3>
                            <h4 className="font-montreal font-medium text-2xl text-white mb-4">Infinite Output</h4>
                            <p className="text-white/50 font-montreal text-sm leading-relaxed">
                                Whether the client needs 5 assets or 5000, your effort remains zero.
                            </p>
                        </motion.div>
                            </div>
                    
                    <div className="bg-[#261E19] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Usage</p>
                        <div className="space-y-2 font-mono text-[9px] text-white/40">
                            <div>Benefit Card: WaitlistBenefits, feature sections</div>
                            <div>Tool Card: StudioDashboard</div>
                            <div>Feature Card: WaitlistFeatures</div>
                        </div>
                    </div>
                </div>

                {/* Icon Container Pattern */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Icon Container</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Standard Icon Container</p>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center group hover:border-[#E3E3FD] transition-colors rounded-2xl">
                                <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
                        <div>
                                <p className="font-montreal text-white mb-1">w-14 h-14 (56px)</p>
                                <code className="font-mono text-[9px] text-white/40">border border-white/10 bg-white/5 rounded-2xl</code>
                            </div>
                        </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-[9px] text-white/40 mb-2">Hover State</p>
                            <p className="font-montreal text-sm text-white/60">Border changes to <code className="text-[#E3E3FD]">border-[#E3E3FD]</code>, icon color shifts to lavender</p>
                        </div>
                    </div>
                </div>

            </div>
      </section>

        {/* 02c. Studio Dashboard Patterns */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Studio Dashboard" number="02c" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-6">
                    Mission control interface for brand governance. Technical density, system readouts, and modular tool cells.
                </p>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg mb-8">
                    <p className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-2">Technical Density</p>
                    <p className="font-montreal text-sm text-white/60 leading-relaxed">
                        Dense information hierarchy. System labels, latency readouts, output counts, tool IDs. Every surface serves exact technical function. Feels like mission control software for an alien megastructure—no wasted space, no hand-holding, pure function.
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">System Status</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Tool Cards</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Metrics</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* System Status Header */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">System Status Header</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                            <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
                            <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">SYSTEM_OS v2.5</span>
                            <span className="font-mono text-[9px] text-white/20">|</span>
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">ALL_MODULES_OPERATIONAL</span>
                            <span className="font-mono text-[9px] text-white/20">|</span>
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">UPTIME: 99.9%</span>
                        </div>
                        <div className="space-y-2 font-mono text-[9px] text-white/40">
                            <div className="flex justify-between">
                                <span>Bioluminescent Indicator:</span>
                                <code className="text-[#E3E3FD]">w-1.5 h-1.5 bg-[#E3E3FD] animate-pulse</code>
                            </div>
                            <div className="flex justify-between">
                                <span>System Labels:</span>
                                <code className="text-[#E3E3FD]">font-mono text-[9px] uppercase tracking-widest</code>
                            </div>
                            <div className="flex justify-between">
                                <span>Separator:</span>
                                <code className="text-[#E3E3FD]">text-white/20</code>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tool Card with Technical Metadata */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Tool Card (Studio Dashboard)</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-3xl relative group hover:border-[#E3E3FD]/50 hover:bg-[#2E2824] transition-colors">
                        <div className="absolute top-6 right-6">
                            <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-[#E3E3FD]/20 bg-[#E3E3FD]/10 text-[#E3E3FD] rounded-lg">Live</span>
                        </div>
                        <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                            <Layout size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                        </div>
                        <h3 className="font-montreal font-medium text-2xl mb-4 group-hover:text-[#E3E3FD] transition-colors">Social_Story_v1</h3>
                        <div className="space-y-2.5 mb-4">
                            <div className="flex items-center gap-2 text-white/40">
                                <Clock size={12} className="text-white/30" />
                                <p className="font-mono text-[10px] uppercase tracking-widest">LAST_EDIT: 2 mins ago</p>
                            </div>
                            <div className="flex items-center gap-2 text-white/40">
                                <Database size={12} className="text-white/30" />
                                <p className="font-mono text-[10px] uppercase tracking-widest">OUTPUTS: 1,247</p>
                            </div>
                            <div className="flex items-center gap-2 text-white/40">
                                <Activity size={12} className="text-white/30" />
                                <p className="font-mono text-[10px] uppercase tracking-widest">LATENCY: 12ms</p>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-white/5">
                            <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">TOOL_ID: x9z-22a</p>
                        </div>
                    </div>
                </div>

                {/* System Stats Footer */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">System Metrics Footer</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <div className="mb-6">
                            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-4">SYSTEM_METRICS</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'TOTAL_TOOLS', value: '2', sublabel: 'REGISTERED_MODULES' },
                                { label: 'LIVE_TOOLS', value: '1', sublabel: 'ACTIVE_DEPLOYMENTS', highlight: true },
                                { label: 'TOTAL_OUTPUTS', value: '1,247', sublabel: 'ASSETS_GENERATED' },
                                { label: 'AVG_LATENCY', value: '12ms', sublabel: 'RESPONSE_TIME' }
                            ].map((metric, i) => (
                                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
                                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">{metric.label}</p>
                                    <p className={`font-mono text-3xl mb-1 ${metric.highlight ? 'text-[#E3E3FD]' : 'text-white'}`}>{metric.value}</p>
                                    <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">{metric.sublabel}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* 02d. Landing Page Patterns */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Landing Page Patterns" number="02d" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-6">
                    Marketing surface components. More expressive spacing, visual storytelling through nodes, and conversion-focused copywriting.
                </p>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg mb-8">
                    <p className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-2">Marketing Surface</p>
                    <p className="font-montreal text-sm text-white/60 leading-relaxed">
                        Slightly more expressive than product surfaces. More spacing, visual storytelling, but still maintains mono-material restraint and alien ant-colony aesthetic.
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Hero</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Nodes</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Benefits</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Features</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Hero Section Pattern */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Hero Section</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest border border-[#E3E3FD]/20 bg-[#E3E3FD]/10 px-2 py-1 rounded-full">System_OS v2.5</span>
                            </div>
                            <h1 className="font-montreal font-medium text-5xl md:text-8xl leading-[0.9] tracking-tight text-white">
                                Intelligent <br/><span className="text-[#E3E3FD]">Design Systems.</span>
                            </h1>
                            <p className="font-montreal text-white/70 text-lg md:text-xl max-w-md leading-relaxed">
                                Automated brand governance for scaling studios. <br/>
                                Turn brand guidelines into software, not PDFs.
                            </p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">Structure</p>
                            <div className="space-y-2 font-mono text-[9px] text-white/40">
                                <div className="flex justify-between">
                                    <span>Label Above Hero:</span>
                                    <code className="text-[#E3E3FD]">font-mono text-[9px] uppercase tracking-widest</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Hero Text:</span>
                                    <code className="text-[#E3E3FD]">font-montreal text-5xl md:text-8xl</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Description:</span>
                                    <code className="text-[#E3E3FD]">font-montreal text-lg md:text-xl</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Email Form:</span>
                                    <code className="text-[#E3E3FD]">Below description</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copywriting Style */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Copywriting Style & Voice</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-[#E3E3FD]/10 border border-[#E3E3FD]/20 rounded-2xl">
                                <p className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-3">✅ Tone</p>
                                <ul className="space-y-2 font-montreal text-sm text-white/60">
                                    <li>• Direct, technical, confident</li>
                                    <li>• No fluff, no marketing speak</li>
                                    <li>• Focus on function over emotion</li>
                                    <li>• Alien engineering precision</li>
                                    <li>• "Turn X into Y" statements</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                <p className="font-mono text-xs text-red-400 uppercase tracking-widest mb-3">❌ Avoid</p>
                                <ul className="space-y-2 font-montreal text-sm text-white/60">
                                    <li>• "Revolutionary", "Game-changing"</li>
                                    <li>• Excessive exclamation marks</li>
                                    <li>• Vague promises</li>
                                    <li>• Human warmth/empathy</li>
                                    <li>• Corporate jargon</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Examples</p>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-mono text-[9px] text-white/40 mb-2">Hero Headline:</p>
                                    <p className="font-montreal text-lg text-white/80">"Intelligent Design Systems."</p>
                                </div>
                                <div>
                                    <p className="font-mono text-[9px] text-white/40 mb-2">Value Prop:</p>
                                    <p className="font-montreal text-base text-white/70">"Turn brand guidelines into software, not PDFs."</p>
                                </div>
                                <div>
                                    <p className="font-mono text-[9px] text-white/40 mb-2">Benefit Statement:</p>
                                    <p className="font-montreal text-base text-white/70">"Stop selling hours. Start selling systems."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nodes System (Landing Page) */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Nodes System (Landing Page)</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl space-y-6">
                        <p className="font-montreal text-white/60 leading-relaxed">
                            Interactive floating nodes with connection lines. Visual metaphor for the system architecture—distributed organism, neural network, cellular structures. Used only on landing page as illustration, not UI.
                        </p>
                        
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Node Structure</p>
                            <div className="space-y-3">
                                <div className="bg-[#261E19] border border-white/10 p-4 rounded-lg relative">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Branded_Objects</span>
                                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full shadow-[0_0_8px_#E3E3FD]"></div>
                                    </div>
                                    <div className="h-24 w-full bg-white/5 rounded-lg flex items-center justify-center mb-2">
                                        <span className="font-mono text-[8px] text-white/30">[ Robot / Visual Content ]</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60">
                                        <div className="w-2 h-2 bg-white/20 rounded"></div>
                                        <span className="font-mono text-[8px]">GENERATING_ASSET_ID_8492</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-[9px] text-white/40 mb-2">Connection Lines</p>
                            <p className="font-montreal text-sm text-white/60">Animated pulse along organic curves. Lavender (#E3E3FD) signal traveling through the network. Represents data flow, system connections, distributed intelligence.</p>
                        </div>
                    </div>
                </div>

                {/* Benefits Cards Pattern */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Benefits Cards</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-3xl relative group hover:bg-[#2E2824] hover:border-[#E3E3FD]/50 transition-colors">
                        <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                            <RefreshCw size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                        </div>
                        <h3 className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4">01 // Revenue Model</h3>
                        <h4 className="font-montreal font-medium text-2xl text-white mb-4">Productised Service</h4>
                        <p className="text-white/50 font-montreal text-sm leading-relaxed">
                            Don't just bill for the setup. Sell the tool as a subscription. Create recurring revenue streams from a single design system implementation.
                        </p>
                    </div>
                </div>

                {/* Features / Technical Data Sheet */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Technical Data Sheet</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl">
                        <div className="flex items-center justify-between py-3 border-b border-white/5 group hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="p-1.5 bg-white/5 rounded-md">
                                    <Lock size={14} className="text-[#E3E3FD]/50 group-hover:text-[#E3E3FD] transition-colors" />
                                </div>
                                <span className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">BRAND LOGIC</span>
                            </div>
                            <span className="font-mono text-[10px] text-[#E3E3FD]">Strict Enforcement</span>
                        </div>
                    </div>
                </div>

                {/* How It Works Pattern */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">How It Works Section</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl space-y-6">
                        <p className="font-montreal text-white/60 leading-relaxed">
                            Two-column layout: left side with numbered steps (border-left pattern), right side with governance UI representation. Shows the mechanism of turning brand guidelines into software rules.
                        </p>
                        
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Step Pattern</p>
                            <div className="space-y-4">
                                <div className="group relative pl-6 border-l border-white/10 hover:border-[#E3E3FD] transition-colors duration-500">
                                    <span className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#261E19] border border-white/20 group-hover:border-[#E3E3FD] transition-colors rounded-full"></span>
                                    <span className="font-mono text-[9px] text-white/30 tracking-widest block mb-2 uppercase">/ 01</span>
                                    <h3 className="font-mono text-white text-lg tracking-widest mb-2 uppercase">DEFINE_THE_LOGIC</h3>
                                    <p className="font-montreal text-white/60 text-lg mb-2">Designers set the rules.</p>
                                    <p className="font-mono text-[10px] text-[#E3E3FD]/50 uppercase tracking-wide">You build the master system. Lock fonts, positioning, and style.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* 02b. Buttons & Forms */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Buttons & Forms" number="02b" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Interactive elements. Primary actions, inputs, and form controls. Every state must be clear and intentional.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Primary</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Secondary</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Inputs</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Primary Button */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Primary Button</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="space-y-6">
                        {/* Live Examples */}
                        <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Button States</p>
                            <div className="flex flex-wrap items-center gap-4">
                                <button 
                                    className="bg-white text-black px-5 py-2.5 font-mono font-semibold text-[11px] uppercase tracking-widest hover:bg-[#E3E3FD] transition-colors rounded-sm"
                                    onMouseEnter={() => setButtonHover('primary')}
                                    onMouseLeave={() => setButtonHover(null)}
                                >
                                    Request Access
                                </button>
                                <button 
                                    className="bg-white text-black px-5 py-2.5 font-mono font-semibold text-[11px] uppercase tracking-widest bg-[#E3E3FD] rounded-sm cursor-default"
                                >
                                    Hover State
                                </button>
                                <button 
                                    className="bg-white text-black px-5 py-2.5 font-mono font-semibold text-[11px] uppercase tracking-widest opacity-50 cursor-not-allowed rounded-sm"
                                    disabled
                                >
                                    Disabled
                                </button>
                            </div>
                        </div>
                        
                        <div className="bg-[#261E19] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Specifications</p>
                            <div className="space-y-2 font-mono text-[9px] text-white/40">
                                <div className="flex justify-between">
                                    <span>Background:</span>
                                    <code className="text-[#E3E3FD]">bg-white</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Text:</span>
                                    <code className="text-[#E3E3FD]">text-black</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Hover:</span>
                                    <code className="text-[#E3E3FD]">hover:bg-[#E3E3FD]</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Padding:</span>
                                    <code className="text-[#E3E3FD]">px-5 py-2.5</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Radius:</span>
                                    <code className="text-[#E3E3FD]">rounded-sm</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Button */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Secondary Button</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl">
                        <div className="flex flex-wrap items-center gap-4">
                            <button className="bg-[#E3E3FD] text-[#261E19] px-4 py-2 font-mono font-semibold text-[10px] uppercase tracking-widest hover:bg-white transition-colors rounded-sm">
                                Create New
                            </button>
                            <button className="bg-[#E3E3FD] text-[#261E19] px-4 py-2 font-mono font-semibold text-[10px] uppercase tracking-widest bg-white rounded-sm cursor-default">
                                Hover State
                            </button>
                        </div>
                    </div>
                </div>

                {/* Email Input */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Email Input</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl">
                        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center max-w-md">
                            <div className="relative flex flex-1 items-center bg-[#1A1614] border border-white/10 px-5 py-4 rounded-lg hover:border-white/20 transition-colors">
                                <Scan size={18} className="text-white/40 mr-3 shrink-0" />
                                <input 
                                    type="email" 
                                    placeholder="studio@agency.com" 
                                    className="flex-1 bg-transparent text-white pr-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#E3E3FD] focus:ring-offset-2 focus:ring-offset-[#261E19] placeholder:text-white/30 tracking-wider"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                            <button className="bg-white text-black px-8 py-4 font-mono font-semibold text-[11px] tracking-[0.1em] hover:bg-[#E3E3FD] transition-colors whitespace-nowrap uppercase rounded-lg flex items-center gap-2 justify-center">
                                Request Access
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Property Control (Inspector) */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Property Control</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <div className="space-y-3 max-w-sm">
                            <div className="group p-3 border border-white/10 rounded-md bg-[#2E2824] hover:border-white/20 transition-colors relative">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">X (%)</span>
                                    <button className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors">
                                        <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">LOCKED</span>
                                        <Lock size={12} className="text-[#E3E3FD]" />
                                    </button>
                                </div>
                                <input 
                                    type="number"
                                    value="50" 
                                    className="w-full bg-[#3A3430] text-white font-montreal text-sm px-2 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#E3E3FD]"
                                    disabled
                                />
                            </div>
                            <div className="group p-3 border border-white/10 rounded-md bg-[#2E2824] hover:border-white/20 transition-colors relative">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Content</span>
                                    <button className="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors">
                                        <span className="font-mono text-[8px] text-[#E3E3FD] uppercase tracking-widest">INPUT</span>
                                        <Edit3 size={12} className="text-[#E3E3FD]" />
                                    </button>
                                </div>
                                <input 
                                    type="text"
                                    value="Sample Headline" 
                                    className="w-full bg-[#3A3430] text-white font-montreal text-sm px-2 py-1.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#E3E3FD]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* 03. System Nodes (Visual Storytelling) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="System Nodes" number="03" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-6">
                    Floating nodes represent the system architecture visually. Like cells in an organism or nodes in an ant colony—each connected, each purposeful. Used for illustration and storytelling only, never in production UI.
                </p>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg mb-8">
                    <p className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-2">Neural Network Architecture</p>
                    <p className="font-montreal text-sm text-white/60 leading-relaxed">
                        Nodes feel like a distributed organism where every part is aware of the others. Modular components snap together like living cells. Connection lines pulse with data flow like neural pathways.
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Cellular</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Connected</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Distributed</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Purpose & Philosophy */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Purpose & Philosophy</span>
                         <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">Visual Storytelling</p>
                            <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                Nodes illustrate the system architecture: Studio → Core → Output. They show data flow, connections, and the organic nature of the system.
                            </p>
                    </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">Aesthetic Hybrid</p>
                            <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                Cellular/ant colony (organic, connected) × Boston Robotics (technical, precise). The nodes embody this unique visual identity.
                            </p>
                        </div>
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="font-mono text-xs text-red-400 uppercase tracking-widest mb-2">Usage Restriction</p>
                            <p className="font-montreal text-sm text-white/70 leading-relaxed">
                                <strong>Marketing/Landing only.</strong> Never use in Studio, Builder, or Runner. They are illustration, not functional UI.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Node Structure */}
              <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Node Structure</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        {/* Visual Example */}
                        <div className="bg-[#261E19] border border-white/10 p-6 rounded-lg mb-6 relative" style={{ minHeight: '200px' }}>
                            <div className="absolute top-6 left-6 bg-[#1A1614]/90 border border-white/10 p-3 md:p-4 w-48 shadow-2xl backdrop-blur-xl rounded-2xl">
                                <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Design_Studio</span>
                                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full shadow-[0_0_8px_#E3E3FD]"></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-white/60">
                                        <div className="w-3 h-3 bg-white/20 rounded"></div>
                                        <span className="font-mono text-[9px]">ASSETS_LOADED</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60">
                                        <div className="w-3 h-3 bg-[#E3E3FD]/20 rounded"></div>
                                        <span className="font-mono text-[9px] text-[#E3E3FD]">RULES_LOCKED</span>
                                    </div>
                                </div>
                                {/* Ports */}
                                <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full"></div>
                                <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full"></div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Container</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block">bg-[#1A1614]/90 border border-white/10 rounded-2xl backdrop-blur-xl</code>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Header</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block">Title (mono, uppercase) + Status dot (lavender, pulsing)</code>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Content</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block">Icon + Label pairs (system status indicators)</code>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Ports</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block">Circular connection points (left/right, hover: lavender)</code>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connection Lines */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Connection Lines</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Organic Bezier Curves</p>
                        
                        <div className="space-y-4 mb-6">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Base Path</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">White, strokeOpacity 0.2, strokeWidth 0.05</code>
                                <p className="font-montreal text-sm text-white/60">Static connection line (always visible)</p>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Pulse Path</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">Lavender (#E3E3FD), animated pathLength</code>
                                <p className="font-montreal text-sm text-white/60">Animated pulse showing data flow (4s duration, infinite loop)</p>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                            <p className="font-mono text-[9px] text-white/40 mb-2">Animation Pattern</p>
                            <div className="space-y-2 font-mono text-[9px] text-white/40">
                                <div>pathLength: [0, 0.4, 0] (grows then shrinks)</div>
                                <div>pathOffset: [0, 1, 1] (moves along path)</div>
                                <div>opacity: [0, 1, 0] (fades in/out)</div>
                                <div className="text-[#E3E3FD] mt-2">Duration: 4s, ease: easeInOut, infinite</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Animation */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Floating Animation</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Subtle Vertical Float</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Animation</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">y: [0, -4, 0]</code>
                                <p className="font-montreal text-sm text-white/60">Moves up 4px, returns to start</p>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Timing</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">Duration: 6s, ease: easeInOut, infinite</code>
                                <p className="font-montreal text-sm text-white/60">Slow, organic breathing motion</p>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Disabled on Drag</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">isDragging ? {} : animate</code>
                                <p className="font-montreal text-sm text-white/60">Animation pauses when user drags node</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Draggable Behavior */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Draggable Behavior</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Interactive Positioning</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Cursor States</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block">cursor-grab (idle) → cursor-grabbing (active)</code>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Position Storage</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block">Percentage-based (x%, y%) for responsive scaling</code>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-2">Boundary Constraints</p>
                                <code className="font-mono text-[10px] text-[#E3E3FD] block">Nodes constrained to container bounds</code>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-[9px] text-white/40 mb-2">Note</p>
                            <p className="font-montreal text-sm text-white/60">
                                Dragging is for engagement on landing page only. In production UI, nodes would be static or non-interactive.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Node Types */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Node Types</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { 
                                name: 'Design_Studio', 
                                width: 'w-28 md:w-48',
                                content: 'ASSETS_LOADED, RULES_LOCKED',
                                role: 'Input node - represents studio setup'
                            },
                            { 
                                name: 'Branded_Objects', 
                                width: 'w-40 md:w-64',
                                content: 'Core processing node with visual element',
                                role: 'Core node - system processing'
                            },
                            { 
                                name: 'Client_Output', 
                                width: 'w-28 md:w-48',
                                content: 'RENDER_COMPLETE, INSTANT_DELIVERY',
                                role: 'Output node - final delivery'
                            }
                        ].map((node, i) => (
                            <div key={i} className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">{node.name}</p>
                                <div className="space-y-2 mb-4">
                                    <div className="p-3 bg-[#261E19] border border-white/10 rounded-lg">
                                        <p className="font-mono text-[9px] text-white/60 mb-1">Width</p>
                                        <code className="font-mono text-[9px] text-[#E3E3FD]">{node.width}</code>
                                    </div>
                                    <div className="p-3 bg-[#261E19] border border-white/10 rounded-lg">
                                        <p className="font-mono text-[9px] text-white/60 mb-1">Content</p>
                                        <p className="font-montreal text-xs text-white/60">{node.content}</p>
                                    </div>
                                </div>
                                <p className="font-mono text-[9px] text-white/30">{node.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Identity */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Visual Identity</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">Cellular / Ant Colony</p>
                            <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                Nodes represent individual cells or colony members—each connected, each part of a larger organism. The connections show communication and data flow.
                            </p>
                        </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">Boston Robotics</p>
                            <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                Technical precision, mechanical beauty. The nodes are precise, measured, but still feel organic—like Spot the robot: technical but alive.
                            </p>
                        </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">System Architecture</p>
                            <p className="font-montreal text-sm text-white/60 leading-relaxed">
                                The three-node system (Studio → Core → Output) visually represents the product flow. It's not decoration—it's a diagram of how the system works.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive Node Example */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Interactive Example</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl relative" style={{ minHeight: '400px' }}>
                        <div ref={containerRef} className="relative w-full h-full" style={{ minHeight: '350px' }}>
                            {/* Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{zIndex: 10}}>
        <motion.path
                                    d={`M ${nodePositions.studio.x} ${nodePositions.studio.y} 
                                        C ${(nodePositions.studio.x + nodePositions.core.x) / 2} ${nodePositions.studio.y} 
                                          ${(nodePositions.studio.x + nodePositions.core.x) / 2} ${nodePositions.core.y} 
                                          ${nodePositions.core.x} ${nodePositions.core.y}`}
            fill="none"
                                    stroke="white"
                                    strokeWidth="0.05"
                                    strokeOpacity="0.2"
                                    vectorEffect="non-scaling-stroke"
                                />
                                <motion.path
                                    d={`M ${nodePositions.core.x} ${nodePositions.core.y} 
                                        C ${(nodePositions.core.x + nodePositions.output.x) / 2} ${nodePositions.core.y} 
                                          ${(nodePositions.core.x + nodePositions.output.x) / 2} ${nodePositions.output.y} 
                                          ${nodePositions.output.x} ${nodePositions.output.y}`}
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="0.05"
                                    strokeOpacity="0.2"
                                    vectorEffect="non-scaling-stroke"
                                />
                                <motion.path
                                    d={`M ${nodePositions.studio.x} ${nodePositions.studio.y} 
                                        C ${(nodePositions.studio.x + nodePositions.core.x) / 2} ${nodePositions.studio.y} 
                                          ${(nodePositions.studio.x + nodePositions.core.x) / 2} ${nodePositions.core.y} 
                                          ${nodePositions.core.x} ${nodePositions.core.y}`}
                                    fill="none"
                                    stroke="#E3E3FD"
                                    strokeWidth="0.15"
                                    vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ 
                                        pathLength: [0, 0.4, 0],
                pathOffset: [0, 1, 1],
                opacity: [0, 1, 0]
            }}
            transition={{ 
                                        duration: 4, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 0.5
            }}
        />
    </svg>

                            {/* Node 1: Studio */}
                            <motion.div
                                className="absolute z-20 cursor-grab active:cursor-grabbing"
                                style={{ 
                                    left: `${nodePositions.studio.x}%`, 
                                    top: `${nodePositions.studio.y}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                                animate={draggingNode !== 'studio' ? { y: [0, -4, 0] } : {}}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                onPointerDown={(e) => {
                                    setDraggingNode('studio');
                                    const container = containerRef.current;
                                    if (!container) return;
                                    const { width, height, left, top } = container.getBoundingClientRect();
                                    const nodeX = (nodePositions.studio.x / 100) * width;
                                    const nodeY = (nodePositions.studio.y / 100) * height;
                                    const offsetX = (e.clientX - left) - nodeX;
                                    const offsetY = (e.clientY - top) - nodeY;

                                    const onMove = (moveEvent) => {
                                        const newMouseX = moveEvent.clientX - left;
                                        const newMouseY = moveEvent.clientY - top;
                                        let newNodeX = newMouseX - offsetX;
                                        let newNodeY = newMouseY - offsetY;
                                        newNodeX = Math.max(0, Math.min(width, newNodeX));
                                        newNodeY = Math.max(0, Math.min(height, newNodeY));
                                        setNodePositions(prev => ({
                                            ...prev,
                                            studio: {
                                                x: (newNodeX / width) * 100,
                                                y: (newNodeY / height) * 100
                                            }
                                        }));
                                    };

                                    const onUp = () => {
                                        setDraggingNode(null);
                                        window.removeEventListener('pointermove', onMove);
                                        window.removeEventListener('pointerup', onUp);
                                    };

                                    window.addEventListener('pointermove', onMove);
                                    window.addEventListener('pointerup', onUp);
                                }}
                            >
                                <div className="bg-[#1A1614]/90 border border-white/10 p-3 md:p-4 w-32 md:w-48 shadow-2xl backdrop-blur-xl group hover:border-[#E3E3FD]/50 transition-colors duration-500 relative rounded-2xl">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Design_Studio</span>
                                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full shadow-[0_0_8px_#E3E3FD]"></div>
        </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <Database size={12} />
                                            <span className="font-mono text-[9px]">ASSETS_LOADED</span>
        </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <Lock size={12} className="text-[#E3E3FD]"/>
                                            <span className="font-mono text-[9px] text-[#E3E3FD]">RULES_LOCKED</span>
    </div>
                                    </div>
                                    <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
                                    <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
                                </div>
                            </motion.div>

                            {/* Node 2: Core */}
                            <motion.div
                                className="absolute z-20 cursor-grab active:cursor-grabbing"
                                style={{ 
                                    left: `${nodePositions.core.x}%`, 
                                    top: `${nodePositions.core.y}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                                animate={draggingNode !== 'core' ? { y: [0, -4, 0] } : {}}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                onPointerDown={(e) => {
                                    setDraggingNode('core');
                                    const container = containerRef.current;
                                    if (!container) return;
                                    const { width, height, left, top } = container.getBoundingClientRect();
                                    const nodeX = (nodePositions.core.x / 100) * width;
                                    const nodeY = (nodePositions.core.y / 100) * height;
                                    const offsetX = (e.clientX - left) - nodeX;
                                    const offsetY = (e.clientY - top) - nodeY;

                                    const onMove = (moveEvent) => {
                                        const newMouseX = moveEvent.clientX - left;
                                        const newMouseY = moveEvent.clientY - top;
                                        let newNodeX = newMouseX - offsetX;
                                        let newNodeY = newMouseY - offsetY;
                                        newNodeX = Math.max(0, Math.min(width, newNodeX));
                                        newNodeY = Math.max(0, Math.min(height, newNodeY));
                                        setNodePositions(prev => ({
                                            ...prev,
                                            core: {
                                                x: (newNodeX / width) * 100,
                                                y: (newNodeY / height) * 100
                                            }
                                        }));
                                    };

                                    const onUp = () => {
                                        setDraggingNode(null);
                                        window.removeEventListener('pointermove', onMove);
                                        window.removeEventListener('pointerup', onUp);
                                    };

                                    window.addEventListener('pointermove', onMove);
                                    window.addEventListener('pointerup', onUp);
                                }}
                            >
                                <div className="bg-[#1A1614]/90 border border-white/10 p-3 md:p-4 w-40 md:w-64 shadow-2xl backdrop-blur-xl group hover:border-[#E3E3FD]/50 transition-colors duration-500 relative rounded-2xl">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Branded_Objects</span>
                                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full shadow-[0_0_8px_#E3E3FD]"></div>
                                    </div>
                                    <div className="h-20 md:h-32 w-full relative flex items-center justify-center overflow-hidden bg-[#261E19] border border-white/10 mb-2 rounded-lg">
                                        <div className="flex gap-0.5">
                                            {[1,2,3,4,5].map(i => (
                                                <div key={i} className="w-0.5 h-4 bg-[#E3E3FD] rounded-full" style={{opacity: 0.2 + (i*0.15)}}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="font-mono text-[8px] text-white/40">GENERATING_ASSET_ID_8492</span>
                                    <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
                                    <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
                                </div>
                            </motion.div>

                            {/* Node 3: Output */}
             <motion.div 
                                className="absolute z-20 cursor-grab active:cursor-grabbing"
                style={{ 
                                    left: `${nodePositions.output.x}%`, 
                                    top: `${nodePositions.output.y}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                                animate={draggingNode !== 'output' ? { y: [0, -4, 0] } : {}}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                onPointerDown={(e) => {
                                    setDraggingNode('output');
                                    const container = containerRef.current;
                                    if (!container) return;
                                    const { width, height, left, top } = container.getBoundingClientRect();
                                    const nodeX = (nodePositions.output.x / 100) * width;
                                    const nodeY = (nodePositions.output.y / 100) * height;
                                    const offsetX = (e.clientX - left) - nodeX;
                                    const offsetY = (e.clientY - top) - nodeY;

                                    const onMove = (moveEvent) => {
                                        const newMouseX = moveEvent.clientX - left;
                                        const newMouseY = moveEvent.clientY - top;
                                        let newNodeX = newMouseX - offsetX;
                                        let newNodeY = newMouseY - offsetY;
                                        newNodeX = Math.max(0, Math.min(width, newNodeX));
                                        newNodeY = Math.max(0, Math.min(height, newNodeY));
                                        setNodePositions(prev => ({
                                            ...prev,
                                            output: {
                                                x: (newNodeX / width) * 100,
                                                y: (newNodeY / height) * 100
                                            }
                                        }));
                                    };

                                    const onUp = () => {
                                        setDraggingNode(null);
                                        window.removeEventListener('pointermove', onMove);
                                        window.removeEventListener('pointerup', onUp);
                                    };

                                    window.addEventListener('pointermove', onMove);
                                    window.addEventListener('pointerup', onUp);
                                }}
                            >
                                <div className="bg-[#1A1614]/90 border border-white/10 p-3 md:p-4 w-32 md:w-48 shadow-2xl backdrop-blur-xl group hover:border-[#E3E3FD]/50 transition-colors duration-500 relative rounded-2xl">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Client_Output</span>
                                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full shadow-[0_0_8px_#E3E3FD]"></div>
                            </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <Layout size={12} />
                                            <span className="font-mono text-[9px]">RENDER_COMPLETE</span>
                                </div>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <Zap size={12} className="text-[#E3E3FD]"/>
                                            <span className="font-mono text-[9px]">INSTANT_DELIVERY</span>
                            </div>
                        </div>
                                    <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
                                    <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1614] border border-white/20 rounded-full group-hover:border-[#E3E3FD] transition-colors" />
                            </div>
                            </motion.div>
                            </div>
                        <p className="font-mono text-[9px] text-white/30 mt-4 text-center">Drag nodes to reposition. Connections update automatically.</p>
                        </div>
                </div>

                {/* Node Variations */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Node Variations</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Minimal Node */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Minimal Node</p>
                            <div className="bg-[#261E19] border border-white/10 p-4 rounded-lg relative" style={{ minHeight: '120px' }}>
                                <div className="absolute top-4 left-4 bg-[#1A1614]/90 border border-white/10 px-4 py-2 shadow-xl backdrop-blur-md rounded-2xl">
                                    <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Output</span>
                            </div>
                         </div>
                            <p className="font-mono text-[9px] text-white/30 mt-4">Simplified version for final outputs</p>
                        </div>

                        {/* Full Node */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Full Node</p>
                            <div className="bg-[#261E19] border border-white/10 p-4 rounded-lg relative" style={{ minHeight: '120px' }}>
                                <div className="absolute top-4 left-4 bg-[#1A1614]/90 border border-white/10 p-3 w-40 shadow-2xl backdrop-blur-xl rounded-2xl">
                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                                        <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">Design_Studio</span>
                                        <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>
                            </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <div className="w-2 h-2 bg-white/20 rounded"></div>
                                            <span className="font-mono text-[8px]">ASSETS_LOADED</span>
                            </div>
                        </div>
                </div>
                            </div>
                            <p className="font-mono text-[9px] text-white/30 mt-4">Full version with status indicators</p>
                        </div>
                    </div>
                </div>

            </div>
      </section>

        {/* 04. System States & Feedback */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="System States & Feedback" number="04" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    The feedback layer. This is where "premium" vs "hacky" is felt. Every state must be intentional, clear, and consistent.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Loading</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Empty</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Error</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Success</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Loading States */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Loading States</span>
                         <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Skeleton Card */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Skeleton Screen (Card)</p>
                            <div className="bg-[#261E19] border border-white/10 p-6 rounded-lg space-y-4">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse"></div>
                    </div>
                        </div>
                            <p className="font-mono text-[9px] text-white/30 mt-4">Used for: Tool list, card grids</p>
                        </div>

                        {/* Inline Loader */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Inline Loader (Button)</p>
                            <div className="bg-[#261E19] border border-white/10 p-6 rounded-lg">
                                <button className="bg-white text-black px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest rounded-sm opacity-50 cursor-not-allowed flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                    Rendering...
                                </button>
                        </div>
                            <p className="font-mono text-[9px] text-white/30 mt-4">Used for: Export, save, async actions</p>
                        </div>
                    </div>
                </div>

                {/* Empty States */}
              <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Empty States</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* No Tools - Dashed Border */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">No Tools Yet (Dashed)</p>
                            <div className="border border-dashed border-white/10 p-8 md:p-10 hover:border-[#E3E3FD]/30 hover:bg-[#E3E3FD]/5 transition-colors flex flex-col items-center justify-center gap-4 text-center cursor-pointer min-h-[280px] rounded-3xl group">
                                <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#E3E3FD] group-hover:border-[#E3E3FD]/50 transition-colors rounded-2xl">
                                    <Plus size={24} />
                    </div>
                                <span className="font-mono text-[10px] text-white/40 group-hover:text-[#E3E3FD] uppercase tracking-widest transition-colors">
                                    INITIALIZE_NEW_TOOL
                                </span>
                </div>
            </div>

                        {/* No Selection */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">No Layer Selected</p>
                            <div className="bg-[#261E19] border border-white/10 p-8 rounded-lg text-center">
                                <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2">No Layer Selected</p>
                                <p className="font-montreal text-xs text-white/40">Select a layer to configure properties</p>
                            </div>
                        </div>
                    </div>

                    {/* No Inputs Available */}
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">No Inputs Available</p>
                        <div className="p-8 border border-dashed border-white/10 rounded-xl text-center">
                            <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                                No inputs available. <br/> This tool is strictly locked.
                            </p>
                        </div>
                    </div>
            </div>
            
                {/* Error States */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Error States</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Validation Error */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Validation Error</p>
                            <div className="bg-[#261E19] border border-red-500/20 p-4 rounded-lg">
                                <p className="font-mono text-[9px] text-red-400 mb-1">TEXT_TOO_LONG</p>
                                <p className="font-montreal text-xs text-white/60">Maximum 200 characters allowed</p>
                    </div>
                </div>

                        {/* System Error */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">System Error</p>
                            <div className="bg-[#261E19] border border-red-500/20 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    <p className="font-mono text-[9px] text-red-400 uppercase">Export Failed</p>
                        </div>
                                <p className="font-montreal text-xs text-white/60">Unable to generate image. Please try again.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success States */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Success States</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tool Published */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Tool Published</p>
                            <div className="bg-[#261E19] border border-[#E3E3FD]/20 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>
                                    <p className="font-mono text-[9px] text-[#E3E3FD] uppercase">Live</p>
                        </div>
                                <p className="font-montreal text-xs text-white/70">Tool is now live and accessible to clients</p>
                            </div>
                            </div>

                        {/* Export Complete */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Export Complete</p>
                            <div className="bg-[#261E19] border border-[#E3E3FD]/20 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>
                                    <p className="font-mono text-[9px] text-[#E3E3FD] uppercase">Download Complete</p>
                        </div>
                                <p className="font-montreal text-xs text-white/70">High-res PNG exported successfully</p>
                    </div>
                </div>
                    </div>
                </div>

            </div>
        </section>

        {/* 05. Motion & Interaction Principles */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Motion & Interaction" number="05" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Formalized motion rules. Prevents random animations. Ensures consistent feel across all surfaces.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Timing</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Easing</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Transitions</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Timing Rules */}
                            <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Timing Rules</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        {[
                            { type: 'Hover', duration: '300ms', usage: 'Color changes, border glows' },
                            { type: 'Structural', duration: '500-800ms', usage: 'Page transitions, section reveals' },
                            { type: 'Blocking', duration: '200-400ms', usage: 'Modal opens, dropdowns' },
                            { type: 'Floating', duration: '6s (loop)', usage: 'Subtle node animations' }
                        ].map((rule, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg">
                                <div>
                                    <p className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">{rule.type}</p>
                                    <p className="font-mono text-[9px] text-white/30 mt-1">{rule.usage}</p>
                                </div>
                                <code className="font-mono text-[10px] text-[#E3E3FD]">{rule.duration}</code>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Easing Rules */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Easing Rules</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Allowed Easing</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">ease-in-out</code>
                                <p className="font-montreal text-sm text-white/60">Default for most transitions</p>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">ease-out</code>
                                <p className="font-montreal text-sm text-white/60">For entrances, reveals</p>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <code className="font-mono text-[10px] text-[#E3E3FD] block mb-2">linear</code>
                                <p className="font-montreal text-sm text-white/60">For progress bars, loading indicators</p>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="font-mono text-[9px] text-red-400 uppercase tracking-widest mb-2">Forbidden</p>
                            <p className="font-montreal text-sm text-white/60">No spring animations. No bounce. No elastic.</p>
                        </div>
                    </div>
                </div>

                {/* Allowed Transitions */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Allowed Transitions</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-3">
                        {[
                            'Colors (background, border, text)',
                            'Opacity (fade in/out)',
                            'Transform (translate, scale)',
                            'Border width (underline animations)',
                            'Filter (blur for entrances)'
                        ].map((transition, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full"></div>
                                <p className="font-montreal text-sm text-white/70">{transition}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Forbidden Motion */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Forbidden Motion Patterns</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-red-500/20 p-6 rounded-2xl space-y-3">
                        {[
                            'Animation tied to cursor position',
                            'Spring/bounce/elastic easing',
                            'Random motion (use consistent patterns)',
                            'Motion without purpose (decorative only)',
                            'Animations faster than 200ms',
                            'Staggered animations without delay pattern'
                        ].map((pattern, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                <p className="font-montreal text-sm text-white/70">{pattern}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>

        {/* 06. Role-Based UI Rules */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Role Separation" number="06" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-6">
                    Critical for Branded Objects. Studio UI is dense and technical—mission control for brand governance. Client UI is simple and constrained—safe inputs only.
                </p>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg mb-8">
                    <p className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest mb-2">Technical Density</p>
                    <p className="font-montreal text-sm text-white/60 leading-relaxed">
                        Studio UI feels like mission control software for an alien megastructure. Dense information hierarchy, monospace system labels, lock states, latency readouts. No wasted space, no hand-holding, pure function.
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Studio</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Client</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Studio UI Principles */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Studio UI Principles</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        {[
                            { principle: 'Dense', description: 'More information per pixel. Tighter spacing. Like mission control software—every surface serves exact technical function.' },
                            { principle: 'Technical', description: 'System labels, lock icons, layer names, latency readouts. Monospace for all system text. Feels like alien engineering interface.' },
                            { principle: 'Explicit', description: 'Show all controls, all states, all options. No hidden functionality. Engineers of brand governance need full visibility.' },
                            { principle: 'Functional', description: 'Zero decoration. Every element has purpose. Grown rather than manufactured—optimized to the extreme.' }
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">{item.principle}</p>
                                <p className="font-montreal text-sm text-white/60">{item.description}</p>
                        </div>
                        ))}
                        </div>
                    </div>

                {/* Client UI Principles */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Client UI Principles</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        {[
                            { principle: 'Simple', description: 'Minimal interface. Only safe inputs visible. Like a simplified control panel—only what\'s needed, nothing more.' },
                            { principle: 'Constrained', description: 'Cannot break layout. Cannot access locked properties. The system enforces brand rules—technically impossible to violate constraints.' },
                            { principle: 'Non-Technical', description: 'No system labels, no lock icons, no layer names. Human-friendly labels only. Studio complexity hidden completely.' },
                            { principle: 'Focused', description: 'One task: input authorized content, export asset. Single-purpose interface. No distractions, no options, just function.' }
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">{item.principle}</p>
                                <p className="font-montreal text-sm text-white/60">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Forbidden in Client View */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Forbidden in Client View</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-red-500/20 p-6 rounded-2xl space-y-3">
                        {[
                            'Layer names (e.g., "TEXT_LAYER_01")',
                            'Lock icons (Lock, Eye, Edit3)',
                            'System labels (e.g., "LOCKED", "READ_ONLY")',
                            'Technical metadata (z-index, coordinates)',
                            'Draggable UI elements',
                            'Layer stack / inspector panels',
                            'Property control lock states'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                <p className="font-montreal text-sm text-white/70">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Simplification Rules */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Tool Runner Simplification</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Client View Transformations</p>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="font-mono text-[9px] text-white/40 mb-2">Studio</p>
                                    <p className="font-mono text-xs text-white/60">TEXT_LAYER_01</p>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="font-mono text-[9px] text-white/40 mb-2">Client</p>
                                    <p className="font-montreal text-sm text-white/70">Headline</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="font-mono text-[9px] text-white/40 mb-2">Studio</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 border border-[#E3E3FD]/50 rounded"></div>
                                        <span className="font-mono text-[9px] text-white/40">LOCKED</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <p className="font-mono text-[9px] text-white/40 mb-2">Client</p>
                                    <p className="font-montreal text-sm text-white/70">(Hidden / Not editable)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* 07. Surface-Specific Themes */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Surface Variants" number="07" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Marketing surfaces are more expressive. Product surfaces are dense and functional. Never blur the two.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Marketing</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Product</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Marketing Surfaces */}
                        <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Marketing Surfaces</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Landing Page, Waitlist</p>
                        {[
                            { rule: 'More Expressive', description: 'Larger typography, more breathing room, subtle decorative elements.' },
                            { rule: 'More Spacing', description: 'py-32 sections, p-10 cards, gap-6 grids.' },
                            { rule: 'Less Density', description: 'Fewer elements per view. Focus on clarity.' },
                            { rule: 'Visual Interest', description: 'Floating nodes (illustration only), subtle animations.' }
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">{item.rule}</p>
                                <p className="font-montreal text-sm text-white/60">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Surfaces */}
                        <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Product Surfaces</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Studio, Tool Builder, Runner</p>
                        {[
                            { rule: 'Dense', description: 'More information per pixel. Tighter spacing (p-6, gap-4).' },
                            { rule: 'Zero Decoration', description: 'No decorative elements. Every pixel is functional.' },
                            { rule: 'Functional Color', description: 'Lavender only for status/active states. No decorative use.' },
                            { rule: 'Information First', description: 'Prioritize clarity and speed over visual interest.' }
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <p className="font-mono text-xs text-white/70 uppercase tracking-widest mb-2">{item.rule}</p>
                                <p className="font-montreal text-sm text-white/60">{item.description}</p>
                    </div>
                        ))}
                </div>
                </div>

            </div>
        </section>

        {/* 08. Accessibility & Contrast Rules */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Accessibility Baselines" number="08" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Lightweight guardrails. Not WCAG theatre, but essential protection for larger studios and organizations.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Contrast</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Focus</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Text Size</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Contrast Ratios */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Minimum Contrast Ratios</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        {[
                            { element: 'Primary Text', ratio: '4.5:1', example: 'text-white on #261E19' },
                            { element: 'Secondary Text', ratio: '3:1', example: 'text-white/70 on #261E19' },
                            { element: 'Interactive Elements', ratio: '3:1', example: 'Buttons, links, inputs' },
                            { element: 'Lavender Signal', ratio: '3:1', example: 'text-[#E3E3FD] on #261E19' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg">
                                <div>
                                    <p className="font-mono text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">{item.element}</p>
                                    <p className="font-mono text-[9px] text-white/30 mt-1">{item.example}</p>
                                </div>
                                <code className="font-mono text-[10px] text-[#E3E3FD]">{item.ratio}</code>
                            </div>
                        ))}
                    </div>
                    </div>
                    
                {/* Focus Rings */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Focus Ring Requirements</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                        <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">Keyboard Navigation</p>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <button className="bg-white text-black px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest rounded-sm focus:outline-none focus:ring-2 focus:ring-[#E3E3FD] focus:ring-offset-2 focus:ring-offset-[#261E19]">
                                    Button with Focus Ring
                                </button>
                                <code className="font-mono text-[9px] text-white/40 block mt-2">focus:ring-2 focus:ring-[#E3E3FD]</code>
                        </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                <input 
                                    type="text" 
                                    placeholder="Input with focus ring"
                                    className="w-full bg-[#261E19] border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3E3FD] focus:ring-offset-2 focus:ring-offset-[#261E19]"
                                />
                            </div>
                        </div>
                        <p className="font-mono text-[9px] text-white/30 mt-4">All interactive elements must have visible focus states</p>
                    </div>
                </div>

                {/* Text Size Minimums */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Text Size Minimums</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl space-y-4">
                        {[
                            { size: 'Body Text', minimum: '14px (text-sm)', usage: 'All readable content' },
                            { size: 'Labels', minimum: '9px (text-[9px])', usage: 'System labels, badges' },
                            { size: 'Captions', minimum: '8px (text-[8px])', usage: 'Metadata only, not primary content' },
                            { size: 'Forbidden', minimum: '< 8px', usage: 'Never use text smaller than 8px' }
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center justify-between py-3 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg ${i === 3 ? 'bg-red-500/5 border-red-500/20' : ''}`}>
                                <div>
                                    <p className={`font-mono text-xs uppercase tracking-wider ${i === 3 ? 'text-red-400' : 'text-white/70 group-hover:text-white'} transition-colors`}>{item.size}</p>
                                    <p className="font-mono text-[9px] text-white/30 mt-1">{item.usage}</p>
                                </div>
                                <code className={`font-mono text-[10px] ${i === 3 ? 'text-red-400' : 'text-[#E3E3FD]'}`}>{item.minimum}</code>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>

        {/* 09. Deprecation & Forbidden Patterns */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Forbidden Patterns" number="09" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Expanded anti-patterns. These lock the system harder and prevent visual drift.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-red-500/20 border-red-500/30 text-red-400">Forbidden</Badge>
                </div>
            </div>
            
            <div className="md:col-span-8 space-y-24">
                
                {/* Visual Forbidden */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Visual Forbidden Patterns</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                    
                    <div className="bg-[#1A1614] border border-red-500/20 p-6 rounded-2xl space-y-3">
                        {[
                            'Full opacity white borders (border-white)',
                            'Sharp corners (rounded-none)',
                            'Lavender backgrounds (signal color only)',
                            'Gradients as primary surfaces',
                            'Text smaller than 8px',
                            'Spacing not a multiple of 4px',
                            'More than 3 font sizes in one component',
                            'Background patterns above opacity-[0.05]'
                        ].map((pattern, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                <p className="font-montreal text-sm text-white/70">{pattern}</p>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Interaction Forbidden */}
                        <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Interaction Forbidden Patterns</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                            </div>
                    
                    <div className="bg-[#1A1614] border border-red-500/20 p-6 rounded-2xl space-y-3">
                        {[
                            'Icon-only buttons without labels (except toolbars)',
                            'Draggable UI in client view',
                            'Animation tied to cursor position',
                            'Spring/bounce/elastic easing',
                            'Animations faster than 200ms',
                            'Interactive elements without hover states',
                            'Modals without backdrop blur',
                            'Forms without validation feedback'
                        ].map((pattern, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                <p className="font-montreal text-sm text-white/70">{pattern}</p>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Component Forbidden */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase">Component Forbidden Patterns</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    
                    <div className="bg-[#1A1614] border border-red-500/20 p-6 rounded-2xl space-y-3">
                        {[
                            'Layer names in client view',
                            'Lock icons in client view',
                            'System labels in client view',
                            'Technical metadata in client view',
                            'Draggable nodes in production UI',
                            'Floating nodes as interactive elements'
                        ].map((pattern, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                <p className="font-montreal text-sm text-white/70">{pattern}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>

      </div>
      
      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#261E19] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                <div className="col-span-1 md:col-span-5">
                    <h3 className="font-mono text-lg tracking-widest text-white mb-6 uppercase">[ BO ]</h3>
                    <p className="font-montreal text-white/60 text-sm max-w-md leading-relaxed mb-8">
                        A modular design system for automated brand governance. Empowering studios to create custom tools for their clients.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#E3E3FD] rounded-full animate-pulse"></div>
                        <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">All Systems Operational</span>
                    </div>
                </div>
                
                <div className="col-span-1 md:col-span-3 md:col-start-8 space-y-6">
                     <h4 className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Platform</h4>
                     <ul className="space-y-3 font-mono text-xs text-white/60">
                        {/* Links removed */}
                    </ul>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-6">
                    <h4 className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Connect</h4>
                    <div className="flex flex-col gap-3">
                        <a href="https://www.linkedin.com/company/108913089/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                            <span className="font-mono text-xs text-[#E3E3FD] group-hover:text-white transition-colors">[ LINKEDIN ]</span>
                        </a>
                         <a href="mailto:brandedobjects@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                            <span className="font-mono text-xs text-[#E3E3FD] group-hover:text-white transition-colors">[ EMAIL ]</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest"></span>
                <div className="flex gap-8 mt-4 md:mt-0">
                    {/* Copyright and legal links removed */}
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
}
