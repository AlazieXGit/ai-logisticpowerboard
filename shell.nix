# LoadBoard AI Development Environment - Shell.nix
# For backwards compatibility with non-flake Nix users

{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Node.js environment
    nodejs_20
    nodePackages.npm
    
    # Python for any build tools
    python3
    
    # Language servers and tools
    nixd  # Nix language server
    
    # Process management
    supervisor
    
    # Editor
    vscode
  ];

  shellHook = ''
    echo "🚀 LoadBoard AI Development Environment"
    echo "========================================"
    echo ""
    echo "Available commands:"
    echo "  npm run dev       - Start Vite development server"
    echo "  supervisord       - Start all services via supervisor"
    echo "  code .            - Open VSCode in current directory"
    echo ""
    
    # Install npm dependencies if needed
    if [ ! -d "node_modules" ]; then
      echo "📦 Installing npm dependencies..."
      npm install
    fi
    
    # Start supervisord automatically
    if [ -f "supervisord.conf" ]; then
      echo "🔧 Starting supervisord..."
      supervisord -c supervisord.conf
    fi
  '';
}
