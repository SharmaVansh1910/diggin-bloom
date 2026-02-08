import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <div ref={ref} className="prose prose-lg max-w-none">
          <p className={`text-muted-foreground mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
             style={{ transitionDelay: '150ms' }}>
            Last updated: February 2026
          </p>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '200ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the Diggin Cafe website, mobile application, or any of our services, 
              you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, 
              please do not use our services. These terms apply to all visitors, users, and customers of 
              Diggin Cafe across all our locations: Anand Lok, Chanakyapuri, Bikaner House, Connaught Place, 
              Tagore Garden, and 'Gardin' by Diggin.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '250ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              2. Online Food Ordering Rules
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When placing orders through our online platform:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>All orders are subject to availability and confirmation</li>
              <li>Orders must be placed with accurate delivery address and contact information</li>
              <li>Minimum order values may apply depending on location and time</li>
              <li>Delivery times are estimates and may vary based on demand and traffic conditions</li>
              <li>Orders once confirmed cannot be cancelled after food preparation has begun</li>
              <li>We reserve the right to refuse or cancel orders at our discretion</li>
              <li>Special dietary requirements must be communicated at the time of ordering</li>
            </ul>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '300ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              3. Table Reservation Rules
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For table reservations at any Diggin Cafe location:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>A non-refundable reservation fee of ₹20 per guest is charged at the time of booking</li>
              <li>Reservations are held for 15 minutes past the reserved time; after which the table may be released</li>
              <li>Cancellations must be made at least 2 hours before the reserved time</li>
              <li>For group reservations of more than 8 guests, advance notice of 24 hours is required</li>
              <li>We reserve the right to modify seating arrangements based on availability</li>
              <li>Maximum dining duration may be enforced during peak hours</li>
            </ul>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '350ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              4. Online Payment Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Diggin Cafe accepts online payments only through the following methods:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>UPI (Unified Payments Interface)</li>
              <li>Debit and Credit Cards (Visa, MasterCard, RuPay)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Cash on delivery is not available. All payments are processed through secure third-party 
              payment gateways. Diggin Cafe does not store any card or UPI details on its servers.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '400ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              5. Pricing & Availability Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Menu items, descriptions, prices, and availability are subject to change without prior notice. 
              While we strive to maintain accuracy, we cannot guarantee that all information displayed on our 
              website or application is current at all times. Prices displayed are inclusive of all applicable 
              taxes unless otherwise stated. Promotional offers and discounts are subject to specific terms 
              and conditions and may be withdrawn at any time. Images are for representation purposes only 
              and actual products may vary.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '450ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              6. User Responsibilities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a user of Diggin Cafe services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete information when placing orders or making reservations</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not misuse promotional codes or offers</li>
              <li>Treat our staff and other customers with respect</li>
              <li>Inform us of any food allergies or dietary restrictions</li>
              <li>Ensure someone is available to receive delivery orders at the specified address</li>
              <li>Not engage in any fraudulent activities or chargebacks without valid reason</li>
            </ul>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '500ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Diggin Cafe shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from your use of our services. Our total liability for any claim 
              arising from our services shall not exceed the amount paid by you for the specific order or 
              service in question. We are not responsible for delays or failures in delivery caused by 
              factors beyond our control, including but not limited to traffic conditions, weather, or 
              third-party delivery partner issues.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '550ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              8. Force Majeure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Diggin Cafe shall not be held liable for any failure or delay in performing our obligations 
              where such failure or delay results from circumstances beyond our reasonable control, including 
              but not limited to: natural disasters, pandemics, government actions, civil unrest, strikes, 
              power outages, internet or telecommunications failures, or any other event that could not have 
              been reasonably foreseen or prevented.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '600ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              9. Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising from or relating to these terms or your use of Diggin Cafe services shall 
              be subject to the exclusive jurisdiction of the courts in New Delhi, India.
            </p>
          </section>

          <section className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: '650ms' }}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              10. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="mt-4 text-muted-foreground">
              <li>Email: legal@diggin.co.in</li>
              <li>Phone: +91 11 2688 7890</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}