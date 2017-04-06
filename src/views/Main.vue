<template lang="pug">
.container
  .content
    user-info
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'main',
  data () {
    return {
    }
  },
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