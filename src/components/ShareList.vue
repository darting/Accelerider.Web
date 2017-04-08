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
  span(v-for='item in sharelist')
    ul
      li {{item.server_filename}}
</template>

<script>
const url="/sharefiles";
export default {
  name: 'sharelist',
  data () {
    return {
      isLoading:false,
      shareurl:'',
      pwd:'',
      sharelist:[]
    }
  },
  methods:{
    getsharelist:function(token,path){
      return this.$ajax({
        method:'GET',
        url:url,
        params:{
        "token":token,
        "path":path}
      }).then(data=>data.data)
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
      .then(token=>this.getsharelist(token,'/'))
      .then(filelist=>{this.isLoading = false;
        if(filelist.errno == 0)
          {
            this.sharelist = filelist.list;
            console.log(filelist.list)
          }
      })
      .catch(err=>{this.isLoading = false;
        if(err.response){
          const edata = err.response.data;
          this.$message.error(edata.message);
        }else{
          console.log('Error',err.message)
        }
      });
    }
  }
}
</script>