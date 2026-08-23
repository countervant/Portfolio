import { generatePortfolioReply } from '../services/chatService.js';

const MAX_MESSAGE_LENGTH = 2_000;
const MAX_HISTORY_ITEMS = 20;
const MAX_HISTORY_MESSAGE_LENGTH = 4_000;

const validationError = (message) => ({ error: message });

const formatHistory = (history) => {
  if (history === undefined) {
    return { history: [] };
  }

  if (!Array.isArray(history)) {
    return validationError('History must be an array.');
  }

  if (history.length > MAX_HISTORY_ITEMS) {
    return validationError(`History cannot contain more than ${MAX_HISTORY_ITEMS} messages.`);
  }

  if (history.length % 2 !== 0) {
    return validationError('History must contain complete user and assistant message pairs.');
  }

  const formatted = [];

  for (let index = 0; index < history.length; index += 1) {
    const item = history[index];
    const expectedRole = index % 2 === 0 ? 'user' : 'assistant';

    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return validationError(`History item ${index + 1} must be an object.`);
    }

    if (item.role !== expectedRole) {
      return validationError(
        'History must alternate between user and assistant messages, beginning with user.'
      );
    }

    if (typeof item.content !== 'string' || !item.content.trim()) {
      return validationError(`History item ${index + 1} must include non-empty content.`);
    }

    const content = item.content.trim();
    if (content.length > MAX_HISTORY_MESSAGE_LENGTH) {
      return validationError(
        `History item ${index + 1} cannot exceed ${MAX_HISTORY_MESSAGE_LENGTH} characters.`
      );
    }

    formatted.push({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: content }],
    });
  }

  return { history: formatted };
};

export const handleChat = async (req, res) => {
  const { message, history } = req.body ?? {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required and must be a non-empty string.' });
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  const formatted = formatHistory(history);
  if (formatted.error) {
    return res.status(400).json({ error: formatted.error });
  }

  try {
    const reply = await generatePortfolioReply({
      message: trimmedMessage,
      history: formatted.history,
    });

    return res.status(200).json({ reply });
  } catch (error) {
    if (error.code === 'MISSING_API_KEY') {
      console.warn('[ChatController] Gemini API key is not configured.');
      return res.status(503).json({
        error: 'The portfolio assistant is not configured yet. Please try again later.',
      });
    }

    const upstreamStatus = error.status ?? error.statusCode;
    if (upstreamStatus === 429) {
      console.warn('[ChatController] Gemini rate limit reached.');
      return res.status(429).json({
        error: 'The portfolio assistant is busy right now. Please try again in a moment.',
      });
    }

    console.error('[ChatController Error]', error);

    return res.status(502).json({
      error: 'The portfolio assistant could not respond. Please try again later.',
    });
  }
};
