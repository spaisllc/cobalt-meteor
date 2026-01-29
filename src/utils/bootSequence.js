export async function runBootSequence(terminalNode) {
    const history = terminalNode.querySelector('#terminal-history');
    if (!history) return;

    const clear = () => history.innerHTML = '';

    // Updated add helper with customizable speed
    const add = (text, cls = '', speed = 5) => {
        const div = document.createElement('div');
        div.className = `boot-line ${cls}`;
        div.textContent = text;
        history.appendChild(div);
        window.scrollTo(0, document.body.scrollHeight);
        return new Promise(r => setTimeout(r, speed));
    };

    // 1. BINARY CHAOS
    const fillScreen = async () => {
        const div = document.createElement('div');
        div.className = 'binary-wall';
        history.appendChild(div);
        for (let i = 0; i < 25; i++) {
            let str = '';
            for (let j = 0; j < 80; j++) str += Math.random() > 0.5 ? '1' : '0';
            div.textContent = str;
            await new Promise(r => setTimeout(r, 60));
        }
        div.remove();
    };

    await fillScreen();
    clear();

    // 2. MAINFRAME ERA (1960s) - Slow, Deliberate
    await add('>> INITIALIZING LEGACY PROTOCOLS...', 'amber-text', 400);
    await add('MOUNTING TAPE DRIVE UNIT A...', 'amber-text', 600);
    await add('READING BATCH JOB 0X400...', 'amber-text', 400);
    await add('ALLOCATING VACUUM TUBES...', 'amber-text', 500);
    await add('COMPILING FORTRAN SOURCE...', 'amber-text', 800);
    await add('[OK] MAGNETIC CORE MEMORY', 'amber-text', 300);
    await add('[OK] PUNCH CARD I/O STREAM', 'amber-text', 1000);

    // 3. DESKTOP ERA (1990s) - Steady
    await add('>> BOOTING PERSONAL COMPUTING INTERFACE...', 'green-text', 400);
    await add('HIMEM.SYS LOADED.', 'green-text', 200);
    await add('C:\\> ESTABLISHING TCP/IP CONNECTION...', 'green-text', 400);
    await add('DIALING: ATDT 555-0199...', 'green-text', 600);
    await add('HANDSHAKE: ... ... CONNECTED 56K.', 'green-text', 400);
    await add('STARTING NETSCAPE NAVIGATOR...', 'green-text', 500);
    await add('LOADING WORLD_WIDE_WEB.EXE...', 'green-text', 1200);

    // 4. COMPUTE ERA (2010s) - Fast & Intense
    await add('>> ACCELERATING GPU CLUSTER...', 'blue-text', 100);
    await add('DETECTING NVIDIA CUDA CORES...', 'blue-text', 50);
    await add('ALLOCATING VRAM [|||||||||||||||||] 100%', 'blue-text', 50);
    await add('MINING DATA BLOCKS...', 'blue-text', 50);
    await add('OPTIMIZING TENSOR OPERATIONS...', 'blue-text', 50);
    await add('PROCESSING BIG DATA STREAMS...', 'blue-text', 800);

    // 5. THE REVEAL (Today)
    clear();

    // Create centered title container
    const titleContainer = document.createElement('div');
    titleContainer.className = 'boot-title-container';
    history.appendChild(titleContainer);

    const title = document.createElement('h1');
    title.className = 'boot-title fade-in-slow';
    title.textContent = 'Springs AI Solutions, LLC';
    titleContainer.appendChild(title);

    // Wait for fade in
    await new Promise(r => setTimeout(r, 3000));

    // Quick fade out of title to clear for Spacee
    title.style.opacity = '0';
    await new Promise(r => setTimeout(r, 1000));

    clear();
}
