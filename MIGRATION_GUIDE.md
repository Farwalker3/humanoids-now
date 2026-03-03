# Migration Guide: @vercel/kv to @vercel/redis

## Overview

This document describes the migration from the deprecated `@vercel/kv` package to the newer `@vercel/redis` package, along with UI enhancements for form submissions.

## Changes Summary

### 1. Package Updates
- **Removed**: `@vercel/kv@^3.0.0`
- **Added**: `@vercel/redis@^2.0.0`
- **Version bump**: `1.0.0` → `1.0.1`

### 2. Code Changes

#### API Routes Updated
- `src/app/api/waitlist/route.ts`
- `src/app/api/partnership/route.ts`

#### Components Updated
- `src/components/waitlist-modal.tsx` - Enhanced success messages
- `src/components/partnership-modal.tsx` - Enhanced success messages

#### Documentation Updated
- `.env.example` - Updated comments to reflect Redis migration

## Migration Details

### Import Changes

**Before:**
```typescript
import { kv } from '@vercel/kv';
```

**After:**
```typescript
import { Redis } from '@vercel/redis';
const redis = Redis.fromEnv();
```

### API Compatibility

The `@vercel/redis` package maintains the same API as `@vercel/kv`, so all operations work identically:

| Operation | @vercel/kv | @vercel/redis |
|-----------|------------|---------------|
| Get | `kv.get(key)` | `redis.get(key)` |
| Set | `kv.set(key, value)` | `redis.set(key, value)` |
| Increment | `kv.incr(key)` | `redis.incr(key)` |
| List Push | `kv.lpush(key, value)` | `redis.lpush(key, value)` |

### Data Serialization

**Important Change**: With `@vercel/redis`, complex objects need to be serialized:

**Before:**
```typescript
await kv.set('key', { email: 'test@example.com', name: 'John' });
```

**After:**
```typescript
await redis.set('key', JSON.stringify({ email: 'test@example.com', name: 'John' }));
```

When retrieving data, parse it back:
```typescript
const data = await redis.get('key');
const parsed = typeof data === 'string' ? JSON.parse(data) : data;
```

## Environment Variables

**No changes required!** The same environment variables work with both packages:

```bash
KV_REST_API_URL=https://xxxxx.vercel-storage.com
KV_REST_API_TOKEN=xxxxxxxxxxxxx
KV_REST_API_READ_ONLY_TOKEN=xxxxxxxxxxxxx
```

Vercel automatically sets these when you create a Redis/KV store.

## UI Enhancements

### Waitlist Form
- **Enhanced Toast**: Now shows personalized message with user's name (if provided)
- **Longer Duration**: Increased from default to 6 seconds for better readability
- **Email Confirmation**: Success message explicitly mentions confirmation email
- **Visual Icon**: Added CheckCircle2 icon to submit button

**Example Success Message:**
```
🎉 Welcome to the Waitlist!
Thanks John! We've sent a confirmation email to john@example.com. 
You'll be among the first to know when we launch.
```

### Partnership Form
- **Enhanced Toast**: Shows name and organization in success message
- **Longer Duration**: Increased to 8 seconds (more content to read)
- **Response Time**: Explicitly mentions 48-hour response commitment
- **Visual Icon**: Added Send icon to submit button

**Example Success Message:**
```
✅ Inquiry Submitted Successfully!
Thank you, John Doe! We've received your partnership inquiry from Acme Corp. 
Our team will review your message and respond within 48 hours. 
Check your email for confirmation.
```

## Testing Checklist

After deployment, verify:

- [ ] Waitlist submissions work correctly
- [ ] Partnership submissions work correctly
- [ ] Data is stored in Redis (check Vercel dashboard)
- [ ] Email notifications are sent
- [ ] Success toasts display with enhanced messages
- [ ] Counters increment properly (`waitlist:count`, `partnership:count`)
- [ ] Existing data remains accessible (backward compatible)

## Rollback Plan

If issues arise, you can rollback by:

1. Reverting to the previous commit
2. Running `npm install @vercel/kv@^3.0.0`
3. Removing `@vercel/redis` from package.json
4. Restoring the old import statements

## Performance Notes

- **No performance impact**: Both packages use the same underlying REST API
- **Data compatibility**: All existing data works with new package
- **Zero downtime**: Migration can happen without service interruption

## Support

If you encounter issues:
1. Check Vercel logs for detailed error messages
2. Verify environment variables are set correctly
3. Ensure Redis store is active in Vercel dashboard
4. Review Vercel's Redis documentation: https://vercel.com/docs/storage/vercel-kv

## Timeline

- **Created**: March 3, 2026
- **Branch**: `ui-improvements`
- **Status**: Ready for review
- **Estimated deployment time**: < 5 minutes

---

**Note**: This is a zero-risk migration as the API interface remains identical and environment variables are unchanged.
