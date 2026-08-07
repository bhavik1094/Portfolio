import React from 'react';
import '../assets/Education.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaAward, FaCalendarAlt, FaCode, FaDatabase, FaGraduationCap, FaLayerGroup, FaServer, FaUniversity } from 'react-icons/fa';
import { HiCheckCircle, HiSparkles } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';

const eduTechIcons = {
  'Distributed Systems': <FaServer style={{ color: '#38bdf8' }} />,
  'C# / .NET': <FaCode style={{ color: '#239120' }} />,
  'Database Architecture': <FaDatabase style={{ color: '#CC292B' }} />,
  'Web Security': <HiSparkles style={{ color: '#d946ef' }} />,
  'Data Structures': <FaLayerGroup style={{ color: '#06B6D4' }} />,
  'C++ & Java': <FaCode style={{ color: '#f59e0b' }} />,
  'SQL Database Design': <FaDatabase style={{ color: '#CC292B' }} />,
  'Web Development': <FaCode style={{ color: '#61DAFB' }} />,
};

const Education = () => {
  const { t } = useTranslation();
  const educationList = t('education.items', { returnObjects: true });

  return (
    <section className="timeline-section education-section" id="education">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker"><MdSchool /> {t('education.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('education.title')}</h2>
        </motion.div>

        <div className="timeline-wrapper">
          <div className="timeline-radial-glow" />
          <div className="timeline premium-timeline">
            {educationList.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  className={`timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={item.degree}
                >
                  <div className="timeline-node-container">
                    <motion.div
                      className="timeline-node-badge"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span>{item.nodeDate || item.period}</span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="timeline-card experience-dark-card"
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="role-header-top">
                      <div className="role-company-brand">
                        <div className="company-logo-circle edu-logo-circle">
                          <FaGraduationCap />
                        </div>
                        <div>
                          <h3 className="company-name-bold edu-degree-title">{item.degree}</h3>
                          <p className="role-title-cyan text-gradient-blue">{item.institution}</p>
                        </div>
                      </div>
                      <div className="edu-meta-pills">
                        <span className="period-badge-cyan"><FaCalendarAlt /> {item.period}</span>
                        {item.cgpa && <span className="cgpa-pill"><FaAward /> {t('education.cgpa')} {item.cgpa}</span>}
                      </div>
                    </div>

                    <p className="edu-description">{item.description}</p>

                    {item.tech && (
                      <div className="experience-tech-chips">
                        {item.tech.map((tech) => (
                          <span className="experience-chip" key={tech}>
                            <span className="chip-icon">{eduTechIcons[tech] || <HiSparkles />}</span>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.points && (
                      <ul className="role-impact-points">
                        {item.points.map((point) => (
                          <li key={point}>
                            <HiCheckCircle className="check-bullet-icon" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
