<template lang="pug">
.container
  el-row
    el-menu(mode="horizontal")
      el-menu-item(index='1')
        | LOGO
      el-menu-item(index='2',@click='gomain')
        | MAIN
      el-menu-item(index='3')
        | THIS
  el-row
    el-card.card
      web-disk
</template>

<script>
export default {
  name: 'disk',
  methods:{
    gomain:function(){
      this.$router.push({path:'/main'});
    }
  }
}
</script>

<style scoped>
.card{
  height:100%;
  margin-left: 15%;
}
</style>