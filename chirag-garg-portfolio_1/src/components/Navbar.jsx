import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Navbar = ({ toggleTheme }) => {
    return (
        <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px', position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--color-card-bg)', boxShadow: 'var(--color-nav-shadow)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#60a5fa', marginRight: '10px' }}></div>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-secondary)' }}>Chirag Garg</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div id="theme-switch" onClick={toggleTheme}>
                    <FontAwesomeIcon icon={faMoon} className="icon" />
                    <FontAwesomeIcon icon={faSun} className="icon" />
                </div>
                <a href="#home" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s' }}>Home</a>
                <a href="#terminal-interface" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s' }}>Terminal</a>
                <a href="#projects" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s' }}>Projects</a>
                <a href="#skills" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s' }}>Skills</a>
                <a href="#trainings" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s' }}>Trainings</a>
            </div>
            <div>
                <a href="https://linkedin.com/in/chirag-garg-profile" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginLeft: '20px' }}><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/chirag1192004" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginLeft: '20px' }}><FontAwesomeIcon icon={faGithub} /></a>
                <a href="#" style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginLeft: '20px' }}><FontAwesomeIcon icon={faDiscord} /></a>
            </div>
        </nav>
    );
};

export default Navbar;
