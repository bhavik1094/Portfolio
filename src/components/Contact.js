import React, { useState } from 'react';
import '../assets/Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }

    console.log('Form submitted:', form);
    setSubmitted(true);
    setError('');

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="portfolio-container">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-kicker">Available Remotely</span>
          <h2 className="section-title text-gradient-blue">Let&apos;s build something scalable together.</h2>
          <p>I&apos;m available for remote full-stack roles where React, .NET, secure APIs, and AI automation matter.</p>
        </motion.div>

        <motion.div className="contact-grid" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
          <div className="contact-info glass-card">
            <h3>Direct links</h3>
            <p>Reach out for senior full-stack roles, SaaS product work, API platforms, or AI workflow automation.</p>
            <div className="social-icons">
              <a href="mailto:youremail@example.com"><FaEnvelope /> Email</a>
              <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
              <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Your Message" rows="5" value={form.message} onChange={handleChange} required />
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="glow-button">
              {submitted ? 'Message Sent' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
