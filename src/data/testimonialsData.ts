export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    rating: 5,
    review: 'Absolutely love the European vibes! The tiramisu is to die for, and the ambience feels like being in a quaint Italian cafe.',
    date: 'December 2025',
  },
  {
    id: 't2',
    name: 'Arjun Mehta',
    rating: 5,
    review: 'Best brunch spot in Delhi hands down. The halloumi avocado toast is my weekend ritual now. Cozy botanical interiors are a bonus!',
    date: 'January 2026',
  },
  {
    id: 't3',
    name: 'Sneha Gupta',
    rating: 5,
    review: 'Their coffee is exceptional – the rose cardamom latte is unique and perfectly balanced. A must-visit for coffee lovers.',
    date: 'November 2025',
  },
  {
    id: 't4',
    name: 'Rahul Verma',
    rating: 4,
    review: 'Great pasta selection with authentic flavors. The truffle mushroom risotto was creamy and rich. Will definitely return!',
    date: 'December 2025',
  },
  {
    id: 't5',
    name: 'Ananya Kapoor',
    rating: 5,
    review: 'Perfect place for intimate dinners. The lighting, music, and food create such a romantic atmosphere. Highly recommend!',
    date: 'January 2026',
  },
  {
    id: 't6',
    name: 'Vikram Singh',
    rating: 5,
    review: 'The Diggin Club Sandwich is legendary! Generous portions and fresh ingredients. Staff is incredibly friendly too.',
    date: 'October 2025',
  },
];
