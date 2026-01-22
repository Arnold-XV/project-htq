// API Route: Merge Anonymous User Data to Registered User
// This endpoint is called after a user registers/logs in
// to migrate their anonymous quiz results to their new account

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { anonUserId } = await request.json();

    // Validation
    if (!anonUserId || typeof anonUserId !== 'string') {
      return NextResponse.json(
        { error: 'Anonymous user ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - must be logged in' },
        { status: 401 }
      );
    }

    // Find all anonymous results with this anon_user_id
    const { data: anonResults, error: fetchError } = await supabase
      .from('quiz_results')
      .select('id')
      .eq('anon_user_id', anonUserId)
      .eq('is_anonymous', true);

    if (fetchError) {
      console.error('Failed to fetch anonymous results:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch anonymous data' },
        { status: 500 }
      );
    }

    if (!anonResults || anonResults.length === 0) {
      return NextResponse.json(
        { 
          message: 'No anonymous results found to merge',
          mergedCount: 0,
        },
        { status: 200 }
      );
    }

    // Update all anonymous results to be owned by the authenticated user
    const { error: updateError } = await supabase
      .from('quiz_results')
      .update({
        user_id: user.id,
        is_anonymous: false,
        anon_user_id: null, // Clear the anonymous ID
      })
      .eq('anon_user_id', anonUserId)
      .eq('is_anonymous', true);

    if (updateError) {
      console.error('Failed to merge results:', updateError);
      return NextResponse.json(
        { error: 'Failed to merge anonymous data' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Anonymous results successfully merged',
        mergedCount: anonResults.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Merge anonymous data error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
