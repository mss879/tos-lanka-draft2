import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Lazy-init admin client (env vars not available at build time on Netlify)
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;
function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabaseAdmin;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { visitorId, pagePath, referrer } = body;

    if (!visitorId || !pagePath) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Call the security definer RPC
    const { error } = await getSupabaseAdmin().rpc('log_page_visit', {
      p_visitor_id: visitorId,
      p_page_path: pagePath,
      p_referrer: referrer || null
    });

    if (error) {
      console.error('Error logging page visit:', error);
      return NextResponse.json({ error: 'Failed to log visit' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Server error in track route:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
