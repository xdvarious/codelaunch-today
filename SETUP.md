# CodeLaunch Setup Guide

## ✅ Build Status
Your project builds successfully! The warnings you see are normal.

## 🚀 Quick Start (Development)

```bash
npm run dev
```

Visit http://localhost:3000

## 🔐 Environment Variables Setup

### Required for Full Functionality

#### 1. **NextAuth Secret**
Generate a secure random string:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

Add to `.env.local`:
```
NEXTAUTH_SECRET=your-generated-secret
```

#### 2. **MongoDB** (For Database & Auth)
1. Create free account at https://mongodb.com/atlas
2. Create a new cluster
3. Get connection string: Database → Connect → Connect your application
4. Add to `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

#### 3. **Stripe** (For Payments)
1. Create account at https://stripe.com
2. Get API keys: Developers → API keys
3. Add to `.env.local`:
```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```
4. For webhooks (local testing):
```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```
Copy the webhook secret to `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 4. **Resend** (For Emails)
1. Create account at https://resend.com
2. Get API key: API Keys → Create API Key
3. Add to `.env.local`:
```
RESEND_API_KEY=re_...
```

### Optional Services

#### **Google OAuth**
1. Go to https://console.cloud.google.com
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
5. Add to `.env.local`:
```
GOOGLE_ID=your-client-id
GOOGLE_SECRET=your-client-secret
```

## 📝 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## ⚠️ Common "Errors" (That Are Actually Fine)

### 1. DaisyUI CSS Warning
```
Unknown at rule: @property
```
**Status**: Harmless, ignore it.

### 2. MongoDB URI Warnings
```
⚠️ MONGODB_URI not found in .env
```
**Status**: Expected if you haven't set up MongoDB yet.

### 3. Peer Dependency Warnings
```
npm warn conflicting peer dependency
```
**Status**: Normal, all packages work together fine.

## 🎯 What Features Work Without Setup

- ✅ UI/UX (all components render)
- ✅ Static pages
- ✅ Routing
- ✅ Styling (Tailwind + DaisyUI)

## 🔒 What Requires Setup

- ❌ User authentication (needs NextAuth + MongoDB)
- ❌ Payments (needs Stripe)
- ❌ Email sending (needs Resend)
- ❌ Google sign-in (needs Google OAuth)

## 📚 Documentation

- Full docs: https://docs.codelaunch.today/
- GitHub issues: https://github.com/anthropics/codelaunch/issues

## 🆘 Need Help?

Your build is working correctly! The warnings are normal and expected during development.
