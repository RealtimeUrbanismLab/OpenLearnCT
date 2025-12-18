# OpenLearn CT Scanner

An interactive AR web application for exploring CT Scanner components and learning about their functions. Built with A-Frame and Three.js.

![CT Scanner Preview](https://img.shields.io/badge/WebXR-Ready-brightgreen) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Features

- 🎯 **Interactive 3D Models** - 14 detailed CT scanner components
- 📱 **Mobile-Ready** - Optimized for smartphones and tablets
- 🔄 **Gesture Controls** - Intuitive drag, rotate, and pinch-to-scale
- 📚 **Educational Content** - Detailed descriptions for each component
- ⚡ **Fast Loading** - Optimized assets and progressive loading
- 🎨 **Realistic Rendering** - Proper lighting and materials

## Quick Start

### Option 1: Python Server (Easiest)
```bash
python server.py
```
Then open http://localhost:8000

### Option 2: Node.js with Vite (Recommended for Development)
```bash
npm install
npm run dev
```

### Option 3: Any Web Server
The app is a static website - use any HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server is installed)
npx http-server -p 8000 -c-1

# PHP
php -S localhost:8000
```

## Mobile Testing

1. Start the server on your computer
2. Find your local IP address:
   - **Windows**: `ipconfig` in Command Prompt
   - **Mac/Linux**: `ifconfig` or `ip addr` in Terminal
3. On your phone, navigate to: `http://[YOUR_IP]:8000`

Example: `http://192.168.1.100:8000`

## Project Structure

```
OpenLearnCT/
├── index.html                  # Main entry point
├── package.json                # Node.js dependencies
├── vite.config.js              # Vite configuration
├── server.py                   # Python development server
├── src/
│   ├── index.css               # Application styles
│   ├── data.js                 # CT scanner component data
│   ├── next-button.js          # Navigation component
│   ├── rotate-button.js        # Rotation control
│   ├── popup.js                # Information popup
│   ├── selectcomponent.js      # Model selection logic
│   ├── gesture-handler.js      # Touch/mouse gesture controls
│   └── assets/                 # 3D models (GLB format)
│       ├── gantry_housing.glb
│       ├── xray_tube.glb
│       └── ... (11 more models)
└── README.md                   # This file
```

## How to Use

1. **Start** - Click the "Start" button to begin
2. **Explore** - Drag with mouse/finger to rotate the model
3. **Place** - Click "Place" to enter component selection mode
4. **Learn** - Click individual parts or use Next/Back buttons
5. **Rotate Feature** - Use "Turn On" button to animate X-ray tube rotation

## CT Scanner Components

The app includes 14 interactive components:

1. **Gantry Housing** - Houses rotating X-ray tube and detectors
2. **Gantry Ring** - Rotating frame supporting imaging components
3. **X-Ray Tube** - Generates X-ray beam for imaging
4. **Detector Array** - Measures transmitted X-rays
5. **Slip Ring Assembly** - Power and data transmission
6. **Collimators** - Shapes X-ray beam
7. **Bore** - Patient positioning opening
8. **Patient Table** - Motorized positioning table
9. **Control Console** - Scanner operation interface
10. **Image Reconstruction Computer** - Processes raw data
11. **Control Room** - Operator workspace
12. **Cooling System** - Heat dissipation
13. **Laser Positioning Lights** - Patient alignment
14. **Safety & Intercom Systems** - Communication and safety

## Development

### Requirements

- **Python** 3.x (for simple server)
- **Node.js** 18+ (for Vite dev server with hot reload)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup for Development

1. Clone the repository:
```bash
git clone https://github.com/RealtimeUrbanismLab/OpenLearnCT.git
cd OpenLearnCT
```

2. Install dependencies (if using Vite):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to GitHub Pages:
```bash
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

Or use the GitHub Actions workflow (coming soon).

### Static Hosting

The built app (`dist/` folder) can be deployed to:
- **GitHub Pages** - Free hosting for static sites
- **Netlify** - Drag and drop the `dist/` folder
- **Vercel** - Connect your GitHub repo
- **AWS S3 + CloudFront** - For production use
- Any static file hosting service

## Technical Stack

- **A-Frame 1.3.0** - WebXR framework
- **Three.js r138** - 3D graphics library
- **Vite 5.0** - Build tool and dev server
- **ES6 Modules** - Modern JavaScript
- **GLB Models** - Optimized 3D assets

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Progressive asset loading with visual feedback
- Optimized 3D model files (GLB format)
- Efficient material caching
- Minimal dependencies
- Lazy component initialization

## Troubleshooting

### Models Don't Load
- Check browser console (F12) for errors
- Verify all GLB files are in `src/assets/`
- Ensure server is serving correct MIME types

### Gestures Don't Work on Mobile
- Make sure you clicked "Start" button
- Check that touch events aren't being blocked
- Try refreshing the page

### Page Won't Load
- Don't open `index.html` directly (use a server)
- Check that the server is running
- Try a different browser
- Clear browser cache

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Changelog

### Version 1.0.0 (2025)
- ✨ Initial release
- ✅ 14 interactive CT scanner components
- ✅ Custom gesture controls
- ✅ Educational popup content
- ✅ Optimized lighting and materials
- ✅ Mobile-responsive design
- ✅ Loading progress indicator

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

**Developed by:** Realtime Urbanism Lab
**Repository:** https://github.com/RealtimeUrbanismLab/OpenLearnCT

## Support

For issues, questions, or suggestions:
- 🐛 [Report a bug](https://github.com/RealtimeUrbanismLab/OpenLearnCT/issues)
- 💡 [Request a feature](https://github.com/RealtimeUrbanismLab/OpenLearnCT/issues)

---

Made with ❤️ for medical education
