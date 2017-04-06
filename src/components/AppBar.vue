<template lang="pug">
mu-appbar.header(v-bind:title="barTitle")
  mu-flat-button.loginout(v-on:click='loginout', slot="right")
    | Loginout
  mu-flat-button.ret-path(href='#/main',slot='left')
    | RETURN MAIN
  mu-flat-button.go-back(v-on:click='backFileList',slot="right")
    | Back
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'myAppBar',
  data () {
    return {
      barTitle:'TITLE'
    }
  },
  methods:{
    loginout:function(){},
    backFileList:function(){}
  },
  created(){
    Bus.$on('action',actFunc=>{
        console.log('test');
        this.loginout = actFunc;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>