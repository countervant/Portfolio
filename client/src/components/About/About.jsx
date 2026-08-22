import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section container reveal">
      <div className="divider" style={{ marginBottom: '4rem' }}></div>
      <div className="editorial-layout">
        <div className="section-header">
          <h2 className="section-title">ABOUT ME</h2>
          <div className="section-underline"></div>
        </div>
        
        <div className="about-content">
          <p>
            I'm an aspiring Cloud Engineer with a strong interest in Amazon Web Services (AWS) 
            and modern cloud technologies. I enjoy learning how cloud infrastructure, networking, 
            security, automation, and DevOps work together to build reliable applications and systems.
          </p>
          <p>
            I'm continuously developing my skills through hands-on projects, labs, and real-world practice.
          </p>
          <button className="btn btn-outline" style={{ marginTop: '1.5rem' }}>More About Me</button>
        </div>
      </div>
    </section>
  );
};

export default About;
