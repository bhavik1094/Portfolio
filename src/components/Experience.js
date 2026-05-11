import React from 'react';
import '../assets/Experience.css';
import { MdWorkHistory } from 'react-icons/md';
import { motion } from 'framer-motion';

const roles = [
  {
    company: 'Valcz India Pvt Ltd',
    role: 'Software Engineer',
    period: 'July 2025-Present',
    tech: ['ASP.NET Core', 'React', 'MongoDB', 'Docker', 'Azure DevOps'],
    points: [
      'Build scalable backend APIs using clean Controller-Service-Repository structure.',
      'Develop React + TypeScript dashboards with Tailwind CSS.',
      'Implement JWT authentication, MongoDB persistence, and request tracking.',
    ],
  },
  {
    company: 'Sikka.ai',
    role: 'Software Engineer',
    period: 'Apr 2021-Jun 2025',
    tech: ['React', 'ASP.NET Core', 'SQL Server', 'OpenAI', 'LangChain'],
    points: [
      'Built API and Finance portals used by 500+ healthcare partners.',
      'Developed secure REST APIs, dashboards, analytics, and financial workflows.',
      'Built AI automation agents using OpenAI, LangChain, and Ollama.',
    ],
  },
  {
    company: 'Knovos',
    role: 'Software Engineering Intern',
    period: 'Dec 2018-May 2019',
    tech: ['ASP.NET', 'C#', 'SQL', 'Web Forms'],
    points: [
      'Maintained and enhanced existing ASP.NET projects.',
      'Collaborated with senior developers to deliver stable product features.',
    ],
  },
];

function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker"><MdWorkHistory /> Career Timeline</span>
          <h2 className="section-title text-gradient-blue">Experience</h2>
        </motion.div>

        <div className="timeline premium-timeline">
          {roles.map((role, index) => (
            <motion.article
              className="timeline-item"
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <span className="timeline-dot" />
              <div className="timeline-card glass-card">
                <div className="role-header">
                  <div>
                    <h3>{role.company}</h3>
                    <p>{role.role}</p>
                  </div>
                  <span>{role.period}</span>
                </div>
                <div className="tech-tags">
                  {role.tech.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
                </div>
                <ul>
                  {role.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
