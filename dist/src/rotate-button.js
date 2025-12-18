let isRotating = false

const rotateButtonComponent = () => ({
  init() {
    const btn = document.getElementById('rotate-button')
    const pivot = document.getElementById('rotation_pivot')

    btn.addEventListener('click', () => {
      isRotating = !isRotating

      if (isRotating) {
        btn.textContent = 'Turn Off'
        pivot.setAttribute('animation__spin', {
          property: 'rotation',
          to: '0 360 0',
          loop: true,
          dur: 5000,
          easing: 'linear',
        })
      } else {
        btn.textContent = 'Turn On'
        pivot.removeAttribute('animation__spin')
      }
    })
  },
})

export {rotateButtonComponent}
