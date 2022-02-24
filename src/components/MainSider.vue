<!--
 * @Author: cash
 * @Date: 2021-11-04 16:18:36
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 09:42:07
 * @Description: file content
 * @FilePath: \hdl-try\src\components\MainSider.vue
-->
<template>
  <a-menu
    mode="inline"
    :open-keys="openKeys"
    @openChange="$emit('onOpenChange')"
    @click="$emit('handleClick')"
    :selected-keys="selectedKeys"
  >
    <a-sub-menu v-for="item in menuList" :key="item.menuCode">
      <template #title :title="item.menuName">
        <icon-font :type="item.menuIcon" style="font-size: 16px" />
        <span>{{ item.menuName }}</span>
      </template>
      <a-menu-item
        v-for="items in item.children"
        :key="items.menuUrl"
        :title="items.menuName"
      >
        {{ items.menuName }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { reactive, toRefs } from 'vue';
export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    menuList:{
      type:Array,
      default:()=>[]
    },
    selectedKeys:{
      type:Array,
      default:()=>[]
    },
  },
  //这里存放数据
  setup(props, { emit }) {
    console.log(props);
  },
};
</script>

<style lang="less" scoped></style>
