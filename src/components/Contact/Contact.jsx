import React from 'react';
import { personalInfo } from '../../data';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section container reveal">
      <div className="divider" style={{ marginBottom: '4rem' }}></div>
      <div className="editorial-layout">
        <div className="section-header">
          <h2 className="section-title">GET IN TOUCH</h2>
          <div className="section-underline"></div>
          
          <div className="contact-info">
            <a href={`mailto:${personalInfo.contact.email}`} className="contact-info-item">
              <FiMail size={16} /> {personalInfo.contact.email}
            </a>
            <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="contact-info-item">
              <FiLinkedin size={16} /> linkedin.com/in/yourprofile
            </a>
            <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="contact-info-item">
              <FiGithub size={16} /> github.com/yourusername
            </a>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <input type="text" placeholder="Subject" required className="full-width" />
            <textarea placeholder="Message" rows="5" required className="full-width"></textarea>
            <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
