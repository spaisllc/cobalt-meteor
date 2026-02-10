/**
 * OpenAI Service
 * Handles communication with OpenAI API through serverless proxy
 */

export class OpenAIService {
    constructor() {
        // Use relative path for serverless function
        this.apiEndpoint = '/.netlify/functions/chat';
        this.fallbackEndpoint = '/api/chat';
    }

    async chat(messages, systemPrompt) {
        const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
        ];

        try {
            // Try the serverless function first
            const response = await this.makeRequest(this.apiEndpoint, formattedMessages);
            return response;
        } catch (error) {
            console.warn('Primary endpoint failed, trying fallback:', error);

            try {
                // Try fallback endpoint
                const response = await this.makeRequest(this.fallbackEndpoint, formattedMessages);
                return response;
            } catch (fallbackError) {
                console.error('All endpoints failed:', fallbackError);
                throw new Error('Unable to connect to AI service');
            }
        }
    }

    async makeRequest(endpoint, messages) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.message || data.content || data.response;
    }
}

/**
 * Mock OpenAI Service for development
 * Uses pre-written responses when API is not available
 */
export class MockOpenAIService {
    constructor() {
        this.responses = {
            greeting: [
                "Hello! I'm S.P.A.I.S. - Springs AI Solutions Sales. What brings you here today?",
                "Hi there! I'm the AI sales agent for Springs AI Solutions. How can I help you explore our solutions?",
            ],
            services: [
                "We offer four main solutions: AI Sales Agents (like me!), Smart Chatbots, Email Assistants, and Custom AI Solutions. Which interests you most?",
                "Our services are designed to automate and enhance your customer interactions. Would you like to hear about our AI Sales Agents, Chatbots, Email tools, or Custom solutions?",
            ],
            pricing: [
                "Our pricing starts at $2,500/month for our Starter plan, which includes 1 AI agent and up to 1,000 conversations. Our Growth plan at $5,000/month offers 3 agents with unlimited conversations. Enterprise pricing is custom. What size is your team?",
                "Investment depends on your needs. Starter ($2,500/mo) is great for testing, Growth ($5,000/mo) for scaling, and Enterprise for full customization. What's your current monthly lead volume?",
            ],
            contact: [
                "I'd love to connect you with our team! What's the best email to reach you at?",
                "Let's get you in touch with our experts. Could you share your email address?",
            ],
            default: [
                "That's a great question! Let me help you understand how our AI solutions could work for your specific situation. Could you tell me more about your business?",
                "I appreciate you sharing that! Our AI employees are customized for each client. What's your main goal - generating more leads, improving response times, or something else?",
                "Interesting! Many businesses like yours have seen great results with our AI. What challenges are you currently facing with customer engagement?",
            ]
        };
    }

    async chat(messages) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

        const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

        // Simple keyword matching
        if (lastMessage.includes('price') || lastMessage.includes('cost') || lastMessage.includes('invest')) {
            return this.getRandomResponse('pricing');
        }
        if (lastMessage.includes('service') || lastMessage.includes('offer') || lastMessage.includes('what do you')) {
            return this.getRandomResponse('services');
        }
        if (lastMessage.includes('contact') || lastMessage.includes('talk') || lastMessage.includes('call') || lastMessage.includes('demo')) {
            return this.getRandomResponse('contact');
        }

        return this.getRandomResponse('default');
    }

    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
}
