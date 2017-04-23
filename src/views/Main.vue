<template lang="pug">
.container
  el-card
    div.clearfix(slot="header") 用户列表
    el-row(v-if='! isbind')
      el-col(type='flex')
        span {{errMsg}}
    el-row(v-if='isbind')
      el-col(type='flex')
        user-info
    el-row
      el-button(@click='binding()') 绑定
    el-row
      el-button(@click='loginout()',type='text') 返回登录
    el-dialog(v-model='bindDlg')
      bind-form
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      errMsg:'获取账户列表失败，请先绑定账户!',
      isbind:true,
      bindDlg:false
    }
  },
  methods:{
    binding:function(){
      this.bindDlg = true
    },
    loginout:function(){
      sessionStorage.removeItem('accessToken');
      this.$router.push({path:"/login"});
    }
  },
  created(){
    this.Bus.$on('godisk',uk=>{
      this.$router.push({path:"/disk"});
    });
    this.Bus.$on('isbinding',msg=>{
      this.isbind = (msg!=0);
    });
    this.Bus.$on('bindingsuccess',msg=>{
      this.bindDlg = false;
      this.$router.go(0);//refresh
    });
  }
}
</script>

<style scoped>
span{
  margin-right:10px
}
</style>