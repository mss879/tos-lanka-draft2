-- 2. PIPELINES AND STAGES
CREATE TABLE IF NOT EXISTS pipelines (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pipelines' AND policyname = 'Allow admin all pipelines') THEN
        ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;
        ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow admin all pipelines" ON pipelines FOR ALL USING (auth.role() = 'authenticated');
        CREATE POLICY "Allow admin all stages" ON stages FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 3. LEADS (Kanban CRM)
CREATE TABLE IF NOT EXISTS leads (
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

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Allow admin all leads') THEN
        ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow admin all leads" ON leads FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

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
