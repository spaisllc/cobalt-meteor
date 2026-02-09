/**
 * visualVoice.js
 * Handles visual feedback for Vapi voice interactions.
 * Accessible design for deaf/hard-of-hearing users.
 */

import Vapi from '@vapi-ai/web';

// Initialize Vapi with public key from config
const config = window.vapiConfig || {
    publicKey: "e69d2468-67f6-4f38-ae1f-c0b43d436cd6",
    assistantId: "ce3d0466-1272-4cd8-ae99-d997b5fb90ee"
};

const vapi = new Vapi(config.publicKey);

const VisualVoice = {
    overlay: null,
    textContainer: null,
    statusIndicator: null,
    isInitialized: false,
    statusTextElement: null,
    isCallActive: false,

    init() {
        if (this.isInitialized) return;

        // Create UI elements
        this.createOverlay();

        // Show modal immediately
        this.showWelcomeModal();

        // Attach Vapi event listeners
        this.attachListeners();

        // Check for "Talk" button and attach click handler
        const talkBtn = document.getElementById('vapi-talk-btn');
        if (talkBtn) {
            talkBtn.onclick = (e) => {
                e.preventDefault();
                this.toggleCall();
            };
        }

        this.isInitialized = true;
        console.log("Visual Voice: Initialized");
    },

    attachListeners() {
        vapi.on('call-start', () => {
            console.log("Visual Voice: call-start");
            this.isCallActive = true;
            this.show();
            this.updateStatus('active', 'Connected');
            this.typeText("Springs AI Solutions connected. Listening...");
        });

        vapi.on('call-end', () => {
            console.log("Visual Voice: call-end");
            this.isCallActive = false;
            this.updateStatus('inactive', 'Call Ended');
            this.typeText("Call ended. Thank you for speaking with Springs AI Solutions.");
        });

        vapi.on('speech-start', () => {
            console.log("Visual Voice: speech-start (assistant speaking)");
            this.updateStatus('speaking', 'Speaking');
        });

        vapi.on('speech-end', () => {
            console.log("Visual Voice: speech-end");
            this.updateStatus('listening', 'Listening...');
        });

        vapi.on('message', (message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                if (message.role === 'assistant') {
                    this.typeText(message.transcript);
                }
            }
        });

        vapi.on('volume-level', (volume) => {
            if (volume > 0.05 && this.statusIndicator) {
                this.statusIndicator.style.transform = `scale(${1 + volume * 2})`;
            } else if (this.statusIndicator) {
                this.statusIndicator.style.transform = 'scale(1)';
            }
        });

        vapi.on('error', (error) => {
            console.error("Visual Voice: error", error);
            this.typeText("Error: " + (error.message || "Connection failed"));
            this.updateStatus('inactive', 'Error');
            this.isCallActive = false;
        });
    },

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'visual-voice-overlay';
        this.overlay.className = 'visual-voice-hidden';

        // Status Bar
        const statusBar = document.createElement('div');
        statusBar.className = 'voice-status-bar';
        this.statusIndicator = document.createElement('span');
        this.statusIndicator.className = 'status-dot';
        this.statusTextElement = document.createElement('span');
        this.statusTextElement.id = 'voice-status-text';
        this.statusTextElement.innerText = 'AI Offline';
        statusBar.appendChild(this.statusIndicator);
        statusBar.appendChild(this.statusTextElement);

        // Text Output
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'voice-text-output';

        // Controls
        const controls = document.createElement('div');
        controls.className = 'voice-controls';
        const closeBtn = document.createElement('button');
        closeBtn.innerText = 'End Call';
        closeBtn.onclick = () => this.endCall();
        controls.appendChild(closeBtn);

        this.overlay.appendChild(statusBar);
        this.overlay.appendChild(this.textContainer);
        this.overlay.appendChild(controls);
        document.body.appendChild(this.overlay);

        // Setup Modal Buttons
        const voiceBtn = document.getElementById('mode-voice');
        const readBtn = document.getElementById('mode-read');
        if (voiceBtn) voiceBtn.onclick = () => this.selectMode('voice');
        if (readBtn) readBtn.onclick = () => this.selectMode('read');
    },

    showWelcomeModal() {
        const modal = document.getElementById('welcome-modal');
        console.log("Visual Voice: showWelcomeModal called, modal element:", modal);
        if (modal) {
            modal.classList.add('active');
            console.log("Visual Voice: Modal 'active' class added");
        }
    },

    hideWelcomeModal() {
        const modal = document.getElementById('welcome-modal');
        if (modal) modal.classList.remove('active');
    },

    selectMode(mode) {
        sessionStorage.setItem('springs_mode', mode);
        this.hideWelcomeModal();

        if (mode === 'voice') {
            this.startCall();
        }
    },

    toggleCall() {
        if (this.isCallActive) {
            this.endCall();
        } else {
            this.startCall();
        }
    },

    startCall() {
        this.show();
        this.updateStatus('thinking', 'Connecting...');
        this.typeText("Connecting to Springs AI Solutions...");

        console.log("Visual Voice: Starting call with assistant:", config.assistantId);
        vapi.start(config.assistantId);
    },

    endCall() {
        console.log("Visual Voice: Ending call");
        vapi.stop();
        this.hide();
    },

    updateStatus(state, text) {
        if (this.statusTextElement) this.statusTextElement.innerText = text;
        if (this.overlay) this.overlay.setAttribute('data-state', state);
    },

    typingTimeout: null,

    typeText(text) {
        if (!text) return;
        if (typeof text !== 'string') text = String(text);

        // Clear existing typing loop
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }

        if (this.textContainer) {
            this.textContainer.textContent = '';

            // Simple typewriter effect
            let i = 0;
            const speed = 15;

            const type = () => {
                if (i < text.length) {
                    this.textContainer.textContent += text.charAt(i);
                    this.textContainer.scrollTop = this.textContainer.scrollHeight;
                    i++;
                    this.typingTimeout = setTimeout(type, speed);
                } else {
                    this.typingTimeout = null;
                }
            };

            type();
        }
    },

    show() {
        if (this.overlay) {
            this.overlay.classList.remove('visual-voice-hidden');
            this.overlay.classList.add('visual-voice-visible');
        }
    },

    hide() {
        if (this.overlay) {
            this.overlay.classList.remove('visual-voice-visible');
            this.overlay.classList.add('visual-voice-hidden');
        }
    }
};

// Expose globally for SPA navigation
window.VisualVoice = VisualVoice;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    VisualVoice.init();
});
