<!--
 * @Author: cash
 * @Date: 2021-08-30 15:59:35
 * @LastEditors: cash
 * @LastEditTime: 2021-08-31 16:16:56
 * @Description: file content
 * @FilePath: \my-vue-app\src\App.vue
-->
<template>
  <router-view
    v-slot="{ Component }"
    style="height: 100%"
  >
    <keep-alive v-if="$route.meta.keepAlive">
      <component
        :is="Component"
      />
    </keep-alive>
    <component
      :is="Component"
      v-if="!$route.meta.keepAlive"
    />
  </router-view>
</template>
<script>
import { defineComponent,getCurrentInstance } from 'vue'
import { getCookie } from '@/utils/sessionstorge'
export default defineComponent({
  name:"App",
  data(){
    return {}
  },
  mounted(){
    const { proxy } = getCurrentInstance();
    proxy.$i18n.locale = getCookie('language')
  }
})
</script>


<style>
#app {

}
</style>
