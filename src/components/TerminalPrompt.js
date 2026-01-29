export function TerminalPrompt() {
    return `
    <div class="terminal-overlay">
      <div class="terminal-container">
        
        <!-- History Area -->
        <div id="terminal-history" class="terminal-history">
          <!-- Text will be typed here -->
        </div>

        <!-- Input Area -->
        <div class="input-area" id="input-area" style="opacity: 0">
          <span class="prompt-symbol">></span>
          <input type="text" 
                 id="cmd-input" 
                 class="cmd-input" 
                 autocomplete="off" 
                 autofocus
                 placeholder="Main Terminal Ready..."
          >
        </div>

        <!-- Suggestion Buttons -->
        <div class="quick-actions" id="quick-actions">
          <button class="action-btn" onclick="runCmd('show services')">Services</button>
          <button class="action-btn" onclick="runCmd('pricing')">Pricing</button>
          <button class="action-btn" onclick="runCmd('resume sites')">Build Job Site</button>
        </div>

        <!-- Hologram Stage -->
        <div id="hologram-container"></div>
      </div>
    </div>
  `;
}
