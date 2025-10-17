import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTerminal, faDatabase, faChartBar, faMicrochip, faBrain, faObjectGroup, faGamepad 
} from '@fortawesome/free-solid-svg-icons';
import { 
    faPython, faJs, faHtml5, faCss3Alt, faBootstrap, faReact, faGitAlt, faGithub 
} from '@fortawesome/free-brands-svg-icons';

const SkillIcon = ({ icon }) => (
    <div style={{ textAlign: 'center', fontSize: '3rem', color: 'var(--color-primary)' }}>
        <FontAwesomeIcon icon={icon} />
    </div>
);

const Skills = () => {
    const icons = [
        faTerminal, faPython, faJs, faHtml5, faCss3Alt, faBootstrap,
        faReact, faDatabase, faChartBar, faMicrochip, faGitAlt, faGithub,
        faBrain, faObjectGroup, faGamepad
    ];

    return (
        <section id="skills" style={{ backgroundColor: 'var(--color-section-bg)' }}>
            <div className="container">
                <h2>Technical Skills</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto 80px auto', padding: '40px 0', borderBottom: '1px solid var(--color-tag-bg)' }}>
                    {icons.map((icon, index) => <SkillIcon key={index} icon={icon} />)}
                </div>
                <h3 style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '50px' }}>*Skills listed correspond directly to your Technical Skills section in the resume.</h3>
            </div>
        </section>
    );
};

export default Skills;
