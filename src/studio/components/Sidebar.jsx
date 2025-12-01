import React, { useState } from 'react';
import { Upload, Monitor, Box, Layers, Maximize, Zap, Cpu, Image as ImageIcon, X, Sun, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

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
  credits,
  isAuthenticated,
  onLogin
}) => {
  
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoginLoading(true);
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        
        if (!userInfoResponse.ok) {
            throw new Error('Failed to fetch user info');
        }

        const userInfo = await userInfoResponse.json();
        
        onLogin({
            name: userInfo.name,
            email: userInfo.email,
            avatar: userInfo.picture,
            googleId: userInfo.sub
        });
      } catch (err) {
        console.error("Login details fetch failed", err);
        alert("Failed to log in");
      } finally {
        setIsLoginLoading(false);
      }
    },
    onError: (errorResponse) => {
        console.error("Google Login Failed", errorResponse);
        setIsLoginLoading(false);
    }
  });

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
  const COST_PER_GENERATION = 5;
  const hasEnoughCredits = credits >= COST_PER_GENERATION;

  return (
    <aside className="w-80 bg-[#12110d] border-r border-white/5 flex flex-col h-[calc(100vh-64px)] overflow-y-auto font-inter-light text-[#E3E3FD]">
      
      {/* 1. CAD Input */}
      <div className="p-6 border-b border-white/5">
        <h3 className="text-[10px] font-mono font-semibold text-[#E3E3FD]/40 uppercase tracking-[0.2em] mb-4">01. Geometry</h3>
        
        {!cadFile ? (
          <div className="space-y-3">
            <label className="border-[1px] border-dashed border-white/10 rounded-sm p-6 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all group">
              <Upload className="text-white/40 group-hover:text-white mb-2 transition-colors" size={20} />
              <span className="text-xs font-medium text-[#E3E3FD] group-hover:text-white transition-colors">Upload 3D File</span>
              <span className="text-[10px] text-[#E3E3FD]/40 mt-1 font-mono">.GLB, .OBJ, .STL</span>
              <input type="file" className="hidden" accept=".glb,.gltf,.step,.stp,.obj,.stl" onChange={handleCadChange} />
            </label>

            <div 
                onClick={onLoadExample}
                className="mt-4 border border-white/10 bg-white/[0.02] p-3 rounded-sm cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all group"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#1C1A14] border border-white/10 flex items-center justify-center rounded-sm group-hover:border-white/30 transition-colors">
                        <Cpu size={14} className="text-[#E3E3FD]" />
                    </div>
                    <div>
                        <div className="text-xs font-medium text-[#E3E3FD] group-hover:text-white transition-colors">NVIDIA H100 Hopper</div>
                        <div className="text-[9px] text-[#E3E3FD]/40 font-mono uppercase tracking-wider">Demo Asset</div>
                    </div>
                </div>
                <div className="text-[10px] text-[#E3E3FD]/50 pl-3 border-l border-white/10 ml-4 italic">
                    "Matte black industrial finish..."
                </div>
            </div>

          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/10 rounded-sm p-3 flex items-start gap-3 relative overflow-hidden group">
            <div className="bg-[#1C1A14] border border-white/10 p-2 rounded-sm">
              <Box size={14} className="text-[#E3E3FD]" />
            </div>
            <div className="flex flex-col overflow-hidden">
               <span className="text-xs font-medium text-[#E3E3FD] truncate pr-4">{cadFile.name}</span>
               <span className="text-[9px] font-mono text-[#E3E3FD]/40 uppercase tracking-wider">{cadFile.type} • {cadFile.size}</span>
            </div>
            <button 
              onClick={() => document.getElementById('cad-reset')?.click()} 
              className="absolute top-2 right-2 text-[#E3E3FD]/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">×</div>
            </button>
            <input id="cad-reset" type="file" className="hidden" onChange={handleCadChange} />
          </div>
        )}
      </div>

      {/* 2. Style & Context */}
      <div className={`p-6 border-b border-white/5 transition-opacity ${!cadFile ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        <h3 className="text-[10px] font-mono font-semibold text-[#E3E3FD]/40 uppercase tracking-[0.2em] mb-4">02. Style Context</h3>
        
        {/* Reference Image Upload */}
        <div className="mb-4">
            <label className="block text-[9px] font-medium text-[#E3E3FD]/60 mb-2 uppercase tracking-wider">Texture Reference</label>
            {!referenceFile ? (
                <label className="border border-white/10 rounded-sm h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/30 transition-all border-dashed group">
                    <ImageIcon className="text-white/20 group-hover:text-white/60 mb-1 transition-colors" size={16} />
                    <span className="text-[9px] text-[#E3E3FD]/40 group-hover:text-[#E3E3FD]/80 transition-colors">Upload photo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleRefChange} />
                </label>
            ) : (
                <div className="relative h-20 rounded-sm border border-white/10 overflow-hidden group">
                    <img src={referenceFile.previewUrl} alt="Ref" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={onRemoveReference} className="text-white hover:text-red-400">
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Prompt Input */}
        <div>
            <label className="block text-[9px] font-medium text-[#E3E3FD]/60 mb-2 uppercase tracking-wider">Prompt Instructions</label>
            <textarea 
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={referenceFile ? "Additional details..." : "Describe the material finish, lighting, and mood..."}
                className="w-full text-xs bg-[#1C1A14] border border-white/10 text-[#E3E3FD] rounded-sm p-3 h-24 focus:ring-1 focus:ring-white/20 focus:outline-none resize-none placeholder:text-[#E3E3FD]/20"
            />
        </div>
      </div>

      {/* 3. Output Settings */}
      <div className={`p-6 flex-1 transition-opacity ${!cadFile ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        <h3 className="text-[10px] font-mono font-semibold text-[#E3E3FD]/40 uppercase tracking-[0.2em] mb-4">03. Output Settings</h3>
        
        {/* Camera View */}
        <div className="mb-6">
            <label className="block text-[9px] font-medium text-[#E3E3FD]/60 mb-2 uppercase tracking-wider">Camera Angle</label>
            <div className="grid grid-cols-2 gap-2">
            {(['isometric', 'front', 'top', 'side']).map((view) => (
                <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`
                    px-3 py-2 text-[9px] font-medium border rounded-sm transition-all flex items-center gap-2 uppercase tracking-wider
                    ${currentView === view 
                    ? 'bg-[#3B3B3B] text-white border-white/30' 
                    : 'bg-transparent text-[#E3E3FD]/40 border-white/5 hover:border-white/10 hover:text-[#E3E3FD]/80'
                    }
                `}
                >
                {view === 'isometric' && <Box size={10} />}
                {view === 'front' && <Monitor size={10} />}
                {view === 'top' && <Layers size={10} />}
                {view === 'side' && <Maximize size={10} />}
                <span className="capitalize">{view}</span>
                </button>
            ))}
            </div>
        </div>

        {/* Lighting & Shadows */}
        <div className="mb-6 space-y-4">
             {/* Shadow Toggle */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[9px] font-medium text-[#E3E3FD]/60 cursor-pointer uppercase tracking-wider">
                    <Sun size={12} className="text-[#E3E3FD]/40" />
                    Shadows
                </label>
                <button 
                    onClick={() => onToggleShadows(!showShadows)}
                    className={`w-7 h-3.5 rounded-full transition-colors relative ${showShadows ? 'bg-[#E3E3FD]' : 'bg-white/10'}`}
                >
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all ${showShadows ? 'bg-[#12110d] left-4' : 'bg-[#E3E3FD]/50 left-0.5'}`} style={{ left: showShadows ? 'calc(100% - 12px)' : '2px' }}></div>
                </button>
            </div>
            
            {/* Light Direction Slider */}
            {showShadows && (
                <div>
                   <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-[9px] font-medium text-[#E3E3FD]/60 uppercase tracking-wider">
                         <RotateCw size={12} className="text-[#E3E3FD]/40" /> Rotation
                      </label>
                      <span className="text-[9px] text-[#E3E3FD]/40 font-mono">{lighting.rotation}°</span>
                   </div>
                   <input 
                      type="range" 
                      min="0" 
                      max="360" 
                      value={lighting.rotation} 
                      onChange={(e) => onLightingChange({...lighting, rotation: parseInt(e.target.value)})}
                      className="w-full h-px bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E3E3FD]" 
                   />
                </div>
            )}
        </div>
      </div>

      {/* Action Area (Login or Generate) */}
      <div className="p-6 border-t border-white/5 bg-[#12110d]">
        {!isAuthenticated ? (
            <motion.button
                type="button"
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap="hover"
                onClick={() => login()}
                disabled={isLoginLoading}
                variants={{ rest: { color: "#E3E3FD", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }, hover: { color: "#FFFFFF", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } }}
                className={`
                  group w-full font-inter-light text-[#E3E3FD] text-[14px]
                  bg-[#3B3B3B] cursor-pointer
                  border-[1px] border-[#FFFFFF4D]
                  backdrop-blur-[6.5px]
                  px-[16px] py-[10px]
                  flex items-center justify-center gap-3
                  disabled:opacity-50 disabled:cursor-wait
                `}
            >
                {isLoginLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="Google" />
                )}
                <span>{isLoginLoading ? 'Connecting...' : 'Sign in to Generate'}</span>
            </motion.button>
        ) : (
            <motion.button
                type="button"
                initial="rest"
                animate="rest"
                whileHover={(!isReady || isGenerating || !hasEnoughCredits) ? "rest" : "hover"}
                whileTap={(!isReady || isGenerating || !hasEnoughCredits) ? "rest" : "hover"}
                onClick={onGenerate}
                disabled={!isReady || isGenerating || !hasEnoughCredits}
                variants={{ rest: { color: "#E3E3FD", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }, hover: { color: "#FFFFFF", transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } }}
                className={`
                  group w-full font-inter-light text-[#E3E3FD] text-[14px]
                  bg-[#3B3B3B] cursor-pointer
                  border-[1px] border-[#FFFFFF4D]
                  backdrop-blur-[6.5px]
                  px-[16px] py-[10px]
                  flex items-center justify-center
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isGenerating 
                    ? 'Generating...' 
                    : !hasEnoughCredits 
                        ? `Insufficient Credits (${credits}/${COST_PER_GENERATION})` 
                        : !isReady 
                            ? 'Setup Required' 
                            : `Generate (-${COST_PER_GENERATION} Credits)`}
                
                {!isGenerating && isReady && hasEnoughCredits && (
                    <motion.span variants={{ rest: { x: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }, hover: { x: 4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } }} className="ml-2 inline-block">→</motion.span>
                )}
              </motion.button>
        )}
      </div>
    </aside>
  );
};
