#!/bin/bash

# LoadBoard AI Production Deployment Script
set -e

echo "🚀 LoadBoard AI Production Deployment"
echo "====================================="

# Check prerequisites
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Installing..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Installing..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create SSL directory
mkdir -p ssl letsencrypt

# Build production image
echo "🔨 Building production image..."
docker-compose -f docker-compose.prod.yml build

# Start services
echo "🚀 Starting production services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services
echo "⏳ Waiting for services..."
sleep 30

# Health check
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ LoadBoard AI is live!"
    echo "🌐 Web: http://localhost"
    echo "📱 PWA: Install from browser"
    echo "🔒 SSL: Configure domain for HTTPS"
else
    echo "❌ Deployment failed"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

echo "🎉 Production deployment complete!"
echo "💡 Configure your domain DNS to point to this server"
echo "🔧 SSL certificates will be automatically generated"