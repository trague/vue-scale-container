import type { App } from 'vue-demi'
import VueScaleContainer from './src/main'
VueScaleContainer.install = function (app: App) {
  app.component(VueScaleContainer.name, VueScaleContainer)
}

export default VueScaleContainer
