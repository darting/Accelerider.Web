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
    })
  }
}
</script>