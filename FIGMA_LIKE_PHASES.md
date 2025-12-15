# Making Branded Objects Work Like Figma (Phased Approach)

## Goal
Make the studio tool feel like Figma, but with permission-based locking.

## Current State
- ✅ Layers can be added
- ✅ Layers can be selected (via LayerStack)
- ✅ Properties can be edited (via Inspector)
- ❌ Can't click layers on canvas
- ❌ Can't drag layers visually
- ❌ No visual selection indicators on canvas

## Phase 1: Interactive Canvas (Current)
- [x] Make layers clickable on canvas
- [x] Show selection indicators (outline/border)
- [x] Click canvas to deselect
- [x] Visual feedback when hovering layers

## Phase 2: Drag to Move
- [ ] Drag layers to move (if position unlocked)
- [ ] Show drag cursor when hovering movable layers
- [ ] Snap to grid (optional)
- [ ] Constrain movement (if X or Y locked)

## Phase 3: Visual Resize
- [ ] Resize handles on selected layers
- [ ] Drag handles to resize (if dimensions unlocked)
- [ ] Maintain aspect ratio (optional)
- [ ] Constrain resize (if width/height locked)

## Phase 4: Polish
- [ ] Multi-select (Shift+Click)
- [ ] Keyboard shortcuts (Delete, Arrow keys)
- [ ] Copy/paste layers
- [ ] Undo/redo
- [ ] Layer reordering (drag in LayerStack)

