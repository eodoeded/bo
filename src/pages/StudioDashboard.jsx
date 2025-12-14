import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Layout } from 'lucide-react';

const mockTools = [
    { id: 'x9z-22a', name: 'Social_Story_v1', lastEdited: '2 mins ago', status: 'Live' },
    { id: 'b4b-99c', name: 'Event_Banner_Wide', lastEdited: '2 days ago', status: 'Draft' },
];

export default function StudioDashboard() {
  return (
    <div className="min-h-screen bg-[#261E19] text-white font-montreal selection:bg-[#E3E3FD] selection:text-[#261E19]">
        {/* Header */}
        <header className="h-16 bg-[#1A1614] border-b border-white/10 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
             <div className="flex items-center gap-4">
                <Link to="/" className="font-mono text-sm tracking-widest text-white/60 hover:text-white uppercase transition-colors">[ BO ]</Link>
                <div className="h-4 w-px bg-white/10"></div>
                <span className="font-mono text-[10px] text-[#E3E3FD] uppercase tracking-widest">Studio Dashboard</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-white/10 to-transparent border border-white/10"></div>
             </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="font-medium text-4xl tracking-tight mb-2">Your Tools</h1>
                    <p className="font-mono text-xs text-white/40 uppercase tracking-widest">System Overview</p>
                </div>
                <Link to="/studio/builder/new" className="bg-[#E3E3FD] text-[#261E19] px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                    <Plus size={14} />
                    Create New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTools.map(tool => (
                    <Link key={tool.id} to={`/studio/builder/${tool.id}`} className="group block bg-[#1A1614] border border-white/10 p-6 hover:border-[#E3E3FD]/50 transition-colors">
                        <div className="flex justify-between items-start mb-12">
                            <div className="p-3 bg-white/5 text-white/40 group-hover:text-[#E3E3FD] transition-colors border border-white/5">
                                <Layout size={20} />
                            </div>
                            <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 border ${tool.status === 'Live' ? 'border-[#E3E3FD]/20 bg-[#E3E3FD]/10 text-[#E3E3FD]' : 'border-white/10 bg-white/5 text-white/40'}`}>
                                {tool.status}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-medium text-xl mb-1 group-hover:text-[#E3E3FD] transition-colors">{tool.name}</h3>
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Last Edit: {tool.lastEdited}</p>
                        </div>
                    </Link>
                ))}
                
                 {/* New Tool Placeholder */}
                 <Link to="/studio/builder/new" className="group block border border-dashed border-white/10 p-6 hover:border-[#E3E3FD]/30 hover:bg-[#E3E3FD]/5 transition-colors flex flex-col items-center justify-center gap-4 text-center cursor-pointer min-h-[200px]">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#E3E3FD] group-hover:border-[#E3E3FD]/50 transition-colors">
                        <Plus size={20} />
                    </div>
                    <span className="font-mono text-[10px] text-white/40 group-hover:text-[#E3E3FD] uppercase tracking-widest transition-colors">Initialize New Tool</span>
                </Link>
            </div>
        </main>
    </div>
  );
}
