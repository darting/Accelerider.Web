<template lang="pug">
.container
  .content
    web-disk
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'disk',
  created(){
    Bus.$on('gomain',msg=>{
      this.$router.push({path:'/main'});
    });
  }
}
</script>