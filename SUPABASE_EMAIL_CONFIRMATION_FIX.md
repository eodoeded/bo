# Fix "Email not confirmed" Error

## Quick Fix: Disable Email Confirmation

1. **Go to Supabase Dashboard:**
   - https://app.supabase.com
   - Select your project

2. **Navigate to Authentication Settings:**
   - Click **"Authentication"** (left sidebar)
   - Click **"Providers"** (under Configuration)
   - Find **"Email"** in the list

3. **Disable Email Confirmation:**
   - Toggle **"Confirm email"** to **OFF**
   - Click **"Save"**

4. **Try Again:**
   - Go back to your app
   - Sign up again (or try signing in)
   - It should work now!

## Alternative: Confirm Your Email

If you want to keep email confirmation enabled:

1. Check your email inbox (including spam)
2. Look for an email from Supabase
3. Click the confirmation link
4. Then try signing in again

## For Production

When you're ready for production:
- Re-enable email confirmation
- Configure custom email templates
- Set up proper email domain

---

**For now, just disable email confirmation to get started quickly!**

