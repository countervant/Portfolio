import React from 'react';
import { certifications } from '../../data';
import './Certifications.css';

const Certifications = () => {
  return (
    <section id="certifications" className="section container reveal">
      <div className="divider" style={{ marginBottom: '4rem' }}></div>
      <div className="editorial-layout">
        <div className="section-header">
          <h2 className="section-title">CERTIFICATIONS</h2>
          <div className="section-underline"></div>
        </div>
        
        <div className="cert-list">
          {certifications.map((cert, index) => (
            <div className="cert-row" key={index}>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-status">{cert.status}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
