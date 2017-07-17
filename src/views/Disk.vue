<template lang="pug">
.container
  el-row
    el-menu(mode="horizontal")
      el-menu-item(index='1')
        | LOGO
      el-menu-item(index='2', @click='m4s')
        el-col(type='flex')
          span 四酱云
      //- el-menu-item(index='3', @click='square')
      //-   el-col(type='flex')
      //-     span 文件广场
      el-submenu(index='4', v-if='! isbind')
        template(slot='title') 
         | 尚未绑定百度账号
        el-menu-item(index='4-1', @click='binding')
         | 点击绑定!
        el-menu-item(index='4-2', @click='logout')
         | Logout
      el-submenu(index='4',v-if='isbind')
        template(slot='title') 
         | {{userInfo.Name}}
        el-menu-item(index='4-1')
         | 用量:{{percentSize(userInfo.used,userInfo.total)}}
        el-menu-item(index='4-2',@click='changeUser')
         | 更换绑定
        el-menu-item(index='4-3',@click='logout')
         | Logout
  el-row
    el-col(type='flex',v-bind:sm='{span:6}',v-bind:md='{span:6}',v-bind:lg='{span:6}')
      el-card
        div.clearfix(slot="header")
         | 关于坐骑网页版
        div
         | 1.本平台基于百度云，部分文件下载可能限速
        div
         | 2.官方QQ群 553683933
        div
         | 3.给作者来杯咖啡钱，更有动力更新哟~
        div
          img(src='../assets/wechat.png',title='请在新窗口打开以查看大图',alt='微信支付',height=330)
        div
          img(src='../assets/alipay.png',title='请在新窗口打开以查看大图',alt='支付宝支付',height=330)
    el-col(type='flex',v-bind:sm='{span:18}',v-bind:md='{span:18}',v-bind:lg='{span:18}')
      el-card.card
        web-disk
  el-dialog(v-model='bindDlg')
    bind-form
  el-dialog(v-model='ukDlg')
    user-info
</template>

<script>
export default {
  name: 'disk',
  data () {
    return {
      isbind:false,
      userInfo:{},
      bindDlg:false,
      ukDlg:false
    }
  },
  methods:{
    binding:function(){
      this.bindDlg = true;
      // this.$store.dispatch('binding');
      // this.$router.go(0);//refresh
    },
    changeUser:function(){
      this.ukDlg = true;
    },
    m4s:function(){
      this.$message('开发中。。。欢迎提出改进意见~');
    },
    square:function(){
      this.$router.push({path:"/square"});
    },
    getToken:function(){
      return sessionStorage.getItem('accessToken');
    },
    getUserList:function(){
      this.userInfo  = {};
      const token = this.getToken();
	    this.$restAPI.userlist(token)
      .then(reps=>{
        this.infoLoading = false;
        this.isbind = reps.length>0;
        if(this.isbind)
          reps[0].then(data => {
            this.$store.dispatch('BDuser',data.uk);
            this.userInfo=data;})
      })
      .catch((err)=>{
        this.infoLoading = false;
        this.$message.error(err)});
    },
    percentSize:function(a,b){
      return this.utils.percentSize(a,b);
    },
    logout:function(){
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessUk');
      localStorage.removeItem('autologin');
      this.$router.push({path:"/"});
    }
  },
  mounted(){
    this.getUserList();
  }
}
</script>

<style scoped>
.card{
  height:100%;
  /*margin-left: 15%;*/
}
</style>