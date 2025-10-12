// src/components/Sections/HeroSection.jsx
import React, { useRef } from 'react';
import { useHeroTorusKnot } from '../../hooks/scenes/useHeroTorusKnot';
import { useTheme } from '../../context/useTheme';
import { Tag } from '../UI/Tag'; 

export const HeroSection = () => {
    const containerRef = useRef(null);
    const { isDarkMode } = useTheme();
    
    // Pass containerRef and isDarkMode as a dependency
    useHeroTorusKnot(containerRef, isDarkMode); 

    return (
        <section id="home" className="wave-bg">
            <div id="hero-three-container" className="three-container" ref={containerRef}></div>
            {/* Content using Button and Tag components */}
        </section>
    );
};