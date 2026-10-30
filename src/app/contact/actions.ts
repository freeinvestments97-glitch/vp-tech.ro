"use server";

import nodemailer from "nodemailer";

// Contact requests are emailed to CONTACT_TO through Google Workspace SMTP
// (SMTP_USER + an app password in SMTP_PASSWORD). app.vp-tech.ro picks them
// up from that mailbox. On Firebase these come from apphosting.yaml.

export type ContactState = { status: "idle" | "sent" | "error"; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 3000; // faster than this is almost certainly a bot

const field = (data: FormData, name: string, max = 200) =>
  String(data.get(name) ?? "")
    .replace(/[\r\n]+/g, name === "details" ? "\n" : " ")
    .trim()
    .slice(0, max);

export async function sendContactRequest(
  _prev: ContactState,
  data: FormData,
): Promise<ContactState> {
  const ro = data.get("locale") === "ro";

  // Honeypot and timing checks: pretend success so bots learn nothing.
  const startedAt = Number(data.get("startedAt") ?? 0);
  if (field(data, "website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "sent" };
  }

  const request = {
    name: field(data, "name", 120),
    email: field(data, "email", 160),
    phone: field(data, "phone", 40),
    company: field(data, "company", 160),
    service: field(data, "service", 160),
    category: field(data, "category", 120),
    timeline: field(data, "timeline", 80),
    contactMethod: field(data, "contactMethod", 80),
    details: field(data, "details", 5000),
  };

  if (!request.name || !EMAIL_RE.test(request.email) || request.details.length < 10) {
    return {
      status: "error",
      message: ro
        ? "Completează numele, un email valid și câteva detalii despre ce ai nevoie."
        : "Please add your name, a valid email and a few details about what you need.",
    };
  }

  const { CONTACT_TO, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!CONTACT_TO || !SMTP_USER || !SMTP_PASSWORD) {
    console.error("contact form: CONTACT_TO / SMTP_USER / SMTP_PASSWORD are not set");
    return {
      status: "error",
      message: ro
        ? "Formularul nu este disponibil momentan. Te rugăm să încerci din nou mai târziu."
        : "The form is unavailable right now. Please try again later.",
    };
  }

  const lines: Array<[string, string]> = [
    ["Name", request.name],
    ["Email", request.email],
    ["Phone", request.phone],
    ["Company", request.company],
    ["Requested service", request.service],
    ["Service area", request.category],
    ["Timeline", request.timeline],
    ["Preferred contact", request.contactMethod],
    ["Language", ro ? "Romanian" : "English"],
  ];
  const text = [
    ...lines.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    "",
    "Details:",
    request.details,
    "",
    "— Sent from the contact form on vp-tech.ro",
  ].join("\n");

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
    await transport.sendMail({
      from: { name: "VP TECHNOLOGIES website", address: SMTP_USER },
      to: CONTACT_TO,
      replyTo: { name: request.name, address: request.email },
      subject: `Website request: ${request.service || request.category || "General"} — ${request.name}`,
      text,
    });
  } catch (error) {
    console.error("contact form: sending failed", error);
    return {
      status: "error",
      message: ro
        ? "Nu am putut trimite solicitarea. Te rugăm să încerci din nou."
        : "We couldn’t send your request. Please try again.",
    };
  }

  return { status: "sent" };
}
