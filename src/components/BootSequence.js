/**
 * Boot Sequence Component
 * Springs AI Solutions, LLC
 *
 * Displays a programming history boot sequence showcasing the evolution
 * from punch cards to AI before revealing the main site.
 */

export class BootSequence {
    constructor(options = {}) {
        this.onComplete = options.onComplete || (() => {});
        this.isReturningVisitor = this.checkReturningVisitor();
        this.duration = this.isReturningVisitor ? 3000 : 10000;

        // Terminal path for the prompt
        this.terminalPath = 'G:\\home\\SPAIS\\springsaisolutions>';

        // Era-based code lines (4 lines per era)
        this.eras = [
            {
                name: 'MAINFRAME ERA // 1960s',
                style: 'punch-card',
                lines: [
                    '> LOAD "SPAIS_MAINFRAME"',
                    '> READ CARD_DECK: SPRINGS.AI',
                    '> EXEC BOOT_SEQUENCE',
                    '> INIT SPRINGS_AI_SOLUTIONS'
                ]
            },
            {
                name: 'COBOL ERA // 1970s',
                style: 'cobol',
                lines: [
                    'IDENTIFICATION DIVISION.',
                    'PROGRAM-ID. SPAIS-INIT.',
                    'PERFORM SPRINGS-AI-STARTUP.',
                    'DISPLAY "SPRINGS AI SOLUTIONS ONLINE".'
                ]
            },
            {
                name: 'BASIC ERA // 1980s',
                style: 'basic',
                lines: [
                    '10 PRINT "SPRINGS AI SOLUTIONS"',
                    '20 LOAD "SPAIS.BAS"',
                    '30 GOSUB INIT_SYSTEM',
                    '40 RUN DIGITAL_EMPLOYEE'
                ]
            },
            {
                name: 'C/C++ ERA // 1990s',
                style: 'c-cpp',
                lines: [
                    '#include <springs_ai.h>',
                    'SpringsAI* spais = new SpringsAI();',
                    'spais->initialize("solutions");',
                    'spais->launchConcierge();'
                ]
            },
            {
                name: 'PYTHON ERA // 2000s',
                style: 'python',
                lines: [
                    'from springs_ai import SPAIS',
                    'agent = SPAIS.create_employee()',
                    'agent.configure(mode="concierge")',
                    'agent.activate()'
                ]
            },
            {
                name: 'AI ERA // 2020s',
                style: 'modern',
                lines: [
                    'const spais = await SpringsAI.init();',
                    'spais.loadModel("concierge-v2");',
                    'await spais.wake({ mode: "ready" });',
                    '// S.P.A.I.S. online...'
                ]
            }
        ];

        this.overlay = null;
        this.contentEl = null;
        this.promptEl = null;
    }

    checkReturningVisitor() {
        return localStorage.getItem('spais_visited') === 'true';
    }

    markVisited() {
        localStorage.setItem('spais_visited', 'true');
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'boot-overlay';
        this.overlay.className = 'boot-overlay';
        // Start completely black - terminal prompt appears first
        this.overlay.innerHTML = `
            <div class="boot-terminal">
                <div class="boot-prompt" id="boot-prompt"></div>
                <div class="boot-content" id="boot-content"></div>
                <div class="boot-header hidden" id="boot-header">
                    <span class="boot-logo">[ S.P.A.I.S. ]</span>
                    <span class="boot-title">SPRINGS AI SOLUTIONS, LLC</span>
                    <span class="boot-subtitle">THE FUTURE IS HERE</span>
                </div>
                <div class="boot-status hidden" id="boot-status">
                    <span class="status-bar"></span>
                    <span class="status-text">SYSTEMS ONLINE<span class="status-dots">...</span></span>
                </div>
            </div>
            <div class="boot-lines-container" id="boot-lines"></div>
        `;
        document.body.prepend(this.overlay);
        this.promptEl = document.getElementById('boot-prompt');
        this.contentEl = document.getElementById('boot-content');
        this.headerEl = document.getElementById('boot-header');
        this.statusEl = document.getElementById('boot-status');
    }

