import React, { useState } from 'react';
import '../assets/Hero.css';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowRight, HiDownload, HiEye } from 'react-icons/hi';
import ResumeModal from './ResumeModal';
import { useTranslation } from 'react-i18next';

const socials = [
  { href: 'https://github.com/bhavik1094', label: 'GitHub', icon: <FaGithub /> },
  { href: 'https://linkedin.com/in/bhavik1094', label: 'LinkedIn', icon: <FaLinkedin /> },
  { href: 'mailto:bmpatel1994@gmail.com', label: 'Email', icon: <FaEnvelope /> },
];
const resumePath = `${import.meta.env.BASE_URL}Bhavik%20M%20Patel%20Resume.pdf`;
const photoPath = `${import.meta.env.BASE_URL}Bhavik%20Patel%20Photo.jpeg`;

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { t } = useTranslation();
  const techChips = t('hero.tech', { returnObjects: true });
  const avatarPills = t('hero.avatarPills', { returnObjects: true });

  return (
    <section className="hero-section" id="home">
      <motion.div className="blob blob-one" animate={{ y: [0, 28, 0], x: [0, 18, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }} />
      <motion.div className="blob blob-two" animate={{ y: [0, -22, 0], x: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }} />

      <div className="hero-container portfolio-container">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="eyebrow availability-badge">{t('hero.badge')}</span>
          <h1>{t('hero.headline')}</h1>
          <p className="hero-tagline">
            {t('hero.subtext')}
          </p>
          <div className="tech-chip-row">
            {techChips.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
          </div>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">{t('hero.viewProjects')} <HiArrowRight /></a>
            <button className="button button-secondary" onClick={() => setIsResumeOpen(true)} type="button"><HiEye /> {t('hero.previewResume')}</button>
            <a href={resumePath} className="button button-secondary" download><HiDownload /> {t('hero.downloadResume')}</a>
            <a href="#contact" className="button button-ghost">{t('hero.contactMe')}</a>
          </div>
          <div className="hero-socials" aria-label={t('hero.socialLinks')}>
            {socials.map((social) => (
              <a href={social.href} aria-label={social.label} title={social.label} target={social.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="avatar-card glass-card"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.15 },
            scale: { duration: 0.8, delay: 0.15 },
            y: { repeat: Infinity, duration: 6, ease: 'easeInOut' }
          }}
        >
          <div className="avatar-glow" />
          <div className="hero-photo-wrapper">
            <img src={photoPath} alt="Bhavik Patel" className="hero-photo" />
          </div>
          <div className="avatar-meta">
            <span>{t('hero.avatarRole')}</span>
            <strong>{t('hero.avatarStack')}</strong>
          </div>
          <div className="avatar-stack">
            {avatarPills.map((pill) => <span key={pill}>{pill}</span>)}
          </div>
        </motion.div>
      </div>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};

export default Hero;
