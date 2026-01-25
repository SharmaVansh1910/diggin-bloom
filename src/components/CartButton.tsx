import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';

export function CartButton() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative p-2 text-foreground hover:text-olive transition-colors"
      aria-label={`Open cart with ${totalItems} items`}
    >
      <ShoppingBag className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-olive text-cream text-xs font-bold flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  );
}
