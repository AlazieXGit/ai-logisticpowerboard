#!/usr/bin/env bash
# Verification script to check if all required processes are running

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🔍 Verifying LoadBoard AI Development Environment"
echo "=================================================="
echo ""

# Check supervisord status
echo "📊 Supervisor Status:"
echo "--------------------"
/home/runner/.local/bin/supervisorctl -c supervisord.conf status || true
echo ""

# Verify each process
echo "✅ Process Verification:"
echo "----------------------"

# Check npm run dev / vite
if ps aux | grep -v grep | grep "vite" | grep -q "node_modules/.bin/vite"; then
    echo "✅ npm run dev (vite): RUNNING"
else
    echo "❌ npm run dev (vite): NOT RUNNING"
fi

# Check previewserver
if ps aux | grep -v grep | grep "vite preview" | grep -q "node"; then
    echo "✅ previewserver: RUNNING"
else
    echo "❌ previewserver: NOT RUNNING"
fi

# Check capra-management-server
if ps aux | grep -v grep | grep -q "capra-management-server"; then
    echo "✅ capra-management-server: RUNNING"
else
    echo "❌ capra-management-server: NOT RUNNING"
fi

# Check nixd
if ps aux | grep -v grep | grep -q "nixd"; then
    echo "✅ nixd: RUNNING (or placeholder active)"
else
    echo "⚠️  nixd: NOT RUNNING"
fi

# Check supervisord
if ps aux | grep -v grep | grep -q "supervisord"; then
    echo "✅ supervisord: RUNNING"
else
    echo "❌ supervisord: NOT RUNNING"
fi

# Check code-oss (optional)
if ps aux | grep -v grep | grep -E "code|code-oss" | grep -q "wait"; then
    echo "✅ code-oss: RUNNING"
else
    echo "ℹ️  code-oss: NOT STARTED (optional, manual start)"
fi

echo ""
echo "🌐 Service Endpoints:"
echo "-------------------"

# Test HTTP endpoints
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Vite Dev Server:         http://localhost:8080"
else
    echo "❌ Vite Dev Server:         http://localhost:8080 (not responding)"
fi

if curl -s http://localhost:8000 > /dev/null 2>&1; then
    echo "✅ Preview Server:          http://localhost:8000"
else
    echo "❌ Preview Server:          http://localhost:8000 (not responding)"
fi

if curl -s http://localhost:9000/health > /dev/null 2>&1; then
    echo "✅ Capra Management:        http://localhost:9000"
    echo "   - Health:               http://localhost:9000/health"
    echo "   - Status:               http://localhost:9000/status"
else
    echo "❌ Capra Management:        http://localhost:9000 (not responding)"
fi

echo ""
echo "📋 Log Files:"
echo "------------"
echo "Logs are stored in /tmp/"
echo "  - /tmp/vite-dev.out.log"
echo "  - /tmp/previewserver.out.log"
echo "  - /tmp/capra-management-server.out.log"
echo "  - /tmp/nixd.out.log"
echo "  - /tmp/supervisord.log"
echo ""
echo "✅ Verification complete!"
