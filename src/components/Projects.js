import React, { useState } from 'react';
import '../assets/Projects.css';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink, HiShieldCheck, HiSparkles } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const ScreenshotMockup = ({ title, variant = 'dashboard' }) => (
  <div className={`browser-mockup mockup-${variant}`}>
    <div className="browser-bar">
      <span className="dot red" />
      <span className="dot yellow" />
      <span className="dot green" />
      <small className="browser-url">https://{title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.vercel.app</small>
    </div>
    <div className="mockup-body">
      <aside className="mockup-sidebar">
        <div className="sidebar-brand" />
        <div className="sidebar-nav-item active" />
        <div className="sidebar-nav-item" />
        <div className="sidebar-nav-item" />
        <div className="sidebar-nav-item" />
      </aside>
      <main className="mockup-main">
        <div className="mockup-header">
          <div className="mockup-title-bar">
            <strong>{title}</strong>
            <span className="live-status-dot" title="Live Deployment" />
          </div>
        </div>
        <div className="mockup-stats-grid">
          <div className="stat-card">
            <span className="stat-label">System Uptime</span>
            <strong className="stat-value">99.99%</strong>
            <span className="stat-trend positive">Healthy</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">API Latency</span>
            <strong className="stat-value">&lt;95ms</strong>
            <span className="stat-trend positive">Optimized</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Auth &amp; RBAC</span>
            <strong className="stat-value">JWT</strong>
            <span className="stat-trend positive">Active</span>
          </div>
        </div>
        <div className="mockup-workspace">
          <div className="mockup-chart-area">
            <div className="chart-bar bar-1" />
            <div className="chart-bar bar-2" />
            <div className="chart-bar bar-3" />
            <div className="chart-bar bar-4" />
            <div className="chart-bar bar-5" />
          </div>
          <div className="mockup-task-list">
            <div className="task-row done">
              <span className="task-check">✓</span>
              <span className="task-title">ASP.NET Core &amp; React 19 Frontend</span>
            </div>
            <div className="task-row done">
              <span className="task-check">✓</span>
              <span className="task-title">JWT + RBAC Multi-tenant Auth</span>
            </div>
            <div className="task-row active">
              <span className="task-check">⚡</span>
              <span className="task-title">OpenAI &amp; LangChain Automation Pipeline</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

const filterCategories = [
  { id: 'all', labelKey: 'projects.filterAll', defaultLabel: 'All Projects' },
  { id: 'fullstack', labelKey: 'projects.filterFullstack', defaultLabel: 'Full-Stack (.NET + React)' },
  { id: 'ai', labelKey: 'projects.filterAI', defaultLabel: 'AI & Automation' },
  { id: 'saas', labelKey: 'projects.filterSaaS', defaultLabel: 'SaaS & Web' },
];

const projectMeta = [
  { accent: 'sky', preview: 'dashboard', category: ['fullstack', 'saas'], liveUrl: 'https://shree-krishna-nasta-house-git-main-bhavu3299-2641s-projects.vercel.app/en', githubUrl: 'https://github.com/bhavik1094' },
  { accent: 'indigo', preview: 'login', category: ['fullstack', 'ai', 'saas'], liveUrl: 'https://ai-task-alpha.vercel.app/', githubUrl: 'https://github.com/bhavik1094/ai-taskflow-ui' },
  { accent: 'teal', preview: 'tasks', category: ['fullstack'], githubUrl: 'https://github.com/bhavik1094' },
  { accent: 'emerald', preview: 'analytics', category: ['fullstack', 'saas'], githubUrl: 'https://github.com/bhavik1094' },
];

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useTranslation();
  const featuredProject = t('projects.featured', { returnObjects: true });
  const projects = t('projects.items', { returnObjects: true }).map((project, index) => ({
    ...project,
    ...projectMeta[index],
  }));

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category && project.category.includes(activeCategory);
  });

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

        <div className="project-filter-tabs">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`project-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {t(cat.labelKey, cat.defaultLabel)}
            </button>
          ))}
        </div>

        {(activeCategory === 'all' || activeCategory === 'ai' || activeCategory === 'fullstack') && (
          <motion.article
            className="featured-project-card glass-card"
            layout
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25 }}
          >
            <div className="featured-project-preview">
              <ScreenshotMockup title="AI TaskFlow SaaS Platform" variant="dashboard" />
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
                <a href="https://github.com/bhavik1094/ai-taskflow-ui" target="_blank" rel="noreferrer"><FaGithub /> {t('projects.github')}</a>
                <a href="https://ai-task-alpha.vercel.app/" target="_blank" rel="noreferrer"><HiExternalLink /> {t('projects.liveDemo')}</a>
              </div>
            </div>
          </motion.article>
        )}

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                className="project-card glass-card"
                key={project.title}
                layout
                onClick={() => openModal(project)}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
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
                    <a href={project.githubUrl || 'https://github.com/bhavik1094'} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}><FaGithub /> {t('projects.github')}</a>
                    <a href={project.liveUrl || '#contact'} target={project.liveUrl ? '_blank' : undefined} rel={project.liveUrl ? 'noreferrer' : undefined} onClick={(e) => e.stopPropagation()}><HiExternalLink /> {t('projects.liveDemo')}</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
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
