import React, { useState, useEffect, useRef } from 'react';
import ThreeScene from './threejs/ThreeScene';
import * as THREE from 'three';

const Terminal = ({ heroControlsRef, heroMeshRef }) => {
    const [output, setOutput] = useState([]);
    const [input, setInput] = useState('');
    const terminalOutputRef = useRef(null);
    const [path, setPath] = useState('portfolio');

    const printToTerminal = (text, isCommand = false) => {
        const line = isCommand ? `<span style="color:var(--color-primary);">user@chirag-portfolio:~/${path}$</span> ${text}` : text;
        setOutput(prev => [...prev, line]);
    };
    
    useEffect(() => {
        printToTerminal("Welcome to Chirag's Interactive Portfolio CLI (v1.0)");
        printToTerminal("Type 'help' to see available commands.");
    }, []);

    useEffect(() => {
        if (terminalOutputRef.current) {
            terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
        }
    }, [output]);

    const processCommand = (command) => {
        if (!command) return;

        printToTerminal(command, true);
        const parts = command.toLowerCase().split(' ');
        const cmd = parts[0];

        switch(cmd) {
            case 'help':
                printToTerminal("Available Commands:");
                printToTerminal("  ls               - List my portfolio sections (Home, About, Projects, etc.)");
                printToTerminal("  view projects    - Scroll to the featured projects section.");
                printToTerminal("  interact cube    - Toggles the Hero Model interaction (color & speed).");
                printToTerminal("  clear            - Clears the terminal output.");
                printToTerminal("  whoami           - Displays profile summary.");
                break;
            case 'ls':
                printToTerminal("Sections:");
                printToTerminal("  /home            - Hero Section & 3D Model");
                printToTerminal("  /terminal        - Current Interactive CLI");
                printToTerminal("  /about           - Skills & Experience Summary");
                printToTerminal("  /projects        - Featured ML & Web Apps");
                printToTerminal("  /trainings       - DSA & Seminar Experience");
                printToTerminal("  /contact         - Contact Information");
                break;
            case 'view':
                if (parts[1] === 'projects') {
                    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                    printToTerminal("Scrolling to Featured Projects...");
                } else {
                    printToTerminal(`Error: Unknown argument for 'view'. Try 'view projects'.`);
                }
                break;
            case 'interact':
                if (parts[1] === 'cube' && heroMeshRef.current && heroControlsRef.current) {
                    heroControlsRef.current.autoRotate = !heroControlsRef.current.autoRotate;
                    const newColor = new THREE.Color(Math.random() * 0xffffff);
                    heroMeshRef.current.material.color.set(newColor);
                    heroControlsRef.current.autoRotateSpeed = heroControlsRef.current.autoRotate ? Math.random() * 2 + 0.5 : 0;
                    printToTerminal(`Torus Knot updated. Auto-rotate: ${heroControlsRef.current.autoRotate ? 'ON' : 'OFF'}. New Color: #${newColor.getHexString()}.`);
                } else {
                    printToTerminal("Error: Must type 'interact cube' to affect the Hero Model. (Is the Hero section loaded?)");
                }
                break;
            case 'whoami':
                printToTerminal("Name: Chirag Garg");
                printToTerminal("Focus: Data Science, Machine Learning, Fullstack Development");
                printToTerminal("Education: B.Tech Computer Science (7.24 CGPA)");
                printToTerminal("Key Skills: Python, C++, ML, ReactJS, Data Structures");
                break;
            case 'clear':
                setOutput([]);
                break;
            default:
                printToTerminal(`Error: Command '${cmd}' not found. Type 'help' for guidance.`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            processCommand(input.trim());
            setInput('');
        }
    };

    return (
        <section id="terminal-interface">
            <div className="container">
                <h2>Interactive CLI Terminal</h2>
                <div className="terminal-grid">
                    <ThreeScene sceneName="pc" containerId="pc-three-container" />
                    <div className="terminal-window">
                        <div id="terminal-output" ref={terminalOutputRef}>
                            {output.map((line, index) => (
                                <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                        </div>
                        <div id="terminal-input-container">
                            <span id="terminal-prompt">user@chirag-portfolio:~/{path}$</span>
                            <input
                                type="text"
                                id="terminal-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Terminal;
