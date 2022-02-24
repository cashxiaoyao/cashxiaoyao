/*
 * @Author: cash
 * @Date: 2021-08-31 14:11:29
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 15:15:38
 * @Description: file content
 * @FilePath: \hdl-try\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: ()=>import('@/components/MainLayout.vue'),
      children:[
        {
          name: 'workbench',
          path: '/homePage/workbench',
          component: ()=>import('@/views/homePage/Workbench/index.vue'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/productCenter/productCategory',
          name: 'productCategory',
          component: ()=>import('@/views/productCenter/productCategory/index.vue'),
          meta: {
            keepAlive: false
          }
        },
      ]
    }
  ]
})

export default router