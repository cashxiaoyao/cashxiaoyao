/*
 * @Author: cash
 * @Date: 2021-08-30 15:59:35
 * @LastEditors: cash
 * @LastEditTime: 2021-09-06 14:33:11
 * @Description: file content
 * @FilePath: \hdl-try\vite.config.js
 */
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import autoprefixer from "autoprefixer"
// import viteSvgIcons from 'vite-plugin-svg-icons'

function resolvePath(dir){
  return resolve(__dirname,'.',dir)
}

// console.log(process.env);
// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, __dirname)
  const isProduction = env.VITE_NODE_ENV === 'production'
  return {
    plugins: [
      vue(),
      autoprefixer
      // // 自动导入svg图标
      // viteSvgIcons({
      //   iconDirs: [resolve(process.cwd(), 'src/public')],
      //   symbolId: 'icon-[dir]-[name]'
      // })
    ],
    // 项目根目录
    root: process.cwd(),
    // 在生产中服务时的基本公共路径
    base: './',
    // 配置中指明将会把 serve 和 build 时的模式都覆盖掉,serve 时默认 'development'，build 时默认 'production'
    mode: 'development',
    // 在开发时会被定义为全局变量，而在构建时则是静态替换
    define: '',
    // 静态资源服务的文件夹
    publicDir: 'assets',
    resolve:{
      alias:{
        "@":resolvePath('src')
      }
    },
    server:{
      port:8096,
      open:true,
      overlay:{
        warning:false,
        errors:true
      },
      lintOnSave:false,
      proxy:{
        // '/api':{
        //   target::'/',
        //   changeOrigin:true,
        //   ws:true,
        //   rewrite:path=>path.replace(/^\/api/,'')
        // }
      },
      hmr: { overlay: false },
    },
    build: {
      outDir:`dist`,
       // 生产环境移除console
      terserOptions: {
       compress: {
         drop_console: true,
         drop_debugger: true
       }
      }
    },
    // CSS 预处理器
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 用于全局导入，以避免需要单独导入每个样式文件。
            // reference:  避免重复引用
            // hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
            // ↓这行代码下一章讲
            // ...generateModifyVars(),
          },
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu',
      ],
      exclude: ['vue-demi'],
    },
  }
})
