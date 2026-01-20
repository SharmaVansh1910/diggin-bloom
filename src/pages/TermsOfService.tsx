import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 2026
          </p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the Diggin Café & Kitchen website and services, you accept and agree 
              to be bound by these Terms of Service. If you do not agree to these terms, please do not 
              use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              2. Reservations
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Reservations made through our website are subject to confirmation. We reserve the right 
              to cancel or modify reservations in case of unforeseen circumstances. Guests are 
              expected to arrive within 15 minutes of their reserved time, after which the table 
              may be released.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For group reservations of more than 8 guests, we may require a deposit or pre-authorization. 
              Cancellations should be made at least 4 hours in advance to avoid any charges.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              3. Menu and Pricing
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Menu items, descriptions, and prices are subject to change without prior notice. 
              While we strive to maintain accuracy, we cannot guarantee that all information 
              displayed on our website is current at all times. Prices are inclusive of all 
              applicable taxes unless otherwise stated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              4. Conduct
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Guests are expected to conduct themselves in a manner that respects other patrons 
              and staff. We reserve the right to refuse service or ask guests to leave if their 
              behavior is deemed inappropriate, disruptive, or in violation of our policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including but not limited to text, images, logos, 
              and design elements, is the property of Diggin Café & Kitchen and is protected 
              by copyright laws. Unauthorized use or reproduction is prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              6. Contact Us
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
