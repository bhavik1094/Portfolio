import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/About.css';

// Keep the player and illustration data out of the initial route bundle.
const AboutIllustration = lazy(() => import('./AboutIllustration'));

const AboutStat = ({ text }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const reducedMotion = useReducedMotion();
  const match = text.match(/^(\d+)(\+?)\s*(.*)$/u);
  const target = match ? Number(match[1]) : 0;
  const count = useMotionValue(reducedMotion ? target : 0);
  const display = useTransform(count, (value) => `${Math.round(value)}${match?.[2] || ''}`);

  useEffect(() => {
    if (reducedMotion) { count.set(target); return undefined; }
    if (!inView || !target) return undefined;
    const controls = animate(count, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reducedMotion, target, count, text]);

  return <div className={`about-stat${match ? '' : ' about-stat-text'}`} ref={ref}>
    <span className="sr-only">{text}</span>
    {match ? <div aria-hidden="true"><motion.strong>{display}</motion.strong><span>{match[3]}</span></div>
      : <strong aria-hidden="true">{text}</strong>}
  </div>;
};

const About = () => {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const illustrationRef = useRef(null);
  const loadIllustration = useInView(illustrationRef, { once: true, margin: '500px 0px' });
  const illustrationVisible = useInView(illustrationRef, { amount: 0.2 });
  const stats = t('about.stats', { returnObjects: true });
  const paragraphs = t('about.paragraphs', { returnObjects: true });

  return <section className="editorial-section p2-about" id="about" aria-labelledby="about-title">
    <div className="portfolio-container">
      <SectionHeading number="01" kicker={t('hero.avatarRole')} title={t('about.title')} id="about-title" />
      <div className="about-editorial-grid">
        <Reveal className="about-visual">
          <div className="about-illustration" ref={illustrationRef} aria-hidden="true">
            {loadIllustration && <Suspense fallback={null}>
              <AboutIllustration reducedMotion={reducedMotion} visible={illustrationVisible} />
            </Suspense>}
          </div>
          <p className="about-availability"><span aria-hidden="true" />{t('about.badge')}</p>
          <a href="#contact" className="editorial-text-link">{t('about.hireMe')}<HiArrowUpRight aria-hidden="true" /></a>
        </Reveal>
        <Reveal className="about-biography" delay={0.08}>
          {paragraphs.map((paragraph, index) => <p className={index === 0 ? 'about-lead' : undefined} key={paragraph}>{paragraph}</p>)}
        </Reveal>
      </div>
      <Reveal className="about-statistics" delay={0.12}>{stats.map((stat) => <AboutStat key={stat} text={stat} />)}</Reveal>
    </div>
  </section>;
};

export default About;
