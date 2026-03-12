CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'waitlist'
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Deny all reads" ON subscribers
  FOR SELECT USING (false);
