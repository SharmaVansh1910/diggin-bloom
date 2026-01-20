import { useScrollReveal } from '@/hooks/useScrollReveal';
import { outlets } from '@/data/outletsData';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export function Outlets() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="outlets"
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
            Our Locations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Find a Diggin
            <span className="block text-gradient-olive">Near You</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Four cozy corners across Delhi, each with its own unique charm. 
            Visit us and experience the Diggin magic firsthand.
          </p>
        </div>

        {/* Outlets Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {outlets.map((outlet, index) => (
            <div
              key={outlet.id}
              className={`bg-card rounded-3xl overflow-hidden shadow-soft transition-all duration-1000 hover:shadow-elevated ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Map Embed */}
              <div className="h-48 bg-beige relative">
                <iframe
                  src={outlet.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${outlet.name}`}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-card/10" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {outlet.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground">{outlet.address}</p>
                      <p className="text-sm">{outlet.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-olive flex-shrink-0" />
                    <span>{outlet.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-olive flex-shrink-0" />
                    <span>{outlet.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={`tel:${outlet.phone.replace(/\s/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-olive/10 text-olive font-medium hover:bg-olive/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${outlet.coordinates.lat},${outlet.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-olive text-cream font-medium hover:bg-olive-dark transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Navigate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
