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
  mounted(){
    Bus.$emit('action', this.logout);    
  }
}
</script>