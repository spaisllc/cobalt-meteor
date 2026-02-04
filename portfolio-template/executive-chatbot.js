// Executive Chatbot Widget - Premium Version
class ChatbotWidget {
    constructor(config) {
        this.config = {
            apiEndpoint: config.apiEndpoint || '/api/chat',
            clientId: config.clientId || 'demo',
            executiveName: config.executiveName || 'Michael Chen',
            botName: config.botName || "Michael's Executive Assistant",
            botAvatar: config.botAvatar || 'EA',
            welcomeMessage: config.welcomeMessage || "👋 Hi! I'm Michael's AI assistant. I know his career inside and out—from tech transformations to M&A deals. What would you like to know?",
            personality: config.personality || 'professional-warm',
            buttonColor: config.buttonColor || '#fbbf24',
            accentColor: config.accentColor || '#f59e0b',
            suggestedQuestions: config.suggestedQuestions || [
                "Tell me about this executive's experience",
                "What are their key achievements?",
                "What's their leadership approach?",
                "How can I connect with them?"
            ]
        };

        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.injectStyles();
        this.createWidget();
        this.attachEventListeners();
        this.addMessage('ai', this.config.welcomeMessage, true);
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    injectStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'chatbot.css';
        document.head.appendChild(link);
    }

    createWidget() {
        const { buttonColor, accentColor, botAvatar, botName, executiveName } = this.config;
        const widgetHTML = `
            <div class="chatbot-widget">
                <!-- Floating Button -->
                <button class="chatbot-button pulse" id="chatbot-toggle" style="background: linear-gradient(135deg, ${buttonColor} 0%, ${accentColor} 100%);">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </button>

                <!-- Chat Window -->
                <div class="chatbot-window" id="chatbot-window" style="background: #1a1a1a; border: 1px solid ${this.hexToRgba(accentColor, 0.2)};">
                    <div class="chatbot-header" style="background: linear-gradient(135deg, ${buttonColor} 0%, ${accentColor} 100%);">
                        <div class="chatbot-header-info">
                            <div class="chatbot-header-avatar" style="background: #0a0a0a; color: ${accentColor};">${botAvatar}</div>
                            <div class="chatbot-header-text">
                                <h3 style="color: #0a0a0a;">${botName}</h3>
                                <p style="color: rgba(10, 10, 10, 0.8);">Available 24/7 • Instant responses</p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close" style="color: #0a0a0a;">×</button>
                    </div>

                    <div class="chatbot-messages" id="chatbot-messages" style="background: #0a0a0a;"></div>

                    <div class="chatbot-input-area" style="background: #1a1a1a; border-top: 1px solid ${this.hexToRgba(accentColor, 0.2)};">
                        <div class="chatbot-input-wrapper">
                            <textarea
                                class="chatbot-input"
                                id="chatbot-input"
                                placeholder="Ask me anything about ${executiveName}..."
                                rows="1"
                                style="background: #0a0a0a; color: #e5e5e5; border-color: ${this.hexToRgba(accentColor, 0.2)};"
                            ></textarea>
                            <button class="chatbot-send-button" id="chatbot-send" style="background: linear-gradient(135deg, ${buttonColor} 0%, ${accentColor} 100%);">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        input.addEventListener('input', () => this.autoResizeTextarea());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-toggle');

        if (this.isOpen) {
            window.classList.add('open');
            button.classList.remove('pulse');
            document.getElementById('chatbot-input').focus();

            // Show suggested questions on first open
            if (this.messages.length === 1) {
                this.showSuggestedQuestions();
            }
        } else {
            window.classList.remove('open');
        }
    }

    showSuggestedQuestions() {
        const messagesDiv = document.getElementById('chatbot-messages');
        const { accentColor, buttonColor } = this.config;
        const suggestionsHTML = `
            <div class="suggested-questions">
                ${this.config.suggestedQuestions.map(q =>
            `<button class="suggested-question" onclick="chatbot.askQuestion(\`${q}\`)" style="color: ${accentColor}; border-color: ${this.hexToRgba(accentColor, 0.2)}; background: #1a1a1a;">${q}</button>`
        ).join('')}
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', suggestionsHTML);
        this.scrollToBottom();
    }

