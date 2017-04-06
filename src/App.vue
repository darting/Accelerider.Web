<template lang="pug">
  #app
    transition
      router-view
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg:"TEST"
    }
  },
  methods:{
    testFunc:function(){}
  },
  created(){},
  mounted(){}
}
</script>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
