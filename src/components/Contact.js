/* src/components/Contact.js */
export function Contact() {
  return `
    <section id="contact" class="contact section-padding">
      <div class="container contact-container">
        <div class="section-header">
          <h2 class="section-title">Start Your <span class="text-gradient">Project</span></h2>
          <p class="section-subtitle">
            Tell us about your vision. We'll handle the tech. <br>
            Email us at: <a href="mailto:SpringsAISolutions@proton.me" style="color: var(--brand-blue)">SpringsAISolutions@proton.me</a>
          </p>
        </div>
        <form class="contact-form" onsubmit="event.preventDefault(); alert('Thanks! Email us directly at SpringsAISolutions@proton.me for the fastest response.');">
          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input type="text" id="name" class="form-input" placeholder="Your Name" required>
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-input" placeholder="john@example.com" required>
          </div>
          <div class="form-group">
            <label for="project" class="form-label">Project Type</label>
            <select id="project" class="form-input">
              <option value="general">General Inquiry</option>
              <option value="automation">AI Automation</option>
              <option value="data">Data Analysis</option>
              <option value="chatbot">Custom Chatbot</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" class="form-input" rows="5" placeholder="Tell us about your project..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Send Message</button>
        </form>
      </div>
    </section>
  `;
}
