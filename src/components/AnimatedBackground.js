/**
 * Animated Background Component
 * Springs AI Solutions, LLC
 * Canvas-based grid and network animation - AI-themed aesthetic
 */

export class AnimatedBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.gridSpacing = 80;
        this.isAnimating = false;
        this.time = 0;

        // Start hidden for boot sequence
        this.canvas.style.opacity = '0';
        this.canvas.style.transition = 'opacity 0.8s ease-out';

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initNodes();
    }

    initNodes() {
        this.nodes = [];
        // Create nodes that float and connect - like neural network visualization
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 25000);

        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 2,
                pulseOffset: Math.random() * Math.PI * 2
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

        this.time += 0.01;

        // Clear with solid black for crisp look
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines - subtle but visible
        this.drawGrid();

        // Draw network connections first (behind nodes)
        this.drawConnections();

        // Draw and update nodes
        this.drawNodes();

        requestAnimationFrame(() => this.animate());
    }

    drawGrid() {
        const spacing = this.gridSpacing;

        // Subtle pulsing effect on grid opacity
        const baseOpacity = 0.08 + Math.sin(this.time * 0.5) * 0.02;

        this.ctx.strokeStyle = `rgba(0, 204, 204, ${baseOpacity})`;
        this.ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= this.canvas.width; x += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= this.canvas.height; y += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawConnections() {
        const connectionDistance = 150;

        for (let i = 0; i < this.nodes.length; i++) {
            const nodeA = this.nodes[i];

            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeB = this.nodes[j];
                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 0.4 * (1 - distance / connectionDistance);

                    // Draw glowing connection line
                    this.ctx.strokeStyle = `rgba(0, 204, 204, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodeA.x, nodeA.y);
                    this.ctx.lineTo(nodeB.x, nodeB.y);
                    this.ctx.stroke();

                    // Add glow effect for closer connections
                    if (distance < connectionDistance * 0.5) {
                        this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
                        this.ctx.lineWidth = 3;
                        this.ctx.beginPath();
                        this.ctx.moveTo(nodeA.x, nodeA.y);
                        this.ctx.lineTo(nodeB.x, nodeB.y);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }

    drawNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Wrap around edges
            if (node.x < 0) node.x = this.canvas.width;
            if (node.x > this.canvas.width) node.x = 0;
            if (node.y < 0) node.y = this.canvas.height;
            if (node.y > this.canvas.height) node.y = 0;

            // Pulsing size effect
            const pulse = Math.sin(this.time * 2 + node.pulseOffset) * 0.3 + 1;
            const currentSize = node.size * pulse;

            // Draw outer glow
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, currentSize * 3
            );
            gradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
            gradient.addColorStop(0.5, 'rgba(0, 204, 204, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 204, 204, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentSize * 3, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw solid node center
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.9)';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}
