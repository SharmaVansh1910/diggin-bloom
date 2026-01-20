import { ChevronDown, MapPin, Calendar, Utensils, Image as ImageIcon } from 'lucide-react';
import heroImage from '@/assets/hero-cafe.jpg';

const taglines = [
  "European Café Culture. Delhi Vibe.",
  "Where Coffee Meets Aesthetic.",
  "A Cozy Botanical Escape.",
  "Crafted with Passion, Served with Love.",
  "Your Daily Dose of Deliciousness.",
];

export function Hero() {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Diggin Cafe interior with warm botanical ambience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center px-4 py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
          <span className="text-sm font-medium text-cream">✨ Est. 2012 • Delhi's Favorite</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 animate-fade-up delay-100">
          DIGGIN
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mt-2 text-cream/90">
            Café & Kitchen
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-cream/90 font-light mb-4 animate-fade-up delay-200">
          {taglines[0]}
        </p>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base md:text-lg text-cream/70 mb-10 animate-fade-up delay-300">
          Experience the charm of European café culture in the heart of Delhi. 
          Artisan coffee, gourmet cuisine, and botanical interiors await you.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-up delay-400">
          <button
            onClick={() => handleScroll('#menu')}
            className="btn-hero-primary flex items-center gap-2"
          >
            <Utensils className="w-5 h-5" />
            View Menu
          </button>
          <button
            onClick={() => handleScroll('#reservation')}
            className="btn-hero-secondary flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Book a Table
          </button>
          <button
            onClick={() => handleScroll('#outlets')}
            className="btn-hero-secondary flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Find Outlet
          </button>
        </div>

        {/* Secondary CTAs */}
        <div className="flex items-center justify-center gap-6 animate-fade-up delay-500">
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/70 hover:text-cream text-sm font-medium transition-colors flex items-center gap-1"
          >
            Order Online →
          </a>
          <button
            onClick={() => handleScroll('#gallery')}
            className="text-cream/70 hover:text-cream text-sm font-medium transition-colors flex items-center gap-1"
          >
            <ImageIcon className="w-4 h-4" />
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => handleScroll('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70 hover:text-cream transition-colors animate-float"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
