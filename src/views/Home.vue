<template lang="pug">
el-row.container
    el-col.header(v-bind:span='24')
      el-col.logo(v-bind:span='10') 坐骑WEB
      //- el-col(v-bind:span='10', @click='m4s') 四酱云
      //- el-menu-item(index='3', @click='square')
      //-   el-col(type='flex') 文件广场
      el-col.userinfo(v-bind:span='4')
        .zerouser(v-if='! isbind',@click='binding')
          span 尚未绑定百度账号
        el-dropdown(trigger="hover", v-if='isbind')
          span.el-dropdown-link.userinfo-inner
            img(v-bind:src='userInfo.avatar_url')
            | {{userInfo.Name}}
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item 用量:{{percentSize(userInfo.used,userInfo.total)}}
            el-dropdown-item(@click.native='changeUser') 更换绑定
            el-dropdown-item(divided, @click.native='logout') 退出登录
    el-col.main
      aside
        el-col.adside
          el-card
            div(slot="header") 关于坐骑网页版
            div 关于坐骑网页版
            div 1.本平台基于百度云，部分文件下载可能限速
            div 2.官方QQ群 553683933
            div 3.给作者来杯咖啡钱，更有动力更新哟~
            div
                img(src='../assets/wechat.png',title='请在新窗口打开以查看大图',alt='微信支付',height=330)
            div
                img(src='../assets/alipay.png',title='请在新窗口打开以查看大图',alt='支付宝支付',height=330)
      section.content-container
        .grid-content.bg-purple-light
          el-col.content-wrapper(type='flex', v-bind:span='24')
            el-card
                transition
                    router-view
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
      this.$router.push({path:"/login"});
    }
  },
  mounted(){
    this.getUserList();
  }
}
</script>

<style scoped lang="scss">
$color-primary: #20a0ff;//#18c79c

.container{
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header{
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color:#fff;
    .userinfo {
        text-align: right;
        padding-right: 3%;
        float: right;
        .zerouser{
            cursor: pointer;
            color: #fff;
            height: 40px;
            float: right;
        }
        .userinfo-inner {
            cursor: pointer;
            color: #fff;
            img {
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin: 10px 0px 10px 10px;
                float: right;
            }
        }
    }
    .logo{
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        width:16%;
        img {
            width: 40px;
            float: left;
            margin: 10px 10px 10px 18px;
        }
        .txt {
            color:#fff;
        }
    }
  }
  .main{
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
        width: 24%;
        overflow-y: scroll;
        .adside{
            height: 100%;
        }
    }
    .content-container{
        flex:1;
        overflow-y: scroll;
        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }
  }
}

</style>