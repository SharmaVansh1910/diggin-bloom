-- Add DELETE policies for admins on orders and event_bookings tables
CREATE POLICY "Admins can delete all orders"
ON public.orders
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete all bookings"
ON public.event_bookings
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));