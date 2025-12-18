/**
 * Custom Gesture Handler Component
 * Replaces 8thWall's xrextras-hold-drag and xrextras-two-finger-rotate
 * Provides touch and mouse controls for 3D models
 */

export const gestureHandlerComponent = {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 }
  },

  init() {
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.isDragging = false;
    this.previousPosition = { x: 0, y: 0 };

    // Touch handling
    this.pinchStartDistance = 0;
    this.lastPinchDistance = 0;
    this.initialRotation = { x: 0, y: 0 };

    // Bind event handlers
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    // Add event listeners
    this.el.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchmove', this.onTouchMove, { passive: false });
    document.addEventListener('touchend', this.onTouchEnd);

    this.el.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },

  onTouchStart(event) {
    if (!this.data.enabled) return;

    event.preventDefault();

    if (event.touches.length === 1) {
      // Single touch - rotation
      this.isDragging = true;
      this.previousPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      this.initialRotation = {
        x: this.el.object3D.rotation.x,
        y: this.el.object3D.rotation.y
      };
    } else if (event.touches.length === 2) {
      // Two fingers - pinch to scale
      this.isDragging = false;
      this.pinchStartDistance = this.getDistanceBetweenTouches(event.touches);
      this.lastPinchDistance = this.pinchStartDistance;
    }
  },

  onTouchMove(event) {
    if (!this.data.enabled) return;

    event.preventDefault();

    if (event.touches.length === 1 && this.isDragging) {
      // Single touch drag - rotate model
      const deltaX = event.touches[0].clientX - this.previousPosition.x;
      const deltaY = event.touches[0].clientY - this.previousPosition.y;

      this.el.object3D.rotation.y += deltaX * 0.01;
      this.el.object3D.rotation.x += deltaY * 0.01;

      this.previousPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    } else if (event.touches.length === 2) {
      // Pinch to scale
      const currentDistance = this.getDistanceBetweenTouches(event.touches);
      const scaleDelta = currentDistance / this.lastPinchDistance;

      this.scaleFactor *= scaleDelta;
      // Clamp scale between 0.5x and 3x
      this.scaleFactor = Math.max(0.5, Math.min(3, this.scaleFactor));

      this.el.object3D.scale.copy(this.initialScale).multiplyScalar(this.scaleFactor);

      this.lastPinchDistance = currentDistance;
    }
  },

  onTouchEnd(event) {
    if (event.touches.length === 0) {
      this.isDragging = false;
    } else if (event.touches.length === 1) {
      // Back to single touch after pinch
      this.isDragging = true;
      this.previousPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    }
  },

  onMouseDown(event) {
    if (!this.data.enabled) return;

    this.isDragging = true;
    this.previousPosition = {
      x: event.clientX,
      y: event.clientY
    };
    this.initialRotation = {
      x: this.el.object3D.rotation.x,
      y: this.el.object3D.rotation.y
    };

    event.preventDefault();
  },

  onMouseMove(event) {
    if (!this.data.enabled || !this.isDragging) return;

    const deltaX = event.clientX - this.previousPosition.x;
    const deltaY = event.clientY - this.previousPosition.y;

    this.el.object3D.rotation.y += deltaX * 0.01;
    this.el.object3D.rotation.x += deltaY * 0.01;

    this.previousPosition = {
      x: event.clientX,
      y: event.clientY
    };

    event.preventDefault();
  },

  onMouseUp(event) {
    this.isDragging = false;
  },

  getDistanceBetweenTouches(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  },

  remove() {
    // Clean up event listeners
    this.el.removeEventListener('touchstart', this.onTouchStart);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);

    this.el.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
};
