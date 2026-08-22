import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './Navbar.css';

const Navbar = ({ currentView = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CERTIFICATIONS', href: '#certifications' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (e, link) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      e.preventDefault();
      if (link.name === 'ABOUT') {
        if (currentView === 'more-about') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          onNavigate('home', '#about');
        }
      } else {
        onNavigate('home', link.href);
      }
    }
  };

  const handleLogoClick = (e) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate('home', '#home');
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar container">
        <div className="navbar-logo">
          <a href="#home" onClick={handleLogoClick}>
            <img src={logoImg} alt="Peejay David Logo" className="logo-img" />
          </a>
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
