# Prosthetic Companion - Website

A modern Next.js website for the Prosthetic Companion project, featuring intelligent robotics solutions that enhance human capability.

## ✨ Features

- 🎨 Modern, responsive design with dark theme
- 📧 Serverless email integration with Resend
- 🗄️ Data storage with Vercel KV (Redis)
- 📝 Validated forms with Zod
- 🔔 Toast notifications for user feedback
- 🎭 Animated modals and transitions
- ♿ Accessible UI components
- 🚀 Production-ready and deployed on Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Vercel account (for deployment)
- Resend account (for emails)

### Installation

```bash
# Clone the repository
git clone https://github.com/Farwalker3/humanoids-now.git

# Navigate to the project
cd humanoids-now

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local
# RESEND_API_KEY=your_key_here
# NOTIFICATION_EMAIL=your_email@example.com

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide for email and database
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation details
- **[.env.example](./.env.example)** - Environment variables template

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **shadcn/ui** - Component library

### Backend & Services
- **Resend** - Email API
- **Vercel KV** - Redis database
- **Zod** - Schema validation
- **React Hook Form** - Form management

## 📁 Project Structure

```
humanoids-now/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── waitlist/       # Waitlist API route
│   │   │   └── partnership/    # Partnership API route
│   │   ├── providers/          # React context providers
│   │   ├── globals.css         # Global styles
│   │   ├── theme.css           # Theme variables
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── waitlist-modal.tsx  # Waitlist form modal
│   │   └── partnership-modal.tsx # Partnership form modal
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   │   ├── api.ts
│   │   ├── utils.ts
│   │   └── validations.ts      # Zod schemas
│   ├── types/                  # TypeScript types
│   └── config/                 # App configuration
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── SETUP.md                   # Setup instructions
├── IMPLEMENTATION_SUMMARY.md  # Technical docs
└── package.json               # Dependencies
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables in project settings
4. Create Vercel KV database from Storage tab
5. Deploy!

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 📧 Environment Variables

Required environment variables:

```bash
# Email service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFICATION_EMAIL=your-email@example.com
FROM_EMAIL=noreply@yourdomain.com

# Database (Vercel KV - auto-set by Vercel)
KV_REST_API_URL=https://xxxxx.vercel-storage.com
KV_REST_API_TOKEN=xxxxxxxxxxxxx
KV_REST_API_READ_ONLY_TOKEN=xxxxxxxxxxxxx
```

## 🎯 Key Features

### Waitlist Signup
- Collects email and optional name
- Stores in Vercel KV database
- Sends notification to admin
- Sends confirmation to user
- Prevents duplicate signups

### Partnership Inquiries
- Detailed form with validation
- Stores inquiry data
- Email notifications to both parties
- 48-hour response commitment
- Tracked in database with status

### Email Integration
- Powered by Resend
- Beautiful HTML email templates
- Admin notifications
- User confirmations
- Production-ready with domain verification

### Data Storage
- Vercel KV (Redis) for fast access
- Organized key structure
- Counters for analytics
- Easy to query and export

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ Server-side validation
- ✅ Input sanitization
- ✅ No exposed credentials in code
- ✅ HTTPS only
- ✅ CORS protection

## 📊 Monitoring

### Resend Dashboard
Monitor email delivery, bounces, and spam complaints at [resend.com/emails](https://resend.com/emails)

### Vercel KV Dashboard
View database contents and usage in your Vercel project's Storage tab

### Analytics
- Check `waitlist:count` for total waitlist signups
- Check `partnership:count` for total inquiries
- View individual entries in KV browser

## 🐛 Troubleshooting

See [SETUP.md](./SETUP.md) for common issues and solutions.

## 📝 License

This project is private and proprietary.

## 👤 Contact

- **LinkedIn:** [johncbarr](https://www.linkedin.com/in/johncbarr/)
- **X/Twitter:** [@farwalker3](https://x.com/farwalker3)
- **Website:** [Prosthetic Companion](https://humanoids-now.vercel.app) (coming soon)

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Resend](https://resend.com/)
- [Vercel](https://vercel.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Status:** ✅ Production Ready  
**Last Updated:** March 2, 2026  
**Version:** 1.0.0
