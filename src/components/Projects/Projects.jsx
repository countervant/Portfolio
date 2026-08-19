import React, { useState } from 'react';
import { projects } from '../../data';
import { FiExternalLink } from 'react-icons/fi';
import { BsImage } from 'react-icons/bs';
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

      <div className="projects-grid-3col">
        {filteredProjects.map((project) => (
          <div className="project-item" key={project.id}>
            <div className="project-img-placeholder">
              {/* <img src={`/images/projects/${project.id}.jpg`} alt={project.title} /> */}
              <BsImage size={32} />
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.subtitle}</p>
              
              <div className="project-footer">
                <span className="project-tech">{project.techStack}</span>
                {project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link" aria-label="View Project">
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
