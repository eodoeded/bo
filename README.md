# Branded Objects

**A modular design system platform that lets agencies turn rigid brand guidelines into enforceable software tools.**

Instead of handing clients a PDF and hoping they follow it, studios build **locked design tools** where:
- **Studios define**: Fonts, colors, positioning, layouts, style rules
- **Clients input**: Only the safe parameters you allow (headlines, product images, copy)
- **System generates**: Pixel-perfect, on-brand assets automatically

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Backend (Optional)

For full functionality, set up Supabase:

1. Create a Supabase project: https://app.supabase.com
2. Run the schema: Copy `database/schema.sql` into Supabase SQL Editor
3. Get API keys from Supabase Settings → API
4. Create `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: Without Supabase, the app works in "fallback mode" using localStorage (perfect for development).

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions.

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
src/
  ├── components/          # React components
  │   ├── v2/             # Tool Builder/Runner components
  │   └── DesignSystem.jsx # Complete design system docs
  ├── pages/              # Page components
  │   ├── StudioDashboard.jsx
  │   ├── ToolBuilder.jsx
  │   └── ToolRunner.jsx
  ├── services/           # API services
  │   ├── tools.js       # Tool CRUD operations
  │   └── auth.js        # Authentication
  └── lib/
      └── supabase.js    # Supabase client
```

## Features

### ✅ Implemented

- **Tool Builder**: Build locked design tools with layers
- **Lock State System**: Define what clients can/can't change (LOCKED, READ_ONLY, CLIENT_INPUT)
- **Tool Runner**: Simple client interface for using tools
- **Asset Generation**: Export final assets (PNG via html2canvas)
- **Studio Dashboard**: Manage all tools
- **Tool Publishing**: Deploy tools to clients (draft → published)
- **Design System**: Complete documentation at `/designsystem`
- **Mobile Responsive**: All pages work at every breakpoint

### 🚧 In Progress

- Authentication (Supabase Auth)
- Asset storage (S3/R2)
- Additional export formats (JPG, SVG, PDF)
- Batch generation
- Analytics & reporting

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Deployment**: Vercel

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

See `.env.example` for required variables.

## License

Private / Proprietary
