import React, { useEffect, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CurrentlyWorkingWith from './components/CurrentlyWorkingWith';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import EngineeringMindset from './components/EngineeringMindset';
import Education from './components/Education';
import Achievements from './components/Achievements';
import GitHubActivity from './components/GitHubActivity';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './assets/premium.css';
import './assets/foundation.css';

const getInitialTheme = () => {
  try {
    return localStorage.getItem('portfolioTheme') === 'dark';
  } catch {
    return false;
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#141416' : '#f7f7f3');
    try {
      localStorage.setItem('portfolioTheme', darkMode ? 'dark' : 'light');
    } catch { /* Theme switching still works when storage is unavailable. */ }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reducedMotion ? 'true' : 'false';
  }, [reducedMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">{t('nav.skipContent')}</a>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <CurrentlyWorkingWith />
          <Projects />
          <Experience />
          <Skills />
          <EngineeringMindset />
          <Education />
          <Achievements />
          <GitHubActivity />
          <Contact />
          <Footer />
      </main>
    </MotionConfig>
  );
}

export default App;
