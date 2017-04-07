<template lang="pug">
.container
  .content(align='center')
    login-form
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'login',
  created(){
    Bus.$on('loginsuccess',msg=>{
      this.$router.push({path:"/main"});
    });
    Bus.$on('wantregister',msg=>{
      this.$confirm('你想注册?','提示',{type:'info'})
      .then(()=>{})
      .catch(()=>{});
    });
  }
}
</script>