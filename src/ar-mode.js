/**
 * WebXR AR Mode Component
 * Provides camera-based AR with ground plane detection
 */

export const arModeComponent = {
  init() {
    this.arButton = document.getElementById('ar-button');
    this.scene = this.el;
    this.camera = document.getElementById('camera');

    // Check if AR is supported
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        if (supported) {
          this.arButton.style.display = 'block';
          this.arButton.addEventListener('click', () => this.enterAR());
        } else {
          console.warn('AR not supported on this device');
          this.arButton.style.display = 'none';
        }
      });
    } else {
      console.warn('WebXR not available');
      this.arButton.style.display = 'none';
    }
  },

  async enterAR() {
    const sessionInit = {
      requiredFeatures: ['hit-test', 'dom-overlay'],
      domOverlay: { root: document.body }
    };

    try {
      const session = await navigator.xr.requestSession('immersive-ar', sessionInit);
      this.scene.renderer.xr.setSession(session);

      // Set up hit testing for ground plane
      const referenceSpace = await session.requestReferenceSpace('viewer');
      const hitTestSource = await session.requestHitTestSource({ space: referenceSpace });

      this.session = session;
      this.hitTestSource = hitTestSource;

      session.addEventListener('end', () => {
        this.hitTestSource = null;
        this.session = null;
      });

      // Start AR render loop
      this.scene.renderer.xr.enabled = true;

    } catch (error) {
      console.error('Failed to start AR session:', error);
      alert('Could not start AR mode. Make sure you are using HTTPS and your device supports AR.');
    }
  }
};
