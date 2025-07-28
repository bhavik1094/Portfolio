import React from 'react';
import '../assets/Experience.css';
import { MdWorkHistory } from 'react-icons/md';

function Experience() {
  return (
    <section className="experience-section py-5 bg-light" id="experience">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title mb-5 fw-bold text-center text-gradient-blue">
          <MdWorkHistory className="me-2 mb-1" /> Experience
        </h2>

        <div className="timeline">
          <div className="timeline-item mb-5" data-aos="fade-right">
            <h4 className="company fw-bold">Sikka.ai – <span className="text-primary">Software Engineer</span></h4>
            <p className="text-muted mb-1">Apr 2021 – Jun 2025 | Vadodara (Hybrid)</p>
            <ul className="list-unstyled ms-3">
              <li>🚀 Built React-based UIs for new generation web apps</li>
              <li>🛠️ Created RESTful APIs using ASP.NET Core</li>
              <li>📊 Handled SQL queries for data-intensive modules</li>
            </ul>
          </div>

          <div className="timeline-item" data-aos="fade-left">
            <h4 className="company fw-bold">Knovos – <span className="text-primary">.NET Developer (Intern)</span></h4>
            <p className="text-muted mb-1">Jan 2019 – Apr 2019 | Gandhinagar</p>
            <ul className="list-unstyled ms-3">
              <li>🔧 Maintained and enhanced existing ASP.NET projects</li>
              <li>🤝 Collaborated with senior developers to introduce new features</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
