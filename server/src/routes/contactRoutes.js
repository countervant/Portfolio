import { Router } from 'express';
import { handleContactSubmission } from '../controllers/contactController.js';
import { validateContactPayload } from '../middleware/validator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/contact - Endpoint for portfolio contact submissions
router.post('/contact', contactLimiter, validateContactPayload, handleContactSubmission);

// Guard against invalid GET requests to /api/contact
router.get('/contact', (req, res) => {
  res.status(405).json({
    success: false,
    error: 'Method Not Allowed. Please submit contact messages using POST.',
  });
});

export default router;
