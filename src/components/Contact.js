import React, { useState } from 'react';
import '../assets/Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    // You can replace this with real email service like EmailJS/Formspree
    console.log('Form submitted:', form);
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
        {/* Left Side (Optional Image or Socials) */}
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <p>I’m open to freelance work, collaborations, or just a friendly hello.</p>
          <div className="social-icons">
            <a href="https://github.com/bhavik1094" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com/in/bhavik1094" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="mailto:youremail@example.com"><FaEnvelope /></a>
          </div>
        </div>

        {/* Right Side (Form) */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="glow-button">
            {submitted ? 'Message Sent 🎉' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
