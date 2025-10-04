#!/bin/bash

# LoadBoard AI Deployment Script
set -e

echo "🚀 LoadBoard AI Deployment Script"
echo "================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and start the application
echo "🔨 Building LoadBoard AI application..."
docker-compose build

echo "🚀 Starting LoadBoard AI application..."
docker-compose up -d

# Wait for application to be ready
echo "⏳ Waiting for application to be ready..."
sleep 10

# Check if application is running
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ LoadBoard AI is running successfully!"
    echo "🌐 Access your application at: http://localhost:8000"
    echo "📊 Health check: http://localhost:8000/health"
else
    echo "❌ Application failed to start properly"
    echo "📋 Checking logs..."
    docker-compose logs
    exit 1
fi

echo "🎉 Deployment complete!"
echo "💡 To stop the application: docker-compose down"
echo "📋 To view logs: docker-compose logs -f"