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
    parseRep:function(response){
      this.loginLoading = false;
      let data = response.data;
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
	    const url="/login";
      this.$ajax({
        method:'POST',
        url:url,
        params:{"security":"express"},
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
          }
          return ret
        }],
        data:{
          "name":encodeURIComponent(this.username),
          "password":this.pwd
          }
      })
      .then(response=>this.parseRep(response))
      .catch(err=>{
        if(err.response){
          let eresponse = err.response;
          this.parseRep(eresponse);
        }else{
          console.log('Error',err.message)
        }
      });
    }
  }
}
</script>