import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

// Sends the quote request email to SITE.email. Two transports, chosen by which env vars are set:
//
//   Gmail SMTP  SMTP_USER + SMTP_PASS (a Gmail address and its App Password). Sends from that Gmail
//               account to SITE.email. No domain needed. Takes priority when both are configured.
//   Resend      RESEND_API_KEY (plain fetch, no SDK). Without a verified domain, Resend only delivers
//               to the address that owns the account, so that account must be registered under
//               SITE.email. QUOTE_FROM_EMAIL sets the sender once a domain is verified.
//
// QUOTE_TO_EMAIL overrides the recipient for testing. Leave it unset in production.
const RESEND_URL = "https://api.resend.com/emails";
const RESEND_DEFAULT_FROM = "onboarding@resend.dev";

export type Email = { subject: string; text: string; replyTo?: string };
export type SendResult = "sent" | "not_configured" | "failed";

// Failures are logged by code or status only: error messages can echo the customer's details.
const errorCode = (error: unknown) =>
  typeof error === "object" && error !== null && "code" in error ? String(error.code) : "unknown";

async function sendWithSmtp(user: string, pass: string, to: string, email: Email): Promise<SendResult> {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // Google shows the App Password in groups of four with spaces. Both forms work once stripped.
    auth: { user, pass: pass.replace(/\s+/g, "") },
    // Fail fast so a stalled connection cannot hold the request open until the function times out.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  try {
    await transport.sendMail({
      // Gmail sends as the authenticated account whatever the address says; the name is what shows.
      from: { name: `${SITE.shortName} website`, address: user },
      to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
    });
    return "sent";
  } catch (error) {
    console.error(`Quote request not sent: SMTP error ${errorCode(error)}.`);
    return "failed";
  } finally {
    transport.close();
  }
}

async function sendWithResend(apiKey: string, to: string, email: Email): Promise<SendResult> {
  let response: Response;
  try {
    response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL ?? RESEND_DEFAULT_FROM,
        to: [to],
        subject: email.subject,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
  } catch {
    console.error("Quote request not sent: could not reach Resend.");
    return "failed";
  }
  if (!response.ok) {
    console.error(`Quote request not sent: Resend responded ${response.status}.`);
    return "failed";
  }
  return "sent";
}

export async function sendQuoteEmail(email: Email): Promise<SendResult> {
  const to = process.env.QUOTE_TO_EMAIL ?? SITE.email;
  const { SMTP_USER, SMTP_PASS, RESEND_API_KEY } = process.env;

  if (SMTP_USER && SMTP_PASS) return sendWithSmtp(SMTP_USER, SMTP_PASS, to, email);
  if (RESEND_API_KEY) return sendWithResend(RESEND_API_KEY, to, email);

  console.error("Quote request not sent: set SMTP_USER and SMTP_PASS, or RESEND_API_KEY.");
  return "not_configured";
}
