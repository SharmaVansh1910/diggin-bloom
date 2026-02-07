import { useScrollReveal } from '@/hooks/useScrollReveal';
import aboutImage from '@/assets/about-interior.jpg';

export function About() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream overflow-hidden"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-16 -rotate-2'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={aboutImage}
                alt="Diggin Cafe cozy botanical interior with warm lighting"
                className={`w-full h-[500px] lg:h-[600px] object-cover transition-transform duration-1000 delay-300 ${
                  isVisible ? 'scale-100' : 'scale-110'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            {/* Floating Stats Card */}
            <div 
              className={`absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-elevated transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
              }`}
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="font-serif text-3xl font-bold text-olive">12+</p>
                  <p className="text-sm text-muted-foreground">Years of Love</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-olive">4</p>
                  <p className="text-sm text-muted-foreground">Cozy Outlets</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span 
              className={`inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-sm font-medium transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              Our Story
            </span>
            
            <h2 
              className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              A Slice of Europe,
              <span className="block text-gradient-olive">Right in Delhi</span>
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p 
                className={`transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <strong className="text-foreground">What is Diggin?</strong> Born in 2012, Diggin is more than 
                a café — it's a love letter to European coffee culture, wrapped in the warmth of Delhi's 
                hospitality. We created a space where time slows down, conversations flow freely, and 
                every bite tells a story.
              </p>

              <p 
                className={`transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <strong className="text-foreground">Our Philosophy:</strong> We believe in the art of slow 
                food and meaningful moments. Every dish is crafted with intention, every coffee pulled 
                with precision, and every corner designed to make you feel at home.
              </p>

              <p 
                className={`transition-all duration-700 delay-[400ms] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <strong className="text-foreground">Sourcing & Ingredients:</strong> From single-origin 
                coffee beans sourced from sustainable farms to fresh, locally-procured vegetables and 
                imported Italian cheeses, quality is never compromised. Our chefs work with seasonal 
                produce to create menus that celebrate authenticity.
              </p>

              <p 
                className={`transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <strong className="text-foreground">The Ambience:</strong> Step into any Diggin outlet and 
                you're transported — botanical interiors with cascading greenery, exposed brick walls, 
                soft Edison lighting, and the gentle hum of jazz in the background. It's the perfect 
                backdrop for first dates, family brunches, and creative brainstorms alike.
              </p>

              <p 
                className={`transition-all duration-700 delay-[600ms] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <strong className="text-foreground">Our Community:</strong> Over the years, we've become 
                a gathering place for artists, entrepreneurs, dreamers, and food lovers. Our regulars 
                aren't just customers — they're family.
              </p>
            </div>

            <div 
              className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:scale-105 transition-transform">
                <span className="text-xl">🌿</span>
                <span className="text-sm font-medium">Botanical Vibes</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:scale-105 transition-transform">
                <span className="text-xl">☕</span>
                <span className="text-sm font-medium">Artisan Coffee</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:scale-105 transition-transform">
                <span className="text-xl">🍝</span>
                <span className="text-sm font-medium">Italian Kitchen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}