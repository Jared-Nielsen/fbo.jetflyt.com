-- Create a function to update fbo_tender fields
CREATE OR REPLACE FUNCTION public.update_fbo_tender(
  p_tender_id uuid,
  p_status text,
  p_counter_price numeric,
  p_taxes_and_fees numeric
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if the user has permission to update this tender
  IF NOT EXISTS (
    SELECT 1 
    FROM fbo_tenders t
    JOIN user_fbos uf ON uf.fbo_id = t.fbo_id
    WHERE t.id = p_tender_id
    AND uf.user_id = auth.uid()
    AND uf.status = 'approved'
  ) THEN
    RAISE EXCEPTION 'Not authorized to update this tender';
  END IF;

  UPDATE fbo_tenders
  SET
    counter_price = p_counter_price,
    taxes_and_fees = p_taxes_and_fees,
    status = p_status,
    updated_at = NOW()
  WHERE id = p_tender_id;
END;
$$;
