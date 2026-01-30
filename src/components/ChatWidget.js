/**
 * ChatWidget Component
 * AI-powered chat interface using OpenAI API
 */

import { OpenAIService } from '../services/openaiService.js';
import { systemPrompt } from '../data/systemPrompt.js';

export class ChatWidget {
    constructor() {
        this.widget = document.getElementById('chat-widget');
        this.toggle = document.getElementById('chat-toggle');
        this.panel = document.getElementById('chat-panel');
        this.messagesContainer = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('chat-send');
        this.fullscreenBtn = document.getElementById('chat-fullscreen');

        this.isOpen = false;
        this.isFullscreen = false;
        this.messages = [];
        this.isTyping = false;
        this.userName = null;
        this.userEmail = null;

        this.openaiService = new OpenAIService();

        this.init();
    }

    init() {
        if (!this.widget) return;

        // Toggle button
        this.toggle.addEventListener('click', () => this.toggleChat());

        // Send button
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        // Enter key to send
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Fullscreen toggle
        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Load conversation history from session
        this.loadHistory();
    }

    open(context = null) {
        if (!this.isOpen) {
            this.toggleChat();
        }

        // If there's a context (e.g., from a service page), add it to the conversation
        if (context && this.messages.length === 0) {
            this.startConversation(context);
        } else if (this.messages.length === 0) {
            this.startConversation();
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.widget.classList.toggle('open', this.isOpen);

        if (this.isOpen) {
            this.input.focus();

            // Start conversation if empty
            if (this.messages.length === 0) {
                this.startConversation();
            }
        }
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        this.widget.classList.toggle('fullscreen', this.isFullscreen);
    }

    async startConversation(context = null) {
        let greeting = "Hello! I'm S.P.A.I.S. - Springs AI Sales. I'm here to help you discover how AI can transform your business. What brings you here today?";

        if (context) {
            const contextMessages = {
                sales: "I see you're interested in our AI Sales Agents! These are my specialty. What would you like to know about how an AI sales agent could work for your business?",
                chatbots: "Smart Chatbots & Forms - great choice! These can dramatically improve your lead capture. What kind of forms or interactions are you looking to improve?",
                email: "Email Assistants are a game-changer for busy teams. Are you looking to automate responses, improve routing, or both?",
                custom: "Custom AI solutions - that's where things get exciting! Tell me about your unique workflow challenges.",
                pricing: "Let's talk investment. To give you the most relevant pricing information, could you tell me a bit about your business and what you're looking to achieve?"
            };
            greeting = contextMessages[context] || greeting;
        }

        await this.addBotMessage(greeting);
    }

    async sendMessage() {
        const text = this.input.value.trim();
        if (!text || this.isTyping) return;

        // Clear input
        this.input.value = '';

        // Add user message
        this.addUserMessage(text);

        // Check for lead capture
        this.checkForLeadInfo(text);

        // Show typing indicator
        this.showTyping();

        try {
            // Get AI response
            const response = await this.openaiService.chat(this.messages, systemPrompt);
            this.hideTyping();
            await this.addBotMessage(response);
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTyping();
            await this.addBotMessage(this.getFallbackResponse());
        }

        // Save history
        this.saveHistory();
    }

    addUserMessage(text) {
        this.messages.push({ role: 'user', content: text });
        this.renderMessage('user', text);
        this.scrollToBottom();
    }

    async addBotMessage(text) {
        this.messages.push({ role: 'assistant', content: text });
        await this.renderMessageWithTypewriter('bot', text);
        this.scrollToBottom();
    }

    renderMessage(type, text) {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${type}`;

        const contentEl = document.createElement('div');
        contentEl.className = 'message-content';
        contentEl.textContent = text;

        messageEl.appendChild(contentEl);
        this.messagesContainer.appendChild(messageEl);
    }

    async renderMessageWithTypewriter(type, text) {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${type}`;

        const contentEl = document.createElement('div');
        contentEl.className = 'message-content';

        messageEl.appendChild(contentEl);
        this.messagesContainer.appendChild(messageEl);

        // Typewriter effect
        for (let i = 0; i < text.length; i++) {
            contentEl.textContent += text[i];
            this.scrollToBottom();

            // Variable speed for more natural feel
            const delay = text[i] === '.' || text[i] === '?' || text[i] === '!' ? 100 :
                         text[i] === ',' ? 50 : 15;
            await this.delay(delay);
        }
    }

    showTyping() {
        this.isTyping = true;
        const typingEl = document.createElement('div');
        typingEl.className = 'typing-indicator';
        typingEl.id = 'typing-indicator';
        typingEl.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(typingEl);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    checkForLeadInfo(text) {
        // Check for email pattern
        const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
            this.userEmail = emailMatch[0];
            this.saveLead();
        }

        // Check if this might be a name (first message that's short and capitalized)
        if (!this.userName && this.messages.length <= 2) {
            const words = text.split(' ');
            if (words.length <= 3 && /^[A-Z]/.test(text)) {
                this.userName = text;
                this.saveLead();
            }
        }
    }

    saveLead() {
        if (!this.userName && !this.userEmail) return;

        const leads = JSON.parse(localStorage.getItem('springs_leads') || '[]');
        const existingLead = leads.find(l =>
            (this.userEmail && l.email === this.userEmail) ||
            (this.userName && l.name === this.userName)
        );

        if (existingLead) {
            // Update existing lead
            if (this.userName) existingLead.name = this.userName;
            if (this.userEmail) existingLead.email = this.userEmail;
            existingLead.updatedAt = new Date().toISOString();
        } else {
            // Create new lead
            leads.push({
                name: this.userName,
                email: this.userEmail,
                source: 'chat',
                createdAt: new Date().toISOString()
            });
        }

        localStorage.setItem('springs_leads', JSON.stringify(leads));
    }

    getFallbackResponse() {
        const fallbacks = [
            "I appreciate your patience! I'm having a brief connection issue. In the meantime, you can reach us directly at hello@springsai.com or check out our services page.",
            "Thanks for your message! I'm experiencing a technical hiccup. While I sort this out, feel free to explore our website or drop us a line at hello@springsai.com.",
            "I want to make sure I give you the best response! Let me reconnect - or you can always reach our team at hello@springsai.com for immediate assistance."
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    saveHistory() {
        sessionStorage.setItem('springs_chat_history', JSON.stringify(this.messages));
        sessionStorage.setItem('springs_chat_user', JSON.stringify({
            name: this.userName,
            email: this.userEmail
        }));
    }

    loadHistory() {
        const history = sessionStorage.getItem('springs_chat_history');
        const user = sessionStorage.getItem('springs_chat_user');

        if (history) {
            this.messages = JSON.parse(history);
            // Re-render messages
            this.messages.forEach(msg => {
                this.renderMessage(msg.role === 'user' ? 'user' : 'bot', msg.content);
            });
        }

        if (user) {
            const userData = JSON.parse(user);
            this.userName = userData.name;
            this.userEmail = userData.email;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
