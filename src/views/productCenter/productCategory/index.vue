<!--
 * @Author: cash
 * @Date: 2021-11-05 15:13:33
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 17:41:16
 * @Description: file content
 * @FilePath: \hdl-try\src\views\productCenter\productCategory\index.vue
-->
<template>
  <div class="layout-wrapper">
    <breadcrumb :list="breadcrumbList"></breadcrumb>
    <div id="components-form-demo-advanced-search" class="content-card">
      <a-button
        type="primary"
        ghost
        html-type="submit"
        @click="showModal"
        class="btn1"
      >
        {{ $t('productCenter.addCategory') }}
      </a-button>
      <div>
        <a-table :columns="columns" :data-source="tableData" :rowKey="record => record.categoryId" :pagination="false"> 
          <template #status={record}>
             <a-switch
              @change="handleCheck(record.categoryId, record.status)"
              :checked="record.status === 1 ? true : false"
            >
            </a-switch>
          </template>
          <template #categoryDesc={text}>{{text || "-"}}</template>
          <template #createTime={record}>{{ handleGetYMD(parseInt(record.createTime)) }}</template>
          <template #action={record}>
            <a-button
              type="primary"
              html-type="submit"
              @click="handleList(record.categoryCode, record.categoryName)"
              class="editBtn ml5"
            >
              <a-icon type="form" />
              {{ $t("productCenter.secondaryClassification") }}
            </a-button>
            <a-button
              type="primary"
              html-type="submit"
              @click="handleEdit(record.categoryId)"
              class="editBtn"
            >
              <a-icon type="form" />
              {{ $t("hdl.edit") }}
            </a-button>
            <a-button
              type="primary"
              html-type="submit"
              class="delBtn"
              @click="remove(record.categoryId)"
            >
              <a-icon type="delete" />
              {{ $t("hdl.delete") }}
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { reactive, toRefs, onMounted } from 'vue';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import columns from './hook/initTable.js';
import { useList } from './hook/productCategory';
import {  getYMD } from '@/utils/util.js'

export default {
  name: '',
  components: {
    SmileOutlined,
    DownOutlined,
  },
  //这里存放数据
  setup(props, { emit }) {
    const data = reactive({
      breadcrumbList: [
        'productCenter.productCenter',
        'productCenter.productCategory',
      ],
    });
    const { list, listByPage } = useList();

    onMounted(() => {
      listByPage({});
    });

    const showModal = () => {};

    const handleGetYMD=(timestamp)=> {
      return getYMD(timestamp)
    };

    return {
      ...toRefs(data),
      ...toRefs(list),
      showModal,
      columns,
      handleGetYMD,
    };
  },
};
</script>

<style lang="less" scoped></style>
