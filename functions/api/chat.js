/**
 * Cloudflare Pages Function: Chat
 * Proxies requests to OpenAI API to keep API key secure
 * Path: /functions/api/chat.js (Maps to /api/chat)
 */

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Simple in-memory rate limiter (per isolate)
const rateLimiter = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute per IP

export async function onRequestPost({ request, env }) {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
        return new Response(JSON.stringify({ error: 'Too many requests. Please wait a moment.' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const apiKey = env.OPENAI_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'AI service not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Invalid request: messages array required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
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
            return new Response(JSON.stringify({
                error: 'AI service temporarily unavailable',
                details: errorData
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = await response.json();
        const message = data.choices?.[0]?.message?.content;

        if (!message) {
            return new Response(JSON.stringify({ error: 'Invalid response from AI service' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ message }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: 'An error occurred processing your request',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

function checkRateLimit(clientIP) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    let record = rateLimiter.get(clientIP);

    if (!record) {
        record = { requests: [], blocked: false };
        rateLimiter.set(clientIP, record);
    }

    record.requests = record.requests.filter(time => time > windowStart);

    if (record.requests.length >= RATE_LIMIT_MAX) {
        return false;
    }

    record.requests.push(now);
    return true;
}
