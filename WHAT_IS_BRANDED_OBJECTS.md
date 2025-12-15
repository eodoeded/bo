# What is Branded Objects?

## The Problem
Agencies create brand guidelines (PDFs, Figma files) but clients still create off-brand assets. Manual approval processes are slow and don't scale.

## The Solution
**Branded Objects turns brand guidelines into software.**

Instead of a PDF that says "use this font," you build a **locked design tool** where:
- ✅ Clients can only change what you allow
- ✅ Everything else is **technically impossible** to break
- ✅ Assets generate instantly, perfectly on-brand

---

## How It Works

### For Studios (Agencies)
1. **Build a Tool** (like building a Figma file)
   - Add layers (text, images, shapes)
   - Set properties (position, size, color, content)
   - **Lock what must stay fixed** (fonts, positioning, colors)
   - **Unlock what clients can edit** (headline text, product images)

2. **Publish the Tool**
   - Tool gets a public URL: `/tool/abc-123`
   - Share this URL with clients

3. **Clients Use It**
   - Open the URL (no login needed)
   - See only the fields you unlocked
   - Edit those fields
   - Export perfect, on-brand assets instantly

### The Lock System (Like Figma Permissions)
- **LOCKED** = Hidden, can't be changed (like locked layers in Figma)
- **READ_ONLY** = Visible but can't edit (like viewing a Figma file)
- **CLIENT_INPUT** = Editable (like having edit access in Figma)

---

## Example: Social Media Post Tool

### Studio Builds It:
- **Background**: Rectangle layer, color locked to brand color
- **Logo**: Image layer, position locked (top-right), size locked
- **Headline**: Text layer, font locked, size locked, **content unlocked** (CLIENT_INPUT)
- **Product Image**: Image layer, position locked, **image source unlocked** (CLIENT_INPUT)

### Client Uses It:
- Opens `/tool/social-post-v1`
- Sees 2 input fields:
  - "Headline - Content" (text input)
  - "Product Image - Image URL" (text input)
- Types headline: "New Product Launch"
- Pastes product image URL
- Clicks "EXPORT_PRODUCTION_PNG"
- Gets perfect, on-brand social post instantly

### What Client CAN'T Do:
- ❌ Change background color (LOCKED)
- ❌ Move logo (LOCKED)
- ❌ Change font size (LOCKED)
- ❌ Break the layout (everything locked except content)

---

## The Value Proposition

### For Studios
- **Productize Services**: Sell tools as subscriptions, not hours
- **Scale Without Scaling Headcount**: One tool = infinite outputs
- **Guaranteed Brand Compliance**: Technically impossible to break

### For Clients
- **Self-Service**: Generate assets instantly, no waiting
- **No Design Skills Needed**: Just fill in the blanks
- **Always On-Brand**: Can't accidentally break the design

---

## Current Status: MVP Complete ✅

The product works end-to-end:
- Studios can build tools (like Figma)
- Studios can lock/unlock properties (like Figma permissions)
- Studios can publish tools
- Clients can use published tools
- Clients can export assets

**Next**: Make it feel more like Figma (drag layers, visual editing, better UX)

