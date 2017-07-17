<template lang="pug">
el-form.login-form(label='登录',v-loading='loginLoading')
  el-form-item(label='用户名')
    el-input#username(v-model='username')
  el-form-item(label='密码')
    el-input#password(type='password',v-model='pwd',@keyup.enter.native='login')
  el-form-item
    //- el-checkbox(label='记住密码')
    el-checkbox(label='下次自动登录', v-model="autologin")
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
      autologin: false,
      loginLoading:false
    }
  },
  methods:{
    register:function(){
      // this.$msgbox({message:'暂未开放',confirmButtonText:'好吧..'});
      this.$router.push({path:"/reg"});
    },
    login:function(){
      this.loginLoading = true;
	    this.$restAPI.login(this.username, this.pwd)
      .then((token)=>{
        if(this.autologin){
          this.$store.dispatch('autologin',{
            username:this.username,
            pwd:this.pwd});
        }
        this.loginLoading = false;
        this.$store.dispatch('login',token);
        this.$router.push({path:"/disk"});
      })
      .catch((err)=>{
        this.loginLoading = false;
        this.$message.error(err.message)
      });
    }
  },
    mounted:function(){
    let a = localStorage.getItem('autologin');
    if(a){
      a = JSON.parse(a);
      this.username = a.username;
      this.pwd = a.pwd;
      this.login();
    }
  },
}
</script>