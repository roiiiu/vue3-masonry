import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),dts()],
  build: {
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
      name: 'vue3-masonry',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        chunkFileNames: "common/[name].js",
        entryFileNames: (file) => {
          if (file.name == "index") {
            return "index.js";
          } else {
            return "[name]/index.js";
          }
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
