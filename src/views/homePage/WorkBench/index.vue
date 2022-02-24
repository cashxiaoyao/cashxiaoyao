<!--
 * @Author: cash
 * @Date: 2021-11-05 13:50:18
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 15:35:27
 * @Description: file content
 * @FilePath: \hdl-try\src\views\homePage\WorkBench\index.vue
-->
<template>
  <div class="layout-wrapper">
    <breadcrumb :list="breadcrumbList"></breadcrumb>
    <div class="workbench">
      <div class="workbench-content">
        <img src="../../../assets/images/empty-bg.png" class="empty-bg" />
        <div class="text">{{ $t('homePage.noData') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { reactive, toRefs, onMounted } from 'vue';
import { UseCheckoutSysAuth } from './hook/useCheck.js';
export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //这里存放数据
  setup(props, { emit }) {
    const data = reactive({
      breadcrumbList:["homePage.homePage","homePage.workbench"]
    });

    const { checkOutAuth } = UseCheckoutSysAuth();

    onMounted(() => {
      checkOutAuth({
        sysCode: 'iot-aiot',
      });
    });

    return {
      data,
    };
  },
};
</script>

<style lang="less" scoped>
.map-div {
  height: 492px;
}
.workbench {
  background: #fff;
  height: 85vh;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
}
.workbench-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .text {
    text-align: center;
    font-size: 16px;
    color: #666666;
  }
}
.empty-bg {
  width: 225px;
  height: 225px;
}
</style>
