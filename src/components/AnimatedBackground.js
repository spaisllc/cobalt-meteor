/**
 * Animated Background Component
 * Springs AI Solutions, LLC
 * Canvas-based particle and grid animation
 */

export class AnimatedBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.gridLines = [];
        this.isAnimating = false;

        // Start hidden for boot sequence
        this.canvas.style.opacity = '0';
        this.canvas.style.transition = 'opacity 0.8s ease-out';

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initParticles();
        this.initGrid();
    }

    initParticles() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    initGrid() {
        this.gridLines = [];
        const spacing = 50;

        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += spacing) {
            this.gridLines.push({
                type: 'vertical',
                pos: x,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += spacing) {
            this.gridLines.push({
                type: 'horizontal',
                pos: y,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    start() {
        this.isAnimating = true;
        // Fade in the canvas
        this.canvas.style.opacity = '1';
        this.animate();
    }

    stop() {
        this.isAnimating = false;
    }

    animate() {
        if (!this.isAnimating) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;

        this.gridLines.forEach(line => {
            this.ctx.globalAlpha = line.opacity;
            this.ctx.beginPath();

            if (line.type === 'vertical') {
                this.ctx.moveTo(line.pos, 0);
                this.ctx.lineTo(line.pos, this.canvas.height);
            } else {
                this.ctx.moveTo(0, line.pos);
                this.ctx.lineTo(this.canvas.width, line.pos);
            }

            this.ctx.stroke();
        });

        this.ctx.globalAlpha = 1;

        // Draw and update particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw connections to nearby particles
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}
