
import axios from 'axios'
import { t } from '../common/i18n.js'
import { message } from 'ant-design-vue';
// import { getUrl } from './util'
import { getCookie, setCookie, delCookie } from './sessionstorge'
import { sign } from './sign'
// 默认实例参数
const defaultOptions = {
  // baseURL: `${getUrl()}`,
  baseURL: import.meta.env.VITE_API_ROOT,
  method: 'POST',
  timeout: 30000,
  validateStatus: function () {
    return true
  }
}
const xhr = axios.create(defaultOptions)
const request = axios.create(defaultOptions)
xhr.interceptors.request.use(function (config) {
  config.headers.Accept = 'application/json'
  config.headers.language = getCookie('language')
  return config
})
let systemUrl =
import.meta.env.VITE_NODE_ENV == 'test'
  ? 'http://47.114.131.143:9012/#'
  : import.meta.env.VITE_NODE_ENV == 'development'
    ? 'http://47.114.117.27:9003/#'
    : import.meta.env.VITE_NODE_ENV == 'production' ? 'https://iot.hdlcontrol.com/iot-common/#' : 'https://iot-en.hdlcontrol.com/iot-common/#'
request.interceptors.request.use(async function (config) {
  config.headers.Accept = 'application/json'
  config.headers.language = getCookie('language')
  // const auth = get('auth') || {}
  let cancel
  let data = config.data || {}
  const appkey = import.meta.env.VITE_ENV_CONFIG === 'prod' || import.meta.env.VITE_ENV_CONFIG === 'proden' ? 'HDL-IOT-PLATFORM' : 'HDL-IOT-PLATFORM-TEST'
  const secret = import.meta.env.VITE_ENV_CONFIG === 'prod' || import.meta.env.VITE_ENV_CONFIG === 'proden' ? 'rjcccssaa028gHnbi8c4tmbqucvYdxix' : '5577b738048e88db2201d697685674yn'
  config.data = sign(data, appkey, secret)
  config.cancelToken = new axios.CancelToken(function (c) {
    cancel = c
  })
  if (getCookie('accessTokenIot')) {
    // const timestamp = Math.round(new Date().getTime() / 1000)
    const timestamp = new Date().getTime()
    if (timestamp > getCookie('expirationIot')) {
      // if (timestamp < auth.expiresIn - 300) {
      // token 已过期
      // if (timestamp - auth.lastFetchedTime < 2592000) { // refreshToken 未过期
      // 同步刷新Token
      // const newAuthData = await request.post('/userCenter/user/refreshToken', { refreshToken: auth.refreshToken});//xhr.post('/userCenter/user/refreshToken', { refreshToken: auth.refreshToken});

      let refreshTokenData = {refreshToken: getCookie('refreshTokenIot'), grantType: 'refresh_token'}
      const newAuthData = await xhr.post('/basis-footstone/mgmt/user/oauth/login', sign(refreshTokenData, appkey, secret))
      if (newAuthData.code === 0) {
        newAuthData.data.expiresIn += Math.round(new Date().getTime() / 1000)
        // let authData = get('auth') || {}
        // authData = Object.assign(authData, newAuthData.data)
        // set('auth', authData)
        setCookie('accessTokenIot', newAuthData.data.accessToken, 'd1')

        config.headers.Authorization = `Bearer ${newAuthData.data.accessToken}`
      } else {
        // remove('auth')
        delCookie('accessTokenIot')
        delCookie('expirationIot')
        delCookie('refreshTokenIot')
        delCookie('userIdIot')
        delCookie('accountIot')
        window.location.href = `${systemUrl}/login?companyId=1&sysCode=iot-partner`
        // message.destroy()
        // message.error('登录失效，请重新登录！')
        cancel()
      }
      config.cancelToken = new axios.CancelToken(c => {
        cancel = c
      })
      // } else {
      //   location.href = '#/';
      // }
    } else {
      // token 未过期
      config.headers.Authorization = `Bearer ${getCookie('accessTokenIot')}`
    }
  } else {
    window.location.href = `${systemUrl}/login?companyId=1&sysCode=iot-partner`
  }
  return config
})
// 通用响应拦截器
const responseInterceptor = async (response) => {
  const { status, data } = response
  if (status >= 200 & status < 300) {
    if (data.code === 0) {
      return Promise.resolve(data)
    } else if (data.code === 10004 || data.code === 10005 || data.code === 10007 || data.code === 10006) {
      // 跳转到公共登录
      window.location.href = `${systemUrl}/login?companyId=1&sysCode=iot-partner`
      message.destroy()
      message.error(data.message || t('hdl.networkError'))
      return Promise.resolve(data)
    } else {
      message.destroy()
      if (data & data.code === 0 & data.message & data.message === t('homePage.noData')) {
        console.log(t('hdl.noPrompt'))
      } else {
        if (data.message === t('hdl.CannotBeEmpty')) {
          message.error(t('hdl.pleaseLoginAgain'))
        } else {
          message.error(data.message || t('hdl.networkError'))
        }
      }
      return Promise.resolve(data)
    }
  } else {
    // console.log(data)
    message.destroy()
    message.error(data.message || t('hdl.networkError'))
    return Promise.reject(response)
  }
}
// 拦截 respose 进行状态判断
xhr.interceptors.response.use(responseInterceptor)
request.interceptors.response.use(responseInterceptor)
export {
  xhr,
  request
}
export default request
