# Branded Objects: Product Vision & Core Requirements

## What is Branded Objects?

**Branded Objects is a modular design system platform that lets agencies turn rigid brand guidelines into enforceable software tools.**

Instead of handing clients a PDF and hoping they follow it, studios build **locked design tools** where:
- **Studios define**: Fonts, colors, positioning, layouts, style rules
- **Clients input**: Only the safe parameters you allow (headlines, product images, copy)
- **System generates**: Pixel-perfect, on-brand assets automatically

**The core value**: Studios reclaim 15-25 retainer hours per month by automating high-volume asset creation, while ensuring it's technically impossible for clients to break brand rules.

---

## Phase 1: Foundation (MVP - What Studios Need to Build Tools)

### 1.1 Layer System
**What it is**: The building blocks of every design tool.

**Components needed**:
- **Text Layers**: Headlines, body copy, labels
  - Properties: Content, font family, size, color, position (x, y), alignment, weight
  - Lock states: Content can be CLIENT_INPUT, but font/size/color/position are LOCKED
  
- **Image Layers**: Product photos, logos, graphics
  - Properties: Image source (URL), width, height, position, aspect ratio lock
  - Lock states: Source can be CLIENT_INPUT, but dimensions/position are LOCKED
  
- **Rectangle/Shape Layers**: Backgrounds, colored boxes, dividers
  - Properties: Width, height, color, position, border radius
  - Lock states: All typically LOCKED (studio-defined backgrounds)
  
- **Layer Stacking**: Z-index management, layer ordering
  - Visual layer list (LayerStack component)
  - Drag-to-reorder (future)
  - Show/hide layers

**Why it matters**: Every design tool is built from these layers. Studios compose them once, clients can't break the composition.

---

### 1.2 Lock State System (Cellular Permissions)
**What it is**: The permission system that defines what clients can and cannot change.

**Three states**:
1. **LOCKED**: Property is hidden from client. Studio-only control.
   - Example: Background color, logo position, font family
   - Visual: Lavender lock icon, disabled input
   
2. **READ_ONLY**: Client can see but cannot modify. Display only.
   - Example: Brand guidelines text, system labels
   - Visual: Eye icon, read-only display
   
3. **CLIENT_INPUT**: Client can edit. Safe input field exposed in Runner.
   - Example: Headline text, product image URL, tagline
   - Visual: Edit icon, active input field

**Why it matters**: This is the core innovation. Studios lock everything except safe inputs. Clients physically cannot break brand rules.

---

### 1.3 Tool Builder Interface
**What it is**: The studio interface for building locked design tools.

**Core components**:
- **LayerStack Panel** (Left sidebar)
  - Visual list of all layers
  - Add layer buttons (Text, Image, Rectangle)
  - Layer selection
  - Connection ports (visual cellular structure)
  - Status indicators (selected layer highlighted)
  
- **PreviewCanvas** (Center)
  - Live preview of the tool output
  - Shows exactly what clients will see
  - 400x500 default canvas (customizable)
  - Technical overlay (system branding)
  
- **Inspector Panel** (Right sidebar)
  - Property controls for selected layer
  - Lock state toggles (cycle: LOCKED → READ_ONLY → CLIENT_INPUT)
  - Input fields for all properties
  - Connection ports on each control
  
- **Secondary Toolbar** (Top)
  - Tool ID display
  - System status indicator
  - Publish button
  - Builder mode indicator

**Why it matters**: Studios need an intuitive interface to build tools. The three-panel layout (LayerStack, Canvas, Inspector) is the core workflow.

---

### 1.4 Tool Publishing & Deployment
**What it is**: How studios turn a built tool into a live, client-accessible tool.

**Requirements**:
- **Publish Action**: Save tool configuration to database
- **Tool ID Generation**: Unique identifier (e.g., `x9z-22a`)
- **Runner Link**: Generate client-facing URL (`/tool/{id}`)
- **Version Control**: Track tool versions (future: rollback)
- **Status Management**: Draft → Published → Archived

**Why it matters**: Studios need to deploy tools to clients. The publish action makes a tool live and accessible.

---

## Phase 2: Client Experience (Tool Runner)

### 2.1 Tool Runner Interface
**What it is**: The simple interface clients see when using a tool.

**Core components**:
- **Input Form**: Only shows CLIENT_INPUT properties
  - Text inputs for editable text
  - Image upload/URL for editable images
  - Read-only displays for READ_ONLY properties
  - Hidden fields for LOCKED properties
  
