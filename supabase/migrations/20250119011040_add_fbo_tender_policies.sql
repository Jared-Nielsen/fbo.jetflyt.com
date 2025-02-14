
-- First, enable RLS on fbo_tenders if not already enabled
ALTER TABLE fbo_tenders ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Users can view tenders for their FBOs" ON fbo_tenders;
DROP POLICY IF EXISTS "Debug view policy for fbo_tenders" ON fbo_tenders;

-- Create a more permissive debug policy temporarily
CREATE POLICY "Debug view policy for fbo_tenders"
ON fbo_tenders
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM user_fbos 
    WHERE user_fbos.user_id = auth.uid()
      AND user_fbos.fbo_id = fbo_tenders.fbo_id
      AND user_fbos.status = 'approved'
  )
);

-- Allow users to update tenders for their FBOs
CREATE POLICY "Users can update tenders for their FBOs"
ON fbo_tenders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM user_fbos 
    WHERE user_fbos.user_id = auth.uid()
      AND user_fbos.fbo_id = fbo_tenders.fbo_id
      AND user_fbos.status = 'approved'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM user_fbos 
    WHERE user_fbos.user_id = auth.uid()
      AND user_fbos.fbo_id = fbo_tenders.fbo_id
      AND user_fbos.status = 'approved'
  )
);
