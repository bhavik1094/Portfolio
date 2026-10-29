import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReact, FaServer, FaDatabase, FaDocker, FaCloud, FaCode, FaMicrochip, FaBrain } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/Experience.css';

const techIcons = {
  'ASP.NET Core': FaServer, 'ASP.NET': FaServer, React: FaReact, MongoDB: FaDatabase,
  Docker: FaDocker, 'Azure DevOps': FaCloud, 'SQL Server': FaDatabase, SQL: FaDatabase,
  OpenAI: FaMicrochip, LangChain: FaBrain, 'C#': FaCode, 'Web Forms': FaCode,
};

function Experience() {
  const { t } = useTranslation();
  const roles = t('experience.roles', { returnObjects: true });

  return <section className="editorial-section p2-experience" id="experience" aria-labelledby="experience-title">
    <div className="portfolio-container">
      <SectionHeading number="03" kicker={t('experience.kicker')} title={t('experience.title')} id="experience-title" />
      <ol className="career-list">
        {roles.map((role, index) => <Reveal as="li" className="career-entry" key={`${role.company}-${role.period}`} delay={index * 0.05}>
          <div className="career-identity">
            <p className="career-period"><span aria-hidden="true" />{role.period}</p>
            <h3>{role.company}</h3>
            <p className="career-role">{role.role}</p>
            {(role.type || role.location) && <p className="career-meta">{[role.type, role.location].filter(Boolean).join(' · ')}</p>}
            <ul className="career-technologies">
              {role.tech.map((tech) => { const Icon = techIcons[tech] || HiSparkles; return <li key={tech}><Icon aria-hidden="true" />{tech}</li>; })}
            </ul>
          </div>
          <ul className="career-impact">{role.points.map((point) => <li key={point}>{point}</li>)}</ul>
        </Reveal>)}
      </ol>
    </div>
  </section>;
}

export default Experience;
