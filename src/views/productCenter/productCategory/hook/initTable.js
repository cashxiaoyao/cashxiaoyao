/*
 * @Author: cash
 * @Date: 2021-11-05 17:07:07
 * @LastEditors: cash
 * @LastEditTime: 2021-11-05 17:08:18
 * @Description: file content
 * @FilePath: \hdl-try\src\views\productCenter\productCategory\hook\initTable.js
 */
import {t} from "@/common/i18n.js";


const columns = [
  {
   title: t('productCenter.sortingCode'),
   // title: '分类编码',
   dataIndex: 'categoryCode',
   key: 'categoryCode',
   slots: { customRender: 'noData' }
 },
 {
   // title: '分类名称',
   title: t('productCenter.listsortname'),
   dataIndex: 'categoryName',
   key: 'categoryName',
   slots: { customRender: 'noData' }
 },
 {
   // title: '启用禁用',
   title: t('productCenter.enableDisable'),
   key: 'status',
   dataIndex: 'status',
   slots: { customRender: 'status' }
 },
 {
   // title: '排序',
   title: t('productCenter.rank'),
   key: 'sort',
   dataIndex: 'sort',
   slots: { customRender: 'noData' }
 },
 {
   // title: '描述',
   title: t('projuct.houseDesc'),
   key: 'categoryDesc',
   dataIndex: 'categoryDesc',
   slots: { customRender: 'categoryDesc' }
 },
 {
   // title: '创建时间',
   title: t('productCenter.creationTime'),
   key: 'createTime',
   dataIndex: 'createTime',
   slots: { customRender: 'createTime' }
 },
 {
   // title: '操作',
   title: t('hdl.operation'),
   dataIndex: 'action',
   key: 'action',
   slots: { customRender: 'action' }
 }
];

export default columns