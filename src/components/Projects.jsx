import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCloud, faCode } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ icon, color, title, description, link, tags }) => (
    <div className="project-card card">
        <div>
            <div className="icon-wrapper" style={{ backgroundColor: 'var(--color-project-icon-bg)', color }}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px', color: 'var(--color-secondary)' }}>{title}</h3>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '20px' }}>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                View on GitHub &rarr;
            </a>
        </div>
        <div>{tags.map(tag => <span key={tag} className="tech-tag">{tag}</span>)}</div>
    </div>
);


const Projects = () => {
    const projectData = [
        {
            icon: faChartLine,
            color: "#48bb78",
            title: "Loan Approval Prediction",
            description: "Automated loan approval process. Achieved a high accuracy of 94% by considering credit score and financial details. Addressed data imbalance using resampling and cost-sensitive learning, improving results by 13%.",
            link: "https://github.com/chirag1192004/ML/tree/main/Loan%20Approval",
            tags: ["Python", "ML", "Fintech"]
        },
        {
            icon: faCloud,
            color: "#63b3ed",
            title: "Weather Forecasting Web App",
            description: "Designed an interactive, full-stack, user-friendly interface using concept of machine learnning for introducing payment portal risky payment flagging by accuracy of 62 percent",
            link: "https://github.com/chirag1192004/Payment_Portal",
            tags: ["python", "streamlit" , "sql" , "UI/UX"]
        },
        {
            icon: faCode,
            color: "#f6ad55",
            title: "https://github.com/chirag1192004/ML",
            description: "a streamlit based ML directory consist some of my machine learning projects with code and explanation that directly launch the projects in streamlit app dicrising time and effort of user to run the project locally by 35 percent",
            link: "https://github.com/chirag1192004/ML",
            tags: ["python", "streamlit", "ML"]
        }
    ];

    return (
        <section id="projects" className="container" style={{ backgroundColor: 'var(--color-background)' }}>
            <h2>Featured Projects</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '50px' }}>Showcasing key development and machine learning initiatives</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {projectData.map(proj => <ProjectCard key={proj.title} {...proj} />)}
            </div>
        </section>
    );
};

export default Projects;
