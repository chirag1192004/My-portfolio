// src/components/UI/Tag.jsx
import React from 'react';
// CSS for.tech-tag is defined globally

export const Tag = ({ children }) => {
    return <span className="tech-tag">{children}</span>;
};

// src/components/UI/Button.jsx (Example)
import React from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Example React Icon import [4]

export const Button = ({ children, type = 'primary', icon = false, href = '#',...props }) => {
    const className = type === 'primary'? 'btn-primary' : 'btn-secondary';
    return (
        <a href={href} className={className} {...props}>
            {children}
            {icon && type === 'primary' && <FaArrowRight style={{ marginLeft: 10 }} />}
        </a>
    );
};