<template lang="pug">
.container
  el-row
    el-menu(mode="horizontal")
      el-menu-item(index='1')
        | LOGO
      el-menu-item(index='2', @click='m4s')
        el-col(type='flex')
          span 四酱云
      el-menu-item(index='3', @click='disk')
        el-col(type='flex')
          span 网盘
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