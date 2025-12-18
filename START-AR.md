# WebXR AR Mode - Quick Guide

## IMPORTANT: Current Status

**What's Working:**
- ✅ 3D preview mode on desktop and mobile (no camera)
- ✅ Click/tap to select components and view information
- ✅ Drag to rotate, pinch to zoom on mobile
- ✅ All 14 CT Scanner components interactive

**AR Mode Limitations:**
- ⚠️ **iPhone/iPad**: WebXR is experimental and mostly NOT working yet
- ✅ **Android ARCore devices**: Should work with Chrome
- 🔬 **Status**: This is cutting-edge tech - limited device support

## For TRUE AR on iPhone, you need:

1. **AR Quick Look** (Apple's native AR) - requires USDZ models
2. **8thWall** (paid service) - what your original app used
3. **Wait for iOS WebXR support** - coming eventually

**For now, this app works as an interactive 3D viewer on all devices.**

---

## HTTPS Required for AR!

WebXR AR requires HTTPS and camera access. Here's how to test and deploy:

## Local Testing with HTTPS

### Option 1: Using Vite Dev Server (RECOMMENDED)

1. **Install dependencies**:
```bash
npm install
```

2. **Run the dev server**:
```bash
npm run dev
```

3. **Access on your phone**:
   - Vite will show you the Network URL (e.g., `https://192.168.1.100:8000`)
   - Open that URL on your iPhone/tablet
   - Accept the self-signed certificate warning

**Vite automatically provides HTTPS for WebXR testing!**

---

### Option 2: Using ngrok (Alternative)

1. **Download ngrok**: https://ngrok.com/download
2. **Run the Python server**:
```bash
python server.py
```

3. **In ANOTHER terminal, run ngrok**:
```bash
ngrok http 8000
```

4. **Use the HTTPS URL** ngrok gives you (like `https://abc123.ngrok.io`)
5. **Open that URL on your iPhone/tablet**

---

## Production Deployment (GitHub Pages)

GitHub Pages automatically provides HTTPS - perfect for AR!

1. **Build the project**:
```bash
npm run build
```

2. **Deploy to GitHub Pages** (see [DEPLOYMENT.md](DEPLOYMENT.md) for details)

3. **Access your site**:
   - Your AR app will be at: `https://yourusername.github.io/yourrepo/`
   - HTTPS is automatic, no configuration needed!

---

## How to Use WebXR AR Mode

### On Desktop:
- The app works as a 3D preview mode
- Drag to rotate, scroll to zoom
- Click models to learn about CT Scanner components

### On AR-Compatible Mobile Devices:

1. **Open the HTTPS URL** on your iPhone or Android device
2. **Look for the "Enter AR" button** (top-left corner)
   - If you don't see it, your device may not support WebXR AR
3. **Click "Enter AR"** and grant camera permissions
4. **Move your phone** to scan the environment
5. **Look for the white ring** (reticle) on flat surfaces
6. **Tap the screen** to place the CT Scanner model
7. The model will appear anchored to the real world!

You can then:
- Walk around the model to view from different angles
- Tap models to see component information
- Use Next/Back buttons to explore parts
- Use "Turn On" button to rotate the X-ray tube

---

## WebXR vs AR.js vs 8thWall

This implementation uses **WebXR** - the modern web standard for AR:

| Feature | WebXR | AR.js | 8thWall |
|---------|-------|-------|---------|
| Markerless AR | ✅ Yes | ❌ No | ✅ Yes |
| Ground plane detection | ✅ Yes | ❌ No | ✅ Yes |
| Free/Open source | ✅ Yes | ✅ Yes | ❌ Paid |
| iOS Safari support | ⚠️ Limited* | ✅ Yes | ✅ Yes |
| Android Chrome | ✅ Yes | ✅ Yes | ✅ Yes |

*iOS Safari WebXR support is still experimental. For maximum iOS compatibility, consider using AR Quick Look or 8thWall.

---

## Device Compatibility

### ✅ Full AR Support:
- **Android**: Chrome 79+, Samsung Internet
- **iOS 15.4+**: Safari with WebXR flag enabled
- **ARCore-compatible** Android devices
- **ARKit-compatible** iOS devices

### ⚠️ Limited Support:
- **iOS Safari** (WebXR is experimental, may require flags)

### 📱 How to Enable WebXR on iOS:

1. Open Safari on iOS 15.4+
2. Go to Settings → Safari → Advanced → Experimental Features
3. Enable "WebXR Device API"
4. Restart Safari

---

## Troubleshooting

**"Enter AR button doesn't appear"**
- Your device may not support WebXR AR
- On iOS, enable WebXR in experimental features (see above)
- Make sure you're using HTTPS (not HTTP)

**"Camera not working"**
- Make sure you granted camera permissions
- Check you're using HTTPS
- Try refreshing the page

**"Can't place model"**
- Move your phone slowly to scan the environment
- Point at a flat, well-lit surface (floor, table, etc.)
- Look for the white ring (reticle) indicator

**"Models don't appear after placing"**
- Check your internet connection (35MB of models to download)
- Wait a few seconds for models to load
- Check browser console for errors

**iOS Safari Issues**
- WebXR on iOS is experimental and may not work
- Alternative: Use AR Quick Look (requires USDZ models)
- Or deploy with 8thWall for guaranteed iOS support

---

## Alternatives for iOS

If WebXR doesn't work on your iOS device, you have options:

### 1. AR Quick Look (iOS Native AR)
- Convert models to USDZ format
- Use `<a rel="ar">` links
- Opens in native iOS AR viewer
- **Pros**: Works perfectly on all iOS devices
- **Cons**: Can't customize UI, limited to viewing

### 2. 8thWall (Paid Service)
- Commercial AR engine with excellent iOS support
- Costs money but "just works" everywhere
- This app was originally built with 8thWall

Let me know if you want me to implement either alternative!

---

## Summary

**For Testing Locally:**
- Use `npm run dev` for HTTPS dev server
- Or use ngrok for stable HTTPS tunnel

**For Production:**
- Deploy to GitHub Pages for free HTTPS
- WebXR works great on Android
- iOS support is experimental (enable WebXR flag)

**For Maximum iOS Compatibility:**
- Consider AR Quick Look or 8thWall alternatives

---

## Next Steps

1. **Test locally**: `npm run dev`
2. **Try on your phone**: Use the network URL Vite provides
3. **Deploy to GitHub Pages**: See [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Enable WebXR on iOS**: Settings → Safari → Experimental Features

The future of web AR is WebXR! 🚀
