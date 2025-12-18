/**
 * WebXR AR Mode Component
 * Provides camera-based AR with ground plane detection
 */

export const arModeComponent = {
  init() {
    this.arButton = document.getElementById('ar-button');
    this.arContainer = document.getElementById('ar-container');
    this.scene = this.el;
    this.isPlaced = false;
    this.reticle = null;

    // Check if AR is supported
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        if (supported) {
          this.arButton.style.display = 'block';
          this.arButton.addEventListener('click', () => this.enterAR());
        } else {
          console.log('AR not supported - falling back to 3D preview mode');
          this.arButton.style.display = 'none';
        }
      }).catch((err) => {
        console.log('WebXR check failed:', err);
        this.arButton.style.display = 'none';
      });
    } else {
      console.log('WebXR not available - 3D preview mode only');
      this.arButton.style.display = 'none';
    }
  },

  async enterAR() {
    const sessionInit = {
      requiredFeatures: ['hit-test', 'local-floor'],
      optionalFeatures: ['dom-overlay'],
      domOverlay: { root: document.body }
    };

    try {
      // Request AR session
      const session = await navigator.xr.requestSession('immersive-ar', sessionInit);

      // Get the A-Frame scene's Three.js renderer
      const sceneEl = this.scene;
      const renderer = sceneEl.renderer;

      // Enable XR
      await renderer.xr.setSession(session);

      // Hide the AR container initially
      this.arContainer.object3D.visible = false;

      // Set up hit test source for ground plane detection
      const referenceSpace = await session.requestReferenceSpace('viewer');
      const hitTestSource = await session.requestHitTestSource({ space: referenceSpace });

      this.session = session;
      this.hitTestSource = hitTestSource;

      // Create reticle for placement indicator
      this.createReticle();

      // Listen for select events (tap to place)
      session.addEventListener('select', (event) => {
        if (!this.isPlaced) {
          this.placeModel(event);
        }
      });

      session.addEventListener('end', () => {
        this.cleanup();
      });

      // Start the AR render loop
      this.startARLoop(session);

    } catch (error) {
      console.error('Failed to start AR session:', error);
      alert('Could not start AR mode. Make sure you:\n1. Are using HTTPS\n2. Have a device that supports WebXR AR\n3. Granted camera permissions');
    }
  },

  createReticle() {
    // Create a reticle (ring) to show where the model will be placed
    const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
    const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    this.reticle.matrixAutoUpdate = false;
    this.reticle.visible = false;
    this.scene.object3D.add(this.reticle);
  },

  startARLoop(session) {
    const sceneEl = this.scene;
    const renderer = sceneEl.renderer;

    // Get the local reference space for hit testing
    session.requestReferenceSpace('local-floor').then((refSpace) => {
      const animate = (time, frame) => {
        if (!frame) return;

        // Get the pose
        const pose = frame.getViewerPose(refSpace);

        if (pose && this.hitTestSource && !this.isPlaced) {
          // Perform hit test to find ground plane
          const hitTestResults = frame.getHitTestResults(this.hitTestSource);

          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            const hitPose = hit.getPose(refSpace);

            // Update reticle position to show where model will be placed
            if (this.reticle && hitPose) {
              this.reticle.visible = true;
              this.reticle.matrix.fromArray(hitPose.transform.matrix);
            }
          } else {
            if (this.reticle) {
              this.reticle.visible = false;
            }
          }
        }
      };

      renderer.xr.setAnimationLoop(animate);
    });
  },

  placeModel(event) {
    // Get the session and frame
    const frame = event.frame;
    const session = this.session;

    session.requestReferenceSpace('local-floor').then((refSpace) => {
      const hitTestResults = frame.getHitTestResults(this.hitTestSource);

      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const hitPose = hit.getPose(refSpace);

        if (hitPose) {
          // Position the AR container at the hit location
          const position = hitPose.transform.position;
          this.arContainer.setAttribute('position', {
            x: position.x,
            y: position.y,
            z: position.z
          });

          // Make the model visible
          this.arContainer.object3D.visible = true;

          // Hide the reticle
          if (this.reticle) {
            this.reticle.visible = false;
          }

          this.isPlaced = true;

          // Show instructions
          const message = document.getElementById('message');
          if (message) {
            message.innerHTML = '<h1>Model Placed!</h1><p>You can now interact with the CT Scanner components.</p>';
            message.style.display = 'block';
            setTimeout(() => {
              message.style.display = 'none';
            }, 3000);
          }
        }
      }
    });
  },

  cleanup() {
    if (this.reticle) {
      this.scene.object3D.remove(this.reticle);
      this.reticle = null;
    }
    this.hitTestSource = null;
    this.session = null;
    this.isPlaced = false;

    // Show the AR container again for non-AR mode
    if (this.arContainer) {
      this.arContainer.object3D.visible = true;
    }
  }
};
