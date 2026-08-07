import React from 'react';
import '../assets/Experience.css';
import { MdWorkHistory } from 'react-icons/md';
import {
  FaBriefcase, FaCalendarAlt, FaReact, FaServer, FaDatabase, FaDocker, FaCloud, FaCode, FaMicrochip, FaBrain, FaMapMarkerAlt, FaUserClock
} from 'react-icons/fa';
import { HiCheckCircle, HiSparkles } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const techIcons = {
  'ASP.NET Core': <FaServer style={{ color: '#38bdf8' }} />,
  'ASP.NET': <FaServer style={{ color: '#38bdf8' }} />,
  'React': <FaReact style={{ color: '#61DAFB' }} />,
  'MongoDB': <FaDatabase style={{ color: '#47A248' }} />,
  'Docker': <FaDocker style={{ color: '#2496ED' }} />,
  'Azure DevOps': <FaCloud style={{ color: '#0078D4' }} />,
  'SQL Server': <FaDatabase style={{ color: '#CC292B' }} />,
  'SQL': <FaDatabase style={{ color: '#CC292B' }} />,
  'OpenAI': <FaMicrochip style={{ color: '#10a37f' }} />,
  'LangChain': <FaBrain style={{ color: '#f59e0b' }} />,
  'C#': <FaCode style={{ color: '#239120' }} />,
  'Web Forms': <FaCode style={{ color: '#a855f7' }} />,
};

function Experience() {
  const { t } = useTranslation();
  const roles = t('experience.roles', { returnObjects: true });

  return (
    <section className="experience-section" id="experience">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker"><MdWorkHistory /> {t('experience.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('experience.title')}</h2>
          <p>{t('experience.intro')}</p>
        </motion.div>

        <div className="timeline-wrapper">
          <div className="timeline-radial-glow" />
          <div className="timeline premium-timeline">
            {roles.map((role, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  className={`timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`}
                  key={`${role.company}-${role.period}`}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-node-container">
                    <motion.div
                      className="timeline-node-badge"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span>{role.nodeDate || role.period}</span>
                    </motion.div>
                  </div>
                  <motion.div
                    className="timeline-card experience-dark-card"
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="role-header-top">
                      <div className="role-company-brand">
                        <div className="company-logo-circle">
                          <FaBriefcase />
                        </div>
                        <div>
                          <h3 className="company-name-bold">{role.company}</h3>
                          <p className="role-title-cyan text-gradient-blue">{role.role}</p>
                        </div>
                      </div>
                      <span className="period-badge-cyan"><FaCalendarAlt /> {role.period}</span>
                    </div>

                    <div className="role-sub-badges">
                      {role.type && <span className="meta-pill"><FaUserClock /> {role.type}</span>}
                      {role.location && <span className="meta-pill"><FaMapMarkerAlt /> {role.location}</span>}
                    </div>

                    <div className="experience-tech-chips">
                      {role.tech.map((tech) => (
                        <span className="experience-chip" key={tech}>
                          <span className="chip-icon">{techIcons[tech] || <HiSparkles />}</span>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="role-impact-points">
                      {role.points.map((point) => (
                        <li key={point}>
                          <HiCheckCircle className="check-bullet-icon" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
