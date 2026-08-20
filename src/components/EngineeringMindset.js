import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaBolt,
  FaBrain,
  FaCode,
  FaLayerGroup,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaTerminal
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const mindsetIcons = [
  <FaServer style={{ color: '#38bdf8' }} />,
  <FaLayerGroup style={{ color: '#818cf8' }} />,
  <FaShieldAlt style={{ color: '#34d399' }} />,
  <FaShieldAlt style={{ color: '#06b6d4' }} />,
  <FaBolt style={{ color: '#f59e0b' }} />,
  <FaBrain style={{ color: '#f43f5e' }} />,
  <FaCode style={{ color: '#a855f7' }} />,
  <FaRocket style={{ color: '#2dd4bf' }} />
];

const EngineeringMindset = () => {
  const { t } = useTranslation();
  const principles = t('mindset.principles', { returnObjects: true });

  return (
    <section className="mindset-section" id="engineering-mindset">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker"><FaTerminal /> {t('mindset.kicker')}</span>
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
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.04 }}
            >
              <div className="mindset-icon-box">
                {mindsetIcons[index] || <HiSparkles style={{ color: '#38bdf8' }} />}
              </div>
              <span className="mindset-text">{principle}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringMindset;
