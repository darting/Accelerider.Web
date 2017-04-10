<template lang="pug">
.container
  .content(align='center')
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