import React from 'react';
import '../assets/Achievements.css';
import { FaLaptopCode, FaRobot, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const achievementIcons = [<FaTrophy />, <FaRobot />, <FaLaptopCode />];

function Achievements() {
  const { t } = useTranslation();
  const achievements = t('achievements.items', { returnObjects: true });

  return (
    <section className="achievements-section" id="achievements">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('achievements.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('achievements.title')}</h2>
        </motion.div>
        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <motion.article className="achievement-card glass-card" key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <div className="achievement-icon">{achievementIcons[index]}</div>
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
