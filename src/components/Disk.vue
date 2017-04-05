<template lang="pug">
  .container
    mu-appbar.header(title="网盘")
      mu-flat-button.go-back(href='#/main', slot="right")
       | Back
    //mu-linear-progress
    mu-table(showCheckbox=false)
      mu-thead
        mu-tr
          mu-th 文件名
          mu-th 大小
          mu-th 修改日期
          mu-th 操作
      mu-tbody
        mu-tr(v-for="file in fileList" key='file.fs_id')
          mu-td {{file.server_filename}}
          mu-td {{transeSize(file)}}
          mu-td {{file.server_mtime}}
          mu-flat-button.demo-menu
            mu-icon-menu(icon='more')
              mu-menu-item(title='下载')
              mu-menu-item(title='属性')
    mu-toast(v-if="toast" v-bind:message="errMsg")
</template>

<script>
export default {
  name: 'userinfo',
  data () {
    return {
      fileList:[],
      toast:false,
      errMsg:''
    }
  },
  methods:{
    getFileList:function(){
      let token = sessionStorage.getItem('accessToken');
      let uk = sessionStorage.getItem('accessUk');
      let url=`http://api.pescn.top/filelist`;
      this.$ajax({
        method:'GET',
        url:url,
        params:{
          token:token,
          uk:uk,
          path:'/'
        }
      })
      .then(response=>response.data)
      .then(data=>data.list)
      .then(list=>{
        this.fileList = list;
      })
      .catch(error=>console.log(err));
    },
    transeSize:function(file){
      if(file.isdir == 1){
      return '--';
      }else{
       let size = file.size/1024/1024;
       return size.toFixed(2) + 'MB';
      }
    }
  },
  mounted(){
    this.getFileList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-menu {
  display: inline-block;
  margin: 16px;
}
.go-back{
  margin:10px;
}
</style>