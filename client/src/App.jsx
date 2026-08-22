import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackgroundClouds from './components/BackgroundClouds/BackgroundClouds';
import MoreAbout from './components/MoreAbout/MoreAbout';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#more-about' ? 'more-about' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#more-about') {
        setCurrentView('more-about');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (currentView === 'home') {
      const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      };

      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [currentView]);

  const handleNavigate = (view, anchor) => {
    if (view === 'more-about') {
      setCurrentView('more-about');
      window.history.pushState(null, '', '#more-about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      if (anchor) {
        window.history.pushState(null, '', anchor);
        setTimeout(() => {
          const el = document.querySelector(anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.history.pushState(null, '', '#home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app">
      <BackgroundClouds />
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      <main>
        {currentView === 'more-about' ? (
          <MoreAbout onBack={() => handleNavigate('home', '#about')} />
        ) : (
          <>
            <Hero />
            <About onMoreAboutClick={() => handleNavigate('more-about')} />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
