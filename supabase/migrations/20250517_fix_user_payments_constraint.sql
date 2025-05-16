
-- Remove the unique constraint that's causing conflicts
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'user_payments_user_id_payment_status_key'
  ) THEN
    ALTER TABLE public.user_payments 
    DROP CONSTRAINT user_payments_user_id_payment_status_key;
  END IF;
END $$;

-- Add index for faster lookups instead
CREATE INDEX IF NOT EXISTS idx_user_payments_user_status 
ON public.user_payments (user_id, payment_status);

-- Update any existing duplicate pending payments to be expired
UPDATE public.user_payments
SET payment_status = 'expired',
    updated_at = now()
WHERE payment_status = 'pending'
AND id NOT IN (
  SELECT DISTINCT ON (user_id) id
  FROM public.user_payments
  WHERE payment_status = 'pending'
  ORDER BY user_id, updated_at DESC
);
