-- Add payment fields to orders table
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS amount_paid numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
ADD COLUMN IF NOT EXISTS payment_method text CHECK (payment_method IN ('upi', 'card')),
ADD COLUMN IF NOT EXISTS razorpay_order_id text,
ADD COLUMN IF NOT EXISTS razorpay_payment_id text,
ADD COLUMN IF NOT EXISTS paid_at timestamp with time zone;

-- Update orders status to use new values
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Add payment fields to event_bookings table
ALTER TABLE public.event_bookings
ADD COLUMN IF NOT EXISTS amount_paid numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
ADD COLUMN IF NOT EXISTS payment_method text CHECK (payment_method IN ('upi', 'card')),
ADD COLUMN IF NOT EXISTS razorpay_order_id text,
ADD COLUMN IF NOT EXISTS razorpay_payment_id text,
ADD COLUMN IF NOT EXISTS paid_at timestamp with time zone;

-- Create payments table for audit trail
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id uuid NOT NULL,
  reference_type text NOT NULL CHECK (reference_type IN ('order', 'reservation')),
  amount numeric NOT NULL,
  payment_method text CHECK (payment_method IN ('upi', 'card')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  paid_at timestamp with time zone
);

-- Enable RLS on payments table
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Policies for payments table
CREATE POLICY "Users can view their own payments"
ON public.payments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments"
ON public.payments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
ON public.payments
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all payments"
ON public.payments
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));