import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { i18n } = useTranslation();

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
      <AnimatePresence mode="wait">
        <motion.main
          key={i18n.language}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
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
        </motion.main>
      </AnimatePresence>
    </>
  );
}

export default App;
