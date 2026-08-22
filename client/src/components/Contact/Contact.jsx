import React, { useState } from 'react';
import { personalInfo } from '../../data';
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiX,
} from 'react-icons/fi';
import './Contact.css';

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
  _gotcha: '', // Honeypot field for bot spam prevention
};

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedback, setFeedback] = useState({ type: null, message: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please enter a subject.';
    } else if (formData.subject.trim().length < 2) {
      errors.subject = 'Subject must be at least 2 characters.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please write your message.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Dismiss feedback when user resumes typing
    if (feedback.type) {
      setFeedback({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('loading');
    setFeedback({ type: null, message: '' });

    try {
      const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.error ||
            data.message ||
            `Submission failed (${response.status}: ${response.statusText || 'Server error'}).`
        );
      }

      setStatus('success');
      setFeedback({
        type: 'success',
        message: data.message || 'Thank you! Your message has been sent successfully.',
      });
      setFormData(INITIAL_FORM_STATE);
      setFieldErrors({});
    } catch (err) {
      console.error('[Contact Form Error]', err);
      setStatus('error');
      setFeedback({
        type: 'error',
        message:
          err.message ||
          'Failed to send message. Please check your connection or email me directly.',
      });
    }
  };

  return (
    <section id="contact" className="section container reveal">
      <div className="divider" style={{ marginBottom: '4rem' }}></div>
      <div className="editorial-layout">
        <div className="section-header">
          <h2 className="section-title">GET IN TOUCH</h2>
          <div className="section-underline"></div>

          <div className="contact-info">
            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="contact-info-item"
              aria-label={`Email ${personalInfo.contact.email}`}
            >
              <FiMail size={16} /> {personalInfo.contact.email}
            </a>
            <a
              href={
                personalInfo.contact.linkedin.startsWith('http')
                  ? personalInfo.contact.linkedin
                  : `https://${personalInfo.contact.linkedin}`
              }
              target="_blank"
              rel="noreferrer"
              className="contact-info-item"
              aria-label="LinkedIn profile"
            >
              <FiLinkedin size={16} />{' '}
              {personalInfo.contact.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
            <a
              href={
                personalInfo.contact.github.startsWith('http')
                  ? personalInfo.contact.github
                  : `https://${personalInfo.contact.github}`
              }
              target="_blank"
              rel="noreferrer"
              className="contact-info-item"
              aria-label="GitHub profile"
            >
              <FiGithub size={16} />{' '}
              {personalInfo.contact.github.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        </div>

        <div className="contact-form-container">
          {feedback.message && (
            <div
              className={`contact-alert contact-alert-${feedback.type}`}
              role="alert"
              aria-live="polite"
            >
              <div className="alert-icon">
                {feedback.type === 'success' ? (
                  <FiCheckCircle size={20} />
                ) : (
                  <FiAlertCircle size={20} />
                )}
              </div>
              <div className="alert-content">
                <p className="alert-text">{feedback.message}</p>
              </div>
              <button
                type="button"
                className="alert-close-btn"
                onClick={() => setFeedback({ type: null, message: '' })}
                aria-label="Close notification"
              >
                <FiX size={16} />
              </button>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot field (hidden from human visitors, traps spam bots) */}
            <div className="honeypot-field" aria-hidden="true">
              <label htmlFor="website_hp">Leave this empty</label>
              <input
                id="website_hp"
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className={fieldErrors.name ? 'input-error' : ''}
                  aria-invalid={!!fieldErrors.name}
                  required
                />
                {fieldErrors.name && (
                  <span className="field-error-text">{fieldErrors.name}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className={fieldErrors.email ? 'input-error' : ''}
                  aria-invalid={!!fieldErrors.email}
                  required
                />
                {fieldErrors.email && (
                  <span className="field-error-text">{fieldErrors.email}</span>
                )}
              </div>
            </div>

            <div className="input-group full-width">
              <input
                type="text"
                name="subject"
                id="contact-subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={status === 'loading'}
                className={fieldErrors.subject ? 'input-error' : ''}
                aria-invalid={!!fieldErrors.subject}
                required
              />
              {fieldErrors.subject && (
                <span className="field-error-text">{fieldErrors.subject}</span>
              )}
            </div>

            <div className="input-group full-width">
              <textarea
                name="message"
                id="contact-message"
                placeholder="Your Message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                className={fieldErrors.message ? 'input-error' : ''}
                aria-invalid={!!fieldErrors.message}
                required
              ></textarea>
              {fieldErrors.message && (
                <span className="field-error-text">{fieldErrors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary submit-btn ${status === 'loading' ? 'btn-loading' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <FiLoader className="btn-spinner" size={16} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <FiSend size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
