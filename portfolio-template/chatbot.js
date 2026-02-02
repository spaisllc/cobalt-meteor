// Chatbot Widget JavaScript
class ChatbotWidget {
    constructor(config) {
        this.config = {
            apiEndpoint: config.apiEndpoint || '/api/chat',
            clientId: config.clientId || 'demo',
            botName: config.botName || 'AI Assistant',
            botAvatar: config.botAvatar || 'AI',
            welcomeMessage: config.welcomeMessage || "Hi! I'm Sarah's AI assistant. Ask me anything about her experience!",
            suggestedQuestions: config.suggestedQuestions || [
                "What's Sarah's Python experience?",
                "Tell me about her machine learning projects",
                "What companies has she worked at?",
                "Is she open to remote work?"
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

    injectStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'chatbot.css';
        document.head.appendChild(link);
    }

    createWidget() {
        const widgetHTML = `
            <div class="chatbot-widget">
                <!-- Floating Button -->
                <button class="chatbot-button pulse" id="chatbot-toggle">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </button>
                
                <!-- Chat Window -->
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-header-avatar">${this.config.botAvatar}</div>
                            <div class="chatbot-header-text">
                                <h3>${this.config.botName}</h3>
                                <p>Online • Typically replies instantly</p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">×</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages"></div>
                    
                    <div class="chatbot-input-area">
                        <div class="chatbot-input-wrapper">
                            <textarea 
                                class="chatbot-input" 
                                id="chatbot-input" 
                                placeholder="Type your message..."
                                rows="1"
                            ></textarea>
                            <button class="chatbot-send-button" id="chatbot-send">
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
            `<button class="suggested-question" onclick="chatbot.askQuestion('${q}')">${q}</button>`
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
        const messageHTML = `
            <div class="message ${type}">
                <div class="message-avatar">${type === 'ai' ? this.config.botAvatar : 'You'}</div>
                <div class="message-content">${content}</div>
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
                <div class="message-avatar">${this.config.botAvatar}</div>
                <div class="typing-indicator">
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
            this.addMessage('ai', "Sorry, I'm having trouble connecting right now. Please try again later!");
            console.error('Chatbot API error:', error);
        }
    }

    async callAPI(message) {
        // For demo, use mock responses
        // In production, this would call your actual API
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
        // Mock AI responses for demo
        const lower = message.toLowerCase();

        // Simulate API delay
        return new Promise(resolve => {
            setTimeout(() => {
                if (lower.includes('python') || lower.includes('programming')) {
                    resolve("Sarah has 5 years of Python experience, working extensively with data analysis libraries like Pandas, NumPy, and Scikit-learn. She's also proficient in machine learning frameworks like TensorFlow and has used Python for ETL pipelines and automation at Google, Apple, and Meta.");
                } else if (lower.includes('machine learning') || lower.includes('ml')) {
                    resolve("Sarah has strong machine learning experience! At Google, she built ML models for user behavior prediction with 92% accuracy. She's skilled in scikit-learn, TensorFlow, and has experience with both supervised and unsupervised learning techniques.");
                } else if (lower.includes('companies') || lower.includes('experience') || lower.includes('worked')) {
                    resolve("Sarah has worked at three major tech companies:\n\n• **Google** (2022-Present) - Senior Data Analyst\n• **Apple** (2020-2022) - Data Analyst\n• **Meta/Facebook** (2019-2020) - Junior Data Analyst\n\nShe has a total of 5 years of professional experience in data analytics.");
                } else if (lower.includes('remote') || lower.includes('location')) {
                    resolve("Yes! Sarah is open to remote opportunities as well as positions in the SF Bay Area. She's available starting March 2026.");
                } else if (lower.includes('skills') || lower.includes('tools')) {
                    resolve("Sarah's technical skills include:\n\n**Programming:** Python, R, SQL\n**ML/Data Science:** Scikit-learn, TensorFlow, Pandas, NumPy\n**Data Engineering:** PostgreSQL, BigQuery, Spark, Airflow\n**Visualization:** Tableau, Power BI, Looker, Matplotlib");
                } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
                    resolve("You can reach Sarah at sarah.chen@email.com or connect with her on LinkedIn. She typically responds within 24 hours!");
                } else {
                    resolve("That's a great question! Sarah has extensive experience in data analytics and machine learning. Feel free to ask me about her Python experience, ML projects, work history, or technical skills. I'm here to help!");
                }
            }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
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

// Initialize chatbot when DOM is ready
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
    chatbot = new ChatbotWidget({
        botName: "Sarah's AI Assistant",
        botAvatar: 'SC',
        welcomeMessage: "Hi! I'm Sarah's AI assistant. Ask me anything about her experience, skills, or availability!",
        suggestedQuestions: [
            "What's Sarah's Python experience?",
            "Tell me about her ML projects",
            "What companies has she worked at?",
            "Is she open to remote work?"
        ]
    });
});
