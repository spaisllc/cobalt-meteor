import './style.css';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { Services } from './components/Services.js';
import { Demo } from './components/Demo.js';
import { Pricing } from './components/Pricing.js';
import { About } from './components/About.js';
import { Chatbot } from './components/Chatbot.js';
import { AnimatedBackground } from './components/AnimatedBackground.js';
import { initScrollAnimations } from './utils/scrollAnimations.js';
import { initTerminal } from './components/TerminalInterface.js';

document.querySelector('#app').innerHTML = `
  ${AnimatedBackground()}
  ${Header()}
  <main>
    ${Hero()}
    ${Services()}
    ${Demo()}
    ${Pricing()}
    ${About()}
  </main>
  ${Chatbot()}
`;

// Initialize systems
setTimeout(() => {
  initScrollAnimations();
  initTerminal(); // Boot up Spacee
}, 100);
