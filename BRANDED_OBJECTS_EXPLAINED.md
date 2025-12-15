# Branded Objects - Complete Explanation

## What It Is

**Branded Objects is Figma, but with permission-based locking.**

Think of it like this:
- **Figma** = Design tool where you can edit everything
- **Branded Objects** = Design tool where you can **lock** what must stay fixed, and **unlock** what clients can edit

---

## The Core Concept

### For Studios (Agencies)
You build a **locked design tool** (like a Figma file):
1. Add layers (text, images, shapes)
2. Set properties (position, size, color, content)
3. **Lock what must stay fixed** (fonts, positioning, brand colors)
4. **Unlock what clients can edit** (headline text, product images)
5. Publish the tool → Get a public URL

### For Clients
1. Open the URL (no login needed)
2. See only the fields you unlocked
3. Fill them in
4. Export perfect, on-brand assets instantly

---

## How It Works (Like Figma)

### Studio Tool Builder (`/studio/builder/:id`)

**Three-Panel Layout:**
- **Left**: Layer Stack (like Figma's layers panel)
  - List of all layers
  - Click to select
  - Add new layers (text, image, rectangle)
  - Delete layers (trash icon or Delete key)

- **Center**: Canvas (like Figma's canvas)
  - Visual preview of the tool
  - **Click layers to select** (shows selection ring)
  - **Drag layers to move** (if position unlocked)
  - Click canvas to deselect
  - Real-time updates

- **Right**: Inspector (like Figma's properties panel)
  - Edit selected layer's properties
  - Set lock states (LOCKED, READ_ONLY, CLIENT_INPUT)
  - Change values (position, size, color, content)

### The Lock System

Each property has 3 states (like Figma permissions):

1. **LOCKED** 🔒
   - Hidden in client view
   - Can't be changed by clients
   - Studio can edit in builder
   - Example: Background color, logo position

2. **READ_ONLY** 👁️
   - Visible in client view
   - Can't be edited by clients
   - Shows what's fixed
   - Example: Subhead text, fixed copy

3. **CLIENT_INPUT** ✏️
   - Visible and editable in client view
   - Clients can change this
   - Example: Headline text, product image URL

### Keyboard Shortcuts (Like Figma)
- **Delete / Backspace**: Delete selected layer
- **Escape**: Deselect layer
- **Click canvas**: Deselect

---

## Example Workflow

### Studio Builds a Social Post Tool

1. **Create Tool** → "Social Media Post v1"
2. **Add Background Layer**
   - Rectangle, color: brand blue (#1A1614)
   - Lock: position, size, color (all LOCKED)
3. **Add Logo Layer**
   - Image, position: top-right
   - Lock: position, size (LOCKED), image source (LOCKED)
4. **Add Headline Layer**
   - Text, font: PP Neue Montreal, size: 42px
   - Lock: position, font, size, color (LOCKED)
   - **Unlock: content (CLIENT_INPUT)** ← Client can edit this
5. **Add Product Image Layer**
   - Image, position: center
   - Lock: position, size (LOCKED)
   - **Unlock: image source (CLIENT_INPUT)** ← Client can change image
6. **Publish** → Get URL: `/tool/social-v1`

### Client Uses the Tool

1. Opens `/tool/social-v1`
2. Sees 2 input fields:
   - "Headline - Content" (text input)
   - "Product Image - Image URL" (text input)
3. Types: "New Product Launch"
4. Pastes product image URL
5. Clicks "EXPORT_PRODUCTION_PNG"
6. Gets perfect social post instantly

**What Client CAN'T Do:**
- ❌ Change background color (LOCKED)
- ❌ Move logo (LOCKED)
- ❌ Change font size (LOCKED)
- ❌ Break the layout (everything locked except content)

---

## Current Features (MVP Complete)

### ✅ Studio Features
- Create/edit/delete tools
- Add layers (text, image, rectangle)
- Edit layer properties
- Set lock states
- **Click layers on canvas to select**
- **Drag layers to move** (if unlocked)
- **Delete layers** (keyboard or button)
- Publish tools
- Auto-save

### ✅ Client Features
- Access published tools (no login)
- Edit CLIENT_INPUT fields only
- Live preview
- Export high-res PNG
- Asset tracking

---

## What Makes It Different from Figma

| Feature | Figma | Branded Objects |
|---------|-------|-----------------|
| **Editing** | Full edit access | Permission-based |
| **Locking** | Manual (can be unlocked) | **Technical locks** (can't be broken) |
| **Client View** | Same as editor | **Simplified** (only safe inputs) |
| **Export** | Manual | **Automated** (one click) |
| **Purpose** | Design tool | **Brand governance tool** |

---

## The Value

### For Studios
- **Productize Services**: Sell tools as subscriptions
- **Scale Without Scaling**: One tool = infinite outputs
- **Guaranteed Compliance**: Technically impossible to break brand

### For Clients
- **Self-Service**: Generate assets instantly
- **No Design Skills**: Just fill in the blanks
- **Always On-Brand**: Can't accidentally break design

---

## Technical Architecture

### Frontend
- React + Vite
- Three-panel layout (LayerStack | Canvas | Inspector)
- Interactive canvas (click, drag, select)
- Real-time preview

### Backend
- Supabase (PostgreSQL + Auth)
- Row Level Security (RLS)
- Public tool access
- Asset tracking

### Data Model
- **Tools**: Design tools with layers (JSONB)
- **Layers**: Text, Image, Rectangle
- **Properties**: Position, size, color, content
- **Locks**: LOCKED, READ_ONLY, CLIENT_INPUT

---

## Status: ✅ MVP Complete & Functional

The product works end-to-end:
- Studios can build tools (like Figma)
- Studios can lock/unlock properties
- Studios can publish tools
- Clients can use published tools
- Clients can export assets

**It's like Figma, but with technical locks that can't be broken.**

