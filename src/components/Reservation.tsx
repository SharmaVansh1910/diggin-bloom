import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useAuth } from '@/contexts/AuthContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, Users, MessageSquare, CheckCircle, Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const RESERVATION_PRICE_PER_GUEST = 20; // ₹20 per guest

const reservationSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().trim().email('Enter a valid email address').max(255),
  guests: z.number().min(1, 'At least 1 guest required').max(20, 'Maximum 20 guests allowed'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  specialRequest: z.string().max(500).optional(),
  businessMeeting: z.boolean().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
];

export function Reservation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { initiatePayment, isLoading: isPaymentLoading } = useRazorpay();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationForm, string>>>({});
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    guests: 2,
    date: '',
    time: '',
    specialRequest: '',
    businessMeeting: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ReservationForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const reservationAmount = formData.guests * RESERVATION_PRICE_PER_GUEST;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to make a reservation');
      navigate('/auth', { state: { from: '/' } });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = reservationSchema.parse({
        ...formData,
        guests: Number(formData.guests),
      });

      // Build reservation name with business meeting flag
      const reservationName = validatedData.businessMeeting 
        ? `Business Meeting - ${validatedData.fullName}` 
        : `Table Reservation - ${validatedData.fullName}`;

      // Initiate payment
      initiatePayment({
        type: 'reservation',
        guests: validatedData.guests,
        bookingDate: validatedData.date,
        bookingTime: validatedData.time,
        bookingName: reservationName,
        contact: validatedData.mobile,
        notes: validatedData.specialRequest,
        userEmail: validatedData.email,
        userName: validatedData.fullName,
        onSuccess: async (referenceId) => {
          // Send confirmation emails
          try {
            await supabase.functions.invoke('send-notification', {
              body: {
                type: 'booking',
                userEmail: validatedData.email,
                userName: validatedData.fullName,
                details: {
                  date: validatedData.date,
                  time: validatedData.time,
                  guests: validatedData.guests,
                  specialRequest: validatedData.specialRequest,
                },
              },
            });
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
          }
          
          setIsSubmitted(true);
          setIsSubmitting(false);
          toast.success('Reservation confirmed with payment!');
        },
        onFailure: (error) => {
          console.error('Payment failed:', error);
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ReservationForm, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ReservationForm] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Please fix the errors in the form');
      } else {
        console.error('Error submitting reservation:', error);
        toast.error('Failed to submit reservation. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <section id="reservation" className="py-24 lg:py-32 bg-olive">
        <div className="section-container">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream/20 mb-8">
              <CheckCircle className="w-10 h-10 text-cream" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6">
              Reservation Confirmed!
            </h2>
            <p className="text-cream/80 text-lg mb-8">
              Thank you for choosing Diggin Café. Your table has been reserved and payment received.
              We look forward to hosting you!
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  mobile: '',
                  email: '',
                  guests: 2,
                  date: '',
                  time: '',
                  specialRequest: '',
                  businessMeeting: false,
                });
              }}
              className="btn-hero-secondary"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-olive"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-cream/20 text-cream text-sm font-medium mb-6">
              Reserve Your Table
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Book Your
              <span className="block">Perfect Spot</span>
            </h2>
            <p className="text-cream/80 text-lg mb-8">
              Whether it's a romantic dinner, a family brunch, or a business meeting, 
              we'll ensure you have the best seat in the house. Reserve ahead and 
              let us take care of the rest.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-cream/80">
                <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-medium text-cream">Advance Booking</p>
                  <p className="text-sm">Reserve up to 30 days in advance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-cream/80">
                <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-medium text-cream">Group Reservations</p>
                  <p className="text-sm">Perfect for parties up to 20 guests</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-cream/80">
                <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-medium text-cream">Special Requests</p>
                  <p className="text-sm">Celebrations, dietary needs & more</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-cream/80">
                <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-cream" />
                </div>
                <div>
                  <p className="font-medium text-cream">₹20 per Guest</p>
                  <p className="text-sm">Secure your table with a small booking fee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-cream rounded-3xl p-8 shadow-elevated"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Make a Reservation
              </h3>

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`input-elegant ${errors.fullName ? 'border-destructive' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile & Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`input-elegant ${errors.mobile ? 'border-destructive' : ''}`}
                      placeholder="10-digit number"
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-destructive">{errors.mobile}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-elegant ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Guests, Date, Time */}
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
                      Guests *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className={`input-elegant ${errors.guests ? 'border-destructive' : ''}`}
                    >
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      className={`input-elegant ${errors.date ? 'border-destructive' : ''}`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-destructive">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-foreground mb-2">
                      Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`input-elegant ${errors.time ? 'border-destructive' : ''}`}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="mt-1 text-sm text-destructive">{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label htmlFor="specialRequest" className="block text-sm font-medium text-foreground mb-2">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequest"
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleChange}
                    rows={3}
                    className="input-elegant resize-none"
                    placeholder="Birthday celebration, dietary restrictions, seating preferences..."
                  />
                </div>

                {/* Business Meeting Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="businessMeeting"
                    checked={formData.businessMeeting}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-border text-olive focus:ring-olive"
                  />
                  <span className="text-sm text-foreground">
                    This is a business meeting (quieter seating preferred)
                  </span>
                </label>

                {/* Booking Amount */}
                <div className="p-4 rounded-xl bg-olive/10 border border-olive/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">Booking Fee ({formData.guests} {formData.guests === 1 ? 'guest' : 'guests'} × ₹{RESERVATION_PRICE_PER_GUEST})</span>
                    <span className="font-semibold text-olive text-lg">₹{reservationAmount}</span>
                  </div>
                </div>

                {/* Sign-in prompt */}
                {!user && (
                  <div className="p-3 rounded-xl bg-olive/10 border border-olive/20">
                    <p className="text-sm text-foreground text-center">
                      Please <button type="button" onClick={() => navigate('/auth')} className="text-olive underline font-medium">sign in</button> to complete your reservation.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isPaymentLoading}
                  className="w-full btn-hero-primary !py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting || isPaymentLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ₹{reservationAmount} & Reserve
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  UPI & Card payments only. Booking fee is non-refundable.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
