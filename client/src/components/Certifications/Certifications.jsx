import { certifications } from '../../data';
import { FiAward, FiExternalLink } from 'react-icons/fi';
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
        
        <div className="cert-grid">
          {certifications.map((cert) => {
            const isAchieved = cert.status === 'achieved';

            return (
              <div
                className={`cert-card ${isAchieved ? 'cert-card-achieved' : 'cert-card-future'}`}
                key={cert.id}
              >
                <div className="cert-badge-wrapper">
                  {cert.badge ? (
                    cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-badge-link"
                        aria-label={`Verify ${cert.name} on Credly`}
                      >
                        <img
                          src={cert.badge}
                          alt={`${cert.name} Badge`}
                          className="cert-badge-img"
                          width="110"
                          height="110"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <img
                        src={cert.badge}
                        alt={`${cert.name} Badge`}
                        className="cert-badge-img"
                        width="110"
                        height="110"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="cert-badge-placeholder" aria-label="Certification in progress">
                      <FiAward size={38} className="cert-placeholder-icon" />
                    </div>
                  )}
                </div>

                <div className="cert-content">
                  <div className="cert-header-meta">
                    <span className="cert-issuer">{cert.issuer || 'Amazon Web Services'}</span>
                  </div>

                  <h3 className="cert-title">
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-title-link"
                      >
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )}
                  </h3>

                  <div className="cert-footer">
                    <div className="cert-footer-left">
                      <span className={`cert-status-badge ${isAchieved ? 'status-achieved' : 'status-future'}`}>
                        {isAchieved && <span className="status-dot"></span>}
                        {isAchieved ? 'Achieved' : 'Future Goal'}
                      </span>
                      {cert.date && <span className="cert-date">{cert.date}</span>}
                    </div>

                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-verify-link"
                        aria-label={`Verify ${cert.name} on Credly`}
                      >
                        <span>Verify</span>
                        <FiExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
