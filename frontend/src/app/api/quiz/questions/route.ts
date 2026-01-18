// API Route: Get Quiz Questions
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch questions with their options
    const { data: questions, error } = await supabase
      .from('quiz_questions')
      .select(
        `
        id,
        question_text,
        juz_reference,
        ayat_reference,
        category,
        order_number,
        quiz_options (
          id,
          option_text,
          option_value,
          points
        )
      `
      )
      .order('order_number', { ascending: true });

    if (error) {
      console.error('Questions fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch questions' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        questions,
        total: questions?.length || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

