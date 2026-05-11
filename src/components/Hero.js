import React from 'react';
import '../assets/Hero.css';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowRight, HiDownload } from 'react-icons/hi';

const techChips = ['React', 'TypeScript', '.NET Core', 'SQL Server', 'MongoDB', 'OpenAI'];
const socials = [
  { href: 'https://github.com/bhavik1094', label: 'GitHub', icon: <FaGithub /> },
  { href: 'https://linkedin.com/in/bhavik1094', label: 'LinkedIn', icon: <FaLinkedin /> },
  { href: 'mailto:youremail@example.com', label: 'Email', icon: <FaEnvelope /> },
];

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <motion.div className="blob blob-one" animate={{ y: [0, 28, 0], x: [0, 18, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }} />
      <motion.div className="blob blob-two" animate={{ y: [0, -22, 0], x: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }} />

      <div className="hero-container portfolio-container">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="eyebrow">Available for Remote Full-Stack Roles</span>
          <h1>Building scalable SaaS products with React, .NET & AI</h1>
          <p className="hero-tagline">
            I&apos;m Bhavik Patel, a Full-Stack Engineer building secure APIs, modern dashboards, and AI-powered workflow automation.
          </p>
          <div className="tech-chip-row">
            {techChips.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
          </div>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">View Projects <HiArrowRight /></a>
            <a href="/Bhavik%20M%20Patel%20Resume.pdf" className="button button-secondary" download><HiDownload /> Download Resume</a>
            <a href="#contact" className="button button-ghost">Contact Me</a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            {socials.map((social) => (
              <a href={social.href} aria-label={social.label} title={social.label} target={social.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="avatar-card"
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="avatar-glow" />
          <div className="initials-avatar">BP</div>
          <div className="avatar-meta">
            <span>Senior Full-Stack Developer</span>
            <strong>React + .NET + AI</strong>
          </div>
          <div className="avatar-stack">
            <span>API Architecture</span>
            <span>Dashboards</span>
            <span>Automation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
