import React from 'react';
import '../assets/About.css';
import Lottie from 'lottie-react';
import devAnimation from '../assets/dev-lottie.json'; // Or use online via URL

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container" data-aos="fade-up">
        <div className="about-image">
          <Lottie animationData={devAnimation} loop={true} />
        </div>

        <div className="about-content">
          <h2 className="about-heading">
            About Me <span className="badge">Open to Work 💼</span>
          </h2>
          <p className="typing-text">
            I’m a full-stack developer with 4+ years of experience building scalable SaaS platforms in healthcare and fintech domains.
          </p>
          <p>
            I’ve led engineering of secure API portals and dashboards using React, .NET Core, and SQL. Recently, I’ve been creating AI agents using OpenAI, LangChain, and Ollama to automate workflows.
          </p>
          <p>
            I love solving real-world problems with clean, scalable code. Let’s build something impactful together.
          </p>
          <a href="#contact" className="hire-button">Hire Me</a>
        </div>
      </div>
    </section>
  );
};

export default About;
