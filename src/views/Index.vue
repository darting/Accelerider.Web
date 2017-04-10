<template lang="pug">
.container
  el-row
    el-col.content(type='flex',v-bind:md='{span:8,offset:8}',v-bind:lg='{span:8,offset:8}')
      el-button(type='primary',@click='GO') {{linkMsg}}
  el-row
    el-col.content(type='flex',v-bind:md='{span:8,offset:8}',v-bind:lg='{span:8,offset:8}')
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
.content{
    text-align:center;
    margin-top: 48px;
}
</style>
