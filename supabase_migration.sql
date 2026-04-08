-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CHAT MESSAGES
CREATE TABLE chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read" ON chat_messages FOR SELECT USING (auth.role() = 'authenticated');

-- 2. PIPELINES AND STAGES
CREATE TABLE pipelines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE stages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin all pipelines" ON pipelines FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all stages" ON stages FOR ALL USING (auth.role() = 'authenticated');

-- 3. LEADS (Kanban CRM)
CREATE TABLE leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    subject TEXT,
    message TEXT,
    notes TEXT,
    source TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    pipeline_id UUID REFERENCES pipelines(id),
    stage_id UUID REFERENCES stages(id),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin all leads" ON leads FOR ALL USING (auth.role() = 'authenticated');

-- 4. CONTACTS ARCHIVE
CREATE TABLE contacts_archive (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lead_id UUID,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    subject TEXT,
    message TEXT,
    notes TEXT,
    source TEXT,
    metadata JSONB,
    pipeline_id UUID,
    stage_id UUID,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE contacts_archive ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin all archive" ON contacts_archive FOR ALL USING (auth.role() = 'authenticated');

-- 5. EMAIL SUBSCRIPTIONS
CREATE TABLE email_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    topic_interest TEXT,
    source TEXT,
    source_page TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin all subscriptions" ON email_subscriptions FOR ALL USING (auth.role() = 'authenticated');

-- 6. PAGE VISITS
CREATE TABLE page_visits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    page_path TEXT NOT NULL,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin all visits" ON page_visits FOR ALL USING (auth.role() = 'authenticated');

-- 7. ADMIN NOTES
CREATE TABLE admin_notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin all notes" ON admin_notes FOR ALL USING (auth.role() = 'authenticated');

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

CREATE TRIGGER trigger_update_leads_updated_at
BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_update_admin_notes_updated_at
BEFORE UPDATE ON admin_notes FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================
-- FUNCTION: Sync Leads to Contacts Archive
-- ==========================================
CREATE OR REPLACE FUNCTION sync_lead_to_archive()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO contacts_archive (lead_id, full_name, email, phone, company, subject, message, notes, source, metadata, pipeline_id, stage_id, status, created_at, updated_at)
        VALUES (NEW.id, NEW.full_name, NEW.email, NEW.phone, NEW.company, NEW.subject, NEW.message, NEW.notes, NEW.source, NEW.metadata, NEW.pipeline_id, NEW.stage_id, 'active', NEW.created_at, NEW.updated_at);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE contacts_archive
        SET full_name = NEW.full_name, email = NEW.email, phone = NEW.phone, company = NEW.company, subject = NEW.subject, message = NEW.message, notes = NEW.notes, source = NEW.source, metadata = NEW.metadata, pipeline_id = NEW.pipeline_id, stage_id = NEW.stage_id, updated_at = NEW.updated_at
        WHERE lead_id = NEW.id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE contacts_archive
        SET status = 'deleted', updated_at = NOW()
        WHERE lead_id = OLD.id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_leads_archive_sync
AFTER INSERT OR UPDATE OR DELETE ON leads
FOR EACH ROW EXECUTE FUNCTION sync_lead_to_archive();

-- ==========================================
-- RPC: Submit Contact Form
-- ==========================================
CREATE OR REPLACE FUNCTION submit_contact_form(
    p_full_name TEXT, p_email TEXT, p_phone TEXT, p_company TEXT, p_subject TEXT, p_message TEXT, p_notes TEXT, p_source TEXT, p_metadata JSONB
) RETURNS UUID AS $$
DECLARE
    v_pipeline_id UUID;
    v_stage_id UUID;
    v_lead_id UUID;
BEGIN
    SELECT id INTO v_pipeline_id FROM pipelines ORDER BY sort_order ASC LIMIT 1;
    IF v_pipeline_id IS NOT NULL THEN
        SELECT id INTO v_stage_id FROM stages WHERE pipeline_id = v_pipeline_id ORDER BY sort_order ASC LIMIT 1;
    END IF;

    INSERT INTO leads (full_name, email, phone, company, subject, message, notes, source, metadata, pipeline_id, stage_id)
    VALUES (p_full_name, p_email, p_phone, p_company, p_subject, p_message, p_notes, p_source, p_metadata, v_pipeline_id, v_stage_id)
    RETURNING id INTO v_lead_id;

    RETURN v_lead_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

-- ==========================================
-- RPC: Move Lead (Drag & Drop)
-- ==========================================
CREATE OR REPLACE FUNCTION move_lead(
    p_lead_id UUID, p_new_stage_id UUID, p_new_sort_order INTEGER
) RETURNS VOID AS $$
BEGIN
    UPDATE leads 
    SET stage_id = p_new_stage_id, sort_order = p_new_sort_order
    WHERE id = p_lead_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
