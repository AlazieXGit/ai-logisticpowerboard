# LoadBoard AI + TMS Platform

Revolutionary AI-powered logistics platform with integrated Transportation Management System.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Access at: http://localhost:8080

### Production Deployment

#### Option 1: Docker (Recommended)
```bash
# Local deployment
chmod +x deploy.sh
./deploy.sh

# Production deployment with SSL
chmod +x deploy.prod.sh
./deploy.prod.sh
```

#### Option 2: Manual Build
```bash
npm install
npm run build:prod
npm run preview
```

## 📱 Mobile Access

### Progressive Web App (PWA)
1. Visit the website on mobile
2. Tap "Add to Home Screen" in browser menu
3. App installs like native mobile app

### EAS (Expo Application Services) - Native Mobile Apps
For building and deploying native iOS and Android apps using EAS:
- **[EAS_SETUP.md](./EAS_SETUP.md)** - Complete setup guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Includes EAS deployment instructions

Quick setup: `npm install -g eas-cli && eas login && eas init`

### Features
- ✅ Offline functionality
- ✅ Push notifications
- ✅ Native app experience
- ✅ Cross-platform compatibility

## 🌐 Web Access

### Live URLs
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
1. Copy `.env.example` to `.env.development` or `.env.production`
2. Fill in your actual credentials (never commit these files)
3. Configure Supabase credentials using environment variables
4. Update domain in `docker-compose.prod.yml`
5. Set SSL email in production config

### Security Notes
⚠️ **IMPORTANT**: Never commit `.env` files or hardcode credentials in source code
- See [SECURITY.md](SECURITY.md) for security best practices
- Use environment variables for all sensitive configuration
- Store CI/CD secrets in GitHub Secrets
- Review [SECURITY.md](SECURITY.md) before deployment

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
- **Mobile**: Expo Application Services (EAS)

## 📚 Documentation

- **[EAS_SETUP.md](./EAS_SETUP.md)** - Complete guide for Expo Application Services setup
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide for all platforms
- **[SECURITY.md](./SECURITY.md)** - Security best practices
- **[EAS_IMPLEMENTATION_SUMMARY.md](./EAS_IMPLEMENTATION_SUMMARY.md)** - Summary of EAS implementation

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
