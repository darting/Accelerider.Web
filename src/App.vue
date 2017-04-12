<template lang="pug">
  #app
    transition
      router-view
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      version:"2.1.7"
    }
  },
  methods:{
    testFunc:function(){}
  },
  beforeCreate:function(){},//组件实例化之前
  created:function(){},//组件实例化了
  beforeMount:function(){},//组件写入dom结构之前
  mounted:function(){//组件写入dom结构了
    // console.log(this.$children);
    // console.log(this.$refs);
    console.log(`VERSION:${this.version}`);
  },
  beforeUpdate:function(){},//组件更新前
  updated:function(){},//组件更新比如修改了文案
  beforeDestroy:function(){},//组件销毁之前
  destroyed:function(){}//组件已经销毁
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './assets/css/App.css';
</style>
