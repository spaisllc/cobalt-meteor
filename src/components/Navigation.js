/**
 * Navigation Component
 * Handles mobile menu toggle and active states
 */

export class Navigation {
    constructor() {
        this.nav = document.getElementById('main-nav');
        this.toggle = document.querySelector('.nav-toggle');
        this.links = document.querySelector('.nav-links');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.toggle || !this.links) return;

        // Toggle button click
        this.toggle.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking a link
        this.links.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.nav.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle scroll for nav background
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.toggle.setAttribute('aria-expanded', this.isOpen.toString());
        this.links.classList.toggle('open', this.isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', 'false');
        this.links.classList.remove('open');
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.nav.classList.toggle('scrolled', scrolled);
    }
}
