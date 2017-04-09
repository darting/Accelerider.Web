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
import Bus from '../libs/eventBus.js';
const url="/sharefiles";
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
      this.$ajax({
        method:'GET',
        url:url,
        params:{
        "token":this.sharetoken,
        "path":path}
      })
      .then(data=>data.data)
      .then(filelist=>{this.isLoading = false;
        if(filelist.errno == 0)
          {
            Bus.$emit('showfilelist', filelist.list);
          }
      })
    },
    getShare:function(){
      this.isLoading = true;
      this.$ajax({
        method:'GET',
        url:url,
        params:{"shareurl":this.shareurl,"pass":this.pwd}
      })
      .then(response=>response.data)
      .then(data=>data.token)
      .then(token=>{this.sharetoken=token; this.getsharelist('/')})
      .catch(err=>{this.isLoading = false;
        if(err.response){
          const edata = err.response.data;
          this.$message.error(edata.message);
        }else{
          console.log('Error',err.message)
        }
      });
    }
  },
  created(){
    Bus.$on('downfiles',files=>{
      console.log(files);
      this.$message.error('还没有！');
    });
  },
  mounted(){
    Bus.$on('changepath',file=>{
      this.getsharelist(file.path);
    });
  },
}
</script>