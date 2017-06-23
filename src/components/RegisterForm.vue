<template lang="pug">
el-form.register-form(label='注册',v-loading='regLoading')
  el-form-item(label='用户名')
    el-input#username(v-model='username')
  el-form-item(label='密码')
    el-input#password(type='password',v-model='pwd')
  el-form-item
    el-button(type='primary', @click='register')
      | {{sumitstr}}
</template>

<script>
export default {
  name: 'registerform',
  data () {
    return {
      sumitstr:'REGISTER!',
      username:'',
      pwd:'',
      regLoading:false
    }
  },
  methods:{
    register:function(){
      this.regLoading = true;
	    this.$restAPI.signup(this.username, this.pwd)
      .then((rlt)=>{
        this.regLoading = false;
        this.$message(rlt);
      })
      .catch((err)=>{
        this.regLoading = false;
        this.$message.error(err.message)});
    }
  }
}
</script>