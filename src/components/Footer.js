import React from 'react';
import '../assets/Footer.css';
import { GitHubIcon, LinkedInIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer-content">
        <p className="footer-name">© {new Date().getFullYear()} Bhavik Patel. All rights reserved.</p>

        <div className="footer-socials">
          <a
            href="https://github.com/bhavik1094"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Bhavik Patel on GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://linkedin.com/in/bhavik1094"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Bhavik Patel on LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>

      <a href="#home" className="scroll-top" aria-label="Scroll back to top">↑</a>
    </footer>
  );
};

export default Footer;
