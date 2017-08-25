<template lang="pug">
el-col
  span 施工重地，闲人免进。
  el-button(type='text',@click='backToHome') 返回
</template>

<script>
export default {
  name: 'webdisk',
  data () {
    return {
    }
  },
  computed:{
  },
  methods:{
    backToHome:function(){
      this.$router.push({path:'/disk'});
    }
  }
}
</script>

<style scoped>
</style>