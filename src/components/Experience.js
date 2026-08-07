import React from 'react';
import '../assets/Experience.css';
import { MdWorkHistory } from 'react-icons/md';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
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
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span className="timeline-dot" />
              <motion.div
                className="timeline-card glass-card"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <div className="role-header">
                  <div className="role-company-brand">
                    <span className="company-icon"><FaBriefcase /></span>
                    <div>
                      <h3>{role.company}</h3>
                      <p className="role-title">{role.role}</p>
                    </div>
                  </div>
                  <span className="period-badge"><FaCalendarAlt /> {role.period}</span>
                </div>
                <div className="tech-tags">
                  {role.tech.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
                </div>
                <ul className="role-points">
                  {role.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
