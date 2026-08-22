import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for contact form submissions.
 * Prevents spam abuse by limiting requests per IP address.
 * Defaults to 5 requests per 15 minutes window.
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact requests per windowMs
  standardHeaders: true, // Return standard rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'Too many contact requests from this IP address. Please try again in 15 minutes.',
  },
  statusCode: 429,
  skipSuccessfulRequests: false,
});

/**
 * General API rate limiter.
 * Allows 100 requests per 15 minutes window for standard endpoints (e.g. health checks).
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
  statusCode: 429,
});