- **Live Preview**: Real-time preview of output
  - Updates as client types
  - Shows exact final output
  - Same PreviewCanvas component
  
- **Generate/Export Button**: Creates final asset
  - Generates image file (PNG, JPG, SVG)
  - Downloads to client's device
  - Or sends to email/webhook (future)

**Why it matters**: Clients need a dead-simple interface. They only see what they can change. Everything else is invisible.

---

### 2.2 Asset Generation
**What it is**: The system that converts the tool configuration + client inputs into a final asset file.

**Requirements**:
- **Canvas Rendering**: Convert layer stack to image
  - Render text layers with correct fonts
  - Render image layers (fetch from URLs)
  - Render shape layers with colors
  - Composite all layers in correct z-order
  
- **Export Formats**:
  - PNG (raster, transparent background)
  - JPG (raster, white background)
  - SVG (vector, for logos/text)
  - PDF (multi-page, future)
  
- **Resolution Options**:
  - Standard (400x500 default)
  - High-res (2x, 4x for print)
  - Custom dimensions (future)

**Why it matters**: The final output must be production-ready. Studios need pixel-perfect assets, not mockups.

---

### 2.3 Input Validation
**What it is**: Rules that prevent clients from entering invalid data.

**Requirements**:
- **Text Length Limits**: Max characters for headlines, body copy
- **Image Validation**: Aspect ratio checks, file size limits, format validation
- **Required Fields**: Mark which CLIENT_INPUT fields are mandatory
- **Format Validation**: Email formats, URL formats, etc.

**Why it matters**: Prevents errors before generation. Clients get immediate feedback.

---

## Phase 3: Studio Management (Dashboard & Tools)

### 3.1 Studio Dashboard
**What it is**: The overview of all tools a studio has built.

**Core components** (already built):
- **System Status Header**: System health, uptime, module status
- **Tool Registry**: Grid of all tools
  - Tool cards with metadata
  - Status badges (Live, Draft)
  - Technical readouts (outputs, latency, tool ID)
  - Last edited timestamp
  
- **System Metrics Footer**: Aggregate stats
  - Total tools
  - Live tools
  - Total outputs generated
  - Average latency

**Why it matters**: Studios need to manage multiple tools. Dashboard shows everything at a glance.

---

### 3.2 Tool Management
**What it is**: Actions studios can take on their tools.

**Requirements**:
- **Create New Tool**: Initialize blank tool or from template
- **Edit Tool**: Open in Tool Builder
- **Duplicate Tool**: Clone existing tool (future)
- **Archive Tool**: Soft delete, keep for reference
- **View Analytics**: Usage stats, output counts (future)
- **Share Tool**: Generate shareable link, set permissions (future)

**Why it matters**: Studios build multiple tools for different use cases. Need management capabilities.

---

### 3.3 Template System (Future)
**What it is**: Pre-built tool templates for common use cases.

**Ideas**:
- **Social Media Stories**: Instagram/Facebook story template
- **Event Banners**: Wide banner template
- **Product Cards**: E-commerce product card
- **Email Headers**: Newsletter header template
- **Tarot Cards**: Custom card game template (mentioned in value prop)

**Why it matters**: Accelerates tool creation. Studios can start from templates instead of building from scratch.

---

## Phase 4: Advanced Features (Post-MVP)

### 4.1 AI Integration
**What it is**: AI-powered features for asset generation.

**Ideas**:
- **AI Image Generation**: Generate product images from text prompts (locked prompts, client provides subject)
- **AI Background Generation**: Create backgrounds based on brand colors
- **Smart Cropping**: AI-powered image cropping to fit layouts
- **Style Transfer**: Apply brand style to client-provided images

**Why it matters**: Expands what's possible. Studios can offer AI-powered tools while maintaining brand control.

---

### 4.2 Batch Generation
**What it is**: Generate multiple assets at once.

**Requirements**:
- **CSV Import**: Upload spreadsheet with multiple inputs
- **Bulk Export**: Generate 100s of assets in one action
- **API Access**: Programmatic generation for integrations
- **Webhook Notifications**: Alert when batch completes

**Why it matters**: High-volume use case. Studios need to generate 100s of assets for campaigns.

---

### 4.3 Brand Asset Library
**What it is**: Centralized storage for brand assets studios use in tools.

**Requirements**:
- **Asset Upload**: Logos, fonts, images, colors
- **Asset Organization**: Folders, tags, search
- **Version Control**: Track asset versions
- **Usage Tracking**: See which tools use which assets

**Why it matters**: Studios reuse assets across tools. Need centralized management.

---

