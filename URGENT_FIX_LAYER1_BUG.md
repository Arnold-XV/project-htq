# URGENT FIX: Layer 1 Redirect Bug

## 🐛 **Root Cause Identified**

Database schema has **critical bug**:

```sql
-- ❌ WRONG: completed_at has DEFAULT NOW()
completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
```

**Impact**:
1. ✅ User submits Layer 1 → quiz_results INSERT
2. ❌ **Database auto-sets `completed_at = NOW()`** 
3. ❌ Resume API sees `completed_at` → treats as completed
4. ❌ Redirects to `/result` instead of Layer 2
5. ❌ "Ulangi Test" doesn't delete DB record → same bug repeats

## ✅ **Solution Applied**

### 1. Database Fix (RUN THIS FIRST!)
**File**: `scripts/FIX_COMPLETED_AT_DEFAULT.sql`

```sql
-- Remove DEFAULT NOW()
ALTER TABLE quiz_results 
ALTER COLUMN completed_at DROP DEFAULT;

-- Fix existing broken records
UPDATE quiz_results 
SET completed_at = NULL 
WHERE final_juz IS NULL;
```

**How to run**:
1. Open Supabase SQL Editor
2. Copy-paste script content
3. Execute
4. Verify: `SELECT * FROM quiz_results WHERE completed_at IS NOT NULL AND final_juz IS NULL;`
   - Should return **0 rows**

### 2. Resume API Fix (DEPLOYED)
**File**: `frontend/src/app/api/quiz/resume/route.ts`

**Before**:
```typescript
if (result.completed_at) {  // ❌ Too simple
```

**After**:
```typescript
// Must have BOTH completed_at AND final_juz
if (result.completed_at && result.final_juz) {  // ✅ Defensive
```

### 3. Restart Quiz API (NEW)
**File**: `frontend/src/app/api/quiz/restart/route.ts`

Deletes in-progress quiz from database before starting new one.

```typescript
DELETE FROM quiz_results 
WHERE user_id = ? 
AND (completed_at IS NULL OR final_juz IS NULL)
```

### 4. "Ulangi Test" Button Fix (UPDATED)
**File**: `frontend/src/components/result-page/restart-test-button.tsx`

Now calls `/api/quiz/restart` before redirecting.

## 🚀 **How to Test**

### Test 1: Layer 1 → Layer 2 Flow
1. ✅ Run SQL fix first
2. ✅ Start new quiz
3. ✅ Complete Layer 1 (11 questions)
4. ✅ Click "Lanjutkan"
5. **Expected**: Redirect to `/test/2` (Layer 2)
6. **NOT**: Redirect to `/result`

### Test 2: "Ulangi Test" Button
1. ✅ Start quiz, complete Layer 1
2. ✅ Click "Ulangi Test" on result page
3. **Expected**: Redirects to `/test/1` with fresh quiz
4. **NOT**: Redirects to `/result` with old quiz

### Test 3: Resume Mid-Quiz
1. ✅ Start quiz, complete Layer 1
2. ✅ Close browser
3. ✅ Open again → visit `/test/1`
4. **Expected**: Auto-redirect to `/test/2`
5. **NOT**: Redirect to `/result`

## 📋 **Verification Checklist**

Before testing, verify:
- [ ] SQL script executed successfully
- [ ] Dev server restarted (`npm run dev`)
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Console tab open to see logs

Expected console logs after Layer 1 submit:
```
📥 Submit response: { next_layer: 2, ... }
✅ CASE 3: next_layer = 2
🔄 Fetching questions for next layer: /api/quiz/questions?layer=2
✅ Questions loaded, navigating to: /test/2
```

## 🔥 **If Still Broken**

1. **Check database**:
```sql
SELECT 
  id, 
  extraversion_score,
  final_juz,
  completed_at,
  CASE 
    WHEN completed_at IS NOT NULL AND final_juz IS NULL THEN '❌ BROKEN'
    WHEN completed_at IS NULL THEN '✅ IN PROGRESS'
    WHEN completed_at IS NOT NULL AND final_juz IS NOT NULL THEN '✅ COMPLETED'
  END as status
FROM quiz_results 
WHERE user_id = 'YOUR_USER_ID'
ORDER BY id DESC;
```

2. **Check API response**:
   - Open Network tab → Filter: Fetch/XHR
   - Submit Layer 1 → Find `/api/quiz/submit` request
   - Check response: Should have `"next_layer": 2`

3. **Check resume API**:
   - Visit `/test/1` → Check console
   - Should see: `"state": "in_progress", "current_layer": 2`
   - NOT: `"state": "completed"`

## 📞 **Debug Commands**

```sql
-- Check all user's quiz results
SELECT * FROM quiz_results WHERE user_id = 'YOUR_USER_ID';

-- Delete all in-progress quizzes manually
DELETE FROM quiz_results 
WHERE user_id = 'YOUR_USER_ID' 
AND (completed_at IS NULL OR final_juz IS NULL);

-- Check table schema
\d+ quiz_results;
```

---

**Status**: Ready for testing
**Priority**: CRITICAL - blocks all quiz functionality
**Files Modified**: 4 (2 new, 2 updated)
