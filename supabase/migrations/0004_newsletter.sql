-- 5. EMAIL SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS email_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    topic_interest TEXT,
    source TEXT,
    source_page TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'email_subscriptions' AND policyname = 'Allow admin all subscriptions') THEN
        ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow admin all subscriptions" ON email_subscriptions FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- ==========================================
-- RPC: Subscribe Email List
-- ==========================================
CREATE OR REPLACE FUNCTION subscribe_email_list(
    p_email TEXT, p_topic_interest TEXT, p_source TEXT, p_source_page TEXT
) RETURNS UUID AS $$
DECLARE
    v_sub_id UUID;
BEGIN
    INSERT INTO email_subscriptions (email, topic_interest, source, source_page)
    VALUES (p_email, p_topic_interest, p_source, p_source_page)
    ON CONFLICT (email) DO UPDATE SET 
        topic_interest = EXCLUDED.topic_interest,
        subscribed_at = NOW()
    RETURNING id INTO v_sub_id;
    RETURN v_sub_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
