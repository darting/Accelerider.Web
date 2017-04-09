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
import restAPI from '../libs/restAPI.js';
import Bus from '../libs/eventBus.js';
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
    parseRep:function(data){
      this.loginLoading = false;
      let errno = data.errno;
      if(errno == 0){
        let token = data.token;
        sessionStorage.setItem('accessToken', token);
        Bus.$emit('loginsuccess', 'OK');
      }else{
        this.$message.error(data.message);
      }
    },
    register:function(){
      Bus.$emit('wantregister', 'OK');
    },
    login:function(){
      this.loginLoading = true;
      let api = new restAPI();
	    api.login(this.username, this.pwd,this.parseRep);
    }
  }
}
</script>