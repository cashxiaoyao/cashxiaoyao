import http from '../utils/http'
//
/**
 *  @parms request 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let userAuth = '/basis-footstone'
let request = '/basis-footstone/mgmt'
let community = '/community-footstone'
let door = '/community-wisdom'

// smart-footstone =>https://test-gz.hdlcontrol.com/smart-footstone
// 登录接口
export function getListAPI (params) {
  return http.post(`${userAuth}/mgmt/user/oauth/login`, params)
}
// 登出接口
export function loginOut (params) {
  return http.post(`${request}/account/login/out`, params)
}

// 修改密码
export function moditifyPsd (params) {
  return http.post(`${request}/user/manage/updatePassword`, params)
}

// 发送验证码
export function sendCode (params) {
  return http.post(`${request}/main/verification/send`, params)
}

// 忘记密码
export function findPsd (params) {
  return http.post(`/basis-footstone/mgmt/user/oauth/forgetPwd`, params)
}
// 获取手机号或者邮箱
export function getUserInfoByAccont (params) {
  return http.post(`/basis-footstone/mgmt/user/oauth/getUserInfoByAccont`, params)
}

// 角色权限
export function roleAuth (params) {
  return http.post(`${request}/user/manage/getCompanyParterMenu`, params)
}
// 操作日志
export function logList (params) {
  return http.post(`${request}/main/operationLog/listByPage`, params)
}

export function systemList (params) {
  return http.post(`${request}/company/manage/getSysList`, params, false)
}
