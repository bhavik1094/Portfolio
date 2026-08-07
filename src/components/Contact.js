import React, { useState } from 'react';
import '../assets/Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
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
    } catch (err) {
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
              <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer"><FaLinkedin /> {t('contact.linkedIn')}</a>
              <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer"><FaGithub /> {t('contact.github')}</a>
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
    </section>
  );
};

export default Contact;
