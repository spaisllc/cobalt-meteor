/* src/components/Hero.js */
export function Hero() {
  return `
    <section class="hero">
      <div class="ribbon-banner">OPENING SOON</div>
      <div class="hero-bg"></div>
      <div class="container hero-content">
        <h1 class="hero-title">
          Land Your Dream Job With An 
          <span class="text-gradient">AI-Powered Resume Website</span>
        </h1>
        <p class="hero-subtitle">
          Stand out from 300+ applicants. Recruiters spend <strong>6 seconds</strong> on your resume—
          make every second count with an interactive site that answers their questions 24/7.
        </p>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">48 hours</div>
            <div class="stat-label">Delivery Time</div>
          </div>
          <div class="stat">
            <div class="stat-number">$299</div>
            <div class="stat-label">One-Time Fee</div>
          </div>
          <div class="stat">
            <div class="stat-number">AI-Powered</div>
            <div class="stat-label">ChatBot Included</div>
          </div>
        </div>
        <div class="hero-actions">
          <a href="#demo" class="btn btn-glow">See a Live Example</a>
          <a href="#order" class="btn btn-outline">Order Yours Now</a>
        </div>
      </div>
    </section>
  `;
}
