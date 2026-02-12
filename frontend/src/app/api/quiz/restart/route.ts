// API Route: Delete In-Progress Quiz
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Delete ALL in-progress quiz results for this user
    // (completed_at IS NULL OR final_juz IS NULL)
    const { data: deleted, error: deleteError } = await supabase
      .from('quiz_results')
      .delete()
      .eq('user_id', user.id)
      .or('completed_at.is.null,final_juz.is.null')
      .select();

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete in-progress quiz', details: deleteError.message },
        { status: 500 }
      );
    }

    console.log(`✅ Deleted ${deleted?.length || 0} in-progress quiz(es) for user ${user.id}`);

    return NextResponse.json({
      success: true,
      deleted_count: deleted?.length || 0,
      message: 'In-progress quiz deleted successfully',
    });
  } catch (error: any) {
    console.error('Restart quiz error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
