<template lang="pug">
.sharelist(v-loading='isLoading')
  .content(align='center')
    el-form.sharelist(v-loading='infoLoading')
      el-form-item(label='分享链接')
        el-input#shareurl(v-model='shareurl')
      el-form-item(label='密码(没有就不填)')
        el-input#password(v-model='pwd')
      el-form-item
        el-button(type='primary',@click='getShare') GET
  .disk-table
    file-list(pre_='share_')
</template>

<script>
export default {
  name: 'sharelist',
  data () {
    return {
      isLoading:false,
      shareurl:'',
      pwd:'',
      sharetoken:''
    }
  },
  methods:{
    getsharelist:function(path){
      this.$shareAPI.getsharelist(this.sharetoken,path,(data)=>{
        this.isLoading = false;
        this.$message.error(data.message);
      })
      .then(filelist=>{
        this.isLoading = false;
        if(filelist.errno == 0)
        {
          this.Bus.$emit('share_showfilelist', filelist.list);
        }
      })
    },
    getShare:function(){
      this.isLoading = true;
      this.$shareAPI.getshare(this.shareurl,this.pwd,(data)=>{
        this.isLoading = false;
        this.$message.error(data.message);
      })
      .then(token=>{this.sharetoken=token; this.getsharelist('/')});
    }
  },
  mounted(){
    this.Bus.$on('share_downfiles',files=>{
      this.$message.error('还没有！');
    });
    this.Bus.$on('share_changepath',file=>{
      this.getsharelist(file.path);
    });
  },
}
</script>