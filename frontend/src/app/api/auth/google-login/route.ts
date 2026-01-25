// API Route: Initiate Google OAuth Login
// Redirects user to Google OAuth consent screen
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get the origin from request headers
    const { searchParams, origin } = new URL(request.url);
    const next = searchParams.get('next') ?? '/complete-profile';

    // Initiate Google OAuth sign in
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/api/auth/callback?next=${next}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('❌ Google OAuth error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!data.url) {
      return NextResponse.json(
        { error: 'Failed to get OAuth URL' },
        { status: 500 }
      );
    }

    // Redirect to Google OAuth consent screen
    return NextResponse.redirect(data.url);
  } catch (error: any) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
