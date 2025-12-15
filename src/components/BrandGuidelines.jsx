import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-[#261E19] text-white font-montreal p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-[#E3E3FD] hover:text-white font-mono text-sm uppercase tracking-widest">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-6xl font-medium mb-4 text-white">
          Brand Guidelines
        </h1>
        
        <div className="bg-red-600 text-white p-6 mb-8 rounded-lg">
          <p className="font-mono text-xl font-bold">✅ PAGE IS LOADING - IF YOU SEE THIS, THE ROUTE WORKS!</p>
        </div>
        
        <div className="space-y-8">
          <section className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-medium mb-4 text-[#E3E3FD]">Identity System</h2>
            <p className="text-white/70 mb-4">
              The design system uses a dark brown background (#261E19) with lavender accents (#E3E3FD).
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                <div className="w-full h-16 bg-[#261E19] rounded mb-2"></div>
                <p className="font-mono text-xs text-white/60">Background</p>
              </div>
              <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                <div className="w-full h-16 bg-[#E3E3FD] rounded mb-2"></div>
                <p className="font-mono text-xs text-white/60">Signal</p>
              </div>
              <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                <div className="w-full h-16 bg-white rounded mb-2"></div>
                <p className="font-mono text-xs text-white/60">Ink</p>
              </div>
            </div>
          </section>
          
          <section className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-medium mb-4 text-[#E3E3FD]">Typography</h2>
            <p className="text-white/70 mb-4">
              PP Neue Montreal is the primary typeface.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-medium mb-2">Display Text</p>
                <p className="font-mono text-xs text-white/40">Large headlines and hero text</p>
              </div>
              <div>
                <p className="text-xl mb-2">Body Text</p>
                <p className="font-mono text-xs text-white/40">Regular content and descriptions</p>
              </div>
              <div>
                <p className="text-sm font-mono uppercase tracking-widest mb-2">Caption Text</p>
                <p className="font-mono text-xs text-white/40">Labels and metadata</p>
              </div>
            </div>
          </section>
          
          <section className="bg-[#1A1614] border border-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-medium mb-4 text-[#E3E3FD]">Components</h2>
            <p className="text-white/70 mb-4">
              The system uses a node-based language with three main components:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                <h3 className="font-mono text-sm text-[#E3E3FD] mb-2">Design_Studio</h3>
                <p className="text-white/60 text-sm">Input layer for assets and content</p>
              </div>
              <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                <h3 className="font-mono text-sm text-[#E3E3FD] mb-2">Logic_Core</h3>
                <p className="text-white/60 text-sm">Governance and rule enforcement</p>
              </div>
              <div className="p-4 bg-[#261E19] border border-white/10 rounded-lg">
                <h3 className="font-mono text-sm text-[#E3E3FD] mb-2">Client_Output</h3>
                <p className="text-white/60 text-sm">Final rendered assets</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
