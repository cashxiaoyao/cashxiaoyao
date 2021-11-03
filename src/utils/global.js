import i18n from '../main.js'
const global = {
  Protocol: [{
    name: 'BUSPRO',
    minname: 'Buspro',
    num: 0
  }, {
    name: 'KNX',
    minname: 'KNX',
    num: 1
  }, {
    name: 'ZIGBEE',
    minname: 'Zigbee',
    num: 2
  }],
  DebugState: [{
    name: i18n.$t('projuct.To_Be_Debugged'), // "待调试"
    value: 'To_Be_Debugged',
    num: 0
  }, {
    name: i18n.$t('projuct.Debugging'), // "调试中"
    value: 'Debugging',
    num: 1
  }, {
    name: i18n.$t('projuct.To_Be_Accepted'), // "待验收"
    value: 'To_Be_Accepted',
    num: 2
  }, {
    name: i18n.$t('projuct.Completed'), // "已完成"
    value: 'Completed',
    num: 3
  }, {
    name: i18n.$t('projuct.Delivered'), // "已交付"
    value: 'Delivered',
    num: 4
  }],
  CarDataList: [{
    name: i18n.$t('projuct.projuctTotal') + i18n.$t('projuct.ge'), // '项目总数（个）'
    imgUrl: require('@/assets/images/projuct-total.png'),
    attribute: 'projectTotal',
    number: '0'
  },
  {
    name: i18n.$t('projuct.To_Be_Debugged') + i18n.$t('projuct.ge'), // '待调试（个）'
    imgUrl: require('@/assets/images/projuct-to_debug.png'),
    attribute: 'projectToDebug',
    number: '0'
  },
  {
    name: i18n.$t('projuct.Debugging') + i18n.$t('projuct.ge'), // '调试中（个）
    imgUrl: require('@/assets/images/projuct-debugging.png'),
    attribute: 'projectDebugging',
    number: '0'
  },
  {
    name: i18n.$t('projuct.To_Be_Accepted') + i18n.$t('projuct.ge'), // '待验收（个）'
    imgUrl: require('@/assets/images/projuct-for_acceptance.png'),
    attribute: 'projectToCheck',
    number: '0'
  },
  {
    name: i18n.$t('projuct.Completed') + i18n.$t('projuct.ge'), // '已完成（个）'
    imgUrl: require('@/assets/images/projuct-completed.png'),
    attribute: 'projectFinished',
    number: '0'
  },
  {
    name: i18n.$t('projuct.Delivered') + i18n.$t('projuct.ge'), // '已交付（个）'
    imgUrl: require('@/assets/images/projuct-delivered.png'),
    attribute: 'projectPaid',
    number: '0'
  }
  ],
  changeTime (type, times) {
    if (type === 'localTime') { // 时间戳转本地时间
      return new Date(times).toLocaleDateString()
    } else if (type === 'timeStamp') { // 本地时间转时间戳
      return new Date(times).getTime()
    }
  },
  getBase64Image (url, callback) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let img = new Image()
    // 为了解决跨域，可以直接img.crossOrigin=''就能解决图片跨域问题
    img.crossOrigin = 'anonymous'
    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      let dataURL = canvas.toDataURL('image/png')
      callback.call(this, dataURL)
      canvas = null
    }
    img.src = url
  },
  downloadByBlob (url, name) {
    let image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
    image.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height)
      canvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob)
        this.download(url, name)
        // 用完释放URL对象
        URL.revokeObjectURL(url)
      })
    }
  },
  download (href, name) {
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.href = href
    eleLink.click()
    eleLink.remove()
  },
  // 思路是：判定要克隆的对象是不是引用类型，如果是引用类型，则继续迭代,如果该项是基本类型，则直接复制。
  deepClone (obj) {
    let newObj = Array.isArray(obj) ? [] : {}

    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = (obj && typeof obj[key] === 'object') ? this.deepClone(obj[key]) : obj[key]
        }
      }
    }
    return newObj
  }
}

export default global
