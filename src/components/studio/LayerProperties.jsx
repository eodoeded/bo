import React from 'react';
import { Lock, Unlock, Trash2, Check, Sliders, ChevronRight, AlignLeft, AlignCenter, AlignRight, AlignVerticalDistributeCenter, AlignHorizontalDistributeCenter, AlignJustify, AlignEndVertical, Bold, Italic, Underline, Type, RotateCw, ArrowUp, ArrowDown, Sun, Droplet, Circle, CircleDashed, FlipHorizontal, FlipVertical, Box } from 'lucide-react';

const InputRow = ({ label, children }) => (
  <div className="mb-4">
    <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">{label}</label>
    {children}
  </div>
);

const StudioInput = ({ value, onChange, type = "text", className = "" }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    return (
        <input 
            type={type} 
            value={value} 
            onChange={onChange}
            onKeyDown={handleKeyDown}
            className={`w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-[#E3E3FD] ${className}`} 
        />
    );
};

const StudioSelect = ({ value, onChange, options }) => (
    <div className="relative">
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-[#E3E3FD] appearance-none"
        >
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <ChevronRight size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 rotate-90 pointer-events-none" />
    </div>
);

const AdjustmentSlider = ({ icon: Icon, value, min, max, onChange, label, unit = "" }) => (
    <div className="mb-2">
        <div className="flex justify-between mb-1">
             <div className="flex items-center gap-1.5">
                <Icon size={10} className="text-white/40" />
                <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">{label}</span>
             </div>
             <span className="font-mono text-[8px] text-white/60">{value}{unit}</span>
        </div>
        <input 
           type="range" 
           min={min} max={max} step="1"
           value={value}
           onChange={onChange}
           className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-[#E3E3FD] [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
       />
    </div>
);

export const LayerProperties = ({ 
  layer, 
  mode, 
  onUpdate, 
  onDelete,
  onAlign,
  onDistribute 
}) => {
  const isStudio = mode === 'STUDIO';
  
  if (!isStudio && !layer.allowContentChange) {
    return (
      <div className="p-4 border border-white/10 bg-white/5">
        <h3 className="text-xs font-mono text-white uppercase tracking-wider mb-2">Selection</h3>
        <p className="text-[10px] font-mono text-white/60">{layer.type} (LOCKED)</p>
      </div>
    );
  }

  const handleAlign = (alignment) => {
      if (onAlign) onAlign(alignment);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
           <h3 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">{layer.type}</h3>
           <p className="text-[9px] font-mono text-[#E3E3FD] mt-0.5">ID: {layer.id.slice(-4)}</p>
        </div>
        
        {isStudio && (
          <div className="flex gap-1">
            <button 
              onClick={() => onUpdate(layer.id, { locked: !layer.locked })}
              className={`p-2 hover:bg-white/5 transition-colors ${layer.locked ? 'text-[#E3E3FD]' : 'text-white/40'}`}
              title={layer.locked ? "Unlock Content" : "Lock Content"}
            >
              {layer.locked ? <Lock size={12} /> : <Unlock size={12} />}
            </button>
            <button 
              onClick={() => onDelete(layer.id)}
              className="p-2 hover:bg-red-900/20 text-white/40 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>

      {/* TEXT CONTROLS */}
      {layer.type === 'TEXT' && (
        <div>
          <InputRow label="Content">
            <StudioInput
              value={layer.text || ''}
              onChange={(e) => onUpdate(layer.id, { text: e.target.value })}
            />
          </InputRow>
          
          {isStudio && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <InputRow label="Color">
                   <div className="flex gap-2 items-center">
                     <input
                       type="color"
                       value={layer.color || '#ffffff'}
                       onChange={(e) => onUpdate(layer.id, { color: e.target.value })}
                       className="h-6 w-6 bg-transparent cursor-pointer border-0 p-0"
                     />
                     <span className="text-[9px] text-white/40 font-mono">{layer.color}</span>
                   </div>
                </InputRow>
                <InputRow label="Size (px)">
                   <StudioInput
                    type="number"
                    value={layer.fontSize || 16}
                    onChange={(e) => onUpdate(layer.id, { fontSize: Number(e.target.value) })}
                   />
                </InputRow>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                  <InputRow label="Alignment">
                    <StudioSelect
                      value={layer.textAlign || 'left'}
                      onChange={(e) => onUpdate(layer.id, { textAlign: e.target.value })}
                      options={[
                          { value: 'left', label: 'Left' },
                          { value: 'center', label: 'Center' },
                          { value: 'right', label: 'Right' }
                      ]}
                    />
                  </InputRow>
                  <InputRow label="Font">
                    <StudioSelect
                      value={layer.fontFamily || 'sans-serif'}
                      onChange={(e) => onUpdate(layer.id, { fontFamily: e.target.value })}
                      options={[
                          { value: 'JetBrains Mono', label: 'Mono' },
                          { value: 'Inter', label: 'Sans' },
                          { value: 'PP Neue Montreal', label: 'Montreal' },
                          { value: 'Cinzel', label: 'Serif' }
                      ]}
                    />
                  </InputRow>
              </div>

              {/* Text Styles */}
              <div className="mb-4">
                  <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Style</label>
                  <div className="flex gap-1">
                      <button 
                        onClick={() => onUpdate(layer.id, { fontWeight: layer.fontWeight === 'bold' ? 'normal' : 'bold' })}
                        className={`p-2 border ${layer.fontWeight === 'bold' ? 'bg-white/10 text-white border-white/20' : 'border-transparent text-white/40 hover:text-white'} transition-colors rounded-[1px]`}
                        title="Bold"
                      >
                          <Bold size={14} />
                      </button>
                      <button 
                        onClick={() => onUpdate(layer.id, { fontStyle: layer.fontStyle === 'italic' ? 'normal' : 'italic' })}
                        className={`p-2 border ${layer.fontStyle === 'italic' ? 'bg-white/10 text-white border-white/20' : 'border-transparent text-white/40 hover:text-white'} transition-colors rounded-[1px]`}
                        title="Italic"
                      >
                          <Italic size={14} />
                      </button>
                      <button 
                        onClick={() => onUpdate(layer.id, { textDecoration: layer.textDecoration === 'underline' ? 'none' : 'underline' })}
                        className={`p-2 border ${layer.textDecoration === 'underline' ? 'bg-white/10 text-white border-white/20' : 'border-transparent text-white/40 hover:text-white'} transition-colors rounded-[1px]`}
                        title="Underline"
                      >
                          <Underline size={14} />
                      </button>
                      <button 
                        onClick={() => onUpdate(layer.id, { textTransform: layer.textTransform === 'uppercase' ? 'none' : 'uppercase' })}
                        className={`p-2 border ${layer.textTransform === 'uppercase' ? 'bg-white/10 text-white border-white/20' : 'border-transparent text-white/40 hover:text-white'} transition-colors rounded-[1px]`}
                        title="Uppercase"
                      >
                          <Type size={14} />
                      </button>
                  </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* AI LAYER CONTROLS */}
      {layer.type === 'AI_FRAME' && (
        <div>
          {isStudio ? (
            <>
              <InputRow label="Prompt Template">
                <textarea
                  value={layer.aiPromptTemplate || ''}
                  onChange={(e) => onUpdate(layer.id, { aiPromptTemplate: e.target.value })}
                  placeholder="E.g. A mystical tarot card of {subject}..."
                  className="w-full bg-[#0A0A0A] border border-white/10 p-2 text-[10px] text-white focus:border-[#E3E3FD] focus:outline-none min-h-[100px] leading-relaxed font-mono"
                />
              </InputRow>
              <div className="mb-4 text-[9px] text-white/40 border-l-2 border-white/10 pl-2 font-mono">
                 Variable: <code className="text-[#E3E3FD]">{`{subject}`}</code>
              </div>
            </>
          ) : (
             <div className="p-3 border border-dashed border-white/10 text-center">
                <p className="text-[10px] text-white/40 font-mono">AI Controls are in the GENERATE tab.</p>
             </div>
          )}
        </div>
      )}

      {/* IMAGE LAYER CONTROLS */}
      {layer.type === 'IMAGE' && isStudio && (
        <InputRow label="Source URL">
            <StudioInput
              value={layer.src || ''}
              onChange={(e) => onUpdate(layer.id, { src: e.target.value })}
            />
        </InputRow>
      )}
      
      {/* PROCESSING UNIT (FILTERS) & OPACITY */}
      {isStudio && (
        <div className="pt-4 border-t border-white/10">
           <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest block mb-4">Appearance</span>
           
           <div className="grid grid-cols-2 gap-3 mb-4">
               <div>
                   <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Opacity</label>
                   <div className="flex gap-2 items-center">
                       <input 
                           type="range" 
                           min="0" max="1" step="0.01"
                           value={layer.opacity !== undefined ? layer.opacity : 1}
                           onChange={(e) => onUpdate(layer.id, { opacity: parseFloat(e.target.value) })}
                           className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#E3E3FD] [&::-webkit-slider-thumb]:rounded-full"
                       />
                       <span className="font-mono text-[8px] text-white/60 w-6 text-right">{Math.round((layer.opacity !== undefined ? layer.opacity : 1) * 100)}%</span>
                   </div>
               </div>
               <div>
                   <label className="font-mono text-[8px] text-white/30 uppercase tracking-widest block mb-1">Rotation</label>
                   <div className="flex gap-2 items-center">
                       <RotateCw size={12} className="text-white/40" />
                       <input 
                           type="number" 
                           value={layer.rotation || 0}
                           onChange={(e) => onUpdate(layer.id, { rotation: Number(e.target.value) })}
                           className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1 font-mono text-[9px] text-white focus:outline-none focus:border-[#E3E3FD]"
                       />
                       <span className="font-mono text-[8px] text-white/40">deg</span>
                   </div>
               </div>
           </div>

           {(layer.type === 'IMAGE' || layer.type === 'AI_FRAME') && (
               <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-3">
                      <InputRow label="Filter">
                        <StudioSelect
                          value={layer.filterType || 'none'}
                          onChange={(e) => onUpdate(layer.id, { filterType: e.target.value })}
                          options={[
                              { value: 'none', label: 'Passthrough' },
                              { value: 'dither', label: 'Dither (1-bit)' },
                              { value: 'threshold', label: 'Threshold' },
                              { value: 'grayscale', label: 'Grayscale' }
                          ]}
                        />
                      </InputRow>
                      <InputRow label="Blend Mode">
                        <StudioSelect
                          value={layer.blendMode || 'normal'}
                          onChange={(e) => onUpdate(layer.id, { blendMode: e.target.value })}
                          options={[
                              { value: 'normal', label: 'Normal' },
                              { value: 'screen', label: 'Screen' },
                              { value: 'multiply', label: 'Multiply' },
                              { value: 'overlay', label: 'Overlay' }
                          ]}
                        />
                      </InputRow>
                   </div>
                   
                   {/* ADJUSTMENTS */}
                   <div className="pt-2">
                       <AdjustmentSlider 
                          icon={Sun} label="Brightness" unit="%" 
                          value={layer.brightness ?? 100} min={0} max={200}
                          onChange={(e) => onUpdate(layer.id, { brightness: Number(e.target.value) })}
                       />
                       <AdjustmentSlider 
                          icon={CircleDashed} label="Contrast" unit="%" 
                          value={layer.contrast ?? 100} min={0} max={200}
                          onChange={(e) => onUpdate(layer.id, { contrast: Number(e.target.value) })}
                       />
                       <AdjustmentSlider 
                          icon={Droplet} label="Blur" unit="px" 
                          value={layer.blur ?? 0} min={0} max={20}
                          onChange={(e) => onUpdate(layer.id, { blur: Number(e.target.value) })}
                       />
                   </div>
               </div>
           )}
        </div>
      )}

      {/* PERMISSIONS */}
      {isStudio && (
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 border border-[#E3E3FD]/20 bg-[#E3E3FD]/5">
             <div className="w-3 h-3 flex items-center justify-center relative">
                 <input 
                    type="checkbox" 
                    id={`allow-${layer.id}`}
                    checked={layer.allowContentChange}
                    onChange={(e) => onUpdate(layer.id, { allowContentChange: e.target.checked })}
                    className="appearance-none w-3 h-3 border border-[#E3E3FD] bg-transparent checked:bg-[#E3E3FD]"
                  />
                  {layer.allowContentChange && <Check size={10} className="text-black absolute pointer-events-none" />}
             </div>
             <label htmlFor={`allow-${layer.id}`} className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest cursor-pointer select-none">Allow Client Modification</label>
          </div>
        </div>
      )}

      {/* STYLE & TRANSFORM */}
      {isStudio && (
        <div className="pt-4 border-t border-white/10 space-y-4">
           {/* Borders */}
           <div>
             <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Border Style</span>
             <div className="grid grid-cols-3 gap-2">
                <InputRow label="Width">
                   <StudioInput type="number" value={layer.borderWidth || 0} onChange={(e) => onUpdate(layer.id, { borderWidth: Number(e.target.value) })} />
                </InputRow>
                <InputRow label="Radius">
                   <StudioInput type="number" value={layer.borderRadius || 0} onChange={(e) => onUpdate(layer.id, { borderRadius: Number(e.target.value) })} />
                </InputRow>
                <InputRow label="Color">
                   <input type="color" value={layer.borderColor || '#ffffff'} onChange={(e) => onUpdate(layer.id, { borderColor: e.target.value })} className="w-full h-[26px] bg-transparent border border-white/10" />
                </InputRow>
             </div>
           </div>

           {/* Shadow */}
           <div>
               <div className="flex items-center justify-between mb-2">
                   <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Box Shadow</span>
                   <button 
                       onClick={() => onUpdate(layer.id, { shadow: !layer.shadow })}
                       className={`w-8 h-4 rounded-full transition-colors relative ${layer.shadow ? 'bg-[#E3E3FD]' : 'bg-white/10'}`}
                   >
                       <div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-transform ${layer.shadow ? 'left-4.5' : 'left-0.5'}`} style={{ left: layer.shadow ? '18px' : '2px' }} />
                   </button>
               </div>
               {layer.shadow && (
                   <div className="space-y-2 p-2 border border-white/10 bg-white/5">
                       <div className="grid grid-cols-2 gap-2">
                           <InputRow label="Blur">
                               <StudioInput type="number" value={layer.shadowBlur || 10} onChange={(e) => onUpdate(layer.id, { shadowBlur: Number(e.target.value) })} />
                           </InputRow>
                           <InputRow label="Color">
                               <input type="color" value={layer.shadowColor || '#000000'} onChange={(e) => onUpdate(layer.id, { shadowColor: e.target.value })} className="w-full h-[26px] bg-transparent border border-white/10" />
                           </InputRow>
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                           <InputRow label="X Offset">
                               <StudioInput type="number" value={layer.shadowX || 0} onChange={(e) => onUpdate(layer.id, { shadowX: Number(e.target.value) })} />
                           </InputRow>
                           <InputRow label="Y Offset">
                               <StudioInput type="number" value={layer.shadowY || 4} onChange={(e) => onUpdate(layer.id, { shadowY: Number(e.target.value) })} />
                           </InputRow>
                       </div>
                   </div>
               )}
           </div>

           {/* Transform */}
           <div>
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Transform</span>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                    <span className="font-mono text-[9px] text-white/30 w-6">X</span>
                    <span className="font-mono text-[10px] text-white">{Math.round(layer.x)}</span>
                </div>
                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                    <span className="font-mono text-[9px] text-white/30 w-6">Y</span>
                    <span className="font-mono text-[10px] text-white">{Math.round(layer.y)}</span>
                </div>
                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                    <span className="font-mono text-[9px] text-white/30 w-6">W</span>
                    <span className="font-mono text-[10px] text-white">{Math.round(layer.width)}</span>
                </div>
                <div className="flex items-center bg-[#0A0A0A] border border-white/10 px-2 py-1.5">
                    <span className="font-mono text-[9px] text-white/30 w-6">H</span>
                    <span className="font-mono text-[10px] text-white">{Math.round(layer.height)}</span>
                </div>
            </div>
            {/* Flip Controls */}
            <div className="flex gap-2">
                <button 
                    onClick={() => onUpdate(layer.id, { flipX: !layer.flipX })}
                    className={`flex-1 p-2 border ${layer.flipX ? 'bg-white/10 text-white border-white/20' : 'border-white/10 text-white/40 hover:text-white'} flex items-center justify-center gap-2 transition-colors`}
                    title="Flip Horizontal"
                >
                    <FlipHorizontal size={14} />
                </button>
                <button 
                    onClick={() => onUpdate(layer.id, { flipY: !layer.flipY })}
                    className={`flex-1 p-2 border ${layer.flipY ? 'bg-white/10 text-white border-white/20' : 'border-white/10 text-white/40 hover:text-white'} flex items-center justify-center gap-2 transition-colors`}
                    title="Flip Vertical"
                >
                    <FlipVertical size={14} />
                </button>
            </div>
           </div>

           {/* Alignment Tools */}
           <div>
            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">Align & Distribute</span>
            <div className="grid grid-cols-4 gap-1 mb-2">
                <button onClick={() => handleAlign('left')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Align Left"><AlignLeft size={14} /></button>
                <button onClick={() => handleAlign('center')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Align Center"><AlignCenter size={14} /></button>
                <button onClick={() => handleAlign('right')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Align Right"><AlignRight size={14} /></button>
                <button onClick={() => handleAlign('middle')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Align Middle"><AlignHorizontalDistributeCenter size={14} /></button>
            </div>
            <div className="grid grid-cols-4 gap-1">
                 <button onClick={() => handleAlign('top')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Align Top"><ArrowUp size={14} /></button>
                 <button onClick={() => handleAlign('bottom')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Align Bottom"><ArrowDown size={14} /></button>
                 <button onClick={() => onDistribute && onDistribute('x')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Distribute Horizontally"><AlignHorizontalDistributeCenter size={14} /></button>
                 <button onClick={() => onDistribute && onDistribute('y')} className="p-2 border border-transparent hover:bg-white/5 hover:text-white text-white/60 transition-colors rounded-[1px]" title="Distribute Vertically"><AlignVerticalDistributeCenter size={14} /></button>
            </div>
           </div>
        </div>
      )}
    </div>
  );
};
