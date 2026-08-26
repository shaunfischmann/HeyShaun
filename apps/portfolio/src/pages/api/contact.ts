export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

// cloudflare:workers is available in the Cloudflare runtime.
// In local dev (plain `astro dev`), we fall back to process.env.
let cfEnv: Record<string, string | undefined> = {};
try {
  const m = await import("cloudflare:workers");
  cfEnv = (m.env as Record<string, string | undefined>) ?? {};
} catch {
  // Not running under Cloudflare — use process.env
  cfEnv = process.env as Record<string, string | undefined>;
}

export const POST: APIRoute = async ({ request }) => {
  // Parse form data
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Honeypot check — bots fill hidden fields, humans don't
  const honeypot = data.get("_honeypot");
  if (honeypot && String(honeypot).trim() !== "") {
    // Silently succeed so bots don't know they were blocked
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const subject = String(data.get("subject") || "").trim();
  const message = String(data.get("message") || "").trim();

  // Validate required fields
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Read env vars — cloudflare:workers in production, process.env locally
  const apiKey = cfEnv["RESEND_API_KEY"] ?? "";
  const toEmail = cfEnv["CONTACT_TO_EMAIL"] ?? "";

  if (!apiKey || !toEmail) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars");
    return new Response(JSON.stringify({ ok: false, error: "server_config" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = new Resend(apiKey);

  const emailSubject = subject
    ? `[heyshaun.fr] ${subject}`
    : `[heyshaun.fr] New message from ${name}`;

  try {
    const { error } = await resend.emails.send({
      from: "heyshaun.fr <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #7c3aed; margin-bottom: 4px;">New contact form submission</h2>
          <p style="color: #888; font-size: 14px; margin-top: 0;">via heyshaun.fr</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 80px; color: #374151;">Name</td>
              <td style="padding: 8px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email</td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
            </tr>
            ${subject ? `<tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Subject</td>
              <td style="padding: 8px 0; color: #111827;">${subject}</td>
            </tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <h3 style="color: #374151; margin-bottom: 8px;">Message</h3>
          <p style="color: #111827; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return new Response(JSON.stringify({ ok: false, error: "send_failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return new Response(JSON.stringify({ ok: false, error: "send_failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
