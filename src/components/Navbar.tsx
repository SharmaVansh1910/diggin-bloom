import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User, Calendar, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { CartButton } from './CartButton';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#reservation', label: 'Book Table' },
  { href: '#outlets', label: 'Outlets' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/' + href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              DIGGIN
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground tracking-widest uppercase">
              Café
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHomePage ? link.href : '/' + link.href}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className="nav-link text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/events"
              className="nav-link text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Events
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <CartButton />
            
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Admin</span>
              </Link>
            )}
            
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-olive/10 text-olive hover:bg-olive/20 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Profile</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-olive/10 text-olive hover:bg-olive/20 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
            
            <button
              onClick={() => handleNavClick('#reservation')}
              className="btn-hero-primary !px-5 !py-2.5 !text-sm"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <CartButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass rounded-2xl p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHomePage ? link.href : '/' + link.href}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                  setIsOpen(false);
                }}
                className="block py-2 text-foreground font-medium hover:text-olive transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/events"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 py-2 text-foreground font-medium hover:text-olive transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            <hr className="border-border" />
            
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-2 text-amber-600 font-medium"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
            
            {user ? (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-2 text-olive font-medium"
              >
                <User className="w-4 h-4" />
                My Profile
              </Link>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-2 text-olive font-medium"
              >
                <User className="w-4 h-4" />
                Sign In / Sign Up
              </Link>
            )}
            
            <a
              href="tel:+911126887890"
              className="flex items-center gap-2 py-2 text-muted-foreground"
            >
              <Phone className="w-4 h-4" />
              <span>+91 11 2688 7890</span>
            </a>
            <button
              onClick={() => handleNavClick('#reservation')}
              className="w-full btn-hero-primary !py-3"
            >
              Book a Table
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
