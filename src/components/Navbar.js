import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiArrowDownTray } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import '../assets/Navbar.css';

const compactQuery = '(max-width: 1120px)';
const sectionIds = ['home', 'about', 'projects', 'experience', 'skills', 'education', 'contact'];
const resumePath = `${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(() => window.matchMedia(compactQuery).matches);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const compact = smallScreen || scrolled;
  const links = sectionIds.slice(1).map((id) => ({ id, label: t(`nav.${id}`) }));

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 160);
    if (value < 60) setActiveSection('home');
  });

  useEffect(() => {
    const query = window.matchMedia(compactQuery);
    const update = () => { setSmallScreen(query.matches); setIsOpen(false); };
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const visible = new Set();
    let observer;
    let resizeFrame;
    const observeSections = () => {
      observer?.disconnect();
      visible.clear();
      const height = document.documentElement.clientHeight || window.innerHeight;
      const topInset = Math.min(100, Math.max(0, height - 2));
      // IntersectionObserver percentages resolve against width, including vertical
      // margins. Use height-derived pixels so wide screens retain a visible band.
      const bottomInset = Math.max(0, height - Math.max(topInset + 1, Math.round(height * 0.4)));
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
        const current = [...sectionIds].reverse().find((id) => visible.has(id));
        if (current) setActiveSection(current);
      }, { rootMargin: `-${topInset}px 0px -${bottomInset}px 0px`, threshold: 0 });
      sectionIds.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    };
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(observeSections);
    };
    observeSections();
    window.addEventListener('resize', onResize);
    return () => { observer?.disconnect(); cancelAnimationFrame(resizeFrame); window.removeEventListener('resize', onResize); };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus());
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); setIsOpen(false); toggleRef.current?.focus(); }
      if (event.key === 'Tab') {
        const controls = navRef.current?.querySelectorAll('a[href], button, input, [tabindex="0"]');
        const visibleControls = Array.from(controls || []).filter((item) => item.getClientRects().length);
        const first = visibleControls[0];
        const last = visibleControls[visibleControls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const outside = (event) => { if (!navRef.current?.contains(event.target)) setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', outside);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside); };
  }, [isOpen]);

  useEffect(() => { if (!compact) setIsOpen(false); }, [compact]);

  const closeMenu = () => setIsOpen(false);
  const navigate = (event, id) => {
    closeMenu();
    setActiveSection(id);
    // The compact link unmounts when its panel closes. Keep keyboard navigation
    // in reading order at the section instead of dropping focus onto the body.
    if (compact && event.detail === 0) {
      const section = document.getElementById(id);
      const destination = section?.querySelector('h1, h2') || section;
      if (destination) {
        destination.tabIndex = -1;
        destination.setAttribute('data-navigation-focus', '');
        destination.focus({ preventScroll: true });
      }
    }
  };
  const renderLinks = () => links.map(({ id, label }) => <a key={id} href={`#${id}`} className={`site-nav-link ${id === 'contact' ? 'site-nav-contact' : ''}`} aria-current={activeSection === id ? 'location' : undefined} onClick={(event) => navigate(event, id)}>
    <span className="site-nav-label"><span>{label}</span><span aria-hidden="true">{label}</span></span>
  </a>);
  const renderControls = () => <div className="site-nav-controls">
    <LanguageSelector alignMenu={compact ? 'left' : 'right'} />
    <button type="button" className="site-theme-toggle" onClick={() => setDarkMode((value) => !value)} aria-label={t('nav.toggleTheme')} aria-pressed={darkMode} title={t('nav.toggleTheme')}>{darkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}</button>
    <a href={resumePath} download className="site-resume-link"><HiArrowDownTray aria-hidden="true" /><span>{t('nav.resume')}</span></a>
  </div>;

  return (
    <>
      <motion.div className="site-scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <motion.header className={`site-header${compact ? ' is-compact' : ''}${isOpen ? ' is-open' : ''}`} ref={navRef}
        initial={reducedMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <nav className="site-nav" aria-label={t('nav.mainLabel')}>
          <div className="site-nav-top">
            <a className="site-brand" href="#home" onClick={closeMenu} aria-label="Bhavik Patel">
              <img src={`${import.meta.env.BASE_URL}Bhavik%20Patel%20Photo.jpeg`} alt="" width="36" height="36" />
              {!compact && <span>{t('nav.brand')}<span className="site-brand-dot">.</span></span>}
            </a>
            {compact ? <>
              <a className="site-nav-availability" href="#contact" onClick={closeMenu}>{t('nav.availability')}<span aria-hidden="true" /></a>
              <button ref={toggleRef} type="button" className="site-menu-toggle" aria-expanded={isOpen} aria-controls="site-navigation-panel" aria-label={t('nav.toggleNavigation')} onClick={() => setIsOpen((value) => !value)}><span /><span /></button>
            </> : <><div className="site-nav-links">{renderLinks()}</div>{renderControls()}</>}
          </div>
          <AnimatePresence initial={false}>
            {compact && isOpen && <motion.div id="site-navigation-panel" className="site-nav-panel" ref={menuRef}
              initial={reducedMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
              <div className="site-nav-panel-inner"><div className="site-nav-links">{renderLinks()}</div>{renderControls()}</div>
            </motion.div>}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
};

export default Navbar;
