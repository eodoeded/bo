// V2 Shared Component: PreviewCanvas
// Renders the "mini-tool" based on dynamic layer list

import React from 'react';

// Layer Components
const TextLayerRender = ({ layer }) => {
    return (
        <div 
            className="absolute whitespace-pre-wrap"
            style={{
                left: `${layer.properties.x}%`,
                top: `${layer.properties.y}%`,
                transform: 'translate(-50%, -50%)', // Centered anchor
                fontSize: `${layer.properties.fontSize}px`,
                fontFamily: layer.properties.fontFamily || 'PP Neue Montreal',
                color: layer.properties.color,
                fontWeight: layer.properties.fontWeight || 400,
                textAlign: layer.properties.textAlign || 'center',
                width: layer.properties.width ? `${layer.properties.width}px` : 'auto',
                maxWidth: '100%',
                zIndex: layer.zIndex
            }}
        >
            {layer.properties.text}
        </div>
    );
};

const ImageLayerRender = ({ layer }) => {
    return (
        <div 
            className="absolute overflow-hidden"
            style={{
                left: `${layer.properties.x}%`,
                top: `${layer.properties.y}%`,
                transform: 'translate(-50%, -50%)',
                width: `${layer.properties.width}px`,
                height: `${layer.properties.height}px`,
                backgroundColor: layer.properties.src ? 'transparent' : '#261E19', // Placeholder color
                zIndex: layer.zIndex
            }}
        >
            {layer.properties.src ? (
                <img 
                    src={layer.properties.src} 
                    alt="Layer" 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center border border-white/10 bg-white/5">
                     <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Image Area</span>
                </div>
            )}
        </div>
    );
};

const RectangleLayerRender = ({ layer }) => {
    return (
        <div 
             style={{
                position: 'absolute',
                left: `${layer.properties.x}%`,
                top: `${layer.properties.y}%`,
                transform: 'translate(-50%, -50%)',
                width: `${layer.properties.width}px`,
                height: `${layer.properties.height}px`,
                backgroundColor: layer.properties.color,
                zIndex: layer.zIndex
            }}
        />
    );
};

export default function PreviewCanvas({ layers }) {
    return (
        <div 
            id="preview-canvas"
            className="w-full h-full bg-[#050505] relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-2xl"
        >
            {/* Background Generative Element (Static for now, could be a layer) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute inset-0" style={{ 
                        backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }}></div>
            </div>

            {/* Dynamic Layers */}
            {layers.map(layer => {
                switch(layer.type) {
                    case 'text': return <TextLayerRender key={layer.id} layer={layer} />;
                    case 'image': return <ImageLayerRender key={layer.id} layer={layer} />;
                    case 'rectangle': return <RectangleLayerRender key={layer.id} layer={layer} />;
                    default: return null;
                }
            })}

            {/* Technical Overlay (Static Branding) */}
            <div className="absolute bottom-3 left-3 font-mono text-[8px] text-white/20 z-[9999] pointer-events-none flex items-center gap-2">
                <div className="w-1 h-1 bg-[#E3E3FD] rounded-full opacity-40"></div>
                <span>GENERATED_BY_BO_SYSTEM_V2</span>
            </div>
        </div>
    );
}

