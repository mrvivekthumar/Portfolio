// app/api/contact/route.ts - Fixed Duplicate Prevention
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/sanitize';
import { validateContactForm } from '@/lib/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per minute
});

// 👈 FIXED: Track recent submissions to prevent duplicates
const recentSubmissions = new Map<string, number>();

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  try {
    // Parse and validate request body first
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { timestamp, clientId, name, email, message } = body;

    // 👈 FIXED: Create unique submission identifier
    const submissionKey = `${clientIP}-${email}-${timestamp}`;
    const contentHash = `${name}-${email}-${message?.substring(0, 50)}`;

    // Check for recent duplicate submissions (within 5 minutes)
    const now = Date.now();
    const recentSubmission = recentSubmissions.get(submissionKey) || recentSubmissions.get(contentHash);

    if (recentSubmission && (now - recentSubmission) < 300000) { // 5 minutes
      console.log('[DUPLICATE_BLOCKED]', {
        submissionKey,
        contentHash,
        timeSince: now - recentSubmission,
        clientIP
      });

      // Return success to prevent spam attempts, but don't send email
      return NextResponse.json(
        { message: 'Thank you! Your message has been received.' },
        { status: 200 }
      );
    }

    // Rate limiting
    try {
      await limiter.check(5, clientIP); // 5 requests per minute per IP
    } catch {
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait a moment before submitting again.',
          retryAfter: 60
        },
        { status: 429 }
      );
    }

    // CORS check
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL,
      'https://vivekthumar.com',
      'https://www.vivekthumar.com',
      'http://localhost:3000',
      'http://localhost:3001'
    ].filter(Boolean);

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Forbidden origin' },
        { status: 403 }
      );
    }

    // Extract and sanitize form data
    const formData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message),
      services: body.services ? sanitizeInput(body.services) : null,
    };

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Honeypot check (add this field to your form but hide it with CSS)
    if (body.website) {
      // This is likely a bot - log but pretend success
      console.log('[BOT_DETECTED]', { clientIP, website: body.website });
      return NextResponse.json(
        { message: 'Thank you for your message!' }, // Fake success
        { status: 200 }
      );
    }

    // 👈 FIXED: Record this submission to prevent duplicates
    recentSubmissions.set(submissionKey, now);
    recentSubmissions.set(contentHash, now);

    // Clean up old submissions (keep only last 1000 entries)
    if (recentSubmissions.size > 1000) {
      const entries = Array.from(recentSubmissions.entries());
      const sortedEntries = entries.sort(([, a], [, b]) => b - a);

      recentSubmissions.clear();
      sortedEntries.slice(0, 500).forEach(([key, value]) => {
        recentSubmissions.set(key, value);
      });
    }

    // Create unique email ID for tracking
    const emailTrackingId = `contact_${timestamp}_${clientId}`;

    console.log('[EMAIL_SENDING]', {
      trackingId: emailTrackingId,
      from: formData.name,
      email: formData.email,
      subject: formData.subject,
      timestamp: new Date().toISOString()
    });

    // Prepare email content
    const emailContent = {
      from: 'Vivek Portfolio <onboarding@resend.dev>',
      to: ['mrvivekthumar@gmail.com'],
      replyTo: formData.email,
      subject: `🚀 Portfolio Contact: ${formData.subject}`,
      headers: {
        'X-Contact-Form': 'true',
        'X-Tracking-ID': emailTrackingId,
        'X-Client-IP': clientIP,
      },
      html: generateEmailHTML(formData, emailTrackingId),
      text: generateEmailText(formData),
    };

    // Send email
    const { data, error } = await resend.emails.send(emailContent);

    if (error) {
      // Log error for monitoring
      console.error('[CONTACT_API_ERROR]', {
        timestamp: new Date().toISOString(),
        error,
        clientIP,
        trackingId: emailTrackingId,
        formData: { ...formData, message: '[REDACTED]' },
      });

      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    // Log successful submission
    console.log('[CONTACT_SUCCESS]', {
      timestamp: new Date().toISOString(),
      emailId: data?.id,
      trackingId: emailTrackingId,
      clientIP,
      processingTime: Date.now() - startTime,
      services: formData.services,
    });

    // Return success response
    return NextResponse.json(
      {
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.',
        id: data?.id,
        trackingId: emailTrackingId,
      },
      {
        status: 200,
        headers: {
          'X-Response-Time': `${Date.now() - startTime}ms`,
        }
      }
    );

  } catch (error) {
    // Log unexpected errors
    console.error('[CONTACT_API_FATAL_ERROR]', {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      clientIP,
      processingTime: Date.now() - startTime,
    });

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Generate beautiful HTML email
function generateEmailHTML(formData: any, trackingId: string): string {
  const { name, email, subject, message, services } = formData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Portfolio Contact</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
                  <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">
                    🚀 New Portfolio Contact
                  </h1>
                  <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                    Someone reached out through your portfolio
                  </p>
                </td>
              </tr>

              <!-- Contact Information -->
              <tr>
                <td style="padding: 30px;">
                  <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #667eea; margin-bottom: 25px;">
                    <h2 style="margin: 0 0 20px 0; color: #333; font-size: 20px; font-weight: 600;">
                      📋 Contact Information
                    </h2>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555; width: 100px; vertical-align: top;">Name:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 16px;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555; vertical-align: top;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 500;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555; vertical-align: top;">Subject:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: 500;">${subject}</td>
                      </tr>
                      ${services ? `
                      <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555; vertical-align: top;">Services:</td>
                        <td style="padding: 8px 0; color: #333; font-size: 16px;">${services}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </div>

                  <!-- Message -->
                  <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 25px;">
                    <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px; font-weight: 600;">
                      💬 Message
                    </h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #28a745;">
                      <p style="margin: 0; color: #555; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                  </div>

                  <!-- Quick Actions -->
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                    <h3 style="margin: 0 0 15px 0; color: white; font-size: 18px; font-weight: 600;">
                      ⚡ Quick Actions
                    </h3>
                    <div style="margin: 15px 0;">
                      <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 0 5px; backdrop-filter: blur(10px);">
                        📧 Reply via Email
                      </a>
                      <a href="mailto:${email}" style="display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 0 5px; backdrop-filter: blur(10px);">
                        💼 Start Conversation
                      </a>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #f8f9fa; padding: 20px 30px; border-radius: 0 0 12px 12px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                    📅 Received on ${new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
  })} (IST)
                  </p>
                  <p style="margin: 0; color: #999; font-size: 12px;">
                    Tracking ID: ${trackingId} | Sent from Vivek Thumar's Portfolio
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Generate plain text email for better deliverability
function generateEmailText(formData: any): string {
  const { name, email, subject, message, services } = formData;

  return `
New Portfolio Contact Form Submission

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Subject: ${subject}
${services ? `Services: ${services}` : ''}

MESSAGE:
${message}

---
Received: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
Sent from Vivek Thumar's Portfolio Contact Form

To reply, simply respond to this email.
  `.trim();
}