# Deployment Guide

## Build Output
The production build is ready in the `build/` directory.

## Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Netlify
Push to GitHub, connect repository to Netlify dashboard.
`netlify.toml` will handle the build configuration.

### 3. Docker
```bash
docker build -t plant-shop .
docker run -p 3000:3000 plant-shop
```

### 4. Traditional Server
```bash
npm install -g serve
serve -s build -l 3000
```

### 5. GitHub Pages
Push to `main` or `master` branch. GitHub Actions will build automatically.

## Build Info
- Output: `build/` directory (119.74 kB JS gzip, 4.89 kB CSS gzip)
- Framework: React 18 + Tailwind CSS
- Ready for static hosting

## Environment Variables
Production configuration in `.env.production`
