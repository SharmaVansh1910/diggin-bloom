import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  type: "food_order" | "reservation";
  referenceId: string;
  paymentMethod?: string;
}

async function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  const message = `${orderId}|${paymentId}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(RAZORPAY_KEY_SECRET);
  const messageData = encoder.encode(message);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, messageData);
  const signatureArray = new Uint8Array(signatureBuffer);
  const computedSignature = Array.from(signatureArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computedSignature === signature;
}

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

    const body: VerifyPaymentRequest = await req.json();
    console.log("Verify payment request:", {
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      type: body.type,
      referenceId: body.referenceId,
    });

    // Verify signature on backend
    const isValid = await verifySignature(
      body.razorpay_order_id,
      body.razorpay_payment_id,
      body.razorpay_signature
    );

    if (!isValid) {
      console.error("Invalid payment signature");
      throw new Error("Payment verification failed - invalid signature");
    }

    console.log("Payment signature verified successfully");

    const now = new Date().toISOString();
    const paymentMethod = body.paymentMethod || "upi";

    // Update the order/booking record
    const table = body.type === "food_order" ? "orders" : "event_bookings";
    
    // Get the record to get the amount
    const { data: record, error: fetchError } = await supabase
      .from(table)
      .select("*")
      .eq("id", body.referenceId)
      .single();

    if (fetchError || !record) {
      throw new Error("Record not found");
    }

    const amount = body.type === "food_order" ? record.total_price : record.people_count * 20;

    // Update record with payment details
    const { error: updateError } = await supabase
      .from(table)
      .update({
        status: "confirmed",
        payment_status: "paid",
        payment_method: paymentMethod,
        razorpay_payment_id: body.razorpay_payment_id,
        amount_paid: amount,
        paid_at: now,
      })
      .eq("id", body.referenceId);

    if (updateError) {
      console.error("Error updating record:", updateError);
      throw updateError;
    }

    // Update payment audit record
    await supabase
      .from("payments")
      .update({
        payment_status: "paid",
        payment_method: paymentMethod,
        razorpay_payment_id: body.razorpay_payment_id,
        razorpay_signature: body.razorpay_signature,
        paid_at: now,
      })
      .eq("razorpay_order_id", body.razorpay_order_id);

    console.log("Payment verified and records updated successfully");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified successfully",
        referenceId: body.referenceId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error verifying payment:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
