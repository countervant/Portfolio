import { Router } from 'express';
import { handleChat } from '../controllers/chatController.js';
import { chatLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/chat', chatLimiter, handleChat);

router.get('/chat', (req, res) => {
  res.status(405).json({
    error: 'Method Not Allowed. Send chat messages using POST.',
  });
});

export default router;

