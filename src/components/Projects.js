import React, { useState } from 'react';
import '../assets/Projects.css';
import Lottie from 'lottie-react';

// Import individual Lottie animations
import apiLottie from '../assets/API.json';
import financeLottie from '../assets/finance.json';
import aiLottie from '../assets/AI animation.json';

const projects = [
  {
    title: 'API Portal',
    description:
      'Secure platform for healthcare practices to manage API credentials, keys, rate limits, and usage analytics.',
    technologies: ['React.js', '.NET Core', 'SQL Server', 'Swagger', 'JWT'],
    lottie: apiLottie,
  },
  {
    title: 'Finance Portal',
    description:
      'Invoice management and reconciliation system for healthcare providers with analytics and role-based dashboards.',
    technologies: ['React.js', '.NET Core', 'SQL Server', 'SSRS', 'Bootstrap'],
    lottie: financeLottie,
  },
  {
    title: 'AI Agent Suite',
    description:
      'AI agents for Patient Communication, Dental Billing, and Veterinary Triage using LangChain, OpenAI, and Ollama.',
    technologies: ['LangChain', 'OpenAI', 'Ollama', 'React'],
    lottie: aiLottie,
  },
];

const Projects = () => {
  const [selected, setSelected] = useState(null);

  const openModal = (project) => setSelected(project);
  const closeModal = () => setSelected(null);

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title text-gradient-blue" data-aos="fade-up">Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            className="project-card"
            key={index}
            onClick={() => openModal(project)}
            data-aos="zoom-in"
          >
            <div className="lottie-wrapper">
              <Lottie animationData={project.lottie} loop={true} />
            </div>
            <div className="project-overlay">
              <h3>{project.title}</h3>
              <p>Click to view more</p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content animate-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-button" onClick={closeModal}>×</span>
            <h2 className="text-gradient-blue">{selected.title}</h2>
            <p>{selected.description}</p>
            <div className="tech-tags">
              {selected.technologies.map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
