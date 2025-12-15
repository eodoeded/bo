// V2 Shared Component: PreviewCanvas
// Renders the "mini-tool" based on dynamic layer list
// In Studio mode: Interactive (clickable, draggable, resizable)
// In Client mode: Read-only preview

import React, { useState, useRef } from 'react';
import ResizeHandles from './ResizeHandles';
import { safeStopPropagation } from '../../utils/eventHelpers';

// Layer Components
const TextLayerRender = ({ layer, isSelected, onSelect, onUpdate, isStudio = false }) => {
    if (!layer || !layer.properties) return null;
    
    const isPositionLocked = layer.locks?.x === 'LOCKED' && layer.locks?.y === 'LOCKED';
    const isTextLocked = layer.locks?.text === 'LOCKED' || layer.locks?.text === 'READ_ONLY';
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(layer.properties.text || '');
    const inputRef = useRef(null);
    const dragStartRef = useRef({ x: 0, y: 0, layerX: 0, layerY: 0, hasStarted: false });
    const clickTimeoutRef = useRef(null);

    // Handle double-click to edit
    const handleDoubleClick = (e) => {
        if (!isStudio || isTextLocked || !onUpdate || !e) return;
        if (typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
        if (onSelect) onSelect(layer.id);
        setIsEditing(true);
        setEditText(layer.properties.text || '');
    };

    // Handle single click (with delay to detect double-click)
    const handleClick = (e) => {
        if (!isStudio || isEditing || !e) return;
        
        if (clickTimeoutRef.current) {
            // Double-click detected
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
            handleDoubleClick(e);
        } else {
            // Single click - wait to see if double-click comes
            clickTimeoutRef.current = setTimeout(() => {
                clickTimeoutRef.current = null;
                if (onSelect && typeof e.stopPropagation === 'function') {
                    e.stopPropagation();
                    onSelect(layer.id);
                }
            }, 300); // 300ms delay to detect double-click
        }
    };

    // Save text edit
    const handleTextSave = () => {
        if (isTextLocked || !onUpdate) return;
        setIsEditing(false);
        if (editText !== layer.properties.text) {
            onUpdate(layer.id, { properties: { ...layer.properties, text: editText } });
        }
    };

    // Cancel text edit
    const handleTextCancel = () => {
        setIsEditing(false);
        setEditText(layer.properties.text || '');
    };

    // Handle keyboard in edit mode
    const handleKeyDown = (e) => {
        if (!e) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextSave();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleTextCancel();
        }
    };

    // Focus input when editing starts
    React.useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handlePointerDown = (e) => {
        if (!isStudio || isPositionLocked || !onUpdate || !e || isEditing) return;
        if (typeof e.stopPropagation !== 'function') return;
        
        e.stopPropagation();
        if (onSelect) onSelect(layer.id);
        
        const canvas = e.currentTarget && e.currentTarget.closest ? e.currentTarget.closest('#preview-canvas') : null;
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        if (!canvasRect) return;
        
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        dragStartRef.current = {
            x: e.clientX || 0,
            y: e.clientY || 0,
            layerX: layer.properties.x,
            layerY: layer.properties.y,
            canvasWidth,
            canvasHeight,
            hasStarted: false
        };
        
        canvas.style.cursor = 'grab';
        
        const handlePointerMove = (moveEvent) => {
            if (!moveEvent || typeof moveEvent.clientX !== 'number' || typeof moveEvent.clientY !== 'number') return;
            const deltaX = moveEvent.clientX - dragStartRef.current.x;
            const deltaY = moveEvent.clientY - dragStartRef.current.y;
            
            // Only start dragging after a small threshold (5px) to prevent accidental drags during double-click
            const dragThreshold = 5;
            if (!dragStartRef.current.hasStarted) {
                if (Math.abs(deltaX) < dragThreshold && Math.abs(deltaY) < dragThreshold) return;
                dragStartRef.current.hasStarted = true;
                setIsDragging(true);
                canvas.style.cursor = 'grabbing';
            }
            
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
            className={`absolute whitespace-pre-wrap ${isStudio && !isPositionLocked ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : isStudio ? (isEditing ? 'cursor-text' : 'cursor-pointer') : ''} ${isSelected ? 'ring-2 ring-[#E3E3FD] ring-offset-2 ring-offset-[#050505]' : ''} ${isStudio && !isPositionLocked && !isEditing ? 'hover:ring-1 hover:ring-white/30' : ''}`}
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
                zIndex: layer.zIndex,
                minWidth: isEditing ? '100px' : 'auto'
            }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
        >
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value || '')}
                    onBlur={handleTextSave}
                    onKeyDown={handleKeyDown}
                    className="bg-white/5 border border-[#E3E3FD]/50 outline-none w-full px-2 py-1 rounded-lg resize-none focus:ring-2 focus:ring-[#E3E3FD]/50"
                    style={{
                        fontSize: `${layer.properties.fontSize}px`,
                        fontFamily: layer.properties.fontFamily || 'PP Neue Montreal',
                        color: layer.properties.color,
                        fontWeight: layer.properties.fontWeight || 400,
                        textAlign: layer.properties.textAlign || 'center',
                        minWidth: '120px',
                        minHeight: `${Math.max(layer.properties.fontSize * 1.5, 32)}px`,
                    }}
                    rows={Math.max(1, editText.split('\n').length)}
                />
            ) : (
                layer.properties.text
            )}
            {isSelected && isStudio && !isEditing && (
                <ResizeHandles layer={layer} onUpdate={onUpdate} isStudio={isStudio} />
            )}
        </div>
    );
};

