import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBolt, FaBrain, FaCode, FaLayerGroup, FaRocket, FaServer, FaShieldAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/EngineeringMindset.css';

const icons = [FaServer, FaLayerGroup, FaShieldAlt, FaShieldAlt, FaBolt, FaBrain, FaCode, FaRocket];

const EngineeringMindset = () => {
  const { t } = useTranslation();
  const principles = t('mindset.principles', { returnObjects: true });
  return <section className="editorial-section p2-mindset" id="engineering-mindset" aria-labelledby="mindset-title">
    <div className="portfolio-container">
      <SectionHeading number="05" kicker={t('mindset.kicker')} title={t('mindset.title')} id="mindset-title" />
      <ul className="principles-grid">{principles.map((principle, index) => {
        const Icon = icons[index] || HiSparkles;
        return <Reveal as="li" className="engineering-principle" key={principle} delay={(index % 2) * 0.05}>
          <span className="principle-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="principle-label">{principle}</span>
          <Icon aria-hidden="true" />
        </Reveal>;
      })}</ul>
    </div>
  </section>;
};

export default EngineeringMindset;
