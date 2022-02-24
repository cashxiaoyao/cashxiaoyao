/*
 * @Author: cash
 * @Date: 2021-11-05 16:57:14
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 17:34:24
 * @Description: file content
 * @FilePath: \hdl-try\src\views\productCenter\productCategory\hook\productCategory.js
 */
import {
  categoryList
} from '@/api/api';

import { reactive } from 'vue';

export function useList() {
  const list = reactive({
    tableData: [],
  });

  const listByPage = async (opt) => {
    const postRes = await categoryList(opt);
    if (postRes.code === 0) {
      list.tableData = postRes.data;
    }
  };

  return { list, listByPage };
}
