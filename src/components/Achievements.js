import React from 'react';
import { FaAward, FaLaptopCode, FaTrophy } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/Achievements.css';

const icons = [FaTrophy, FaAward, FaLaptopCode];

const Achievements = () => {
  const { t } = useTranslation();
  const achievements = t('achievements.items', { returnObjects: true });
  return <section className="editorial-section p2-achievements" id="achievements" aria-labelledby="achievements-title">
    <div className="portfolio-container">
      <SectionHeading number="07" kicker={t('achievements.kicker')} title={t('achievements.title')} id="achievements-title" />
      <div className="recognition-grid">{achievements.map((item, index) => {
        const Icon = icons[index] || FaAward;
        return <Reveal as="article" className="recognition-card" key={item.title} delay={index * 0.06}>
          <div className="recognition-top"><Icon aria-hidden="true" /><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
          <h3>{item.title}</h3><p>{item.description}</p>
        </Reveal>;
      })}</div>
    </div>
  </section>;
};

export default Achievements;
