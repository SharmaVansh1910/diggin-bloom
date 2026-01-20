export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVeg: boolean;
  isBestseller?: boolean;
  image?: string;
}

export const menuCategories = [
  { id: 'coffee', name: 'Coffee & Beverages', icon: '☕' },
  { id: 'pasta', name: 'Pastas & Risottos', icon: '🍝' },
  { id: 'sandwiches', name: 'Sandwiches & Burgers', icon: '🍔' },
  { id: 'pizza', name: 'Pizzas', icon: '🍕' },
  { id: 'desserts', name: 'Desserts & Pastries', icon: '🍰' },
  { id: 'smoothies', name: 'Smoothies & Cold Drinks', icon: '🥤' },
];

export const menuItems: MenuItem[] = [
  // Coffee & Beverages
  {
    id: 'c1',
    name: 'Signature Diggin Cappuccino',
    description: 'Double shot espresso, velvety steamed milk, artisan cocoa dusting',
    price: 280,
    category: 'coffee',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'c2',
    name: 'Rose Cardamom Latte',
    description: 'Persian rose syrup, crushed cardamom, single origin espresso',
    price: 320,
    category: 'coffee',
    isVeg: true,
  },
  {
    id: 'c3',
    name: 'Hazelnut Mocha',
    description: 'Belgian dark chocolate, hazelnut praline, double espresso',
    price: 340,
    category: 'coffee',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'c4',
    name: 'Lavender Honey Oat Latte',
    description: 'French lavender essence, organic oat milk, wildflower honey',
    price: 360,
    category: 'coffee',
    isVeg: true,
  },

  // Pastas & Risottos
  {
    id: 'p1',
    name: 'Spaghetti Aglio e Olio',
    description: 'Extra virgin olive oil, Calabrian chili, roasted garlic, fresh parsley',
    price: 540,
    category: 'pasta',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'p2',
    name: 'Truffle Mushroom Risotto',
    description: 'Arborio rice, wild porcini, black truffle oil, aged parmesan',
    price: 680,
    category: 'pasta',
    isVeg: true,
  },
  {
    id: 'p3',
    name: 'Penne Arrabiata',
    description: 'San Marzano tomatoes, fresh basil, red chili flakes, garlic confit',
    price: 480,
    category: 'pasta',
    isVeg: true,
  },
  {
    id: 'p4',
    name: 'Chicken Alfredo Fettuccine',
    description: 'Grilled chicken breast, creamy parmesan sauce, fresh herbs',
    price: 620,
    category: 'pasta',
    isVeg: false,
    isBestseller: true,
  },

  // Sandwiches & Burgers
  {
    id: 's1',
    name: 'Classic Diggin Club',
    description: 'Triple-decker, grilled chicken, bacon, avocado, sun-dried tomatoes',
    price: 520,
    category: 'sandwiches',
    isVeg: false,
    isBestseller: true,
  },
  {
    id: 's2',
    name: 'Mediterranean Veggie Panini',
    description: 'Grilled zucchini, bell peppers, feta, basil pesto, focaccia',
    price: 440,
    category: 'sandwiches',
    isVeg: true,
  },
  {
    id: 's3',
    name: 'Truffle Smash Burger',
    description: 'Double smashed patty, truffle aioli, caramelized onions, aged cheddar',
    price: 580,
    category: 'sandwiches',
    isVeg: false,
  },
  {
    id: 's4',
    name: 'Halloumi & Avocado Toast',
    description: 'Grilled halloumi, smashed avocado, cherry tomatoes, sourdough',
    price: 420,
    category: 'sandwiches',
    isVeg: true,
    isBestseller: true,
  },

  // Pizzas
  {
    id: 'pz1',
    name: 'Margherita Classica',
    description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, olive oil',
    price: 480,
    category: 'pizza',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'pz2',
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, fontina, parmesan, honey drizzle',
    price: 580,
    category: 'pizza',
    isVeg: true,
  },
  {
    id: 'pz3',
    name: 'Pepperoni Supremo',
    description: 'Double pepperoni, mozzarella, spicy honey, fresh oregano',
    price: 620,
    category: 'pizza',
    isVeg: false,
  },
  {
    id: 'pz4',
    name: 'Garden Fresh Veggie',
    description: 'Roasted vegetables, goat cheese, arugula, balsamic glaze',
    price: 540,
    category: 'pizza',
    isVeg: true,
  },

  // Desserts & Pastries
  {
    id: 'd1',
    name: 'Tiramisu Classico',
    description: 'Espresso-soaked ladyfingers, mascarpone cream, cocoa powder',
    price: 380,
    category: 'desserts',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'd2',
    name: 'Molten Chocolate Fondant',
    description: 'Warm chocolate cake, liquid chocolate center, vanilla gelato',
    price: 420,
    category: 'desserts',
    isVeg: true,
  },
  {
    id: 'd3',
    name: 'New York Cheesecake',
    description: 'Classic baked cheesecake, berry compote, graham cracker crust',
    price: 360,
    category: 'desserts',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'd4',
    name: 'Pistachio Rose Baklava',
    description: 'Layers of phyllo, crushed pistachios, rose water syrup',
    price: 320,
    category: 'desserts',
    isVeg: true,
  },

  // Smoothies & Cold Drinks
  {
    id: 'sm1',
    name: 'Berry Bliss Smoothie',
    description: 'Mixed berries, Greek yogurt, honey, chia seeds',
    price: 280,
    category: 'smoothies',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'sm2',
    name: 'Mango Tango',
    description: 'Alphonso mango, coconut milk, passion fruit, lime zest',
    price: 260,
    category: 'smoothies',
    isVeg: true,
  },
  {
    id: 'sm3',
    name: 'Green Goddess',
    description: 'Spinach, kale, banana, almond butter, oat milk',
    price: 300,
    category: 'smoothies',
    isVeg: true,
  },
  {
    id: 'sm4',
    name: 'Cold Brew Tonic',
    description: '18-hour cold brew, house-made tonic, orange zest, rosemary',
    price: 320,
    category: 'smoothies',
    isVeg: true,
  },
];
