<template lang="pug">
el-form.login-form(label='登录',v-loading='loginLoading')
  el-form-item(label='用户名')
    el-input#username(v-model='username')
  el-form-item(label='密码')
    el-input#password(type='password',v-model='pwd')
  el-form-item
    el-button(type='primary', @click='login')
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
      this.$msgbox({message:'暂未开放',confirmButtonText:'好吧..'});
      // this.$router.push({path:"/reg"});
    },
    login:function(){
      this.loginLoading = true;
	    this.$restAPI.login(this.username, this.pwd)
      .then((token)=>{
        this.loginLoading = false;
        this.$store.dispatch('login',token);
        this.$router.push({path:"/disk"});
      })
      .catch((err)=>{
        this.loginLoading = false;
        this.$message.error(err.message)
      });
    }
  }
}
</script>