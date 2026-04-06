import React from 'react';
import '../assets/Skills.css';
import {
  Css3Icon,
  DatabaseIcon,
  FigmaIcon,
  GitAltIcon,
  Html5Icon,
  JavaScriptIcon,
  NodeIcon,
  ReactIconSvg,
} from './Icons';

const skills = [
  { name: 'HTML5', icon: Html5Icon },
  { name: 'CSS3', icon: Css3Icon },
  { name: 'JavaScript', icon: JavaScriptIcon },
  { name: 'React', icon: ReactIconSvg },
  { name: 'Node.js', icon: NodeIcon },
  { name: 'MongoDB', icon: DatabaseIcon },
  { name: 'Git & GitHub', icon: GitAltIcon },
  { name: 'Figma', icon: FigmaIcon },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title text-gradient-orange" data-aos="fade-up">Skills</h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" data-aos="fade-up" data-aos-delay={index * 100} key={skill.name}>
            <skill.icon className="skill-icon" aria-hidden="true" />
            <h6>{skill.name}</h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
