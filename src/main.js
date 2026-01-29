import './style.css';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { Services } from './components/Services.js';
import { Demo } from './components/Demo.js';
import { Pricing } from './components/Pricing.js';
import { About } from './components/About.js';
import { Contact } from './components/Contact.js';
import { Chatbot } from './components/Chatbot.js';

document.querySelector('#app').innerHTML = `
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
