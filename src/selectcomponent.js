import {modelDescriptions} from './data.js'
import {openPopup} from './popup.js'
import {updateButtonVisibility} from './next-button.js'
import {setSelectedIndex} from './data.js'

const originalMaterials = new Map()

export function setOpacity(modelElement, opacity, highlight = false) {
  const meshObject = modelElement.getObject3D('mesh')

  // Ensure that meshObject exists before attempting to traverse
  if (meshObject) {
    meshObject.traverse((node) => {
      if (node.isMesh) {
        // Save original material if not already cached
        if (!originalMaterials.has(node)) {
          originalMaterials.set(node, {
            transparent: node.material.transparent,
            opacity: node.material.opacity,
            color: node.material.color.clone(),
          })
        }
        // Set opacity
        node.material.transparent = true
        node.material.opacity = opacity

        // Apply highlight if requested
        if (highlight) {
          node.material.color.set(0xff0000)  // Red highlight for selected model
        } else {
          // Restore original color
          const originalMaterial = originalMaterials.get(node)
          node.material.color.copy(originalMaterial.color)
        }
      }
    })
  }
}

export function updateModelVisibility(selectedModelId) {
  const modelElements = document.querySelectorAll('.cantap')
  modelElements.forEach((modelElement) => {
    if (modelElement.id === selectedModelId) {
      setOpacity(modelElement, 1.0, true)  // Highlight selected model
    } else {
      setOpacity(modelElement, 0.3)  // Dim other models
    }
  })
}

export function resetModelOpacity() {
  originalMaterials.forEach((originalMaterial, node) => {
    // retreive original material
    node.material.transparent = originalMaterial.transparent
    node.material.opacity = originalMaterial.opacity
    node.material.color.copy(originalMaterial.color)  // recover original color
  })
}

export function cacheOriginalMaterials() {
  const modelElements = document.querySelectorAll('.cantap')

  modelElements.forEach((modelElement) => {
    const meshObject = modelElement.getObject3D('mesh')
    if (meshObject) {
      meshObject.traverse((node) => {
        if (node.isMesh && !originalMaterials.has(node)) {
          originalMaterials.set(node, {
            transparent: node.material.transparent,
            opacity: node.material.opacity,
            color: node.material.color.clone(),
          })
        }
      })
    }
  })
}

export function selectcomponent() {
  const modelElements = document.querySelectorAll('.cantap')
  cacheOriginalMaterials()
  modelElements.forEach((modelElement) => {
    if (modelElement.id !== 'group') {
      modelElement.addEventListener('click', () => {
        const modelId = modelElement.id
        const newIndex = modelDescriptions.findIndex(description => description.Modelname === modelId)
        setSelectedIndex(newIndex)

        if (newIndex !== -1) {
          openPopup(newIndex, modelDescriptions)
          updateModelVisibility(modelId)
          updateButtonVisibility()
        }
      })
    }
  })
}
