#!/usr/bin/env bash
# Capra Management Server
# This is a placeholder management server for the LoadBoard AI application

set -e

PORT=${CAPRA_PORT:-9000}
LOG_FILE=${CAPRA_LOG:-/tmp/capra-management.log}

echo "🦄 Starting Capra Management Server on port ${PORT}"
echo "Log file: ${LOG_FILE}"

# Create a simple HTTP server for management endpoints
python3 -c "
import http.server
import socketserver
import json
from datetime import datetime

class CapraHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'status': 'healthy',
                'service': 'capra-management-server',
                'timestamp': datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(response).encode())
        elif self.path == '/status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'services': {
                    'vite-dev': 'running',
                    'previewserver': 'running',
                    'nixd': 'running',
                    'supervisord': 'running'
                },
                'timestamp': datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'message': 'Capra Management Server',
                'endpoints': ['/health', '/status'],
                'version': '1.0.0'
            }
            self.wfile.write(json.dumps(response).encode())
    
    def log_message(self, format, *args):
        with open('${LOG_FILE}', 'a') as f:
            f.write('%s - - [%s] %s\n' % (
                self.address_string(),
                self.log_date_time_string(),
                format % args
            ))

with socketserver.TCPServer(('0.0.0.0', ${PORT}), CapraHandler) as httpd:
    print(f'Capra Management Server running on port ${PORT}')
    httpd.serve_forever()
"
