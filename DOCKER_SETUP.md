# Docker Setup Guide for LoadBoard AI

This guide explains how to set up and run the LoadBoard AI application using Docker Compose.

## Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose v2.0 or higher

## Quick Start

1. **Copy the environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Update the .env file** with your actual credentials if needed (optional for local development)

3. **Build and start all services**:
   ```bash
   docker compose up --build -d
   ```

4. **Check service status**:
   ```bash
   docker compose ps
   ```

5. **Access the application**:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:8000
   - Backend Health: http://localhost:8000/health
   - API Docs: http://localhost:8000/docs

## Services

The docker-compose.yml file defines three services:

### 1. PostgreSQL Database
- **Container**: `loadboard-postgres`
- **Port**: 5432
- **Database**: loadboard_db
- **User/Password**: postgres/postgres (change in production!)

### 2. Backend FastAPI
- **Container**: `loadboard-backend-fastapi`
- **Port**: 8000
- **Technology**: Python FastAPI
- **Features**:
  - RESTful API
  - CORS configured for https://www.alazie.express
  - Health check endpoint at /health
  - Auto-restarts on failure

### 3. Frontend
- **Container**: `loadboard-frontend`
- **Port**: 80
- **Technology**: React + Vite + TypeScript
- **Features**:
  - Nginx-served static files
  - PWA support
  - Optimized production build

## Common Commands

### Start services
```bash
docker compose up -d
```

### Stop services
```bash
docker compose down
```

### View logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend-fastapi
```

### Rebuild a service
```bash
docker compose build backend-fastapi
docker compose up -d backend-fastapi
```

### Check service health
```bash
# Backend health
curl http://localhost:8000/health

# All containers status
docker compose ps
```

### Clean up (including volumes)
```bash
docker compose down -v
```

## Environment Variables

Key environment variables in `.env`:

- `DOMAIN_URL`: The production domain (default: https://www.alazie.express)
- `VITE_API_URL`: API endpoint URL for frontend (default: https://www.alazie.express)
- `STRIPE_SECRET_KEY`: Stripe API key (optional)
- `PLAID_CLIENT_ID`: Plaid client ID (optional)
- `PLAID_SECRET`: Plaid secret (optional)
- `WISE_API_KEY`: Wise API key (optional)

## Troubleshooting

### Backend won't start
Check the logs:
```bash
docker compose logs backend-fastapi
```

Common issues:
- Database not ready: Wait a few seconds for PostgreSQL to initialize
- Port conflict: Ensure ports 80, 5432, and 8000 are not in use

### Database connection issues
Verify PostgreSQL is healthy:
```bash
docker compose ps postgres
```

### Build failures
Clean rebuild:
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

## Production Deployment

For production:

1. Update `.env` with production values
2. Change PostgreSQL credentials in docker-compose.yml
3. Consider using docker-compose.prod.yml for production-specific settings
4. Set up proper SSL/TLS certificates
5. Use environment-specific configurations

## Development

For development with hot-reload:

1. Install dependencies locally:
   ```bash
   # Frontend
   npm install
   npm run dev

   # Backend
   cd backend-fastapi
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. Or use docker with volume mounts for live updates (modify docker-compose.yml)

## Health Checks

All services include health checks:
- PostgreSQL: `pg_isready` command
- Backend FastAPI: HTTP GET /health endpoint
- Frontend: HTTP GET /health endpoint (from nginx)

Health check intervals are configured to restart unhealthy containers automatically.

## Security Notes

- **NEVER** commit `.env` file to git (it's in .gitignore)
- Change default PostgreSQL password in production
- Use secrets management for production credentials
- Keep Docker images updated
- Review CORS settings in backend-fastapi/main.py

## Support

For issues or questions:
- Check logs: `docker compose logs -f`
- Verify service status: `docker compose ps`
- Review health endpoints: `curl http://localhost:8000/health`
