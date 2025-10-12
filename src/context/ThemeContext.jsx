// src/context/ThemeContext.jsx
import React, { useState, createContext, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize theme based on a default or local storage preference
    const [isDarkMode, setIsDarkMode] = useState(true);

    // This useEffect synchronizes React state with global DOM class (for CSS vars)
    useEffect(() => {
        const body = document.body;
        if (isDarkMode) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    },);

    const toggleTheme = () => {
        setIsDarkMode(prevMode =>!prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};