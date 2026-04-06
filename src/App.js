import React, { Suspense, lazy, useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let isMounted = true;

    import('aos').then(({ default: AOS }) => {
      if (isMounted) {
        AOS.init({ duration: 1000, once: true });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
