import { useScrollReveal } from '@/hooks/useScrollReveal';
import { testimonials } from '@/data/testimonialsData';
import { Star, Quote } from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 star-rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-current' : 'opacity-30'}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream"
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from real people who've experienced the Diggin magic.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card rounded-2xl p-6 shadow-soft transition-all duration-1000 hover:shadow-medium ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-olive/30 mb-4" />
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.review}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-olive">4.7</p>
              <div className="flex gap-1 star-rating justify-center my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">on Google</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-olive">4.5</p>
              <div className="flex gap-1 star-rating justify-center my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">on Zomato</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-olive">50K+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Guests Monthly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
