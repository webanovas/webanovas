import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(255),
  message: z.string().min(1).max(5000),
  package: z.string().optional(),
  price: z.string().optional(),
  choices: z.record(z.string()).optional(),
});

const choiceKeyLabels: Record<string, string> = {
  pages: "Pages",
  design: "Design Level",
  cms: "CMS",
  auth: "Authentication",
  backend: "Backend/Database",
  ecommerce: "E-commerce",
  timeline: "Timeline",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const parsed = ContactSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, message, package: pkg, price, choices } = parsed.data;

    let body = `New contact form submission:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    if (pkg) {
      body += `\n\n--- Quiz Result ---\nPackage: ${pkg} (${price || "N/A"})`;
    }
    if (choices) {
      body += "\n\n--- Quiz Choices ---";
      for (const [key, value] of Object.entries(choices)) {
        body += `\n${choiceKeyLabels[key] || key}: ${value}`;
      }
    }

    const subject = pkg ? `Project Inquiry — ${pkg}` : "New Project Inquiry";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Siterix Studio <onboarding@resend.dev>",
        to: ["siterixstudios@gmail.com"],
        subject,
        text: body,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      throw new Error(`Email send failed: ${res.status}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
