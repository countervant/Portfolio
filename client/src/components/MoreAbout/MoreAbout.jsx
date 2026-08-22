import React, { useEffect } from 'react';
import { Cloud, Palette, Sparkles, Network, SquareTerminal, MapPin, Mail, Calendar, ArrowLeft } from 'lucide-react';
import profileImg from '../../assets/me.png';
import { personalInfo } from '../../data';
import './MoreAbout.css';

const MoreAbout = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="more-about-container">
      {/* Top Hero Section */}
      <section className="more-about-hero container">
        <div className="more-about-hero-grid">
          {/* Left: Text Content */}
          <div className="more-about-intro">
            <div className="more-about-label-wrapper">
              <span className="more-about-label">ABOUT ME</span>
              <div className="more-about-label-line"></div>
            </div>

            <h1 className="more-about-main-title">
              More About Me<span className="text-period">.</span>
            </h1>

            <div className="more-about-paragraphs">
              <p>
                I'm an aspiring Cloud Engineer focused on building reliable,
                secure, and scalable solutions using Amazon Web Services (AWS).
                I leverage AI to accelerate development, automate tasks,
                and solve real-world problems.
              </p>
              <p>
                I enjoy learning new technologies, designing clean solutions,
                and continuously improving to grow as a cloud professional.
              </p>
            </div>

            {onBack && (
              <button onClick={onBack} className="btn btn-outline back-home-btn">
                <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Home
              </button>
            )}
          </div>

          {/* Right: Portrait Image with Floating Card */}
          <div className="more-about-image-column">
            <div className="more-about-image-card">
              <img
                src={profileImg}
                alt={personalInfo.name}
                className="more-about-portrait"
              />
            </div>

            {/* Floating Info Badge */}
            <div className="more-about-info-badge">
              <div className="info-badge-item">
                <MapPin size={18} className="badge-icon" />
                <span>Philippines</span>
              </div>
              <div className="info-badge-item">
                <Mail size={18} className="badge-icon" />
                <span>{personalInfo.contact.email}</span>
              </div>
              <div className="info-badge-item">
                <Calendar size={18} className="badge-icon" />
                <span>Available for work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="more-about-section-divider"></div>
      </div>

      {/* Section: WHAT I DO */}
      <section className="more-about-section container">
        <div className="more-about-layout">
          {/* Header Column */}
          <div className="more-about-header-col">
            <div className="more-about-label-wrapper">
              <span className="more-about-label">WHAT I DO</span>
              <div className="more-about-label-line"></div>
            </div>
            <p className="more-about-section-lead">
              I build and improve applications with the help of AI, focusing on cloud, design, and continuous learning.
            </p>
          </div>

          {/* 3 Cards Column */}
          <div className="more-about-cards-col cards-3-col">
            {/* Card 1 */}
            <div className="more-about-card">
              <div className="card-icon-box">
                <Cloud size={24} strokeWidth={1.75} />
              </div>
              <h3 className="card-title">Cloud Infrastructure</h3>
              <p className="card-text">
                Building reliable and scalable infrastructure on AWS.
              </p>
            </div>

            {/* Card 2 */}
            <div className="more-about-card">
              <div className="card-icon-box">
                <Palette size={24} strokeWidth={1.75} />
              </div>
              <h3 className="card-title">Design & Creativity</h3>
              <p className="card-text">
                Designing e-commerce visuals for Meta ads with engaging, high-converting creatives.
              </p>
            </div>

            {/* Card 3 */}
            <div className="more-about-card">
              <div className="card-icon-box">
                <Sparkles size={24} strokeWidth={1.75} />
              </div>
              <h3 className="card-title">AI-Powered Development</h3>
              <p className="card-text">
                Leveraging AI tools to write code, debug, and speed up development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="more-about-section-divider"></div>
      </div>

      {/* Section: TOOLS & FOUNDATIONS */}
      <section className="more-about-section container" style={{ paddingBottom: '5rem' }}>
        <div className="more-about-layout">
          {/* Header Column */}
          <div className="more-about-header-col">
            <div className="more-about-label-wrapper">
              <span className="more-about-label">TOOLS & FOUNDATIONS</span>
              <div className="more-about-label-line"></div>
            </div>
            <p className="more-about-section-lead">
              Core tools and foundations I use in my development journey.
            </p>
          </div>

          {/* Cards Column */}
          <div className="more-about-cards-col cards-3-col">
            {/* Card 1 */}
            <div className="more-about-card">
              <div className="card-icon-box">
                <Network size={24} strokeWidth={1.75} />
              </div>
              <h3 className="card-title">Networking Foundation</h3>
              <p className="card-text">
                Understanding networking concepts to build secure and connected systems.
              </p>
            </div>

            {/* Card 2 */}
            <div className="more-about-card">
              <div className="card-icon-box">
                <SquareTerminal size={24} strokeWidth={1.75} />
              </div>
              <h3 className="card-title">Linux</h3>
              <p className="card-text">
                Using Linux as my main operating system and familiar with its commands.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoreAbout;
