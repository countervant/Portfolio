import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer container">
      <div className="footer-content">
        <p className="copyright">© 2026 Peejay David. All rights reserved.</p>
        <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
          &uarr;
        </button>
      </div>
    </footer>
  );
};

export default Footer;
