import React from 'react';
import '../assets/Achievements.css';
import { LaptopIcon, RobotIcon, TrophyIcon } from './Icons';

const achievements = [
  {
    title: 'Agent Hackathon 2024 Winner',
    icon: TrophyIcon,
    description: '1st place for building a LangChain + OpenAI-powered knowledge agent for real-time document querying.',
  },
  {
    title: 'Bot Battle Finalist',
    icon: RobotIcon,
    description: 'Designed a customer support bot using Python, Rasa, and NLP to handle 1000+ queries/day.',
  },
  {
    title: 'Fullstack Dev Challenge',
    icon: LaptopIcon,
    description: 'Built a complete MERN + .NET stack Employee Portal during a 36-hour sprint challenge.',
  },
];

function Achievements() {
  return (
    <section className="achievements-section" id="achievements">
      <div className="achievements-container" data-aos="fade-up">
        <h2 className="achievements-title section-title text-gradient-purple">
          🏆 Achievements & Hackathons
        </h2>
        <div className="achievements-grid">
          {achievements.map((item, index) => (
            <div className="achievement-item" key={item.title} data-aos="flip-left" data-aos-delay={index * 100}>
              <div className="achievement-card">
                <item.icon className="achievement-icon" aria-hidden="true" />
                <h5 className="achievement-heading">{item.title}</h5>
                <p className="achievement-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
