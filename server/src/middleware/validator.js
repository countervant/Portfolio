/**
 * RFC 5322 compliant email regex pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Escapes special HTML characters to prevent XSS/injection in email clients
 */
export const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Strips dangerous control characters except standard whitespace / newlines
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  // Remove null bytes and ASCII control characters except \t, \n, \r
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
};

/**
 * Middleware to validate and sanitize contact form payloads.
 * Includes honeypot detection for automated bot prevention.
 */
export const validateContactPayload = (req, res, next) => {
  const { _gotcha, honeypot, website, url } = req.body;

  // 1. Honeypot check: If bot filled out any hidden honeypot trap field, return 200 silently
  const botTrap = _gotcha || honeypot || website || url;
  if (botTrap && typeof botTrap === 'string' && botTrap.trim().length > 0) {
    console.warn('[Honeypot Triggered] Blocked automated bot submission.');
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  }

  let { name, email, subject, message } = req.body;

  // 2. Type validation
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    return res.status(400).json({
      success: false,
      error: 'Invalid payload. All fields (name, email, subject, message) must be strings.',
    });
  }

  // 3. Sanitize inputs
  name = sanitizeString(name);
  email = sanitizeString(email).toLowerCase();
  subject = sanitizeString(subject);
  message = sanitizeString(message);

  const errors = [];

  // 4. Validate Name
  if (!name || name.length < 2) {
    errors.push('Name must be at least 2 characters long.');
  } else if (name.length > 100) {
    errors.push('Name must not exceed 100 characters.');
  }

  // 5. Validate Email
  if (!email) {
    errors.push('Email is required.');
  } else if (email.length > 254) {
    errors.push('Email must not exceed 254 characters.');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address.');
  }

  // 6. Validate Subject
  if (!subject || subject.length < 2) {
    errors.push('Subject must be at least 2 characters long.');
  } else if (subject.length > 200) {
    errors.push('Subject must not exceed 200 characters.');
  }

  // 7. Validate Message
  if (!message || message.length < 5) {
    errors.push('Message must be at least 5 characters long.');
  } else if (message.length > 5000) {
    errors.push('Message must not exceed 5,000 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors[0], // Return the primary validation error
      errors,
    });
  }

  // Attach sanitized fields to req.sanitizedBody
  req.sanitizedBody = {
    name,
    email,
    subject,
    message,
  };

  next();
};
