export function Demo() {
  return `
    <section id="demo" class="demo scroll-animate">
      <div class="container">
        <h2 class="section-title">See It In Action</h2>
        <p class="section-subtitle">This is exactly what you'll get—a professional, interactive resume website</p>
        
        <div class="demo-container">
          <div class="demo-preview">
            <div class="browser-mockup">
              <div class="browser-bar">
                <div class="browser-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="browser-url">alexjohnson.site</div>
              </div>
              <div class="browser-content">
                <div class="demo-hero">
                  <h3>Alex Johnson</h3>
                  <p>Full Stack Developer</p>
                  <div class="demo-chatbot">
                    <div class="chatbot-message">
                      <strong>Recruiter:</strong> Tell me about your React experience
                    </div>
                    <div class="chatbot-message bot">
                      <strong>AI:</strong> I have 4+ years building React applications, including state management with Redux, Next.js for SSR, and TypeScript...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="demo-features">
            <h3>Why This Works</h3>
            <ul class="feature-list">
              <li>✅ Recruiters can ask questions instantly</li>
              <li>✅ Available 24/7, never miss an opportunity</li>
              <li>✅ Answers are based on YOUR actual resume</li>
              <li>✅ Professional, modern design that impresses</li>
              <li>✅ Works perfectly on mobile and desktop</li>
            </ul>
            <a href="#order" class="btn btn-primary">I Want This →</a>
          </div>
        </div>
        
        <div class="demo-comparison">
          <div class="comparison-item">
            <h4>❌ Traditional Resume</h4>
            <p>PDF lost in 300+ applications<br>No interaction<br>6 seconds of attention</p>
          </div>
          <div class="vs">VS</div>
          <div class="comparison-item highlight">
            <h4>✅ AI Resume Website</h4>
            <p>Stands out immediately<br>Answers questions 24/7<br>Recruiters spend minutes exploring</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
