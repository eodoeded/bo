# Branded Objects Studio Tool - Detailed Purpose

## Core Purpose

The Branded Objects Studio Tool is a **Figma/Canva-like design builder with permission-based editing**. It allows studios (design agencies) to create locked design tools where clients can only edit safe parameters, ensuring brand compliance.

## Detailed Purpose Breakdown

### 1. **Studio Mode: Design & Build**

Like Figma or Canva, studios use this tool to:

#### 1.1 Create Designs
- **Add Layers**: Text, Images, Shapes/Rectangles
- **Position & Size**: Drag layers, resize with handles, position precisely
- **Style**: Fonts, colors, sizes, alignment, weights
- **Layer Management**: Reorder (z-index), show/hide, organize
- **Visual Canvas**: 400x500px default canvas with grid/guides

#### 1.2 Set Permissions (The Key Differentiator)

Unlike Figma/Canva where everything is editable, studios can **lock properties**:

- **LOCKED**: Hidden from client, studio-only control
  - Examples: Background colors, logo position, font families
  - Visual: Property is not visible in client view
  
- **READ_ONLY**: Visible but not editable by client
  - Examples: Brand taglines, fixed copy, system labels
  - Visual: Displayed but grayed out/read-only
  
- **CLIENT_INPUT**: Client can edit this property
  - Examples: Headline text, product image URLs, taglines
  - Visual: Active input field in client view

#### 1.3 Publish Tools

Once designed, studios:
- **Publish**: Make tool live and accessible
- **Get URL**: Share `/tool/{id}` with clients
- **Manage**: Track usage, edit, republish

### 2. **Client Mode: Safe Editing**

Clients use published tools to:

#### 2.1 Simple Input Interface
- See **only** CLIENT_INPUT fields
- Fill in editable properties (headlines, images, etc.)
- See read-only preview of locked elements

#### 2.2 Live Preview
- Real-time preview updates as they type
- Shows exactly what final output will look like
- Cannot break design or brand rules

#### 2.3 Export Assets
- One-click export to PNG/JPG/SVG
- Pixel-perfect, on-brand output
- No design skills required

## How It Compares to Figma/Canva

| Feature | Figma/Canva | Branded Objects Studio Tool |
|---------|-------------|----------------------------|
| **Design Creation** | ✅ Full design freedom | ✅ Full design freedom |
| **Layer System** | ✅ Text, images, shapes | ✅ Text, images, rectangles |
| **Positioning** | ✅ Drag, resize, align | ✅ Drag, resize, align (needs enhancement) |
| **Styling** | ✅ Full style control | ✅ Full style control |
| **Permissions** | ❌ Everything editable | ✅ **Lock system** (key differentiator) |
| **Client View** | ❌ Same as editor | ✅ **Simplified** (only safe inputs) |
| **Export** | ✅ Manual export | ✅ **Automated** one-click |
| **Brand Safety** | ❌ Can break rules | ✅ **Technically impossible** to break |

## Required Figma/Canva-Like Features

To match industry standards, the tool needs:

### Essential Design Features:
1. ✅ **Layer System** - Text, Images, Shapes (already have)
2. ✅ **Properties Panel** - Edit layer properties (already have)
3. ✅ **Layer List** - Visual layer stack (already have)
4. ⚠️ **Layer Reordering** - Drag to reorder z-index (needs enhancement)
5. ⚠️ **Transform Handles** - Resize handles (partial - needs rotation)
6. ⚠️ **Multi-select** - Select multiple layers (partial - needs group operations)
7. ❌ **Undo/Redo** - History system (missing)
8. ❌ **Align/Distribute** - Alignment tools (missing)
9. ❌ **Zoom/Pan** - Canvas navigation (missing)
10. ❌ **Grid/Snap** - Guides and snapping (missing)
11. ❌ **Grouping** - Group layers together (missing)

### Workflow Features:
1. ✅ **Copy/Paste** - Duplicate layers (has duplicate, needs paste)
2. ✅ **Delete** - Remove layers (already have)
3. ⚠️ **Keyboard Shortcuts** - Quick actions (partial - needs more)
4. ❌ **Selection Tools** - Box select (has, but needs improvement)
5. ❌ **Lock/Unlock** - Layer lock states (has property locks, needs layer visibility locks)

### Visual Features:
1. ✅ **Canvas Preview** - Live preview (already have)
2. ⚠️ **Background Grid** - Visual guides (has pattern, needs actual grid)
3. ❌ **Rulers** - Measurement guides (missing)
4. ❌ **Alignment Guides** - Smart guides when moving (missing)

## Current State vs Target State

### Current State (What Works):
- ✅ Basic layer system (text, image, rectangle)
- ✅ Property editing in sidebar
- ✅ Layer selection and basic manipulation
- ✅ Resize handles for positioning
- ✅ Lock state system (LOCKED, READ_ONLY, CLIENT_INPUT)
- ✅ Publish and client view
- ✅ Client input form
- ✅ Export functionality

### Target State (What's Needed):
- ⚠️ **Better Layer Management**: Drag to reorder, group, lock visibility
- ❌ **Undo/Redo**: Full history system
- ❌ **Transform Tools**: Rotation, better resize, constraints
- ❌ **Alignment Tools**: Align left/right/center, distribute spacing
- ❌ **Zoom/Pan**: Canvas navigation (space+drag, zoom controls)
- ❌ **Grid/Snap**: Visible grid, smart guides, snap to grid
- ❌ **Selection Tools**: Better multi-select, box select improvements
- ⚠️ **Keyboard Shortcuts**: Full shortcut system like Figma

## Success Criteria

The tool is successful when:
1. ✅ Studios can design freely (like Figma/Canva)
2. ✅ Studios can lock properties (permission system works)
3. ✅ Clients can only edit safe inputs (enforced)
4. ✅ Export produces pixel-perfect assets (works)
5. ⚠️ **Studio workflow is smooth** (needs enhancement for full Figma-like experience)
6. ⚠️ **All common design operations work** (needs missing features above)

## The Value Proposition

**For Studios:**
- Design tools like Figma, but with brand governance built-in
- Clients can use tools safely without breaking brand rules
- Reclaim 15-25 hours/month on asset creation/approval
- Productize services as subscription tools

**For Clients:**
- Simple interface (only see what they can edit)
- Instant asset generation (no waiting for designer)
- Always on-brand (technically impossible to break rules)
- No design skills required

## Implementation Priority

### Phase 1: Fix Errors & Stabilize (NOW)
- Fix runtime errors
- Add error boundaries
- Improve error handling

### Phase 2: Core Figma/Canva Features (HIGH PRIORITY)
1. Undo/Redo system
2. Layer reordering (drag to reorder)
3. Better transform controls (rotation, constraints)
4. Align/Distribute tools
5. Zoom/Pan controls

### Phase 3: Polish & Enhancement (MEDIUM PRIORITY)
1. Grid and snap guides
2. Layer grouping
3. Improved selection tools
4. More keyboard shortcuts
5. Visual improvements

This detailed purpose ensures the tool matches industry standards (Figma/Canva) while maintaining its unique value proposition: **permission-based editing for brand governance**.

