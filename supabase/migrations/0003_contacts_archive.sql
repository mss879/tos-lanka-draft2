-- 4. CONTACTS ARCHIVE
CREATE TABLE IF NOT EXISTS contacts_archive (
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

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contacts_archive' AND policyname = 'Allow admin all archive') THEN
        ALTER TABLE contacts_archive ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow admin all archive" ON contacts_archive FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

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

-- Remove trigger if exists to recreate safely
DROP TRIGGER IF EXISTS trigger_leads_archive_sync ON leads;
CREATE TRIGGER trigger_leads_archive_sync
AFTER INSERT OR UPDATE OR DELETE ON leads
FOR EACH ROW EXECUTE FUNCTION sync_lead_to_archive();
