-- CodeLaunch Supabase Database Schema
-- This file contains the SQL schema for the Supabase database
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends NextAuth users table with Stripe fields)
-- Note: The base NextAuth tables (users, accounts, sessions, verification_tokens)
-- are automatically created by the Supabase adapter
-- We only need to add the Stripe-related columns to the users table

-- Add Stripe-related columns to the users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS customer_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS price_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS has_access BOOLEAN DEFAULT FALSE;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_customer_id ON users(customer_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Leads table for lead capture functionality
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table
-- Allow service role to do everything
CREATE POLICY "Service role can do everything on leads"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to insert leads (for API routes)
CREATE POLICY "Authenticated users can insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Comments for documentation
COMMENT ON TABLE leads IS 'Stores email leads captured from the landing page';
COMMENT ON COLUMN users.customer_id IS 'Stripe customer ID (starts with cus_)';
COMMENT ON COLUMN users.price_id IS 'Stripe price ID for the user subscription (starts with price_)';
COMMENT ON COLUMN users.has_access IS 'Boolean flag indicating if user has paid/subscribed and can access premium features';
