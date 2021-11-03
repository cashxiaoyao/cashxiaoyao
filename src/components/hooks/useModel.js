/*
 * @Author: cash
 * @Date: 2021-09-07 10:59:29
 * @LastEditors: cash
 * @LastEditTime: 2021-11-03 10:28:04
 * @Description: file content
 * @FilePath: \hdl-try\src\components\hooks\useModel.js
 */
import { reactive, onMounted, ref } from 'vue'
import {loginOut, moditifyPsd, roleAuth,systemList} from '@/api/api'

export function useAuth(){
  const state = reactive({
    menuList: [],
    menuList1: []
  })

  const getRoleAuth = async (opt)=>{
    const res = await roleAuth(opt)
    if (res.code === 0) {
      state.menuList = res.data.filter(item => {
        return item.menuCode === 'systemSet'
      })
      state.menuList1 = res.data.filter(item => {
        return item.menuCode === 'message'
      })
    }
  }
  return {state,getRoleAuth}
}

export function useList(){
  const list = reactive({
    systemLists: [],
    sysName: ''
  })

  const getSystemList = async (opt)=> {
    const res = await systemList(opt)
    if (res.code === 0) {
      let arr = []
      if (res.data && res.data.length > 0) {
        res.data.map((item) => {
          if (item.sysCode == 'iot-partner') {
            list.sysName = item.sysName
          }
          if (item.sysCode !== 'iot-partner') {
            arr.push(item)
          }
        })
      }
      list.systemLists = arr
    }
  }
  return {list,getSystemList}
}

export function useUrlParams(){
  const getUrlVars = ()=> {
    let vars = {}
    const parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value
      }
    )
    return vars
  }
  return {getUrlVars}
}