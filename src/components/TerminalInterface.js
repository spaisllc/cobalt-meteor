import { TerminalPrompt } from './TerminalPrompt.js';
import { HologramCards } from './HologramCards.js';
import { typeText } from '../utils/typewriter.js';
import { parseCommand } from '../utils/commandParser.js';
import { setUserName, getUserName } from '../utils/terminalState.js';
import { runBootSequence } from '../utils/bootSequence.js';

export async function initTerminal() {
    const app = document.querySelector('#app');

    // 1. Inject Terminal HTML
    const terminalWrapper = document.createElement('div');
    terminalWrapper.innerHTML = TerminalPrompt();
    app.appendChild(terminalWrapper);

    // 2. Elements
    const history = document.getElementById('terminal-history');
    const inputArea = document.getElementById('input-area');
    const inputField = document.getElementById('cmd-input');
    const actionButtons = document.getElementById('quick-actions');
    const hologramContainer = document.getElementById('hologram-container');

    // 3. Helper to add line
    const addLine = (text, isUser = false) => {
        const p = document.createElement('div');
        p.className = isUser ? 'terminal-line user' : 'terminal-line';
        history.appendChild(p);
        window.scrollTo(0, document.body.scrollHeight);
        return isUser ? Promise.resolve() : typeText(p, text, 15);
    };

    // 4. Intro Sequence
    // Run the Evolution Boot Sequence first
    await runBootSequence(terminalWrapper);

    // await addLine('SPRINGS AI SOLUTIONS INITIALIZED...'); // Replaced by title reveal
    await new Promise(r => setTimeout(r, 500));
    await addLine('Hello. My name is S.P.A.I.S (it sounds like "Space S"), your Springs AI Solutions Concierge.');
    await new Promise(r => setTimeout(r, 500));

    // Check if we already know the user
    const savedName = getUserName();

    if (!savedName) {
        await addLine('What is your name?');
        inputArea.style.opacity = 1;
        inputField.focus();

        inputField.addEventListener('keydown', async function nameHandler(e) {
            if (e.key === 'Enter') {
                const name = inputField.value.trim();
                if (!name) return;

                inputField.removeEventListener('keydown', nameHandler);
                inputField.value = '';
                inputArea.style.opacity = 0;

                const p = document.createElement('div');
                p.className = 'terminal-line user';
                p.textContent = `> ${name}`;
                history.appendChild(p);

                setUserName(name);

                await new Promise(r => setTimeout(r, 500));
                await addLine(`Nice to meet you, ${name}.`);
                await startMainLoop();
            }
        });
    } else {
        await addLine(`Welcome back, ${savedName}.`);
        await startMainLoop();
    }

    // 5. Main Loop
    async function startMainLoop() {
        await new Promise(r => setTimeout(r, 400));
        await addLine(`What would you like to explore?`);

        inputArea.style.opacity = 1;
        actionButtons.classList.add('visible');
        inputField.placeholder = "Enter command or choose below...";
        inputField.focus();
        inputField.value = '';

        window.runCmd = async (cmd) => {
            inputField.value = cmd;
            handleCommand(cmd);
        };

        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = inputField.value.trim();
                if (cmd) handleCommand(cmd);
            }
        });
    }

    async function handleCommand(rawCmd) {
        const cmd = rawCmd;
        inputField.value = '';

        const p = document.createElement('div');
        p.className = 'terminal-line user';
        p.textContent = `> ${cmd}`;
        history.appendChild(p);

        const result = parseCommand(cmd);

        if (result.type === 'CLEAR') {
            history.innerHTML = '';
            return;
        }

        await addLine(result.response);

        if (result.type === 'SHOW_SERVICES' || result.type === 'SHOW_RESUME') {
            hologramContainer.innerHTML = HologramCards();
            setTimeout(() => {
                const stage = document.getElementById('hologram-stage');
                if (stage) stage.classList.add('visible');
            }, 100);
            setTimeout(() => {
                hologramContainer.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }

    // Navigation Helper (exposed to window for onclicks)
    window.closeTerminalAndGo = (selector) => {
        const term = document.querySelector('.terminal-overlay');
        term.style.transition = 'opacity 0.8s ease';
        term.style.opacity = '0';

        // Reveal Main Site
        document.body.classList.remove('terminal-active');

        setTimeout(() => {
            term.style.display = 'none';
            const section = document.querySelector(selector);
            if (section) section.scrollIntoView({ behavior: 'smooth' });

            // Trigger Chatbot "Morph"
            const name = getUserName();
            const msg = `I'm still here if you need anything, ${name}.`;
            if (window.openChatbot) {
                setTimeout(() => window.openChatbot(msg), 1000);
            }
        }, 800);
    };
}
