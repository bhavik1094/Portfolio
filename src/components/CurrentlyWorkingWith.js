import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { HiPause, HiPlay } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Editorial';
import '../assets/CurrentlyWorkingWith.css';

const CurrentlyWorkingWith = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef);
  const reduceMotion = useReducedMotion();
  const progress = useRef(0);
  const x = useMotionValue('0%');
  const { t } = useTranslation();
  const technologies = t('working.technologies', { returnObjects: true });

  useAnimationFrame((_, delta) => {
    if (reduceMotion || isPaused || isHovered || isFocused || !isVisible) return;
    progress.current = (progress.current + delta * 50 / 26000) % 50;
    x.set(`${-progress.current}%`);
  });

  return (
    <section className="p2-working" id="working-with" ref={sectionRef} aria-labelledby="working-title">
      <div className="portfolio-container">
        <Reveal className="working-heading">
          <div><p className="editorial-eyebrow">{t('working.kicker')}</p><h2 id="working-title">{t('working.title')}</h2></div>
          {!reduceMotion && <button type="button" className="working-pause" aria-label={t(isPaused ? 'working.resume' : 'working.pause')} title={t(isPaused ? 'working.resume' : 'working.pause')} aria-pressed={isPaused} onClick={() => setIsPaused((paused) => !paused)}>{isPaused ? <HiPlay aria-hidden="true" /> : <HiPause aria-hidden="true" />}</button>}
        </Reveal>

        <div
          className="working-marquee"
          aria-label={t('working.ariaLabel')}
          tabIndex={reduceMotion ? undefined : 0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <motion.div
            className="working-track"
            style={reduceMotion ? { x: 0, width: '100%' } : { x }}
          >
            {(reduceMotion ? [0] : [0, 1]).map((copy) => <div className={`working-group${reduceMotion ? ' is-static' : ''}`} key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {technologies.map((tech) => <span className="working-technology" key={tech}>{tech}</span>)}
            </div>)}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyWorkingWith;
