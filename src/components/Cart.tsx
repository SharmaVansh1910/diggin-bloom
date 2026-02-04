import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { X, Plus, Minus, ShoppingBag, Loader2, CreditCard } from 'lucide-react';
import { useState } from 'react';

export function Cart() {
  const { items, totalItems, totalPrice, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { initiatePayment, isLoading: isPaymentLoading } = useRazorpay();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to checkout');
      setIsOpen(false);
      navigate('/auth', { state: { from: '/' } });
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);

    const orderItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    initiatePayment({
      type: 'food_order',
      items: orderItems,
      userEmail: user.email || '',
      userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer',
      onSuccess: async (referenceId) => {
        // Send confirmation emails
        try {
          await supabase.functions.invoke('send-notification', {
            body: {
              type: 'order',
              userEmail: user.email,
              userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer',
              details: {
                items: orderItems,
                totalPrice,
              },
            },
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }

        clearCart();
        setIsOpen(false);
        setIsCheckingOut(false);
        toast.success('Order placed successfully! View it in your profile.');
        navigate('/profile');
      },
      onFailure: (error) => {
        console.error('Payment failed:', error);
        setIsCheckingOut(false);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-cream z-50 shadow-elevated animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-olive" />
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Your Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={item.isVeg ? 'badge-veg' : 'badge-nonveg'} />
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-olive/10 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-olive/10 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-semibold text-olive">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-card">
              <div className="flex justify-between mb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">₹{totalPrice}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || isPaymentLoading}
                className="w-full btn-hero-primary !py-4 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCheckingOut || isPaymentLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ₹{totalPrice}
                  </>
                )}
              </button>
              {!user && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  You'll need to sign in to complete checkout
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center mt-2">
                UPI & Card payments only
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
