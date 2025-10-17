import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ThreeScene from './threejs/ThreeScene';

const Hero = ({ heroControlsRef, heroMeshRef }) => {
    return (
        <section id="home" className="wave-bg">
            <ThreeScene 
                sceneName="hero" 
                containerId="hero-three-container" 
                heroControlsRef={heroControlsRef} 
                heroMeshRef={heroMeshRef} 
            />
            <div id="hero-content" className="container" style={{ textAlign: 'center', padding: '100px 0 150px 0' }}>
                <span style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '20px', padding: '5px 15px', border: '1px solid var(--color-primary)', borderRadius: '20px', fontSize: '0.9rem' }}>
                    New Delhi, India
                </span>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', color: 'var(--color-secondary)' }}>
                    Chirag Garg: Data &<br />Fullstack Developer
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '40px' }}>
                    Driven by a passion for technology, transforming ideas into reality with strong foundations in engineering principles and collaboration.
                </p>
                <div>
                    <a href="#projects" className="btn-primary">
                        Explore My Work <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '10px' }} />
                    </a>
                    <a href="#contact" className="btn-secondary">
                        Contact Me
                    </a>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <span className="tech-tag">Python</span><span className="tech-tag">C++</span><span className="tech-tag">JavaScript</span><span className="tech-tag">ReactJS</span><span className="tech-tag">ML</span><span className="tech-tag">Data Structures</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
