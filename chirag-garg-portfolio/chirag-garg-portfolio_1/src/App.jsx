import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Trainings from './components/Trainings';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Helper component for the custom cursor effect
const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div id="cursor-follower" style={{ left: `${position.x}px`, top: `${position.y}px` }}></div>;
};

function App() {
  // State for theme management
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Refs for the Hero Model controls and mesh, used by the Terminal component for interaction
  const heroControlsRef = useRef(null);
  const heroMeshRef = useRef(null);

  useEffect(() => {
    // Apply dark theme class to the body element
    document.body.className = isDarkMode ? 'dark-theme' : '';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <CursorFollower />
      <Navbar toggleTheme={toggleTheme} />
      <main>
        {/* Pass refs to Hero and Terminal for cross-component 3D control */}
        <Hero heroControlsRef={heroControlsRef} heroMeshRef={heroMeshRef} />
        <Terminal heroControlsRef={heroControlsRef} heroMeshRef={heroMeshRef} />
        <About />
        <Projects />
        <Skills />
        <Trainings />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
