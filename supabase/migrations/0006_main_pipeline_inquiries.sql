-- 1. ADD IS_DEFAULT TO PIPELINES
ALTER TABLE pipelines ADD COLUMN IF NOT EXISTS is_default BOOLEAN DEFAULT false;

-- 2. SEED MAIN PIPELINE & SEED STAGES (Idempotent using a quick DO block)
DO $$
DECLARE
    main_pipeline_id UUID;
BEGIN
    -- Check if Main Pipeline already exists
    SELECT id INTO main_pipeline_id FROM pipelines WHERE is_default = true LIMIT 1;
    
    IF main_pipeline_id IS NULL THEN
        -- Create the pipeline
        INSERT INTO pipelines (name, sort_order, is_default)
        VALUES ('Main Pipeline', 0, true)
        RETURNING id INTO main_pipeline_id;
        
        -- Insert standard stages
        INSERT INTO stages (pipeline_id, name, sort_order) VALUES
        (main_pipeline_id, 'New Leads', 10),
        (main_pipeline_id, 'Contacted', 20),
        (main_pipeline_id, 'Proposal Sent', 30),
        (main_pipeline_id, 'Negotiation', 40),
        (main_pipeline_id, 'Closed Won', 50),
        (main_pipeline_id, 'Closed Lost', 60);
    END IF;
END $$;

-- 3. CREATE CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS contact_inquiries (
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
    converted_to_lead BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_inquiries' AND policyname = 'Allow admin all inquiries') THEN
        ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow admin all inquiries" ON contact_inquiries FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 4. REWRITE SUBMIT_CONTACT_FORM TO USE INQUIRIES
CREATE OR REPLACE FUNCTION submit_contact_form(
    p_full_name TEXT, p_email TEXT, p_phone TEXT, p_company TEXT, p_subject TEXT, p_message TEXT, p_notes TEXT, p_source TEXT, p_metadata JSONB
) RETURNS UUID AS $$
DECLARE
    v_inquiry_id UUID;
BEGIN
    INSERT INTO contact_inquiries (full_name, email, phone, company, subject, message, notes, source, metadata)
    VALUES (p_full_name, p_email, p_phone, p_company, p_subject, p_message, p_notes, p_source, p_metadata)
    RETURNING id INTO v_inquiry_id;

    RETURN v_inquiry_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RPC TO PROMOTE INQUIRY TO LEAD
CREATE OR REPLACE FUNCTION promote_inquiry_to_lead(
    p_inquiry_id UUID, p_pipeline_id UUID, p_stage_id UUID
) RETURNS UUID AS $$
DECLARE
    v_lead_id UUID;
    v_inq RECORD;
    v_new_sort_order INTEGER;
BEGIN
    -- Fetch the inquiry
    SELECT * INTO v_inq FROM contact_inquiries WHERE id = p_inquiry_id AND converted_to_lead = false;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Inquiry not found or already converted';
    END IF;
    
    -- Determine sort order for target stage
    SELECT COALESCE(MAX(sort_order), 0) + 10 INTO v_new_sort_order FROM leads WHERE stage_id = p_stage_id;

    -- Insert into leads
    INSERT INTO leads (full_name, email, phone, company, subject, message, notes, source, metadata, pipeline_id, stage_id, sort_order)
    VALUES (v_inq.full_name, v_inq.email, v_inq.phone, v_inq.company, v_inq.subject, v_inq.message, v_inq.notes, v_inq.source, v_inq.metadata, p_pipeline_id, p_stage_id, v_new_sort_order)
    RETURNING id INTO v_lead_id;
    
    -- Mark as converted
    UPDATE contact_inquiries SET converted_to_lead = true WHERE id = p_inquiry_id;

    RETURN v_lead_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
