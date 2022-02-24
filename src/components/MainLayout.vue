<!--
 * @Author: cash
 * @Date: 2021-08-31 16:31:42
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 15:45:36
 * @Description: file content
 * @FilePath: \hdl-try\src\components\MainLayout.vue
-->

<template>
  <!-- <main-header /> -->
  <a-config-provider
    :locale="
      getCookie('language') === 'zh'
        ? Object.assign(zhOption, zhCN)
        : Object.assign(enOption, enGB)
    "
  >
    <a-layout id="components-layout-demo-custom-trigger">
      <main-header />
      <a-layout>
        <a-layout-sider theme="light" width="184">
          <a-menu
            mode="inline"
            :open-keys="openKeys"
            @openChange="onOpenChange"
            :selected-keys="selectedKeys"
          >
            <a-sub-menu v-for="item in menuList" :key="item.menuCode">
              <template #title :title="item.menuName">
                <i class="iconfont" :class="item.menuIcon" style="font-size:16px;"></i>
                <span>{{ item.menuName }}</span>
              </template>
              <a-menu-item
                v-for="items in item.children"
                :key="items.menuUrl"
                :title="items.menuName"
                @click="handleClick(items)"
              >
                {{ items.menuName }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content class="layout-content">
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onMounted, watch } from 'vue';
import MainHeader from './MainHeader.vue';
import MainSider from './MainSider.vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhOption from '@/common/lang/zh';
import enOption from '@/common/lang/en';
import { getCookie, delCookie, setCookie } from '@/utils/sessionstorge';
import supportImg from '@/assets/images/support-dis.png';
import { useAuth } from './hooks/useModel';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { MainHeader, MainSider },
  props: {
    selectedKeys: {
      type: Array,
      default: () => [],
    },
    openKeys: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const data = reactive({
      // locale: getCookie('language') === 'zh' ? zhCN : enUS,
      locale: '',
      openKeys: [getCookie('openKeys') || 'item_0'],
      newsFlag: true,
      rootSubmenuKeys: [
        'homePage',
        'basicFile',
        'AIMonitor',
        'propertyCharges',
        'propertyService',
        'workOrder',
      ],
      selectedKeys: getCookie('selectedKeys')
        ? [getCookie('selectedKeys')]
        : ['/message/messageList'],
      // menuList: [],
      imgUrl: supportImg,
    });

    const { state, getRoleAuth } = useAuth();
    const router = useRouter();

    onMounted(() => {
      const dataList = {
        sysCode: 'iot-aiot',
      };
      getRoleAuth(dataList);
    });

    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(
        (key) => data.openKeys.indexOf(key) === -1
      );
      setCookie('openKeys', latestOpenKey, 'd1');
      if (data.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        data.openKeys = openKeys;
      } else {
        data.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    const changeOpenKeys = () => {
      setCookie('openKeys', 'basicFile', 'd1');
      setCookie('selectedKeys', '/homePage/workbench', 'd1');
      data.openKeys = ['basicFile'];
      data.selectedKeys = ['/homePage/workbench'];
    };

    const handleClick = (items) => {
      // console.log(items);
      const {
        currentRoute: { value },
      } = router;
      if (items.menuUrl !== value.path) {
        setCookie('selectedKeys', items.menuUrl, 'd1');
        data.selectedKeys = [items.menuUrl];
        router.push({
          path: items.menuUrl,
        });
      }
    };

    return {
      ...toRefs(data),
      ...toRefs(state),
      onOpenChange,
      changeOpenKeys,
      handleClick,
      zhCN,
      enUS,
      zhOption,
      enOption,
      getCookie,
    };
  },
});
</script>

<style lang="less" scope>
#components-layout-demo-custom-trigger {
  .ant-menu-item {
    padding-left: 64px !important;
  }
  .ant-menu:not(.ant-menu-horizontal) {
    .ant-menu-item-selected {
      background-color: #fff5f1;
    }
  }
  .ant-layout-sider-light {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  .ant-menu-submenu:first-child .ant-menu-submenu-title {
    margin-top: 24px;
  }
  .ant-layout {
    background-color: #f7f9fc;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }

  .layout-content {
    // margin: 9px 24px 24px 24px;
    // padding: 9px 20px 20px 20px;
    min-height: 94vh;
    // background: #fff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    .support {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 28px;
      cursor: pointer;
      z-index: 10;
    }
  }
  .layout-wrapper {
    padding: 9px 20px 20px 20px;
  }
  .news-box {
    background: #fff5f1;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }
  .news-content {
    color: #666666;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 8px 0;
    display: inline-block;
  }
  .news-color {
    color: #f35c1d;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    padding: 8px 0 8px 16px;
    display: inline-block;
  }
  .news-del {
    width: 12px;
    height: 12px;
    position: absolute;
    right: 20px;
  }
  .iconfont {
    margin-right: 10px;
  }
}
</style>
