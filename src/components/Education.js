import React from 'react';
import '../assets/Education.css';
import { motion } from 'framer-motion';

const educationList = [
  {
    degree: 'Bachelor in Computer Applications',
    institution: 'Sardar Patel University',
    period: '2013-2016',
    cgpa: 8.06,
    description: 'Built a strong foundation in programming, database design, and web application fundamentals.',
  },
  {
    degree: 'Masters in Computer Applications',
    institution: 'Sardar Patel University',
    period: '2017-2019',
    cgpa: 7.5,
    description: 'Advanced software engineering studies focused on application architecture and full-stack development.',
  },
];

const Education = () => {
  return (
    <section className="timeline-section" id="education">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">Academic Background</span>
          <h2 className="section-title text-gradient-blue">Education</h2>
        </motion.div>

        <div className="education-grid">
          {educationList.map((item, index) => (
            <motion.article className="education-card glass-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} key={item.degree}>
              <span className="timeline-dot" />
              <h3>{item.degree}</h3>
              <h4>{item.institution}</h4>
              <div className="education-meta">
                <span>{item.period}</span>
                <span>CGPA {item.cgpa}</span>
              </div>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
