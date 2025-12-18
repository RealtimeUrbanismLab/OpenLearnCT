#!/usr/bin/env python3
"""
Simple HTTP server for local development of the CT Scanner AR app.
Serves with proper CORS headers and MIME types for 3D models.

Usage:
    python server.py [port]

Default port is 8000

For mobile testing, find your local IP:
    Windows: ipconfig
    Mac/Linux: ifconfig or ip addr
Then access from phone: http://[YOUR_IP]:8000
"""

import http.server
import socketserver
import sys
import os
from pathlib import Path

# Default port
PORT = 8000

# Get port from command line if provided
if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        print(f"Invalid port number: {sys.argv[1]}")
        print("Usage: python server.py [port]")
        sys.exit(1)

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler with CORS support and proper MIME types"""

    def end_headers(self):
        # Add CORS headers for cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # Prevent caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS preflight"""
        self.send_response(200)
        self.end_headers()

    def guess_type(self, path):
        """Override to ensure correct MIME types for all files"""
        mimetype = super().guess_type(path)

        # Fix MIME types for specific extensions
        if path.endswith('.js') or path.endswith('.mjs'):
            return 'application/javascript'
        elif path.endswith('.glb'):
            return 'model/gltf-binary'
        elif path.endswith('.gltf'):
            return 'model/gltf+json'
        elif path.endswith('.bin'):
            return 'application/octet-stream'
        elif path.endswith('.wasm'):
            return 'application/wasm'

        return mimetype

    def log_message(self, format, *args):
        """Custom log format with color coding"""
        if args[1] == '200':
            status_color = '\033[92m'  # Green
        elif args[1].startswith('3'):
            status_color = '\033[93m'  # Yellow
        elif args[1].startswith('4') or args[1].startswith('5'):
            status_color = '\033[91m'  # Red
        else:
            status_color = '\033[0m'   # Default

        print(f"{status_color}[{self.log_date_time_string()}] {format % args}\033[0m")

# Change to the script's directory
script_dir = Path(__file__).parent
os.chdir(script_dir)

# Create server
Handler = CORSRequestHandler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json',
})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("\n" + "=" * 70)
    print("  CT Scanner AR App - Local Development Server")
    print("=" * 70)
    print(f"\n  📡 Server running at:")
    print(f"     • http://localhost:{PORT}")
    print(f"     • http://127.0.0.1:{PORT}")
    print(f"\n  📁 Serving files from: {script_dir}")
    print(f"\n  📱 For mobile testing:")
    print(f"     1. Find your local IP address:")
    print(f"        Windows: Run 'ipconfig' in Command Prompt")
    print(f"        Mac/Linux: Run 'ifconfig' or 'ip addr' in Terminal")
    print(f"     2. On your phone/tablet, navigate to:")
    print(f"        http://[YOUR_IP_ADDRESS]:{PORT}")
    print(f"\n  Press Ctrl+C to stop the server")
    print("=" * 70 + "\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n  Shutting down server...")
        httpd.shutdown()
        print("  Server stopped. Goodbye!\n")
