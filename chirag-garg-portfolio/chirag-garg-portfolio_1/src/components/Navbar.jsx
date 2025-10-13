import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
    return (
        <nav className="container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'var(--color-background)',
            boxShadow: 'var(--color-nav-shadow)',
            borderBottom: '1px solid var(--color-border-glow)'
        }}>
            {/* Logo / Name */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', marginRight: '10px' }}></div>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-secondary)' }}>Chirag Garg</span>
            </div>
            
            {/* Navigation Links */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <a href="#home" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s', fontSize: '0.95rem' }}>Home</a>
                <a href="#about" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s', fontSize: '0.95rem' }}>About</a>
                <a href="#projects" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s', fontSize: '0.95rem' }}>Projects</a>
                <a href="#contact" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: 600, margin: '0 15px', transition: 'color 0.2s', fontSize: '0.95rem' }}>Contact</a>
            </div>
            
            {/* Social Icons */}
            <div>
                <a href="https://linkedin.com/in/chirag-garg-profile" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginLeft: '20px' }}>
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/chirag1192004" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginLeft: '20px' }}>
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="#" style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginLeft: '20px' }}>
                    <FontAwesomeIcon icon={faDiscord} />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
