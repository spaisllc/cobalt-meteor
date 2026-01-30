/**
 * Netlify Serverless Function: Chat
 * Proxies requests to OpenAI API to keep API key secure
 */

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Rate limiting (simple in-memory, resets on cold start)
const rateLimiter = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute per IP

export async function handler(event, context) {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Get client IP for rate limiting
    const clientIP = event.headers['x-forwarded-for']?.split(',')[0] ||
                     event.headers['client-ip'] ||
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
        return {
            statusCode: 429,
            body: JSON.stringify({ error: 'Too many requests. Please wait a moment.' })
        };
    }

    // Get API key from environment
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error('OPENAI_API_KEY not configured');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'AI service not configured' })
        };
    }

    try {
        const { messages } = JSON.parse(event.body);

        if (!messages || !Array.isArray(messages)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid request: messages array required' })
            };
        }

        // Call OpenAI API
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: messages,
                max_tokens: 500,
                temperature: 0.7,
                presence_penalty: 0.6,
                frequency_penalty: 0.3
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('OpenAI API error:', response.status, errorData);

            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: 'AI service temporarily unavailable',
                    details: process.env.NODE_ENV === 'development' ? errorData : undefined
                })
            };
        }

        const data = await response.json();
        const message = data.choices?.[0]?.message?.content;

        if (!message) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Invalid response from AI service' })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({ message })
        };

    } catch (error) {
        console.error('Chat function error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'An error occurred processing your request',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
}

function checkRateLimit(clientIP) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Get or create rate limit record
    let record = rateLimiter.get(clientIP);

    if (!record) {
        record = { requests: [], blocked: false };
        rateLimiter.set(clientIP, record);
    }

    // Remove old requests outside the window
    record.requests = record.requests.filter(time => time > windowStart);

    // Check if over limit
    if (record.requests.length >= RATE_LIMIT_MAX) {
        return false;
    }

    // Add current request
    record.requests.push(now);

    return true;
}
