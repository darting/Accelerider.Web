<template lang="pug">
.container
  el-row
    el-col(type='flex',v-bind:sm='{span:8,offset:12}',v-bind:md='{span:8,offset:12}',v-bind:lg='{span:8,offset:12}')
      el-card.content
        div.clearfix(slot="header")
         | 注册
        register-form
</template>

<script>
export default {
  name: 'reg',
  methods:{
  }
}
</script>

<style scoped>
.content{
    text-align:center;
    margin-top: 20%;
}
</style>