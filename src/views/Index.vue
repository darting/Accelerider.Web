<template lang="pug">
.container
  .content(align='center')
    el-button(type='primary',@click='GO') {{linkMsg}}
  .content(align='center')
    el-button(@click='SHARE') SHARE
  el-dialog(v-model='share')
    share-list
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      linkMsg:"通往新世界的大门!",
      share:false
    }
  },
  methods:{
    GO:function(){
      this.$router.push({path:"/main"});
    },
    SHARE:function(){
      this.share = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './css/index.css';
</style>
