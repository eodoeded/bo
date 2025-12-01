import React from 'react';
import { Upload, Monitor, Box, Layers, Maximize, Zap, Cpu, Image as ImageIcon, X, Palette, Grid as GridIcon, Sun, FileImage, RotateCw, ArrowUpCircle } from 'lucide-react';
import { Button } from './Button';

export const Sidebar = ({ 
  onUploadCAD,
  onUploadReference,
  onRemoveReference,
  onLoadExample,
  cadFile, 
  referenceFile,
  currentView, 
  onViewChange,
  background,
  onBackgroundChange,
  lighting,
  onLightingChange,
  showShadows,
  onToggleShadows,
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  credits
}) => {
  
  const handleCadChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const url = URL.createObjectURL(f);
      const isImage = f.type.startsWith('image/');
      onUploadCAD({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: isImage ? 'IMAGE' : f.name.split('.').pop()?.toUpperCase() || 'CAD',
        lastModified: f.lastModified,
        previewUrl: url,
        data: f,
        isExample: false
      });
    }
  };

  const handleRefChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const url = URL.createObjectURL(f);
      onUploadReference({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: 'REF',
        lastModified: f.lastModified,
        previewUrl: url,
        data: f
      });
    }
  };

  const isReady = cadFile && (!!referenceFile || prompt.length > 2);

  return (
    <aside className="w-80 bg-[#12110d] border-r border-white/10 flex flex-col h-[calc(100vh-64px)] overflow-y-auto font-inter-light text-[#E3E3FD]">
      
      {/* 1. CAD Input */}
      <div className="p-6 border-b border-white/10">
        <h3 className="text-[10px] font-mono font-semibold text-[#E3E3FD]/40 uppercase tracking-[0.2em] mb-4">01. Geometry</h3>
        
        {!cadFile ? (
          <div className="space-y-3">
            <label className="border-[1px] border-dashed border-white/20 rounded-sm p-6 flex flex-col items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all group">
              <Upload className="text-white/40 group-hover:text-white mb-2 transition-colors" size={24} />
              <span className="text-sm font-medium text-[#E3E3FD] group-hover:text-white transition-colors">Upload 3D File</span>
              <span className="text-[10px] text-[#E3E3FD]/40 mt-1 font-mono">.GLB, .OBJ, .STL</span>
              <input type="file" className="hidden" accept=".glb,.gltf,.step,.stp,.obj,.stl" onChange={handleCadChange} />
            </label>
            
            <div className="flex items-center gap-2 text-[10px] text-[#E3E3FD]/20 font-mono uppercase justify-center">OR</div>

             <label className="border border-white/20 rounded-sm p-3 flex items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-all group">
              <FileImage className="text-white/40 group-hover:text-white transition-colors" size={16} />
              <span className="text-xs font-medium text-[#E3E3FD]/80 group-hover:text-white transition-colors">Upload CAD Screenshot</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleCadChange} />
            </label>

            <div 
                onClick={onLoadExample}
                className="mt-4 border border-white/10 bg-white/5 p-3 rounded-sm cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all group"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#3B3B3B] border border-white/20 flex items-center justify-center rounded-sm">
                        <Cpu size={16} className="text-[#E3E3FD]" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-[#E3E3FD]">NVIDIA H100 Hopper</div>
                        <div className="text-[10px] text-[#E3E3FD]/50 font-mono">DEMO ASSET</div>
                    </div>
                </div>
                <div className="text-[10px] text-[#E3E3FD]/60 pl-11 border-l border-white/10 ml-4">
                    "Matte black industrial finish, gold connectors, cinematic lighting..."
                </div>
            </div>

          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-sm p-3 flex items-start gap-3 relative overflow-hidden group">
            <div className="bg-[#12110d] border border-white/10 p-2 rounded-sm">
              {cadFile.type.includes('IMAGE') ? <FileImage size={16} className="text-[#E3E3FD]"/> : <Box size={16} className="text-[#E3E3FD]" />}
            </div>
            <div className="flex flex-col overflow-hidden">
               <span className="text-sm font-medium text-[#E3E3FD] truncate pr-4">{cadFile.name}</span>
               <span className="text-[10px] font-mono text-[#E3E3FD]/50">{cadFile.type} • {cadFile.size}</span>
            </div>
            <button 
              onClick={() => document.getElementById('cad-reset')?.click()} 
              className="absolute top-2 right-2 text-[#E3E3FD]/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">×</div>
            </button>
            <input id="cad-reset" type="file" className="hidden" onChange={handleCadChange} />
          </div>
        )}
      </div>

      {/* 2. Style & Context */}
      <div className={`p-6 border-b border-white/10 transition-opacity ${!cadFile ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <h3 className="text-[10px] font-mono font-semibold text-[#E3E3FD]/40 uppercase tracking-[0.2em] mb-4">02. Style Context</h3>
        
        {/* Reference Image Upload */}
        <div className="mb-4">
            <label className="block text-[10px] font-medium text-[#E3E3FD]/60 mb-2 uppercase tracking-wider">Texture Reference (Optional)</label>
            {!referenceFile ? (
                <label className="border border-white/20 rounded-sm h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all border-dashed">
                    <ImageIcon className="text-white/40 mb-1" size={20} />
                    <span className="text-[10px] text-[#E3E3FD]/40">Upload material source photo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleRefChange} />
                </label>
            ) : (
                <div className="relative h-24 rounded-sm border border-white/20 overflow-hidden group">
                    <img src={referenceFile.previewUrl} alt="Ref" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={onRemoveReference} className="text-white hover:text-red-400">
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Prompt Input */}
        <div>
            <label className="block text-[10px] font-medium text-[#E3E3FD]/60 mb-2 uppercase tracking-wider">Prompt Instructions {referenceFile && "(Optional)"}</label>
            <textarea 
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={referenceFile ? "Additional details..." : "Describe the material finish, lighting, and mood..."}
                className="w-full text-xs bg-black/20 border border-white/10 text-[#E3E3FD] rounded-sm p-3 h-20 focus:ring-1 focus:ring-white/30 focus:outline-none resize-none placeholder:text-[#E3E3FD]/20"
            />
        </div>
      </div>

      {/* 3. Output Settings */}
      <div className={`p-6 flex-1 transition-opacity ${!cadFile ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <h3 className="text-[10px] font-mono font-semibold text-[#E3E3FD]/40 uppercase tracking-[0.2em] mb-4">03. Output Settings</h3>
        
        {/* Camera View */}
        <div className="mb-6">
            <label className="block text-[10px] font-medium text-[#E3E3FD]/60 mb-2 uppercase tracking-wider">Camera Angle</label>
            <div className="grid grid-cols-2 gap-2">
            {(['isometric', 'front', 'top', 'side']).map((view) => (
                <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`
                    px-3 py-2 text-[10px] font-medium border rounded-sm transition-all flex items-center gap-2 uppercase tracking-wider
                    ${currentView === view 
                    ? 'bg-[#3B3B3B] text-white border-white/40' 
                    : 'bg-transparent text-[#E3E3FD]/60 border-white/10 hover:border-white/20 hover:text-[#E3E3FD]'
                    }
                `}
                >
                {view === 'isometric' && <Box size={12} />}
                {view === 'front' && <Monitor size={12} />}
                {view === 'top' && <Layers size={12} />}
                {view === 'side' && <Maximize size={12} />}
                <span className="capitalize">{view}</span>
                </button>
            ))}
            </div>
        </div>

        {/* Lighting & Shadows */}
        <div className="mb-6 space-y-4">
             {/* Shadow Toggle */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[10px] font-medium text-[#E3E3FD]/60 cursor-pointer uppercase tracking-wider">
                    <Sun size={14} className="text-[#E3E3FD]/40" />
                    Environment Shadows
                </label>
                <button 
                    onClick={() => onToggleShadows(!showShadows)}
                    className={`w-8 h-4 rounded-full transition-colors relative ${showShadows ? 'bg-[#E3E3FD]' : 'bg-white/10'}`}
                >
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${showShadows ? 'bg-[#12110d] left-4.5' : 'bg-[#E3E3FD]/50 left-0.5'}`} style={{ left: showShadows ? 'calc(100% - 14px)' : '2px' }}></div>
                </button>
            </div>
            
            {/* Light Direction Slider */}
            {showShadows && (
                <div>
                   <div className="flex items-center justify-between mb-1">
                      <label className="flex items-center gap-2 text-[10px] font-medium text-[#E3E3FD]/60 uppercase tracking-wider">
                         <RotateCw size={12} className="text-[#E3E3FD]/40" /> Light Rotation
                      </label>
                      <span className="text-[10px] text-[#E3E3FD]/40 font-mono">{lighting.rotation}°</span>
                   </div>
                   <input 
                      type="range" 
                      min="0" 
                      max="360" 
                      value={lighting.rotation} 
                      onChange={(e) => onLightingChange({...lighting, rotation: parseInt(e.target.value)})}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E3E3FD]" 
                   />
                </div>
            )}
        </div>

        {/* Background Settings */}
        <div className="mb-4">
             <label className="block text-[10px] font-medium text-[#E3E3FD]/60 mb-2 uppercase tracking-wider">Background</label>
             <div className="flex bg-white/5 p-1 rounded-sm mb-3 border border-white/10">
                {(['transparent', 'flat', 'gradient']).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => onBackgroundChange({ ...background, mode })}
                        className={`flex-1 flex items-center justify-center py-1 rounded-[2px] text-[10px] font-medium transition-all uppercase tracking-wider ${background.mode === mode ? 'bg-[#3B3B3B] shadow-sm text-white' : 'text-[#E3E3FD]/40 hover:text-[#E3E3FD]'}`}
                    >
                       {mode === 'transparent' ? 'PNG' : mode === 'flat' ? 'Solid' : 'Grad'}
                    </button>
                ))}
             </div>

             {/* Color Pickers */}
             {background.mode !== 'transparent' && (
                 <div className="flex gap-2">
                     <div className="flex-1">
                        <input 
                            type="color" 
                            value={background.color1} 
                            onChange={(e) => onBackgroundChange({ ...background, color1: e.target.value })}
                            className="w-full h-6 rounded-sm cursor-pointer border-0 p-0 bg-transparent" 
                        />
                     </div>
                     {background.mode === 'gradient' && (
                        <div className="flex-1">
                            <input 
                                type="color" 
                                value={background.color2 || '#ffffff'} 
                                onChange={(e) => onBackgroundChange({ ...background, color2: e.target.value })}
                                className="w-full h-6 rounded-sm cursor-pointer border-0 p-0 bg-transparent" 
                            />
                        </div>
                     )}
                 </div>
             )}
        </div>
      </div>

      {/* Generate Action */}
      <div className="p-6 border-t border-white/10 bg-[#12110d]">
        <Button 
          fullWidth 
          onClick={onGenerate} 
          disabled={!isReady || isGenerating || credits < 1}
          className={credits < 1 ? 'opacity-50' : ''}
          icon={isGenerating ? undefined : <Zap size={16} className={isReady && credits > 0 ? 'text-yellow-400 fill-current' : ''} />}
        >
          {isGenerating ? 'GENERATING...' : !isReady ? 'SETUP REQUIRED' : `GENERATE (-1 CREDIT)`}
        </Button>
      </div>
    </aside>
  );
};
