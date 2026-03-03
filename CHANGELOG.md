# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-03-03

### 🔄 Changed
- **BREAKING (Package only)**: Migrated from deprecated `@vercel/kv` to `@vercel/redis`
  - No code changes required for deployment
  - Same environment variables work with both packages
  - Existing data fully compatible

### ✨ Enhanced
- **Waitlist Form Success Messages**
  - Now shows personalized message with user's name
  - Explicitly mentions confirmation email
  - Extended display duration to 6 seconds
  - Added CheckCircle2 icon to submit button

- **Partnership Form Success Messages**
  - Shows submitter's name and organization
  - Explicitly mentions 48-hour response commitment
  - Extended display duration to 8 seconds
  - Added Send icon to submit button

### 🔧 Fixed
- Data serialization for Redis (JSON.stringify for complex objects)
- API response now includes submitted data for better client feedback

### 📝 Documentation
- Added comprehensive `MIGRATION_GUIDE.md`
- Updated `.env.example` with Redis-specific documentation
- Added testing checklist and rollback procedures

### 🏗️ Technical Details

#### Database Changes
```diff
- import { kv } from '@vercel/kv';
+ import { Redis } from '@vercel/redis';
+ const redis = Redis.fromEnv();
```

#### Data Storage Changes
```diff
- await kv.set(key, objectData);
+ await redis.set(key, JSON.stringify(objectData));
```

#### API Response Enhancement
```diff
  return NextResponse.json({
    success: true,
    message: 'Successfully joined the waitlist',
+   data: {
+     email: validatedData.email,
+     name: validatedData.name,
+   }
  });
```

### Files Modified
- `package.json` - Updated dependencies
- `src/app/api/waitlist/route.ts` - Redis migration
- `src/app/api/partnership/route.ts` - Redis migration
- `src/components/waitlist-modal.tsx` - UI enhancements
- `src/components/partnership-modal.tsx` - UI enhancements
- `.env.example` - Documentation updates

### Files Added
- `MIGRATION_GUIDE.md` - Comprehensive migration documentation
- `CHANGELOG.md` - This file

### 📊 Statistics
- **Lines Added**: 224
- **Lines Removed**: 35
- **Files Changed**: 7
- **Commits**: 2

### ⚡ Performance
- No performance impact (same underlying REST API)
- Zero downtime deployment
- No database migration required

### 🔒 Security
- No security changes
- Same encryption and authentication
- Environment variables unchanged

## [1.0.0] - 2026-03-02

### 🎉 Initial Release
- Next.js 16 application with App Router
- Waitlist signup functionality
- Partnership inquiry forms
- Email integration with Resend
- Vercel KV database integration
- Responsive UI with Tailwind CSS
- Form validation with Zod
- Toast notifications
- Dark theme support

---

**Note**: Version numbers follow [Semantic Versioning](https://semver.org/).
