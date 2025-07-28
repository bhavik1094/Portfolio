import React, { useState } from 'react';
import '../assets/Navbar.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun, FaDownload } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar" data-aos="fade-down">
      <div className="navbar-container">
        <a href="#home" className="logo">
          Bhavik &nbsp;&nbsp;&nbsp;&nbsp;<span className="logo-accent"></span>
        </a>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>

          <div className="nav-buttons">
            <a href="/Bhavik_Patel_Resume.pdf" className="resume-btn" download>
              <FaDownload /> Resume
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              title="Toggle theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
