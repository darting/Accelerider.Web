<template lang="pug">
.container
  el-row
    el-col(type='flex',v-bind:sm='{span:10,offset:12}',v-bind:md='{span:8,offset:12}',v-bind:lg='{span:8,offset:12}')
      el-card.login-container
        el-form(v-bind:model='loginForm')
          h3.title 登录坐骑
          el-form-item(prop="account")
            el-input#username(v-model='loginForm.account', placeholder="帐号")
          el-form-item(prop="password")
            el-input#password(type='password',v-model='loginForm.password', placeholder="密码", @keyup.enter.native='login')
          el-form-item
            el-checkbox(label='自动登录', v-model="autologin")
          el-form-item(style='width:100%')
            el-button(type='primary', @click='login', style='width:100%',v-bind:loading='logining')
              | 登录
          el-form-item
            el-button(type='text',@click='register')
              | 没有帐号?注册一个
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      logining:false,
      loginForm: {
        account: '',
        password: ''
      },
      autologin: false,
    }
  },
  methods:{
    register:function(){
      this.$router.push({path:"/signup"});
    },
    login:function(){
      this.logining = true;
	    this.$restAPI.login(this.loginForm.account, this.loginForm.password)
      .then((token)=>{
        if(this.autologin){
          this.$store.dispatch('autologin',{
            username:this.loginForm.account,
            pwd:this.loginForm.password});
        }
        this.logining = false;
        this.$store.dispatch('login',token);
        const q = this.utils.pathmanager().getQuery();
        const redirect = q.redirect || '/disk'
        this.$router.push({path:redirect});
        //
      })
      .catch((err)=>{
        this.logining = false;
        this.$message.error(err.message)
      });
    }
  },
  mounted:function(){
    let a = localStorage.getItem('autologin');
    if(a){
      a = JSON.parse(a);
      this.loginForm.account = a.username;
      this.loginForm.password = a.pwd;
      this.login();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  background-image: url('../../static/background.jpg');
}
.login-container {
  margin-top: 20%;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
