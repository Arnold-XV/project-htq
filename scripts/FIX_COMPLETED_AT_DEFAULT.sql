-- FIX: Remove DEFAULT NOW() from completed_at
-- This prevents quiz_results from being marked as completed immediately upon creation

-- Step 1: Remove DEFAULT constraint
ALTER TABLE quiz_results 
ALTER COLUMN completed_at DROP DEFAULT;

-- Step 2: Set existing incomplete quiz results to NULL
-- (Only keep completed_at for records that actually have final_juz)
UPDATE quiz_results 
SET completed_at = NULL 
WHERE final_juz IS NULL;

-- Step 3: Verify fix
SELECT 
  id,
  user_id,
  extraversion_score,
  final_juz,
  completed_at,
  CASE 
    WHEN completed_at IS NULL THEN 'IN PROGRESS'
    WHEN completed_at IS NOT NULL THEN 'COMPLETED'
  END as status
FROM quiz_results
ORDER BY id DESC
LIMIT 10;

-- Expected: Only records with final_juz should have completed_at
COMMENT ON COLUMN quiz_results.completed_at IS 
'Timestamp when quiz was fully completed (Layer 3 or 4). NULL = in-progress. Should ONLY be set when final_juz is determined.';
