import React, { useState } from 'react';
import '../assets/Navbar.css';
import { FaMoon, FaSun, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const resumePath = '/Bhavik%20M%20Patel%20Resume.pdf';
  const links = ['Projects', 'Skills', 'Experience', 'Education', 'Contact'];

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          Bhavik<span className="logo-accent">.</span>
        </a>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link} onClick={closeMenu}>
              {link}
            </a>
          ))}

          <div className="nav-buttons">
            <a href={resumePath} className="resume-btn" download>
              <FaDownload /> Resume
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              title="Toggle theme"
              type="button"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation" type="button">
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
