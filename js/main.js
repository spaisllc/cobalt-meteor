// ========================================
// Springs AI Solutions — Main JS
// ========================================

// SPA Navigation - keeps voice overlay persistent across pages
const SPARouter = {
  init() {
    // Intercept all internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Only handle internal links (same origin, not anchors, not external)
      if (href.startsWith('#') ||
          href.startsWith('http') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          link.target === '_blank') {
        return;
      }

      // Prevent default navigation
      e.preventDefault();

      // Navigate via SPA
      this.navigate(href);
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.path) {
        this.loadPage(e.state.path, false);
      }
    });

    // Set initial state
    history.replaceState({ path: window.location.pathname }, '', window.location.pathname);
  },

  async navigate(path) {
    // Update URL
    history.pushState({ path }, '', path);

    // Load the page content
    await this.loadPage(path, true);
  },

  async loadPage(path, scroll = true) {
    try {
      // Fetch the new page
      const response = await fetch(path);
      if (!response.ok) throw new Error('Page not found');

      const html = await response.text();

      // Parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Get the main content (everything between nav and footer, or body content)
      const newNav = doc.querySelector('.nav');
      const newMain = doc.querySelector('body');
      const newTitle = doc.querySelector('title');

      // Update title
      if (newTitle) {
        document.title = newTitle.textContent;
      }

      // Replace body content but preserve our overlay and scripts
      const overlay = document.getElementById('visual-voice-overlay');
      const modal = document.getElementById('welcome-modal');

      // Get all content except nav, overlay, modal, and scripts
      const currentBody = document.body;
      const preservedOverlay = overlay ? overlay.cloneNode(true) : null;
      const preservedModal = modal ? modal.cloneNode(true) : null;

      // Clear body except scripts
      const scripts = Array.from(currentBody.querySelectorAll('script'));

      // Copy new body content
      currentBody.innerHTML = newMain.innerHTML;

      // Re-add preserved elements
      if (preservedOverlay) {
        // Remove any duplicate overlay from new content
        const dupOverlay = currentBody.querySelector('#visual-voice-overlay');
        if (dupOverlay) dupOverlay.remove();
        currentBody.appendChild(preservedOverlay);
      }

      // Remove modal from new content (we don't want it to show again)
      const newModal = currentBody.querySelector('#welcome-modal');
      if (newModal) newModal.remove();

      // Re-execute inline scripts from the new page (innerHTML doesn't run them)
      currentBody.querySelectorAll('script:not([type="module"])').forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
      });

      // Re-initialize page features
      this.reinitPage();

      // Scroll to top
      if (scroll) {
        window.scrollTo(0, 0);
      }

    } catch (error) {
      console.error('SPA Navigation error:', error);
      // Fallback to regular navigation
      window.location.href = path;
    }
  },

  reinitPage() {
    // Re-run scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.15 });

      reveals.forEach(el => observer.observe(el));
    }

    // Update active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });

    // Re-attach mobile menu toggle
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.onclick = () => {
        toggle.classList.toggle('open');
        links.classList.toggle('open');
      };
      links.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
          toggle.classList.remove('open');
          links.classList.remove('open');
        };
      });
    }

    // Re-attach talk button if exists
    const talkBtn = document.getElementById('vapi-talk-btn');
    if (talkBtn && window.VisualVoice) {
      talkBtn.onclick = (e) => {
        e.preventDefault();
        window.VisualVoice.toggleCall();
      };
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // --- Initialize SPA Router ---
  SPARouter.init();

  // --- Navbar scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // --- Scroll reveal ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

});
