/**
 * Cloudflare Pages Function: /api/chat
 * Proxies requests to Mercury 2 (Inception Labs) API to keep API key secure
 */

const MERCURY_API_URL = 'https://api.inceptionlabs.ai/v1/chat/completions';

export async function onRequest(context) {
    const { request, env } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    }

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const apiKey = env.INCEPTION_API_KEY;

    if (!apiKey) {
        console.error('INCEPTION_API_KEY not configured');
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

        const response = await fetch(MERCURY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'mercury-2',
                messages: messages,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Mercury 2 API error:', response.status, errorData);
            return new Response(JSON.stringify({ error: 'AI service temporarily unavailable' }), {
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
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
                'Access-Control-Allow-Origin': '*',
            }
        });

    } catch (error) {
        console.error('Chat function error:', error);
        return new Response(JSON.stringify({ error: 'An error occurred processing your request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
