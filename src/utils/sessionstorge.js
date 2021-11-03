'use strict'
// 编辑sessionstorage内的数据
export function set (keys, value) {
  // 判断key类型为a或a.b.c
  try {
    if (typeof keys !== 'string') {
      console.error('keys only allowed as string')
      return
    }
    const data = JSON.stringify(value)
    const property = keys.split('.')
    const length = property.length
    // 判断sessionstorge中是否存在key为a的值
    let key = JSON.parse(sessionStorage.getItem(property[0]) || '{}')
    if (length === 1 || typeof key === 'object') {
      setItem(key)
    } else {
      setItem({})
    }
    // eslint-disable-next-line no-inner-declarations
    function setItem (key) {
      if (length === 1) {
        sessionStorage.setItem(property[0], data)
      }
      if (length === 2) {
        key[property[1]] = data
        sessionStorage.setItem(property[0], JSON.stringify(key))
      }
      if (length === 3) {
        key[property[1]][property[2]] = data
        sessionStorage.setItem(property[0], JSON.stringify(key))
      }
      if (length === 4) {
        key[property[1]][property[2]][property[3]] = data
        sessionStorage.setItem(property[0], JSON.stringify(key))
      }
    }
  } catch (err) {
    console.error(err)
  }
}
// 获取sessionstorage内的数据
export function get (keys) {
  try {
    if (typeof keys !== 'string') {
      console.error('keys only allowed as string')
      return undefined
    }
    const property = keys.split('.')
    const length = property.length
    let key = JSON.parse(sessionStorage.getItem(property[0]) || '{}')
    if (length === 1) {
      return key
    }
    if (typeof key === 'object') {
      if (length === 2) {
        return key[property[1]]
      }
      if (length === 3) {
        return key[property[1]][property[2]]
      }
      if (length === 4) {
        return key[property[1]][property[2]][property[3]]
      }
    } else {
      return undefined
    }
  } catch (err) {
    console.error(err)
  }
}
// 删除sessionstorage内的数据
export function remove (keys) {
  try {
    if (typeof keys !== 'string') {
      console.error('keys only allowed as string')
      return
    }
    const property = keys.split('.')
    const length = property.length
    if (length === 1) {
      sessionStorage.removeItem(keys)
    }
    let key = JSON.parse(sessionStorage.getItem(property[0]) || '{}')
    if (typeof key === 'object') {
      if (length === 2) {
        delete key[property[1]]
        sessionStorage.setItem(property[0], JSON.stringify(key))
      }
      if (length === 3) {
        delete key[property[1]][property[2]]
        sessionStorage.setItem(property[0], JSON.stringify(key))
      }
      if (length === 4) {
        delete key[property[1]][property[2]][property[3]]
        sessionStorage.setItem(property[0], JSON.stringify(key))
      }
    }
  } catch (error) {
    console.error('keys not defined')
  }
}

// 使用cookie存储验签信息
export function setCookie(name, value, time) {
  let strsec = getsec(time)
  let exp = new Date()
  exp.setTime(exp.getTime() + strsec * 1)
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}

function getsec(str) {
 let str1 = str.substring(1, str.length) * 1
 let str2 = str.substring(0, 1)
 if (str2 == "s") {
    return str1 * 1000
 } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000
 } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000
 }
}

//读取cookies
export function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if(arr = document.cookie.match(reg))
    return (arr[2])
  else
    return null
}


// 删除cookies
export function delCookie(name) {
  setCookie(name, "", '-1'); 
}

export function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if(keys) {
    for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + ';path=/'
  }
}