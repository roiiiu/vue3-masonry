import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),dts()],
  build: {
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: '/src/index.ts',
      formats: ['es'],
      name: 'vue3-masonry',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      input: {
        main: path.resolve(__dirname, "src/index.ts")
      },
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
