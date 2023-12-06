import { App } from 'vue';
import Masonry from './components/Masonry.vue'


export default {
  install(app: App) {
    app.component("Masonry", Masonry);
  },
};
export { Masonry };
