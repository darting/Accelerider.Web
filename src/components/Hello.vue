<template lang="pug">
  .container
    mu-appbar.header(title="欢迎光临！")
    div.content(align='center')
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
.content{
  margin-top:40px;
}
</style>
