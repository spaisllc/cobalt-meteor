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
                "What's his experience with acquisitions?",
                "Tell me about his cloud transformation work",
                "How large were the teams he's led?",
                "What's his leadership philosophy?"
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
        const suggestionsHTML = `
            <div class="suggested-questions">
                ${this.config.suggestedQuestions.map(q =>
            `<button class="suggested-question" onclick="chatbot.askQuestion(\`${q}\`)" style="color: #f59e0b; border-color: rgba(251, 191, 36, 0.2); background: #1a1a1a;">${q}</button>`
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
        // Executive-focused responses with personality
        const lower = message.toLowerCase();

        return new Promise(resolve => {
            setTimeout(() => {
                if (lower.includes('acquisition') || lower.includes('m&a') || lower.includes('merge')) {
                    resolve("Great question! Michael has led **12 successful acquisitions** totaling over $2.1B during his tenure at Salesforce. His approach focuses on cultural integration and tech stack consolidation—not just the deal itself.\n\nKey wins:\n• $850M SaaS acquisition (integrated in 6 months)\n• 5 strategic acqui-hires for AI/ML talent\n• Post-merger tech unification reduced costs by 40%\n\nHe always says: *'The deal is 20% of the work. Integration is the other 80%.'*");
                } else if (lower.includes('cloud') || lower.includes('transformation') || lower.includes('migration')) {
                    resolve("Michael is a cloud transformation expert! At Salesforce, he led the migration of legacy on-prem infrastructure to cloud-native architecture, which:\n\n✅ Reduced annual costs by **$120M**\n✅ Improved system uptime to 99.99%\n✅ Enabled 3x faster feature deployments\n\nBefore that, at AWS, he launched 12 new services generating $800M+ in ARR. He's passionate about serverless, Kubernetes, and building resilient distributed systems.");
                } else if (lower.includes('team') || lower.includes('people') || lower.includes('manage') || lower.includes('lead')) {
                    resolve("Michael's a people-first leader. He's scaled teams from **5 to 350+ engineers** across 3 continents (US, EMEA, APAC).\n\nHis leadership style:\n• Empowers autonomy while maintaining alignment\n• Huge on mentorship (15 of his reports are now VPs/CTOs)\n• Believes in 'servant leadership'\n• Built inclusive engineering cultures (40%+ diverse teams)\n\nHe often quotes: *'Your job as a leader is to make yourself obsolete.'*");
                } else if (lower.includes('revenue') || lower.includes('value') || lower.includes('impact') || lower.includes('roi')) {
                    resolve("Michael's track record speaks for itself: **$500M+ in measurable value created** across his roles.\n\nBreakdown:\n• Salesforce: $120M annual cost savings + $200M revenue growth\n• AWS: Launched services generating $800M+ ARR\n• Google Cloud: Kubernetes adoption drove billions in GCP revenue\n\nHe's a firm believer that technology leaders must tie their work to business outcomes, not just 'cool tech.'");
                } else if (lower.includes('board') || lower.includes('advisory') || lower.includes('available') || lower.includes('seeking')) {
                    resolve("Yes! Michael is **actively seeking board and advisory positions** in:\n\n🎯 **Target companies:**\n• Series B-D startups (enterprise SaaS, cloud infra)\n• PE-backed portfolio companies undergoing tech transformation\n• Public companies needing tech/AI expertise\n\n📍 **Location:** SF Bay Area or remote\n⏰ **Availability:** Immediate\n✉️ **Best contact:** michael.chen@executive.com\n\nHe brings C-suite experience, M&A expertise, and a strong network in the cloud/AI space.");
                } else if (lower.includes('philosophy') || lower.includes('style') || lower.includes('approach')) {
                    resolve("Michael's leadership philosophy is rooted in **systems thinking and empowerment**:\n\n*'Technology is not about code—it's about empowering people to solve meaningful problems. The best leaders build systems that outlast their tenure.'*\n\nCore principles:\n1. **Outcomes over output** - Ship value, not features\n2. **People first** - Invest in growth and psychological safety\n3. **Simplicity** - Complexity is the enemy of scale\n4. **Long-term thinking** - Build for 5 years, not 5 months\n\nHe's known for asking: *'What problem are we REALLY solving?'*");
                } else if (lower.includes('kubernetes') || lower.includes('open source') || lower.includes('google')) {
                    resolve("Ah, the Kubernetes days! At Google Cloud, Michael was **Director of Engineering** for the Kubernetes project from 2011-2016.\n\nHighlights:\n• Grew the project to **40,000+ GitHub stars**\n• Built the open-source community (now 3M+ users)\n• Drove enterprise adoption (Fortune 500s standardized on K8s)\n• Managed distributed teams across 5 countries\n\nHe's passionate about open source as a **competitive moat** and still contributes to cloud-native projects today.");
                } else if (lower.includes('aws') || lower.includes('amazon') || lower.includes('serverless')) {
                    resolve("Michael spent 4 transformative years (2016-2020) as **VP of Engineering at AWS**.\n\nKey achievements:\n• Launched **12 new AWS services** ($800M+ ARR)\n• Built the serverless team from 0 to 80 engineers in 18 months\n• Reduced infrastructure costs by 40% through architectural innovation\n• Drove adoption of Lambda, API Gateway, and DynamoDB\n\nHe calls this era his 'masterclass in scaling while maintaining quality.'");
                } else if (lower.includes('education') || lower.includes('background') || lower.includes('university')) {
                    resolve("**Education:**\n• MBA from Stanford Graduate School of Business\n• MS in Computer Science from MIT\n• BS in Electrical Engineering from UC Berkeley\n\n**Early career:**\nStarted as a software engineer at Oracle, quickly moved into leadership roles. Self-taught in distributed systems and cloud architecture—he's a lifelong learner!");
                } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('connect')) {
                    resolve("📧 **Email:** michael.chen@executive.com  \n💼 **LinkedIn:** [linkedin.com/in/michaelchen](https://linkedin.com/in/michaelchen)  \n🤖 **This AI:** Available 24/7 (that's me!)\n\nMichael typically responds within **24 hours** to serious inquiries. For board/advisory discussions, feel free to email directly with:\n• Your company's stage and focus\n• What you're looking for in a board member\n• Proposed time commitment\n\nLooking forward to connecting!");
                } else if (lower.includes('salary') || lower.includes('compensation') || lower.includes('pay')) {
                    resolve("For executive roles, Michael's compensation has typically been in the **$500k-$1M+ range** (base + equity + bonuses).\n\nFor board positions, he's flexible based on:\n• Company stage and equity potential\n• Time commitment (quarterly vs monthly meetings)\n• Strategic value add\n\nHe's more interested in **mission alignment and impact** than maximizing comp. Happy to discuss specifics via email!");
                } else {
                    resolve(`That's an interesting question! While I have deep knowledge of Michael's career, let me connect the dots:\n\nMichael is a **C-suite technology leader** with 15 years of experience driving transformations at Salesforce, AWS, and Google. He's created $500M+ in value through cloud migrations, M&A, and team scaling.\n\nFeel free to ask about:\n• His acquisition/M&A experience\n• Cloud transformation expertise\n• Team leadership approach\n• Board availability\n• Technical depth (Kubernetes, serverless, AI)\n\nOr email him directly: **michael.chen@executive.com** 📧`);
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
