/**
 * Springs AI Solutions - Main Application
 * Handles initialization for all pages
 */

import { AnimatedBackground } from './components/AnimatedBackground.js';
import { Navigation } from './components/Navigation.js';
import { ChatWidget } from './components/ChatWidget.js';

class App {
    constructor() {
        this.background = null;
        this.navigation = null;
        this.chatWidget = null;
        this.currentPage = document.body.dataset.page || 'home';
    }

    async init() {
        // Initialize animated background on all pages
        this.initBackground();

        // Initialize navigation
        this.initNavigation();

        // Initialize chat widget
        this.initChatWidget();

        // Initialize page-specific features
        this.initPageFeatures();

        // Set up global event listeners
        this.setupEventListeners();
    }

    initBackground() {
        const canvas = document.getElementById('background-canvas');
        if (canvas) {
            this.background = new AnimatedBackground('background-canvas');
            this.background.start();
        }
    }

    initNavigation() {
        this.navigation = new Navigation();
    }

    initChatWidget() {
        const chatWidgetEl = document.getElementById('chat-widget');
        if (chatWidgetEl) {
            this.chatWidget = new ChatWidget();
        }
    }

    initPageFeatures() {
        switch (this.currentPage) {
            case 'home':
                this.initHomePage();
                break;
            case 'about':
                this.initAboutPage();
                break;
            case 'services':
                this.initServicesPage();
                break;
            case 'contact':
                this.initContactPage();
                break;
        }
    }

    initHomePage() {
        // Hero chat button
        const heroChatBtn = document.getElementById('hero-chat-btn');
        if (heroChatBtn) {
            heroChatBtn.addEventListener('click', () => {
                this.chatWidget?.open();
            });
        }

        // CTA chat button
        const ctaChatBtn = document.getElementById('cta-chat-btn');
        if (ctaChatBtn) {
            ctaChatBtn.addEventListener('click', () => {
                this.chatWidget?.open();
            });
        }

        // Initialize embedded chat if present
        this.initEmbeddedChat();
    }

    initAboutPage() {
        // Animate elements on scroll
        this.initScrollAnimations();

        // CTA chat button
        const ctaChatBtn = document.getElementById('cta-chat-btn');
        if (ctaChatBtn) {
            ctaChatBtn.addEventListener('click', () => {
                this.chatWidget?.open();
            });
        }
    }

    initServicesPage() {
        // Service CTA buttons
        const serviceCtas = document.querySelectorAll('.service-cta');
        serviceCtas.forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.dataset.service;
                this.chatWidget?.open(service);
            });
        });

        // Pricing CTA buttons
        const pricingCtas = document.querySelectorAll('.pricing-cta');
        pricingCtas.forEach(btn => {
            btn.addEventListener('click', () => {
                this.chatWidget?.open('pricing');
            });
        });

        // CTA chat button
        const ctaChatBtn = document.getElementById('cta-chat-btn');
        if (ctaChatBtn) {
            ctaChatBtn.addEventListener('click', () => {
                this.chatWidget?.open();
            });
        }

        // Animate elements on scroll
        this.initScrollAnimations();
    }

    initContactPage() {
        // Contact form
        this.initContactForm();

        // Chat option button
        const contactChatBtn = document.getElementById('contact-chat-btn');
        if (contactChatBtn) {
            contactChatBtn.addEventListener('click', () => {
                this.chatWidget?.open();
            });
        }

        // CTA chat button
        const ctaChatBtn = document.getElementById('cta-chat-btn');
        if (ctaChatBtn) {
            ctaChatBtn.addEventListener('click', () => {
                this.chatWidget?.open();
            });
        }
    }

    initEmbeddedChat() {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer && this.chatWidget) {
            // Clone the chat panel into the embedded container
            // For now, we'll just use the floating widget
        }
    }

    initContactForm() {
        const form = document.getElementById('contact-form');
        const successEl = document.getElementById('form-success');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Store lead locally
                this.storeLead(data);

                // Show success message
                form.style.display = 'none';
                if (successEl) {
                    successEl.style.display = 'flex';
                }

                // TODO: Send to backend/email service
                console.log('Form submitted:', data);
            });
        }
    }

    storeLead(data) {
        const leads = JSON.parse(localStorage.getItem('springs_leads') || '[]');
        leads.push({
            ...data,
            timestamp: new Date().toISOString(),
            page: this.currentPage
        });
        localStorage.setItem('springs_leads', JSON.stringify(leads));
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements that should animate
        const animateElements = document.querySelectorAll(
            '.service-card, .belief-card, .pricing-card, .faq-item, .service-block, .about-section'
        );
        animateElements.forEach(el => observer.observe(el));
    }

    setupEventListeners() {
        // Nav chat button
        const navChatBtn = document.getElementById('nav-chat-btn');
        if (navChatBtn) {
            navChatBtn.addEventListener('click', () => {
                this.chatWidget?.open();
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

export { App };
