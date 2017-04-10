<template lang="pug">
.container
  .content
    web-disk
</template>

<script>
export default {
  name: 'disk',
  created(){
    this.Bus.$on('gomain',msg=>{
      this.$router.push({path:'/main'});
    });
  }
}
</script>