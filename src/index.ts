import { App } from 'vue';
import Masonry from './ui/Masonry.vue'


export default {
  install(app: App) {
    app.component("Masonry", Masonry);
  },
};
export { Masonry };
