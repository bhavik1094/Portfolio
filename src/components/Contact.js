import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy, FaCheck } from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Reveal, SectionHeading } from './Editorial';
import '../assets/Contact.css';

const emailAddress = 'bmpatel1994@gmail.com';
const emptyForm = { name: '', email: '', message: '' };

export const contactEmailUrl = ({ name, email, message }) => `mailto:${emailAddress}?subject=${encodeURIComponent(`Portfolio Contact from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [hasError, setHasError] = useState(false);
  const pending = useRef(false);
  const mounted = useRef(true);
  const request = useRef(null);
  const timers = useRef({ copy: null, feedback: null });
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current?.abort();
      clearTimeout(timers.current.copy);
      clearTimeout(timers.current.feedback);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setHasError(false);
    setFeedback('');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      if (!mounted.current) return;
      setIsCopied(true);
      clearTimeout(timers.current.copy);
      timers.current.copy = setTimeout(() => setIsCopied(false), 3000);
    } catch {
      if (mounted.current) window.location.href = `mailto:${emailAddress}`;
    }
  };

  const openEmailFallback = () => {
    window.location.href = contactEmailUrl(form);
    setFeedback('fallback');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setHasError(true);
      return;
    }

    pending.current = true;
    setIsSubmitting(true);
    setHasError(false);
    setFeedback('');
    clearTimeout(timers.current.feedback);
    const controller = new AbortController();
    request.current = controller;

    try {
      const response = await fetch('https://formsubmit.co/ajax/bmpatel1994@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      if (!mounted.current) return;
      if (response.ok) {
        setFeedback('sent');
        setForm(emptyForm);
      } else openEmailFallback();
    } catch {
      if (mounted.current && !controller.signal.aborted) openEmailFallback();
    } finally {
      pending.current = false;
      if (mounted.current) {
        setIsSubmitting(false);
        timers.current.feedback = setTimeout(() => setFeedback(''), 4000);
      }
    }
  };

  return <section className="editorial-section p2-contact" id="contact" aria-labelledby="contact-title">
    <div className="portfolio-container">
      <SectionHeading number="09" kicker={t('contact.kicker')} title={t('contact.title')} id="contact-title" />
      <div className="p2-contact-layout">
        <Reveal className="p2-contact-direct">
          <h3>{t('contact.directLinks')}</h3>
          <p>{t('contact.description')}</p>
          <div className="p2-contact-email-row">
            <a href={`mailto:${emailAddress}`} className="p2-contact-email">{emailAddress}</a>
            <button type="button" className="p2-contact-copy" onClick={handleCopyEmail}
              aria-label={isCopied ? t('hero.copied') : t('hero.copyEmail')}
              title={isCopied ? t('hero.copied') : t('hero.copyEmail')}>
              {isCopied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
            </button>
          </div>
          <div className="p2-contact-socials">
            <a href={`mailto:${emailAddress}`}><FaEnvelope aria-hidden="true" />{t('contact.email')}<HiArrowUpRight aria-hidden="true" /></a>
            <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer"><FaLinkedin aria-hidden="true" />{t('contact.linkedIn')}<HiArrowUpRight aria-hidden="true" /></a>
            <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" />{t('contact.github')}<HiArrowUpRight aria-hidden="true" /></a>
          </div>
          <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer" className="editorial-text-link p2-contact-intro-link">
            {t('contact.introLink', 'Book a 15-minute intro on LinkedIn')}<HiArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.08} className="p2-contact-form-wrap">
          <form className="p2-contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting} aria-label={t('contact.send')}>
            <div className="p2-contact-field">
              <label htmlFor="contact-name"><span aria-hidden="true">01 /</span>{t('contact.namePlaceholder')}</label>
              <input id="contact-name" type="text" name="name" autoComplete="name" placeholder={t('contact.namePlaceholder')} value={form.name} onChange={handleChange} required />
            </div>
            <div className="p2-contact-field">
              <label htmlFor="contact-email"><span aria-hidden="true">02 /</span>{t('contact.emailPlaceholder')}</label>
              <input id="contact-email" type="email" name="email" autoComplete="email" placeholder={t('contact.emailPlaceholder')} value={form.email} onChange={handleChange} required />
            </div>
            <div className="p2-contact-field">
              <label htmlFor="contact-message"><span aria-hidden="true">03 /</span>{t('contact.messagePlaceholder')}</label>
              <textarea id="contact-message" name="message" placeholder={t('contact.messagePlaceholder')} rows="4" value={form.message} onChange={handleChange} required />
            </div>
            {hasError && <p className="p2-contact-error" role="alert">{t('contact.requiredError')}</p>}
            <div className="p2-contact-submit-row">
              <button type="submit" className="p2-contact-submit" disabled={isSubmitting}>
                {isSubmitting ? t('contact.sending', 'Sending…') : feedback === 'sent' ? t('contact.sent') : t('contact.send')}
                {feedback === 'sent' ? <FaCheck aria-hidden="true" /> : <HiArrowUpRight aria-hidden="true" />}
              </button>
              <p className="p2-contact-feedback" role="status" aria-live="polite">
                {feedback === 'sent' ? t('contact.sent') : feedback === 'fallback' ? t('contact.fallbackNotice', 'Your email app has opened with your message. Please send it there.') : ''}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
    <p className="sr-only" role="status">{isCopied ? `${t('hero.emailCopied')}: ${emailAddress}` : ''}</p>
    <AnimatePresence>{isCopied && <motion.div className="p2-contact-toast" aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}><FaCheck />{t('hero.emailCopied')}<strong>{emailAddress}</strong></motion.div>}</AnimatePresence>
  </section>;
};

export default Contact;
