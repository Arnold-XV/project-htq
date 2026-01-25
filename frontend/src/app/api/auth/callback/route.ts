// API Route: Google OAuth Callback Handler
// Handles redirect from Google after user authorizes
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/complete-profile';

    if (!code) {
      return NextResponse.redirect(`${origin}/login?error=no_code`);
    }

    const supabase = await createClient();

    // Exchange code for session
    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('❌ Session exchange error:', sessionError);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    if (!sessionData.user) {
      return NextResponse.redirect(`${origin}/login?error=no_user`);
    }

    console.log('✅ Google OAuth successful for user:', sessionData.user.id);

    // Check if user profile exists in our users table
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id, name, gender, date_of_birth, photo_url')
      .eq('id', sessionData.user.id)
      .single();

    // If user doesn't exist or profile incomplete, redirect to complete-profile
    if (userError || !existingUser || !existingUser.name || !existingUser.gender || !existingUser.date_of_birth) {
      console.log('🔵 New user or incomplete profile, redirecting to complete-profile');
      return NextResponse.redirect(`${origin}/complete-profile`);
    }

    // If profile is complete, redirect to dashboard or next page
    console.log('✅ Profile complete, redirecting to:', next);
    return NextResponse.redirect(`${origin}${next}`);
    
  } catch (error: any) {
    console.error('❌ Callback error:', error);
    return NextResponse.redirect(`${new URL(request.url).origin}/login?error=server_error`);
  }
}
