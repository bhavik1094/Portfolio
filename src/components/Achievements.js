import React from 'react';
import '../assets/Achievements.css';
import { FaAward, FaLaptopCode, FaMedal, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const achievementIcons = [
  <FaTrophy style={{ color: '#f59e0b' }} />,
  <FaMedal style={{ color: '#38bdf8' }} />,
  <FaAward style={{ color: '#2dd4bf' }} />
];

function Achievements() {
  const { t } = useTranslation();
  const achievements = t('achievements.items', { returnObjects: true });

  return (
    <section className="achievements-section" id="achievements">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker"><FaTrophy /> {t('achievements.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('achievements.title')}</h2>
        </motion.div>
        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <motion.article
              className="achievement-card glass-card"
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
            >
              <div className="certificate-badge">
                <span className="achievement-icon">{achievementIcons[index] || <FaLaptopCode />}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
