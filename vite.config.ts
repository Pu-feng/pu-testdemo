import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    copyIndexTo404() // 使用自定义插件
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// 自定义插件，用于在构建后将 index.html 复制为 404.html
function copyIndexTo404() {
  // 用于解决 github pages 404 页面显示问题
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexFile = path.resolve(distDir, 'index.html')
      const notFoundFile = path.resolve(distDir, '404.html')
      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, notFoundFile)
        console.log('index.html has been copied to 404.html')
      } else {
        console.error('index.html does not exist in the dist directory')
      }
    }
  }
}