    askQuestion(question) {
        document.querySelectorAll('.suggested-questions').forEach(el => el.remove());
        document.getElementById('chatbot-input').value = question;
        this.sendMessage();
    }

    addMessage(type, content, skipScroll = false) {
        const messagesDiv = document.getElementById('chatbot-messages');
        const avatarBg = type === 'ai' ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : '#374151';
        const messageBg = type === 'ai' ? '#1a1a1a' : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
        const textColor = type === 'ai' ? '#e5e5e5' : '#0a0a0a';

        const messageHTML = `
            <div class="message ${type}">
                <div class="message-avatar" style="background: ${avatarBg}; color: ${type === 'ai' ? '#0a0a0a' : '#fff'};">${type === 'ai' ? this.config.botAvatar : 'You'}</div>
                <div class="message-content" style="background: ${messageBg}; color: ${textColor};">${content}</div>
            </div>
        `;

        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        this.messages.push({ type, content, timestamp: new Date() });

        if (!skipScroll) {
            this.scrollToBottom();
        }
    }

    showTypingIndicator() {
        const messagesDiv = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="message ai typing-message">
                <div class="message-avatar" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0a0a0a;">${this.config.botAvatar}</div>
                <div class="typing-indicator" style="background: #1a1a1a;">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        document.querySelector('.typing-message')?.remove();
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        input.value = '';
        this.autoResizeTextarea();

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Call API
            const response = await this.callAPI(message);

            // Hide typing indicator
            this.hideTypingIndicator();

            // Add AI response
            this.addMessage('ai', response);

        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('ai', "I apologize—I'm having a brief technical issue. Please try again in a moment, or feel free to email Michael directly!");
            console.error('Chatbot API error:', error);
        }
    }

    async callAPI(message) {
        // For demo, use mock responses with executive personality
        if (this.config.apiEndpoint === '/api/chat') {
            return this.getMockResponse(message);
        }

        const response = await fetch(this.config.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: this.config.clientId,
                message: message
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.response;
    }

    getMockResponse(message) {
        // Demo chatbot with persona-aware responses
        const lower = message.toLowerCase();
        const { executiveName, personality } = this.config;

        return new Promise(resolve => {
            setTimeout(() => {
                // Generic demo response acknowledging this is a portfolio demo
                const demoResponse = `**This is a demo portfolio chatbot** showcasing Springs AI Solutions' technology.\n\nIn a real implementation, I would provide detailed answers about ${executiveName}'s:\n• Professional experience and achievements\n• Leadership philosophy and approach\n• Specific projects and outcomes\n• Availability for opportunities\n\n📧 **For actual inquiries**, you would contact the executive directly through their provided email and LinkedIn.\n\n💡 **This demo shows how an AI assistant can:**\n- Answer questions 24/7\n- Qualify leads automatically  \n- Provide consistent information\n- Engage visitors while you're unavailable\n\n*Interested in your own AI portfolio? Visit* **springs.ai.solutions**`;

                // Check for common questions first
                if (lower.includes('demo') || lower.includes('real') || lower.includes('fake')) {
                    resolve("You're absolutely right—this is a **demo portfolio** created by Springs AI Solutions to showcase our technology.\n\n" + executiveName + " is a fictional executive used to demonstrate:\n✅ Interactive AI chatbots\n✅ Professional portfolio design\n✅ Personalized responses\n\n**Want your own?** Real executive portfolios with fully trained AI assistants start at $1,500/month.\n\nVisit **springs.ai.solutions** to learn more!");
                } else {
                    resolve(demoResponse);
                }
            }, 1200 + Math.random() * 800); // 1.2-2 second delay (more thoughtful)
        });
    }

    autoResizeTextarea() {
        const textarea = document.getElementById('chatbot-input');
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    scrollToBottom() {
        const messagesDiv = document.getElementById('chatbot-messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

// Chatbot class ready for manual initialization
// Each portfolio page will create its own chatbot instance with custom config
