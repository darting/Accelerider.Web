<template lang="pug">
  .container
    mu-appbar.header(v-bind:title="title")
      mu-flat-button.ret-path(href='#/main',slot='left')
       | RETURN MAIN
      mu-flat-button.go-back(v-on:click='backFileList()',slot="right")
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
          mu-td
           a(v-if='file.isdir == 1')
             a(v-on:click='goFileList(file.path)')
               span {{file.server_filename}}
           div(v-if='file.isdir == 0')
             span {{file.server_filename}}
          mu-td {{transeSize(file)}}
          mu-td {{transeTime(file)}}
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
      title:'网盘',
      curPath:[],
      fileList:[],
      toast:false,
      errMsg:''
    }
  },
  methods:{
    goFileList:function(path){
      let curTitle = `网盘 ${path}`
      let token = sessionStorage.getItem('accessToken');
      let uk = sessionStorage.getItem('accessUk');
      let url=`http://api.pescn.top/filelist`;
      this.$ajax({
        method:'GET',
        url:url,
        params:{
          token:token,
          uk:uk,
          path:encodeURIComponent(path)
        }
      })
      .then(response=>response.data)
      .then(data=>data.list)
      .then(list=>{
        this.title = curTitle;
        this.curPath.push(path);
        this.fileList = list;
        console.log(this.curPath);
      })
      .catch(error=>{
        let edata = error.response.data;
        let errno = edata.errno;
        console.log(edata.message);
      });
    },
    backFileList:function(){
      let pathStack = this.curPath;
      let cur = '/';
      if(pathStack.length != 1){
        pathStack.pop();
        cur = pathStack.pop();
      }
      console.log(cur);
      this.goFileList(cur);
    },
    transeSize:function(file){
      if(file.isdir == 1){
        return '--';
      }else{
        let k = 1024;
        let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let size = file.size;
        let i = Math.floor(Math.log(size) / Math.log(k));
        return `${(size / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
        //return `${(size / Math.pow(k, i)).toPrecision(5)} ${sizes[i]}`;
      }
    },
    transeTime:function(file){
      let mtime = file.server_mtime;
      let newDate = new Date();
      newDate.setTime(mtime * 1000); 
      return newDate.toLocaleString();

    }
  },
  mounted(){
    this.goFileList('/');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-menu {
  display: inline-block;
  margin: 16px;
}
.ret-path.go-back{
  margin:10px;
}
</style>