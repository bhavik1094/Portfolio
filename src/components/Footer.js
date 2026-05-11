import React from 'react';
import '../assets/Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content portfolio-container">
        <p className="footer-name">© {new Date().getFullYear()} Bhavik Patel. All rights reserved.</p>

        <div className="footer-socials">
          <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:youremail@example.com" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>

      <a href="#home" className="scroll-top" aria-label="Back to top">↑</a>
    </footer>
  );
};

export default Footer;
