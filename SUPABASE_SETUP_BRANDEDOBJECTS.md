# Supabase Setup Guide for Branded Objects
**Email: brandedobjects@gmail.com**

## Quick Setup (5 minutes)

### Step 1: Create Supabase Account

1. Go to https://app.supabase.com
2. Click **"Sign In"** (top right)
3. Click **"Sign in with Email"**
4. Enter: `brandedobjects@gmail.com`
5. Check your email for verification link
6. Click the link to verify your account

### Step 2: Create New Project

1. In Supabase dashboard, click **"New Project"**
2. Fill in:
   - **Name**: `branded-objects` (or your choice)
   - **Database Password**: 
     - **IMPORTANT**: Choose a strong password (save it in a password manager!)
     - Minimum 12 characters, mix of letters, numbers, symbols
     - Example: `Bo2024!Secure#Pass`
   - **Region**: Choose closest to you (e.g., `US East (N. Virginia)` or `Europe West`)
3. Click **"Create new project"**
4. Wait 2-3 minutes for project to be created

### Step 3: Set Up Database Schema

1. In your Supabase project, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open the file `database/schema.sql` from this repo
4. Copy **ALL** the contents (Cmd/Ctrl + A, then Cmd/Ctrl + C)
5. Paste into the SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. You should see: **"Success. No rows returned"**

✅ **Database is now set up!**

### Step 4: Get API Credentials

1. In Supabase, click **"Settings"** (gear icon, bottom left)
2. Click **"API"** (under Project Settings)
3. You'll see two important values:

   **Project URL:**
   - Copy the URL (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - This is your `VITE_SUPABASE_URL`

   **anon public key:**
   - Scroll down to "Project API keys"
   - Find the **"anon"** or **"public"** key
   - It's a long string starting with `eyJ...`
   - Click the eye icon to reveal it
   - Copy the entire key
   - This is your `VITE_SUPABASE_ANON_KEY`

### Step 5: Configure Environment Variables

1. In your project root, create a file named `.env`
2. Add these two lines (replace with YOUR values):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. **Save the file**

### Step 6: Enable Email Authentication

1. In Supabase, click **"Authentication"** (left sidebar)
2. Click **"Providers"** (under Configuration)
3. Find **"Email"** in the list
4. Toggle it **ON** (if not already on)
5. **"Confirm email"** can stay OFF for now (for easier testing)
6. Click **"Save"**

### Step 7: Test the Setup

1. **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **Navigate to:** `http://localhost:5173/signup`

3. **Create a test account:**
   - Email: `brandedobjects@gmail.com` (or any email)
   - Password: (at least 6 characters)

4. **You should be redirected to** `/studio`

5. **Check Supabase:**
   - Go to **"Table Editor"** → **"tools"** table
   - Create a tool in the app
   - You should see it appear in the database!

## Troubleshooting

### "Supabase credentials not found"
- ✅ Check `.env` file exists in project root (not in `src/`)
- ✅ Check file is named exactly `.env` (not `.env.local` or `.env.example`)
- ✅ Restart dev server after creating `.env`
- ✅ Check for typos in variable names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

### "Error fetching tools" or "No studio ID found"
- ✅ Check you're signed in (go to `/login`)
- ✅ Check Supabase **"Authentication"** → **"Users"** - you should see your account
- ✅ Check **"Table Editor"** → **"studios"** - your studio record should exist

### "Failed to create account"
- ✅ Check email authentication is enabled (Step 6)
- ✅ Check password is at least 6 characters
- ✅ Check Supabase project is not paused (should be green dot)

### Database errors
- ✅ Re-run `database/schema.sql` in SQL Editor
- ✅ Check **"Table Editor"** - you should see 4 tables: `studios`, `tools`, `tool_versions`, `generated_assets`

## Security Notes

- ✅ **Never commit `.env` to git** (it's already in `.gitignore`)
- ✅ **Never share your `anon` key publicly** (it's safe for frontend, but don't expose it)
- ✅ **Keep your database password safe** (you'll need it for direct DB access)

## Next Steps

Once setup is complete:

1. ✅ Create your first tool
2. ✅ Publish it
3. ✅ Test the Tool Runner at `/tool/{tool-id}`
4. ✅ Check **"Table Editor"** → **"generated_assets"** to see exports tracked

## Support

If you run into issues:
1. Check browser console for errors
2. Check Supabase **"Logs"** (left sidebar) for backend errors
3. Verify all steps above were completed

---

**Your Supabase project is now ready!** 🎉

