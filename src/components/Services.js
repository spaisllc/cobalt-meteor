/* src/components/Services.js */
export function Services() {
  const services = [
    {
      title: "Beautiful Resume Display",
      desc: "Your experience, skills, and achievements presented in a stunning, modern layout that makes recruiters want to keep reading.",
      icon: "✨"
    },
    {
      title: "AI ChatBot Assistant",
      desc: "Answers recruiter questions 24/7 about your experience, skills, career gaps, and availability. Never miss an opportunity.",
      icon: "🤖"
    },
    {
      title: "Mobile-Optimized",
      desc: "Looks perfect on desktop, tablet, and phone. Recruiters can review your site anywhere, anytime.",
      icon: "📱"
    },
    {
      title: "Custom Domain Ready",
      desc: "Use your own domain (yourname.com) or we'll host it on a professional subdomain. Your choice.",
      icon: "🌐"
    },
    {
      title: "Fast Delivery",
      desc: "Order today, get your site in 48 hours. Upload your resume, pick a theme, and we handle everything else.",
      icon: "⚡"
    },
    {
      title: "Lifetime Hosting",
      desc: "One-time $299 fee includes hosting forever. No monthly bills, no hidden costs, no surprises.",
      icon: "💰"
    }
  ];

  const cardsHtml = services.map(service => `
    <div class="service-card">
      <div class="service-icon">${service.icon}</div>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-desc">${service.desc}</p>
    </div>
  `).join('');

  return `
    <section id="features" class="services section-padding scroll-animate">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What <span class="text-gradient">You Get</span></h2>
          <p class="section-subtitle">Everything you need to stand out and get hired</p>
        </div>
        <div class="services-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}
