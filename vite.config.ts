import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    host: true,
    port: 12000,
    open: true,
    cors: true,
  },
  resolve: {
    alias: {
      '@': join(__dirname, "src")
    }
  },
  plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
  ]
})
