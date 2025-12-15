import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Layout, Zap, Clock, Activity, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import UnifiedNav from '../components/UnifiedNav';

const mockTools = [
    { id: 'x9z-22a', name: 'Social_Story_v1', lastEdited: '2 mins ago', status: 'Live', icon: Layout, outputs: 1247, latency: '12ms' },
    { id: 'b4b-99c', name: 'Event_Banner_Wide', lastEdited: '2 days ago', status: 'Draft', icon: Layout, outputs: 0, latency: '—' },
];

export default function StudioDashboard() {
  return (
    <div className="min-h-screen bg-[#261E19] text-white font-montreal selection:bg-[#E3E3FD] selection:text-[#261E19] relative">
      <div className="fixed inset-0 bg-[#261E19] z-0"></div>
      <UnifiedNav />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ 
          backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
      }}></div>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-20 relative z-10">
        {/* System Status Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
          <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
          <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">SYSTEM_OS v2.5</span>
          <span className="font-mono text-[9px] text-white/20">|</span>
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">ALL_MODULES_OPERATIONAL</span>
          <span className="font-mono text-[9px] text-white/20">|</span>
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">UPTIME: 99.9%</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-[9px] text-[#E3E3FD] tracking-widest uppercase block mb-4">TOOL_REGISTRY</span>
            <h1 className="font-montreal font-medium text-4xl md:text-5xl tracking-tight mb-2 text-white leading-[0.9]">
              Studio Dashboard
            </h1>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-2">SYSTEM_OVERVIEW // ACTIVE_TOOLS: {mockTools.length} // REGISTERED_MODULES: {mockTools.length} // STATUS: OPERATIONAL</p>
          </div>
          <Link 
            to="/studio/builder/new" 
            className="mt-6 md:mt-0 bg-[#E3E3FD] text-[#261E19] px-5 py-2.5 font-mono font-semibold text-[11px] uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 rounded-lg"
          >
            <Plus size={14} />
            INITIALIZE_NEW_TOOL
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={`/studio/builder/${tool.id}`} 
                className="group block bg-[#1A1614] border border-white/10 p-8 md:p-10 hover:border-[#E3E3FD]/50 hover:bg-[#2E2824] transition-colors rounded-3xl relative"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#E3E3FD] transition-colors rounded-2xl">
                  <tool.icon size={24} className="text-white/60 group-hover:text-[#E3E3FD] transition-colors" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 border rounded-full ${
                    tool.status === 'Live' 
                      ? 'border-[#E3E3FD]/20 bg-[#E3E3FD]/10 text-[#E3E3FD]' 
                      : 'border-white/10 bg-white/5 text-white/40'
                  }`}>
                    {tool.status}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-montreal font-medium text-2xl mb-4 group-hover:text-[#E3E3FD] transition-colors">
                    {tool.name}
                  </h3>
                  
                  {/* Technical Metadata */}
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center gap-2 text-white/40">
                      <Clock size={12} className="text-white/30" />
                      <p className="font-mono text-[10px] uppercase tracking-widest">LAST_EDIT: {tool.lastEdited}</p>
                    </div>
                    {tool.status === 'Live' && (
                      <>
                        <div className="flex items-center gap-2 text-white/40">
                          <Database size={12} className="text-white/30" />
                          <p className="font-mono text-[10px] uppercase tracking-widest">OUTPUTS: {tool.outputs.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                          <Activity size={12} className="text-white/30" />
                          <p className="font-mono text-[10px] uppercase tracking-widest">LATENCY: {tool.latency}</p>
                        </div>
                      </>
                    )}
                    {tool.status === 'Draft' && (
                      <div className="flex items-center gap-2 text-white/20">
                        <Cpu size={12} className="text-white/20" />
                        <p className="font-mono text-[10px] uppercase tracking-widest">STATUS: DRAFT // NOT_DEPLOYED</p>
                      </div>
                    )}
                  </div>

                  {/* Tool ID */}
                  <div className="pt-3 border-t border-white/5">
                    <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">TOOL_ID: {tool.id}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* New Tool Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mockTools.length * 0.1 }}
          >
            <Link 
              to="/studio/builder/new" 
              className="group block border border-dashed border-white/10 p-8 md:p-10 hover:border-[#E3E3FD]/30 hover:bg-[#E3E3FD]/5 transition-colors flex flex-col items-center justify-center gap-4 text-center cursor-pointer min-h-[280px] rounded-3xl"
            >
              <div className="w-14 h-14 border border-white/10 bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#E3E3FD] group-hover:border-[#E3E3FD]/50 transition-colors rounded-2xl">
                <Plus size={24} />
              </div>
              <span className="font-mono text-[10px] text-white/40 group-hover:text-[#E3E3FD] uppercase tracking-widest transition-colors">
                INITIALIZE_NEW_TOOL
              </span>
            </Link>
          </motion.div>
        </div>

        {/* System Stats Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="mb-6">
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-4">SYSTEM_METRICS</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">TOTAL_TOOLS</p>
              <p className="font-mono text-3xl text-white mb-1">{mockTools.length}</p>
              <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">REGISTERED_MODULES</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-[#E3E3FD]/20 transition-colors">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">LIVE_TOOLS</p>
              <p className="font-mono text-3xl text-[#E3E3FD] mb-1">{mockTools.filter(t => t.status === 'Live').length}</p>
              <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">ACTIVE_DEPLOYMENTS</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">TOTAL_OUTPUTS</p>
              <p className="font-mono text-3xl text-white mb-1">{mockTools.reduce((sum, t) => sum + t.outputs, 0).toLocaleString()}</p>
              <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">ASSETS_GENERATED</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">AVG_LATENCY</p>
              <p className="font-mono text-3xl text-white mb-1">12ms</p>
              <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">RESPONSE_TIME</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
