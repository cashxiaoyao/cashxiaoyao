<!--
 * @Author: cash
 * @Date: 2021-09-06 14:42:48
 * @LastEditors: cash
 * @LastEditTime: 2021-09-06 16:55:04
 * @Description: file content
 * @FilePath: \hdl-try\src\components\myForm.vue
-->

<template>
<a-modal
      :title="$t('hdl.update')"
      :visible="visible"
      @ok="handleOk"
      @cancel="$emit('cancel')"
      :cancelText="$t('hdl.cancel')"
      :okText="$t('hdl.confirm')"
    > 
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item :label="$t('homePage.originalPassword')" has-feedback name="loginOldPwd">
        <a-input-password :placeholder="$t('projuct.PleaseEnter')" :max-length="20" v-model:value="form.loginOldPwd"></a-input-password>
      </a-form-item>
      <a-form-item :label="$t('homePage.newPassword')" has-feedback name="loginPwd">
        <a-input-password :placeholder="$t('projuct.PleaseEnter')" :max-length="20" v-model:value="form.loginPwd"></a-input-password>
      </a-form-item>
      <a-form-item :label="$t('homePage.confirmNewPassword')" has-feedback name="confirmLoginPwd">
        <a-input-password :placeholder="$t('projuct.PleaseEnter')" :max-length="20" v-model:value="form.confirmLoginPwd"></a-input-password>
      </a-form-item>
    </a-form>
</a-modal>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {reactive,ref,onMounted,nextTick} from "vue"
import {t} from '@/common/i18n.js'
export default{
  emits:['cancel'],
  props:{
    onSubmit:{
      type:Function,
      default:()=>{}
    },
    visible:{
      type:Boolean,
      default:false
    }
  },
  name:"",
//import引入的组件需要注入到对象中才能使用
  components: {},
//这里存放数据
  setup(props) {
    const formRef = ref()
    const visible = ref(false)
    const form = reactive({
        loginOldPwd:'',
        loginPwd:'',
        confirmLoginPwd:''
    })
    onMounted(()=>{
      visible.value = props.visible
    })
    const onSubmit=()=>{
      props.onSubmit(form)
    }
    nextTick(() => {
      resetForm()
    })
    const resetForm = () => {
      formRef.value.resetFields();
    }
        // 密码验证
    const validatorPsd =(rule, value) =>{
      var re = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/
      if (value && !re.test(value)) {
        return Promise.reject(new Error(t('homePage.PL6_20LettersAndNumbers')))
      } else {
        return Promise.resolve()
      }
    }
    const validatorRePsd =(rule, value, callback)=> {
      let rePsd = formRef.value.getFieldValue('loginPwd')
      if (value && value !== rePsd) {
        return Promise.reject(new Error(t('homePage.passwordInconsistent')))
      } else {
         return Promise.resolve()
      }
    }
    const rules = {
      loginOldPwd:[
          { required: true, message: t('homePage.PLoriginalPassword'), trigger: 'blur' }
        ],
        loginPwd:[
          { required: true, message: t('homePage.PLnewPassword'), trigger: 'blur' },
          {validator: validatorPsd}
        ],
        confirmLoginPwd:[
          { required: true, message: t('homePage.PLnewPasswordAgain'), trigger: 'blur' },
          {validator: validatorRePsd}
        ],
    }
    const handleOk =()=> {
      onSubmit()
    }

    return {
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form,
      rules,
      visible,
      handleOk
    }
  }
}
</script>

<style lang="less" scoped>
</style>

