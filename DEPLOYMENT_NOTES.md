# Vercel Deployment Notes

## Branch Configuration

Vercel should be configured to deploy from:
- **Production**: `main` branch
- **Preview**: `guidelines-test` branch (or all branches)

## Files Included in Deployment

The `database/` folder is included in the repository and will be deployed to Vercel. This folder contains:
- `database/schema.sql` - Database schema for Supabase setup

## Triggering Deployments

Vercel automatically deploys when:
1. Code is pushed to the connected branch (`main` or `guidelines-test`)
2. Pull requests are created/updated
3. Manual redeploy is triggered from Vercel dashboard

## Current Status

✅ `database/schema.sql` is committed and pushed
✅ `.vercelignore` ensures database folder is included
✅ Latest commit: `e7d7204` - "Trigger Vercel deployment"

## If Deployment Doesn't Trigger

1. **Check Vercel Dashboard:**
   - Go to https://vercel.com/dashboard
   - Check if the project is connected to the correct GitHub repo
   - Verify the branch is set to `main` or `guidelines-test`

2. **Manual Redeploy:**
   - In Vercel dashboard, click "Redeploy" on the latest deployment
   - Or trigger a new deployment from the "Deployments" tab

3. **Check Vercel Settings:**
   - Settings → Git → Production Branch should be `main`
   - Settings → Git → Ignored Build Step should be empty or not ignore database folder

4. **Verify File is in Repository:**
   - Check GitHub: https://github.com/eodoeded/bo/tree/main/database
   - File should be visible at: `database/schema.sql`

