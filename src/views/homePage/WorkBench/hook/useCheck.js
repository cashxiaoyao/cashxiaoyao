/*
 * @Author: cash
 * @Date: 2021-11-05 13:58:21
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 14:37:45
 * @Description: file content
 * @FilePath: \hdl-try\src\views\homePage\WorkBench\hook\useCheck.js
 */
import { checkoutSysAuth } from '@/api/api'
import { Modal } from 'ant-design-vue';

const systemUrl =
import.meta.env.VITE_NODE_ENV === 'test'
  ? 'http://47.114.131.143:9012/#'
  : import.meta.env.VITE_NODE_ENV == 'development'
  ? 'http://47.114.117.27:9003/#'
  : import.meta.env.VITE_NODE_ENV == 'production'
  ? 'https://iot.hdlcontrol.com/iot-common/#'
  : 'https://iot-en.hdlcontrol.com/iot-common/#';

export function UseCheckoutSysAuth(){

  const  checkOutAuth = async(opt)=> {
    const res = await checkoutSysAuth(opt)
    if (res.code === 0) {
      if (res.data) { // data = true
  
      } else { // data = false表示该系统没有权限
        Modal.error({
          // okText: '确定',
          okText: this.$t('hdl.determine'),
          title: res.message,
          onOk () {
            window.location.href = `${systemUrl}`
          }
        })
      }
    }
  }
  return {checkOutAuth}
}