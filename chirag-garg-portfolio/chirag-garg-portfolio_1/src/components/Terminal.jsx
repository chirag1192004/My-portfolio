import React, { useState, useEffect, useRef, useCallback } from 'react';

const Terminal = ({ threeContainerRef, meshRef }) => {
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const outputRef = useRef(null);
    const inputRef = useRef(null);
    
    const GITHUB_USER = 'chirag1192004';
    const GITHUB_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;

    // --- Core Commands ---
    const commands = {
        help: () => [
            "Available Commands:",
            "  help          - Display this message.",
            "  whoami        - Display profile and welcome message.",
            "  repos         - Fetch and list latest GitHub repositories.",
            "  clear         - Clear the terminal output.",
            "  interact      - Toggle 3D monitor rotation (Type 'interact on' or 'interact off')."
        ],
        whoami: () => [
            `<div class="crt-profile-image"></div>`,
            `<span style="font-size: 1.5em; color: var(--crt-text); margin-bottom: 5px;">Hi there,</span>`,
            `<span style="font-size: 2.5em; margin-bottom: 10px; display: block;"><span class="crt-intro-highlight">I'M CHIRAG</span></span>`,
            `  * Software Engineer`,
            `  * Tech Enthusiast`,
            ``,
            `Welcome to CG-Linux 1.0 LTS`,
            `>> Scroll or type "help" to get started.`
        ],
        clear: () => [], // Handled separately
        interact: (args) => {
            const toggle = args[0];
            if (!meshRef || !meshRef.current || !meshRef.current.parent) {
                return ["Error: 3D scene not initialized."];
            }
            const controls = meshRef.current.parent.userData.controls;
            
            if (toggle === 'on') {
                controls.autoRotate = true;
                return ["Auto-rotate ON. Use mouse to control view."];
            } else if (toggle === 'off') {
                controls.autoRotate = false;
                return ["Auto-rotate OFF. View is fixed."];
            } else {
                controls.autoRotate = !controls.autoRotate;
                return [`Auto-rotate Toggled: ${controls.autoRotate ? 'ON' : 'OFF'}`];
            }
        },
        repos: async () => {
            try {
                const response = await fetch(GITHUB_URL);
                if (!response.ok) {
                    throw new Error(`GitHub API returned status ${response.status}`);
                }
                const data = await response.json();
                
                const output = [
                    "Fetching repositories...",
                    "--------------------------------------------------",
                    "NAME                   | STARS | LANGUAGE | DATE",
                    "--------------------------------------------------"
                ];
                
                // Sort by stargazers_count descending and slice top 5
                data.sort((a, b) => b.stargazers_count - a.stargazers_count);
                data.slice(0, 5).forEach(repo => {
                    output.push(
                        `${repo.name.padEnd(20)} | ${String(repo.stargazers_count).padEnd(5)} | ${String(repo.language || 'N/A').padEnd(8)} | ${new Date(repo.updated_at).toLocaleDateString()}`
                    );
                });
                
                output.push("--------------------------------------------------");
                output.push(`Total Repositories: ${data.length}. Displaying top 5.`);

                return output;

            } catch (error) {
                console.error("GitHub fetch error:", error);
                return [`Error fetching GitHub data: ${error.message}`];
            }
        }
    };
    
    // --- Initial Welcome Message ---
    useEffect(() => {
        // Initial setup for the 3D terminal content
        if (threeContainerRef.current) {
            threeContainerRef.current.style.opacity = 1;
        }

        const initialOutput = commands.whoami();
        setHistory(initialOutput.map(line => ({ type: 'output', text: line })));
        inputRef.current?.focus();
    }, [commands, threeContainerRef]);

    // --- Auto Scroll ---
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);
    
    // --- Command Processing ---
    const handleCommand = useCallback(async () => {
        const fullCommand = input.trim();
        if (fullCommand === '') return;

        const [cmd, ...args] = fullCommand.toLowerCase().split(/\s+/);

        const newHistory = [...history, { type: 'input', text: fullCommand }];
        let outputLines = [];

        if (cmd === 'clear') {
            setHistory([]);
        } else if (commands[cmd]) {
            // Check if the command is async (like 'repos')
            const result = commands[cmd];
            if (result.constructor.name === 'AsyncFunction') {
                outputLines = await result(args);
            } else {
                outputLines = result(args);
            }
            newHistory.push(...outputLines.map(line => ({ type: 'output', text: line })));
            if (cmd !== 'clear') setHistory(newHistory);
        } else {
            outputLines = [`Error: Command '${cmd}' not recognized. Type 'help' for available commands.`];
            newHistory.push(...outputLines.map(line => ({ type: 'output', text: line })));
            setHistory(newHistory);
        }

        setInput('');
    }, [input, history, commands, meshRef]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand();
        }
    };

    return (
        <div 
            id="crt-overlay" 
            ref={threeContainerRef} 
            className="crt-scanlines" 
            onClick={() => inputRef.current?.focus()}
        >
            <div className="crt-output" ref={outputRef}>
                {history.map((line, index) => (
                    <div key={index}>
                        {line.type === 'input' ? (
                            <span style={{ color: 'var(--color-primary)' }}>user:~$ </span>
                        ) : null}
                        <span dangerouslySetInnerHTML={{ __html: line.text }} />
                    </div>
                ))}
            </div>
            
            <div className="crt-input-container">
                <span style={{ color: 'var(--color-primary)' }}>user:~$ </span>
                <input
                    ref={inputRef}
                    type="text"
                    className="crt-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default Terminal;
