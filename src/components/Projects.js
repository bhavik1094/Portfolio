import React, { useState } from 'react';
import '../assets/Projects.css';
import Lottie from 'lottie-react';
import apiLottie from '../assets/API.json';
import financeLottie from '../assets/finance.json';
import aiLottie from '../assets/AI animation.json';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

const projects = [
  {
    title: 'AI TaskFlow',
    description: 'Full-stack SaaS task management platform with React, .NET Core, JWT auth, role-based access, SQL Server, dashboard, projects and tasks.',
    technologies: ['React', 'TypeScript', '.NET Core', 'SQL Server', 'JWT', 'Tailwind'],
    lottie: aiLottie,
    accent: 'sky',
  },
  {
    title: 'Employee Management Portal',
    description: 'Role-based full-stack portal with admin and employee dashboards, secure access, and clean operational workflows.',
    technologies: ['React', 'ASP.NET Core', 'SQL Server', 'JWT'],
    lottie: apiLottie,
    accent: 'indigo',
  },
  {
    title: 'API Portal',
    description: 'Developer portal for API key management, analytics, and secure integrations.',
    technologies: ['React', '.NET Core', 'REST APIs', 'Swagger'],
    lottie: apiLottie,
    accent: 'teal',
  },
  {
    title: 'Finance Portal',
    description: 'Finance dashboard for invoice generation, payment tracking, reconciliation, and reports.',
    technologies: ['React', '.NET Core', 'SQL Server', 'Reporting'],
    lottie: financeLottie,
    accent: 'emerald',
  },
];

const Projects = () => {
  const [selected, setSelected] = useState(null);

  const openModal = (project) => setSelected(project);
  const closeModal = () => setSelected(null);

  return (
    <section className="projects-section" id="projects">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">Featured Work</span>
          <h2 className="section-title text-gradient-blue">Projects</h2>
          <p>Recruiter-friendly case studies focused on secure APIs, SaaS workflows, dashboards, and AI automation.</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.title}
              onClick={() => openModal(project)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.01 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <div className={`project-preview project-preview-${project.accent}`}>
                <Lottie animationData={project.lottie} loop={true} />
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech) => <span key={tech} className="tag">{tech}</span>)}
                </div>
                <div className="project-actions">
                  <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}><FaGithub /> GitHub</a>
                  <a href="#contact" onClick={(e) => e.stopPropagation()}><HiExternalLink /> Live Demo</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="modal-overlay" onClick={closeModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
            >
              <button className="close-button" onClick={closeModal} type="button" aria-label="Close project details">x</button>
              <h2 className="text-gradient-blue">{selected.title}</h2>
              <p>{selected.description}</p>
              <div className="tech-tags">
                {selected.technologies.map((tech) => <span key={tech} className="tag">{tech}</span>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
