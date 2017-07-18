<template lang="pug">
.container
  el-row
    el-col(type='flex',v-bind:sm='{span:10,offset:12}',v-bind:md='{span:8,offset:12}',v-bind:lg='{span:8,offset:12}')
      el-card.signup-container
        el-form(v-bind:model='signupForm')
          h3.title 注册坐骑
          el-form-item(prop="account")
            el-input#username(v-model='signupForm.account', placeholder="帐号")
          el-form-item(prop="password")
            el-input#password(type='password',v-model='signupForm.password', placeholder="密码")
          el-form-item
            el-button(type='primary', @click='register', style='width:100%', v-bind:loading='regLoading')
              | 注册帐号
          el-form-item
            el-button(type='text',@click='login')
              | 已有帐号?去登陆
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      regLoading:false,
      signupForm: {
        account: '',
        password: ''
      },
    }
  },
  methods:{
    login:function(){
      this.$router.push({path:"/login"});
    },
    register:function(){
      this.regLoading = true;
	    this.$restAPI.signup(this.signupForm.account, this.signupForm.password)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  background-image: url('../../static/background.jpg');
}
.signup-container {
  margin-top: 20%;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>