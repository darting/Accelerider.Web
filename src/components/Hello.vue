<template lang="pug">
  .container
    h1 hello
    mu-flat-button(primary href='#/login') {{linkLogin}}
        

</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: "Welcome to combo's Vue.js App",
      linkLogin:"Login!"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