const ImageLayerRender = ({ layer, isSelected, onSelect, onUpdate, isStudio = false }) => {
    if (!layer || !layer.properties) return null;
    
    const isPositionLocked = layer.locks?.x === 'LOCKED' && layer.locks?.y === 'LOCKED';
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, layerX: 0, layerY: 0, hasStarted: false });

    const handlePointerDown = (e) => {
        if (!isStudio || isPositionLocked || !onUpdate || !e) return;
        if (typeof e.stopPropagation !== 'function') return;
        
        e.stopPropagation();
        if (onSelect) onSelect(layer.id);
        
        const canvas = e.currentTarget && e.currentTarget.closest ? e.currentTarget.closest('#preview-canvas') : null;
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        if (!canvasRect) return;
        
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        dragStartRef.current = {
            x: e.clientX || 0,
            y: e.clientY || 0,
            layerX: layer.properties.x,
            layerY: layer.properties.y,
            canvasWidth,
            canvasHeight,
            hasStarted: false
        };
        
        canvas.style.cursor = 'grab';
        
        const handlePointerMove = (moveEvent) => {
            if (!moveEvent || typeof moveEvent.clientX !== 'number' || typeof moveEvent.clientY !== 'number') return;
            const deltaX = moveEvent.clientX - dragStartRef.current.x;
            const deltaY = moveEvent.clientY - dragStartRef.current.y;
            
            // Only start dragging after a small threshold (5px) to prevent accidental drags
            const dragThreshold = 5;
            if (!dragStartRef.current.hasStarted) {
                if (Math.abs(deltaX) < dragThreshold && Math.abs(deltaY) < dragThreshold) return;
                dragStartRef.current.hasStarted = true;
                setIsDragging(true);
                canvas.style.cursor = 'grabbing';
            }
            
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
            dragStartRef.current.hasStarted = false;
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
                if (isStudio && onSelect && !isDragging && e && typeof e.stopPropagation === 'function') {
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
            {isSelected && isStudio && (
                <ResizeHandles layer={layer} onUpdate={onUpdate} isStudio={isStudio} />
            )}
        </div>
    );
};

const RectangleLayerRender = ({ layer, isSelected, onSelect, onUpdate, isStudio = false }) => {
    if (!layer || !layer.properties) return null;
    
    const isPositionLocked = layer.locks?.x === 'LOCKED' && layer.locks?.y === 'LOCKED';
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 0, y: 0, layerX: 0, layerY: 0, hasStarted: false });

    const handlePointerDown = (e) => {
        if (!isStudio || isPositionLocked || !onUpdate || !e) return;
        if (typeof e.stopPropagation !== 'function') return;
        
        e.stopPropagation();
        if (onSelect) onSelect(layer.id);
        
        const canvas = e.currentTarget && e.currentTarget.closest ? e.currentTarget.closest('#preview-canvas') : null;
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        if (!canvasRect) return;
        
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        dragStartRef.current = {
            x: e.clientX || 0,
            y: e.clientY || 0,
            layerX: layer.properties.x,
            layerY: layer.properties.y,
            canvasWidth,
            canvasHeight,
            hasStarted: false
        };
        
        canvas.style.cursor = 'grab';
        
        const handlePointerMove = (moveEvent) => {
            if (!moveEvent || typeof moveEvent.clientX !== 'number' || typeof moveEvent.clientY !== 'number') return;
            const deltaX = moveEvent.clientX - dragStartRef.current.x;
            const deltaY = moveEvent.clientY - dragStartRef.current.y;
            
            // Only start dragging after a small threshold (5px) to prevent accidental drags
            const dragThreshold = 5;
            if (!dragStartRef.current.hasStarted) {
                if (Math.abs(deltaX) < dragThreshold && Math.abs(deltaY) < dragThreshold) return;
                dragStartRef.current.hasStarted = true;
                setIsDragging(true);
                canvas.style.cursor = 'grabbing';
            }
            
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
            dragStartRef.current.hasStarted = false;
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
                if (isStudio && onSelect && !isDragging && e && typeof e.stopPropagation === 'function') {
                    e.stopPropagation();
                    onSelect(layer.id);
                }
            }}
            onPointerDown={handlePointerDown}
        >
            {isSelected && isStudio && (
                <ResizeHandles layer={layer} onUpdate={onUpdate} isStudio={isStudio} />
            )}
        </div>
    );
};

