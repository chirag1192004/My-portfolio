// src/components/Layout/NavBar.jsx (Excerpt)
import React from 'react';
import { useTheme } from '../../context/useTheme';
import { FaMoon, FaSun, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

export const NavBar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav>
            {/* Title and Links */}
            <div onClick={toggleTheme} id="theme-switch" style={{ pointerEvents: 'auto' }}>
                <FaMoon className={isDarkMode? 'active' : ''} />
                <FaSun className={!isDarkMode? 'active' : ''} />
            </div>
            {/* Social Icons using react-icons */}
            <a href="..." target="_blank"><FaLinkedin /></a>
            <a href="..." target="_blank"><FaGithub /></a>
            <a href="#"><FaDiscord /></a>
        </nav>
    );
};