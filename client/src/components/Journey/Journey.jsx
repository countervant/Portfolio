import React from 'react';
import { journey, currentlyLearning, labs } from '../../data';
import { BookOpen, Target, ArrowRight } from 'lucide-react';
import './Journey.css';

const Journey = () => {
  return (
    <section id="experience" className="section journey-section">
      <div className="container reveal">
        
        <div className="journey-layout">
          {/* Left Column: Experience/Journey */}
          <div className="journey-main">
            <h2 className="section-title text-left">Experience & Learning</h2>
            
            <div className="timeline">
              {journey.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content card">
                    <span className="timeline-date">{item.date}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <span className="timeline-org">{item.organization}</span>
                    <p className="timeline-desc">{item.description}</p>
                    <div className="timeline-skills">
                      {item.skillsGained.map((skill, sIndex) => (
                        <span key={sIndex} className="timeline-skill">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Labs & Currently Learning */}
          <div className="journey-sidebar">
            
            {/* Labs Section */}
            <div className="sidebar-widget card labs-widget">
              <h3 className="widget-title">
                <BookOpen size={20} className="widget-icon" />
                Hands-On Labs
              </h3>
              <div className="labs-list">
                {labs.map((lab) => (
                  <div key={lab.id} className="lab-item">
                    <h4 className="lab-title">{lab.title}</h4>
                    <p className="lab-learnings">{lab.learnings}</p>
                    <div className="lab-meta">
                      <div className="lab-services">
                        {lab.services.map((service, sIndex) => (
                          <span key={sIndex} className="lab-service">{service}</span>
                        ))}
                      </div>
                      <a href={lab.link} className="lab-link">View <ArrowRight size={14} /></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Learning Section */}
            <div className="sidebar-widget card learning-widget">
              <h3 className="widget-title">
                <Target size={20} className="widget-icon" />
                Currently Learning
              </h3>
              <div className="learning-tags">
                {currentlyLearning.map((topic, index) => (
                  <span key={index} className="learning-tag">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