export default function PreviewCanvas({ layers, selectedLayerId, selectedLayerIds = new Set(), onSelectLayer, onSelectLayers, onUpdateLayer, isStudio = false }) {
    const [boxSelectStart, setBoxSelectStart] = useState(null);
    const [boxSelectEnd, setBoxSelectEnd] = useState(null);
    const [isBoxSelecting, setIsBoxSelecting] = useState(false);

    const handleCanvasPointerDown = (e) => {
        if (!isStudio || !e || !e.target) return;
        
        // Only start box select if clicking on canvas background (not a layer)
        if (e.target.id === 'preview-canvas' || (e.target.closest && e.target.closest('#preview-canvas') === e.currentTarget)) {
            const canvas = e.currentTarget;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            setBoxSelectStart({ x, y });
            setBoxSelectEnd({ x, y });
            setIsBoxSelecting(true);
            
            const handlePointerMove = (moveEvent) => {
                if (!moveEvent || typeof moveEvent.clientX !== 'number' || typeof moveEvent.clientY !== 'number') return;
                const newX = moveEvent.clientX - rect.left;
                const newY = moveEvent.clientY - rect.top;
                setBoxSelectEnd({ x: newX, y: newY });
            };
            
            const handlePointerUp = () => {
                setIsBoxSelecting(false);
                
                // Select layers within box
                if (boxSelectStart && boxSelectEnd && onSelectLayers) {
                    const minX = Math.min(boxSelectStart.x, boxSelectEnd.x);
                    const maxX = Math.max(boxSelectStart.x, boxSelectEnd.x);
                    const minY = Math.min(boxSelectStart.y, boxSelectEnd.y);
                    const maxY = Math.max(boxSelectStart.y, boxSelectEnd.y);
                    
                    const canvasRect = canvas.getBoundingClientRect();
                    const canvasWidth = canvasRect.width;
                    const canvasHeight = canvasRect.height;
                    
                    const selectedIds = (layers || []).filter(layer => {
                        if (!layer || !layer.properties) return false;
                        const layerXPercent = layer.properties.x;
                        const layerYPercent = layer.properties.y;
                        const layerXPixels = (layerXPercent / 100) * canvasWidth;
                        const layerYPixels = (layerYPercent / 100) * canvasHeight;
                        
                        return layerXPixels >= minX && layerXPixels <= maxX &&
                               layerYPixels >= minY && layerYPixels <= maxY;
                    }).map(l => l.id);
                    
                    if (selectedIds.length > 0) {
                        onSelectLayers(selectedIds);
                    } else {
                        onSelectLayer(null);
                    }
                } else {
                    onSelectLayer(null);
                }
                
                setBoxSelectStart(null);
                setBoxSelectEnd(null);
                document.removeEventListener('pointermove', handlePointerMove);
                document.removeEventListener('pointerup', handlePointerUp);
            };
            
            document.addEventListener('pointermove', handlePointerMove);
            document.addEventListener('pointerup', handlePointerUp);
        }
    };

    return (
        <div 
            id="preview-canvas"
            className={`w-full h-full bg-[#050505] relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-2xl ${isStudio ? 'cursor-default' : ''}`}
            onClick={(e) => {
                // Click canvas to deselect (only if not box selecting)
                if (isStudio && onSelectLayer && !isBoxSelecting && e && e.target && e.target.id === 'preview-canvas') {
                    onSelectLayer(null);
                }
            }}
            onPointerDown={handleCanvasPointerDown}
        >
            {/* Background Generative Element (Static for now, could be a layer) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                 <div className="absolute inset-0" style={{ 
                        backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }}></div>
            </div>

            {/* Box Selection Overlay */}
            {isBoxSelecting && boxSelectStart && boxSelectEnd && (
                <div
                    className="absolute border border-[#E3E3FD] bg-[#E3E3FD]/10 pointer-events-none z-[9998]"
                    style={{
                        left: `${Math.min(boxSelectStart.x, boxSelectEnd.x)}px`,
                        top: `${Math.min(boxSelectStart.y, boxSelectEnd.y)}px`,
                        width: `${Math.abs(boxSelectEnd.x - boxSelectStart.x)}px`,
                        height: `${Math.abs(boxSelectEnd.y - boxSelectStart.y)}px`,
                    }}
                />
            )}

            {/* Dynamic Layers */}
            {(layers || []).map(layer => {
                if (!layer || !layer.id || !layer.properties) return null;
                
                const isSelected = layer.id === selectedLayerId;
                const isMultiSelected = selectedLayerIds?.has?.(layer.id) || false;
                const handleLayerClick = (e) => {
                    if (!isStudio || !onSelectLayer || !e) return;
                    if (typeof e.stopPropagation === 'function') {
                        e.stopPropagation();
                    }
                    
                    if (e.shiftKey && onSelectLayers) {
                        // Multi-select: add to selection
                        const newIds = new Set(selectedLayerIds);
                        if (newIds.has(layer.id)) {
                            newIds.delete(layer.id);
                        } else {
                            newIds.add(layer.id);
                        }
                        onSelectLayers(Array.from(newIds));
                    } else {
                        // Single select
                        onSelectLayer(layer.id);
                    }
                };
                
                switch(layer.type) {
                    case 'text': return <TextLayerRender key={layer.id} layer={layer} isSelected={isSelected || isMultiSelected} onSelect={handleLayerClick} onUpdate={onUpdateLayer} isStudio={isStudio} />;
                    case 'image': return <ImageLayerRender key={layer.id} layer={layer} isSelected={isSelected || isMultiSelected} onSelect={handleLayerClick} onUpdate={onUpdateLayer} isStudio={isStudio} />;
                    case 'rectangle': return <RectangleLayerRender key={layer.id} layer={layer} isSelected={isSelected || isMultiSelected} onSelect={handleLayerClick} onUpdate={onUpdateLayer} isStudio={isStudio} />;
                    default: return null;
                }
            })}

            {/* Technical Overlay (Static Branding) */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/20 z-[9999] pointer-events-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full opacity-40"></div>
                <span>GENERATED_BY_BO_SYSTEM_V2</span>
            </div>
        </div>
    );
}

