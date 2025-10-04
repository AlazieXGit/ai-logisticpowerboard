#!/bin/sh

# Health check script for LoadBoard AI
# This script verifies the application is running correctly

set -e

# Check if nginx is running
if ! pgrep nginx > /dev/null; then
    echo "ERROR: nginx is not running"
    exit 1
fi

# Check if the health endpoint responds
if ! curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "ERROR: Health endpoint not responding"
    exit 1
fi

# Check if main application loads
if ! curl -f http://localhost:8000/ > /dev/null 2>&1; then
    echo "ERROR: Main application not responding"
    exit 1
fi

echo "Health check passed"
exit 0