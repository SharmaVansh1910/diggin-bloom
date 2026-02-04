import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Calendar, 
  Users, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  XCircle,
  Loader2,
  Shield,
  Truck,
  Package,
  CreditCard,
  IndianRupee,
  Filter
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total_price: number;
  status: string;
  payment_status: string | null;
  payment_method: string | null;
  amount_paid: number | null;
  razorpay_payment_id: string | null;
  paid_at: string | null;
  created_at: string;
  profiles?: { full_name: string | null; email: string | null } | null;
}

interface Booking {
  id: string;
  user_id: string;
  name: string;
  people_count: number;
  booking_date: string;
  booking_time: string;
  contact: string;
  notes: string | null;
  status: string;
  payment_status: string | null;
  payment_method: string | null;
  amount_paid: number | null;
  razorpay_payment_id: string | null;
  paid_at: string | null;
  created_at: string;
  profiles?: { full_name: string | null; email: string | null } | null;
}

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

type TabType = 'orders' | 'bookings' | 'users';
type PaymentFilterType = 'all' | 'paid' | 'pending' | 'failed';
type DateFilterType = 'all' | 'today' | 'week' | 'month';

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilterType>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate('/auth', { state: { from: '/admin' } });
      } else if (!isAdmin) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, activeTab]);

  async function fetchData() {
    setIsLoading(true);
    try {
      if (activeTab === 'orders') {
        const { data, error } = await supabase
          .from('orders')
          .select('*, profiles(full_name, email)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        const ordersWithTypedItems = (data || []).map(order => ({
          ...order,
          items: order.items as unknown as OrderItem[],
        }));
        setOrders(ordersWithTypedItems);
      } else if (activeTab === 'bookings') {
        const { data, error } = await supabase
          .from('event_bookings')
          .select('*, profiles(full_name, email)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setBookings(data || []);
      } else if (activeTab === 'users') {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProfiles(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  }

  async function updateBookingStatus(bookingId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('event_bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;
      
      toast.success(`Booking ${newStatus}`);
      fetchData();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      toast.success(`Order ${newStatus}`);
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  }

  const filterByDate = <T extends { created_at: string }>(items: T[]): T[] => {
    if (dateFilter === 'all') return items;
    
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return items.filter(item => {
      const itemDate = new Date(item.created_at);
      if (dateFilter === 'today') {
        return itemDate >= startOfToday;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(startOfToday);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return itemDate >= weekAgo;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(startOfToday);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return itemDate >= monthAgo;
      }
      return true;
    });
  };

  const filteredOrders = useMemo(() => {
    let filtered = filterByDate(orders);
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(order => order.payment_status === paymentFilter);
    }
    return filtered;
  }, [orders, paymentFilter, dateFilter]);

  const filteredBookings = useMemo(() => {
    let filtered = filterByDate(bookings);
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(booking => booking.payment_status === paymentFilter);
    }
    return filtered;
  }, [bookings, paymentFilter, dateFilter]);

  const orderRevenue = useMemo(() => {
    return filteredOrders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + (o.amount_paid || 0), 0);
  }, [filteredOrders]);

  const bookingRevenue = useMemo(() => {
    return filteredBookings
      .filter(b => b.payment_status === 'paid')
      .reduce((sum, b) => sum + (b.amount_paid || 0), 0);
  }, [filteredBookings]);

  const totalRevenue = orderRevenue + bookingRevenue;

  const getPaymentStatusBadge = (status: string | null) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Paid
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            <Clock className="w-3 h-3" /> Unknown
          </span>
        );
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Confirmed
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            <Truck className="w-3 h-3" /> Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            <Package className="w-3 h-3" /> {status}
          </span>
        );
    }
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-olive" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-olive text-cream py-6">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 hover:bg-cream/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                <div>
                  <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-cream/70 text-sm">Manage orders, bookings & users</p>
                </div>
              </div>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-cream/10 hover:bg-cream/20 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Revenue Summary */}
      {(activeTab === 'orders' || activeTab === 'bookings') && (
        <div className="section-container py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold text-foreground">₹{totalRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-olive/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-olive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Revenue</p>
                  <p className="text-xl font-bold text-foreground">₹{orderRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booking Revenue</p>
                  <p className="text-xl font-bold text-foreground">₹{bookingRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="section-container py-6">
        <div className="flex gap-2 p-1 bg-card rounded-xl mb-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-olive text-cream'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'bg-olive text-cream'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-olive text-cream'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Users className="w-4 h-4" />
            Users
          </button>
        </div>

        {/* Filters */}
        {(activeTab === 'orders' || activeTab === 'bookings') && (
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={paymentFilter} onValueChange={(v) => setPaymentFilter(v as PaymentFilterType)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilterType)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-olive" />
          </div>
        ) : (
          <>
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-2xl">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div key={order.id} className="bg-card rounded-2xl p-6 shadow-soft">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {order.profiles?.full_name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.profiles?.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          {getPaymentStatusBadge(order.payment_status)}
                          {getOrderStatusBadge(order.status)}
                        </div>
                      </div>

                      {/* Payment Details */}
                      {order.payment_status === 'paid' && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Payment Details</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Amount</p>
                              <p className="font-medium">₹{order.amount_paid}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Method</p>
                              <p className="font-medium capitalize">{order.payment_method || '-'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Payment ID</p>
                              <p className="font-mono text-xs truncate">{order.razorpay_payment_id || '-'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Paid At</p>
                              <p className="font-medium">
                                {order.paid_at ? new Date(order.paid_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.name} x{item.quantity}
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {/* Only allow status change for paid orders */}
                          {order.payment_status === 'paid' && (
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-[130px] h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        <span className="font-semibold text-olive">
                          Total: ₹{order.total_price}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-2xl">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookings found</p>
                  </div>
                ) : (
                  filteredBookings.map((booking) => (
                    <div key={booking.id} className="bg-card rounded-2xl p-6 shadow-soft">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-medium text-foreground">{booking.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.profiles?.full_name} • {booking.contact}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          {getPaymentStatusBadge(booking.payment_status)}
                          {getBookingStatusBadge(booking.status)}
                        </div>
                      </div>

                      {/* Payment Details */}
                      {booking.payment_status === 'paid' && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Payment Details</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Amount</p>
                              <p className="font-medium">₹{booking.amount_paid}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Method</p>
                              <p className="font-medium capitalize">{booking.payment_method || '-'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Payment ID</p>
                              <p className="font-mono text-xs truncate">{booking.razorpay_payment_id || '-'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Paid At</p>
                              <p className="font-medium">
                                {booking.paid_at ? new Date(booking.paid_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-olive" />
                          <span>{new Date(booking.booking_date).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-olive" />
                          <span>{booking.booking_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-olive" />
                          <span>{booking.people_count} guests</span>
                        </div>
                      </div>
                      {booking.notes && (
                        <p className="text-sm text-muted-foreground mb-4 p-3 bg-muted rounded-lg">
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            Booked: {new Date(booking.created_at).toLocaleDateString('en-IN')}
                          </span>
                          {/* Only allow status change for paid bookings */}
                          {booking.payment_status === 'paid' && (
                            <Select
                              value={booking.status}
                              onValueChange={(value) => updateBookingStatus(booking.id, value)}
                            >
                              <SelectTrigger className="w-[130px] h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        {booking.payment_status === 'paid' && (
                          <span className="font-semibold text-olive">
                            Paid: ₹{booking.amount_paid}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                {profiles.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-2xl">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No users yet</p>
                  </div>
                ) : (
                  profiles.map((profile) => (
                    <div key={profile.id} className="bg-card rounded-2xl p-6 shadow-soft">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center">
                          <span className="font-semibold text-olive text-lg">
                            {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {profile.full_name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-muted-foreground">{profile.email}</p>
                          {profile.phone && (
                            <p className="text-sm text-muted-foreground">{profile.phone}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Joined</p>
                          <p className="text-sm">
                            {new Date(profile.created_at).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
