<template lang="pug">
el-form.login-form
  el-form-item(label='username')
    el-input#username(v-model='username')
  el-form-item(label='password')
    el-input#password(type='password',v-model='pwd')
  el-form-item
    el-button(type='primary', @click='login',v-loading.fullscreen.lock='loginLoading')
      | {{sumitstr}}
    el-button(type='text',@click='register')
      | {{registerstr}}
</template>

<script>
export default {
  name: 'loginform',
  data () {
    return {
      sumitstr:'LOGIN!',
      registerstr: 'REGISTER',
      username:'',
      pwd:'',
      loginLoading:false
    }
  },
  methods:{
    register:function(){
      this.Bus.$emit('wantregister', 'OK');
    },
    login:function(){
      this.loginLoading = true;
	    this.$restAPI.login(this.username, this.pwd)
      .then((token)=>{
        this.loginLoading = false;
        sessionStorage.setItem('accessToken', token);
        this.Bus.$emit('loginsuccess', 'OK');
      })
      .catch((msg)=>{
        this.loginLoading = false;
        this.$message.error(msg)});
    }
  }
}
</script>