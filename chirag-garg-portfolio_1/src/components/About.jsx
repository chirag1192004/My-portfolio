import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCode, faLaptopCode, faTerminal, faDatabase, faChartBar, faCogs } from '@fortawesome/free-solid-svg-icons';
import ThreeScene from './threejs/ThreeScene';

const SkillBar = ({ icon, name, percentage }) => (
    <div className="skill-bar-container">
        <div className="skill-bar-header">
            <span><FontAwesomeIcon icon={icon} className="icon" />{name}</span>
            <span>{percentage}%</span>
        </div>
        <div className="skill-bar">
            <div className="skill-progress" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const About = () => {
    const skills = [
        { icon: faBrain, name: "Data Structures & Algo", percentage: 90 },
        { icon: faCode, name: "Machine Learning", percentage: 85 },
        { icon: faLaptopCode, name: "Web Development", percentage: 80 },
        { icon: faTerminal, name: "Scripting (Python/JS)", percentage: 88 },
        { icon: faDatabase, name: "Database Management (SQL)", percentage: 75 },
        { icon: faChartBar, name: "Dashboarding (BI)", percentage: 70 },
        { icon: faCogs, name: "Version Control (Git)", percentage: 85 },
    ];

    const stats = [
        { value: "7.24", label: "B.Tech CGPA" },
        { value: "94%", label: "Prediction Accuracy" },
        { value: "33%", label: "Efficiency Increase" },
        { value: "2X", label: "Troubleshooting Ability" },
    ];

    return (
        <section id="about" style={{ backgroundColor: 'var(--color-section-bg)' }}>
            <div className="container">
                <h2>About Me</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <h3 style={{ marginBottom: '10px' }}>Summary & Philosophy</h3>
                        <p style={{ marginBottom: '20px' }}>
                            I am driven by a passion for technology and committed to impactful solutions, embracing a strong foundation in engineering principles. I demonstrate skills in problem-solving and collaboration, with an eagerness to learn and adapt to transform ideas into reality.
                        </p>
                        <h3 style={{ marginBottom: '10px' }}>Core Expertise Highlights</h3>
                        <p>
                            I have hands-on experience with <b>algorithms and data structures</b>, mastering efficiency skills which led to a <b>33% increase</b> in my workload reduction skill. My domain knowledge includes OOPS, Machine Learning, and version control (Git/Github).
                        </p>
                    </div>
                    <div className="card" style={{ gridColumn: 'span 1' }}>
                        <h3 style={{ marginBottom: '25px', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-secondary)' }}>Technical Expertise</h3>
                        {skills.map(skill => <SkillBar key={skill.name} {...skill} />)}
                    </div>

                    <div style={{ position: 'relative', overflow: 'hidden', gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '30px' }}>
                         <ThreeScene sceneName="data" containerId="data-three-container" style={{ height: '100px', gridColumn: '1 / -1', opacity: 0.2, transform: 'translateY(-30%)' }} />

                        {stats.map(stat => (
                            <div key={stat.label} className="card" style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '20px 10px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>{stat.value}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
