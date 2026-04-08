-- 1. Create the articles table
CREATE TABLE published_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) on the table
ALTER TABLE published_articles ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read-access for published articles (anyone can view them on the site)
CREATE POLICY "Allow public read-access for articles"
ON published_articles FOR SELECT
USING (true);

-- 4. Allow ONLY fully authenticated users to insert/update/delete articles via the Admin portal
CREATE POLICY "Allow authenticated full access to articles"
ON published_articles FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- 5. Create a storage bucket for article images
-- (Requires the storage extension to be enabled in Supabase, which is default)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('article_images', 'article_images', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Allows public access to view those uploaded images across the internet
CREATE POLICY "Public Access to Article Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article_images');

-- 7. Allow ONLY fully authenticated users to upload, update, or delete images in the bucket
CREATE POLICY "Allow authenticated upload to Article Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'article_images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated update to Article Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'article_images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated delete to Article Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'article_images' AND auth.uid() IS NOT NULL);
