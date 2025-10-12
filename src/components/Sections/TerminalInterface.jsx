// src/components/Sections/TerminalInterface.jsx (Excerpt)
import React, { useRef, useEffect } from 'react';
import { useTerminalLogic } from '../../hooks/useTerminalLogic';
import { usePCTowerModel } from '../../hooks/scenes/usePCTowerModel';

export const TerminalInterface = () => {
    const pcContainerRef = useRef(null);
    const outputRef = useRef(null);

    usePCTowerModel(pcContainerRef);
    const { outputHistory, currentCommand, setCurrentCommand, currentPath, processCommand } = useTerminalLogic(outputRef);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            processCommand(currentCommand);
            // After processing, focus should return to the input for continuous use
            e.target.focus(); 
        }
    };

    return (
        <section id="terminal-interface">
            <div className="container">
                <h2>Interactive CLI Demo</h2>
                <div className="terminal-grid">
                    <div id="pc-three-container" ref={pcContainerRef}></div>
                    <div className="terminal-window">
                        <div id="terminal-output" ref={outputRef}>
                            {outputHistory.map((line, index) => (
                                <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                        </div>
                        <div id="terminal-input-container">
                            <span id="terminal-prompt">user@chirag-portfolio:~/{currentPath}$</span>
                            <input 
                                type="text" 
                                value={currentCommand} 
                                onChange={(e) => setCurrentCommand(e.target.value)} 
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