    async start() {
        this.createOverlay();
        await this.delay(500);

        // Phase 1: Show terminal prompt with path
        await this.showTerminalPrompt();

        // Phase 2: Show "Launch S.P.A.I.S." command
        await this.showLaunchCommand();

        // Phase 3: Run era-based code sequence
        await this.runSequence();

        // Phase 4: Line transition effect
        await this.showLinesTransition();

        this.complete();
    }

    async showTerminalPrompt() {
        // Type out the terminal path
        await this.typeText(this.promptEl, this.terminalPath, 800);
        await this.delay(300);
    }

    async showLaunchCommand() {
        // Create the launch command element
        const launchCmd = document.createElement('span');
        launchCmd.className = 'launch-command';
        this.promptEl.appendChild(launchCmd);

        // Type out "Launch S.P.A.I.S."
        await this.typeText(launchCmd, ' Launch S.P.A.I.S.', 600);

        // Let it sit so users can read it
        await this.delay(1500);

        // Add "executing" feedback
        const execEl = document.createElement('div');
        execEl.className = 'exec-feedback';
        execEl.textContent = 'Executing initialization sequence...';
        this.promptEl.appendChild(execEl);

        // Another pause to let users read the feedback
        await this.delay(1200);

        // Fade out the prompt area
        this.promptEl.classList.add('fade-out');
        await this.delay(500);
    }

    async runSequence() {
        // Balanced timing - not too slow, not too fast
        const lineDelay = this.isReturningVisitor ? 120 : 180;
        const eraDelay = this.isReturningVisitor ? 300 : 500;

        // Display era-based code lines
        for (const era of this.eras) {
            // Show era header
            const headerEl = document.createElement('div');
            headerEl.className = `era-header ${era.style}`;
            headerEl.textContent = `// ${era.name}`;
            this.contentEl.appendChild(headerEl);
            await this.delay(200);

            // Show 4 code lines for this era
            for (const lineText of era.lines) {
                const lineEl = document.createElement('div');
                lineEl.className = `code-line ${era.style}`;
                this.contentEl.appendChild(lineEl);

                await this.typeText(lineEl, lineText, lineDelay * 1.5);
                await this.delay(lineDelay);
            }

            await this.delay(eraDelay);

            // Keep only last 6 lines visible to avoid overcrowding
            while (this.contentEl.children.length > 6) {
                const firstChild = this.contentEl.firstChild;
                firstChild.classList.add('fade-up');
                await this.delay(80);
                firstChild.remove();
            }
        }

        // Let the final code settle and breathe
        await this.delay(800);
    }

    async typeText(element, text, duration) {
        const charDelay = Math.min(duration / text.length, 50);

        // Create cursor element for typewriter effect
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '█';
        element.appendChild(cursor);

        for (const char of text) {
            // Insert character before cursor
            const charSpan = document.createTextNode(char);
            element.insertBefore(charSpan, cursor);
            await this.delay(charDelay);
        }

        // Remove cursor after typing completes
        cursor.remove();
    }

    async showLinesTransition() {
        // Clear the code content before showing lines
        this.contentEl.classList.add('fade-out');
        await this.delay(500);
        this.contentEl.innerHTML = '';

        const container = document.getElementById('boot-lines');
        container.classList.add('active');

        // Create horizontal scan lines - slower stagger
        const lineCount = 24;
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'transition-line';
            line.style.top = `${(i / lineCount) * 100}%`;
            line.style.animationDelay = `${i * 40}ms`;  // Slower stagger
            container.appendChild(line);
        }

        await this.delay(2000);  // Let lines breathe longer

        // Converge to center
        container.classList.add('converge');
        await this.delay(1000);  // Slower convergence

        // Reveal the S.P.A.I.S. header and logo
        this.headerEl.classList.remove('hidden');
        this.headerEl.classList.add('reveal');
        await this.delay(600);

        // Show the status bar
        this.statusEl.classList.remove('hidden');
        this.statusEl.classList.add('reveal');

        // Long pause - let the visuals hook the user before transitioning
        await this.delay(2500);
    }

    complete() {
        this.markVisited();
        this.overlay.classList.add('fade-out');

        // Match the slower CSS transition (1s) before removing and triggering chatbox
        setTimeout(() => {
            this.overlay.remove();
            this.onComplete();
        }, 1200);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
