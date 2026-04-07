import React from 'react';
import '../assets/Achievements.css';

const achievements = [
  {
    title: 'Agent Hackathon 2024 Winner',
    icon: 'bi-trophy-fill',
    description: '1st place for building a LangChain + OpenAI-powered knowledge agent for real-time document querying.',
  },
  {
    title: 'Bot Battle Finalist',
    icon: 'bi-robot',
    description: 'Designed a customer support bot using Python, Rasa, and NLP to handle 1000+ queries/day.',
  },
  {
    title: 'Fullstack Dev Challenge',
    icon: 'bi-laptop',
    description: 'Built a complete MERN + .NET stack Employee Portal during a 36-hour sprint challenge.',
  },
];

function Achievements() {
  return (
    <section className="py-5 bg-light" id="achievements">
      <div className="container" data-aos="fade-up">
        <h2 className="text-center mb-5 section-title text-gradient-purple">
          🏆 Achievements & Hackathons 
        </h2>
        <div className="row g-4">
          {achievements.map((item, index) => (
            <div className="col-md-4" key={index} data-aos="flip-left" data-aos-delay={index * 100}>
              <div className="card h-100 shadow-lg achievement-card text-center p-4">
                <i className={`bi ${item.icon} display-4 text-primary mb-3`}></i>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
