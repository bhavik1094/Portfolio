import React, { useState } from 'react';
import '../assets/Navbar.css';
import { DownloadIcon, MoonIcon, SunIcon } from './Icons';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" data-aos="fade-down">
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          Bhavik &nbsp;&nbsp;&nbsp;&nbsp;<span className="logo-accent"></span>
        </a>

        <div className={`nav-links ${isOpen ? 'open' : ''}`} id="primary-navigation">
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#education" onClick={closeMenu}>Education</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>

          <div className="nav-buttons">
            <a
              href={`${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`}
              className="resume-btn"
              download
              onClick={closeMenu}
            >
              <DownloadIcon /> Resume
            </a>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              title="Toggle theme"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        <button
          type="button"
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
