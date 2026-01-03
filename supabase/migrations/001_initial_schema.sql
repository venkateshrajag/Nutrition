-- Saffron Suvai - Initial Database Schema
-- Migration: 001_initial_schema
-- Created: 2026-01-02

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  google_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  picture TEXT,
  has_completed_survey BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_email ON users(email);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT
  USING (auth.uid()::text = google_id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid()::text = google_id);

-- Policy: Allow insert for new users (service role)
CREATE POLICY "Allow insert for authenticated users" ON users
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- SURVEYS TABLE
-- ============================================
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  responses JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX idx_surveys_user_id ON surveys(user_id);

-- Enable Row Level Security
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own surveys
CREATE POLICY "Users can view own surveys" ON surveys
  FOR SELECT
  USING (user_id IN (
    SELECT id FROM users WHERE google_id = auth.uid()::text
  ));

-- Policy: Users can insert their own surveys
CREATE POLICY "Users can insert own surveys" ON surveys
  FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM users WHERE google_id = auth.uid()::text
  ));

-- ============================================
-- FEEDBACK TABLE
-- ============================================
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_survey_id ON feedback(survey_id);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON feedback
  FOR SELECT
  USING (user_id IN (
    SELECT id FROM users WHERE google_id = auth.uid()::text
  ));

-- Policy: Users can insert their own feedback
CREATE POLICY "Users can insert own feedback" ON feedback
  FOR INSERT
  WITH CHECK (user_id IN (
    SELECT id FROM users WHERE google_id = auth.uid()::text
  ));

-- ============================================
-- RECIPES TABLE
-- ============================================
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  prep_time INTEGER,
  cook_time INTEGER,
  calories INTEGER,
  protein DECIMAL(5,1),
  carbs DECIMAL(5,1),
  fat DECIMAL(5,1),
  fiber DECIMAL(5,1),
  ingredients JSONB,
  instructions JSONB,
  dietary_tags TEXT[],
  source_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for filtering and searching
CREATE INDEX idx_recipes_category ON recipes(category);
CREATE INDEX idx_recipes_dietary_tags ON recipes USING GIN(dietary_tags);
CREATE INDEX idx_recipes_title ON recipes(title);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view recipes (public read)
CREATE POLICY "Anyone can view recipes" ON recipes
  FOR SELECT
  USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update last_login_at timestamp
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_login_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update last_login_at on user update
CREATE TRIGGER trigger_update_last_login
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_last_login();

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE users IS 'Stores user profile information from Google OAuth';
COMMENT ON TABLE surveys IS 'Stores user nutrition survey responses';
COMMENT ON TABLE feedback IS 'Stores generated nutrition feedback for users';
COMMENT ON TABLE recipes IS 'Stores Indian recipe collection with nutrition data';
