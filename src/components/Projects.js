import React from 'react';
import '../assets/Projects.css'; // Add styles here

const projects = [
  {
    title: 'Employee Portal',
    icon: 'bi-people-fill',
    description: 'Fullstack app for employee management with role-based access using .NET Core + React + MongoDB.',
    tech: ['.NET Core', 'React.js', 'MongoDB'],
    link: '#'
  },
  {
    title: 'MongoDB Auth API',
    icon: 'bi-shield-lock-fill',
    description: 'Secure REST API with JWT + role-based auth using ASP.NET Core and MongoDB.',
    tech: ['ASP.NET Core', 'JWT', 'MongoDB'],
    link: '#'
  },
  {
    title: 'Animated Portfolio',
    icon: 'bi-person-bounding-box',
    description: 'This portfolio built with React + Bootstrap. Includes AOS animation and light/dark mode.',
    tech: ['React.js', 'Bootstrap', 'AOS'],
    link: '#'
  },
];

function Projects() {
  return (
    <section className="projects-section py-5" id="projects">
      <div className="container">
        <h2 className="text-center fw-bold mb-5" data-aos="fade-up">Things I’ve Built ✨</h2>
        <div className="row g-4">
          {projects.map((proj, index) => (
            <div className="col-md-4" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="project-card">
                <div className="card-inner">
                  <div className="card-front d-flex flex-column align-items-center justify-content-center">
                    <i className={`bi ${proj.icon} display-4 text-primary mb-3`}></i>
                    <h5 className="fw-bold">{proj.title}</h5>
                  </div>
                  <div className="card-back text-start p-3">
                    <p>{proj.description}</p>
                    <p><strong>Tech:</strong> {proj.tech.join(', ')}</p>
                    <a href={proj.link} className="btn btn-sm btn-outline-primary mt-2">View Project</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
