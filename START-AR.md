# Start AR Mode - Quick Guide

## YOU NEED HTTPS FOR AR TO WORK!

AR.js requires camera access which needs HTTPS. Here's how to run it:

## Option 1: Using ngrok (EASIEST - RECOMMENDED)

1. **Download ngrok**: https://ngrok.com/download
2. **Extract it** to this folder
3. **Run the Python server**:
```bash
python server.py
```

4. **In ANOTHER terminal, run ngrok**:
```bash
ngrok http 8000
```

5. **Use the HTTPS URL** ngrok gives you (like `https://abc123.ngrok.io`)
6. **Open that URL on your iPhone/tablet**

**That's it! The AR will work with camera!**

---

## Option 2: Deploy to Netlify (FOR PRODUCTION)

1. Drag the whole folder to https://app.netlify.com/drop
2. Get instant HTTPS URL
3. Share with users!

---

## How to Use AR Mode

1. Open the HTTPS URL on your phone
2. **Allow camera access** when prompted
3. **Print the Hiro marker**: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
4. **Point your phone camera at the marker**
5. The CT Scanner will appear on the marker!

You can then:
- Move your phone around to view from different angles
- Tap models to see information
- Use Next/Back buttons to explore components

---

## Marker-less AR (Coming Soon)

For marker-less AR (no printed marker needed), I can implement location-based AR or use WebXR instead. Let me know if you want that!

---

## Troubleshooting

**"Camera not working"**
- Make sure you're using HTTPS (not HTTP)
- Allow camera permissions when prompted
- iOS Safari works best

**"Models don't appear"**
- Make sure you're pointing at the Hiro marker
- Print it clearly (black and white, no blur)
- Ensure good lighting

**"ngrok command not found"**
- Make sure ngrok is in your PATH
- Or run it from the folder where you extracted it: `./ngrok http 8000`
