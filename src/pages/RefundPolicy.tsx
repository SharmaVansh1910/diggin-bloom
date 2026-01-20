import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="section-container max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-olive hover:text-olive-dark mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
          Refund Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 2026
          </p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              1. Reservation Deposits
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For group reservations requiring a deposit:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Full refund if cancelled 48+ hours before the reservation</li>
              <li>50% refund if cancelled 24-48 hours before the reservation</li>
              <li>No refund for cancellations less than 24 hours before the reservation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              2. Gift Cards & Vouchers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Gift cards and promotional vouchers are non-refundable but can be transferred 
              to another person. Lost or stolen gift cards cannot be replaced. Gift cards 
              are valid for 12 months from the date of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              3. Event Bookings
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For private events and large group bookings:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Full refund if cancelled 7+ days before the event</li>
              <li>50% refund if cancelled 3-7 days before the event</li>
              <li>No refund for cancellations less than 3 days before the event</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              In case of unforeseen circumstances on our end, we will offer a full refund 
              or reschedule the event at no additional cost.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              4. Food Quality Issues
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you're not satisfied with the quality of your food or service, please 
              inform our staff immediately. We will address your concerns promptly and 
              may offer a replacement dish, discount, or refund at our discretion. 
              Claims must be made during your visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              5. Refund Processing
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Approved refunds will be processed within 5-7 business days. Refunds will 
              be credited to the original payment method used. Bank processing times may 
              vary and are outside our control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              6. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For refund inquiries, please contact:
            </p>
            <ul className="mt-4 text-muted-foreground">
              <li>Email: support@diggin.co.in</li>
              <li>Phone: +91 11 2688 7890</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
