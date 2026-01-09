import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Env } from "@/config/env";

const resend = new Resend(Env.RESEND_API_KEY);

/**
 * Creates an HTML email template for contact form notifications
 */
function createEmailTemplate(name: string, email: string, subject: string, message: string): string {
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef; border-top: none;">
          <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="margin-top: 0; color: #667eea; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              ${subject}
            </h2>
          </div>

          <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 15px 0;">
              <strong style="color: #667eea;">From:</strong><br>
              <span style="color: #333;">${name}</span><br>
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
            </p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <strong style="color: #667eea; display: block; margin-bottom: 10px;">Message:</strong>
            <div style="color: #333; white-space: pre-wrap; line-height: 1.8;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; text-align: center; color: #6c757d; font-size: 12px;">
            <p style="margin: 0;">Received on ${timestamp}</p>
            <p style="margin: 5px 0 0 0;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Check if Resend API key is configured
    if (!Env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Email service is not configured. Please contact the administrator." }, { status: 500 });
    }

    // Get recipient email from environment or use default
    const recipientEmail = Env.CONTACT_FORM_RECIPIENT_EMAIL || "me@naeemnh.com";
    const senderEmail = Env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // Send email notification
    const emailResult = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: email, // Set reply-to to user's email for easy replies
      subject: `Contact Form: ${subject}`,
      html: createEmailTemplate(name, email, subject, message),
    });

    // Check if email was sent successfully
    if (emailResult.error) {
      console.error("Resend API error:", emailResult.error);
      return NextResponse.json({ error: "Failed to send email notification" }, { status: 500 });
    }

    console.log("Contact form submission sent successfully:", { name, email, subject, id: emailResult.data?.id });

    return NextResponse.json({ message: "Message received successfully" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
