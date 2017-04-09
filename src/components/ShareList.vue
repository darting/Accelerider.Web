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
    file-list
</template>

<script>
import shareAPI from '../libs/shareAPI.js';
import Bus from '../libs/eventBus.js';
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
      let api = new shareAPI();
      api.getsharelist(this.sharetoken,path)
      .then(filelist=>{
        this.isLoading = false;
        if(filelist.errno == 0)
        {
          Bus.$emit('showfilelist', filelist.list);
        }
      })
    },
    getShare:function(){
      this.isLoading = true;
      let api = new shareAPI();
      api.getshare(this.shareurl,this.pwd,(data)=>{
        this.isLoading = false;
        this.$message.error(data.message);
      })
      .then(token=>{this.sharetoken=token; this.getsharelist('/')});
    }
  },
  mounted(){
    // Bus.$on('downfiles',files=>{
    //   this.$message.error('还没有！');
    // });
    Bus.$on('changepath',file=>{
      this.getsharelist(file.path);
    });
  },
}
</script>