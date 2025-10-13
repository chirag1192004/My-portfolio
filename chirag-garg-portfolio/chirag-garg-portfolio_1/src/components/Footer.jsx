import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-card-bg)', boxShadow: 'var(--color-nav-shadow)', padding: '50px 0 20px 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '50px', borderBottom: '1px solid var(--color-tag-bg)', paddingBottom: '30px', marginBottom: '20px' }}>
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '10px', color: 'var(--color-secondary)' }}>Chirag Garg</h4>
                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Strong foundation in engineering principles, aiming to contribute to meaningful initiatives that foster growth and innovation.</p>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '10px', color: 'var(--color-secondary)' }}>Quick Links</h4>
                        <a href="#home" style={{ textDecoration: 'none', color: 'var(--color-text-light)', marginBottom: '8px', display: 'block' }}>Home</a>
                        <a href="#about" style={{ textDecoration: 'none', color: 'var(--color-text-light)', marginBottom: '8px', display: 'block' }}>About</a>
                        <a href="#projects" style={{ textDecoration: 'none', color: 'var(--color-text-light)', marginBottom: '8px', display: 'block' }}>Projects</a>
                        <a href="#trainings" style={{ textDecoration: 'none', color: 'var(--color-text-light)', marginBottom: '8px', display: 'block' }}>Trainings</a>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '10px', color: 'var(--color-secondary)' }}>Get in Touch</h4>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '8px', display: 'flex', alignItems: 'center' }}><FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginRight: '15px' }} /> chirag11092004@gmail.com</p>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '15px', display: 'flex', alignItems: 'center' }}><FontAwesomeIcon icon={faGlobe} style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginRight: '15px' }} /> New Delhi, India</p>
                        <div style={{ marginTop: '10px' }}>
                            <a href="https://linkedin.com/in/chirag-garg-profile" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginRight: '15px', textDecoration: 'none' }}><FontAwesomeIcon icon={faLinkedin} /></a>
                            <a href="https://github.com/chirag1192004" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginRight: '15px', textDecoration: 'none' }}><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginRight: '15px', textDecoration: 'none' }}><FontAwesomeIcon icon={faDiscord} /></a>
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>© 2025 Chirag Garg Portfolio. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
