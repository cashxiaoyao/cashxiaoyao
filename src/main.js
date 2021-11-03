/*
 * @Author: cash
 * @Date: 2021-08-30 15:59:35
 * @LastEditors: cash
 * @LastEditTime: 2021-09-06 14:31:33
 * @Description: file content
 * @FilePath: \hdl-try\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import VueI18n from '@/common/i18n.js'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import less from 'less'
import {message} from 'ant-design-vue'

const app = createApp(App)
app.config.globalProperties.$message = message;

app.use(router)
.use(VueI18n)
.use(store)
.use(Antd)
.use(less)
.mount('#app')

export default app