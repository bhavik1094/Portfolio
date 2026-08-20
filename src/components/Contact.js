import React, { useState } from 'react';
import '../assets/Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy, FaCheck, FaCalendarCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const emailAddress = 'bmpatel1994@gmail.com';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      window.location.href = `mailto:${emailAddress}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError(t('contact.requiredError'));
      return;
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/bmpatel1994@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Contact from ${form.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setError('');
        setForm({ name: '', email: '', message: '' });
      } else {
        window.location.href = `mailto:bmpatel1994@gmail.com?subject=${encodeURIComponent(`Portfolio Contact from ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
        setSubmitted(true);
      }
    } catch {
      window.location.href = `mailto:bmpatel1994@gmail.com?subject=${encodeURIComponent(`Portfolio Contact from ${form.name}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
      setSubmitted(true);
    }

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">{t('contact.kicker')}</span>
          <h2 className="section-title text-gradient-blue">{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div className="contact-grid" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="contact-info glass-card" whileHover={{ y: -4 }}>
            <h3>{t('contact.directLinks')}</h3>
            <p>{t('contact.description')}</p>
            
            <div className="social-icons">
              <a href="mailto:bmpatel1994@gmail.com"><FaEnvelope /> {t('contact.email')}</a>
              <button type="button" className="copy-contact-pill" onClick={handleCopyEmail}>
                {isCopied ? <><FaCheck style={{ color: '#2dd4bf' }} /> Copied!</> : <><FaCopy /> Copy bmpatel1994@gmail.com</>}
              </button>
              <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer"><FaLinkedin /> {t('contact.linkedIn')}</a>
              <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer"><FaGithub /> {t('contact.github')}</a>
              <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer" className="schedule-pill">
                <FaCalendarCheck /> Book 15-Min Intro on LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.form className="contact-form glass-card" onSubmit={handleSubmit} whileHover={{ y: -4 }}>
            <input type="text" name="name" placeholder={t('contact.namePlaceholder')} value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder={t('contact.emailPlaceholder')} value={form.email} onChange={handleChange} required />
            <textarea name="message" placeholder={t('contact.messagePlaceholder')} rows="5" value={form.message} onChange={handleChange} required />
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="button button-primary glow-button">
              {submitted ? t('contact.sent') : t('contact.send')}
            </button>
          </motion.form>
        </motion.div>
      </div>

      <AnimatePresence>
        {isCopied && (
          <motion.div
            className="copy-toast"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <FaCheck /> Email copied: <strong>{emailAddress}</strong>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
