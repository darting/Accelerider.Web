<template lang="pug">
el-form.register-form(label='注册',v-loading='regLoading')
  el-form-item(label='username')
    el-input#username(v-model='username')
  el-form-item(label='password')
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
        this.Bus.$emit('registersuccess', 'OK');
      })
      .catch((msg)=>{
        this.regLoading = false;
        this.$message.error(msg)});
    }
  }
}
</script>