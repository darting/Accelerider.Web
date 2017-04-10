<template lang="pug">
.container
  .err-info(v-if='! binding')
   | {{errMsg}}
  .info(v-if='binding')
    user-info
  el-button(@click='loginout()',type='text') 返回登录
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      errMsg:'获取账户列表失败，请先绑定账户!',
      binding:true
    }
  },
  methods:{
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
      this.binding = (msg!=0);
    })
  }
}
</script>