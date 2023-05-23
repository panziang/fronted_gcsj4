import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  Components({
    resolvers: [VantResolver()],
  }),],
  server: { //同plugins同级
    port: 5173, //本地端口号
    proxy: { //配置代理服务器
      "/user-server": {
        target: "http://localhost:9000",    //目标url
        changeOrigin: true,    //允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""),     //重写路径,替换/api
      },
      "/product-server": {
        target: "http://localhost:9000",    //目标url
        changeOrigin: true,    //允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""),     //重写路径,替换/api
      },
      "/order-server": {
        target: "http://localhost:9000",    //目标url
        changeOrigin: true,    //允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""),     //重写路径,替换/api
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
