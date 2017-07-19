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
      version:"3.1.2"
    }
  },
  computed:{},
  methods:{
    testFunc:function(){}
  },
  beforeCreate:function(){},//组件实例化之前
  created:function(){},//组件实例化了
  beforeMount:function(){},//组件写入dom结构之前
  mounted:function(){//组件写入dom结构了
    console.log(`VERSION:${this.version}`);
  },
  beforeUpdate:function(){},//组件更新前
  updated:function(){},//组件更新比如修改了文案
  beforeDestroy:function(){},//组件销毁之前
  destroyed:function(){}//组件已经销毁
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
#app{
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
	top: 0px;
	bottom: 0px;
  width: 100%;
}
</style>
