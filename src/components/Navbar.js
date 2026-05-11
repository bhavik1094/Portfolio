import React, { useState } from 'react';
import '../assets/Navbar.css';
import { FaMoon, FaSun, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const resumePath = '/Bhavik%20M%20Patel%20Resume.pdf';
  const links = [
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.contact'), href: '#contact' },
  ];

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
          {t('nav.brand')}<span className="logo-accent">.</span>
        </a>
        <span className="nav-availability availability-badge">{t('nav.availability')}</span>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}

          <div className="nav-buttons">
            <LanguageSelector />
            <a href={resumePath} className="resume-btn" download>
              <FaDownload /> {t('nav.resume')}
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              title={t('nav.toggleTheme')}
              type="button"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label={t('nav.toggleNavigation')} type="button">
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
