
-- Create user FBOs table
CREATE TABLE user_fbos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  fbo_id uuid REFERENCES fbos(id) ON DELETE CASCADE,
  status text CHECK (status IN ('requested', 'approved', 'rejected')) DEFAULT 'requested',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, fbo_id)
);

-- Enable RLS
ALTER TABLE user_fbos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own associations"
  ON user_fbos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own associations"
  ON user_fbos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_user_fbos_updated_at
  BEFORE UPDATE ON user_fbos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

