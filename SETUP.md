# Setup Guide: Email & Database Integration

This guide will help you set up the email and database functionality for the Prosthetic Companion website.

## 📋 Prerequisites

- Node.js 18+ installed
- A Vercel account (for hosting and KV storage)
- A Resend account (for email sending)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Resend (Email Service)

1. Go to [resend.com](https://resend.com) and create an account
2. Navigate to API Keys section
3. Create a new API key
4. Copy the API key (starts with `re_`)

**Important**: For production, you'll need to:
- Verify your domain
- Set up DNS records (SPF, DKIM)
- Use a custom `FROM_EMAIL` address from your domain

For development, Resend provides `onboarding@resend.dev` by default.

### 3. Set Up Vercel KV (Redis Storage)

#### Option A: Using Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Import the project to Vercel
3. In your project settings, go to **Storage** tab
4. Click **Create Database** → **KV**
5. Follow the prompts to create your KV store
6. Vercel will automatically add the environment variables to your project

#### Option B: Local Development with Vercel KV

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull .env.local`

This will automatically create a `.env.local` file with your KV credentials.

### 4. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=your-email@example.com
FROM_EMAIL=noreply@yourdomain.com

# Vercel KV (automatically set by Vercel, but for local dev:)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token
```

**Environment Variables Explained:**

- `RESEND_API_KEY`: Your Resend API key for sending emails
- `NOTIFICATION_EMAIL`: Where you want to receive notifications (waitlist signups, partnership inquiries)
- `FROM_EMAIL`: The email address that will appear in the "From" field (must be from a verified domain in production)
- `KV_*`: Vercel KV credentials (auto-set when deployed, use `vercel env pull` for local dev)

### 5. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## 📧 Email Configuration Details

### Development Mode

In development, Resend provides a default sender (`onboarding@resend.dev`). This works for testing but emails may go to spam.

### Production Mode

For production, you MUST:

1. **Verify Your Domain**:
   - Go to Resend Dashboard → Domains
   - Add your domain
   - Add the provided DNS records to your domain registrar

2. **Update FROM_EMAIL**:
   - Set `FROM_EMAIL=noreply@yourdomain.com` (or any email @yourdomain.com)
   - This ensures emails come from your verified domain

3. **Test Email Delivery**:
   - Send test emails to multiple providers (Gmail, Outlook, etc.)
   - Check spam folders
   - Monitor your Resend dashboard for delivery issues

## 🗄️ Database Structure (Vercel KV)

The application stores data in Vercel KV with the following structure:

### Waitlist Entries

```
Key: waitlist:{email}
Value: {
  email: string,
  name: string | null,
  timestamp: ISO string
}

Counter: waitlist:count
```

### Partnership Inquiries

```
Key: partnership:{timestamp}:{email}
Value: {
  name: string,
  email: string,
  organization: string,
  message: string,
  timestamp: ISO string,
  status: "new" | "contacted" | "closed"
}

List: partnership:inquiries (contains all inquiry IDs)
Counter: partnership:count
```

## 🔍 Viewing Stored Data

### Using Vercel Dashboard

1. Go to your project in Vercel
2. Navigate to **Storage** → Your KV database
3. Use the **Data Browser** tab to view entries

### Using Vercel CLI

```bash
# View waitlist count
vercel kv get waitlist:count

# View a specific waitlist entry
vercel kv get waitlist:user@example.com

# List partnership inquiries
vercel kv lrange partnership:inquiries 0 -1
```

## 🧪 Testing the Forms

### Test Waitlist Form

1. Click "Join Waitlist" button
2. Fill in email (name is optional)
3. Submit form
4. Check:
   - Toast notification appears
   - You receive an email at `NOTIFICATION_EMAIL`
   - User receives confirmation email
   - Entry appears in Vercel KV

### Test Partnership Form

1. Click "Interested in Partnering?" button
2. Fill in all required fields
3. Submit form
4. Check:
   - Toast notification appears
   - You receive an email at `NOTIFICATION_EMAIL`
   - Partner receives confirmation email
   - Entry appears in Vercel KV

## 🚨 Troubleshooting

### "Email not sent" but data saved

This is expected behavior - data is saved first, then emails are sent. Check:
- Is `RESEND_API_KEY` set correctly?
- Is `NOTIFICATION_EMAIL` set?
- Check Resend dashboard for error logs

### "KV connection failed"

- Ensure KV environment variables are set
- Run `vercel env pull .env.local` to get latest credentials
- Check Vercel KV dashboard for database status

### Emails going to spam

- Verify your domain in Resend
- Set up SPF and DKIM records
- Use a proper `FROM_EMAIL` from your verified domain
- Avoid spam trigger words in email content

### Duplicate email submissions

The API checks for existing emails in the waitlist. If you see duplicates:
- Check KV storage for key consistency
- Ensure timestamps are unique in partnership keys

## 📊 Monitoring

### Resend Dashboard

Monitor email delivery:
- Go to [resend.com/emails](https://resend.com/emails)
- View sent, delivered, bounced, and spam emails
- Check individual email logs

### Vercel KV Dashboard

Monitor database:
- View total entries
- Browse data by key
- Monitor storage usage

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use environment variables** - All sensitive data should be in env vars
3. **Rotate API keys** - If compromised, regenerate immediately
4. **Limit email rate** - Consider adding rate limiting for production
5. **Validate input** - Forms use Zod validation (already implemented)
6. **Monitor usage** - Set up alerts for unusual activity

## 🚀 Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Setup email and database integration"
   git push origin main
   ```

2. Import to Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. Add Environment Variables:
   - In Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `FROM_EMAIL`
   - KV variables are auto-added when you create a KV database

4. Create KV Database:
   - Storage tab → Create Database → KV
   - Name it (e.g., "humanoids-now-db")
   - Vercel auto-links it to your project

5. Deploy:
   - Click "Deploy"
   - Visit your production URL
   - Test both forms

## 📝 Next Steps

- Set up domain verification in Resend
- Add rate limiting for API routes
- Set up email templates in Resend
- Add analytics tracking
- Create admin dashboard to view submissions
- Set up automated follow-up emails
- Add GDPR compliance notices

## 💡 Tips

- Test emails in development with temporary email services (10minutemail, guerrillamail)
- Monitor your Resend free tier limits (100 emails/day)
- Consider upgrading Resend for production use
- Keep your API keys secure and never share them
- Regularly backup your KV data

## 🆘 Need Help?

- Resend docs: [resend.com/docs](https://resend.com/docs)
- Vercel KV docs: [vercel.com/docs/storage/vercel-kv](https://vercel.com/docs/storage/vercel-kv)
- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

## 📜 License

This project is private and proprietary.
