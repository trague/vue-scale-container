import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages')
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi', 'vue', 'vue2']
  },
  build: {
    outDir: 'lib', // 输出的目录
    lib: {
      entry: path.resolve(__dirname, './packages/vue-scale-container/index.ts'), // 入口文件
      name: 'VueScaleConainer', // 在浏览器umd模式下输出的全局变量
      fileName: (format) => `vue-scale-conainer.${format}.js` // 由formats决定输出的文件后缀名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-demi'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        }
      }
    }
  }
})
