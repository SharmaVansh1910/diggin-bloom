import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { menuItems, menuCategories, type MenuItem } from '@/data/menuData';
import { Search } from 'lucide-react';

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card p-5 flex gap-4">
      {/* Veg/Non-Veg Badge */}
      <div className="flex-shrink-0 pt-1">
        <div className={item.isVeg ? 'badge-veg' : 'badge-nonveg'} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h4 className="font-serif text-lg font-semibold text-foreground leading-tight">
              {item.name}
            </h4>
            {item.isBestseller && (
              <span className="tag-bestseller mt-1.5">★ Bestseller</span>
            )}
          </div>
          <span className="font-semibold text-olive whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentCategory = menuCategories.find((c) => c.id === activeCategory);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream-dark"
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-sm font-medium mb-6">
            Our Menu
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Crafted with Love,
            <span className="block text-gradient-olive">Served with Care</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From artisan coffee to handcrafted pastas, every item on our menu is 
            prepared fresh with premium ingredients sourced from trusted partners.
          </p>
        </div>

        {/* Search Bar */}
        <div
          className={`max-w-md mx-auto mb-8 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-elegant pl-12"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-pill ${
                activeCategory === category.id ? 'active' : ''
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Category Title */}
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
            {currentCategory?.icon} {currentCategory?.name}
          </h3>
          <span className="px-3 py-1 rounded-full bg-olive/10 text-olive text-sm font-medium">
            {filteredItems.length} items
          </span>
        </div>

        {/* Menu Grid */}
        <div
          className={`grid md:grid-cols-2 gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <MenuCard item={item} />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No items found. Try a different search term.
            </p>
          </div>
        )}

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          * Prices are inclusive of all taxes. Menu items may vary by outlet.
          <br />
          Please inform your server about any dietary restrictions or allergies.
        </p>
      </div>
    </section>
  );
}
