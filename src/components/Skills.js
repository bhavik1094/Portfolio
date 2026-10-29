import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReact, FaHtml5, FaCss3Alt, FaServer, FaDocker, FaGitAlt, FaBrain, FaRobot, FaDatabase, FaCloud, FaCode, FaLock, FaTerminal, FaLayerGroup, FaGlobe, FaMicrochip } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/Skills.css';

const skillIcons = {
  React: FaReact, TypeScript: FaCode, JavaScript: FaCode, Tailwind: FaLayerGroup,
  HTML: FaHtml5, CSS: FaCss3Alt, 'ASP.NET Core': FaServer, 'C#': FaCode,
  'REST APIs': FaGlobe, 'Entity Framework': FaDatabase, JWT: FaLock,
  'SQL Server': FaDatabase, MongoDB: FaDatabase, MySQL: FaDatabase,
  Docker: FaDocker, 'Azure DevOps': FaCloud, Git: FaGitAlt, Postman: FaTerminal,
  Swagger: FaCode, OpenAI: FaMicrochip, LangChain: FaBrain, Ollama: FaRobot,
  'Prompt Engineering': HiSparkles,
};

const Skills = () => {
  const { t } = useTranslation();
  const groups = t('skills.groups', { returnObjects: true });
  return <section className="editorial-section p2-skills" id="skills" aria-labelledby="skills-title">
    <div className="portfolio-container">
      <SectionHeading number="04" kicker={t('skills.kicker')} title={t('skills.title')} id="skills-title" />
      <div className="toolkit-groups">
        {groups.map((group, index) => <Reveal as="article" className="toolkit-group" key={group.title} delay={index * 0.04}>
          <div className="toolkit-group-heading"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{group.title}</h3></div>
          <ul className="toolkit-items">{group.items.map((skill) => {
            const Icon = skillIcons[skill] || HiSparkles;
            return <li key={skill}><Icon aria-hidden="true" /><span>{skill}</span></li>;
          })}</ul>
        </Reveal>)}
      </div>
    </div>
  </section>;
};

export default Skills;
