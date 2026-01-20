import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { X } from 'lucide-react';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const galleryImages = [
  { id: 1, src: gallery1, alt: 'Artisan cappuccino with latte art', category: 'drinks' },
  { id: 2, src: gallery2, alt: 'Fresh pasta dish with herbs', category: 'food' },
  { id: 3, src: gallery3, alt: 'Cozy interior with botanical decor', category: 'interior' },
  { id: 4, src: gallery4, alt: 'Decadent chocolate dessert', category: 'desserts' },
  { id: 5, src: gallery5, alt: 'Outdoor seating area with plants', category: 'interior' },
  { id: 6, src: gallery6, alt: 'Gourmet burger with fries', category: 'food' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="py-24 lg:py-32 bg-cream-dark"
      >
        <div className="section-container">
          {/* Header */}
          <div
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-sm font-medium mb-6">
              Gallery
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              A Visual Feast
            </h2>
            <p className="text-muted-foreground text-lg">
              Glimpses of our cozy corners, artful plates, and the moments that make Diggin special.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`img-zoom rounded-2xl overflow-hidden aspect-square transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-cream/70 hover:text-cream transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
