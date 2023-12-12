import type { App, Plugin } from 'vue'

import component from './components/Masonry.vue'

export type MasonryComponent = typeof component

type MasonryPlugin = MasonryComponent & Plugin

const Masonry: MasonryPlugin =
  /* #__PURE__ */ ((): MasonryPlugin => {
    const installable = component as unknown as MasonryPlugin

    installable.install = (app: App) => {
      app.component('Masonry', installable)
    }

    return installable
  })()

declare module 'vue' {
  export interface GlobalComponents {
    Masonry: MasonryComponent
  }
}

export default Masonry
