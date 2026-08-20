import React, { useState, useEffect } from 'react';
import '../assets/Navbar.css';
import { FaMoon, FaSun, FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useTranslation();
  const resumePath = `${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`;
  const links = [
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const sectionIds = ['home', 'projects', 'skills', 'experience', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className="nav-scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />
      <div className="navbar-container">
        <div className="navbar-brand-group">
          <a href="#home" className="logo" onClick={closeMenu}>
            {t('nav.brand')}<span className="logo-accent">.</span>
          </a>
          <span className="nav-availability availability-badge">{t('nav.availability')}</span>
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {links.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                href={link.href}
                key={link.href}
                className={isActive ? 'active' : ''}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            );
          })}
        </div>

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
