import type { App } from 'vue';
import Masonry from "@/Masonry.vue";

export default {
  install: (app: App) => {
    app.component('Masonry', Masonry);
  }
};

export { Masonry };
