import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import emailHandler from './api/sendEmail.js'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-workflows',
      apply: 'build',
      generateBundle() {
        const publicPath = path.join(process.cwd(), 'public', 'n8n_workflows_data.json');
        const rootPath = path.join(process.cwd(), 'n8n_workflows_data.json');
        const source = fs.existsSync(publicPath) ? publicPath : (fs.existsSync(rootPath) ? rootPath : null);
        if (source) {
          try {
            const content = fs.readFileSync(source, 'utf-8');
            this.emitFile({
              type: 'asset',
              fileName: 'n8n_workflows_data.json',
              source: content
            });
          } catch (e) {
            console.warn('Skipping n8n_workflows_data.json build copy:', e.message);
          }
        }
      }
    },
    {
      name: 'local-api-server',
      configureServer(server) {
        // Serve n8n_workflows_data.json directly from public
        server.middlewares.use('/n8n_workflows_data.json', (req, res) => {
          try {
            const filePath = path.join(process.cwd(), 'public', 'n8n_workflows_data.json');
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(fileContent);
          } catch (e) {
            console.error('Error serving workflows JSON:', e.message);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'File not found' }));
          }
        });

        // Email API endpoint
        server.middlewares.use('/api/sendEmail', async (req, res, next) => {
          if (req.method !== 'POST') return next();
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = JSON.parse(body || '{}');
            } catch (e) {
              req.body = {};
            }
            res.status = (code) => { res.statusCode = code; return res; };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            await emailHandler(req, res);
          });
        });
      }
    }
  ],
  optimizeDeps: {
    include: ['ogl']
  },
  ssr: {
    noExternal: ['ogl']
  }
})
