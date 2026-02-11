import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                services: resolve(__dirname, 'services.html'),
                contact: resolve(__dirname, 'contact.html'),
                portfolio: resolve(__dirname, 'portfolio.html'),
                // Client sites
                'clients/paotie-dawson/index': resolve(__dirname, 'clients/paotie-dawson/index.html')
            }
        }
    },
    server: {
        port: 3000,
    },
    publicDir: 'public'
});
