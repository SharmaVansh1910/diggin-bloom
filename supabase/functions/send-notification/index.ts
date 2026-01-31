import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const MAILJET_API_KEY = Deno.env.get("MAILJET_API_KEY");
const MAILJET_SECRET_KEY = Deno.env.get("MAILJET_SECRET_KEY");
const ADMIN_EMAIL = "carbt0105@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotificationRequest {
  type: "order" | "booking" | "inquiry";
  userEmail: string;
  userName: string;
  details: {
    items?: Array<{ name: string; price: number; quantity: number }>;
    totalPrice?: number;
    date?: string;
    time?: string;
    guests?: number;
    specialRequest?: string;
    phone?: string;
    message?: string;
  };
}

function generateOrderEmailHtml(userName: string, details: NotificationRequest["details"], isAdmin: boolean): string {
  const itemsList = details.items?.map(item => 
    `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td><td style="padding:8px;border-bottom:1px solid #eee;">x${item.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;">₹${item.price * item.quantity}</td></tr>`
  ).join("") || "";

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h1 style="color:#5d6b4b;margin-bottom:20px;">${isAdmin ? "New Order Received!" : "Order Confirmation"}</h1>
      <p>Hi ${isAdmin ? "Admin" : userName},</p>
      <p>${isAdmin ? `A new order has been placed by ${userName}.` : "Thank you for your order at Diggin Café!"}</p>
      <h3 style="margin-top:20px;">Order Details:</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#f5f5f5;"><th style="padding:8px;text-align:left;">Item</th><th style="padding:8px;">Qty</th><th style="padding:8px;">Price</th></tr></thead>
        <tbody>${itemsList}</tbody>
        <tfoot><tr><td colspan="2" style="padding:8px;font-weight:bold;">Total:</td><td style="padding:8px;font-weight:bold;">₹${details.totalPrice}</td></tr></tfoot>
      </table>
      <p style="margin-top:20px;color:#666;">Status: Confirmed</p>
      <p style="margin-top:30px;color:#888;font-size:12px;">Diggin Café - Where every bite tells a story</p>
    </div>
  `;
}

function generateBookingEmailHtml(userName: string, details: NotificationRequest["details"], isAdmin: boolean): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h1 style="color:#5d6b4b;margin-bottom:20px;">${isAdmin ? "New Reservation Request!" : "Reservation Confirmation"}</h1>
      <p>Hi ${isAdmin ? "Admin" : userName},</p>
      <p>${isAdmin ? `A new reservation has been requested by ${userName}.` : "Thank you for your reservation request at Diggin Café!"}</p>
      <div style="background:#f9f9f9;padding:20px;border-radius:8px;margin:20px 0;">
        <h3 style="margin-top:0;">Reservation Details:</h3>
        <p><strong>Date:</strong> ${details.date}</p>
        <p><strong>Time:</strong> ${details.time}</p>
        <p><strong>Number of Guests:</strong> ${details.guests}</p>
        ${details.specialRequest ? `<p><strong>Special Requests:</strong> ${details.specialRequest}</p>` : ""}
      </div>
      <p style="color:#666;">${isAdmin ? "Please review and confirm this reservation." : "Our team will confirm your reservation shortly via email or SMS."}</p>
      <p style="margin-top:30px;color:#888;font-size:12px;">Diggin Café - Where every bite tells a story</p>
    </div>
  `;
}

function generateInquiryEmailHtml(userName: string, userEmail: string, details: NotificationRequest["details"], isAdmin: boolean): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h1 style="color:#5d6b4b;margin-bottom:20px;">${isAdmin ? "New Inquiry Received!" : "We've Received Your Message"}</h1>
      <p>Hi ${isAdmin ? "Admin" : userName},</p>
      <p>${isAdmin ? `A new inquiry has been submitted by ${userName}.` : "Thank you for reaching out to Diggin Café!"}</p>
      <div style="background:#f9f9f9;padding:20px;border-radius:8px;margin:20px 0;">
        <h3 style="margin-top:0;">Inquiry Details:</h3>
        ${isAdmin ? `<p><strong>From:</strong> ${userName}</p>` : ""}
        ${isAdmin ? `<p><strong>Email:</strong> ${userEmail}</p>` : ""}
        ${details.phone ? `<p><strong>Phone:</strong> ${details.phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${details.message}</p>
      </div>
      <p style="color:#666;">${isAdmin ? "Please respond to this inquiry at your earliest convenience." : "Our team will get back to you within 24 hours."}</p>
      <p style="margin-top:30px;color:#888;font-size:12px;">Diggin Café - Where every bite tells a story</p>
    </div>
  `;
}

async function sendMailjetEmail(to: string, toName: string, subject: string, htmlContent: string): Promise<{ success: boolean; error?: string }> {
  const auth = btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`);
  
  const response = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`,
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: "noreply@diggin.co.in",
            Name: "Diggin Café",
          },
          To: [
            {
              Email: to,
              Name: toName,
            },
          ],
          Subject: subject,
          HTMLPart: htmlContent,
        },
      ],
    }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    console.error("Mailjet error:", result);
    return { success: false, error: result.ErrorMessage || "Failed to send email" };
  }
  
  return { success: true };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, userEmail, userName, details }: NotificationRequest = await req.json();

    console.log(`Sending ${type} notification to user: ${userEmail} and admin: ${ADMIN_EMAIL}`);

    let userSubject: string;
    let adminSubject: string;
    let userHtml: string;
    let adminHtml: string;

    switch (type) {
      case "order":
        userSubject = "Your Diggin Café Order Confirmation";
        adminSubject = `New Order from ${userName}`;
        userHtml = generateOrderEmailHtml(userName, details, false);
        adminHtml = generateOrderEmailHtml(userName, details, true);
        break;
      case "booking":
        userSubject = "Your Diggin Café Reservation Request";
        adminSubject = `New Reservation Request from ${userName}`;
        userHtml = generateBookingEmailHtml(userName, details, false);
        adminHtml = generateBookingEmailHtml(userName, details, true);
        break;
      case "inquiry":
        userSubject = "We've Received Your Inquiry - Diggin Café";
        adminSubject = `New Inquiry from ${userName}`;
        userHtml = generateInquiryEmailHtml(userName, userEmail, details, false);
        adminHtml = generateInquiryEmailHtml(userName, userEmail, details, true);
        break;
      default:
        throw new Error("Invalid notification type");
    }

    // Send emails in parallel
    const [userEmailResult, adminEmailResult] = await Promise.all([
      sendMailjetEmail(userEmail, userName, userSubject, userHtml),
      sendMailjetEmail(ADMIN_EMAIL, "Admin", adminSubject, adminHtml),
    ]);

    console.log("User email result:", userEmailResult);
    console.log("Admin email result:", adminEmailResult);

    return new Response(
      JSON.stringify({ success: true, userEmail: userEmailResult, adminEmail: adminEmailResult }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
