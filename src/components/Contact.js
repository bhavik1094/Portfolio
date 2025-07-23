import React from 'react';
import '../assets/Contact.css';

function Contact() {
  return (
    <section id="contact" className="py-5">
      <div className="container" data-aos="fade-up">
        <h2 className="section-title text-center mb-5">
          <span className="text-gradient">📬 Contact Me</span>
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="p-4 shadow-lg rounded-4 bg-white contact-form">
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input type="text" className="form-control" placeholder="Your Name" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" placeholder="Your Email" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4 py-2 rounded-pill">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
