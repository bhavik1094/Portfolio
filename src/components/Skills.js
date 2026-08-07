import React from 'react';
import '../assets/Skills.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaReact, FaHtml5, FaCss3Alt, FaServer, FaDocker, FaGitAlt, FaBrain, FaRobot,
  FaDatabase, FaCloud, FaCode, FaLock, FaTerminal, FaLayerGroup, FaGlobe, FaMicrochip
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const skillIcons = {
  'React': <FaReact style={{ color: '#61DAFB' }} />,
  'TypeScript': <FaCode style={{ color: '#3178C6' }} />,
  'JavaScript': <FaCode style={{ color: '#F7DF1E' }} />,
  'Tailwind': <FaLayerGroup style={{ color: '#06B6D4' }} />,
  'HTML': <FaHtml5 style={{ color: '#E34F26' }} />,
  'CSS': <FaCss3Alt style={{ color: '#1572B6' }} />,
  'ASP.NET Core': <FaServer style={{ color: '#512BD4' }} />,
  'C#': <FaCode style={{ color: '#239120' }} />,
  'REST APIs': <FaGlobe style={{ color: '#0ea5e9' }} />,
  'Entity Framework': <FaDatabase style={{ color: '#512BD4' }} />,
  'JWT': <FaLock style={{ color: '#d946ef' }} />,
  'SQL Server': <FaDatabase style={{ color: '#CC292B' }} />,
  'MongoDB': <FaDatabase style={{ color: '#47A248' }} />,
  'MySQL': <FaDatabase style={{ color: '#4479A1' }} />,
  'Docker': <FaDocker style={{ color: '#2496ED' }} />,
  'Azure DevOps': <FaCloud style={{ color: '#0078D4' }} />,
  'Git': <FaGitAlt style={{ color: '#F05032' }} />,
  'Postman': <FaTerminal style={{ color: '#FF6C37' }} />,
  'Swagger': <FaCode style={{ color: '#85EA2D' }} />,
  'OpenAI': <FaMicrochip style={{ color: '#10a37f' }} />,
  'LangChain': <FaBrain style={{ color: '#f59e0b' }} />,
  'Ollama': <FaRobot style={{ color: '#38bdf8' }} />,
  'Prompt Engineering': <HiSparkles style={{ color: '#a855f7' }} />,
};

const Skills = () => {
  const { t } = useTranslation();
  const skillGroups = t('skills.groups', { returnObjects: true });

  return (
    <section className="skills-section" id="skills">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('skills.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('skills.title')}</h2>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <motion.article
              className="skill-card glass-card"
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              <h3>{group.title}</h3>
              <div className="skill-item-grid">
                {group.items.map((skill) => (
                  <div key={skill} className="skill-icon-pill">
                    <span className="skill-icon">{skillIcons[skill] || <HiSparkles />}</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
