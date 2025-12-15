// Resize Handles Component (Figma-like)
// 8 handles: 4 corners + 4 edges
// Respects lock states, supports Shift for constrain proportions

import React, { useState, useRef } from 'react';

const HANDLE_POSITIONS = [
    { position: 'nw', cursor: 'nw-resize', x: 0, y: 0 },      // Top-left
    { position: 'ne', cursor: 'ne-resize', x: 100, y: 0 },    // Top-right
    { position: 'sw', cursor: 'sw-resize', x: 0, y: 100 },    // Bottom-left
    { position: 'se', cursor: 'se-resize', x: 100, y: 100 },  // Bottom-right
    { position: 'n', cursor: 'n-resize', x: 50, y: 0 },        // Top
    { position: 's', cursor: 's-resize', x: 50, y: 100 },     // Bottom
    { position: 'w', cursor: 'w-resize', x: 0, y: 50 },        // Left
    { position: 'e', cursor: 'e-resize', x: 100, y: 50 },      // Right
];

export default function ResizeHandles({ layer, onUpdate, isStudio = false }) {
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState(null);
    const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0, layerX: 0, layerY: 0 });

    // Check if dimensions are locked
    const isWidthLocked = layer.locks?.width === 'LOCKED';
    const isHeightLocked = layer.locks?.height === 'LOCKED';
    const isPositionLocked = layer.locks?.x === 'LOCKED' && layer.locks?.y === 'LOCKED';

    // Don't show handles if everything is locked or not in studio mode
    if (!isStudio || (isWidthLocked && isHeightLocked && isPositionLocked)) {
        return null;
    }

    const handlePointerDown = (e, handlePosition) => {
        e.stopPropagation();
        
        const canvas = e.currentTarget.closest('#preview-canvas');
        if (!canvas) return;
        
        const canvasRect = canvas.getBoundingClientRect();
        const canvasWidth = canvasRect.width;
        const canvasHeight = canvasRect.height;
        
        // Get layer's current bounds in pixels
        const layerXPercent = layer.properties.x;
        const layerYPercent = layer.properties.y;
        const layerWidth = layer.properties.width || 100;
        const layerHeight = layer.properties.height || 100;
        
        // Convert percentage to pixels
        const layerXPixels = (layerXPercent / 100) * canvasWidth;
        const layerYPixels = (layerYPercent / 100) * canvasHeight;
        
        // Calculate layer bounds
        const layerLeft = layerXPixels - (layerWidth / 2);
        const layerTop = layerYPixels - (layerHeight / 2);
        const layerRight = layerLeft + layerWidth;
        const layerBottom = layerTop + layerHeight;
        
        resizeStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            width: layerWidth,
            height: layerHeight,
            layerX: layerXPercent,
            layerY: layerYPercent,
            layerLeft,
            layerTop,
            layerRight,
            layerBottom,
            canvasWidth,
            canvasHeight,
            aspectRatio: layerWidth / layerHeight
        };
        
        setIsResizing(true);
        setResizeHandle(handlePosition);
        
        const handlePointerMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - resizeStartRef.current.x;
            const deltaY = moveEvent.clientY - resizeStartRef.current.y;
            
            // Convert pixel delta to percentage (for position updates)
            const percentDeltaX = (deltaX / resizeStartRef.current.canvasWidth) * 100;
            const percentDeltaY = (deltaY / resizeStartRef.current.canvasHeight) * 100;
            
            let newWidth = resizeStartRef.current.width;
            let newHeight = resizeStartRef.current.height;
            let newX = resizeStartRef.current.layerX;
            let newY = resizeStartRef.current.layerY;
            
            const isShiftPressed = moveEvent.shiftKey;
            const constrainProportions = isShiftPressed;
            
            // Handle resize based on handle position
            switch (handlePosition) {
                case 'nw': // Top-left
                    newWidth = resizeStartRef.current.width - deltaX;
                    newHeight = resizeStartRef.current.height - deltaY;
                    if (constrainProportions) {
                        const ratio = resizeStartRef.current.aspectRatio;
                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            newHeight = newWidth / ratio;
                        } else {
                            newWidth = newHeight * ratio;
                        }
                    }
                    if (!isWidthLocked) {
                        newX = resizeStartRef.current.layerX - ((resizeStartRef.current.width - newWidth) / resizeStartRef.current.canvasWidth) * 100;
                    }
                    if (!isHeightLocked) {
                        newY = resizeStartRef.current.layerY - ((resizeStartRef.current.height - newHeight) / resizeStartRef.current.canvasHeight) * 100;
                    }
                    break;
                case 'ne': // Top-right
                    newWidth = resizeStartRef.current.width + deltaX;
                    newHeight = resizeStartRef.current.height - deltaY;
                    if (constrainProportions) {
                        const ratio = resizeStartRef.current.aspectRatio;
                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            newHeight = newWidth / ratio;
                        } else {
                            newWidth = newHeight * ratio;
                        }
                    }
                    if (!isHeightLocked) {
                        newY = resizeStartRef.current.layerY - ((resizeStartRef.current.height - newHeight) / resizeStartRef.current.canvasHeight) * 100;
                    }
                    break;
                case 'sw': // Bottom-left
                    newWidth = resizeStartRef.current.width - deltaX;
                    newHeight = resizeStartRef.current.height + deltaY;
                    if (constrainProportions) {
                        const ratio = resizeStartRef.current.aspectRatio;
                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            newHeight = newWidth / ratio;
                        } else {
                            newWidth = newHeight * ratio;
                        }
                    }
                    if (!isWidthLocked) {
                        newX = resizeStartRef.current.layerX - ((resizeStartRef.current.width - newWidth) / resizeStartRef.current.canvasWidth) * 100;
                    }
                    break;
                case 'se': // Bottom-right
                    newWidth = resizeStartRef.current.width + deltaX;
                    newHeight = resizeStartRef.current.height + deltaY;
                    if (constrainProportions) {
                        const ratio = resizeStartRef.current.aspectRatio;
                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            newHeight = newWidth / ratio;
                        } else {
                            newWidth = newHeight * ratio;
                        }
                    }
                    break;
                case 'n': // Top
                    newHeight = resizeStartRef.current.height - deltaY;
                    if (!isHeightLocked) {
                        newY = resizeStartRef.current.layerY - ((resizeStartRef.current.height - newHeight) / resizeStartRef.current.canvasHeight) * 100;
                    }
                    break;
                case 's': // Bottom
                    newHeight = resizeStartRef.current.height + deltaY;
                    break;
                case 'w': // Left
                    newWidth = resizeStartRef.current.width - deltaX;
                    if (!isWidthLocked) {
                        newX = resizeStartRef.current.layerX - ((resizeStartRef.current.width - newWidth) / resizeStartRef.current.canvasWidth) * 100;
                    }
                    break;
                case 'e': // Right
                    newWidth = resizeStartRef.current.width + deltaX;
                    break;
            }
            
            // Minimum size constraints
            newWidth = Math.max(10, newWidth);
            newHeight = Math.max(10, newHeight);
            
            // Clamp position to canvas bounds
            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));
            
            // Build updates object respecting locks
            const updates = {};
            if (!isWidthLocked) updates.width = Math.round(newWidth);
            if (!isHeightLocked) updates.height = Math.round(newHeight);
            if (layer.locks?.x !== 'LOCKED') updates.x = newX;
            if (layer.locks?.y !== 'LOCKED') updates.y = newY;
            
            if (Object.keys(updates).length > 0) {
                onUpdate(layer.id, { properties: { ...layer.properties, ...updates } });
            }
        };
        
        const handlePointerUp = () => {
            setIsResizing(false);
            setResizeHandle(null);
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
        
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
    };

    // Get layer bounds for handle positioning
    const layerWidth = layer.properties.width || 100;
    const layerHeight = layer.properties.height || 100;

    return (
        <>
            {HANDLE_POSITIONS.map(handle => {
                // Skip handles if dimension is locked
                if (
                    (handle.position.includes('n') || handle.position.includes('s')) && isHeightLocked ||
                    (handle.position.includes('w') || handle.position.includes('e')) && isWidthLocked
                ) {
                    return null;
                }
                
                // Calculate handle position in pixels relative to layer center
                let leftOffset = 0;
                let topOffset = 0;
                
                if (handle.x === 0) leftOffset = -layerWidth / 2; // Left edge
                else if (handle.x === 100) leftOffset = layerWidth / 2; // Right edge
                else leftOffset = 0; // Center (50%)
                
                if (handle.y === 0) topOffset = -layerHeight / 2; // Top edge
                else if (handle.y === 100) topOffset = layerHeight / 2; // Bottom edge
                else topOffset = 0; // Center (50%)
                
                return (
                    <div
                        key={handle.position}
                        className={`absolute w-2.5 h-2.5 bg-[#E3E3FD] border border-[#050505] rounded-sm z-[10000] ${isResizing && resizeHandle === handle.position ? 'opacity-100 scale-125' : 'opacity-80 hover:opacity-100 hover:scale-110'} transition-all`}
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${leftOffset}px), calc(-50% + ${topOffset}px))`,
                            cursor: handle.cursor,
                        }}
                        onPointerDown={(e) => handlePointerDown(e, handle.position)}
                    />
                );
            })}
        </>
    );
}

