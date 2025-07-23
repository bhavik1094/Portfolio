import React from 'react';

function About() {
  return (
    <section className="container py-5" id="about">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
          <img
            src="https://avatars.githubusercontent.com/u/85128931?v=4"
            alt="Bhavik Patel"
            className="img-fluid rounded-4 shadow"
          />
        </div>
        <div className="col-md-6" data-aos="fade-left">
          <h2 className="mb-3">About Me</h2>
          <p className="lead">
            I'm a passionate Full Stack Developer with 4+ years of experience building scalable web applications using
            <strong> .NET Core</strong>, <strong>React.js</strong>, and <strong>MongoDB</strong>. I specialize in creating clean, efficient, and responsive applications with robust backend architecture.
          </p>
          <p>
            I enjoy solving complex problems, optimizing code performance, and continuously learning new technologies. Let's build something amazing together.
          </p>
          <a href="#contact" className="btn btn-primary mt-3">Hire Me</a>
        </div>
      </div>
    </section>
  );
}

export default About;
