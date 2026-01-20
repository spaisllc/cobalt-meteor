/* src/components/Services.js */
export function Services() {
  const services = [
    {
      title: "AI Personal Sites",
      desc: "Stand out with a stunning resume website featuring your own personal chatbot to answer recruiter questions 24/7.",
      icon: "✨"
    },
    {
      title: "Data Insights",
      desc: "Unlock hidden value in public records. Perfect for citizen journalists and researchers analyzing complex datasets.",
      icon: "📊"
    },
    {
      title: "Custom Solutions",
      desc: "From automating small business workflows to building custom AI agents, we handle the tech so you can focus on growth.",
      icon: "⚡"
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
    <section id="services" class="services section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Our <span class="text-gradient">Services</span></h2>
          <p class="section-subtitle">Tailored AI solutions for the modern era.</p>
        </div>
        <div class="services-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}
