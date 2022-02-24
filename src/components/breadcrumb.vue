<!--
 * @Author: cash
 * @Date: 2021-11-05 15:29:04
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 15:30:33
 * @Description: file content
 * @FilePath: \hdl-try\src\components\breadcrumb.vue
-->
<template>
  <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in list" :key="index">{{ $t(item) }}</a-breadcrumb-item>
      </a-breadcrumb>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {reactive,toRefs} from "vue"
export default{
  name:"",
//import引入的组件需要注入到对象中才能使用
  props: {
    list:{
      type:Array,
      default:()=>[]
    }
  },
//这里存放数据
  setup(props,{emit}) {
   const data = reactive({

   })
    return {
      data
    }
  }
}
</script>

<style lang="less" scoped>
</style>

