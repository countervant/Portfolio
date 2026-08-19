import React from 'react';
import { skills } from '../../data';
import { FiCloud, FiServer, FiCode, FiPenTool } from 'react-icons/fi';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="section container reveal">
      <div className="divider" style={{ marginBottom: '4rem' }}></div>
      <div className="editorial-layout">
        <div className="section-header">
          <h2 className="section-title">SKILLS</h2>
          <div className="section-underline"></div>
        </div>
        
        <div className="skills-grid">
          <div className="skill-card">
            <h3 className="skill-card-title">
              <FiCloud className="skill-icon" /> AWS SERVICES
            </h3>
            <ul className="skill-list">
              {skills.awsServices.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          
          <div className="skill-card">
            <h3 className="skill-card-title">
              <FiServer className="skill-icon" /> CLOUD & DEVOPS
            </h3>
            <ul className="skill-list">
              {skills.cloudAndDevOps.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          
          <div className="skill-card">
            <h3 className="skill-card-title">
              <FiCode className="skill-icon" /> DEVELOPMENT
            </h3>
            <ul className="skill-list">
              {skills.development.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="skill-card">
            <h3 className="skill-card-title">
              <FiPenTool className="skill-icon" /> GRAPHIC DESIGN
            </h3>
            <ul className="skill-list">
              {skills.graphicDesign.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
