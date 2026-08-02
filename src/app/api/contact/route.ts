import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > rateLimitMax;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later or call us directly." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, phone, email, service, address, message, consent, company } = body ?? {};

    // Honeypot: bots fill hidden fields, real users never do
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !phone || !email || !message || !consent) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailPattern.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO_EMAIL || siteConfig.email;
    const contactFrom = process.env.CONTACT_FROM_EMAIL || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Contact form is not configured: missing SMTP_HOST, SMTP_USER, or SMTP_PASS env vars.");
      return NextResponse.json(
        { error: "The contact form isn't fully configured yet. Please call us directly." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const fields: [string, string][] = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Service", service || "Not specified"],
      ["Address / Town", address || "Not specified"],
    ];

    const htmlRows = fields
      .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#475569;font-weight:600;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#0F172A;">${escapeHtml(String(value))}</td></tr>`)
      .join("");

    await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${contactFrom}>`,
      to: contactTo,
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color:#1E40AF;">New Quote Request</h2>
          <table cellpadding="0" cellspacing="0">${htmlRows}</table>
          <p style="margin-top:16px;color:#475569;font-weight:600;">Message</p>
          <p style="white-space:pre-wrap;color:#0F172A;border-left:3px solid #1E40AF;padding-left:12px;">${escapeHtml(String(message))}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your request. Please call us directly." },
      { status: 500 }
    );
  }
}
