import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const runtime = "nodejs"; // we need Node APIs, not Edge

// SMTP from env
const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;
const NOTIFY_TO = process.env.NOTIFY_TO!;
const NOTIFY_FROM = process.env.NOTIFY_FROM || SMTP_USER;
const MAX_ATTACHMENT_MB = Number(process.env.MAX_ATTACHMENT_MB || 20);

function missing(...vals: (string | undefined | null)[]) {
  return vals.some((v) => !v || v.trim() === "");
}

export async function POST(req: NextRequest) {
  try {
    // Parse multipart/form-data
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const title = String(form.get("title") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const branch = String(form.get("branch") || "")
      .trim()
      .toLowerCase();
    const semester = Number(form.get("semester") || 0);
    const category = String(form.get("category") || "")
      .trim()
      .toLowerCase();
    const tagsRaw = String(form.get("tags") || "").trim();
    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    if (!file || !title || !subject || !branch || !semester || !category) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }
    if (
      missing(
        SMTP_HOST,
        String(SMTP_PORT),
        SMTP_USER,
        SMTP_PASS,
        NOTIFY_TO,
        NOTIFY_FROM
      )
    ) {
      return NextResponse.json(
        { ok: false, error: "SMTP not configured" },
        { status: 500 }
      );
    }

    // Size guard (email providers usually cap at ~20–25 MB)
    const arrayBuffer = await file.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);
    const sizeMB = buf.length / (1024 * 1024);
    if (sizeMB > MAX_ATTACHMENT_MB) {
      return NextResponse.json(
        {
          ok: false,
          error: `Attachment too large (${sizeMB.toFixed(
            1
          )} MB). Limit ${MAX_ATTACHMENT_MB} MB.`,
        },
        { status: 400 }
      );
    }

    // File name / metadata
    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const filename = file.name || `${Date.now()}_${crypto.randomUUID()}.${ext}`;
    const mime = file.type || "application/octet-stream";

    // Send email
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // 465=SSL, 587=STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const lines = [
      `New upload received.`,
      `Title: ${title}`,
      `Subject: ${subject}`,
      `Branch: ${branch}`,
      `Semester: ${semester}`,
      `Category: ${category}`,
      `Tags: ${tags.join(", ") || "-"}`,
      `Size: ${sizeMB.toFixed(2)} MB`,
    ];

    await transporter.sendMail({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject: `Upload: ${title} (${subject} • ${branch} • Sem ${semester} • ${category})`,
      text: lines.join("\n"),
      attachments: [
        {
          filename,
          content: buf,
          contentType: mime,
          // encoding not needed when passing a Buffer
        },
      ],
    });

    return NextResponse.json({ ok: true, sent: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Email send failed" },
      { status: 500 }
    );
  }
}
