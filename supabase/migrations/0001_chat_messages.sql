-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: We wrap the policy creation so it doesn't fail if already ran
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'Allow anonymous inserts'
    ) THEN
        ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow anonymous inserts" ON chat_messages FOR INSERT WITH CHECK (true);
        CREATE POLICY "Allow admin read" ON chat_messages FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
END $$;
