import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="container" style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: 'var(--color-background)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', color: 'var(--color-secondary)' }}>
                    Chirag Garg: Data & Fullstack Developer
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '40px' }}>
                    Driven by a passion for technology, transforming ideas into reality with strong foundations in engineering principles and collaboration.
                </p>
                <div>
                    <a href="#projects" className="btn-primary" style={{ marginRight: '15px' }}>
                        Explore My Work
                    </a>
                    <a href="#contact" className="btn-secondary">
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
