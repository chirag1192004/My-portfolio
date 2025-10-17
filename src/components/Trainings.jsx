import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Trainings = () => {
    return (
        <section id="trainings" className="container" style={{ backgroundColor: 'var(--color-background)' }}>
            <h2>Seminars & Trainings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
                <div className="training-card card">
                    <div style={{ marginBottom: '15px' }}>
                        <FontAwesomeIcon icon={faGraduationCap} style={{ float: 'right', fontSize: '1.5rem', color: 'var(--color-primary)' }} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-secondary)' }}>Data Structure and Algorithm</h3>
                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Coding Blocks</p>
                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.8rem', marginTop: '5px' }}>Duration: 13 May 2023 - 16 Nov 2023</p>
                    </div>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', marginBottom: '15px' }}>Covered optimization techniques. Gained hands-on experience and improved coding skills and logic building speed.</p>
                    <div>
                        <span className="tech-tag">Algorithms</span>
                        <span className="tech-tag">Data Structures</span>
                        <span className="tech-tag">C++</span>
                        <span className="tech-tag">Optimization Techniques</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trainings;
