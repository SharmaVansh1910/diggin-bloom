import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface CreateOrderRequest {
  type: "food_order" | "reservation";
  // For food orders
  items?: OrderItem[];
  // For reservations
  guests?: number;
  bookingDate?: string;
  bookingTime?: string;
  bookingName?: string;
  contact?: string;
  notes?: string;
}

const RESERVATION_PRICE_PER_GUEST = 20; // ₹20 per guest

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Invalid user token");
    }

    const body: CreateOrderRequest = await req.json();
    console.log("Create order request:", body);

    let amount: number;
    let referenceId: string;
    let receiptPrefix: string;

    if (body.type === "food_order") {
      if (!body.items || body.items.length === 0) {
        throw new Error("No items in order");
      }

      // Recalculate total on backend (never trust frontend values)
      amount = body.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      receiptPrefix = "order";

      // Create pending order in database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          items: body.items,
          total_price: amount,
          status: "pending",
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;
      referenceId = order.id;

    } else if (body.type === "reservation") {
      if (!body.guests || body.guests < 1) {
        throw new Error("Invalid guest count");
      }

      // Calculate amount: ₹20 per guest
      amount = body.guests * RESERVATION_PRICE_PER_GUEST;
      receiptPrefix = "res";

      // Create pending booking in database
      const { data: booking, error: bookingError } = await supabase
        .from("event_bookings")
        .insert({
          user_id: user.id,
          name: body.bookingName || `Table Reservation`,
          people_count: body.guests,
          booking_date: body.bookingDate,
          booking_time: body.bookingTime,
          contact: body.contact,
          notes: body.notes || null,
          status: "pending",
          payment_status: "pending",
        })
        .select()
        .single();

      if (bookingError) throw bookingError;
      referenceId = booking.id;

    } else {
      throw new Error("Invalid order type");
    }

    // Create Razorpay order
    const razorpayAuth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
    
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${razorpayAuth}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `${receiptPrefix}_${referenceId.substring(0, 8)}`,
        notes: {
          type: body.type,
          reference_id: referenceId,
          user_id: user.id,
        },
      }),
    });

    if (!razorpayResponse.ok) {
      const errorData = await razorpayResponse.json();
      console.error("Razorpay error:", errorData);
      throw new Error("Failed to create Razorpay order");
    }

    const razorpayOrder = await razorpayResponse.json();
    console.log("Razorpay order created:", razorpayOrder.id);

    // Update record with Razorpay order ID
    const table = body.type === "food_order" ? "orders" : "event_bookings";
    await supabase
      .from(table)
      .update({ razorpay_order_id: razorpayOrder.id })
      .eq("id", referenceId);

    // Create payment record for audit
    await supabase.from("payments").insert({
      reference_id: referenceId,
      reference_type: body.type === "food_order" ? "order" : "reservation",
      amount: amount,
      payment_status: "pending",
      razorpay_order_id: razorpayOrder.id,
      user_id: user.id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        orderId: razorpayOrder.id,
        amount: amount,
        currency: "INR",
        referenceId: referenceId,
        key: RAZORPAY_KEY_ID,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating order:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
