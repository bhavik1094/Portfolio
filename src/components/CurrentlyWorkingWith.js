import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CurrentlyWorkingWith = () => {
  const { t } = useTranslation();
  const technologies = t('working.technologies', { returnObjects: true });
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section className="working-section" id="working-with">
      <div className="portfolio-container">
        <motion.div className="section-heading compact-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('working.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('working.title')}</h2>
        </motion.div>

        <div className="tech-marquee glass-card" aria-label={t('working.ariaLabel')}>
          <motion.div className="tech-marquee-track" animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}>
            {marqueeItems.map((tech, index) => (
              <motion.span whileHover={{ y: -4, scale: 1.05 }} className="working-chip" key={`${tech}-${index}`}>
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyWorkingWith;
