// Typewriter effect utility
export function typeText(element, text, speed = 30) {
    return new Promise((resolve) => {
        element.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}

// Special faster typer for longer blocks
export function streamText(element, text, speed = 10) {
    return typeText(element, text, speed);
}
