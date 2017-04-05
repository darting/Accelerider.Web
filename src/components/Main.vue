<template lang="pug">
  .container
    mu-appbar.header(v-bind:title="msg")
      mu-flat-button.loginout(v-on:click='loginout', slot="right")
       | Loginout
    user-info
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      msg:'Welcome to CatDisk!',
    }
  },
  methods:{
    loginout:function(){
      sessionStorage.removeItem('accessToken');
      this.$router.push({path:"/"});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginout{
  margin:10px;
}
</style>