import React from 'react';
import '../assets/Education.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();
  const educationList = t('education.items', { returnObjects: true });

  return (
    <section className="timeline-section" id="education">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('education.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('education.title')}</h2>
        </motion.div>

        <div className="education-grid">
          {educationList.map((item, index) => (
            <motion.article className="education-card glass-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} key={item.degree}>
              <span className="timeline-dot" />
              <h3>{item.degree}</h3>
              <h4>{item.institution}</h4>
              <div className="education-meta">
                <span>{item.period}</span>
                <span>{t('education.cgpa')} {item.cgpa}</span>
              </div>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
