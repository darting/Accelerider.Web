<template lang="pug">
.user-info(v-loading='infoLoading')
  el-table(v-bind:data='userInfos',border)
    el-table-column(prop='Name',label='昵称')
    el-table-column(label='用量(已用/总量)')
      template(scope="scope")
        | {{transeSize(scope.row.used)}}/{{transeSize(scope.row.total)}}
    el-table-column(label='操作')
      template(scope="scope")
        el-button.operation-menu(@click="gotoDisk(scope.row.uk)")
          | DISK
</template>

<script>
import Utils from '../libs/utils.js';
let utils = new Utils();
export default {
  name: 'userinfo',
  data () {
    return {
      userInfos:[],
      infoLoading:true
    }
  },
  methods:{
    gotoDisk:function(uk){
      let token = this.getToken();
      sessionStorage.setItem('accessUk', uk);
      this.Bus.$emit('godisk', uk);
    },
    getToken:function(){
      return sessionStorage.getItem('accessToken')
    },
    getUserList:function(){
      this.userInfos = [];
      const token = this.getToken();
	    this.$restAPI.userlist(token,
        (data)=>{
          this.infoLoading = false;
          let errno = data.errno;
          if(errno == 0){
            this.Bus.$emit('isbinding', data.userlist.length);
          }else{
            this.$message.error(data.message);
          }
        })
      .then(reps=>{
        for (let i in reps)
          reps[i].then(data => {this.userInfos.push(data);})
      });
    },
    transeSize:function(size){
      return utils.transeSize(size);
    }
  },
  mounted(){
    this.getUserList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './css/userinfo.css';
</style>