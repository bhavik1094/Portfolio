import React from 'react';
import '../assets/Education.css'; // Reuse same styles for timeline

const educationList = [
  {
    degree: 'Bachelor in Computer Applications',
    institution: 'Sardar Patel University',
    period: '2013 - 2016',
    cgpa:8.06,
    description: 'Graduated with a strong foundation in full-stack development and software design.',
  },
  {
     degree: 'Masters in Computer Applications',
    institution: 'Sardar Patel University',
    period: '2013 - 2016',
    cgpa:7.5,
    description: 'Completed higher secondary education with focus on Maths and Physics.',
  },
];

const Education = () => {
  return (
    <section className="timeline-section" id="education">
      <h2 className="section-title text-gradient-green" data-aos="fade-up">Education</h2>
      <div className="timeline">
        {educationList.map((item, index) => (
          <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} data-aos="fade-up" key={index}>
            <div className="timeline-dot" />
            <div className="timeline-box">
              <h4>{item.degree}</h4>
              <h5>{item.institution}</h5>
              <span className="timeline-date">{item.period}</span>
              <span className="timeline-date">CGPA : {item.cgpa}</span>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
