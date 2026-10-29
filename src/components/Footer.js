import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi2';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Editorial';
import '../assets/Footer.css';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return <footer className="p2-footer">
    <div className="portfolio-container">
      <Reveal className="p2-footer-top">
        <a className="p2-footer-signature" href="#home" aria-label="Bhavik Patel">
          <span>Bhavik Patel<span className="p2-footer-dot" aria-hidden="true">.</span></span>
          <small>{t('hero.avatarRole')}</small>
        </a>
        <div className="p2-footer-socials" role="group" aria-label={t('hero.socialLinks')}>
          <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><FaGithub aria-hidden="true" /></a>
          <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin aria-hidden="true" /></a>
          <a href="mailto:bmpatel1994@gmail.com" aria-label={t('contact.email')} title={t('contact.email')}><FaEnvelope aria-hidden="true" /></a>
        </div>
      </Reveal>
      <p className="p2-footer-rights">© {new Date().getFullYear()} {t('footer.rights')}</p>
    </div>
    <AnimatePresence>{showScrollTop && <motion.button className="p2-footer-scroll" type="button" onClick={scrollToTop}
      aria-label={t('footer.backToTop')} title={t('footer.backToTop')}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }} whileHover={reducedMotion ? undefined : { y: -3 }}>
      <HiArrowUp aria-hidden="true" />
    </motion.button>}</AnimatePresence>
  </footer>;
};

export default Footer;
