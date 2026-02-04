import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface RazorpayOptions {
  type: 'food_order' | 'reservation';
  items?: OrderItem[];
  guests?: number;
  bookingDate?: string;
  bookingTime?: string;
  bookingName?: string;
  contact?: string;
  notes?: string;
  userEmail?: string;
  userName?: string;
  onSuccess: (referenceId: string) => void;
  onFailure: (error: string) => void;
}

export function useRazorpay() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    if (document.getElementById('razorpay-script')) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      toast.error('Payment system unavailable. Please try again later.');
    };
    document.body.appendChild(script);
  }, []);

  const initiatePayment = useCallback(
    async (options: RazorpayOptions) => {
      if (!user) {
        toast.error('Please sign in to continue');
        return;
      }

      if (!isScriptLoaded || !window.Razorpay) {
        toast.error('Payment system is loading. Please try again.');
        return;
      }

      setIsLoading(true);

      try {
        // Get session for auth header
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No active session');
        }

        // Create order on backend
        const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
          body: {
            type: options.type,
            items: options.items,
            guests: options.guests,
            bookingDate: options.bookingDate,
            bookingTime: options.bookingTime,
            bookingName: options.bookingName,
            contact: options.contact,
            notes: options.notes,
          },
        });

        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || 'Failed to create order');
        }

        console.log('Razorpay order created:', data);

        // Open Razorpay checkout
        const razorpayOptions = {
          key: data.key,
          amount: data.amount * 100,
          currency: data.currency,
          name: 'Diggin Café',
          description: options.type === 'food_order' ? 'Food Order' : 'Table Reservation',
          order_id: data.orderId,
          prefill: {
            name: options.userName || user.user_metadata?.full_name || '',
            email: options.userEmail || user.email || '',
            contact: options.contact || '',
          },
          config: {
            display: {
              blocks: {
                banks: {
                  name: 'Pay using UPI or Card',
                  instruments: [
                    { method: 'upi' },
                    { method: 'card' },
                  ],
                },
              },
              sequence: ['block.banks'],
              preferences: {
                show_default_blocks: false,
              },
            },
          },
          theme: {
            color: '#4A5D23', // olive color
          },
          handler: async (response: any) => {
            console.log('Payment successful:', response);
            
            try {
              // Verify payment on backend
              const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
                'verify-razorpay-payment',
                {
                  body: {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    type: options.type,
                    referenceId: data.referenceId,
                  },
                }
              );

              if (verifyError || !verifyData?.success) {
                throw new Error(verifyData?.error || 'Payment verification failed');
              }

              toast.success('Payment successful!');
              options.onSuccess(data.referenceId);
            } catch (verifyErr: any) {
              console.error('Verification error:', verifyErr);
              toast.error('Payment verification failed. Please contact support.');
              options.onFailure(verifyErr.message);
            }
          },
          modal: {
            ondismiss: () => {
              console.log('Payment modal closed');
              setIsLoading(false);
            },
          },
        };

        const razorpay = new window.Razorpay(razorpayOptions);
        
        razorpay.on('payment.failed', (response: any) => {
          console.error('Payment failed:', response.error);
          toast.error(`Payment failed: ${response.error.description}`);
          options.onFailure(response.error.description);
          setIsLoading(false);
        });

        razorpay.open();
      } catch (err: any) {
        console.error('Payment initiation error:', err);
        toast.error(err.message || 'Failed to initiate payment');
        options.onFailure(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [user, isScriptLoaded]
  );

  return {
    initiatePayment,
    isLoading,
    isReady: isScriptLoaded,
  };
}
