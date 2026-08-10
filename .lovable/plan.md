# Port the backend to the new Supabase project

Goal: make `uhfklyadirgvbnqgtell` a fully working backend for this app, so that swapping the connection does not break auth, orders, reservations, admin, payments, or emails.

## Order of operations

1. **You connect the project first.** Plus (+) menu → Supabase → Connect → pick `uhfklyadirgvbnqgtell`. Lovable rewrites `.env` itself with the URL, publishable key, and project id. Manual edits to `.env` get overwritten, so this step cannot be skipped.
2. **I apply one migration** that recreates the entire schema on the new project (details below).
3. **I re-add the secrets** — Razorpay and Mailjet keys must be entered again on the new project; the service role key and DB URL are provided automatically.
4. **Edge functions redeploy** from the existing code in `supabase/functions/` (`create-razorpay-order`, `verify-razorpay-payment`, `send-notification`) against the new project.
5. **We verify** sign-up creates a profile, an admin can see the dashboard, a test payment completes, and the admin live updates fire.

## What the migration recreates

- `app_role` enum (`admin`, `moderator`, `user`) and the `user_roles` table
- `profiles`, `orders`, `event_bookings`, `payments` — same columns as today, including the payment fields (`amount_paid`, `payment_status`, `payment_method`, `razorpay_order_id`, `razorpay_payment_id`, `paid_at`)
- Access rules: users see and manage only their own data; admins can view and manage all orders, bookings, payments and profiles; nobody can delete payments; payment amounts and statuses stay writable only by the payment functions
- `has_role` security function, the profile-creation trigger on new signups, and the `updated_at` triggers
- Table grants so the app can reach every table
- Realtime publication for `orders` and `event_bookings` so the admin dashboard keeps updating live

## What does not carry over

Existing rows — accounts, profiles, orders, bookings, payments — stay in the current backend. The new project starts empty, so every user re-registers and at least one admin role must be granted manually after the first sign-up. If you need the old data moved, that is a separate export/import step I can plan after the schema is in place.

## No frontend changes needed

All client code reads from `@/integrations/supabase/client`, which picks up the new `.env` automatically. Nothing in the UI, cart, menu, or legal pages needs editing.
