#!/bin/bash

# LoadBoard AI - Quick Setup and Run Script
# This script installs dependencies and runs the application using Docker Compose

set -e

echo "🚀 LoadBoard AI - Quick Setup"
echo "==============================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed."
    echo "📥 Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo "❌ Error: Docker Compose is not available."
    echo "📥 Please install Docker Compose v2: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker detected: $(docker --version)"
echo "✅ Docker Compose detected: $(docker compose version)"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "💡 You can edit .env to customize your configuration"
else
    echo "✅ .env file already exists"
fi
echo ""

# Domain configuration
echo "🌐 Domain Configuration"
echo "   The application is configured for: https://www.alazie.express"
echo "   Backend CORS is set up for this domain"
echo ""

# Install dependencies and run
echo "📦 Installing dependencies and starting services..."
echo "   This may take a few minutes on first run..."
echo ""

# Build and start services
docker compose up --build -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🏥 Checking service health..."

# Check PostgreSQL
if docker compose ps postgres | grep -q "healthy"; then
    echo "   ✅ PostgreSQL: Healthy"
else
    echo "   ⚠️  PostgreSQL: Starting..."
fi

# Check Backend
if curl -sf http://localhost:8000/health > /dev/null 2>&1; then
    echo "   ✅ Backend API: Healthy"
    BACKEND_RESPONSE=$(curl -s http://localhost:8000/health)
    echo "      Response: $BACKEND_RESPONSE"
else
    echo "   ⚠️  Backend API: Still starting... (check logs with: docker compose logs backend-fastapi)"
fi

# Check Frontend
if curl -sf http://localhost:80 > /dev/null 2>&1; then
    echo "   ✅ Frontend: Healthy"
else
    echo "   ⚠️  Frontend: Still starting... (check logs with: docker compose logs frontend)"
fi

echo ""
echo "🎉 LoadBoard AI is running!"
echo "================================"
echo ""
echo "📱 Access Points:"
echo "   🌐 Frontend:        http://localhost:80"
echo "   🔌 Backend API:     http://localhost:8000"
echo "   ❤️  Health Check:    http://localhost:8000/health"
echo "   📚 API Docs:        http://localhost:8000/docs"
echo "   🗄️  PostgreSQL:      localhost:5432"
echo ""
echo "🌍 Production Domain: https://www.alazie.express"
echo ""
echo "📋 Useful Commands:"
echo "   View logs:          docker compose logs -f"
echo "   Stop services:      docker compose down"
echo "   Restart services:   docker compose restart"
echo "   View status:        docker compose ps"
echo ""
echo "💡 For more information, see DOCKER_SETUP.md"
echo ""
