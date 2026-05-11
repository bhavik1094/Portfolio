import React from 'react';
import '../assets/Skills.css';
import { motion } from 'framer-motion';

const skillGroups = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind', 'HTML', 'CSS'] },
  { title: 'Backend', items: ['ASP.NET Core', 'C#', 'REST APIs', 'Entity Framework', 'JWT'] },
  { title: 'Database', items: ['SQL Server', 'MongoDB', 'MySQL'] },
  { title: 'DevOps & Tools', items: ['Git', 'Docker', 'Azure DevOps', 'Postman', 'Swagger'] },
  { title: 'AI & Automation', items: ['OpenAI', 'LangChain', 'Ollama', 'Prompt Engineering'] },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">Technical Toolkit</span>
          <h2 className="section-title text-gradient-blue">Skills</h2>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <motion.article
              className="skill-card glass-card"
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <h3>{group.title}</h3>
              <div className="skill-pill-grid">
                {group.items.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
