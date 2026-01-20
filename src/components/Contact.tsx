import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Enter a valid email address').max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000),
});

const newsletterSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(255),
});

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      contactSchema.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      newsletterSchema.parse({ email: newsletterEmail });
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Successfully subscribed to our newsletter!');
      setNewsletterEmail('');
    } catch {
      toast.error('Please enter a valid email address');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream-dark"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-sm font-medium mb-6">
              Get in Touch
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              We'd Love to
              <span className="block text-gradient-olive">Hear From You</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Have a question, feedback, or want to collaborate? Drop us a message 
              and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-olive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Us</p>
                  <a href="mailto:hello@diggin.co.in" className="text-muted-foreground hover:text-olive transition-colors">
                    hello@diggin.co.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-olive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Call Us</p>
                  <a href="tel:+911126887890" className="text-muted-foreground hover:text-olive transition-colors">
                    +91 11 2688 7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-olive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Visit Us</p>
                  <p className="text-muted-foreground">
                    Multiple locations across Delhi NCR
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-medium text-foreground mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/diggin.cafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-cream transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/diggincafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-cream transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://maps.google.com/?q=Diggin+Cafe+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive hover:bg-olive hover:text-cream transition-colors"
                  aria-label="Find us on Google Maps"
                >
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-10 p-6 rounded-2xl bg-olive/5 border border-olive/10">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get updates on new menu items, special events, and exclusive offers.
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-elegant flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-olive text-cream font-medium hover:bg-olive-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-8 shadow-soft"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Send Us a Message
              </h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-elegant ${errors.name ? 'border-destructive' : ''}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-elegant ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-elegant ${errors.phone ? 'border-destructive' : ''}`}
                      placeholder="10-digit number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`input-elegant resize-none ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hero-primary !py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
