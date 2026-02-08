import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function RefundPolicy() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="section-container max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-olive hover:text-olive-dark mb-8 transition-colors animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 animate-fade-in [animation-delay:100ms]">
          Refund Policy
        </h1>

        <div ref={ref} className="prose prose-lg max-w-none">
          <p className={`text-muted-foreground mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
             style={{ transitionDelay: '150ms' }}>
            Last updated: February 2026
          </p>

          <div className={`bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ transitionDelay: '200ms' }}>
            <p className="text-foreground font-medium">
              Important: Diggin Cafe follows a strict refund policy. Please read the following terms carefully 
              before placing an order or making a reservation.
            </p>
          </div>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '250ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              1. Eligible Refund Conditions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Refunds are allowed only under the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Spoiled Food:</strong> If the food delivered is spoiled, stale, or has gone bad</li>
              <li><strong>Damaged Items:</strong> If food items are damaged during delivery and are not consumable</li>
              <li><strong>Unpacked/Unsealed Food:</strong> If food packaging is open, tampered with, or unsealed upon delivery</li>
              <li><strong>Wrong Order:</strong> If you receive a completely different order than what was placed</li>
              <li><strong>Missing Items:</strong> Refund for the specific items that were not delivered (not the entire order)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To be eligible for a refund, you must report the issue within 30 minutes of delivery with clear 
              photographic evidence of the problem.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '300ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              2. Non-Refundable Conditions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The following situations do not qualify for refunds:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Taste Preference:</strong> Refunds are not provided if you do not like the taste, 
              spice level, or flavour of the food</li>
              <li><strong>Delivery Delays:</strong> Delays caused by traffic, weather, or high demand do not 
              qualify for refunds</li>
              <li><strong>Wrong Address:</strong> If you provide an incorrect or incomplete delivery address, 
              no refund will be issued</li>
              <li><strong>Partially Consumed Items:</strong> Food that has been partially eaten or consumed 
              is not eligible for refund</li>
              <li><strong>Late Reporting:</strong> Issues reported after 30 minutes of delivery</li>
              <li><strong>Change of Mind:</strong> Orders cannot be refunded if you simply change your mind 
              after placing the order</li>
            </ul>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '350ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              3. Table Reservation Fee Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The reservation fee of <strong>₹20 per guest</strong> charged at the time of booking is 
              <strong> strictly non-refundable</strong> under any circumstances, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Cancellation of reservation (regardless of timing)</li>
              <li>No-show at the restaurant</li>
              <li>Reduction in the number of guests</li>
              <li>Change of date or time (new reservation fee will apply)</li>
            </ul>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '400ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              4. Refund Processing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For approved refunds:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Refunds will be processed to the <strong>original payment method</strong> used at the 
              time of purchase (UPI or Card)</li>
              <li>Processing time: 5-7 business days after approval</li>
              <li>Bank processing times may add additional 2-3 business days</li>
              <li>Refund amount will not include any applicable delivery charges unless the entire order is refunded</li>
            </ul>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '450ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              5. How to Request a Refund
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
              <li>Contact us within 30 minutes of receiving your order</li>
              <li>Provide your order ID and registered phone number</li>
              <li>Submit clear photographs showing the issue with the food</li>
              <li>Describe the problem in detail</li>
              <li>Wait for our team to review and respond within 24 hours</li>
            </ol>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '500ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              6. Final Decision Authority
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The final decision on all refund requests rests solely with Diggin Cafe. Our customer service 
              team will review each case individually and make a fair determination based on the evidence 
              provided. Diggin Cafe reserves the right to deny refund requests that do not meet the eligibility 
              criteria or where fraudulent activity is suspected.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '550ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              7. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For refund inquiries, please contact:
            </p>
            <ul className="mt-4 text-muted-foreground">
              <li>Email: support@diggin.co.in</li>
              <li>Phone: +91 11 2688 7890</li>
              <li>Hours: 10:00 AM - 10:00 PM (Monday to Sunday)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}