import React from 'react';
import { Upload, Monitor, Box, Layers, Maximize, Zap, Cpu, Image as ImageIcon, X, Palette, Grid as GridIcon, Sun, FileImage, RotateCw, ArrowUpCircle } from 'lucide-react';
import { Button } from './Button';
import { FileData, ViewPreset, BackgroundConfig, BackgroundMode, LightingConfig } from '../types';

interface SidebarProps {
  onUploadCAD: (file: FileData) => void;
  onUploadReference: (file: FileData) => void;
  onRemoveReference: () => void;
  onLoadExample: () => void;
  
  cadFile: FileData | null;
  referenceFile: FileData | null;
  
  currentView: ViewPreset;
  onViewChange: (view: ViewPreset) => void;
  
  background: BackgroundConfig;
  onBackgroundChange: (bg: BackgroundConfig) => void;
  
  lighting: LightingConfig;
  onLightingChange: (light: LightingConfig) => void;

  showShadows: boolean;
  onToggleShadows: (show: boolean) => void;
  
  prompt: string;
  onPromptChange: (text: string) => void;
  
  onGenerate: () => void;
  isGenerating: boolean;
  credits: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
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
  
  const handleCadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleRefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
      
      {/* 1. CAD Input */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-4">01. Geometry</h3>
        
        {!cadFile ? (
          <div className="space-y-3">
            <label className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-900 hover:bg-gray-50 transition-all group">
              <Upload className="text-gray-400 group-hover:text-gray-900 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900">Upload 3D File</span>
              <span className="text-xs text-gray-400 mt-1">.GLB, .OBJ, .STL</span>
              <input type="file" className="hidden" accept=".glb,.gltf,.step,.stp,.obj,.stl" onChange={handleCadChange} />
            </label>
            
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono uppercase justify-center">OR</div>

             <label className="border border-gray-200 rounded-lg p-3 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-all group">
              <FileImage className="text-gray-400 group-hover:text-gray-900" size={16} />
              <span className="text-xs font-medium text-gray-700">Upload CAD Screenshot</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleCadChange} />
            </label>

            <Button 
                variant="secondary" 
                fullWidth 
                onClick={onLoadExample}
                icon={<Cpu size={14} />}
                className="text-xs font-mono mt-2"
            >
                LOAD DEMO CHIP
            </Button>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-start gap-3 relative overflow-hidden group">
            <div className="bg-white border border-gray-200 p-2 rounded">
              {cadFile.type.includes('IMAGE') ? <FileImage size={16} className="text-gray-900"/> : <Box size={16} className="text-gray-900" />}
            </div>
            <div className="flex flex-col overflow-hidden">
               <span className="text-sm font-medium text-gray-900 truncate pr-4">{cadFile.name}</span>
               <span className="text-xs font-mono text-gray-500">{cadFile.type} • {cadFile.size}</span>
            </div>
            <button 
              onClick={() => document.getElementById('cad-reset')?.click()} 
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">×</div>
            </button>
            <input id="cad-reset" type="file" className="hidden" onChange={handleCadChange} />
          </div>
        )}
      </div>

      {/* 2. Style & Context */}
      <div className={`p-6 border-b border-gray-100 transition-opacity ${!cadFile ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-4">02. Style Context</h3>
        
        {/* Reference Image Upload */}
        <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">Texture Reference (Optional)</label>
            {!referenceFile ? (
                <label className="border border-gray-200 rounded-md h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all border-dashed">
                    <ImageIcon className="text-gray-400 mb-1" size={20} />
                    <span className="text-[10px] text-gray-500">Upload material source photo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleRefChange} />
                </label>
            ) : (
                <div className="relative h-24 rounded-md border border-gray-200 overflow-hidden group">
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
            <label className="block text-xs font-medium text-gray-700 mb-2">Prompt Instructions {referenceFile && "(Optional)"}</label>
            <textarea 
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={referenceFile ? "Additional details..." : "Describe the material finish, lighting, and mood..."}
                className="w-full text-xs border border-gray-200 rounded-md p-3 h-20 focus:ring-1 focus:ring-gray-900 focus:outline-none resize-none"
            />
        </div>
      </div>

      {/* 3. Output Settings */}
      <div className={`p-6 flex-1 transition-opacity ${!cadFile ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-4">03. Output Settings</h3>
        
        {/* Camera View */}
        <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-2">Camera Angle</label>
            <div className="grid grid-cols-2 gap-2">
            {(['isometric', 'front', 'top', 'side'] as ViewPreset[]).map((view) => (
                <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`
                    px-3 py-2 text-xs font-medium border rounded transition-all flex items-center gap-2
                    ${currentView === view 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
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
                <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <Sun size={14} className="text-gray-500" />
                    Environment Shadows
                </label>
                <button 
                    onClick={() => onToggleShadows(!showShadows)}
                    className={`w-8 h-4 rounded-full transition-colors relative ${showShadows ? 'bg-gray-900' : 'bg-gray-300'}`}
                >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${showShadows ? 'left-4.5' : 'left-0.5'}`} style={{ left: showShadows ? 'calc(100% - 14px)' : '2px' }}></div>
                </button>
            </div>
            
            {/* Light Direction Slider */}
            {showShadows && (
                <div>
                   <div className="flex items-center justify-between mb-1">
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
                         <RotateCw size={12} className="text-gray-400" /> Light Rotation
                      </label>
                      <span className="text-[10px] text-gray-400 font-mono">{lighting.rotation}°</span>
                   </div>
                   <input 
                      type="range" 
                      min="0" 
                      max="360" 
                      value={lighting.rotation} 
                      onChange={(e) => onLightingChange({...lighting, rotation: parseInt(e.target.value)})}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900" 
                   />
                </div>
            )}
        </div>

        {/* Background Settings */}
        <div className="mb-4">
             <label className="block text-xs font-medium text-gray-700 mb-2">Background</label>
             <div className="flex bg-gray-100 p-1 rounded-md mb-3">
                {(['transparent', 'flat', 'gradient'] as BackgroundMode[]).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => onBackgroundChange({ ...background, mode })}
                        className={`flex-1 flex items-center justify-center py-1 rounded text-[10px] font-medium transition-all ${background.mode === mode ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
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
                            className="w-full h-8 rounded cursor-pointer border-0 p-0" 
                        />
                     </div>
                     {background.mode === 'gradient' && (
                        <div className="flex-1">
                            <input 
                                type="color" 
                                value={background.color2 || '#ffffff'} 
                                onChange={(e) => onBackgroundChange({ ...background, color2: e.target.value })}
                                className="w-full h-8 rounded cursor-pointer border-0 p-0" 
                            />
                        </div>
                     )}
                 </div>
             )}
        </div>
      </div>

      {/* Generate Action */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <Button 
          fullWidth 
          onClick={onGenerate} 
          disabled={!isReady || isGenerating || credits < 1}
          className={credits < 1 ? 'opacity-75' : ''}
          icon={isGenerating ? undefined : <Zap size={16} className={isReady && credits > 0 ? 'text-yellow-400 fill-current' : ''} />}
        >
          {isGenerating ? 'GENERATING...' : !isReady ? 'SETUP REQUIRED' : `GENERATE (-1 CREDIT)`}
        </Button>
      </div>
    </aside>
  );
};