import React from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const EngineeringMindset = () => {
  const { t } = useTranslation();
  const principles = t('mindset.principles', { returnObjects: true });

  return (
    <section className="mindset-section" id="engineering-mindset">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('mindset.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('mindset.title')}</h2>
          <p>{t('mindset.intro')}</p>
        </motion.div>

        <div className="mindset-grid">
          {principles.map((principle, index) => (
            <motion.article
              className="mindset-card glass-card"
              key={principle}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.04 }}
            >
              <HiCheckCircle />
              <span>{principle}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringMindset;
