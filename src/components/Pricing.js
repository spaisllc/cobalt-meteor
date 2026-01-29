export function Pricing() {
    return `
    <section id="order" class="pricing">
      <div class="container">
        <h2 class="section-title">Ready to Stand Out?</h2>
        <p class="section-subtitle">Get your AI-powered resume website in 48 hours</p>
        
        <div class="pricing-card">
          <div class="price-badge">
            <div class="price-amount">$299</div>
            <div class="price-label">One-time payment</div>
          </div>
          
          <h3>What's Included:</h3>
          <ul class="pricing-features">
            <li>✅ Custom resume website with your design theme</li>
            <li>✅ AI chatbot trained on your experience</li>
            <li>✅ Mobile-responsive design</li>
            <li>✅ Lifetime hosting (no monthly fees!)</li>
            <li>✅ SSL certificate & professional domain</li>
            <li>✅ Delivered in 48 hours or less</li>
            <li>✅ One round of revisions included</li>
          </ul>
          
          <div class="order-form">
            <h4>Get Started:</h4>
            <form id="order-form" class="simple-order-form">
              <input type="text" name="name" placeholder="Your Full Name" required>
              <input type="email" name="email" placeholder="Your Email" required>
              <input type="tel" name="phone" placeholder="Phone (optional)">
              <div class="file-upload">
                <label for="resume">Upload Your Resume (PDF)</label>
                <input type="file" id="resume" name="resume" accept=".pdf" required>
              </div>
              <textarea name="notes" placeholder="Any special requests or preferred design theme?" rows="3"></textarea>
              
              <div class="payment-buttons">
                <button type="submit" class="btn btn-primary btn-large">
                  Pay with Stripe ($299)
                </button>
                <button type="button" class="btn btn-secondary btn-large">
                  Pay with PayPal ($299)
                </button>
              </div>
              
              <p class="guarantee">🔒 Secure payment • Money-back guarantee if not satisfied</p>
            </form>
          </div>
        </div>
        
        <div class="faq-quick">
          <h3>Quick Questions?</h3>
          <div class="faq-item">
            <strong>Q: How long does it take?</strong>
            <p>A: 48 hours from payment to delivery. Sometimes faster!</p>
          </div>
          <div class="faq-item">
            <strong>Q: Can I use my own domain?</strong>
            <p>A: Yes! Or we'll provide a professional subdomain for free.</p>
          </div>
          <div class="faq-item">
            <strong>Q: What if I need changes?</strong>
            <p>A: One round of revisions is included. We want you to love it!</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
