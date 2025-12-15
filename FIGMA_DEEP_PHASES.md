# Making Branded Objects Work Like Figma - Deep Phased Approach

## Goal
Transform the studio tool into a Figma-like experience with permission-based locking.

## Current State
✅ Click layers to select
✅ Drag layers to move
✅ Delete layers
✅ Visual selection indicators
✅ Keyboard shortcuts (Delete, Escape)

## Phase 1: Visual Selection & Feedback ✅ (Complete)
- [x] Selection rings on canvas
- [x] Hover states
- [x] Click to select/deselect

## Phase 2: Drag to Move ✅ (Complete)
- [x] Drag layers to reposition
- [x] Respect lock states
- [x] Cursor feedback

## Phase 3: Transform Controls (Current)
- [ ] Resize handles (8 handles: corners + edges)
- [ ] Rotate handle (optional)
- [ ] Constrain proportions (Shift key)
- [ ] Snap to grid (optional)
- [ ] Respect dimension locks

## Phase 4: Multi-Select
- [ ] Shift+Click to multi-select
- [ ] Box selection (drag to select multiple)
- [ ] Group selection (move together)
- [ ] Multi-edit in Inspector

## Phase 5: Layer Management
- [ ] Drag to reorder in LayerStack
- [ ] Duplicate layer (Cmd+D)
- [ ] Copy/Paste (Cmd+C, Cmd+V)
- [ ] Layer groups/folders

## Phase 6: Keyboard Navigation
- [ ] Arrow keys to nudge (1px, Shift+Arrow = 10px)
- [ ] Tab to cycle selection
- [ ] Cmd+A to select all
- [ ] Cmd+D to duplicate

## Phase 7: Undo/Redo
- [ ] History stack
- [ ] Cmd+Z / Cmd+Shift+Z
- [ ] Visual history indicator

## Phase 8: Advanced Features
- [ ] Alignment guides (smart guides)
- [ ] Snap to other layers
- [ ] Layer visibility toggle
- [ ] Layer opacity
- [ ] Blending modes

---

## Implementation Priority

**Phase 3 (Transform Controls)** is next - this is the most "Figma-like" feature missing.

