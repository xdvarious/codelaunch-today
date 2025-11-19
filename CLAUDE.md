# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CodeLaunch is a Next.js 15 SaaS boilerplate with Stripe payments, NextAuth authentication, Supabase database, and modern UI components. It's designed for rapid SaaS development using the App Router architecture.

**Tech Stack:**
- Next.js 15 (App Router) + React 19
- NextAuth v5 (beta) with Google OAuth and Email providers
- Supabase (PostgreSQL) for database and auth
- Stripe for payments (Checkout + Customer Portal)
- Resend for transactional emails
- Tailwind CSS v4 + DaisyUI components

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```
This runs `next build` followed by `next-sitemap` to generate the sitemap.

**Start production server:**
```bash
npm start
```

**Lint code:**
```bash
npm run lint
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and API routes
  - `app/api/` - API endpoints (e.g., `/api/stripe/create-checkout`, `/api/webhook/stripe`)
  - `app/dashboard/` - Protected dashboard pages
  - `app/blog/` - Blog with dynamic routes and assets in `_assets/`
- `components/` - Reusable UI components (Header, Footer, Pricing, etc.)
- `libs/` - Core utilities and integrations
- `config.js` - Centralized app configuration
- `middleware.js` - Edge-compatible NextAuth middleware

### Key Libraries

**`libs/auth.js`** - NextAuth configuration with Supabase adapter, Google, and Email providers. Exports `auth`, `signIn`, `signOut`, and `handlers`.

**`libs/supabase.js`** - Supabase client initialization for database operations. Exports both server-side and client-side Supabase clients.

**`libs/stripe.js`** - Stripe helpers:
- `createCheckout()` - Creates Stripe checkout sessions
- `createCustomerPortal()` - Creates customer portal for subscription management
- `findCheckoutSession()` - Retrieves checkout session details

**`libs/api.js`** - Axios client for frontend-to-API communication with:
- Automatic error handling and toast notifications
- 401 redirects to login
- 403 handling for unauthorized access

**`libs/resend.js`** - Email sending via Resend

**`libs/seo.js`** - SEO utilities and metadata generation

### Authentication Flow

- NextAuth v5 (beta) with JWT strategy for sessions
- `middleware.js` runs edge-compatible auth (Google only, no Email/Supabase)
- `libs/auth.js` has full auth config with EmailProvider and SupabaseAdapter
- Session available via `await auth()` in Server Components and API routes
- User ID accessible as `session?.user?.id`
- Protected routes redirect to `config.auth.loginUrl` ("/api/auth/signin")
- Supabase handles user authentication tables (users, accounts, sessions, verification_tokens)

### Stripe Payment Flow

1. User clicks checkout button (`ButtonCheckout` component)
2. API route `/api/stripe/create-checkout` calls `createCheckout()` from `libs/stripe.js`
3. User completes payment on Stripe
4. Stripe sends webhook to `/api/webhook/stripe`
5. Webhook handler updates user in database:
   - Sets `customerId`, `priceId`, and `hasAccess` fields
   - Handles events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`, etc.

### Database Tables

**Users table:**
- Standard fields: `id` (UUID), `name`, `email`, `image`, `email_verified`, `created_at`, `updated_at`
- Stripe fields: `customer_id`, `price_id`, `has_access` (boolean for access control)
- Managed by NextAuth with additional Stripe-related columns

**Leads table:**
- Fields: `id` (UUID), `email`, `created_at`
- For lead capture functionality

**NextAuth tables** (automatically managed by Supabase adapter):
- `accounts` - OAuth account information
- `sessions` - User session data
- `verification_tokens` - Email verification tokens

### Configuration System

The `config.js` file centralizes all app settings:
- `config.appName`, `config.domainName` - Basic app info
- `config.stripe.plans` - Array of Stripe pricing plans with `priceId`, `name`, `description`, `price`, `features`
- `config.resend.fromNoReply`, `config.resend.fromAdmin` - Email sender addresses
- `config.auth.loginUrl`, `config.auth.callbackUrl` - Auth URLs
- `config.colors.theme`, `config.colors.main` - Theme settings
- `config.crisp.id` - Crisp chat widget ID

Always import config via `@/config` and use it throughout the app.

### API Route Patterns

Standard API route structure:
```javascript
import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import { createClient } from "@/libs/supabase";

export async function POST(req) {
  try {
    const session = await auth();

    // Check authentication if needed
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient();

    const body = await req.json();

    // Validation
    if (!body.requiredField) {
      return NextResponse.json(
        { error: "Required field is missing" },
        { status: 400 }
      );
    }

    // Business logic here with Supabase
    // Example: const { data, error } = await supabase.from('table').select();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
```

### Component Conventions

- Use `"use client"` directive for components with interactivity/hooks
- Use Server Components by default for better performance
- Import config via `@/config` for app settings
- Use absolute imports with `@/` prefix
- Components use PascalCase (e.g., `ButtonCheckout.js`)
- DaisyUI classes for styling (e.g., `btn btn-primary`, `loading loading-spinner`)

### Middleware Behavior

The middleware in `middleware.js` uses an edge-compatible NextAuth config:
- Only includes GoogleProvider (no EmailProvider or Supabase adapter due to edge limitations)
- Uses JWT session strategy
- Matches all routes except: `/api/*`, `/_next/static/*`, `/_next/image/*`, `/favicon.ico`
- Custom middleware logic can be added inside the exported function

### Environment Variables

Required for full functionality:
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - App URL (e.g., http://localhost:3000)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (private, server-side only)
- `STRIPE_PUBLIC_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `GOOGLE_ID` - Google OAuth client ID (optional)
- `GOOGLE_SECRET` - Google OAuth client secret (optional)
- `RESEND_API_KEY` - Resend API key for emails

### Naming Conventions

- **Components:** PascalCase (e.g., `ButtonCheckout`, `HeaderBlog`)
- **API routes:** kebab-case directories with `route.js` files
- **Utilities:** camelCase (e.g., `createClient`, `createCheckout`)
- **Constants:** UPPER_SNAKE_CASE
- **Variables:** camelCase
- **Database tables:** snake_case (e.g., `users`, `leads`, `verification_tokens`)

### Image Configuration

Remote image domains whitelisted in `next.config.js`:
- `lh3.googleusercontent.com` (Google avatars)
- `pbs.twimg.com` (Twitter avatars)
- `images.unsplash.com` (Unsplash images)
- `logos-world.net` (Logos)

### Testing Stripe Webhooks Locally

Use Stripe CLI to forward webhook events:
```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

Set the webhook signing secret in `.env.local` from the CLI output.

## Important Patterns

### Database Operations
Use the Supabase client from `@/libs/supabase` for all database operations:
```javascript
const supabase = createClient();
const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
```

### Error Handling
- Wrap async operations in try-catch blocks
- Return appropriate HTTP status codes (400 for validation, 401 for auth, 403 for forbidden, 500 for server errors)
- Log errors with `console.error()`
- Provide user-friendly error messages
- Check Supabase `error` object in responses: `if (error) throw error;`

### Access Control
Check `user.has_access` field to determine if user has paid/subscribed and can access premium features.

### Client-side API Calls
Use `apiClient` from `@/libs/api.js` for all frontend-to-backend API calls. It handles errors automatically with toast notifications and redirects on 401.

### Blog Structure
The blog uses a content-based approach with assets in `app/blog/_assets/`:
- `content.js` contains articles data
- Components in `_assets/components/` (HeaderBlog, CardArticle, etc.)
- Dynamic routes: `/blog/[articleId]`, `/blog/category/[categoryId]`, `/blog/author/[authorId]`
