// Copyright (c) 2022 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall web app. Code here will execute after head.html
// is loaded, and before body.html is loaded.

import './index.css'
import {nextButtonComponent} from './next-button'
import {rotateComponent} from './rotate-button'
import {startButton} from './start-button'

AFRAME.registerComponent('next-button', nextButtonComponent())
AFRAME.registerComponent('rotate-button', rotateComponent)
AFRAME.registerComponent('start-button', startButton)

const IS_IOS =
  /^(iPad|iPhone|iPod)/.test(window.navigator.platform) ||
  (/^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1)
if (IS_IOS) {
  window.createImageBitmap = undefined
}
