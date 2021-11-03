/*
 * @Author: cash
 * @Date: 2021-08-31 15:02:18
 * @LastEditors: cash
 * @LastEditTime: 2021-09-06 16:54:57
 * @Description: file content
 * @FilePath: \hdl-try\src\common\i18n.js
 */
import { createI18n } from 'vue-i18n/index'
import enGB from 'ant-design-vue/lib/locale-provider/en_GB' // 引入ant-design-vue的英文包
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN' // 引入ant-design-vue的中文包
import { getCookie } from '@/utils/sessionstorge'
import zhOption from '@/common/lang/zh'
import enOption from '@/common/lang/en'
const i18n = createI18n({
  fallbackLocale: 'ch',
  legacy: false,
  locale: getCookie('language') || 'zh',
  globalInjection:true,
  messages: {
    zh: Object.assign( zhOption, zhCN),
    en: Object.assign( enOption, enGB)
  }
})
const {global:{t}} = i18n
export {t}
export default i18n
