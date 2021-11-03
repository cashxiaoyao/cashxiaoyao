<!--
 * @Author: cash
 * @Date: 2021-08-31 16:22:12
 * @LastEditors: cash
 * @LastEditTime: 2021-09-07 09:27:53
 * @Description: file content
 * @FilePath: \hdl-try\src\components\MainHeader copy.vue
-->
<template>
    <div>
    <a-layout-header class="header">
      <div class="header-left">
        <div class="logo">
          <img
            v-if="companyLogo && companyLogo !== 'null'"
            :src="companyLogo"
          />
          <img
            v-if="!companyLogo || companyLogo === 'null'"
            src="@/assets/images/logo-bj.png"
          />
        </div>
         <a-dropdown>
             <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              {{ sysName }}
              <img
                src="@/assets/images/arrow-bottom.png"
                :alt="$t('homePage.defaultAvatar')"
                class="arrow"
              />
            </a>
              <template #overlay>
                <a-menu>
                    <a-menu-item
                      v-for="items in systemLists"
                      :key="items.sysCode"
                      @click="handleSubSystem(items.sysSite)"
                    >
                      <span>{{ items.sysName }}</span>
                    </a-menu-item>
                </a-menu>
              </template>
          </a-dropdown>
      </div>
      <!-- 消息 -->
      <div class="login-out">
        <div class="news-data" v-if="menuList1.length > 0">
          <span class="news-img"></span>
          <a-dropdown>
            <a @click="handleItem(1)" class="ant-dropdown-link"> {{$t('homePage.message')}} </a>
          </a-dropdown>
        </div>
        <div v-if="menuList.length > 0">
          <span
            class="iconfont iconxitongshezhi"
            style="
              fontsize: 18px;
              color: #100A34;
              margin-right: 10px;
              vertical-align: -2px;
            "
          ></span>
          <a-dropdown>
            <a @click="handleItem(2)" class="ant-dropdown-link"> {{$t('homePage.systemSettings')}} </a>
          </a-dropdown>
        </div>

        <span class="headerLine" v-if="menuList.length > 0 || menuList1.length > 0"></span>
        <img
          src="@/assets/images/header-default.png"
          :alt="$t('homePage.defaultAvatar')"
          class="default-header"
        />
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            Hi~{{ account }}
            <img
              src="@/assets/images/arrow-bottom.png"
              :alt="$t('homePage.defaultAvatar')"
              class="arrow"
            />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="handleBasic">
                  <span>{{ $t("homePage.basicData") }}</span>
              </a-menu-item>
              <a-menu-item @click="showModal">
                  <span>{{ $t("hdl.update") }}</span>
              </a-menu-item>
              <a-menu-item @click="() => handleLoginOut()">
                  <span>{{ $t("hdl.quit") }}</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <my-form :onSubmit="onSubmit" v-if="visible" v-model:visible='visible' @cancel="handleCancel" ref="Myref"></my-form>
  </div>
</template>

