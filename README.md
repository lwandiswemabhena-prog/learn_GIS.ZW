# 🗺️ GIS Learn ZW - Geographic Information System Platform

A modern, web-based GIS platform for visualizing shapefiles, GeoJSON data, and interactive geospatial analysis.

## Features

✅ **Interactive Map Visualization**
- OpenStreetMap (OSM) background tiles
- WGS 1984 coordinate system support
- Real-time zoom, pan, and feature interaction

✅ **Data Import**
- GeoJSON file import
- Shapefile (`.zip`) import with `shpjs`
- Multi-layer visualization

✅ **Interactive Lessons**
- 6 GIS courses with embedded maps
- Real-world spatial data examples
- Progressive skill levels

✅ **Admin Control Center**
- User management dashboard
- Course management
- Billing & revenue tracking
- System settings

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# The app will be available at http://localhost:5173/
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The `dist/` folder is ready to deploy with automatic HTTPS.

## Deployment Options

### 🚀 **Option 1: Vercel (Recommended)**

**Easiest - HTTPS included, free tier**

1. Push code to GitHub: https://github.com/new
2. Go to https://vercel.com
3. Click "Import Project" → select your GitHub repo
4. Click "Deploy"
5. **Done!** Your site is live at `https://your-project.vercel.app` with automatic HTTPS

Get custom domain:
- Vercel Dashboard > Settings > Domains
- Add your domain
- Update DNS
- HTTPS auto-provisioned

### 🌐 **Option 2: Netlify**

**Also free with HTTPS**

1. Push to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy
8. Live at `https://your-site.netlify.app`

### 🐳 **Option 3: Docker + VPS (Full Control)**

**For custom servers, VPS hosting**

```bash
# Build Docker image
docker build -t gis-learn-zw .

# Run container
docker run -p 3000:3000 gis-learn-zw

# For docker-compose
docker-compose up -d
```

Get free HTTPS with Let's Encrypt:
```bash
# On your VPS/server:
sudo apt-get install certbot nginx
sudo certbot certonly --standalone -d yourdomain.com
```

Then configure Nginx as reverse proxy with SSL.

## File Structure

```
learn_GIS/
├── src/
│   ├── components/
│   │   ├── InteractiveMap.tsx        # Leaflet map component
│   │   ├── FileUpload.tsx            # GeoJSON/Shapefile upload
│   │   ├── DataVisualizationDashboard.tsx
│   │   ├── LessonsPage.tsx           # 6 GIS courses
│   │   ├── AdminControlCenter.tsx    # Owner dashboard
│   │   └── ...
│   ├── pages/
│   │   └── index.tsx                 # Main app
│   ├── lib/
│   │   └── utils.ts
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── vercel.json                       # Vercel config
├── Dockerfile                        # Docker config
└── docker-compose.yml
```

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Mapping**: Leaflet + OpenStreetMap
- **Data**: shpjs (Shapefile), GeoJSON
- **UI Components**: Radix UI + Lucide Icons
- **Deployment**: Vercel, Netlify, Docker

## Environment Variables

Create `.env` file (optional):
```env
VITE_API_URL=https://api.yourdomain.com
```

Use in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## API Routes

All routes are client-side. For backend API integration:

```javascript
// Example API call
const response = await fetch('https://api.yourdomain.com/data');
const data = await response.json();
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Admin Access

**Click the "GIS Learn ZW" logo** in navbar to access the admin control center (owner dashboard).

Features:
- User management
- Course administration
- Analytics & billing
- System settings

## License

MIT License - Open source GIS education platform

## Support

For issues or feature requests, create an issue on GitHub.

---

**Deploy to Production in 5 minutes with Vercel or Netlify!**
