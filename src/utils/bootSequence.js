export async function runBootSequence(terminalNode) {
    const history = terminalNode.querySelector('#terminal-history');
    if (!history) return;

    // Helper to clear
    const clear = () => history.innerHTML = '';

    // Helper for adding styled lines
    const add = (text, cls = '', speed = 5) => {
        const div = document.createElement('div');
        div.className = `boot-line ${cls}`;
        div.textContent = text;
        history.appendChild(div);
        window.scrollTo(0, document.body.scrollHeight);
        return new Promise(r => setTimeout(r, speed)); // Just delay, not typing for speed
    };

    // 1. BINARY CHAOS (The Foundation)
    // We'll fill the screen with random binary
    const binaryChars = '01';
    const fillScreen = async () => {
        const div = document.createElement('div');
        div.className = 'binary-wall';
        history.appendChild(div);

        for (let i = 0; i < 30; i++) {
            let str = '';
            for (let j = 0; j < 80; j++) str += Math.random() > 0.5 ? '1' : '0';
            div.textContent = str;
            await new Promise(r => setTimeout(r, 50));
        }
        div.remove();
    };

    await fillScreen();
    clear();

    // 2. MAINFRAME ERA (1960s)
    await add('>> INITIALIZING LEGACY PROTOCOLS...', 'amber-text', 200);
    await add('LOADING IBM SYSTEM/360 KERNEL...', 'amber-text', 100);
    await add('[OK] MAGNETIC CORE MEMORY', 'amber-text', 100);
    await add('[OK] PUNCH CARD I/O', 'amber-text', 300);
    await new Promise(r => setTimeout(r, 1500)); // Slowed down from 600ms
    // clear();

    // 3. DESKTOP/INTERNET ERA (1990s)
    await add('>> BOOTING PERSONAL COMPUTING INTERFACE...', 'green-text', 200);
    await add('C:\\> ESTABLISHING TCP/IP CONNECTION...', 'green-text', 100);
    await add('BW: 56K... CONNECTED.', 'green-text', 100);
    await add('LOADING WORLD_WIDE_WEB.EXE...', 'green-text', 300);
    await new Promise(r => setTimeout(r, 1500)); // Slowed down
    // clear();

    // 4. COMPUTE ERA (2010s)
    await add('>> ACCELERATING GPU CLUSTER...', 'blue-text', 200);
    await add('DETECTING NVIDIA H100 NODES...', 'blue-text', 50);
    await add('ALLOCATING TENSOR CORES [|||||||||||||||||] 100%', 'blue-text', 50);
    await add('PROCESSING BIG DATA STREAMS...', 'blue-text', 300);
    await new Promise(r => setTimeout(r, 1500)); // Slowed down
    // clear();

    // 5. AI ERA (Today)
    clear(); // Big clear for the reveal
    await add('>> LOADING NEURAL NETWORK MODEL...', 'purple-text', 200);
    await add('SYNAPSES: 1.7 TRILLION', 'purple-text', 100);
    await add('LLM WEIGHTS: LOADED.', 'purple-text', 100);
    await add('AGENTIC REASONING: ACTIVE.', 'purple-text', 1500); // 1.5s pause for drama

    // Flash effect before Spacee
    history.classList.add('flash-white');
    await new Promise(r => setTimeout(r, 100));
    history.classList.remove('flash-white');
    clear();
}
