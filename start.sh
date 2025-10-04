#!/bin/bash

# AI Logistics Power Board - Quick Start Script
# This script helps you quickly start the application

set -e

echo "=========================================="
echo "AI Logistics Power Board - Quick Start"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file. Please edit it with your actual values."
    echo ""
    echo "Edit .env and set:"
    echo "  - STRIPE_SECRET_KEY"
    echo "  - PLAID_CLIENT_ID"
    echo "  - PLAID_SECRET"
    echo "  - WISE_API_KEY"
    echo "  - VITE_API_URL"
    echo ""
    read -p "Press enter after you've updated .env file..."
fi

# Check if docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "🔍 Checking Docker Compose..."
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
elif docker-compose version &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Using: $DOCKER_COMPOSE"
echo ""

# Build and start services
echo "🚀 Starting services..."
$DOCKER_COMPOSE --env-file .env up --build -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo ""
echo "📊 Service Status:"
$DOCKER_COMPOSE ps

echo ""
echo "✅ Services are running!"
echo ""
echo "Access the application at:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend Express: http://localhost:4000"
echo "  - Backend FastAPI: http://localhost:5000"
echo "  - PostgreSQL: localhost:5432"
echo ""
echo "To view logs:"
echo "  $DOCKER_COMPOSE logs -f"
echo ""
echo "To stop services:"
echo "  $DOCKER_COMPOSE down"
echo ""
echo "=========================================="
