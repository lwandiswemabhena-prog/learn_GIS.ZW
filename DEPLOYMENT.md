# GIS Learn ZW - Deployment Guide

## Option 1: Deploy to Vercel (Recommended - Free, HTTPS Built-in)

### Steps:
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to https://vercel.com
3. Click "Import Project"
4. Connect your repository
5. Click "Deploy"
6. Vercel automatically gives you:
   - HTTPS certificate
   - Public URL like: https://gis-learn-zw.vercel.app
   - Custom domain support

### Custom Domain (Optional):
- Add your domain in Vercel Settings > Domains
- Update DNS records as Vercel instructs
- HTTPS certificate auto-generated

---

## Option 2: Deploy to Netlify (Free, HTTPS Built-in)

### Steps:
1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy site"
8. Get HTTPS at: https://your-site.netlify.app

---

## Option 3: Self-Host with Docker + Let's Encrypt (Advanced)

### Create Dockerfile:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Deploy and get free HTTPS with Certbot:
- Host on VPS (DigitalOcean, AWS, Linode)
- Use Let's Encrypt (free SSL certificates)
- Auto-renewal with Certbot

---

## Quick Start for Production Build

Run locally first:
\`\`\`bash
npm run build
npm run preview
\`\`\`

Then deploy to Vercel or Netlify.

---

## Environment Variables (if needed)

Create `.env` file:
\`\`\`
VITE_API_URL=https://api.yourdomain.com
VITE_MAP_TILES=https://tile.openstreetmap.org
\`\`\`

Reference in code:
\`\`\`javascript
const apiUrl = import.meta.env.VITE_API_URL;
\`\`\`
