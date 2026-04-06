import React, { useEffect, useState } from 'react';
import '../assets/Projects.css';
import Lottie from 'lottie-react';

const projects = [
  {
    title: 'API Portal',
    description:
      'Secure platform for healthcare practices to manage API credentials, keys, rate limits, and usage analytics.',
    technologies: ['React.js', '.NET Core', 'SQL Server', 'Swagger', 'JWT'],
    animationPath: 'animations/api.json',
  },
  {
    title: 'Finance Portal',
    description:
      'Invoice management and reconciliation system for healthcare providers with analytics and role-based dashboards.',
    technologies: ['React.js', '.NET Core', 'SQL Server', 'SSRS', 'Bootstrap'],
    animationPath: 'animations/finance.json',
  },
  {
    title: 'AI Agent Suite',
    description:
      'AI agents for Patient Communication, Dental Billing, and Veterinary Triage using LangChain, OpenAI, and Ollama.',
    technologies: ['LangChain', 'OpenAI', 'Ollama', 'React'],
    animationPath: 'animations/ai-animation.json',
  },
];

const Projects = () => {
  const [animations, setAnimations] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all(
      projects.map(async (project) => {
        const response = await fetch(`${import.meta.env.BASE_URL}${project.animationPath}`);
        const animationData = await response.json();

        return [project.title, animationData];
      })
    )
      .then((entries) => {
        if (isMounted) {
          setAnimations(Object.fromEntries(entries));
        }
      })
      .catch(() => {
        if (isMounted) {
          setAnimations({});
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openModal = (project) => setSelected(project);
  const closeModal = () => setSelected(null);
  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title text-gradient-blue" data-aos="fade-up">Projects</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <button
            type="button"
            className="project-card"
            key={project.title}
            onClick={() => openModal(project)}
            data-aos="zoom-in"
            aria-label={`View details for ${project.title}`}
          >
            <div className="lottie-wrapper">
              {animations[project.title] ? (
                <Lottie animationData={animations[project.title]} loop={true} />
              ) : null}
            </div>
            <div className="project-overlay">
              <h3>{project.title}</h3>
              <p>Click to view more</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onMouseDown={handleBackdropMouseDown}>
          <dialog
            className="modal-content animate-popup"
            open
            onCancel={(event) => {
              event.preventDefault();
              closeModal();
            }}
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              className="close-button"
              onClick={closeModal}
              aria-label="Close project details"
            >
              ×
            </button>
            <h2 className="text-gradient-blue" id="project-modal-title">{selected.title}</h2>
            <p>{selected.description}</p>
            <div className="tech-tags">
              {selected.technologies.map((tech) => (
                <span key={`${selected.title}-${tech}`} className="tag">{tech}</span>
              ))}
            </div>
          </dialog>
        </div>
      )}
    </section>
  );
};

export default Projects;
