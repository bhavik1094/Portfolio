import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaCheck, FaCopy, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowDown, HiArrowUpRight, HiArrowDownTray, HiEye } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import ResumeModal from './ResumeModal';
import '../assets/Hero.css';

const resumePath = `${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`;
const photoPath = `${import.meta.env.BASE_URL}Bhavik%20Patel%20Photo.jpeg`;
const emailAddress = 'bmpatel1994@gmail.com';
const socials = [
  { href: 'https://github.com/bhavik1094', label: 'GitHub', icon: FaGithub },
  { href: 'https://linkedin.com/in/bhavik1094', label: 'LinkedIn', icon: FaLinkedin },
  { href: `mailto:${emailAddress}`, label: 'Email', icon: FaEnvelope },
];
const ease = [0.22, 1, 0.36, 1];

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [canParallax, setCanParallax] = useState(false);
  const sectionRef = useRef(null);
  const copyTimer = useRef(null);
  const { t, i18n } = useTranslation();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const portraitY = useTransform(smoothProgress, [0, 1], [0, 28]);
  const portraitRotate = useTransform(smoothProgress, [0, 1], [0, -1.25]);
  const imageY = useTransform(smoothProgress, [0, 1], [0, -6]);
  const backplateY = useTransform(smoothProgress, [0, 1], [0, -14]);
  const backplateRotate = useTransform(smoothProgress, [0, 1], [2, 3.5]);
  const parallaxEnabled = canParallax && !reducedMotion;
  const tech = t('hero.tech', { returnObjects: true });
  const capabilities = t('hero.avatarPills', { returnObjects: true });

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1000px) and (hover: hover)');
    const update = () => setCanParallax(query.matches);
    update();
    query.addEventListener('change', update);
    return () => { query.removeEventListener('change', update); clearTimeout(copyTimer.current); };
  }, []);

  // Fit translated display words to their column after font loading and resizing.
  // Keep scripts intact rather than splitting characters or clipping long words.
  useEffect(() => {
    const masks = Array.from(sectionRef.current?.querySelectorAll('.hero-type-mask') || []);
    let cancelled = false;
    let frame;
    let previousWidths = '';
    const fit = () => {
      if (cancelled) return;
      masks.forEach((mask) => mask.style.setProperty('--hero-word-scale', '1'));
      // Share the fitted size so both title halves retain the same visual weight.
      const scale = masks.reduce((smallest, mask) => {
        const word = mask.querySelector('.hero-word');
        const available = mask.clientWidth;
        const width = word?.getBoundingClientRect().width || 0;
        return available && width ? Math.min(smallest, (available - 2) / width) : smallest;
      }, 1);
      masks.forEach((mask) => mask.style.setProperty('--hero-word-scale', String(scale)));
    };
    const observer = new ResizeObserver((entries) => {
      const widths = entries.map((entry) => entry.contentRect.width).join(',');
      if (widths === previousWidths) return;
      previousWidths = widths;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    });
    masks.forEach((mask) => observer.observe(mask));
    fit();
    document.fonts?.ready.then(fit);
    return () => { cancelled = true; cancelAnimationFrame(frame); observer.disconnect(); };
  }, [i18n.language]);

  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : delay, ease },
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setIsCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setIsCopied(false), 3000);
    } catch {
      window.location.href = `mailto:${emailAddress}`;
    }
  };

  return (
    <section className="editorial-hero" id="home" ref={sectionRef} aria-labelledby="hero-title">
      <div className="portfolio-container">
        <div className="hero-stage" data-language={i18n.resolvedLanguage}>
          <h1 id="hero-title" className="hero-title" aria-label={`${t('hero.displayFirst')} ${t('hero.displaySecond')}`}>
            <span className="hero-title-half hero-title-first" aria-hidden="true">
              <motion.span className="hero-person-name" {...reveal(0.1)}>Bhavik Patel</motion.span>
              <span className="hero-type-mask"><motion.span key={`${i18n.language}-first`} {...reveal(0.18)}><span className="hero-word">{t('hero.displayFirst')}</span></motion.span></span>
            </span>
            <span className="hero-title-half hero-title-second" aria-hidden="true">
              <span className="hero-type-mask"><motion.span key={`${i18n.language}-second`} {...reveal(0.32)}><span className="hero-word">{t('hero.displaySecond')}</span></motion.span></span>
            </span>
          </h1>
          <motion.figure className="hero-portrait" {...reveal(0.12)}>
            <motion.div className="hero-portrait-backplate" aria-hidden="true"
              style={parallaxEnabled ? { y: backplateY, rotate: backplateRotate } : undefined} />
            <motion.div className="hero-portrait-parallax" style={parallaxEnabled ? { y: portraitY, rotate: portraitRotate } : undefined}>
              <motion.div className="hero-portrait-window"
                initial={reducedMotion ? false : { clipPath: 'inset(6% 0 6% 0 round 18px)' }}
                animate={{ clipPath: 'inset(0% 0 0% 0 round 18px)' }} transition={{ duration: 1.1, ease }}>
                <motion.img src={photoPath} alt="Bhavik Patel" width="1086" height="1448" fetchPriority="high" decoding="async"
                  style={parallaxEnabled ? { y: imageY } : undefined}
                  initial={reducedMotion ? false : { scale: 1.08 }} animate={{ scale: 1.035 }} transition={{ duration: 1.2, ease }} />
              </motion.div>
              <motion.a href="#contact" className="hero-hello" aria-label={t('hero.contactMe')}
                whileHover={reducedMotion ? undefined : { rotate: -12, scale: 1.05 }}><span aria-hidden="true">↗</span></motion.a>
            </motion.div>
            <figcaption className="sr-only">{t('hero.avatarRole')} · {t('hero.avatarStack')}</figcaption>
          </motion.figure>
          <motion.div className="hero-introduction" {...reveal(0.48)}>
            <p className="hero-positioning">{t('hero.headline')}</p>
            <a className="hero-work-link" href="#projects">{t('hero.viewProjects')} <HiArrowUpRight aria-hidden="true" /></a>
          </motion.div>
        </div>
        <motion.div className="hero-detail-row" {...reveal(0.58)}>
          <div className="hero-detail-copy">
            <p className="hero-status"><span aria-hidden="true" />{t('hero.badge')}</p>
            <p className="hero-description">{t('hero.subtext')}</p>
            <ul className="hero-capabilities" aria-label={t('hero.avatarRole')}>{capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="hero-utilities">
            <div className="hero-resume-actions">
              <button type="button" className="hero-preview-button" onClick={() => setIsResumeOpen(true)}><HiEye aria-hidden="true" />{t('hero.previewResume')}</button>
              <a className="hero-utility-link" href={resumePath} download title={t('hero.downloadResume')}><HiArrowDownTray aria-hidden="true" /><span className="sr-only">{t('hero.downloadResume')}</span></a>
            </div>
            <div className="hero-connect-row">
              <div className="hero-social-links" aria-label={t('hero.socialLinks')}>{socials.map(({ href, label, icon: Icon }) => <a href={href} key={label} aria-label={label} title={label} target={href.startsWith('https') ? '_blank' : undefined} rel="noreferrer"><Icon aria-hidden="true" /></a>)}</div>
              <button type="button" className="hero-copy-button" onClick={copyEmail} title={isCopied ? t('hero.copied') : t('hero.copyEmail')}>{isCopied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}<span className="sr-only">{isCopied ? t('hero.copied') : t('hero.copyEmail')}</span></button>
            </div>
          </div>
        </motion.div>
        <motion.div className="hero-baseline" {...reveal(0.65)}>
          <ul className="hero-tech-list" aria-label={t('hero.avatarStack')}>{tech.map((item) => <li key={item}>{item}</li>)}</ul>
          <a className="hero-scroll-link" href="#about">{t('hero.scrollLabel')}<HiArrowDown aria-hidden="true" /></a>
        </motion.div>
      </div>
      <div className="hero-announcement sr-only" role="status">{isCopied ? `${t('hero.emailCopied')}: ${emailAddress}` : ''}</div>
      <AnimatePresence>{isCopied && <motion.div className="editorial-toast" aria-hidden="true" {...reveal()} exit={{ opacity: 0 }}><FaCheck />{t('hero.emailCopied')}<span>{emailAddress}</span></motion.div>}</AnimatePresence>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};

export default Hero;
