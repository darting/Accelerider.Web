<template lang="pug">
.container
  el-row
    el-button(@click='backIndex') BACK
    el-button(type='primary',@click='shareurl') GET
  el-row
    el-card.card
      share-list
</template>

<script>
export default {
    name:'share',
    data () {
      return {
      }
    },
    methods:{
      backIndex:function(){
        this.$router.push({path:"/"});
      },
      shareurl:function(){
        // this.Bus.$emit('share_shareurl');
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