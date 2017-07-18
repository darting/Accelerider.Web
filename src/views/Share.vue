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
    methods:{
      backIndex:function(){
        this.$router.push({path:"/"});
      },
      shareurl:function(){
      }
    }
}
</script>

<style scoped>
.card{
  height:100%;
}
</style>