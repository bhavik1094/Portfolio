import React from 'react';
import '../assets/Skills.css';

const skills = [
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Node.js', icon: 'fab fa-node' },
  { name: 'MongoDB', icon: 'fas fa-database' },
  { name: 'Git & GitHub', icon: 'fab fa-git-alt' },
  { name: 'Figma', icon: 'fab fa-figma' },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title text-gradient-orange" data-aos="fade-up">Skills</h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
            <i className={`${skill.icon} skill-icon`}></i>
            <h6>{skill.name}</h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
