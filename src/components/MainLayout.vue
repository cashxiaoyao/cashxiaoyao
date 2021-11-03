<!--
 * @Author: cash
 * @Date: 2021-08-31 16:31:42
 * @LastEditors: cash
 * @LastEditTime: 2021-09-01 10:43:25
 * @Description: file content
 * @FilePath: \my-vue-app\src\components\MainLayout.vue
-->

<template>
  <!-- <div>{{ message }}</div> -->
  <main-header />
</template>

<script>
import { defineComponent,ref } from 'vue'
import MainHeader from './MainHeader.vue'

export default defineComponent({
  // props: ["selectedKeys", 'openKeys'],
  components:{MainHeader},
  props:{
    selectedKeys:{
      type:Array,
      default:()=>[]
    },
    openKeys:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      message:''
    }
  },
  mounted() {
    this.message = '测试'
  },
})
</script>

<style lang="less" scoped>

</style>
