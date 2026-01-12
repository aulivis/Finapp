-- ============================================================================
-- CLEANUP: Drop old/unused tables
-- ============================================================================

-- Drop tables that are no longer used
DROP TABLE IF EXISTS users_access CASCADE;
DROP TABLE IF EXISTS calculator_usage CASCADE;
DROP TABLE IF EXISTS email_logs CASCADE;
DROP TABLE IF EXISTS ai_generated_content CASCADE;
DROP TABLE IF EXISTS macro_data CASCADE;

-- ============================================================================
-- CREATE: Newsletter subscribers table
-- ============================================================================

-- Newsletter subscribers table
-- Stores email addresses for newsletter subscription
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON newsletter_subscribers(is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anonymous inserts for newsletter subscriptions
CREATE POLICY "Allow anonymous newsletter signup" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read/update newsletter_subscribers
CREATE POLICY "Service role can manage subscribers" ON newsletter_subscribers
  FOR ALL
  USING (auth.role() = 'service_role');
