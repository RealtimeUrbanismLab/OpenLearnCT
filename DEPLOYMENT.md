# Deployment Guide for OpenLearn CT Scanner

This guide covers all deployment options for the CT Scanner AR application.

## Pre-Deployment Checklist

- ✅ All critical bugs fixed (duplicate data, shadows, lighting)
- ✅ Code cleaned (no console.log statements)
- ✅ Custom gesture handler implemented
- ✅ Loading progress indicator added
- ✅ Git repository initialized
- ✅ GitHub remote configured

## Quick Deployment to GitHub

### Step 1: Push to GitHub

```bash
git push -u origin main
```

This will push your code to the GitHub repository.

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/RealtimeUrbanismLab/OpenLearnCT
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Select "/ (root)" folder
6. Click "Save"

Your app will be live at: `https://realtimeurbanismlab.github.io/OpenLearnCT/`

**Note:** GitHub Pages serves from the root directory by default. Your [index.html](index.html) is already in the root, so it will work immediately!

## Alternative Deployment Methods

### Option 1: GitHub Pages with Build Process (Advanced)

If you want to use the Vite build process:

1. Build the project:
```bash
npm install
npm run build
```

2. Deploy the `dist/` folder:
```bash
git add dist -f
git commit -m "Add build files"
git subtree push --prefix dist origin gh-pages
```

3. In GitHub Settings > Pages, select `gh-pages` branch instead of `main`

### Option 2: Netlify (Drag & Drop)

1. Go to https://app.netlify.com/drop
2. Drag the entire project folder (or just [index.html](index.html) + [src/](src/) folder)
3. Your site is live instantly!

**Advantages:**
- Instant deployment
- Automatic HTTPS
- Custom domain support
- No build process needed

### Option 3: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts

**Advantages:**
- Fast global CDN
- Automatic deployments on git push
- Free tier includes custom domains

### Option 4: Traditional Web Hosting

Upload these files to any web host:
- [index.html](index.html)
- `src/` folder (entire folder with all assets)
- [package.json](package.json) (optional, for documentation)
- [README.md](README.md) (optional, for documentation)

**Compatible with:**
- cPanel
- FTP hosting
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps

## Mobile Testing Before Deployment

### Using Python Server

1. Start the server:
```bash
python server.py
```

2. Find your local IP:
   - **Windows**: `ipconfig` → Look for "IPv4 Address"
   - **Mac/Linux**: `ifconfig` → Look for "inet"

3. On your phone, navigate to: `http://[YOUR_IP]:8000`

Example: `http://192.168.1.100:8000`

### Using Vite Dev Server

1. Install dependencies and start server:
```bash
npm install
npm run dev
```

2. Vite will automatically display network URLs:
```
VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:8000/
  ➜  Network: http://192.168.1.100:8000/
```

3. Use the Network URL on your phone

## Post-Deployment Verification

After deploying, test these features:

### Desktop Testing
- [ ] Page loads without errors
- [ ] All 14 models load correctly
- [ ] Loading progress indicator works
- [ ] "Start" button shows welcome message
- [ ] "Place" button enables selection mode
- [ ] Clicking models shows popups with descriptions
- [ ] Next/Back buttons navigate components
- [ ] "Turn On" button rotates X-ray tube
- [ ] Mouse drag rotates entire assembly
- [ ] All shadows render properly
- [ ] Lighting looks realistic (not washed out)

### Mobile Testing
- [ ] Page loads on mobile browser
- [ ] Touch gestures work (drag to rotate)
- [ ] Pinch-to-zoom works
- [ ] All buttons are tap-able
- [ ] Popups display correctly
- [ ] No performance issues
- [ ] Models don't appear too bright/dark

## Troubleshooting Deployment Issues

### GitHub Pages Not Working

**Problem**: Page shows 404 or doesn't load

**Solutions**:
1. Check that [index.html](index.html) is in the root directory ✅
2. Verify GitHub Pages is enabled in Settings
3. Wait 2-3 minutes for deployment to complete
4. Check that repository is public (or you have GitHub Pro for private repos)

### Assets Not Loading

**Problem**: Models don't appear, console shows 404 errors

**Solutions**:
1. Check that `src/assets/` folder was uploaded
2. Verify file paths in [index.html](index.html) use relative paths (they do ✅)
3. Ensure case-sensitive file names match (Linux servers are case-sensitive)

