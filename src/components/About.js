import React from 'react';
import '../assets/About.css';
import Lottie from 'lottie-react';
import devAnimation from '../assets/dev-lottie.json';
import { motion } from 'framer-motion';

const stats = ['5+ Years Experience', '500+ Partners Served', 'SaaS + AI Experience'];

const About = () => {
  return (
    <section className="about-section" id="about">
      <motion.div className="about-container portfolio-container" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
        <div className="about-image glass-card">
          <Lottie animationData={devAnimation} loop={true} />
        </div>

        <div className="about-content glass-card">
          <h2 className="about-heading">
            About Me <span className="badge">Open to Work</span>
          </h2>
          <p>
            I&apos;m a full-stack developer with 4+ years of experience shipping secure SaaS platforms, internal dashboards, and integration-heavy products for healthcare and business teams.
          </p>
          <p>
            My work spans React, ASP.NET Core, SQL Server, MongoDB, and modern API architecture, with recent AI automation using OpenAI, LangChain, and Ollama.
          </p>
          <p>
            I bring a product-minded engineering style to remote teams: clean interfaces, traceable backend systems, practical automation, and code that is easy to grow.
          </p>
          <div className="stat-grid">
            {stats.map((stat) => <span key={stat}>{stat}</span>)}
          </div>
          <a href="#contact" className="hire-button">Hire Me</a>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
