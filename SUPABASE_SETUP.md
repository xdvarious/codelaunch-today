# Supabase Setup Guide

This guide will help you set up Supabase for your CodeLaunch project after migrating from MongoDB.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up or log in
2. Click "New Project"
3. Choose your organization
4. Enter a project name and database password
5. Select a region closest to your users
6. Click "Create new project"

## 2. Get Your Environment Variables

Once your project is created:

1. Go to Project Settings > API
2. Copy the following values to your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Keep your existing environment variables
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret
RESEND_API_KEY=your_resend_api_key
```

## 3. Set Up Database Tables

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the entire contents of `supabase-schema.sql`
3. Paste it into the SQL Editor and click "Run"

This will create:
- The base NextAuth tables (users, accounts, sessions, verification_tokens)
- Additional Stripe-related columns on the users table (customer_id, price_id, has_access)
- The leads table for lead capture functionality
- Necessary indexes and Row Level Security policies

## 4. Verify the Setup

After running the schema:

1. Go to Table Editor in Supabase
2. Verify you see these tables:
   - `users` (with customer_id, price_id, has_access columns)
   - `accounts`
   - `sessions`
   - `verification_tokens`
   - `leads`

## 5. Update Row Level Security (Optional)

If you need to customize access control:

1. Go to Authentication > Policies in Supabase
2. Review the policies on the `leads` table
3. Add additional policies as needed for your use case

## 6. Test Your Application

1. Start your development server: `npm run dev`
2. Test authentication flow (sign in with Google or Email)
3. Test Stripe checkout flow
4. Verify webhook handling works correctly

## Migration Notes

### Key Differences from MongoDB

1. **Field Names**: Supabase uses snake_case (e.g., `customer_id`) instead of camelCase (e.g., `customerId`)
2. **IDs**: Uses UUID instead of MongoDB ObjectId
3. **Timestamps**: Automatically managed with `created_at` and `updated_at` columns
4. **Queries**: Uses PostgreSQL syntax instead of Mongoose methods

### Updated API Patterns

Old (MongoDB/Mongoose):
```javascript
const user = await User.findById(userId);
user.hasAccess = true;
await user.save();
```

New (Supabase):
```javascript
const { data: user, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();

const { error: updateError } = await supabase
  .from('users')
  .update({ has_access: true })
  .eq('id', userId);
```

## Troubleshooting

### Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is not paused
- Ensure you're using the service role key for server-side operations

### Authentication Issues
- Make sure you've run the schema SQL to create NextAuth tables
- Verify your email provider settings in NextAuth
- Check Supabase Authentication settings allow email/password or OAuth

### Stripe Integration Issues
- Update webhooks to use snake_case field names (customer_id, price_id, has_access)
- Verify the Stripe webhook is hitting your `/api/webhook/stripe` endpoint
- Check Supabase logs for any database errors

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth Supabase Adapter](https://authjs.dev/reference/adapter/supabase)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
