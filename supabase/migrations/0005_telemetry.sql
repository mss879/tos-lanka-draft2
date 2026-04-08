-- 6. PAGE VISITS
CREATE TABLE IF NOT EXISTS page_visits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    page_path TEXT NOT NULL,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'page_visits' AND policyname = 'Allow admin all visits') THEN
        ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow admin all visits" ON page_visits FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 7. ADMIN NOTES
CREATE TABLE IF NOT EXISTS admin_notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admin_notes' AND policyname = 'Allow admin all notes') THEN
        ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow admin all notes" ON admin_notes FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- ==========================================
-- FUNCTION: Auto Update Updated_At
-- ==========================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_leads_updated_at ON leads;
CREATE TRIGGER trigger_update_leads_updated_at
BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trigger_update_admin_notes_updated_at ON admin_notes;
CREATE TRIGGER trigger_update_admin_notes_updated_at
BEFORE UPDATE ON admin_notes FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================
-- RPC: Log Page Visit
-- ==========================================
CREATE OR REPLACE FUNCTION log_page_visit(
    p_visitor_id TEXT, p_page_path TEXT, p_referrer TEXT
) RETURNS UUID AS $$
DECLARE validate_id UUID;
BEGIN
    INSERT INTO page_visits (visitor_id, page_path, referrer)
    VALUES (p_visitor_id, p_page_path, p_referrer)
    RETURNING id INTO validate_id;
    RETURN validate_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
