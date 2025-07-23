import React from 'react';
import '../assets/Education.css';

function Education() {
  const educationList = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Gujarat Technological University",
      year: "2016 - 2020",
      location: "Ahmedabad, Gujarat",
    },
    {
      degree: "Higher Secondary (Science)",
      institution: "XYZ Higher Secondary School",
      year: "2014 - 2016",
      location: "Rajkot, Gujarat",
    }
  ];

  return (
    <section id="education" className="py-5">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title text-center mb-5">
          <span className="text-gradient">🎓 Education</span>
        </h2>
        <div className="row justify-content-center">
          {educationList.map((edu, index) => (
            <div className="col-md-8 mb-4" key={index}>
              <div className="edu-card p-4 rounded-4 shadow-sm">
                <h5 className="fw-bold">{edu.degree}</h5>
                <p className="mb-1 text-muted">{edu.institution}</p>
                <p className="mb-0 small">
                  <i className="fa fa-calendar-alt me-2"></i>{edu.year}
                  <span className="ms-3">
                    <i className="fa fa-map-marker-alt me-2"></i>{edu.location}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
