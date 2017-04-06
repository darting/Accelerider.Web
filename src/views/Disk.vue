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
    Bus.$on('gopath',path=>{
      let urlpath = `/disk${this.$route.params.path}`;
      this.$router.push({path:urlpath});
    });
  },
  mounted(){
    Bus.$emit('gofilelist', this.$route.params.path);
  }
}
</script>