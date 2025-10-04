# Production Deployment Guide

## Overview
This guide provides instructions for deploying the AI Logistics Power Board application to production using Docker and docker-compose with the domain https://www.alazie.express.

## Prerequisites
- Docker and Docker Compose installed
- Domain configured with DNS pointing to your server
- SSL certificates for HTTPS (e.g., Let's Encrypt)
- Environment variables configured

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/AlazieXGit/ai-logisticpowerboard.git
cd ai-logisticpowerboard
```

### 2. Configure Environment Variables
Copy the example environment file and update with your actual values:
```bash
cp .env.example .env
```

Edit `.env` and set:
```
STRIPE_SECRET_KEY=sk_live_xxx
PLAID_CLIENT_ID=your_id
PLAID_SECRET=your_secret
WISE_API_KEY=your_key
VITE_API_URL=https://www.alazie.express
```

### 3. Build and Start Services
```bash
docker-compose --env-file .env up --build -d
```

This will start:
- PostgreSQL database on port 5432
- Express backend on port 4000
- FastAPI backend on port 5000
- React frontend on port 3000

### 4. Verify Services
Check that all services are running:
```bash
docker-compose ps
```

Test the FastAPI endpoints:
```bash
curl http://localhost:5000/api/upgrade-requests
curl http://localhost:5000/api/ai-integrations
```

## Architecture

### Services
1. **PostgreSQL** - Database server
   - Port: 5432
   - Database: tha_db
   - Health check: pg_isready

2. **Backend Express** - Node.js API server
   - Port: 4000
   - Runs Prisma migrations and seeds on startup
   - Handles payment processing and business logic

3. **Backend FastAPI** - Python API server
   - Port: 5000
   - Provides upgrade requests and AI integrations endpoints
   - CORS configured for production domain

4. **Frontend** - React application
   - Port: 3000
   - Built with Vite and React
   - API URL: https://www.alazie.express

## API Configuration

The frontend uses a centralized API configuration in `src/lib/api-config.ts`:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://www.alazie.express';
```

This allows easy switching between development and production environments.

## Development vs Production

### Development
For local development, set `VITE_API_URL=http://localhost:5000` in your `.env` file.

### Production
For production deployment, use `VITE_API_URL=https://www.alazie.express`.

## Deployment Steps

### Using Docker Compose
```bash
# Stop existing containers
docker-compose down

# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose --env-file .env up --build -d

# View logs
docker-compose logs -f
```

### Manual Deployment

#### Backend FastAPI
```bash
cd backend-fastapi
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 5000
```

#### Frontend
```bash
npm install
npm run build
npm run preview
```

## Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend-fastapi
```

### Health Checks
```bash
# PostgreSQL
docker-compose exec postgres pg_isready -U postgres

# Backend FastAPI
curl http://localhost:5000/api/upgrade-requests
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL container is healthy: `docker-compose ps`
- Check database credentials in environment variables
- Verify network connectivity between services

### CORS Errors
- Verify CORS configuration in `backend-fastapi/main.py`
- Ensure production domain is included in `allow_origins`
- Check browser console for specific CORS errors

### Frontend Not Loading
- Check that `VITE_API_URL` is set correctly
- Verify frontend container is running: `docker-compose ps`
- Check frontend logs: `docker-compose logs frontend`

## SSL/HTTPS Setup

For production deployment with HTTPS, use a reverse proxy like Nginx:

1. Install Nginx
2. Configure SSL certificates (Let's Encrypt recommended)
3. Set up reverse proxy to forward traffic to Docker containers
4. Update DNS records to point to your server

Example Nginx configuration:
```nginx
server {
    listen 443 ssl;
    server_name www.alazie.express;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` file to version control
2. **Database**: Use strong passwords and restrict network access
3. **CORS**: In production, restrict `allow_origins` to your specific domain
4. **SSL**: Always use HTTPS in production
5. **Secrets**: Rotate API keys and secrets regularly
6. **Updates**: Keep dependencies updated for security patches

## Scaling

To scale services horizontally:
```bash
docker-compose up --scale backend-fastapi=3
```

Consider using:
- Kubernetes for orchestration
- Load balancers for traffic distribution
- Redis for caching
- CDN for static assets

## Backup and Recovery

### Database Backup
```bash
docker-compose exec postgres pg_dump -U postgres tha_db > backup.sql
```

### Database Restore
```bash
docker-compose exec -T postgres psql -U postgres tha_db < backup.sql
```

## Support

For issues or questions:
- Check GitHub Issues: https://github.com/AlazieXGit/ai-logisticpowerboard/issues
- Review logs: `docker-compose logs -f`
- Contact: support@alazie.express
