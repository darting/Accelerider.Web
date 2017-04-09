<template lang="pug">
.disk
  el-breadcrumb(separator=">",v-bind:replace='true')
    el-breadcrumb-item(v-for='p in parseBreadCrumb(curPath)',key = 'p')
      | {{p}}
    | Total: {{filescount}}
  el-button(@click='goMainForm',icon='menu') MAIN
  el-button(type='text',@click='backFileList',icon='arrow-left') BACK
  .disk-table(v-loading="isLoading")
    file-list
</template>

<script>
import Bus from '../libs/eventBus.js';
export default {
  name: 'webdisk',
  data () {
    return {
      filescount:0,
      isLoading:true,
      curPath:[]
    }
  },
  methods:{
    parseBreadCrumb:function(pathStack){
      let path = '全部文件';
      if(pathStack.length > 1){
        path = pathStack[pathStack.length-1];
      }
      path=path.split('/');
      path[0] = '全部文件';
      return path;
    },
    goFileList:function(path){
      let curTitle = `网盘 ${path}`;
      this.downlinks = [];
      this.isLoading = true;
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
      const url='/filelist';
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
        this.curPath.push(path);
        this.filescount = list.length;
        Bus.$emit('showfilelist', list);
        this.isLoading = false;
      })
      .catch(err=>{
        if(err.response){
          const edata = err.response.data;
          console.log(edata.message);
        }else{console.log(err)}
      });
    },
    downfiles:function(files){
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
      const url = '/filelinks';
      const FILESIZE_30M = 30*1024*1024;
      const method = "APPID";// file.size>FILESIZE_30M ? "DEFAULT" : "APPID";
      let file = {
        "path":encodeURIComponent(files.path),
        "id": files.fs_id
      };
      this.$ajax({method:'POST',
        url:url,
        params:{
          token:token,
          uk:uk,
          method:method
        },
        transformRequest:[function(data){
          let ret = '';
          for (let it in data) {ret += `${it}=${data[it]}`}
          return ret;
        }],
        data:{
          "files":`[${JSON.stringify(file)}]`
        }
      })
      .then(response=>response.data)
      .then(data=>{
        Bus.$emit('showdownlinks', data);
      })
      .catch(err=>{
        if(err.response){
          let edata = err.response.data;
          console.log(edata.message);
        }else{console.log(err)}
      });
    },
    goMainForm:function(){
      Bus.$emit('gomain','back');
    },
    backFileList:function(){
      let pathStack = this.curPath;
      let cur = '/';
      if(pathStack.length > 1){
        pathStack.pop();
      }
      cur = pathStack.pop();
      this.goFileList(cur);
    },
  },
  created(){
    Bus.$on('changepath',file=>{
      this.goFileList(file.path);
    });
    Bus.$on('downfiles',files=>{
      this.downfiles(files);
    });
  },
  mounted(){
    this.goFileList('/');
  }
}
</script>