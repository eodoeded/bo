// V2 Shared Component: PreviewCanvas
// Renders the "mini-tool" based on dynamic layer list
// In Studio mode: Interactive (clickable, draggable)
// In Client mode: Read-only preview

import React, { useState, useRef } from 'react';

// Layer Components
const TextLayerRender = ({ layer, isSelected, onSelect, onUpdate, isStudio = false }) => {
    const isPositionLocked = layer.locks?.x === 'LOCKED' && layer.locks?.y === 'LOCKED';
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, layerX: 0, layerY: 0 });

    const handlePointerDown = (e) => {
        if (!isStudio || isPositionLocked || !onUpdate) return;
        
        e.stopPropagation();
        if (onSelect) onSelect(layer.id);
        
        const canvas = e.currentTarget.closest('#preview-canvas');
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            layerX: layer.properties.x,
            layerY: layer.properties.y,
            canvasWidth,
            canvasHeight
        };
        
        setIsDragging(true);
        canvas.style.cursor = 'grabbing';
        
        const handlePointerMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - dragStartRef.current.x;
            const deltaY = moveEvent.clientY - dragStartRef.current.y;
            
            // Convert pixel delta to percentage
            const percentDeltaX = (deltaX / dragStartRef.current.canvasWidth) * 100;
            const percentDeltaY = (deltaY / dragStartRef.current.canvasHeight) * 100;
            
            let newX = dragStartRef.current.layerX + percentDeltaX;
            let newY = dragStartRef.current.layerY + percentDeltaY;
            
            // Clamp to canvas bounds (0-100%)
            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));
            
            // Update only unlocked axes
            const updates = {};
            if (layer.locks?.x !== 'LOCKED') updates.x = newX;
            if (layer.locks?.y !== 'LOCKED') updates.y = newY;
            
            if (Object.keys(updates).length > 0) {
                onUpdate(layer.id, { properties: { ...layer.properties, ...updates } });
            }
        };
        
        const handlePointerUp = () => {
            setIsDragging(false);
            canvas.style.cursor = '';
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
        
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
    };
    
    return (
        <div 
            className={`absolute whitespace-pre-wrap ${isStudio && !isPositionLocked ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : isStudio ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-[#E3E3FD] ring-offset-2 ring-offset-[#050505]' : ''} ${isStudio && !isPositionLocked ? 'hover:ring-1 hover:ring-white/30' : ''}`}
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
            onClick={(e) => {
                if (isStudio && onSelect && !isDragging) {
                    e.stopPropagation();
                    onSelect(layer.id);
                }
            }}
            onPointerDown={handlePointerDown}
        >
            {layer.properties.text}
        </div>
    );
};

const ImageLayerRender = ({ layer, isSelected, onSelect, onUpdate, isStudio = false }) => {
    const isPositionLocked = layer.locks?.x === 'LOCKED' && layer.locks?.y === 'LOCKED';
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, layerX: 0, layerY: 0 });

    const handlePointerDown = (e) => {
        if (!isStudio || isPositionLocked || !onUpdate) return;
        
        e.stopPropagation();
        if (onSelect) onSelect(layer.id);
        
        const canvas = e.currentTarget.closest('#preview-canvas');
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            layerX: layer.properties.x,
            layerY: layer.properties.y,
            canvasWidth,
            canvasHeight
        };
        
        setIsDragging(true);
        canvas.style.cursor = 'grabbing';
        
        const handlePointerMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - dragStartRef.current.x;
            const deltaY = moveEvent.clientY - dragStartRef.current.y;
            
            const percentDeltaX = (deltaX / dragStartRef.current.canvasWidth) * 100;
            const percentDeltaY = (deltaY / dragStartRef.current.canvasHeight) * 100;
            
            let newX = dragStartRef.current.layerX + percentDeltaX;
            let newY = dragStartRef.current.layerY + percentDeltaY;
            
            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));
            
            const updates = {};
            if (layer.locks?.x !== 'LOCKED') updates.x = newX;
            if (layer.locks?.y !== 'LOCKED') updates.y = newY;
            
            if (Object.keys(updates).length > 0) {
                onUpdate(layer.id, { properties: { ...layer.properties, ...updates } });
            }
        };
        
        const handlePointerUp = () => {
            setIsDragging(false);
            canvas.style.cursor = '';
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
        
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
    };
    
    return (
        <div 
            className={`absolute overflow-hidden ${isStudio && !isPositionLocked ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : isStudio ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-[#E3E3FD] ring-offset-2 ring-offset-[#050505]' : ''} ${isStudio && !isPositionLocked ? 'hover:ring-1 hover:ring-white/30' : ''}`}
            style={{
                left: `${layer.properties.x}%`,
                top: `${layer.properties.y}%`,
                transform: 'translate(-50%, -50%)',
                width: `${layer.properties.width}px`,
                height: `${layer.properties.height}px`,
                backgroundColor: layer.properties.src ? 'transparent' : '#261E19',
                zIndex: layer.zIndex
            }}
            onClick={(e) => {
                if (isStudio && onSelect && !isDragging) {
                    e.stopPropagation();
                    onSelect(layer.id);
                }
            }}
            onPointerDown={handlePointerDown}
        >
            {layer.properties.src ? (
                <img 
                    src={layer.properties.src} 
                    alt="Layer" 
                    className="w-full h-full object-cover pointer-events-none"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center border border-white/10 bg-white/5 pointer-events-none">
                     <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Image Area</span>
                </div>
            )}
        </div>
    );
};

