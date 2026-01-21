// API Route: Submit Quiz Answers (Supports Anonymous Users)
import { createClient } from '@/lib/supabase/server';
import { calculatePersonalityType } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { answers, anonUserId } = await request.json();

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

    // Determine if this is an anonymous submission
    const isAnonymous = !user && anonUserId;

    if (!user && !anonUserId) {
      return NextResponse.json(
        { error: 'Either authentication or anonymous user ID is required' },
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

    // Create quiz result with anonymous support
    const resultData: any = {
      personality_type: type,
      juz_result: personalityData?.juz_number || juz,
      title: personalityData?.name || type,
      description: personalityData?.description || '',
      strengths: personalityData?.strengths || [],
      challenges: personalityData?.challenges || [],
      advice: personalityData?.development_advice || '',
    };

    if (isAnonymous) {
      resultData.anon_user_id = anonUserId;
      resultData.is_anonymous = true;
      resultData.user_id = null;
    } else {
      resultData.user_id = user!.id;
      resultData.is_anonymous = false;
      resultData.anon_user_id = null;
    }

    const { data: result, error: resultError } = await supabase
      .from('quiz_results')
      .insert([resultData])
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
          is_anonymous: isAnonymous,
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

