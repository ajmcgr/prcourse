
-- Update user_payments table to ensure it has the necessary fields for tracking Stripe payments

-- First check if stripe_customer_id column exists, if not add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'user_payments' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE user_payments ADD COLUMN stripe_customer_id TEXT;
  END IF;
END $$;

-- First check if stripe_session_id column exists, if not add it  
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'user_payments' AND column_name = 'stripe_session_id'
  ) THEN
    ALTER TABLE user_payments ADD COLUMN stripe_session_id TEXT;
  END IF;
END $$;

-- Ensure we have the right indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON user_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_session_id ON user_payments(stripe_session_id);

-- Make sure RLS is enabled
ALTER TABLE user_payments ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for selecting payments (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_payments' AND policyname = 'Users can view own payments'
  ) THEN
    CREATE POLICY "Users can view own payments" 
      ON public.user_payments 
      FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;
END $$;
