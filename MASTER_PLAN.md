# Branded Objects - Master Implementation Plan

## Product Overview
Branded Objects is a modular design system that lets agencies turn rigid brand guidelines into enforceable software tools. Studios build locked tools that clients can use safely via simple inputs.

## Core Value Proposition
- **Studios**: Build locked design tools, publish them, track usage
- **Clients**: Access published tools via public URLs, input safe parameters, export assets

---

## Required URLs & Routes

### Public Routes
1. `/` - Landing page (marketing)
2. `/designsystem` - Design System documentation
3. `/login` - Studio login
4. `/signup` - Studio sign up
5. `/tool/:id` - **Public tool runner** (anyone can access published tools)

### Protected Routes (Studio Only)
6. `/studio` - Studio Dashboard (list all tools)
7. `/studio/builder/new` - Create new tool
8. `/studio/builder/:id` - Edit existing tool

---

## Core Functionalities

### 1. Authentication System ✅ (Implemented)
- [x] Sign up (create studio account)
- [x] Sign in (authenticate studio)
- [x] Sign out (end session)
- [x] Session persistence (stay logged in)
- [x] Protected routes (redirect to login if not authenticated)
- [x] Auth context (provide user state to all components)

### 2. Tool Management (CRUD) ✅ (Implemented)
- [x] Create tool (new tool with default layers)
- [x] Read tools (list all tools for studio)
- [x] Update tool (save layers, name, status)
- [x] Delete tool (remove tool from database)
- [x] Auto-save (debounced saves on changes)

### 3. Tool Publishing ✅ (Implemented)
- [x] Publish tool (change status: draft → published)
- [x] Republish tool (update published version)
- [x] Public access (published tools accessible via `/tool/:id`)

### 4. Layer Management ✅ (Implemented)
- [x] Add layer (text, image, rectangle)
- [x] Edit layer properties (position, size, content, color)
- [x] Delete layer (remove from tool)
- [x] Layer selection (select layer to edit)
- [x] Z-index management (layer ordering)

### 5. Lock State System ✅ (Implemented)
- [x] Tri-state locks (LOCKED, READ_ONLY, CLIENT_INPUT)
- [x] Lock cycling (toggle between states)
- [x] Client isolation (only CLIENT_INPUT visible in runner)
- [x] Lock enforcement (LOCKED properties hidden, READ_ONLY displayed but not editable)

### 6. Asset Export ⚠️ (Partially Implemented)
- [x] Canvas capture (html2canvas)
- [x] PNG download (high-res export)
- [x] Export states (idle, exporting, success, error)
- [ ] **Asset storage** (upload to S3/R2, store URL in database)
- [x] Asset tracking (record generation in database)

### 7. Tool Runner (Client View) ✅ (Implemented)
- [x] Load published tool
- [x] Display only CLIENT_INPUT fields
- [x] Live preview (real-time canvas update)
- [x] Export button (generate and download asset)
- [x] Read-only fields (display LOCKED/READ_ONLY properties)

### 8. Studio Dashboard ✅ (Implemented)
- [x] List all tools
- [x] Tool cards (name, status, metadata)
- [x] Create new tool button
- [x] Edit tool link
- [x] Delete tool
- [x] System metrics (total tools, live tools, outputs, latency)

---

## Missing/Incomplete Features

### High Priority
1. **Asset Storage**
   - Upload exported PNGs to S3/R2
   - Store asset URLs in `generated_assets` table
   - Return asset URL after export

2. **Image Layer Support**
   - Upload images in Tool Builder
   - Store image URLs in layer properties
   - Display images in PreviewCanvas
   - Support image uploads in client view (if CLIENT_INPUT)

3. **Tool Versioning**
   - Save tool versions before publishing
   - Allow rollback to previous versions
   - Track version history

### Medium Priority
4. **Tool Sharing**
   - Generate shareable links for published tools
   - Email tool links to clients
   - QR codes for tool access

5. **Analytics Dashboard**
   - View asset generation stats per tool
   - Track client usage
   - Export reports

6. **Template Library**
   - Pre-built tool templates
   - Clone existing tools
   - Template marketplace

### Low Priority
7. **Advanced Layer Types**
   - Shape layers (circles, polygons)
   - Gradient layers
   - Pattern layers

8. **Collaboration**
   - Multiple studios per account
   - Team member invitations
   - Permission levels

---

## Database Schema Status

### ✅ Implemented Tables
- `studios` - Studio accounts
- `tools` - Design tools
- `tool_versions` - Version history (schema exists, not used yet)
- `generated_assets` - Asset tracking

### Required RLS Policies ✅
- Studios can only access their own tools
- Published tools are publicly readable
- Anyone can create assets (for tracking)

---

## API Endpoints Status

### ✅ Implemented (via Supabase)
- `createTool()` - Create new tool
- `getTools()` - List all tools for studio
- `getTool(id)` - Get single tool
- `updateTool(id, data)` - Update tool
- `deleteTool(id)` - Delete tool
- `publishTool(id)` - Publish tool
- `getPublishedTool(id)` - Get published tool (public)
- `recordAssetGeneration(id, data)` - Track asset creation

### ⚠️ Missing
- Image upload endpoint (need S3/R2 integration)
- Asset URL retrieval (need storage service)

---

## Implementation Priority

### Phase 1: Core Functionality (Current)
✅ Authentication
✅ Tool CRUD
✅ Tool Publishing
✅ Layer Management
✅ Lock States
✅ Asset Export (local download)
✅ Tool Runner

### Phase 2: Asset Storage (Next)
1. Set up S3/R2 bucket
2. Create image upload service
3. Update asset export to upload to storage
4. Store asset URLs in database
5. Display asset history in Studio Dashboard

### Phase 3: Image Layer Support
1. Image upload in Tool Builder
2. Image display in PreviewCanvas
3. Image input in Tool Runner (if CLIENT_INPUT)

### Phase 4: Polish & Scale
1. Tool versioning
2. Analytics dashboard
3. Template library
4. Advanced features

---

## Current Status: ✅ MVP Complete

The core product is functional:
- Studios can create tools
- Studios can publish tools
- Clients can access published tools
- Clients can export assets
- All data persists in Supabase

**Next Step**: Add asset storage (S3/R2) for production-ready asset management.

