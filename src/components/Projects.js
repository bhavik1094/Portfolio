import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiArrowUpRight, HiXMark } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import AccessibleDialog from './AccessibleDialog';
import '../assets/Projects.css';

const ease = [0.22, 1, 0.36, 1];
const filterCategories = [
  { id: 'all', labelKey: 'projects.filterAll' },
  { id: 'fullstack', labelKey: 'projects.filterFullstack' },
  { id: 'ai', labelKey: 'projects.filterAI' },
  { id: 'saas', labelKey: 'projects.filterSaaS' },
];

// Translation arrays have different ordering. Keep destinations tied to identity.
const getProjectMeta = ({ title }) => {
  if (/shree krishna/i.test(title)) return {
    id: 'restaurant', tone: 'sand', category: ['fullstack', 'saas'],
    liveUrl: 'https://shree-krishna-nasta-house-git-main-bhavu3299-2641s-projects.vercel.app/en', githubUrl: 'https://github.com/bhavik1094',
  };
  if (/taskflow/i.test(title)) return {
    id: 'taskflow', tone: 'violet', category: ['fullstack', 'ai', 'saas'],
    liveUrl: 'https://ai-task-alpha.vercel.app/', githubUrl: 'https://github.com/bhavik1094/ai-taskflow-ui',
  };
  if (/employee/i.test(title)) return { id: 'employee', tone: 'sand', category: ['fullstack'], githubUrl: 'https://github.com/bhavik1094' };
  if (/finance/i.test(title)) return { id: 'finance', tone: 'sage', category: ['fullstack', 'saas'], githubUrl: 'https://github.com/bhavik1094' };
  return { id: 'api', tone: 'ink', category: ['fullstack'], githubUrl: 'https://github.com/bhavik1094' };
};

// Abstract editorial artwork with real names/technologies, never a simulated UI.
const ProjectArtwork = ({ project, number, featured = false }) => (
  <div className={`work-art work-art-${project.tone}${featured ? ' work-art-featured' : ''}`} aria-hidden="true">
    <span className="work-art-orbit work-art-orbit-one" /><span className="work-art-orbit work-art-orbit-two" />
    <div className="work-art-top"><span>{String(number).padStart(2, '0')}</span><HiArrowUpRight /></div>
    <strong className="work-art-name">{project.title}</strong>
    <div className="work-art-bottom">{project.technologies.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
  </div>
);

const ProjectLinks = ({ project, t, onNavigate }) => (
  <div className="work-links">
    <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><FaGithub aria-hidden="true" />{t('projects.github')}<span className="sr-only"> — {project.title}</span></a>
    <a href={project.liveUrl || '#contact'} target={project.liveUrl ? '_blank' : undefined} rel={project.liveUrl ? 'noreferrer' : undefined} onClick={(event) => { event.stopPropagation(); if (!project.liveUrl) onNavigate?.(); }}>{t(project.liveUrl ? 'projects.liveDemo' : 'projects.discussProject')}<HiArrowUpRight aria-hidden="true" /><span className="sr-only"> — {project.title}</span></a>
  </div>
);

const Projects = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const featuredProject = t('projects.featured', { returnObjects: true });
  const featured = { ...featuredProject, ...getProjectMeta(featuredProject) };
  const projects = t('projects.items', { returnObjects: true }).map((project) => ({ ...project, ...getProjectMeta(project) }));
  const featuredItem = projects.find((project) => project.id === featured.id);
  const featuredVisible = Boolean(featuredItem) && (activeCategory === 'all' || featured.category.includes(activeCategory));
  const orderedProjects = featuredItem ? [featuredItem, ...projects.filter((project) => project.id !== featured.id)] : projects;
  const filteredProjects = projects.filter((project) => (activeCategory === 'all' || project.category.includes(activeCategory))
    && (!featuredVisible || project.id !== featured.id));
  const selected = projects.find((project) => project.id === selectedId);

  useEffect(() => {
    if (selectedId && !projects.some((project) => project.id === selectedId)) setSelectedId(null);
    // Close only when a new locale has no corresponding project identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, selectedId]);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 }, transition: { duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : delay, ease },
  });

  return (
    <section className="projects-section work-section" id="projects" aria-labelledby="work-title">
      <div className="portfolio-container">
        <motion.div className="work-heading" {...reveal()}>
          <div><span className="work-kicker"><span aria-hidden="true">02 /</span> {t('projects.kicker')}</span><h2 id="work-title">{t('projects.title')}</h2></div><p>{t('projects.intro')}</p>
        </motion.div>
        <div className="work-filters" role="group" aria-label={t('projects.title')}>
          {filterCategories.map((category) => <button key={category.id} type="button" aria-pressed={activeCategory === category.id} className="work-filter" onClick={() => setActiveCategory(category.id)}>{t(category.labelKey)}</button>)}
        </div>
        {featuredVisible && (
          <motion.article className="work-featured" {...reveal()}>
            <motion.button type="button" className="work-featured-visual" aria-label={`${t('projects.viewDetails')}: ${featuredItem.title}`} onClick={() => setSelectedId(featuredItem.id)} initial={reduceMotion ? false : { clipPath: 'inset(8% 0 8% 0 round 18px)' }} whileInView={{ clipPath: 'inset(0% 0 0% 0 round 18px)' }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0 : 1, ease }}>
              <ProjectArtwork project={featured} number={1} featured /><span className="work-art-caption">{t('projects.artworkLabel')}</span>
            </motion.button>
            <div className="work-featured-content">
              <span className="work-kicker">{t('projects.featuredKicker')}</span><h3>{featured.title}</h3><p className="work-featured-overview">{featured.overview}</p>
              <ul className="work-architecture">{featured.architecture.map((item) => <li key={item}>{item}</li>)}</ul>
              <ul className="work-features">{featured.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <ul className="work-tech">{featured.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectLinks project={featured} t={t} />
            </div>
          </motion.article>
        )}
        <motion.div className="work-grid" layout={!reduceMotion}>
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => (
              <motion.article className="work-card" key={project.id} layout={!reduceMotion} onClick={() => setSelectedId(project.id)} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index % 2 * 0.08, ease }}>
                <button type="button" className="work-open" aria-label={`${t('projects.viewDetails')}: ${project.title}`}>
                  <ProjectArtwork project={project} number={orderedProjects.indexOf(project) + 1} /><span className="work-open-arrow"><HiArrowUpRight aria-hidden="true" /></span>
                </button>
                <div className="work-card-content"><h3>{project.title}</h3><p>{project.description}</p><ul className="work-tech">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectLinks project={project} t={t} /></div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AccessibleDialog isOpen={Boolean(selected)} onClose={() => setSelectedId(null)} titleId="work-dialog-title">
        {selected && <>
          <div className="portfolio-dialog-header"><div><span className="portfolio-dialog-kicker">{t('projects.kicker')}</span><h2 className="portfolio-dialog-title" id="work-dialog-title">{selected.title}</h2></div><button type="button" className="portfolio-dialog-close" data-dialog-close aria-label={t('projects.closeDetails')} onClick={() => setSelectedId(null)}><HiXMark aria-hidden="true" /></button></div>
          <div className="work-dialog-body"><ProjectArtwork project={selected} number={orderedProjects.indexOf(selected) + 1} /><p>{selected.description}</p><ul className="work-tech">{selected.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectLinks project={selected} t={t} onNavigate={() => setSelectedId(null)} /></div>
        </>}
      </AccessibleDialog>
    </section>
  );
};

export default Projects;
