#!/usr/bin/env bash
# Start all development processes using supervisord

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Starting LoadBoard AI Development Environment"
echo "================================================="

# Check if supervisord is installed
if ! command -v supervisord &> /dev/null; then
    echo "❌ supervisord is not installed"
    echo "Please install supervisor:"
    echo "  - Ubuntu/Debian: sudo apt-get install supervisor"
    echo "  - macOS: brew install supervisor"
    echo "  - Or use Nix: nix-shell or nix develop"
    exit 1
fi

# Check if npm dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Build the project first for preview server
echo "🔨 Building project for preview server..."
npm run build

# Stop any existing supervisor instance
if [ -f "/tmp/supervisord.pid" ]; then
    echo "🛑 Stopping existing supervisord instance..."
    supervisorctl -c supervisord.conf shutdown 2>/dev/null || true
    sleep 2
fi

# Start supervisord
echo "▶️  Starting supervisord..."
supervisord -c supervisord.conf

# Wait a moment for services to start
sleep 3

# Check status
echo ""
echo "📊 Service Status:"
echo "=================="
supervisorctl -c supervisord.conf status

echo ""
echo "✅ Development environment started!"
echo ""
echo "🌐 Services:"
echo "  - Vite Dev Server:         http://localhost:8080"
echo "  - Preview Server:          http://localhost:8000"
echo "  - Capra Management:        http://localhost:9000"
echo ""
echo "📝 Management Commands:"
echo "  - supervisorctl status               - Check service status"
echo "  - supervisorctl restart <service>    - Restart a service"
echo "  - supervisorctl stop all             - Stop all services"
echo "  - supervisorctl shutdown             - Shutdown supervisord"
echo ""
echo "📋 Logs are available in /tmp/*.log"
