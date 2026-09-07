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
          {certifications.map((cert) => (
            <div className="cert-row" key={cert.id}>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-meta">
                {cert.date && <span className="cert-date">{cert.date}</span>}
                <span className="cert-status">{cert.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