const RectangleLayerRender = ({ layer, isSelected, onSelect, onUpdate, isStudio = false }) => {
    const isPositionLocked = layer.locks?.x === 'LOCKED' && layer.locks?.y === 'LOCKED';
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, layerX: 0, layerY: 0 });

    const handlePointerDown = (e) => {
        if (!isStudio || isPositionLocked || !onUpdate) return;
        
        e.stopPropagation();
        if (onSelect) onSelect(layer.id);
        
        const canvas = e.currentTarget.closest('#preview-canvas');
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            layerX: layer.properties.x,
            layerY: layer.properties.y,
            canvasWidth,
            canvasHeight
        };
        
        setIsDragging(true);
        canvas.style.cursor = 'grabbing';
        
        const handlePointerMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - dragStartRef.current.x;
            const deltaY = moveEvent.clientY - dragStartRef.current.y;
            
            const percentDeltaX = (deltaX / dragStartRef.current.canvasWidth) * 100;
            const percentDeltaY = (deltaY / dragStartRef.current.canvasHeight) * 100;
            
            let newX = dragStartRef.current.layerX + percentDeltaX;
            let newY = dragStartRef.current.layerY + percentDeltaY;
            
            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));
            
            const updates = {};
            if (layer.locks?.x !== 'LOCKED') updates.x = newX;
            if (layer.locks?.y !== 'LOCKED') updates.y = newY;
            
            if (Object.keys(updates).length > 0) {
                onUpdate(layer.id, { properties: { ...layer.properties, ...updates } });
            }
        };
        
        const handlePointerUp = () => {
            setIsDragging(false);
            canvas.style.cursor = '';
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
        
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
    };
    
    return (
        <div 
            className={`absolute ${isStudio && !isPositionLocked ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : isStudio ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-[#E3E3FD] ring-offset-2 ring-offset-[#050505]' : ''} ${isStudio && !isPositionLocked ? 'hover:ring-1 hover:ring-white/30' : ''}`}
            style={{
                left: `${layer.properties.x}%`,
                top: `${layer.properties.y}%`,
                transform: 'translate(-50%, -50%)',
                width: `${layer.properties.width}px`,
                height: `${layer.properties.height}px`,
                backgroundColor: layer.properties.color,
                zIndex: layer.zIndex
            }}
            onClick={(e) => {
                if (isStudio && onSelect && !isDragging) {
                    e.stopPropagation();
                    onSelect(layer.id);
                }
            }}
            onPointerDown={handlePointerDown}
        />
    );
};

export default function PreviewCanvas({ layers, selectedLayerId, onSelectLayer, onUpdateLayer, isStudio = false }) {
    return (
        <div 
            id="preview-canvas"
            className={`w-full h-full bg-[#050505] relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-2xl ${isStudio ? 'cursor-default' : ''}`}
            onClick={() => {
                // Click canvas to deselect
                if (isStudio && onSelectLayer) {
                    onSelectLayer(null);
                }
            }}
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
                const isSelected = layer.id === selectedLayerId;
                switch(layer.type) {
                    case 'text': return <TextLayerRender key={layer.id} layer={layer} isSelected={isSelected} onSelect={onSelectLayer} onUpdate={onUpdateLayer} isStudio={isStudio} />;
                    case 'image': return <ImageLayerRender key={layer.id} layer={layer} isSelected={isSelected} onSelect={onSelectLayer} onUpdate={onUpdateLayer} isStudio={isStudio} />;
                    case 'rectangle': return <RectangleLayerRender key={layer.id} layer={layer} isSelected={isSelected} onSelect={onSelectLayer} onUpdate={onUpdateLayer} isStudio={isStudio} />;
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

