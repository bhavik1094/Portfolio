import React from 'react';
import { motion } from 'framer-motion';
import { FaCodeBranch, FaFire, FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const githubIcons = [<FaGithub />, <FaFire />, <FaCodeBranch />];

const GitHubActivity = () => {
  const { t } = useTranslation();
  const cards = t('github.cards', { returnObjects: true });

  return (
    <section className="github-section" id="github-activity">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('github.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('github.title')}</h2>
        </motion.div>

        <div className="github-grid">
          {cards.map((card, index) => (
            <motion.article className="github-card glass-card" key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <div className="github-icon">{githubIcons[index]}</div>
              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
