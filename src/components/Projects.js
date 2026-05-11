import React, { useState } from 'react';
import '../assets/Projects.css';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink, HiShieldCheck, HiSparkles } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const ScreenshotMockup = ({ title, variant = 'dashboard' }) => (
  <div className={`browser-mockup mockup-${variant}`}>
    <div className="browser-bar">
      <span />
      <span />
      <span />
      <small>{title}</small>
    </div>
    <div className="mockup-body">
      <aside>
        <span />
        <span />
        <span />
        <span />
      </aside>
      <main>
        <div className="mockup-header">
          <span />
          <span />
        </div>
        <div className="mockup-stats">
          <span />
          <span />
          <span />
        </div>
        <div className="mockup-chart" />
        <div className="mockup-table">
          <span />
          <span />
          <span />
        </div>
      </main>
    </div>
  </div>
);

const projectMeta = [
  { accent: 'sky', preview: 'dashboard' },
  { accent: 'indigo', preview: 'login' },
  { accent: 'teal', preview: 'tasks' },
  { accent: 'emerald', preview: 'analytics' },
];

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  const featuredProject = t('projects.featured', { returnObjects: true });
  const projects = t('projects.items', { returnObjects: true }).map((project, index) => ({
    ...project,
    ...projectMeta[index],
  }));

  const openModal = (project) => setSelected(project);
  const closeModal = () => setSelected(null);

  return (
    <section className="projects-section" id="projects">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('projects.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('projects.title')}</h2>
          <p>{t('projects.intro')}</p>
        </motion.div>

        <motion.article
          className="featured-project-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="featured-project-preview">
            <ScreenshotMockup title="AI TaskFlow Dashboard" variant="dashboard" />
          </div>
          <div className="featured-project-content">
            <span className="section-kicker"><HiSparkles /> {t('projects.featuredKicker')}</span>
            <h3>{featuredProject.title}</h3>
            <p>{featuredProject.overview}</p>

            <div className="architecture-grid">
              {featuredProject.architecture.map((item) => (
                <span key={item}><HiShieldCheck /> {item}</span>
              ))}
            </div>

            <div className="feature-list">
              {featuredProject.features.map((feature) => <span key={feature}>{feature}</span>)}
            </div>

            <div className="tech-tags">
              {featuredProject.technologies.map((tech) => <span key={tech} className="tag">{tech}</span>)}
            </div>

            <div className="project-actions">
              <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer"><FaGithub /> {t('projects.github')}</a>
              <a href="#contact"><HiExternalLink /> {t('projects.liveDemo')}</a>
            </div>
          </div>
        </motion.article>

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
                <ScreenshotMockup title={project.previewTitle} variant={project.preview} />
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech) => <span key={tech} className="tag">{tech}</span>)}
                </div>
                <div className="project-actions">
                  <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}><FaGithub /> {t('projects.github')}</a>
                  <a href="#contact" onClick={(e) => e.stopPropagation()}><HiExternalLink /> {t('projects.liveDemo')}</a>
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
              <button className="close-button" onClick={closeModal} type="button" aria-label={t('projects.closeDetails')}>x</button>
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
