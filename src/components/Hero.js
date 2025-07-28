import React from 'react';
import '../assets/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container" data-aos="fade-up">
        <h1>
          Hi, I’m <span className="text-gradient-blue">Bhavik Patel</span>
        </h1>
        <h2 className="hero-role">Full Stack Developer</h2>
        <p className="hero-tagline">
          I build clean, scalable web apps using React, Node, MongoDB & .NET. Always learning, always building.
        </p>
        <a href="#projects" className="cta-button">View My Work</a>
      </div>
    </section>
  );
};

export default Hero;
