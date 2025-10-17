import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import ThreeScene from './threejs/ThreeScene';

const ContactLink = ({ href, icon, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'var(--color-secondary)' }}>
        <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-card-bg)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: '5px' }}>
            <FontAwesomeIcon icon={icon} />
        </div>
        <span style={{ fontSize: '0.9rem' }}>{label}</span>
    </a>
);


const Contact = () => {
    const contactLinks = [
        { href: "mailto:chirag11092004@gmail.com", icon: faEnvelope, label: "Email" },
        { href: "https://github.com/chirag1192004", icon: faGithub, label: "GitHub" },
        { href: "https://linkedin.com/in/chirag-garg-profile", icon: faLinkedin, label: "LinkedIn" },
        { href: "#", icon: faTwitter, label: "Twitter" },
    ];
    return (
        <section id="contact" style={{ paddingTop: '50px', textAlign: 'center', minHeight: '500px', backgroundColor: 'var(--color-section-bg)', position: 'relative' }}>
             <ThreeScene sceneName="contact" containerId="contact-three-container" style={{ opacity: 0.3 }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ marginBottom: '10px' }}>Contact Me</h2>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '40px' }}>
                    Let's connect! You can reach me through any of the platforms below.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '80px' }}>
                    {contactLinks.map(link => <ContactLink key={link.label} {...link} />)}
                </div>
            </div>
        </section>
    );
};

export default Contact;
