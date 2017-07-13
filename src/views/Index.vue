<template lang="pug">
.container
  el-row
    el-col(type='flex',v-bind:sm='{span:8,offset:12}',v-bind:md='{span:8,offset:12}',v-bind:lg='{span:8,offset:12}')
      el-card.content
        div.clearfix(slot="header")
         | 登录
        login-form
</template>

<script>
export default {
  name: 'login',
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
    text-align:center;
    margin-top: 20%;
}
</style>
