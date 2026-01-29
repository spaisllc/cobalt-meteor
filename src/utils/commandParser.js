import { setTerminalState, TerminalState, getUserName } from './terminalState.js';

export function parseCommand(input) {
    const normalize = (str) => str.toLowerCase().trim();
    const cmd = normalize(input);
    const name = getUserName();

    // Keyword matching
    if (cmd.includes('service') || cmd === 'show services') {
        return {
            type: 'SHOW_SERVICES',
            response: `Excellent choice, ${name}. Materializing our service matrix now...`
        };
    }

    if (cmd.includes('price') || cmd.includes('cost') || cmd === 'pricing') {
        return {
            type: 'SHOW_PRICING',
            response: `Accessing pricing tiers for you, ${name}...`
        };
    }

    if (cmd.includes('resume') || cmd.includes('job') || cmd.includes('site')) {
        return {
            type: 'SHOW_RESUME',
            response: `Initiating "Build Your Job Site" protocol. Prepare for upload...`
        };
    }

    if (cmd.includes('about') || cmd.includes('who are you')) {
        return {
            type: 'TEXT_ONLY',
            response: `I am S.P.A.I.S, the digital concierge for Springs AI Solutions. We bridge the gap between human intent and artificial intelligence.`
        };
    }

    if (cmd === 'clear') {
        return { type: 'CLEAR' };
    }

    // Easter Eggs
    if (cmd === 'hack the planet') {
        return {
            type: 'HACK',
            response: `ACCESS GRANTED. SYSTEM OVERRIDE INITIATED... Just kidding, ${name}. Security is tight here.`
        };
    }

    if (cmd.includes('hello') || cmd.includes('hi')) {
        return {
            type: 'TEXT_ONLY',
            response: `Hello again, ${name}. Ready to innovate?`
        };
    }

    // Default fallback
    return {
        type: 'TEXT_ONLY',
        response: `Command not recognized. Try "services", "pricing", or "resume sites".`
    };
}
