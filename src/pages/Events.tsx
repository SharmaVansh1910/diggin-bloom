import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { toast } from 'sonner';
import { z } from 'zod';
import { ArrowLeft, Calendar, Users, Clock, MessageSquare, CheckCircle, Loader2, PartyPopper, Utensils, Heart } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  people_count: z.number().min(1, 'At least 1 guest required').max(100, 'Maximum 100 guests'),
  booking_date: z.string().min(1, 'Please select a date'),
  booking_time: z.string().min(1, 'Please select a time'),
  contact: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  notes: z.string().max(500).optional(),
});

const eventTypes = [
  { id: 'birthday', icon: PartyPopper, label: 'Birthday Party', description: 'Celebrate with us!' },
  { id: 'corporate', icon: Utensils, label: 'Corporate Event', description: 'Business lunches & dinners' },
  { id: 'anniversary', icon: Heart, label: 'Anniversary', description: 'Special occasions' },
  { id: 'other', icon: Calendar, label: 'Other Event', description: 'Custom celebrations' },
];

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM',
];

export default function Events() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('birthday');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const [formData, setFormData] = useState({
    name: '',
    people_count: 10,
    booking_date: '',
    booking_time: '',
    contact: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to book an event');
      navigate('/auth', { state: { from: '/events' } });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const validated = bookingSchema.parse({
        ...formData,
        people_count: Number(formData.people_count),
      });

      const { error } = await supabase.from('event_bookings').insert({
        user_id: user.id,
        name: `${eventTypes.find(e => e.id === selectedEventType)?.label} - ${validated.name}`,
        people_count: validated.people_count,
        booking_date: validated.booking_date,
        booking_time: validated.booking_time,
        contact: validated.contact,
        notes: validated.notes || null,
        status: 'pending',
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success('Event booking submitted successfully!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Please fix the errors in the form');
      } else {
        console.error('Error submitting booking:', error);
        toast.error('Failed to submit booking. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-olive flex items-center justify-center p-4">
        <div className="max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream/20 mb-8">
            <CheckCircle className="w-10 h-10 text-cream" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6">
            Booking Request Received!
          </h1>
          <p className="text-cream/80 text-lg mb-8">
            Thank you for choosing Diggin Café for your special event. Our events team will 
            contact you within 24 hours to confirm your booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/profile" className="btn-hero-secondary">
              View My Bookings
            </Link>
            <Link to="/" className="btn-hero-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-32 bg-olive">
        <div className="section-container text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cream/70 hover:text-cream mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Events & Private Dining
          </h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            From intimate celebrations to grand corporate gatherings, let us create 
            unforgettable moments at Diggin Café.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section ref={sectionRef} className="py-20">
        <div className="section-container max-w-4xl">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Event Types */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">
                What are you celebrating?
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {eventTypes.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEventType(event.id)}
                    className={`p-6 rounded-2xl text-center transition-all ${
                      selectedEventType === event.id
                        ? 'bg-olive text-cream shadow-elevated'
                        : 'bg-card hover:bg-muted'
                    }`}
                  >
                    <event.icon className={`w-8 h-8 mx-auto mb-3 ${
                      selectedEventType === event.id ? 'text-cream' : 'text-olive'
                    }`} />
                    <p className="font-medium">{event.label}</p>
                    <p className={`text-sm ${
                      selectedEventType === event.id ? 'text-cream/70' : 'text-muted-foreground'
                    }`}>{event.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 shadow-soft">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Book Your Event
              </h3>

              {!user && (
                <div className="mb-6 p-4 rounded-xl bg-olive/10 border border-olive/20">
                  <p className="text-sm text-foreground">
                    <strong>Note:</strong> You'll need to{' '}
                    <Link to="/auth" state={{ from: '/events' }} className="text-olive underline">
                      sign in
                    </Link>{' '}
                    to complete your booking.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Event Name / Host Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-elegant ${errors.name ? 'border-destructive' : ''}`}
                      placeholder="e.g., Sarah's 30th Birthday"
                    />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="people_count" className="block text-sm font-medium text-foreground mb-2">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                        id="people_count"
                        name="people_count"
                        value={formData.people_count}
                        onChange={handleChange}
                        min={1}
                        max={100}
                        className={`input-elegant pl-12 ${errors.people_count ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.people_count && <p className="mt-1 text-sm text-destructive">{errors.people_count}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="booking_date" className="block text-sm font-medium text-foreground mb-2">
                      Event Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        id="booking_date"
                        name="booking_date"
                        value={formData.booking_date}
                        onChange={handleChange}
                        min={today}
                        className={`input-elegant pl-12 ${errors.booking_date ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.booking_date && <p className="mt-1 text-sm text-destructive">{errors.booking_date}</p>}
                  </div>

                  <div>
                    <label htmlFor="booking_time" className="block text-sm font-medium text-foreground mb-2">
                      Event Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <select
                        id="booking_time"
                        name="booking_time"
                        value={formData.booking_time}
                        onChange={handleChange}
                        className={`input-elegant pl-12 ${errors.booking_time ? 'border-destructive' : ''}`}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                    {errors.booking_time && <p className="mt-1 text-sm text-destructive">{errors.booking_time}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`input-elegant ${errors.contact ? 'border-destructive' : ''}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.contact && <p className="mt-1 text-sm text-destructive">{errors.contact}</p>}
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                    Special Requests / Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="input-elegant resize-none"
                    placeholder="Tell us about your event, dietary requirements, decoration preferences..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hero-primary !py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Submit Booking Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
