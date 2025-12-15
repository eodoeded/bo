# Backend Setup Guide

This guide will help you set up the Supabase backend for Branded Objects.

## Prerequisites

- A Supabase account (free tier works): https://supabase.com
- Node.js and npm installed

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - **Name**: `branded-objects` (or your choice)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
4. Wait for project to be created (~2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Open the file `database/schema.sql` from this repo
3. Copy the entire contents
4. Paste into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

This creates:
- `studios` table (user accounts)
- `tools` table (design tools)
- `tool_versions` table (version history)
- `generated_assets` table (export tracking)
- Row Level Security (RLS) policies
- Auto-increment triggers

## Step 3: Get API Credentials

1. In Supabase, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 4: Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Important**: Never commit `.env` to git (it's already in `.gitignore`)

## Step 5: Enable Authentication (Optional for MVP)

For now, the app works without authentication (using localStorage fallback).

To enable auth later:
1. In Supabase, go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)
4. Update `src/services/auth.js` to use real auth

## Step 6: Test the Setup

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `/studio`
3. Click "INITIALIZE_NEW_TOOL"
4. Create a tool and click "PUBLISH"
5. Check Supabase **Table Editor** → `tools` table to see your tool!

## Troubleshooting

### "Supabase credentials not found"
- Check that `.env` file exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after adding `.env`

### "Error fetching tools"
- Check browser console for errors
- Verify RLS policies are set up (run schema.sql again)
- Check Supabase project is active (not paused)

### "No studio ID found"
- This means auth isn't set up yet
- App will fall back to localStorage (works for development)
- To enable auth, follow Step 5 above

## Current Status

✅ **Working**:
- Tool creation (saves to database)
- Tool loading (from database)
- Tool publishing (status: draft → published)
- Studio Dashboard (fetches real tools)
- Tool Runner (loads published tools)
- Asset generation tracking

⚠️ **Fallback Mode**:
- If Supabase not configured, app uses localStorage
- All features work, but data is local only
- Perfect for development/testing

## Next Steps

1. **Authentication**: Set up Supabase Auth for multi-user support
2. **Asset Storage**: Configure S3/R2 for storing generated images
3. **Analytics**: Add real-time usage tracking
4. **Version Control**: Implement tool versioning UI

## Database Schema Overview

```
studios
  ├── id (UUID, primary key)
  ├── email
  ├── name
  └── created_at, updated_at

tools
  ├── id (TEXT, e.g., "x9z-22a")
  ├── studio_id (FK → studios)
  ├── name
  ├── status ("draft" | "published" | "archived")
  ├── layers (JSONB array)
  ├── canvas_width, canvas_height
  ├── outputs_count
  └── created_at, updated_at, published_at

tool_versions
  ├── id (UUID)
  ├── tool_id (FK → tools)
  ├── version_number
  ├── layers (JSONB)
  └── created_at

generated_assets
  ├── id (UUID)
  ├── tool_id (FK → tools)
  ├── client_inputs (JSONB)
  ├── asset_url
  ├── format
  └── created_at
```

## Security Notes

- RLS (Row Level Security) is enabled on all tables
- Studios can only see/edit their own tools
- Published tools are publicly readable (for Tool Runner)
- Never expose the `service_role` key in frontend code

