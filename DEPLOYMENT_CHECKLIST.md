# Deployment Checklist

Use this checklist to ensure a smooth deployment of the Prosthetic Companion website.

## 📋 Pre-Deployment

### 1. Code Review
- [ ] All code committed and pushed to GitHub
- [ ] No console.log statements in production code
- [ ] No TODO comments for critical features
- [ ] All TypeScript errors resolved
- [ ] ESLint passes without errors

### 2. Environment Variables Ready
- [ ] RESEND_API_KEY obtained from Resend dashboard
- [ ] NOTIFICATION_EMAIL decided (where you'll receive alerts)
- [ ] FROM_EMAIL decided (must be from verified domain for production)
- [ ] Domain verified in Resend (for production emails)
- [ ] DNS records added (SPF, DKIM) for email domain

### 3. Dependencies
- [ ] `npm install` runs without errors
- [ ] `npm run build` completes successfully
- [ ] All peer dependencies satisfied

## 🚀 Deployment Steps

### 1. Deploy to Vercel

#### A. Initial Setup
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub
- [ ] Click "New Project"
- [ ] Import `humanoids-now` repository
- [ ] Vercel auto-detects Next.js settings

#### B. Configure Project
- [ ] Project name: `humanoids-now` (or custom)
- [ ] Framework: Next.js (auto-detected)
- [ ] Root directory: `./` (default)
- [ ] Build command: `next build` (default)
- [ ] Output directory: `.next` (default)

#### C. Add Environment Variables
In Project Settings → Environment Variables, add:

```
RESEND_API_KEY = re_your_actual_key
NOTIFICATION_EMAIL = your-email@example.com
FROM_EMAIL = noreply@yourdomain.com
```

**Important:** Add these for all environments (Production, Preview, Development)

- [ ] RESEND_API_KEY added
- [ ] NOTIFICATION_EMAIL added
- [ ] FROM_EMAIL added

### 2. Create Vercel KV Database

- [ ] Go to your project in Vercel
- [ ] Click "Storage" tab
- [ ] Click "Create Database"
- [ ] Select "KV" (Redis)
- [ ] Name: `humanoids-now-db` (or custom)
- [ ] Region: Select closest to your users
- [ ] Click "Create"

**Vercel will automatically:**
- Add KV_REST_API_URL to your environment
- Add KV_REST_API_TOKEN to your environment
- Add KV_REST_API_READ_ONLY_TOKEN to your environment
- Link the database to your project

- [ ] KV database created
- [ ] Environment variables auto-added
- [ ] Database shows as "Connected" in Storage tab

### 3. Deploy

- [ ] Click "Deploy" button
- [ ] Wait for deployment to complete (2-5 minutes)
- [ ] Check deployment logs for errors
- [ ] Deployment status shows ✓ Ready

### 4. Get Deployment URL

- [ ] Copy production URL (e.g., `humanoids-now.vercel.app`)
- [ ] Visit the URL to verify site loads
- [ ] Check that video plays
- [ ] Verify all sections render correctly

## ✅ Post-Deployment Verification

### 1. Visual Check
- [ ] Homepage loads without errors
- [ ] Video background plays
- [ ] All sections visible (Hero, Vision, Partners, Contact)
- [ ] Navigation links work
- [ ] Smooth scrolling works
- [ ] Theme/styling looks correct
- [ ] No layout shifts or flickering
- [ ] Footer displays correctly

### 2. Mobile Check
- [ ] Open site on mobile device
- [ ] Layout is responsive
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Video scales properly
- [ ] Modals display correctly on mobile

### 3. Test Waitlist Form

#### Open Modal
- [ ] Click "Join Waitlist" button
- [ ] Modal opens smoothly
- [ ] Form displays correctly
- [ ] Close button (X) works

#### Test Validation
- [ ] Submit empty form → see error messages
- [ ] Enter invalid email → see error
- [ ] Enter valid email → no errors

#### Test Submission
- [ ] Fill in valid email
- [ ] Optionally add name
- [ ] Click "Join Waitlist"
- [ ] Loading spinner appears
- [ ] Success toast notification shows
- [ ] Modal closes automatically

#### Verify Backend
- [ ] Check your email (NOTIFICATION_EMAIL)
- [ ] Verify you received admin notification
- [ ] Check the test email inbox
- [ ] Verify user received confirmation email

#### Verify Database
- [ ] Go to Vercel → Storage → Your KV Database
- [ ] Click "Data" tab
- [ ] Search for `waitlist:` keys
- [ ] Verify entry exists with correct data
- [ ] Check `waitlist:count` incremented

### 4. Test Partnership Form

#### Open Modal
- [ ] Click "Interested in Partnering?" button
- [ ] Modal opens smoothly
- [ ] Form displays correctly
- [ ] All fields visible

#### Test Validation
- [ ] Submit empty form → see errors
- [ ] Enter invalid email → see error
- [ ] Enter short message → see error
- [ ] Fill all fields correctly → no errors

#### Test Submission
- [ ] Fill in all required fields:
  - Name
  - Email
  - Organization
  - Message (10+ characters)
- [ ] Click "Submit Inquiry"
- [ ] Loading spinner appears
- [ ] Success toast shows
- [ ] Modal closes

#### Verify Backend
- [ ] Check your email (NOTIFICATION_EMAIL)
- [ ] Verify detailed partnership notification received
- [ ] Check partner's email inbox
- [ ] Verify confirmation email received

#### Verify Database
- [ ] Go to Vercel KV Data Browser
- [ ] Search for `partnership:` keys
- [ ] Verify inquiry stored correctly
- [ ] Check `partnership:count` incremented
- [ ] Verify `partnership:inquiries` list updated

### 5. Test Error Handling

#### Test Duplicate Waitlist
- [ ] Submit same email twice to waitlist
- [ ] Verify error toast appears
- [ ] Message says "already on waitlist"

#### Test Network Error
- [ ] Open browser DevTools
- [ ] Go to Network tab
- [ ] Set throttling to "Offline"
- [ ] Try submitting form
- [ ] Verify error toast appears
- [ ] Return to "Online"

### 6. Email Verification

#### Admin Notifications
- [ ] Waitlist notification received
- [ ] Shows correct email/name
- [ ] Timestamp is accurate
- [ ] Partnership notification received
- [ ] Shows all form fields
- [ ] Message is readable

#### User Confirmations
- [ ] Waitlist confirmation received
- [ ] Personalized with name (if provided)
- [ ] Social links work
- [ ] Unsubscribe notice present
- [ ] Partnership confirmation received
- [ ] Shows inquiry details
- [ ] 48-hour promise mentioned

#### Email Deliverability
- [ ] Check inbox (not spam)
- [ ] Check spam folder (should NOT be there)
- [ ] Test with multiple email providers:
  - [ ] Gmail
  - [ ] Outlook
  - [ ] Apple Mail
  - [ ] Yahoo (optional)

### 7. Monitor Resend Dashboard

- [ ] Go to [resend.com/emails](https://resend.com/emails)
- [ ] Verify emails show as "Delivered"
- [ ] No bounce notifications
- [ ] No spam complaints

### 8. Performance Check

#### Lighthouse Audit
- [ ] Open Chrome DevTools
- [ ] Go to Lighthouse tab
- [ ] Run audit for:
  - [ ] Performance: 90+ score
  - [ ] Accessibility: 90+ score
  - [ ] Best Practices: 90+ score
  - [ ] SEO: 90+ score

#### Page Load
- [ ] Initial load: < 3 seconds
- [ ] Time to Interactive: < 5 seconds
- [ ] No console errors
- [ ] No 404 errors in Network tab

### 9. Cross-Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 10. Analytics Setup (Optional)

- [ ] Add Google Analytics (if using)
- [ ] Add Vercel Analytics
- [ ] Test event tracking
- [ ] Verify data appears in dashboard

## 🔧 If Issues Found

### Forms not submitting
1. Check browser console for errors
2. Verify API routes are deployed
3. Check Vercel function logs
4. Verify environment variables are set

### Emails not sending
1. Verify RESEND_API_KEY is correct
2. Check Resend dashboard for errors
3. Verify FROM_EMAIL domain is verified
4. Check spam folders

### Database not storing data
1. Verify KV database is created
2. Check environment variables
3. Look at Vercel function logs
4. Verify KV connection in Storage tab

### Styling issues
1. Clear browser cache
2. Check for CSS conflicts
3. Verify Tailwind is processing
4. Check theme provider is working

## 📊 Monitoring Setup

### Set Up Alerts

#### Vercel
- [ ] Enable deployment notifications
- [ ] Set up error alerts
- [ ] Monitor function execution

#### Resend
- [ ] Set up bounce notifications
- [ ] Monitor spam complaints
- [ ] Watch delivery rates

### Regular Checks

Daily:
- [ ] Check Resend dashboard
- [ ] Review Vercel logs
- [ ] Monitor error rates

Weekly:
- [ ] Review waitlist growth
- [ ] Check partnership inquiries
- [ ] Export data backup

Monthly:
- [ ] Review email deliverability
- [ ] Check performance metrics
- [ ] Update dependencies

## 🎉 Deployment Complete!

Once all items are checked:

- [ ] Share production URL with team
- [ ] Update documentation with live URL
- [ ] Add site to marketing materials
- [ ] Share on social media
- [ ] Monitor for 24 hours post-launch

## 📞 Support Contacts

**Vercel Support:** [vercel.com/support](https://vercel.com/support)  
**Resend Support:** [resend.com/support](https://resend.com/support)  
**Project Owner:** Check README.md for contact info

---

**Last Updated:** March 2, 2026  
**Version:** 1.0.0