### 4.4 Client Management
**What it is**: Managing which clients have access to which tools.

**Requirements**:
- **Client Accounts**: Create client user accounts
- **Tool Access Control**: Assign tools to specific clients
- **Usage Limits**: Set generation limits per client
- **Client Dashboard**: Clients see their assigned tools

**Why it matters**: Studios serve multiple clients. Need access control and usage tracking.

---

### 4.5 Analytics & Reporting
**What it is**: Insights into tool usage and client behavior.

**Requirements**:
- **Tool Usage Stats**: Generations per tool, popular tools
- **Client Activity**: Which clients use which tools most
- **Time Saved**: Calculate hours saved vs manual creation
- **Export Reports**: PDF reports for client billing

**Why it matters**: Studios need to prove ROI. Analytics show value delivered.

---

## Phase 5: Enterprise Features (Scale)

### 5.1 White-Label Branding
**What it is**: Customize the platform with studio's branding.

**Requirements**:
- **Custom Domain**: `tools.studio-name.com`
- **Custom Logo**: Replace BO logo
- **Custom Colors**: Match studio brand colors
- **Custom Email Templates**: Branded notifications

**Why it matters**: Larger studios want their own brand, not BO's.

---

### 5.2 Team Collaboration
**What it is**: Multiple team members working on tools.

**Requirements**:
- **User Roles**: Admin, Designer, Viewer
- **Permissions**: Who can edit, who can view
- **Activity Log**: Track who changed what
- **Comments**: Notes on tools/layers

**Why it matters**: Studios have teams. Need collaboration features.

---

### 5.3 API & Integrations
**What it is**: Connect BO to other tools studios use.

**Requirements**:
- **REST API**: Programmatic tool creation, generation
- **Webhooks**: Notify external systems of events
- **Zapier Integration**: No-code automation
- **Figma Plugin**: Import designs from Figma (future)

**Why it matters**: Studios use multiple tools. Need integrations.

---

## Core Product Summary (What Studios Pay For)

### Essential Features (MVP):
1. ✅ **Tool Builder**: Build locked design tools with layers
2. ✅ **Lock State System**: Define what clients can/can't change
3. ✅ **Tool Runner**: Simple client interface for using tools
4. ✅ **Asset Generation**: Export final assets (PNG, JPG, SVG)
5. ✅ **Studio Dashboard**: Manage all tools
6. ✅ **Tool Publishing**: Deploy tools to clients

### Nice-to-Have (Phase 2):
7. **Templates**: Pre-built tool templates
8. **Batch Generation**: Generate multiple assets at once
9. **Brand Asset Library**: Centralized asset storage
10. **Client Management**: Access control, user accounts

### Advanced (Phase 3+):
11. **AI Integration**: AI-powered generation
12. **Analytics**: Usage stats, reporting
13. **White-Label**: Custom branding
14. **API**: Integrations, automation

---

## The Core Value Proposition

**For Studios**:
- **Productize Services**: Turn one-time brand guidelines into recurring revenue
- **Reclaim Time**: Automate 15-25 retainer hours/month
- **Scale Output**: Generate 100s of assets without opening a file
- **Enforce Brand**: Technically impossible for clients to break rules

**For Clients**:
- **Self-Service**: Generate assets on-demand, no waiting
- **Brand Safe**: Can't accidentally create off-brand content
- **Fast**: Instant generation vs days of back-and-forth
- **Simple**: Only see what they can change, everything else is invisible

**The Business Model**:
- Studios pay subscription (monthly/annual)
- Per-tool pricing or unlimited tools
- Usage-based pricing (generations per month)
- White-label enterprise plans

---

## Technical Architecture (What's Needed)

### Backend:
- **Database**: Store tool configurations, layer data, client inputs
- **Asset Storage**: Store generated assets (S3, Cloudflare R2)
- **Rendering Engine**: Convert tool config + inputs → image file
- **Authentication**: Studio accounts, client accounts
- **API**: REST API for tool management, generation

### Frontend:
- ✅ **Tool Builder**: React interface (already built)
- ✅ **Tool Runner**: React interface (needs refinement)
- ✅ **Studio Dashboard**: React interface (already built)
- ✅ **Design System**: Component library (already built)

### Infrastructure:
- **Hosting**: Vercel/Netlify for frontend
- **Database**: PostgreSQL/Supabase
- **File Storage**: S3/R2 for assets
- **CDN**: Fast asset delivery
- **Monitoring**: Error tracking, performance

---

This is the complete vision. The MVP (Phase 1-2) is what studios would pay for as pilots. Everything else is growth and scale.