<script>
import { defineComponent,ref,nextTick  } from 'vue'
import { getCookie, delCookie, setCookie } from '@/utils/sessionstorge'
import {loginOut, moditifyPsd, roleAuth,systemList} from '@/api/api'
import myForm from './myForm.vue'
import {Modal} from 'ant-design-vue'
import {useRouter} from 'vue-router';
export default defineComponent({
  components:{myForm},
  props: {
    selectedKeys:{
      type: String,
      default: ''
    },
    openKeys:{
      type: String,
      default: ''
    }
  },
 data() {
   return {
      visible: false,
      communityLists: [],
      communityCode: '',
      menuList: [],
      menuList1: [],
      companyLogo: decodeURIComponent(getCookie('companyLogo')),
      currentIndex: 0,
      account: getCookie('accountIot'),
      systemUrl: '',
      systemLists: [],
      sysName: ''
   }
 },
  mounted () {
    this.systemUrl =
      import.meta.VITE_NODE_ENV === 'test'
        ? 'http://47.114.131.143:9012/#'
        : import.meta.VITE_NODE_ENV == 'development'
          ? 'http://47.114.117.27:9003/#'
          : import.meta.VITE_NODE_ENV == 'production' ? 'https://iot.hdlcontrol.com/iot-common/#' : 'https://iot-en.hdlcontrol.com/iot-common/#'
    // watermark.set('用户名', getCookie('account'))
    let companyId = getCookie('companyIdIot') || this.getUrlVars()['companyIdIot']
    // this.subSystemInfo({
    //   companyId,
    //   sysCode: 'partner'
    // })
    // this.systemList({
    //   companyId,
    //   sysPlatform: 'iot_saas'
    // })

    // 未登录情况下 - 判断是否中转到公共平台的登录页面
    if (getCookie('accessTokenIot')) {
      // 如果已经登录过了 则什么也不做
    } else {
      // 未登录时 跳转到公共平台的登录页面
      console.log('未登录的情况下跳转到公共平台的登录页面')
      window.location.href = `${this.systemUrl}/login?companyId=1&sysCode=iot-partner`
    }
    const dataList = {
      sysCode: 'iot-common'
    }
    this.roleAuth(dataList)
    this.systemList({
      companyId,
      sysPlatform: 'iot_platform'
    })
    
  },
  methods: {
    // 获取有权限的子系统列表
    async systemList (opt) {
      const res = await systemList(opt)
      if (res.code === 0) {
        let arr = []
        if (res.data && res.data.length > 0) {
          res.data.map((item) => {
            if (item.sysCode == 'iot-partner') {
              this.sysName = item.sysName
            }
            if (item.sysCode !== 'iot-partner') {
              arr.push(item)
            }
          })
        }
        this.systemLists = arr
      }
    },
    // 切换子系统
    handleSubSystem (url) {
      if (url.includes('/iot-common')) {
        setCookie('openKeys', 'systemSet', 'd1')
        setCookie('selectedKeys', '/systemSet/departManage', 'd1')
      } else {
        setCookie('openKeys', 'homePage', 'd1')
        setCookie('selectedKeys', '/homePage/workbench', 'd1')
      }
      window.open(url)
    },
    // 消息中心与系统设置跳转
    handleItem (type) {
      if (type === 1) {
        window.open(`${this.systemUrl}/message/messageList?type=1`)
        setCookie('openKeys', 'message', 'd1')
        setCookie('selectedKeys', '/message/messageList', 'd1')
      } else {
        window.open(`${this.systemUrl}/systemSet/departManage?type=1`)
        setCookie('openKeys', 'systemSet', 'd1')
        setCookie('selectedKeys', '/systemSet/departManage', 'd1')
      }
    },
    getUrlVars () {
      var vars = {}
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value
        }
      )
      return vars
    },
    // 菜单列表
    async roleAuth (opt) {
      const res = await roleAuth(opt)
      if (res.code === 0) {
        this.menuList = res.data.filter(item => {
          return item.menuCode === 'systemSet'
        })
        this.menuList1 = res.data.filter(item => {
          return item.menuCode === 'message'
        })
      }
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    // 退出登录
    handleLoginOut () {
      let _this = this
      Modal.confirm({
        title: _this.$t('homePage.confirmQuitHint'),
        okText: _this.$t('hdl.determine'),
        cancelText: _this.$t('hdl.cancel'),
        onOk () {
          // this.handleOut()
          Message.success(_this.$t('homePage.quitSuccessfully'))
          sessionStorage.removeItem('language')
          // clearAllCookie()
          delCookie('accessTokenIot')
          delCookie('accessToken')
          delCookie('platformName')
          delCookie('companyIdIot')
          delCookie('selectedKeys')
          delCookie('accountIot')
          delCookie('openKeys')
          delCookie('userIdIot')
          delCookie('refreshTokenIot')
          delCookie('expirationIot')
          //  this.systemUrl =
          //   process.env.ENV_CONFIG === "test"
          //     ? "http://47.114.131.143:9009/#"
          //     : process.env.ENV_CONFIG === "dev"
          //     ? "http://47.114.117.27:9003/#"
          //     : "https://smart.hdlcontrol.com/#";
          window.location.href = `${_this.systemUrl}/login?companyId=1&sysCode=iot-partner`
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'test'
      })
    },
    // 退出登录
    async handleOut (opt) {
      const res = await loginOut(opt)
      if (res.code === 0) {
        Message.success(this.$t('homePage.quitSuccessfully'))
        window.location.href = `${this.systemUrl}/login?companyId=1&sysCode=iot-partner`
      }
    },
    // 修改密码
    async moditifyPsd (opt) {
      const res = await moditifyPsd(opt)
      if (res.code === 0) {
        this.visible = false
        Message.success(this.$t('homePage.modifiedSuccessfully'))
        window.location.href = `${this.systemUrl}/login?companyId=1&sysCode=iot-partner`
      }
    },
    // 基础资料
    handleBasic () {
      const router  = useRouter()
      router.push({
        name: 'basicData'
      })
    },
    // 修改密码弹窗显示
    showModal () {
      this.visible = true
      // this.$refs.formRef.resetFields()
      // this.form = {}
    },
    handleCancel () {
      this.visible = false
    },
    onSubmit(data){
       const formData = {
          userId: getCookie('userIdIot'),
          ...data
        }
      this.moditifyPsd(formData)
      this.visible = false
    },
    // handleOk () {
    //   this.form.validateFields((err, values) => {
    //     if (err) {
    //       return false
    //     }
        // const formData = {
        //   userId: getCookie('userIdIot'),
        //   ...values
        // }
    //     console.log(formData, 'formData')
    //     this.moditifyPsd(formData)
    //   })
    // },

  }
})
</script>

<style lang="less">
.ant-layout-header {
  line-height: 32px !important;
}
.header {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1) !important;
  position: fixed;
  z-index: 10;
  width: 100%;
  .arrow {
    width: 10px;
    margin-left: 4px;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .default-header {
    width: 24px;
    margin-right: 10px;
  }
  .ant-dropdown-link {
    color: #222;
  }
  .logo {
    margin-right: 78px;
    img {
      height: 28px;
    }
  }
  .community {
    position: relative;
    margin-right: 64px;
    .search-icon {
      position: absolute;
      top: 0;
      left: 12px;
      z-index: 10;
    }
    .sel-community {
      .ant-select-selection {
        background-color: #f7f9fc;
        border: none;
      }
      .ant-select-selection:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }
  .sub-system-list {
    display: flex;
    .system-item {
      color: #222;
      margin-right: 24px;
      position: relative;
      cursor: pointer;
      .system-lines {
        width: 24px;
        height: 3px;
        background: #762bef;
        position: absolute;
        left: 16px;
        bottom: 2px;
      }
    }
    .system-item-active {
      color: #762bef;
      font-weight: 500;
    }
  }
}
.breadcrumb {
  margin-bottom: 9px;
  .deco {
    width: 8px;
    vertical-align: 1px;
  }
}
.headerLine {
  display: inline-block;
  height: 24px;
  margin-left: 24px;
  margin-right: 24px;
  position: relative;
  width: 1px;
  background: rgb(225, 225, 225);
}
.login-out {
  display: flex;
  align-items: center;
}
.news-data {
  display: flex;
  align-items: center;
  margin-right: 32px;
}
.news-img {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../assets/images/news-img.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
}
.toggle-icon {
  width: 16px;
  height: 16px !important;
  margin-left: 52px;
}
</style>