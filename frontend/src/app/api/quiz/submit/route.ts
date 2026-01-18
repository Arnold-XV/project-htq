// API Route: Submit Quiz Answers
import { createClient } from '@/lib/supabase/server';
import { calculatePersonalityType } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();

    // Validation
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid answers format' },
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
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate personality type from answers
    const { type, juz, scores } = calculatePersonalityType(answers);

    // Fetch personality type details
    const { data: personalityData, error: personalityError } = await supabase
      .from('personality_types')
      .select('*')
      .eq('code', type)
      .single();

    if (personalityError) {
      console.error('Personality type fetch error:', personalityError);
    }

    // Create quiz result
    const { data: result, error: resultError } = await supabase
      .from('quiz_results')
      .insert([
        {
          user_id: user.id,
          personality_type: type,
          juz_result: personalityData?.juz_number || juz,
          title: personalityData?.name || type,
          description: personalityData?.description || '',
          strengths: personalityData?.strengths || [],
          challenges: personalityData?.challenges || [],
          advice: personalityData?.development_advice || '',
        },
      ])
      .select()
      .single();

    if (resultError) {
      console.error('Result creation error:', resultError);
      return NextResponse.json(
        { error: 'Failed to save quiz result' },
        { status: 500 }
      );
    }

    // Save individual answers
    const answerRecords = Object.entries(answers).map(([questionId, optionId]) => ({
      result_id: result.id,
      question_id: parseInt(questionId),
      option_id: typeof optionId === 'string' ? parseInt(optionId) : optionId,
    }));

    const { error: answersError } = await supabase
      .from('quiz_answers')
      .insert(answerRecords);

    if (answersError) {
      console.error('Answers save error:', answersError);
      // Non-critical error, result is already saved
    }

    return NextResponse.json(
      {
        message: 'Quiz submitted successfully',
        result: {
          id: result.id,
          personality_type: result.personality_type,
          juz_result: result.juz_result,
          title: result.title,
          scores,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submit quiz error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

