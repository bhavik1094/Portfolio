import React, { useState } from 'react';
import '../assets/Contact.css';
import { GitHubIcon, LinkedInIcon } from './Icons';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title text-gradient-orange" data-aos="fade-up">Contact Me</h2>

      <div className="contact-grid" data-aos="fade-up">
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <p>I'm open to freelance work, collaborations, or just a friendly hello.</p>
          <div className="social-icons">
            <a
              href="https://github.com/bhavik1094"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Bhavik Patel on GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/bhavik1094"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Bhavik Patel on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            aria-label="Your name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            aria-label="Your email"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            aria-label="Your message"
            required
          />
          <button type="submit" className="glow-button">
            {submitted ? 'Message Sent' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
