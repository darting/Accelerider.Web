<template lang="pug">
.user-info
  .err-info(v-if='userInfos.length==0')
   | {{errMsg}}
  .info(v-if='userInfos.length!=0')
    mu-table(v-bind:showCheckbox='false')
      mu-thead
        mu-tr
          mu-th 昵称
          mu-th 用量(已用/总量)
          mu-th 操作
      mu-tbody
        mu-tr(v-for='user in userInfos' key='user.Name')
          mu-td {{user.Name}}
          mu-td {{user.used}}G/{{user.total}}G
          mu-flat-button.operation-menu(primary,v-on:click="gotoDisk(user.uk)")
           | DISK
</template>

<script>
export default {
  name: 'userinfo',
  data () {
    return {
      errMsg:'',
      userInfos:[],
    }
  },
  methods:{
    gotoDisk:function(uk){
      let token = this.getToken();
      sessionStorage.setItem('accessUk', uk);
      this.$router.push({path:"/disk"});
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
        if(errno == 0){
          data.userlist.map(item=>{
            item.Name = unescape(item.Name.replace(/\\u/g, "%u"));
            item.Token = this.getToken();
          });
        }else{
          this.errMsg = '获取账户列表失败，请先绑定账户';
          console.log(data.message);
        }
        return data.userlist;
      })
      .then(data=>{
        let promiss = [];
        data.map(item=>{
          let r = this.getUserInfo(item.Uk);
          promiss.push(r)
        });
        return promiss;
      })
      .then(reps=>{
        for(let i in reps)
        reps[i].then(data=>{
          this.userInfos.push(data);
        })
      })
      .catch(err=>{
        console.log('Error',err.message);
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
.operation-menu{
  margin:10px;
}
</style>