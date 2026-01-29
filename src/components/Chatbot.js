/* src/components/Chatbot.js */
export function Chatbot() {
  setTimeout(() => {
    initChatbot();
  }, 100);

  return `
    <div id="chatbot-widget" class="chatbot-widget">
      <button id="chatbot-trigger" class="chatbot-trigger">
        <span class="icon">💬</span>
      </button>
      
      <div id="chatbot-window" class="chatbot-window hidden">
        <div class="chat-header">
          <div class="bot-info">
            <div class="bot-avatar">AI</div>
            <div>
              <div class="bot-name">Springs Rep</div>
              <div class="bot-status">Online</div>
            </div>
          </div>
          <button id="chatbot-close" class="close-btn">×</button>
        </div>
        
        <div id="chat-messages" class="chat-messages">
          <div class="message bot">
            <div class="message-content">
              Hello! I'm the Springs AI Solutions virtual assistant. How can I help you today?
            </div>
          </div>
        </div>
        
        <form id="chat-form" class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Type a message..." autocomplete="off">
          <button type="submit" class="send-btn">➤</button>
        </form>
      </div>
    </div>
  `;
}

function initChatbot() {
  const trigger = document.getElementById('chatbot-trigger');
  const window = document.getElementById('chatbot-window');
  const close = document.getElementById('chatbot-close');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  if (!trigger || !window) return;

  const toggleChat = () => {
    window.classList.toggle('hidden');
    if (!window.classList.contains('hidden')) {
      input.focus();
    }
  };

  trigger.addEventListener('click', toggleChat);
  close.addEventListener('click', toggleChat);

  // Expose global opener
  window.openChatbot = (msg) => {
    if (window.classList.contains('hidden')) {
      toggleChat();
    }
    if (msg) {
      addMessage(msg, 'bot');
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    // User Message
    addMessage(text, 'user');
    input.value = '';

    // Simulate Bot Response
    showTyping();
    setTimeout(() => {
      removeTyping();
      const response = getBotResponse(text);
      addMessage(response, 'bot');
    }, 1500);
  });

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerHTML = `<div class="message-content">${text}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.id = 'typing-indicator';
    div.className = 'message bot';
    div.innerHTML = `<div class="message-content typing"><span>.</span><span>.</span><span>.</span></div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function getBotResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes('price') || lower.includes('cost')) {
      return "We offer flexible pricing starting with affordable tiers for freelancers. Contact us for a quote!";
    }
    if (lower.includes('service') || lower.includes('do')) {
      return "We specialize in AI automation, data analysis, and custom chatbots. What are you looking to build?";
    }
    if (lower.includes('data') || lower.includes('analysis')) {
      return "We specialize in data analysis and insight extraction. Let's chat about your specific needs!";
    }
    return "That's interesting! Tell me more, or click 'Contact Us' to get in touch with a human expert.";
  }
}
