# LoadBoard AI - Deployment Guide

This document describes the deployment setup for the LoadBoard AI application.

## GitHub Workflows

### 1. Python Application Workflow (`.github/workflows/python-app.yml`)
- Triggers on push and pull requests to the `main` branch
- Sets up Python 3.10
- Installs dependencies from `requirements.txt` (if present)
- Runs linting with flake8
- Runs tests with pytest
- **Note**: Currently, there are no Python files in the repository, so this workflow is prepared for future Python components

### 2. Deploy LoadBoard AI Workflow (`.github/workflows/deploy.yml`)
This is the main deployment workflow with three jobs:

#### Test Job
- Runs on every push and pull request to `main` or `master` branches
- Sets up Node.js 18
- Installs dependencies with `npm ci`
- Runs tests (if present)
- Builds the frontend application

#### Deploy Job
- Runs only on pushes to `main` or `master` branches
- Depends on successful completion of the test job
- Builds the application
- Deploys to Render using the Render API
- Falls back to Railway deployment if Render fails

#### Docker Job
- Runs in parallel with deploy job on `main` or `master` branches
- Builds a Docker image
- Tests the Docker container
- Verifies health check endpoint

## Deployment Platforms

### Render (Primary)
- Configuration: `render.yaml`
- Type: Static site
- Build Command: `npm ci && npm run build`
- Static Files: `./dist`
- Health Check: `/health`
- Automatic deployments triggered by GitHub workflow

### Railway (Fallback)
- Configuration: `railway.json`
- Uses Nixpacks builder
- Build Command: `npm ci && npm run build`
- Start Command: `npm run start` (serves built files on port 8000)
- Health Check: `/health`

### Vercel
- Configuration: `vercel.json`
- Uses `@vercel/static-build`
- Serves files from `dist` directory
- Configured with proper routing for SPA

### Docker
- Configuration: `Dockerfile`, `docker-compose.yml`
- Multi-stage build with Node.js and nginx
- Exposes port 8000
- Includes health check script
- Production-ready with proper nginx configuration

## Local Deployment

### Using Docker Compose
```bash
./deploy.sh
```
This script will:
- Check for Docker and Docker Compose
- Build the application
- Start the containers
- Verify the application is running
- Display access URLs

### Development Mode
```bash
npm install
npm run dev
```
Starts the Vite development server.

### Production Build
```bash
npm install
npm run build
npm run start
```
Builds and serves the application on port 8000.

## Health Check

The application includes a health check endpoint at `/health` that returns "OK".
This is used by:
- Docker health checks
- Render health checks
- Railway health checks
- GitHub workflow container tests

## Security Headers

All deployment platforms are configured with security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Cache control for static assets

## Environment Variables

Production deployments should configure:
- `NODE_ENV=production`
- `PORT=8000` (for platforms that require it)

## Secrets Required

For GitHub Actions deployment to work, configure these secrets:
- `RENDER_SERVICE_ID`: Your Render service ID
- `RENDER_API_KEY`: Your Render API key
- `RAILWAY_TOKEN`: Your Railway token (optional, for fallback)

## Build Output

The build process generates:
- Static files in `dist/` directory
- Service worker for PWA functionality
- Optimized and minified assets
- Manifest file for PWA installation

## Troubleshooting

If deployment fails:
1. Check GitHub Actions logs for build/test failures
2. Verify secrets are correctly configured
3. Check platform-specific logs (Render, Railway, etc.)
4. Verify health check endpoint is accessible
5. Review Docker container logs with `docker-compose logs`
