// API Route: Get Quiz Results by Anonymous User ID
// Allows anonymous users to retrieve their results

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const anonUserId = searchParams.get('anonUserId');

    if (!anonUserId) {
      return NextResponse.json(
        { error: 'Anonymous user ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Fetch all results for this anonymous user
    const { data: results, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('anon_user_id', anonUserId)
      .eq('is_anonymous', true)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch anonymous results:', error);
      return NextResponse.json(
        { error: 'Failed to fetch results' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        results: results || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get anonymous results error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
