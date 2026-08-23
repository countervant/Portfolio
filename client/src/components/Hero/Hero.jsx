import { personalInfo } from '../../data';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

const profileSrc = '/images/profile-800.v1.webp';
const profileSrcSet = [
  '/images/profile-400.v1.webp 400w',
  '/images/profile-800.v1.webp 800w',
].join(', ');

const Hero = () => {
  return (
    <section id="home" className="section hero container">
      <div className="hero-content">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-title">
          {personalInfo.name}<span className="text-period">.</span>
        </h1>
        <h2 className="hero-subtitle">
          {personalInfo.role}
        </h2>
        <div className="hero-underline"></div>
        <p className="hero-intro">
          I'm an aspiring Cloud Engineer focused on AWS Cloud, cloud infrastructure, and building reliable, scalable, and secure cloud solutions.
          while also being a graphic designer
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-outline">Contact Me</a>
        </div>

        <div className="hero-socials">
          <a
            href={
              personalInfo.contact.github.startsWith('http')
                ? personalInfo.contact.github
                : `https://${personalInfo.contact.github}`
            }
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={
              personalInfo.contact.linkedin.startsWith('http')
                ? personalInfo.contact.linkedin
                : `https://${personalInfo.contact.linkedin}`
            }
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a href={`mailto:${personalInfo.contact.email}`} aria-label="Email">
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>

      <div className="hero-image-wrapper">
        <div className="decorative-dots" aria-hidden="true"></div>
        <div className="hero-image-frame">
          <img
            className="hero-profile-image"
            src={profileSrc}
            srcSet={profileSrcSet}
            sizes="(max-width: 992px) 220px, 400px"
            width="800"
            height="836"
            alt={`${personalInfo.name}, aspiring cloud engineer`}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="accent-dot" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default Hero;
