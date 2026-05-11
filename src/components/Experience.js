import React from 'react';
import '../assets/Experience.css';
import { MdWorkHistory } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function Experience() {
  const { t } = useTranslation();
  const roles = t('experience.roles', { returnObjects: true });

  return (
    <section className="experience-section" id="experience">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker"><MdWorkHistory /> {t('experience.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('experience.title')}</h2>
          <p>{t('experience.intro')}</p>
        </motion.div>

        <div className="timeline premium-timeline">
          {roles.map((role, index) => (
            <motion.article
              className="timeline-item"
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <span className="timeline-dot" />
              <div className="timeline-card glass-card">
                <div className="role-header">
                  <div>
                    <h3>{role.company}</h3>
                    <p>{role.role}</p>
                  </div>
                  <span>{role.period}</span>
                </div>
                <div className="tech-tags">
                  {role.tech.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
                </div>
                <ul>
                  {role.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
