<template lang="pug">
.container
  .content(align='center')
    el-button(type='primary',@click='GO') {{linkLogin}}
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      linkLogin:"通往新世界的大门!"
    }
  },
  methods:{
    GO:function(){
      this.$router.push({path:"/main"});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './css/index.css';
</style>
