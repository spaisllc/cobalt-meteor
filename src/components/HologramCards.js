export function HologramCards() {
    return `
    <div class="hologram-stage" id="hologram-stage">
      
      <!-- Card 1: Resume Sites -->
      <div class="holo-card" onclick="window.closeTerminalAndGo('#order')">
        <div class="holo-content">
          <div class="holo-icon">💼</div>
          <div class="holo-title">AI Job Site</div>
          <div class="holo-desc">
            Your personal interactive resume website. 
            Includes AI Agent chatbot and portfolio showcase.
          </div>
        </div>
        <div class="holo-price">$299</div>
      </div>

      <!-- Card 2: Custom Solutions -->
      <div class="holo-card" onclick="window.closeTerminalAndGo('#contact')">
        <div class="holo-content">
          <div class="holo-icon">⚡</div>
          <div class="holo-title">Custom AI</div>
          <div class="holo-desc">
            Bespoke automation agents and workflows tailored 
            to your specific business needs.
          </div>
        </div>
        <div class="holo-price">Custom</div>
      </div>

      <!-- Card 3: Data Insights -->
      <div class="holo-card" onclick="window.closeTerminalAndGo('#contact')">
        <div class="holo-content">
          <div class="holo-icon">📊</div>
          <div class="holo-title">Data Mining</div>
          <div class="holo-desc">
            Unlock hidden value in public records and 
            complex datasets with AI analysis.
          </div>
        </div>
        <div class="holo-price">Custom</div>
      </div>

    </div>
  `;
}
