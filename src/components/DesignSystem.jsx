import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import UnifiedNav from './UnifiedNav';

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
        <div className="absolute bottom-12 left-6 md:left-12 max-w-xl z-20 pointer-events-none">
            <Badge className="mb-4 text-[#E3E3FD] border-[#E3E3FD]/20 bg-[#E3E3FD]/5">Design System v2.5</Badge>
            <h1 className="font-montreal font-medium text-6xl md:text-8xl tracking-tight mb-6 text-white leading-[0.9]">
                Design<br/><span className="text-[#E3E3FD]">System</span>
            </h1>
            <p className="font-montreal text-white/60 text-lg leading-relaxed max-w-md">
                Complete documentation of the Branded Objects visual language. Every component, pattern, and rule.
            </p>
              </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto py-32 px-6 md:px-12 space-y-48 relative z-10 mt-12 md:mt-14">
        
        {/* 00. Foundation */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="Foundation" number="00" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    The core building blocks: colors, typography, spacing, and border radius. These are the atoms of the system.
                </p>
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
                                    usage: 'Interactive / Status',
                                    description: 'Lavender accent. Use sparingly for active states, hover borders, status indicators. Maximum 10% of any view.'
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
                    
                    <div className="bg-[#1A1614] border border-white/10 p-10 rounded-3xl relative group hover:bg-[#2E2824] hover:border-[#E3E3FD]/50 transition-colors">
                        {/* Icon Container */}
                        <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                            <div className="w-6 h-6 bg-white/20 rounded"></div>
                        </div>
                        
                        {/* Badge */}
                        <span className="font-mono text-xs text-[#E3E3FD] uppercase tracking-widest mb-4 block">01 // Category</span>
                        
                        {/* Title */}
                        <h3 className="font-montreal font-medium text-2xl text-white mb-4">Card Title</h3>
                        
                        {/* Description */}
                        <p className="text-white/50 font-montreal text-sm leading-relaxed">
                            Card description text. This is the standard pattern used across benefit cards, feature cards, and tool cards.
                        </p>
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
            
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Benefit Card */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Benefit Card</p>
                            <div className="bg-[#261E19] border border-white/10 p-6 rounded-lg mb-4">
                                <div className="w-12 h-12 border border-white/10 bg-white/5 rounded-2xl mb-4 flex items-center justify-center">
                                    <div className="w-5 h-5 bg-white/20 rounded"></div>
                                </div>
                                <span className="font-mono text-[9px] text-[#E3E3FD] block mb-2">01 // Category</span>
                                <h4 className="font-montreal font-medium text-xl text-white mb-2">Title</h4>
                                <p className="text-white/50 font-montreal text-xs">Description text</p>
                            </div>
                            <p className="font-mono text-[9px] text-white/30">Used in: WaitlistBenefits, feature sections</p>
                        </div>

                        {/* Tool Card */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Tool Card</p>
                            <div className="bg-[#261E19] border border-white/10 p-6 rounded-lg mb-4 relative">
                                <div className="absolute top-4 right-4">
                                    <span className="font-mono text-[8px] border border-[#E3E3FD]/20 bg-[#E3E3FD]/10 text-[#E3E3FD] px-2 py-1 rounded-lg">Live</span>
                                </div>
                                <div className="w-12 h-12 border border-white/10 bg-white/5 rounded-2xl mb-4 flex items-center justify-center">
                                    <div className="w-5 h-5 bg-white/20 rounded"></div>
                                </div>
                                <h4 className="font-montreal font-medium text-xl text-white mb-2">Tool_Name</h4>
                                <p className="font-mono text-[9px] text-white/40">Last Edit: 2 mins ago</p>
                            </div>
                            <p className="font-mono text-[9px] text-white/30">Used in: StudioDashboard</p>
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

        {/* 03. System Nodes (Visual Storytelling) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="System Nodes" number="03" />
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Floating nodes represent the system architecture visually. Like cells in an organism or nodes in an ant colony—each connected, each purposeful. Used for illustration and storytelling only, never in production UI.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-[#E3E3FD]/10 border-[#E3E3FD]/30 text-[#E3E3FD]">Illustration</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Marketing</Badge>
                    <Badge className="bg-white/10 border-white/20 text-white">Organic</Badge>
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

            </div>
        </section>

        {/* 04. System States & Feedback */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32 h-fit">
                <SectionHeader title="System States & Feedback" number="03" />
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* No Tools */}
                        <div className="bg-[#1A1614] border border-white/10 p-6 rounded-2xl">
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">No Tools Yet</p>
                            <div className="bg-[#261E19] border border-white/10 p-8 rounded-lg text-center">
                                <div className="w-12 h-12 border border-white/10 bg-white/5 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                    <div className="w-5 h-5 bg-white/20 rounded"></div>
                        </div>
                                <p className="font-montreal text-white/60 text-sm mb-2">No tools created</p>
                                <p className="font-mono text-[9px] text-white/40">Create your first tool to get started</p>
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
                <p className="font-montreal text-white/60 text-lg leading-relaxed mb-8">
                    Critical for Branded Objects. Studio UI is dense and technical. Client UI is simple and constrained. This directly supports the value prop.
                </p>
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
                            { principle: 'Dense', description: 'More information per pixel. Tighter spacing.' },
                            { principle: 'Technical', description: 'System labels, lock icons, layer names visible.' },
                            { principle: 'Explicit', description: 'Show all controls, all states, all options.' },
                            { principle: 'Functional', description: 'Zero decoration. Every element has purpose.' }
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
                            { principle: 'Simple', description: 'Only safe inputs. No technical jargon.' },
                            { principle: 'Constrained', description: 'Can only edit what studio allows.' },
                            { principle: 'Non-Technical', description: 'No layer names, lock icons, or system labels.' },
                            { principle: 'Clear', description: 'Plain language. "Change Headline" not "Edit TEXT_LAYER".' }
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
