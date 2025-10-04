#!/bin/bash

# LoadBoard AI EC2 Setup Script
set -e

echo "🚀 Setting up LoadBoard AI on EC2"
echo "================================="

# Update system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install required packages
sudo apt-get install -y docker.io docker-compose nginx curl unzip git

# Start and enable Docker
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu

# Create application directory
sudo mkdir -p /app
sudo chown ubuntu:ubuntu /app
cd /app

# Download and extract application
curl -L -o main.zip https://github.com/YOUR_GITHUB_USERNAME/ai-logistics-loadboard/archive/refs/heads/main.zip
unzip main.zip
mv ai-logistics-loadboard-main/* .
rm -rf ai-logistics-loadboard-main main.zip

# Make scripts executable
chmod +x deploy.sh
chmod +x healthcheck.sh

# Build and start application
docker-compose up -d --build

# Configure Nginx
sudo cp nginx.conf /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Create systemd service
sudo tee /etc/systemd/system/loadboard-ai.service > /dev/null <<EOF
[Unit]
Description=LoadBoard AI Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/app
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
EOF

# Enable service
sudo systemctl daemon-reload
sudo systemctl enable loadboard-ai

echo "✅ LoadBoard AI setup complete!"
echo "🌐 Access at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8000"
echo "📊 Health check: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8000/health"