# Development Environment Setup

This directory contains configuration for running the LoadBoard AI development environment with multiple processes managed by supervisord.

## Prerequisites

### Option 1: Using Nix (Recommended)

If you have Nix with flakes enabled:
```bash
nix develop
```

Or with direnv:
```bash
direnv allow
```

### Option 2: Manual Installation

Install the required tools:

**Ubuntu/Debian:**
```bash
sudo apt-get install supervisor nodejs npm python3
```

**macOS:**
```bash
brew install supervisor node python3
```

## Starting the Development Environment

### Automated Start
```bash
./start-dev.sh
```

This will:
- Install npm dependencies if needed
- Build the project
- Start supervisord with all services

### Manual Start
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start supervisord
supervisord -c supervisord.conf

# Check status
supervisorctl -c supervisord.conf status
```

## Services

The following processes are managed by supervisord:

1. **vite-dev** (`npm run dev`)
   - Vite development server
   - Port: 8080
   - Auto-restart: Yes

2. **previewserver** (`npm run preview`)
   - Production preview server
   - Port: 8000
   - Auto-restart: Yes

3. **capra-management-server**
   - Management API server
   - Port: 9000
   - Endpoints: `/health`, `/status`
   - Auto-restart: Yes

4. **nixd**
   - Nix language server
   - For Nix development support
   - Auto-restart: Yes

5. **code-oss** (VSCode)
   - Visual Studio Code editor
   - Auto-start: No (manual)

## Management Commands

### Check Service Status
```bash
supervisorctl -c supervisord.conf status
```

### Restart a Service
```bash
supervisorctl -c supervisord.conf restart vite-dev
supervisorctl -c supervisord.conf restart previewserver
supervisorctl -c supervisord.conf restart capra-management-server
```

### Stop All Services
```bash
supervisorctl -c supervisord.conf stop all
```

### Shutdown Supervisord
```bash
supervisorctl -c supervisord.conf shutdown
```

### View Logs
```bash
# Tail all logs
tail -f /tmp/*.log

# View specific service log
tail -f /tmp/vite-dev.out.log
tail -f /tmp/previewserver.out.log
tail -f /tmp/capra-management-server.out.log
```

## Accessing Services

- **Vite Dev Server**: http://localhost:8080
- **Preview Server**: http://localhost:8000
- **Capra Management**: http://localhost:9000
  - Health check: http://localhost:9000/health
  - Status: http://localhost:9000/status

## Troubleshooting

### Supervisord Won't Start
```bash
# Check if supervisord is already running
ps aux | grep supervisord

# Remove stale PID file
rm -f /tmp/supervisord.pid /tmp/supervisor.sock

# Try starting again
supervisord -c supervisord.conf
```

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

### Logs Not Appearing
```bash
# Check log directory permissions
ls -la /tmp/*.log

# Manually create log files if needed
touch /tmp/{vite-dev,previewserver,capra-management-server,nixd}.{out,err}.log
```

## File Structure

```
.
├── flake.nix              # Nix flake configuration
├── shell.nix              # Legacy Nix shell configuration
├── .envrc                 # Direnv configuration
├── supervisord.conf       # Supervisor configuration
├── start-dev.sh           # Helper script to start all services
├── scripts/
│   └── capra-management-server.sh  # Capra management server
└── DEV_ENVIRONMENT.md     # This file
```

## Environment Variables

The following environment variables are set:
- `NODE_ENV=development`
- `VITE_PORT=8080`
- `PREVIEW_PORT=8000`
- `CAPRA_PORT=9000`

## Notes

- The preview server requires a production build, which is created automatically by `start-dev.sh`
- VSCode (code-oss) is configured but not auto-started. Start it manually with `code .`
- Logs are stored in `/tmp/` for easy access and cleanup
- All services are configured to auto-restart on failure
