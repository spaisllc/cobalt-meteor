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

        this.eras = [
            {
                name: 'MAINFRAME ERA // 1960s',
                code: [
                    '001 010 110 LOAD SPRINGS_AI_SOLUTIONS',
                    '010 100 001 EXEC INIT_SEQUENCE',
                    '101 011 010 STORE REG_ALPHA',
                    '110 001 100 JUMP ADDR_0x7F'
                ],
                style: 'punch-card'
            },
            {
                name: 'COBOL/FORTRAN ERA // 1970s',
                code: [
                    'IDENTIFICATION DIVISION.',
                    'PROGRAM-ID. SPRINGS-AI-SOLUTIONS-LLC.',
                    'PERFORM INITIALIZE-DIGITAL-EMPLOYEE.',
                    'STOP RUN.'
                ],
                style: 'cobol'
            },
            {
                name: 'BASIC ERA // 1980s',
                code: [
                    '10 PRINT "SPRINGS AI SOLUTIONS, LLC"',
                    '20 PRINT "INITIALIZING SYSTEM..."',
                    '30 GOSUB 1000: REM LOAD_AI_CORE',
                    '40 PRINT "READY.": END'
                ],
                style: 'basic'
            },
            {
                name: 'C/C++ ERA // 1990s',
                code: [
                    '#include <springs_ai_solutions.h>',
                    'int main(void) {',
                    '    SpringsAI::Solutions::initialize();',
                    '    return EXIT_SUCCESS; }'
                ],
                style: 'c-cpp'
            },
            {
                name: 'PYTHON/WEB ERA // 2010s',
                code: [
                    'from springs_ai_solutions import SPAIS',
                    'agent = SPAIS.create_digital_employee()',
                    'await agent.initialize(mode="concierge")',
                    'print("Springs AI Solutions, LLC: Online")'
                ],
                style: 'python'
            },
            {
                name: 'AI/LLM ERA // 2024+',
                code: [
                    'const spais = await SPRINGS_AI_SOLUTIONS.wake();',
                    'spais.loadModel("concierge-v2.llm");',
                    'spais.setPersonality("helpful", "professional");',
                    '// Your AI concierge is ready...'
                ],
                style: 'modern'
            }
        ];

        this.currentEra = 0;
        this.overlay = null;
        this.contentEl = null;
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
        this.overlay.innerHTML = `
            <div class="boot-terminal">
                <div class="boot-header">
                    <span class="boot-logo">[ S.P.A.I.S. ]</span>
                    <span class="boot-title">SPRINGS AI SOLUTIONS, LLC</span>
                    <span class="boot-subtitle">SYSTEM INITIALIZATION SEQUENCE</span>
                </div>
                <div class="boot-content" id="boot-content"></div>
                <div class="boot-status">
                    <span class="status-bar"></span>
                    <span class="status-text">LOADING SYSTEMS<span class="status-dots">...</span></span>
                </div>
            </div>
            <div class="boot-lines-container" id="boot-lines"></div>
        `;
        document.body.prepend(this.overlay);
        this.contentEl = document.getElementById('boot-content');
    }

    async start() {
        this.createOverlay();
        await this.delay(300);
        await this.runSequence();
        await this.showLinesTransition();
        this.complete();
    }

    async runSequence() {
        let erasToShow;
        let eraDelay;

        if (this.isReturningVisitor) {
            // Returning visitor: just show first and last era
            erasToShow = [this.eras[0], this.eras[this.eras.length - 1]];
            eraDelay = 1200;
        } else {
            // First visit: show all eras
            erasToShow = this.eras;
            eraDelay = 1500;
        }

        for (const era of erasToShow) {
            await this.displayEra(era, eraDelay);
        }
    }

    async displayEra(era, duration) {
        // Clear previous era with fade
        if (this.contentEl.children.length > 0) {
            this.contentEl.classList.add('fade-out');
            await this.delay(200);
            this.contentEl.innerHTML = '';
            this.contentEl.classList.remove('fade-out');
        }

        // Show era header
        const header = document.createElement('div');
        header.className = `era-header ${era.style}`;
        header.textContent = era.name;
        this.contentEl.appendChild(header);
        await this.delay(150);

        // Calculate timing
        const lineDelay = (duration - 400) / era.code.length;

        // Type each code line
        for (const line of era.code) {
            const lineEl = document.createElement('div');
            lineEl.className = `code-line ${era.style}`;
            this.contentEl.appendChild(lineEl);

            await this.typeText(lineEl, line, lineDelay * 0.6);
            await this.delay(lineDelay * 0.4);
        }

        await this.delay(200);
    }

    async typeText(element, text, duration) {
        const charDelay = Math.min(duration / text.length, 40);

        for (const char of text) {
            element.textContent += char;
            await this.delay(charDelay);
        }
    }

    async showLinesTransition() {
        const container = document.getElementById('boot-lines');
        container.classList.add('active');

        // Create horizontal scan lines
        const lineCount = 24;
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'transition-line';
            line.style.top = `${(i / lineCount) * 100}%`;
            line.style.animationDelay = `${i * 25}ms`;
            container.appendChild(line);
        }

        await this.delay(700);

        // Converge to center
        container.classList.add('converge');
        await this.delay(400);
    }

    complete() {
        this.markVisited();
        this.overlay.classList.add('fade-out');

        setTimeout(() => {
            this.overlay.remove();
            this.onComplete();
        }, 500);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
