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
