import i18n from '../common/i18n.js'
import Vue from 'vue'
import { Message } from "ant-design-vue";
Vue.use(Message);

export function download (url) {
  if (url && Object.prototype.toString.call(url) === '[object String]') {
    let a = document.createElement('a')
    a.href = encodeURI(url)
    a.download = 'excel.csv'
    a.id = 'downLoad'
    a.style.display = 'none'
    // a.click()
    document.body.appendChild(a)
    document.getElementById('downLoad').click()
    document.body.removeChild(document.getElementById('downLoad'))
    a = null
  }
}
export function author (auth) {
  let res = false
  // const reg = /(?<=\/).*?(?=\?)|(?<=\/).*/;
  // let hash = reg.exec(location.hash)[0];
  let hash = location.hash.replace('#', '')
  hash = hash.split('?')[0]
  const menu = sessionStorage.menus ? JSON.parse(sessionStorage.menus) : []
  menu.map(item1 => {
    item1.children &&
      item1.children.map(item2 => {
        if (item2.menuUrl === hash) {
          item2.children &&
            item2.children.map(item3 => {
              if (item3.menuCode == auth) {
                res = true
              }
            })
        }
      })
  })
  // console.log(menu)
  return res
  // return true
}
// 时间戳转化年月日
export function getYMD(timestamp) {
  let time = new Date(timestamp)
  let year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const date = (time.getDate()).toString().padStart(2, '0')
  return year + '/' + month + '/' + date
}
export function checkPhone(rule, value, callback) {
  let regex = /^1[0-9]{10}$/; //手机号
  if (value && !regex.test(value)) {
    //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
    callback(i18n.$t('hdl.PLCorrectPhoneNumber'));
  } else {
    callback();
  }
}

export function checkAlipay(rule, value, callback) {
  let regex = /^((\w)+(\.\w+)*@([\w-])+((\.[\w-]+)+)|(1\d{10}))$/; //支付宝账号
  if (value && !regex.test(value)) {
    callback(i18n.$t('hdl.PLCorrectAlipayAccount'));
  } else {
    callback();
  }
}

export function checkTel(rule, value, callback) {
  let regex = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/; //固话或者手机号
  if (value && !regex.test(value)) {
    callback(i18n.$t('hdl.PLCorrectFixedLine'));
  } else {
    callback();
  }
}

export function checkHttp(rule, value, callback) {
  let regex = /^(http[s]?|ftp):\/\/[^\\/\\.]+?\..+(\w|\/)$/; //网址
  if (value && !regex.test(value)) {
    callback(i18n.$t('hdl.PLCorrectWebsite'));
  } else {
    callback();
  }
}

export function checkEmail(rule, value, callback) {
  let regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value && !regex.test(value)) {
    callback(i18n.$t('homePage.PLEmail'));
  } else {
    callback();
  }
}
export function getSite(arr, sites) {
  let bool = false;
  arr.forEach(function (item, index) {
    // 返回对应子数据
    if (item.site == sites) {
      bool = item.keyIcon.length == 0 ?false :item.keyIcon;
    }
  })
  return bool
}
export function colorStr(texturenum,colornum){//传入 材质，颜色的索引
      var colorS = '';
      if (texturenum === 'METAL'){//金属
        switch (colornum) {
          case 1:
            colorS = "塑料象牙白";
            break;
          case 2:
            colorS = "塑料炭灰色";
            break;
          case 3:
            colorS = "塑料香槟金";
            break;
          case 4:
            colorS = "塑料深空灰";
            break;
        }
        return colorS
      }else{//塑料
        switch (colornum) {
          case 1:
            colorS = "塑料象牙白";
            break;
          case 2:
            colorS = "塑料炭灰色";
            break;
          case 3:
            colorS = "塑料香槟金";
            break;
          case 4:
            colorS = "塑料深空灰";
            break;
        }
        return colorS
      }
  }
