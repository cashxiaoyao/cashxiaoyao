/*
 * @Author: cash
 * @Date: 2021-08-31 14:55:06
 * @LastEditors: cash
 * @LastEditTime: 2021-09-06 14:41:37
 * @Description: file content
 * @FilePath: \hdl-try\src\utils\sign.js
 */
// const querystring = require('querystring')
import querystring from 'querystring'
import md5 from 'js-md5'
// const md5 = require('crypto-js/md5')

export function sign (payload, appKey, appSecret) {
  // keys获取排序对象属性名，sort方法按ascii码对属性名排序
  // 添加appKey
  payload.appKey = appKey
  // 时间戳
  const timestamp = Math.round(new Date().getTime() / 1000)
  payload.timestamp = timestamp
  const newkey = Object.keys(payload).sort()
  // 创建一个新的对象，用于存放待签名的键值对
  const newObj = {}
  for (let i = 0; i < newkey.length; i++) {
    // 获取数据类型为string和number的属性
    if (typeof payload[newkey[i]] !== 'object' && payload[newkey[i]] !== '' && payload[newkey[i]] !== undefined) {
      newObj[newkey[i]] = payload[newkey[i]]
    }
  }
  if (newObj.sign) {
    delete newObj.sign
  }
  let signStr = decodeURIComponent(querystring.stringify(newObj) + appSecret)
  // console.log(signStr, 'signStr')
  const payloadsign = md5(signStr).toString()
  payload.sign = payloadsign
  return payload
}
