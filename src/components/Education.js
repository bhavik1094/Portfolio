import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCode, FaDatabase, FaGraduationCap, FaLayerGroup, FaServer } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/Education.css';

const icons = {
  'Distributed Systems': FaServer, 'C# / .NET': FaCode, 'Database Architecture': FaDatabase,
  'Web Security': HiSparkles, 'Data Structures': FaLayerGroup, 'C++ & Java': FaCode,
  'SQL Database Design': FaDatabase, 'Web Development': FaCode,
};

const Education = () => {
  const { t } = useTranslation();
  const items = t('education.items', { returnObjects: true });
  return <section className="editorial-section p2-education" id="education" aria-labelledby="education-title">
    <div className="portfolio-container">
      <SectionHeading number="06" kicker={t('education.kicker')} title={t('education.title')} id="education-title" />
      <div className="academic-list">
        {items.map((item, index) => <Reveal as="article" className="academic-entry" key={item.degree} delay={index * 0.06}>
          <div className="academic-meta">
            <FaGraduationCap aria-hidden="true" />
            <p className="academic-period">{item.period}</p>
            {item.cgpa && <dl className="academic-score"><div><dt>{t('education.cgpa')}</dt><dd>{item.cgpa}</dd></div></dl>}
          </div>
          <div className="academic-content">
            <h3>{item.degree}</h3>
            <p className="academic-institution">{item.institution}</p>
            <p className="academic-description">{item.description}</p>
            {item.tech?.length > 0 && <ul className="academic-technologies">{item.tech.map((tech) => {
              const Icon = icons[tech] || HiSparkles;
              return <li key={tech}><Icon aria-hidden="true" />{tech}</li>;
            })}</ul>}
            {item.points?.length > 0 && <ul className="academic-details">{item.points.map((point) => <li key={point}>{point}</li>)}</ul>}
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>;
};

export default Education;
