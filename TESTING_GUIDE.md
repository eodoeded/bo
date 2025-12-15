# Branded Objects - Testing Guide

## Quick Test: Does It Work Like Figma?

### ✅ Phase 1: Interactive Canvas (Complete)
1. **Open Tool Builder** → `/studio/builder/new` or existing tool
2. **Click a layer on canvas** → Should show selection ring (lavender outline)
3. **Click canvas background** → Should deselect
4. **Click layer in LayerStack** → Should select and show ring

### ✅ Phase 2: Drag to Move (Complete)
1. **Select a layer** (text, image, or rectangle)
2. **Check lock states in Inspector**:
   - If X is LOCKED → Can't drag horizontally
   - If Y is LOCKED → Can't drag vertically
   - If both unlocked → Can drag freely
3. **Drag layer** → Should move (respecting locks)
4. **Cursor changes** → `cursor-grab` when hovering, `cursor-grabbing` when dragging

### ✅ Phase 3: Delete Layers (Complete)
1. **Select a layer**
2. **Press Delete or Backspace** → Layer deleted
3. **Or click trash icon** in LayerStack (on hover/select)
4. **Escape key** → Deselects layer

---

## End-to-End Test

### Studio Workflow
1. **Sign Up** → `/signup` → Create account
2. **Sign In** → `/login` → Log in
3. **Dashboard** → `/studio` → See tools list
4. **Create Tool** → Click "INITIALIZE_NEW_TOOL"
5. **Add Layers**:
   - Click text icon → Add text layer
   - Click image icon → Add image layer
   - Click rectangle icon → Add rectangle layer
6. **Select Layer** → Click on canvas or in LayerStack
7. **Edit Properties** → Change in Inspector
8. **Set Locks** → Click lock badge to cycle: LOCKED → READ_ONLY → CLIENT_INPUT
9. **Drag to Move** → Drag layer (if position unlocked)
10. **Delete Layer** → Press Delete key or trash icon
11. **Publish** → Click "PUBLISH" button
12. **Copy Runner Link** → `/tool/:id` shown in Inspector

### Client Workflow
1. **Open Tool** → `/tool/:id` (from published tool)
2. **See Inputs** → Only CLIENT_INPUT fields visible
3. **Edit Content** → Type in text inputs
4. **Live Preview** → Canvas updates in real-time
5. **Export** → Click "EXPORT_PRODUCTION_PNG"
6. **Download** → PNG downloads to computer

---

## What Should Work

### ✅ Studio Builder
- [x] Click layers on canvas to select
- [x] Drag layers to move (if unlocked)
- [x] Delete layers (keyboard or button)
- [x] Edit properties in Inspector
- [x] Set lock states
- [x] Add new layers
- [x] Auto-save
- [x] Publish tool

### ✅ Client Runner
- [x] Load published tool
- [x] See only CLIENT_INPUT fields
- [x] Edit inputs
- [x] Live preview updates
- [x] Export PNG

### ✅ Lock Enforcement
- [x] LOCKED properties hidden in client view
- [x] READ_ONLY properties visible but not editable
- [x] CLIENT_INPUT properties editable
- [x] Drag respects lock states (can't drag if locked)

---

## Known Limitations

### Phase 2 Features (Not Yet Implemented)
- [ ] Resize handles (drag corners to resize)
- [ ] Multi-select (Shift+Click)
- [ ] Copy/paste layers
- [ ] Undo/redo
- [ ] Layer reordering (drag in LayerStack)

### Phase 3 Features (Future)
- [ ] Image file upload (currently URL only)
- [ ] Cloud asset storage (currently local download)
- [ ] Tool versioning UI
- [ ] Analytics dashboard

---

## Testing Checklist

### Basic Functionality
- [ ] Can sign up
- [ ] Can sign in
- [ ] Can create tool
- [ ] Can add layers
- [ ] Can select layers (canvas + LayerStack)
- [ ] Can drag layers (if unlocked)
- [ ] Can delete layers
- [ ] Can edit properties
- [ ] Can set locks
- [ ] Can publish tool
- [ ] Can access published tool
- [ ] Can edit CLIENT_INPUT fields
- [ ] Can export PNG

### Lock System
- [ ] LOCKED properties hidden in client view
- [ ] READ_ONLY properties visible but not editable
- [ ] CLIENT_INPUT properties editable
- [ ] Drag respects X lock (can't drag horizontally if X locked)
- [ ] Drag respects Y lock (can't drag vertically if Y locked)

### Edge Cases
- [ ] Delete last layer
- [ ] Delete selected layer (should deselect)
- [ ] Drag locked layer (should not move)
- [ ] Access unpublished tool (should show error or redirect)
- [ ] Access invalid tool ID (should show error)

---

## How to Test

1. **Start Dev Server**: `npm run dev`
2. **Open**: `http://localhost:5173`
3. **Sign Up**: Create a test account
4. **Create Tool**: Build a simple tool with 2-3 layers
5. **Test Interactions**: Click, drag, delete
6. **Publish**: Make tool public
7. **Test Client View**: Open `/tool/:id` in incognito window
8. **Verify Locks**: Only CLIENT_INPUT fields should be visible

---

## Success Criteria

✅ **It works like Figma** if:
- You can click layers on canvas
- You can drag layers to move them
- You can delete layers with keyboard
- Selection is visual (ring around layer)
- Properties panel updates when layer selected

✅ **Locks work** if:
- LOCKED properties are hidden in client view
- READ_ONLY properties are visible but not editable
- CLIENT_INPUT properties are editable
- Drag respects lock states

✅ **Product is functional** if:
- Studios can build tools
- Studios can publish tools
- Clients can use published tools
- Clients can export assets

