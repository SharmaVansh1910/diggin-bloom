import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: February 2026
          </p>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Diggin Cafe ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, and safeguard your information when you visit our website, use our 
            mobile application, or dine at any of our locations: Anand Lok, Chanakyapuri, Bikaner House, 
            Connaught Place, Tagore Garden, and 'Gardin' by Diggin.
          </p>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Name:</strong> To personalize your experience and address you properly</li>
              <li><strong>Phone Number:</strong> For order confirmations, delivery updates, and reservation reminders</li>
              <li><strong>Email Address (if provided):</strong> For order receipts, promotional offers (with consent), 
              and account management</li>
              <li><strong>Delivery Address:</strong> To fulfill your food delivery orders</li>
              <li><strong>Order Details:</strong> Items ordered, order history, and preferences</li>
              <li><strong>Reservation Details:</strong> Date, time, number of guests, and special requests</li>
              <li><strong>Device Information:</strong> Browser type, device type, and IP address for analytics purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              2. Purpose of Data Usage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Process and fulfill your food orders</li>
              <li>Confirm and manage table reservations</li>
              <li>Send order status updates and delivery notifications</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our menu, services, and customer experience</li>
              <li>Send promotional offers and updates (only with your explicit consent)</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              3. Payment Information Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All payments on our platform are processed through secure third-party payment gateways 
              (such as Razorpay). <strong>Diggin Cafe does not collect, store, or have access to your 
              card numbers, CVV, UPI PIN, or any other sensitive payment information.</strong> Your payment 
              details are encrypted and handled directly by our payment partners who comply with PCI-DSS 
              (Payment Card Industry Data Security Standard) requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              4. Data Sharing Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share limited information only with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Delivery Partners:</strong> Name, phone number, and address to fulfill delivery orders</li>
              <li><strong>Payment Processors:</strong> To process your transactions securely</li>
              <li><strong>SMS/Email Service Providers:</strong> To send order confirmations and updates</li>
              <li><strong>Analytics Providers:</strong> Anonymized data to understand usage patterns</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All service providers are bound by confidentiality agreements and are prohibited from using 
              your data for any purpose other than providing services to Diggin Cafe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              5. Cookies & Analytics
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our website uses cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Remember your preferences and login status</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Improve website performance and user experience</li>
              <li>Show relevant content based on your interests</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can control cookie settings through your browser. Disabling cookies may affect some 
              functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              6. Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the details provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              7. Data Retention
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data for as long as necessary to provide our services and fulfill the 
              purposes outlined in this policy. Typically, order and reservation data is retained for 3 years 
              for accounting and legal purposes. You may request deletion of your data at any time, and we will 
              comply within 30 days, except where we are required by law to retain certain information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect 
              personal information from children. If you believe we have inadvertently collected information 
              from a minor, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              9. Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy is governed by the laws of India, including the Information Technology Act, 
              2000 and the Digital Personal Data Protection Act. Any disputes shall be subject to the exclusive 
              jurisdiction of the courts in New Delhi, India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page 
              with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              11. Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related inquiries, please contact:
            </p>
            <ul className="mt-4 text-muted-foreground">
              <li>Email: privacy@diggin.co.in</li>
              <li>Phone: +91 11 2688 7890</li>
              <li>Address: Diggin Cafe, Anand Lok, New Delhi, India</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
