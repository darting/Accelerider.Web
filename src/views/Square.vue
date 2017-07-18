<template lang="pug">
.container
  el-row
    span 开发中
</template>

<script>
export default {
  name: 'square',
  methods:{
    m4s:function(){
      this.$message('开发中。。。欢迎提出改进意见~');
    },
    disk:function(){
      this.$router.push({path:"/disk"});
    },
  }
}
</script>