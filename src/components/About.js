import React from 'react';
import '../assets/About.css';
import Lottie from 'lottie-react';
import devAnimation from '../assets/dev-lottie.json';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const stats = t('about.stats', { returnObjects: true });
  const paragraphs = t('about.paragraphs', { returnObjects: true });

  return (
    <section className="about-section" id="about">
      <motion.div className="about-container portfolio-container" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <div className="about-image glass-card">
          <Lottie animationData={devAnimation} loop={true} />
        </div>

        <div className="about-content glass-card">
          <h2 className="about-heading">
            {t('about.title')} <span className="badge">{t('about.badge')}</span>
          </h2>
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="stat-grid">
            {stats.map((stat) => <span key={stat}>{stat}</span>)}
          </div>
          <a href="#contact" className="hire-button">{t('about.hireMe')}</a>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
