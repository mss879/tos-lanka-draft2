import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Basic global instance for non-SSR fetches or static pages
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
