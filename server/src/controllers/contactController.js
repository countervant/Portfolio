import { emailService } from '../services/emailService.js';

/**
 * Handles incoming contact form submissions.
 */
export const handleContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.sanitizedBody;

    const result = await emailService.sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      ...(result.note ? { note: result.note } : {}),
    });
  } catch (error) {
    console.error('[ContactController Error]', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'An unexpected error occurred while sending your message. Please try again later.',
    });
  }
};
