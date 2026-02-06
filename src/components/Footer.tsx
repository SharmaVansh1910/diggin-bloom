import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#menu', label: 'Menu' },
  { href: '#reservation', label: 'Reservations' },
  { href: '#outlets', label: 'Outlets' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refund', label: 'Refund Policy' },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-charcoal text-cream/80">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block mb-6">
              <span className="font-serif text-3xl font-bold text-cream">DIGGIN</span>
              <span className="block text-sm text-cream/60 tracking-widest uppercase">Café & Kitchen</span>
            </a>
            <p className="text-sm leading-relaxed mb-6">
              European café culture meets Delhi's warmth. Artisan coffee, gourmet cuisine, 
              and botanical interiors — since 2012.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/diggincafe/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/diggincafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://maps.google.com/?q=Diggin+Cafe+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-olive-light flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-cream">+91 11 2688 7890</p>
                  <p className="text-cream/60">Mon - Sun: 10AM - 11PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-olive-light flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@diggin.co.in" className="text-sm hover:text-cream transition-colors">
                  hello@diggin.co.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-olive-light flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Multiple outlets across<br />Delhi NCR
                </p>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Monday - Thursday</span>
                <span className="text-cream">10AM - 11PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday - Saturday</span>
                <span className="text-cream">10AM - 11:30PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-cream">10AM - 11PM</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-cream/50">
              * Hours may vary by outlet. Please check individual locations.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="section-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/50">
            © {new Date().getFullYear()} Diggin Café & Kitchen. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cream/50 hover:text-cream transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
