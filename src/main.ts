import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import Autoimport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuedevtools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'
const app = createApp(App)
export default defineConfig({
  plugins: [
    vue(),
    vuedevtools(),
    Autoimport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
app.use(createPinia())
app.use(router)
app.use(vant)
app.mount('#app')
