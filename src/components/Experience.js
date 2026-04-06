import React from 'react';
import '../assets/Experience.css';
import { WorkIcon } from './Icons';

function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container" data-aos="fade-up">
        <h2 className="experience-title section-title text-gradient-blue">
          <WorkIcon className="experience-title-icon" /> Experience
        </h2>

        <div className="timeline">
          <div className="timeline-item experience-entry" data-aos="fade-right">
            <h4 className="company company-heading">Sikka.ai – <span className="company-role">Software Engineer</span></h4>
            <p className="company-meta">Apr 2021 – Jun 2025 | Vadodara (Hybrid)</p>
            <ul className="experience-points">
              <li>🚀 Built React-based UIs for new generation web apps</li>
              <li>🛠️ Created RESTful APIs using ASP.NET Core</li>
              <li>📊 Handled SQL queries for data-intensive modules</li>
            </ul>
          </div>

          <div className="timeline-item experience-entry" data-aos="fade-left">
            <h4 className="company company-heading">Knovos – <span className="company-role">.NET Developer (Intern)</span></h4>
            <p className="company-meta">Jan 2019 – Apr 2019 | Gandhinagar</p>
            <ul className="experience-points">
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
