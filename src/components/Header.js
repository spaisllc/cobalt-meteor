/* src/components/Header.js */
export function Header() {
    return `
    <header class="header">
      <div class="container header-content">
        <a href="/" class="logo">
          Springs <span class="text-gradient">AI</span>
        </a>
        <nav class="nav">
          <a href="#services" class="nav-link">Services</a>
          <a href="#about" class="nav-link">Mission</a>
          <a href="#contact" class="nav-link btn-primary">Contact Us</a>
        </nav>
      </div>
    </header>
  `;
}
