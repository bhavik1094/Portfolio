import React from 'react';
import '../assets/Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer-content">
        <p className="footer-name">© {new Date().getFullYear()} Bhavik Patel. All rights reserved.</p>

        <div className="footer-socials">
          <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:youremail@example.com">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Optional scroll to top */}
      <a href="#home" className="scroll-top">↑</a>
    </footer>
  );
};

export default Footer;
