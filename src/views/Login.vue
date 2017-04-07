<template lang="pug">
.container
  .content(align='center')
    login-form
    el-dialog(v-model='isReg')
      register-form
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'login',
  data(){
    return{
      isReg:false,
    }
  },
  created(){
    Bus.$on('loginsuccess',msg=>{
      this.$router.push({path:"/main"});
    });
    Bus.$on('registersuccess',msg=>{
      this.isReg = false;
    });
    Bus.$on('wantregister',msg=>{
      this.$confirm('你想注册?','提示',{type:'info'})
      .then(()=>{this.isReg = true;})
      .catch(()=>{});
    });
  }
}
</script>