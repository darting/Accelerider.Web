<template lang="pug">
.container
  .content
    user-info
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'main',
  methods:{
    loginout:function(){
      sessionStorage.removeItem('accessToken');
      this.$router.push({path:"/"});
    }
  },
  created(){
    Bus.$on('godisk',uk=>{
      this.$router.push({path:"/disk"});
    })
  }
}
</script>