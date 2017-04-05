<template lang="pug">
  #app
    //img(src="./assets/logo.png")
    transition
      router-view
</template>

<script>
export default {
  name: 'app'
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
