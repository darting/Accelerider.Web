<template lang="pug">
el-row.container
    el-col.header(v-bind:span='24')
      el-col.logo(v-bind:span='10')
        //- img(src='static/logo.png')
        span 坐骑WEB
      //- el-col(v-bind:span='6')
      //-   el-button.zerouser(@click='m4s') 四酱云
      //-   el-button.zerouser(@click='disk') 网盘
      el-col.userinfo(v-bind:span='4')
        el-button.zerouser(v-if='!isbind',@click='binding') 尚未绑定百度账号
        el-dropdown(trigger="hover", v-if='isbind')
          span.el-dropdown-link.userinfo-inner
            img(v-bind:src='userInfo.avatar_url')
            | {{userInfo.Name}}
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item 用量:{{percentSize(userInfo.used,userInfo.total)}}
            el-dropdown-item(@click.native='changeUser') 切换帐号
            el-dropdown-item(divided, @click.native='logout') 退出登录
    el-col.main
      aside
        el-col.adside
          el-card
            div(slot="header") 关于坐骑网页版
            div 1.本平台基于百度云，部分文件下载可能限速
            div 2.官方QQ群 553683933
            div 3.给作者来杯咖啡钱，更有动力更新哟~
            div
                img(src='../assets/wechat.png',title='请在新窗口打开以查看大图',alt='微信支付',height=300)
            div
                img(src='../assets/alipay.png',title='请在新窗口打开以查看大图',alt='支付宝支付',height=300)
      section.content-container
        .content-wrapper(type='flex', v-bind:span='24')
          el-card
              transition
                  router-view
    el-dialog(v-model='bindDlg')
      bind-form
    el-dialog(v-model='ukDlg')
      user-info
      el-button(type='text',@click='binding') 新增绑定
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'disk',
  data () {
    return {
      isbind:false,
      bindDlg:false,
      ukDlg:false
    }
  },
  computed:{
    ...mapGetters ({
      uk:'uk',
      userInfo:'userInfo',
    })
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
      this.$router.push({path:"/disk/m4s"});
    },
    disk:function(){
      this.$router.push({path:"/disk/home"});
    }, 
    getToken:function(){
      return sessionStorage.getItem('accessToken');
    },
    getUserList:function(){
      const token = this.getToken();
      this.$restAPI.userlist(token)
      .then(reps=>{
        this.infoLoading = false;
        this.isbind = reps.length>0;
        if(this.isbind)
          reps[0].then(data => {
            this.$store.dispatch('BDuser',data.uk);
            })
      })
      .catch((err)=>{
        this.infoLoading = false;
        this.$message.error(err)});
    },
    getUserInfo:function(){
      this.ukDlg = false;
      const token = this.getToken();
      this.$restAPI._userinfo(token,this.uk)
      .then(info=>{
        this.$store.dispatch('BDuserInfo',info);
      });
    },
    percentSize:function(a,b){
      return this.utils.percentSize(a,b);
    },
    logout:function(){
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('autologin');
        this.$router.push({path:"/login"});
      }).catch(() => {
      });
    }
  },
  watch: {
    uk(){
      this.getUserInfo();
    },
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
            color: #fff;
            height: 40px;
            margin: 10px;
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
        width:25%;
        img {
            width: 40px;
            float: left;
            margin: 10px 10px 10px 18px;
        }
    }
  }
  .main{
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    aside {
        width: 24%;
        overflow-y: scroll;
        .adside{
            height: 100%;
        }
    }
    .content-container{
        flex:1;
        height: 100%;
        overflow: auto;
        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }
  }
}

</style>