import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import './PortfolioChatbot.css';

const QUICK_PROMPTS = [
  'What are you studying?',
  'What tech stack do you use?',
  'Tell me about this website',
];

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm Peejay's portfolio assistant. Ask me about his skills, studies, or this website.",
  excludeFromHistory: true,
};

const getConversationHistory = (messages) => {
  const history = messages
    .filter(
      (item) =>
        !item.excludeFromHistory && (item.role === 'user' || item.role === 'assistant')
    )
    .map(({ role, content }) => ({ role, content }));

  // Gemini history must contain complete user/model turns. A failed request can
  // leave an unmatched user message visible in the UI, so omit that last turn.
  if (history.at(-1)?.role === 'user') {
    history.pop();
  }

  return history.slice(-20);
};

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const requestRef = useRef(null);
  const messageIdRef = useRef(0);

  const nextMessageId = (role) => {
    messageIdRef.current += 1;
    return `${role}-${messageIdRef.current}`;
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => () => requestRef.current?.abort(), []);

  const sendMessage = async (rawMessage) => {
    const message = rawMessage.trim();
    if (!message || isLoading || requestRef.current) return;

    const userMessage = {
      id: nextMessageId('user'),
      role: 'user',
      content: message,
    };
    const history = getConversationHistory(messages);

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    requestRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 60_000);

    try {
      const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ message, history }),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || typeof data.reply !== 'string') {
        throw new Error(data.error || 'The assistant could not respond.');
      }

      setMessages((current) => [
        ...current,
        {
          id: nextMessageId('assistant'),
          role: 'assistant',
          content: data.reply,
        },
      ]);
    } catch (error) {
      const content =
        error.name === 'AbortError'
          ? 'That request took too long. Please try again.'
          : error.message || 'Something went wrong. Please try again.';

      setMessages((current) => [
        ...current.map((item) =>
          item.id === userMessage.id ? { ...item, excludeFromHistory: true } : item
        ),
        {
          id: nextMessageId('error'),
          role: 'assistant',
          content,
          isError: true,
          excludeFromHistory: true,
        },
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      requestRef.current = null;
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="portfolio-chatbot">
      {isOpen && (
        <section
          className="chatbot-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chatbot-title"
        >
          <header className="chatbot-header">
            <div className="chatbot-heading">
              <span className="chatbot-logo" aria-hidden="true">
                <Sparkles size={18} strokeWidth={2} />
              </span>
              <div>
                <h2 id="chatbot-title">Ask about Peejay</h2>
                <p><span aria-hidden="true" /> Portfolio AI assistant</p>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={19} />
            </button>
          </header>

          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((item) => (
              <div key={item.id} className={`chatbot-message-row ${item.role}`}>
                <span className="chatbot-avatar" aria-hidden="true">
                  {item.role === 'assistant' ? <Bot size={15} /> : <User size={15} />}
                </span>
                <p className={`chatbot-message ${item.isError ? 'error' : ''}`}>
                  {item.content}
                </p>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-message-row assistant" aria-label="Assistant is typing">
                <span className="chatbot-avatar" aria-hidden="true"><Bot size={15} /></span>
                <div className="chatbot-message chatbot-typing" aria-hidden="true">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="chatbot-prompts" aria-label="Suggested questions">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <div className="chatbot-input-wrap">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask a question..."
                aria-label="Message Peejay's portfolio assistant"
                rows={1}
                maxLength={2000}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                {isLoading ? <LoaderCircle className="chatbot-spinner" size={18} /> : <Send size={18} />}
              </button>
            </div>
            <p>AI responses may be imperfect.</p>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        className="chatbot-launcher"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={23} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default PortfolioChatbot;
