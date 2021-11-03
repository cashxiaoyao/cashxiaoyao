/*
 * @Author: cash
 * @Date: 2021-08-31 15:19:37
 * @LastEditors: cash
 * @LastEditTime: 2021-08-31 15:20:59
 * @Description: file content
 * @FilePath: \my-vue-app\src\store\index.js
 */
import { createStore } from "vuex";

const store = createStore({
  state:{
    defaultCommunityCode: ''
  },
  mutations:{
    changeCommunityCode (state, payload) {
      state.defaultCommunityCode = payload.name
    }
  },
  actions:{},
  getters:{}
})

export default store