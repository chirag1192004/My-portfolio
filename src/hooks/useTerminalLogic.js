// src/hooks/useTerminalLogic.js (Simplified structure)
import { useState, useEffect } from 'react';

//... command definitions (HELP_MESSAGE, WHOAMI_MESSAGE, etc.)

export const useTerminalLogic = (outputRef) => {
    const [outputHistory, setOutputHistory] = useState();
    const [currentCommand, setCurrentCommand] = useState('');
    const [currentPath, setCurrentPath] = useState('portfolio');

    // Effect for auto-scrolling the output view after any state update
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [outputHistory]);

    const processCommand = (command) => {
        // 1. Add command to history
        const newHistory = [...outputHistory, `user@chirag-portfolio:~/${currentPath}$ ${command}`];
        
        // 2. Command processing logic (switch statement)
        const cmd = command.toLowerCase().split(' ');
        //... (Logic for 'help', 'ls', 'whoami', 'clear' updates newHistory)

        // Special case: 'view projects' must trigger imperative scroll
        if (cmd === 'view' && command.toLowerCase().includes('projects')) {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            newHistory.push("Scrolling to Featured Projects...");
        }
        
        setOutputHistory(newHistory);
        setCurrentCommand(''); // Controlled input reset [15]
    };

    return { 
        outputHistory, 
        currentCommand, 
        setCurrentCommand, 
        currentPath, 
        processCommand 
    };
}; 