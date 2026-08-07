import React from 'react';
import { motion } from 'framer-motion';
import { FaCodeBranch, FaExternalLinkAlt, FaFire, FaGithub, FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const repos = [
  {
    name: 'ai-taskflow-ui',
    description: 'Enterprise AI Task Automation SaaS Platform built with React 19, TypeScript, and .NET Core.',
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 14,
    forks: 5,
    url: 'https://github.com/bhavik1094/ai-taskflow-ui'
  },
  {
    name: 'Portfolio',
    description: 'High-performance developer portfolio with i18n, custom glassmorphism design system, and Vitest suite.',
    language: 'JavaScript',
    langColor: '#f7df1e',
    stars: 8,
    forks: 3,
    url: 'https://github.com/bhavik1094/Portfolio'
  }
];

const GitHubActivity = () => {
  const { t } = useTranslation();
  const cards = t('github.cards', { returnObjects: true });

  return (
    <section className="github-section" id="github-activity">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker"><FaGithub /> {t('github.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('github.title')}</h2>
        </motion.div>

        <div className="github-stats-row">
          <motion.div
            className="github-embed-card glass-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25 }}
          >
            <div className="embed-header">
              <FaGithub className="github-brand-icon" />
              <div>
                <strong>GitHub Overview</strong>
                <span>@bhavik1094</span>
              </div>
            </div>
            <div className="github-stat-pills">
              {cards.map((card) => (
                <div className="stat-pill" key={card.title}>
                  <span className="stat-pill-label">{card.title}</span>
                  <strong className="stat-pill-val">{card.value}</strong>
                  <small className="stat-pill-detail">{card.detail}</small>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="github-embed-card glass-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            <div className="embed-header">
              <FaFire className="streak-icon" />
              <div>
                <strong>Contribution & Code Activity</strong>
                <span>Senior Full-Stack Repositories</span>
              </div>
            </div>
            <div className="repo-showcase-grid">
              {repos.map((repo) => (
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-mini-card"
                  key={repo.name}
                >
                  <div className="repo-card-top">
                    <strong>{repo.name}</strong>
                    <FaExternalLinkAlt className="ext-icon" />
                  </div>
                  <p>{repo.description}</p>
                  <div className="repo-card-meta">
                    <span className="repo-lang">
                      <span className="lang-dot" style={{ backgroundColor: repo.langColor }} />
                      {repo.language}
                    </span>
                    <span className="repo-metric"><FaStar /> {repo.stars}</span>
                    <span className="repo-metric"><FaCodeBranch /> {repo.forks}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
