import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, User, Mail, Phone, Package, Calendar, Loader2, LogOut, Edit3, Save } from 'lucide-react';
import { format } from 'date-fns';

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total_price: number;
  status: string;
  created_at: string;
}

interface Booking {
  id: string;
  name: string;
  people_count: number;
  booking_date: string;
  booking_time: string;
  contact: string;
  notes: string | null;
  status: string;
  created_at: string;
}

export default function Profile() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({ full_name: '', phone: '' });
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'bookings'>('profile');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: '/profile' } });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);
      setEditData({
        full_name: profileData?.full_name || '',
        phone: profileData?.phone || '',
      });

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      
      // Map the data to our Order type
      const mappedOrders: Order[] = (ordersData || []).map((order) => ({
        id: order.id,
        items: (order.items as unknown as OrderItem[]) || [],
        total_price: Number(order.total_price),
        status: order.status,
        created_at: order.created_at,
      }));
      setOrders(mappedOrders);

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('event_bookings')
        .select('*')
        .eq('user_id', user!.id)
        .order('booking_date', { ascending: true });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData as Booking[] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editData.full_name,
          phone: editData.phone,
        })
        .eq('id', user!.id);

      if (error) throw error;
      
      setProfile((prev) => prev ? { ...prev, ...editData } : null);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('event_bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;
      
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast.success('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-olive" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="section-container max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-olive hover:text-olive-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
          My Account
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['profile', 'orders', 'bookings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-olive text-cream'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'profile' && <User className="w-4 h-4 inline mr-2" />}
              {tab === 'orders' && <Package className="w-4 h-4 inline mr-2" />}
              {tab === 'bookings' && <Calendar className="w-4 h-4 inline mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'orders' && orders.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-cream/20 text-sm">{orders.length}</span>
              )}
              {tab === 'bookings' && bookings.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-cream/20 text-sm">{bookings.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-card rounded-3xl p-8 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-olive/10 text-olive hover:bg-olive/20 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-olive text-cream hover:bg-olive-dark transition-colors disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-olive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{profile?.email || user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-olive" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.full_name}
                      onChange={(e) => setEditData((prev) => ({ ...prev, full_name: e.target.value }))}
                      className="input-elegant mt-1"
                      placeholder="Your full name"
                    />
                  ) : (
                    <p className="font-medium text-foreground">{profile?.full_name || 'Not set'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-olive" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="input-elegant mt-1"
                      placeholder="Your phone number"
                    />
                  ) : (
                    <p className="font-medium text-foreground">{profile?.phone || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-card rounded-3xl p-12 shadow-soft text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">Your order history will appear here.</p>
                <Link to="/#menu" className="btn-hero-primary inline-flex">
                  Browse Menu
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(order.created_at), 'PPP p')}
                      </p>
                      <p className="font-medium text-foreground">Order #{order.id.slice(0, 8)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'confirmed' ? 'bg-olive/10 text-olive' :
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-foreground">{item.quantity}x {item.name}</span>
                        <span className="text-muted-foreground">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-4 border-t border-border">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-semibold text-olive">₹{order.total_price}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="bg-card rounded-3xl p-12 shadow-soft text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">Your event reservations will appear here.</p>
                <Link to="/events" className="btn-hero-primary inline-flex">
                  Book an Event
                </Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-serif text-lg font-semibold text-foreground">{booking.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.booking_date), 'PPP')} at {booking.booking_time}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' ? 'bg-olive/10 text-olive' :
                      booking.status === 'pending' ? 'bg-gold/10 text-gold' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Guests: </span>
                      <span className="text-foreground">{booking.people_count} people</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contact: </span>
                      <span className="text-foreground">{booking.contact}</span>
                    </div>
                  </div>
                  {booking.notes && (
                    <p className="text-sm text-muted-foreground italic mb-4">"{booking.notes}"</p>
                  )}
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-sm text-destructive hover:underline"
                  >
                    Cancel Booking
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
