import React from 'react';
import '../assets/Hero.css'; // Optional, add gradient or custom wave

function Hero() {
  return (
    <section className="hero d-flex align-items-center justify-content-center text-center" id="home">
      <div className="container" data-aos="fade-up">
        <h1 className="display-4 fw-bold mb-3">Hi, I'm Bhavik Patel</h1>
        <p className="lead mb-4">Full Stack Developer | .NET Core | React.js | MongoDB</p>
        <div>
          <a href="#projects" className="btn btn-primary me-3">View Projects</a>
          <a href="#contact" className="btn btn-outline-light">Contact Me</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
