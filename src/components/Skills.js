import React from 'react';
import '../assets/Skills.css';


function Skills() {
  const skills = [
    { name: 'HTML5', icon: 'bi bi-filetype-html' },
    { name: 'CSS3', icon: 'bi bi-filetype-css' },
    { name: 'JavaScript', icon: 'bi bi-filetype-js' },
    { name: 'React.js', icon: 'bi bi-react' },
    { name: 'Bootstrap', icon: 'bi bi-bootstrap' },
    { name: '.NET Core', icon: 'bi bi-windows' },
    { name: 'MongoDB', icon: 'bi bi-database' },
    { name: 'Git & GitHub', icon: 'bi bi-git' },
  ];

  return (
    <section className="skills-section py-5" id="skills">
      <div className="container" data-aos="zoom-in">
        <h2 className="section-title mb-5 fw-bold text-center">Skills</h2>
        <div className="row g-4 justify-content-center">
          {skills.map((skill, index) => (
            <div
              className="col-6 col-md-3 d-flex justify-content-center"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="skill-card text-center p-4 bg-light rounded shadow-sm scale-on-hover">
                <i className={`${skill.icon} display-5 mb-3`}></i>
                <h6 className="fw-semibold mb-0">{skill.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
