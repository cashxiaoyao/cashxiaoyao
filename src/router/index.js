/*
 * @Author: cash
 * @Date: 2021-08-31 14:11:29
 * @LastEditors: cash
 * @LastEditTime: 2021-09-01 09:58:07
 * @Description: file content
 * @FilePath: \my-vue-app\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
// console.log(import('@/components/MainLayout.vue'));
const MainLayout = () => import('../components/MainLayout.vue')


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout
    }
  ]
})

export default router