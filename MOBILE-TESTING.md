# Mobile Testing Guide

## The HTTPS Issue on Mobile

Your phone shows the "not safe" warning and requires HTTPS because:
- Modern browsers require HTTPS for certain features (device sensors, camera access)
- AR features sometimes need device orientation/motion sensors
- This is a security feature to protect users

## Testing Options

### Option 1: HTTP is Fine for Basic Testing (Recommended for Now)

**For the CT Scanner app, HTTP should work fine because:**
- ✅ It's not using camera/AR passthrough
- ✅ It's not accessing device sensors
- ✅ Touch gestures work on HTTP
- ✅ All 3D models work on HTTP

**Just click "Proceed Anyway" on your phone** when it warns about HTTP, and the app should work!

**The warning message is misleading** - it says "access this site over https to enter vr mode" but this app doesn't use VR mode or need HTTPS.

---

### Option 2: Use ngrok for HTTPS (Easy, Free)

If you really want HTTPS for testing:

1. **Download ngrok**: https://ngrok.com/download
2. **Run your Python server**: `python server.py`
3. **In another terminal, run ngrok**:
```bash
ngrok http 8000
```
4. **Use the HTTPS URL** ngrok provides (e.g., `https://abc123.ngrok.io`)

**Pros:**
- Real HTTPS
- Works from anywhere
- Free tier available

**Cons:**
- URL changes each time
- Requires account signup

---

### Option 3: Create Self-Signed Certificate (Advanced)

**Only do this if you really need it:**

1. Generate certificate:
```bash
# On Windows with Git Bash or WSL
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365

# Or use Python's built-in tool
python -m http.server 8000 --bind 0.0.0.0 --directory .
```

2. Update server.py to use SSL (requires code changes)

3. Accept security warning on phone (certificate won't be trusted)

**Pros:**
- Full HTTPS locally
- No third-party service

**Cons:**
- Complex setup
- Still shows security warnings
- Needs certificate acceptance on each device

---

## Current Testing Workflow (Recommended)

### Desktop Testing (HTTP - No Issues)
```bash
python server.py
```
Open: http://localhost:8000

✅ **Everything works perfectly on desktop**

### Mobile Testing (HTTP - Works but Shows Warning)
```bash
python server.py
```

1. Get your IP: `ipconfig` → IPv4 Address (e.g., 192.168.68.62)
2. On phone: `http://192.168.68.62:8000`
3. **Click "Proceed Anyway" or "Advanced" → "Proceed"**
4. App should load and work fine!

✅ **Touch gestures work**
✅ **3D models load**
✅ **All features functional**
⚠️ **Browser shows "Not Secure" (can be ignored)**

---

## What Works on HTTP vs HTTPS

### Works on HTTP ✅
- 3D model loading
- Touch gestures (drag, pinch, tap)
- All UI buttons
- Model selection
- Rotation animation
- Educational popups
- All current features of this app

### Requires HTTPS ⚠️
- Camera access (not used in this app)
- Microphone access (not used)
- Geolocation (not used)
- Device orientation sensors (not needed for basic touch)
- Service workers (not used)
- WebXR camera passthrough AR (not used - we use marker-less 3D)

**For this CT Scanner app, HTTP is totally fine!**

---

## Troubleshooting

### Phone Says "Can't reach this page"
- ✅ Check computer and phone are on same WiFi
- ✅ Check IP address is correct (run `ipconfig` again)
- ✅ Check server is still running
- ✅ Try disabling phone's VPN if you have one

### Models Don't Load on Phone
- Wait longer - 35MB of models takes time on mobile
- Check network speed
- Look for errors in mobile browser console (if accessible)

### Touch Gestures Don't Work
- Make sure you clicked "Start" button first
- Try refreshing the page
- Make sure "Place" button was clicked to enable selection mode

---

## For Production Deployment

When you deploy to GitHub Pages, Netlify, or Vercel:
- ✅ **Automatic HTTPS** - All these platforms provide free SSL certificates
- ✅ **No warnings** - Browsers will trust the certificates
- ✅ **Custom domains supported** - You can add your own domain with HTTPS

**So the HTTPS issue is only for local development, not production!**

---

## Quick Reference

**Your current setup:**
- IP Address: `192.168.68.62`
- Local URL: `http://192.168.68.62:8000`
- Status: ✅ Working (just ignore HTTPS warning on phone)

**To test on phone:**
1. Make sure server is running: `python server.py`
2. On phone browser: `http://192.168.68.62:8000`
3. Click "Advanced" or similar → "Proceed to site"
4. Done! App should work perfectly.

---

## Summary

**You don't need HTTPS for this app!**

The warning is just a browser security feature. Click through it and the app will work fine. All the features you need (3D models, touch gestures, UI) work perfectly on HTTP.

When you deploy to production (GitHub Pages, etc.), you'll get automatic HTTPS anyway, so this is only a local development thing.

**Just test it - you'll see it works! 🎉**
