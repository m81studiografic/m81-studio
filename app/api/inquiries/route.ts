import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

type ProjectPayload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  projectType?: string;
  projectStage?: string;
  description?: string;
  budget?: string;
  timeline?: string;
};

type InquiryBody =
  | { type?: "contact"; payload?: ContactPayload }
  | { type?: "project"; payload?: ProjectPayload };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function row(label: string, value?: string) {
  if (!value?.trim()) return "";

  return `
    <tr>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildContactEmail(payload: ContactPayload) {
  const subject = `Formular contact nou: ${payload.name ?? "Fara nume"}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h2 style="margin:0 0 16px;">Cerere noua din formularul de contact</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        ${row("Nume", payload.name)}
        ${row("Email", payload.email)}
        ${row("Tip proiect", payload.projectType)}
        ${row("Buget", payload.budget)}
        ${row("Mesaj", payload.message)}
      </table>
    </div>
  `;

  const text = [
    "Cerere noua din formularul de contact",
    `Nume: ${payload.name ?? "-"}`,
    `Email: ${payload.email ?? "-"}`,
    `Tip proiect: ${payload.projectType ?? "-"}`,
    `Buget: ${payload.budget ?? "-"}`,
    `Mesaj: ${payload.message ?? "-"}`,
  ].join("\n");

  return { subject, html, text };
}

function buildProjectEmail(payload: ProjectPayload) {
  const subject = `Brief nou proiect: ${payload.name ?? "Fara nume"}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h2 style="margin:0 0 16px;">Cerere noua din formularul Incepe un proiect</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        ${row("Nume", payload.name)}
        ${row("Email", payload.email)}
        ${row("Companie", payload.company)}
        ${row("Website", payload.website)}
        ${row("Tip proiect", payload.projectType)}
        ${row("Etapa proiectului", payload.projectStage)}
        ${row("Descriere", payload.description)}
        ${row("Buget", payload.budget)}
        ${row("Timeline", payload.timeline)}
      </table>
    </div>
  `;

  const text = [
    "Cerere noua din formularul Incepe un proiect",
    `Nume: ${payload.name ?? "-"}`,
    `Email: ${payload.email ?? "-"}`,
    `Companie: ${payload.company ?? "-"}`,
    `Website: ${payload.website ?? "-"}`,
    `Tip proiect: ${payload.projectType ?? "-"}`,
    `Etapa proiectului: ${payload.projectStage ?? "-"}`,
    `Descriere: ${payload.description ?? "-"}`,
    `Buget: ${payload.budget ?? "-"}`,
    `Timeline: ${payload.timeline ?? "-"}`,
  ].join("\n");

  return { subject, html, text };
}

function buildAutoReply(name: string | undefined, kind: "contact" | "project") {
  const firstName = (name ?? "").trim().split(/\s+/)[0];
  const greeting = firstName ? `Salut, ${escapeHtml(firstName)},` : "Salut,";

  const subject =
    kind === "project"
      ? "Solicitare primită — M81 Studio"
      : "Mesaj primit — M81 Studio";

  const bodyParagraphs =
    kind === "project"
      ? [
          "Mulțumim că ne-ai trimis proiectul tău. Am primit informațiile și revenim curând cu următorii pași sau câteva întrebări pentru a înțelege mai bine contextul.",
        ]
      : [
          "Mulțumim că ne-ai scris. Am primit mesajul tău și revenim în maximum 24 de ore.",
        ];

  const paragraphsHtml = bodyParagraphs
    .map(
      (p) =>
        `<p style="font-size:15px;line-height:1.7;color:#0d0d0b;margin:0 0 18px;">${escapeHtml(p)}</p>`,
    )
    .join("");

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;padding:32px 24px;color:#0d0d0b;">
      <div style="max-width:560px;margin:0 auto;">
        <p style="font-size:15px;line-height:1.7;color:#0d0d0b;margin:0 0 18px;">${greeting}</p>
        ${paragraphsHtml}
        <p style="font-size:15px;line-height:1.7;color:#0d0d0b;margin:0;">— M81 Studio</p>
      </div>
    </div>
  `;

  const greetingText = firstName ? `Salut, ${firstName},` : "Salut,";
  const text = [greetingText, "", ...bodyParagraphs, "", "— M81 Studio"].join("\n");

  return { subject, html, text };
}

async function sendEmail(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  return fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      reply_to: params.replyTo,
    }),
  });
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !from || !to) {
    return NextResponse.json(
      { error: "Missing email configuration." },
      { status: 500 },
    );
  }

  let body: InquiryBody;

  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body?.type || !body?.payload) {
    return NextResponse.json({ error: "Missing inquiry data." }, { status: 400 });
  }

  const { type, payload } = body;

  const notificationEmail =
    type === "project"
      ? buildProjectEmail(payload as ProjectPayload)
      : buildContactEmail(payload as ContactPayload);

  const senderEmail =
    typeof payload.email === "string" && payload.email.trim()
      ? payload.email.trim()
      : undefined;

  // 1) Notification email to studio
  const notificationResponse = await sendEmail({
    apiKey: resendApiKey,
    from,
    to,
    subject: notificationEmail.subject,
    html: notificationEmail.html,
    text: notificationEmail.text,
    replyTo: senderEmail,
  });

  if (!notificationResponse.ok) {
    const errorText = await notificationResponse.text();
    return NextResponse.json(
      { error: "Failed to send notification email.", details: errorText },
      { status: 502 },
    );
  }

  // 2) Auto-reply confirmation to sender (best-effort, doesn't fail the request)
  if (senderEmail) {
    const autoReply = buildAutoReply(payload.name, type === "project" ? "project" : "contact");
    try {
      const replyResponse = await sendEmail({
        apiKey: resendApiKey,
        from,
        to: senderEmail,
        subject: autoReply.subject,
        html: autoReply.html,
        text: autoReply.text,
        replyTo: to,
      });

      if (!replyResponse.ok) {
        console.error("Auto-reply failed:", await replyResponse.text());
      }
    } catch (err) {
      console.error("Auto-reply error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
