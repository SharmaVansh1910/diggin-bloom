import { Helmet } from 'react-helmet-async';

export function SEOHead() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.diggin.co.in/#organization",
        "name": "Diggin Café & Kitchen",
        "url": "https://www.diggin.co.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.diggin.co.in/logo.png"
        },
        "sameAs": [
          "https://www.instagram.com/diggin.cafe",
          "https://www.facebook.com/diggincafe"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-11-2688-7890",
          "contactType": "reservations",
          "availableLanguage": ["English", "Hindi"]
        }
      },
      {
        "@type": "Restaurant",
        "@id": "https://www.diggin.co.in/#restaurant",
        "name": "Diggin Café & Kitchen",
        "image": "https://www.diggin.co.in/hero-cafe.jpg",
        "url": "https://www.diggin.co.in",
        "telephone": "+91-11-2688-7890",
        "email": "hello@diggin.co.in",
        "priceRange": "₹₹",
        "servesCuisine": ["Italian", "European", "Continental", "Café"],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Santushti Shopping Complex, Chanakyapuri",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110021",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.60,
          "longitude": 77.19
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
            "opens": "10:00",
            "closes": "23:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Friday", "Saturday"],
            "opens": "10:00",
            "closes": "23:30"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "2500",
          "bestRating": "5",
          "worstRating": "1"
        },
        "menu": "https://www.diggin.co.in/#menu",
        "acceptsReservations": "True",
        "hasMenu": {
          "@type": "Menu",
          "name": "Diggin Main Menu",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Coffee & Beverages",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Signature Diggin Cappuccino",
                  "description": "Double shot espresso, velvety steamed milk, artisan cocoa dusting",
                  "offers": {
                    "@type": "Offer",
                    "price": "280",
                    "priceCurrency": "INR"
                  }
                },
                {
                  "@type": "MenuItem",
                  "name": "Rose Cardamom Latte",
                  "description": "Persian rose syrup, crushed cardamom, single origin espresso",
                  "offers": {
                    "@type": "Offer",
                    "price": "320",
                    "priceCurrency": "INR"
                  }
                }
              ]
            },
            {
              "@type": "MenuSection",
              "name": "Pastas & Risottos",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Spaghetti Aglio e Olio",
                  "description": "Extra virgin olive oil, Calabrian chili, roasted garlic, fresh parsley",
                  "offers": {
                    "@type": "Offer",
                    "price": "540",
                    "priceCurrency": "INR"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.diggin.co.in/#localbusiness",
        "name": "Diggin Café & Kitchen",
        "description": "European café culture in Delhi. Artisan coffee, gourmet cuisine, and botanical interiors since 2012.",
        "url": "https://www.diggin.co.in",
        "telephone": "+91-11-2688-7890",
        "email": "hello@diggin.co.in",
        "foundingDate": "2012",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": "50",
          "maxValue": "100"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are Diggin Café's opening hours?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Diggin Café is open Monday to Sunday from 10:00 AM to 11:00 PM. Friday and Saturday hours extend to 11:30 PM. Hours may vary by outlet."
            }
          },
          {
            "@type": "Question",
            "name": "How can I make a reservation at Diggin?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can make a reservation through our website's reservation form, or call us at +91 11 2688 7890. We recommend booking in advance, especially for weekends."
            }
          },
          {
            "@type": "Question",
            "name": "Does Diggin have vegetarian options?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Diggin offers a wide variety of vegetarian options across all menu categories including pastas, pizzas, sandwiches, and desserts. All items are clearly marked as Veg or Non-Veg."
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Diggin Café & Kitchen | European Café Culture in Delhi | Book a Table</title>
      <meta 
        name="description" 
        content="Experience the charm of European café culture at Diggin Café Delhi. Artisan coffee, gourmet Italian cuisine, botanical interiors. Book your table at our Chanakyapuri, Anand Lok, or CP outlets." 
      />
      <meta name="keywords" content="Diggin Cafe, Delhi cafe, European cafe, Italian restaurant Delhi, brunch Delhi, coffee shop Delhi, romantic restaurant, botanical cafe, best cafe Chanakyapuri" />
      <meta name="author" content="Diggin Café & Kitchen" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.diggin.co.in" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="restaurant" />
      <meta property="og:url" content="https://www.diggin.co.in" />
      <meta property="og:title" content="Diggin Café & Kitchen | European Café Culture in Delhi" />
      <meta 
        property="og:description" 
        content="Experience the charm of European café culture at Diggin Café Delhi. Artisan coffee, gourmet Italian cuisine, botanical interiors since 2012." 
      />
      <meta property="og:image" content="https://www.diggin.co.in/og-image.jpg" />
      <meta property="og:site_name" content="Diggin Café & Kitchen" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://www.diggin.co.in" />
      <meta name="twitter:title" content="Diggin Café & Kitchen | European Café Culture in Delhi" />
      <meta 
        name="twitter:description" 
        content="Experience the charm of European café culture at Diggin Café Delhi. Artisan coffee, gourmet Italian cuisine, botanical interiors." 
      />
      <meta name="twitter:image" content="https://www.diggin.co.in/og-image.jpg" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#5a6b4a" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="IN-DL" />
      <meta name="geo.placename" content="New Delhi" />
      <meta name="geo.position" content="28.60;77.19" />
      <meta name="ICBM" content="28.60, 77.19" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
