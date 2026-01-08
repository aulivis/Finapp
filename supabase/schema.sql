-- Email-based access table
-- Stores email addresses that have paid access
CREATE TABLE IF NOT EXISTS users_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  access_valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  stripe_customer_id TEXT,
  stripe_checkout_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_users_access_email ON users_access(email);
CREATE INDEX IF NOT EXISTS idx_users_access_valid_until ON users_access(access_valid_until);

-- Calculator usage log (optional, for analytics)
CREATE TABLE IF NOT EXISTS calculator_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  calculator_type TEXT NOT NULL,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for usage queries
CREATE INDEX IF NOT EXISTS idx_calculator_usage_email ON calculator_usage(email);
CREATE INDEX IF NOT EXISTS idx_calculator_usage_type ON calculator_usage(calculator_type);

-- Enable Row Level Security
ALTER TABLE users_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Only service role can read/write users_access
CREATE POLICY "Service role only" ON users_access
  FOR ALL
  USING (auth.role() = 'service_role');

-- Allow anonymous inserts for calculator_usage (no sensitive data)
CREATE POLICY "Allow anonymous inserts" ON calculator_usage
  FOR INSERT
  WITH CHECK (true);

-- Allow service role to read calculator_usage
CREATE POLICY "Service role can read usage" ON calculator_usage
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Macroeconomic data table
-- Stores historical and current macroeconomic indicators
CREATE TABLE IF NOT EXISTS macro_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL DEFAULT 'HU',
  year INTEGER NOT NULL,
  inflation_rate DECIMAL(5, 2) NOT NULL,
  interest_rate DECIMAL(5, 2),
  m2_growth DECIMAL(5, 2), -- M2 money supply growth rate (annual %)
  source TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(country, year)
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_macro_data_country_year ON macro_data(country, year);
CREATE INDEX IF NOT EXISTS idx_macro_data_year ON macro_data(year DESC);

-- Enable Row Level Security
ALTER TABLE macro_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow public read access (no sensitive data)
CREATE POLICY "Public read access" ON macro_data
  FOR SELECT
  USING (true);

-- Only service role can write
CREATE POLICY "Service role write access" ON macro_data
  FOR ALL
  USING (auth.role() = 'service_role');

-- Email logs table
-- Tracks all emails sent to users
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'sent', -- 'sent', 'failed', 'bounced'
  error_message TEXT,
  metadata JSONB
);

-- Indexes for email logs
CREATE INDEX IF NOT EXISTS idx_email_logs_email ON email_logs(email);
CREATE INDEX IF NOT EXISTS idx_email_logs_email_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);

-- Enable Row Level Security
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Only service role can read/write email_logs
CREATE POLICY "Service role only" ON email_logs
  FOR ALL
  USING (auth.role() = 'service_role');

-- AI-generated content table
-- Stores OpenAI-generated explanatory texts and summaries
CREATE TABLE IF NOT EXISTS ai_generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'quarterly_summary', 'economic_explanation', etc.
  period TEXT NOT NULL, -- '2024-01', '2024-02', etc. (YYYY-MM format)
  country TEXT NOT NULL DEFAULT 'HU',
  title TEXT,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT,
  metadata JSONB, -- Stores prompt, model, temperature, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(content_type, period, country)
);

-- Indexes for AI content
CREATE INDEX IF NOT EXISTS idx_ai_content_type_period ON ai_generated_content(content_type, period DESC);
CREATE INDEX IF NOT EXISTS idx_ai_content_status ON ai_generated_content(status);
CREATE INDEX IF NOT EXISTS idx_ai_content_country ON ai_generated_content(country);

-- Enable Row Level Security
ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Only service role can read/write ai_generated_content
CREATE POLICY "Service role only" ON ai_generated_content
  FOR ALL
  USING (auth.role() = 'service_role');
