#!/bin/bash

# LoadBoard AI Monitoring Script
set -e

echo "📊 LoadBoard AI Monitoring Dashboard"
echo "===================================="

# Function to check service status
check_service() {
    local service=$1
    if systemctl is-active --quiet $service; then
        echo "✅ $service: Running"
    else
        echo "❌ $service: Stopped"
    fi
}

# Function to check port
check_port() {
    local port=$1
    local name=$2
    if netstat -tuln | grep -q ":$port "; then
        echo "✅ $name (Port $port): Open"
    else
        echo "❌ $name (Port $port): Closed"
    fi
}

# System Information
echo "🖥️  System Information:"
echo "   Hostname: $(hostname)"
echo "   Uptime: $(uptime -p)"
echo "   Load: $(uptime | awk -F'load average:' '{print $2}')"
echo "   Memory: $(free -h | grep Mem | awk '{print $3"/"$2}')"
echo "   Disk: $(df -h / | tail -1 | awk '{print $3"/"$2" ("$5" used)"}')"
echo ""

# Service Status
echo "🔧 Service Status:"
check_service docker
check_service nginx
if systemctl list-unit-files | grep -q loadboard-ai; then
    check_service loadboard-ai
fi
echo ""

# Port Status
echo "🌐 Port Status:"
check_port 80 "HTTP"
check_port 443 "HTTPS"
check_port 8000 "LoadBoard AI"
echo ""

# Docker Status
echo "🐳 Docker Status:"
if command -v docker &> /dev/null; then
    echo "   Docker Version: $(docker --version)"
    echo "   Running Containers: $(docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}')"
    echo ""
    
    # Container Health
    echo "📊 Container Health:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
else
    echo "   Docker not installed"
fi
echo ""

# Application Health
echo "🏥 Application Health:"
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ LoadBoard AI: Healthy"
    echo "🌐 URL: http://$(hostname -I | awk '{print $1}'):8000"
else
    echo "❌ LoadBoard AI: Unhealthy"
    echo "📋 Recent logs:"
    docker-compose logs --tail=10 2>/dev/null || echo "   No Docker Compose logs available"
fi

echo ""
echo "🔄 Auto-refresh every 30 seconds (Ctrl+C to stop)"
echo "💡 Run './healthcheck.sh' for detailed health check"