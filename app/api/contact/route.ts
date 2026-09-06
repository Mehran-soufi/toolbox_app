import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 5000;

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const name =
            typeof body.name === "string" ? body.name.trim() : "";

        const email =
            typeof body.email === "string" ? body.email.trim() : "";

        const subject =
            typeof body.subject === "string" ? body.subject.trim() : "";

        const message =
            typeof body.message === "string" ? body.message.trim() : "";

        const website =
            typeof body.website === "string" ? body.website.trim() : "";
        if (website) {
            return NextResponse.json(
                { success: true },
                { status: 200 },
            );
        }

        // Required fields
        if (!email || !message) {
            return NextResponse.json(
                { error: "لطفاً ایمیل و پیام خود را وارد کنید." },
                { status: 400 },
            );
        }

        // Length validation
        if (name.length > MAX_NAME_LENGTH) {
            return NextResponse.json(
                { error: "نام واردشده بیش از حد طولانی است." },
                { status: 400 },
            );
        }

        if (email.length > MAX_EMAIL_LENGTH) {
            return NextResponse.json(
                { error: "ایمیل واردشده بیش از حد طولانی است." },
                { status: 400 },
            );
        }

        if (subject.length > MAX_SUBJECT_LENGTH) {
            return NextResponse.json(
                { error: "موضوع پیام بیش از حد طولانی است." },
                { status: 400 },
            );
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json(
                { error: "متن پیام بیش از حد طولانی است." },
                { status: 400 },
            );
        }

        // Email validation
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "لطفاً یک ایمیل معتبر وارد کنید." },
                { status: 400 },
            );
        }

        // Escape user input before inserting into HTML
        const safeName = escapeHtml(name || "وارد نشده");
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject || "بدون موضوع");
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

        const { error } = await resend.emails.send({
            from: "Toolbox <onboarding@resend.dev>",
            to: ["mehransoufi33@gmail.com"],
            subject: subject || "پیام جدید از جعبه ابزار",
            replyTo: email,
            html: `
        <div dir="rtl" style="font-family: sans-serif; line-height: 1.8;">
          <h2>پیام جدید از جعبه ابزار</h2>

          <p>
            <strong>نام:</strong>
            ${safeName}
          </p>

          <p>
            <strong>ایمیل:</strong>
            ${safeEmail}
          </p>

          <p>
            <strong>موضوع:</strong>
            ${safeSubject}
          </p>

          <hr />

          <p><strong>پیام:</strong></p>

          <p>
            ${safeMessage}
          </p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);

            return NextResponse.json(
                { error: "ارسال پیام با مشکل مواجه شد." },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { success: true },
            { status: 200 },
        );
    } catch (error) {
        console.error("Contact API error:", error);

        return NextResponse.json(
            { error: "خطایی در ارسال پیام رخ داد." },
            { status: 500 },
        );
    }
}
