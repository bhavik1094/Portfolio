import React, { useState, useEffect } from 'react';
import '../assets/Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content portfolio-container">
        <p className="footer-name">© {new Date().getFullYear()} Bhavik Patel. {t('footer.rights')}</p>

        <div className="footer-socials">
          <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="mailto:bmpatel1994@gmail.com" aria-label="Email"><FaEnvelope /></a>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="floating-scroll-top"
            onClick={scrollToTop}
            aria-label={t('footer.backToTop')}
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
