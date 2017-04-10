<template lang="pug">
.container
  el-row
    el-col(type='flex',v-bind:md='{span:8,offset:8}',v-bind:lg='{span:8,offset:8}')
      el-card.content
        div.clearfix(slot="header")
         | 登录
        div
          login-form
  el-dialog(v-model='isReg')
    register-form
</template>

<script>
export default {
  name: 'login',
  data(){
    return{
      isReg:false,
    }
  },
  created(){
    this.Bus.$on('loginsuccess',msg=>{
      this.$router.push({path:"/main"});
    });
    this.Bus.$on('registersuccess',msg=>{
      this.isReg = false;
    });
    this.Bus.$on('wantregister',msg=>{
      this.$confirm('你想注册?','提示',{type:'info',
        confirmButtonText: '我想!',
        cancelButtonText: '算了..',})
      .then(()=>{
        this.$msgbox({message:'我不想...',confirmButtonText:'好吧..'});
        //this.isReg = true;
        })
      .catch(()=>{});
    });
  }
}
</script>

<style scoped>
.content{
    text-align:center;
    margin-top: 48px;
    margin-bottom: 48px;
}
</style>