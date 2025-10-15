# LoadBoard AI + TMS Platform

Revolutionary AI-powered logistics platform with integrated Transportation Management System.

## 🚀 Quick Start

### Using Docker (Recommended)

**Quick start with our helper script:**
```bash
chmod +x run.sh
./run.sh
```

**Or manually:**
```bash
# Copy environment file
cp .env.example .env

# Start services
docker compose up --build -d
```

**Access at:**
- Frontend: http://localhost:80
- Backend API: http://localhost:8000
- API Health: http://localhost:8000/health
- API Docs: http://localhost:8000/docs
- PostgreSQL: localhost:5432

**Domain Configuration:**
The application is configured for: **https://www.alazie.express**

For detailed Docker setup instructions, see [DOCKER_SETUP.md](./DOCKER_SETUP.md)

### Development (Frontend Only)
```bash
npm install
npm run dev
```
Access at: http://localhost:5173

### Production Deployment

See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for detailed production deployment instructions.

#### Quick Production Deploy
```bash
# With Docker
docker compose up --build -d

# Manual
npm run build
npm run preview
```

## 🏗️ Architecture

The platform consists of:
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend Express**: Node.js API server with Prisma
- **Backend FastAPI**: Python API server for AI features
- **Database**: PostgreSQL

## 🌐 Production Configuration

The application is configured for production deployment at **https://www.alazie.express**

### Environment Variables
```env
STRIPE_SECRET_KEY=sk_live_xxx
PLAID_CLIENT_ID=your_id
PLAID_SECRET=your_secret
WISE_API_KEY=your_key
VITE_API_URL=https://www.alazie.express
```

## 📱 Mobile Access

### Progressive Web App (PWA)
1. Visit the website on mobile
2. Tap "Add to Home Screen" in browser menu
3. App installs like native mobile app

### Features
- ✅ Offline functionality
- ✅ Push notifications
- ✅ Native app experience
- ✅ Cross-platform compatibility

## 🌐 Web Access

### Live URLs
- **Production**: https://www.alazie.express
- **Development**: http://localhost:8080
- **Production**: Configure your domain
- **Health Check**: /health endpoint

### Browser Support
- Chrome/Edge (Recommended)
- Firefox
- Safari
- Mobile browsers

## 🔧 Configuration

### Environment Setup
1. Configure Supabase credentials in `src/lib/supabase.ts`
2. Update domain in `docker-compose.prod.yml`
3. Set SSL email in production config

### SSL Certificate
Automatic SSL via Let's Encrypt when using production deployment.

## 📊 Features

### Core Platform
- AI-powered load matching
- Real-time dispatch dashboard
- Transportation Management System
- Integrated payment processing
- Social media platform integration
- Training modules with time limits
- Subscription management

### Mobile Features
- Responsive design
- Touch-optimized interface
- Offline capability
- Push notifications
- GPS integration ready

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Backend**: Supabase
- **Deployment**: Docker + Nginx
- **SSL**: Let's Encrypt
- **PWA**: Vite PWA Plugin

## 🚀 Deployment Status

✅ **Web Ready**: Fully responsive web application
✅ **Mobile Ready**: PWA with native app features
✅ **Production Ready**: Docker containerized with SSL
✅ **SEO Optimized**: Meta tags and keyword interception
✅ **Performance Optimized**: Code splitting and caching

## 📞 Support

For deployment assistance or technical support, contact the development team.

---

**LoadBoard AI** - Revolutionizing logistics through AI-powered technology.
