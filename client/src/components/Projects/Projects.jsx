import { useState } from 'react';
import { projects } from '../../data';
import { BsImage } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('Cloud');

  const filteredProjects = projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="section container reveal">
      <div className="divider" style={{ marginBottom: '4rem' }}></div>
      
      <div className="projects-header">
        <div className="section-header">
          <h2 className="section-title">PROJECTS</h2>
          <div className="section-underline"></div>
        </div>
        
        <div className="project-filters">

          <button 
            className={`filter-btn ${filter === 'Cloud' ? 'active' : ''}`}
            onClick={() => setFilter('Cloud')}
          >
            Cloud
          </button>
          <button 
            className={`filter-btn ${filter === 'Graphic Design' ? 'active' : ''}`}
            onClick={() => setFilter('Graphic Design')}
          >
            Graphic Design
          </button>
        </div>
      </div>

      <div className={`projects-grid-3col ${filteredProjects.length <= 2 ? 'projects-centered' : ''}`}>
        {filteredProjects.map((project) => (
          <div className="project-item" key={project.id}>
            <div className="project-img-placeholder">
              {project.image ? (
                project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-img-link"
                    aria-label={`View live site for ${project.title}`}
                  >
                    <img
                      src={project.image}
                      srcSet={project.imageSrcSet}
                      sizes="(max-width: 768px) 90vw, (max-width: 992px) 45vw, 380px"
                      width="960"
                      height="426"
                      alt={project.title}
                      className="project-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ) : (
                  <img
                    src={project.image}
                    srcSet={project.imageSrcSet}
                    sizes="(max-width: 768px) 90vw, (max-width: 992px) 45vw, 380px"
                    width="960"
                    height="426"
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                    decoding="async"
                  />
                )
              ) : (
                <BsImage size={32} />
              )}
            </div>
            
            <div className="project-content">
              <h3 className="project-title">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-title-link"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="project-desc">{project.subtitle}</p>
              
              <div className="project-footer">
                <span className="project-tech">{project.techStack}</span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`View live site for ${project.title}`}
                  >
                    <FiExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
