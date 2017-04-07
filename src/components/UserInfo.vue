<template lang="pug">
.user-info(v-loading='infoLoading')
  el-table(v-bind:data='userInfos',border)
    el-table-column(prop='Name',label='昵称')
    el-table-column(label='用量(已用/总量)')
      template(scope="scope")
        | {{scope.row.used}}G/{{scope.row.total}}G
    el-table-column(label='操作')
      template(scope="scope")
        el-button.operation-menu(primary,@click="gotoDisk(scope.row.uk)")
          | DISK
</template>

<script>
import Bus from '../libs/eventBus.js';
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
      Bus.$emit('godisk', uk);
    },
    getToken:function(){
      return sessionStorage.getItem('accessToken')
    },
    getUserInfo:function(uk){
      let token = this.getToken();
      let url='/userinfo';
      return this.$ajax({
        method:'GET',url:url,
        params:{token:token, uk:uk} 
        }).then(data=>{
          data = data.data;
          let info = {}
          info.uk = uk;
          info.Name = data.username;
          info.nick_name = data.nick_name;
          info.total = data.total/1024/1024/1024;
          info.free = data.free/1024/1024/1024;
          info.used = data.used/1024/1024/1024;
          info.used = info.used.toFixed(2);
          return info;
        })
    },
    getUserList:function(){
      this.userInfos = [];
      let token = this.getToken();
      let url='/userlist';
      this.$ajax({
        method:'GET',
        url:url,
        params:{token:token}
      })
      .then(response=>{
        let data = response.data;
        let errno = data.errno;
        Bus.$emit('isbinding', data.userlist.length);
        if(data.userlist.length != 0){
          data.userlist.map(item=>{
            item.Name = unescape(item.Name.replace(/\\u/g, "%u"));
            item.Token = this.getToken();
          });
        }
        return data.userlist;
      })
      .then(data=>data.map(item=>this.getUserInfo(item.Uk)))
      .then(reps=>{
        this.infoLoading = false;
        for(let i in reps)
          reps[i].then(data=>{
            this.userInfos.push(data);
          })
      })
      .catch(err=>{
        this.infoLoading = false;
        if(err.response){
          let edata = err.response.data;
          this.$message.error(edata.message);
        }else{console.log(err)}
      });
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