import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { escapeHtml } from '../middleware/validator.js';

/**
 * Builds the HTML content for the notification email.
 */
const buildHtmlTemplate = ({ name, email, subject, message, timestamp }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f1117; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #1a1f2c; border: 1px solid #2d3748; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);">
    <!-- Header -->
    <tr>
      <td style="padding: 28px 32px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-bottom: 1px solid #334155;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.05em; color: #ffffff; text-transform: uppercase;">
          New Portfolio Message
        </h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">
          Received on ${timestamp}
        </p>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 32px;">
        <!-- Sender Meta Table -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; padding: 16px;">
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #94a3b8; width: 80px; font-weight: 600;">From:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #f8fafc; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #94a3b8; font-weight: 600;">Email:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #38bdf8;">
              <a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #94a3b8; font-weight: 600;">Subject:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #f8fafc;">${safeSubject}</td>
          </tr>
        </table>

        <!-- Message Body -->
        <div style="margin-bottom: 28px;">
          <h2 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 600;">
            Message Content
          </h2>
          <div style="padding: 20px; background-color: #0f172a; border-left: 4px solid #38bdf8; border-radius: 6px; font-size: 15px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">
            ${safeMessage}
          </div>
        </div>

        <!-- Quick Reply CTA -->
        <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #334155;">
          <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 12px 28px; background-color: #38bdf8; color: #0f172a; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 6px; letter-spacing: 0.02em;">
            Reply to ${safeName} &rarr;
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 16px 32px; background-color: #0f172a; text-align: center; border-top: 1px solid #1e293b;">
        <p style="margin: 0; font-size: 12px; color: #64748b;">
          This message was sent via your portfolio contact form at ${process.env.CLIENT_URL || 'portfolio'}.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

/**
 * Builds the plain text fallback version of the email.
 */
const buildTextTemplate = ({ name, email, subject, message, timestamp }) => {
  return `
NEW PORTFOLIO MESSAGE
========================================
Received: ${timestamp}
From:     ${name}
Email:    ${email}
Subject:  ${subject}

MESSAGE:
----------------------------------------
${message}
----------------------------------------

Reply to sender: ${email}
  `.trim();
};

/**
 * Main Email Service
 */
export class EmailService {
  constructor() {
    this.provider = (process.env.EMAIL_PROVIDER || 'auto').toLowerCase();
    this.resendClient = null;
    this.nodemailerTransporter = null;

    this.initialize();
  }

  initialize() {
    // 1. Check Resend
    if (
      (this.provider === 'resend' || this.provider === 'auto') &&
      process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.includes('your_resend_api_key')
    ) {
      this.resendClient = new Resend(process.env.RESEND_API_KEY);
      this.activeProvider = 'resend';
      console.log('[EmailService] Initialized with Resend provider.');
      return;
    }

    // 2. Check Nodemailer / SMTP
    if (
      (this.provider === 'smtp' || this.provider === 'auto') &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      !process.env.SMTP_USER.includes('your_email')
    ) {
      const port = parseInt(process.env.SMTP_PORT || '587', 10);
      const secure = process.env.SMTP_SECURE === 'true' || port === 465;

      this.nodemailerTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      this.activeProvider = 'smtp';
      console.log(`[EmailService] Initialized with SMTP provider (${process.env.SMTP_HOST || 'smtp.gmail.com'}:${port}).`);
      return;
    }

    // 3. Fallback: Development / Mock mode
    this.activeProvider = 'mock';
    console.warn(
      '[EmailService] No live email credentials detected. Running in simulated MOCK mode (emails will be logged to console).'
    );
  }

  async sendContactEmail({ name, email, subject, message }) {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'medium',
    }) + ' (UTC)';

    const emailSubject = `[Portfolio Contact] ${subject} - from ${name}`;
    const toEmail = process.env.EMAIL_TO || 'davidpeejay@gmail.com';
    const htmlContent = buildHtmlTemplate({ name, email, subject, message, timestamp });
    const textContent = buildTextTemplate({ name, email, subject, message, timestamp });

    // Mode A: Resend
    if (this.activeProvider === 'resend' && this.resendClient) {
      const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';
      const { data, error } = await this.resendClient.emails.send({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: emailSubject,
        html: htmlContent,
        text: textContent,
      });

      if (error) {
        console.error('[Resend Error]', error);
        throw new Error(error.message || 'Failed to send email via Resend.');
      }

      return { provider: 'resend', id: data?.id };
    }

    // Mode B: Nodemailer / SMTP
    if (this.activeProvider === 'smtp' && this.nodemailerTransporter) {
      const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;
      const info = await this.nodemailerTransporter.sendMail({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: emailSubject,
        html: htmlContent,
        text: textContent,
      });

      return { provider: 'smtp', messageId: info.messageId };
    }

    // Mode C: Mock Mode (Local Development / Testing without API credentials)
    console.log('\n================== [MOCK EMAIL DISPATCHED] ==================');
    console.log(`To:        ${toEmail}`);
    console.log(`From:      ${name} <${email}>`);
    console.log(`Subject:   ${emailSubject}`);
    console.log('-------------------------------------------------------------');
    console.log(textContent);
    console.log('=============================================================\n');

    return {
      provider: 'mock',
      note: 'Message logged to server console (mock mode). Add RESEND_API_KEY or SMTP credentials in server/.env to send real emails.',
    };
  }
}

export const emailService = new EmailService();