### CORS Errors

**Problem**: Console shows "CORS policy" errors

**Solutions**:
- For GitHub Pages: Should work automatically ✅
- For custom hosting: Configure server to send CORS headers
- Use our [server.py](server.py) as reference for proper headers

### Models Look Washed Out / Too Bright

**Problem**: Visual quality is poor

**Solutions**:
1. This has been fixed in the current version ✅
2. Lighting intensity reduced from 5 to 1.8
3. Proper ambient and hemisphere lights added
4. Shadow attributes added to all models

If you still see issues:
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check that you deployed the latest version

## Performance Optimization for Production

### Current Status
- ✅ GLB format models (optimized binary)
- ✅ Progressive loading with visual feedback
- ✅ Efficient material caching
- ✅ Minimal dependencies
- ✅ ES6 modules for tree-shaking

### Optional Optimizations

#### 1. Compress Large Models

The `collimators.glb` (18MB) and `xray_tube.glb` (7.7MB) files are quite large.

To optimize:
```bash
# Install gltf-transform
npm install -g @gltf-transform/cli

# Compress models with Draco
gltf-transform optimize src/assets/collimators.glb src/assets/collimators.glb --compress draco

# Or use meshopt compression
gltf-transform optimize src/assets/xray_tube.glb src/assets/xray_tube.glb --compress meshopt
```

#### 2. Use CDN for Libraries

The app already uses CDN for A-Frame and Three.js ✅

#### 3. Enable Gzip Compression

Most hosting providers enable this automatically, but verify:
- GitHub Pages: Enabled ✅
- Netlify: Enabled ✅
- Vercel: Enabled ✅

For custom hosting, add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json
</IfModule>
```

## Updating the Deployed App

### For GitHub Pages

1. Make changes to your code
2. Commit and push:
```bash
git add .
git commit -m "Description of changes"
git push
```

3. Changes will be live in 2-3 minutes

### For Netlify

- Just drag and drop the updated files again
- Or connect your GitHub repo for automatic deployments

### For Vercel

- Run `vercel` again
- Or connect your GitHub repo for automatic deployments

## Custom Domain Setup

### For GitHub Pages

1. Add a file named `CNAME` to your repository root:
```
ctscanner.yourdomaincom
```

2. In your domain registrar, add DNS records:
```
Type: CNAME
Name: ctscanner
Value: realtimeurbanismlab.github.io
```

3. In GitHub Settings > Pages, enter your custom domain

### For Netlify/Vercel

Both have built-in custom domain management in their dashboards.

## Monitoring and Analytics

### Add Google Analytics (Optional)

Add to [index.html](index.html) before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Uptime Monitoring

Free options:
- UptimeRobot (https://uptimerobot.com)
- StatusCake (https://www.statuscake.com)

## Security Considerations

### Current Security Features
- ✅ No backend code (static site = minimal attack surface)
- ✅ No user authentication (nothing to compromise)
- ✅ No database (no SQL injection risk)
- ✅ Content Security Policy ready

### Optional: Add CSP Header

If using custom hosting, add Content Security Policy:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://aframe.io https://cdnjs.cloudflare.com https://unpkg.com 'unsafe-inline' 'unsafe-eval';
  style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
  font-src https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self';
">
```

## Backup and Version Control

### Recommended Workflow

1. Always test locally first: `python server.py`
2. Commit working changes: `git commit -m "description"`
3. Push to GitHub: `git push`
4. Verify deployment

### Create Releases

For major versions:
```bash
git tag -a v1.0.0 -m "Initial release"
git push --tags
```

Then create a release on GitHub with release notes.

## Support and Maintenance

### Regular Maintenance Tasks

- **Weekly**: Check for console errors in production
- **Monthly**: Review analytics for usage patterns
- **Quarterly**: Update A-Frame/Three.js versions
- **Yearly**: Optimize assets based on user feedback

### Getting Help

- Report issues: https://github.com/RealtimeUrbanismLab/OpenLearnCT/issues
- Check documentation: [README.md](README.md)
- Review this guide: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Summary

**Easiest Deployment**: Push to GitHub, enable GitHub Pages ✅

**Best for Development**: Vite dev server with hot reload

**Best for Production**: Netlify or Vercel (automatic deployments)

**Most Control**: Custom hosting with [server.py](server.py) configuration

Your app is production-ready! 🚀
