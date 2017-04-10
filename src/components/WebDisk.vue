<template lang="pug">
.disk
  el-breadcrumb(separator=">",v-bind:replace='true')
    el-breadcrumb-item(v-for='p in parseBreadCrumb(curPath)',key = 'p')
      | {{p}}
    | Total: {{filescount}}
  el-button(@click='goMainForm',icon='menu') MAIN
  el-button(type='text',@click='backFileList',icon='arrow-left') BACK
  .disk-table(v-loading="isLoading")
    file-list(pre_='')
</template>

<script>
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
	    this.$restAPI.filelist(token,uk,path,(data)=>{this.$message.error(data.message)})
      .then(list=>{
        this.curPath.push(path);
        this.filescount = list.length;
        this.Bus.$emit('showfilelist', list);
        this.isLoading = false;
      });
    },
    downfiles:function(files){
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
	    this.$restAPI.downfiles(token,uk,files,(data)=>{this.$message.error(data.message)})
      .then(data=>{
        this.Bus.$emit('showdownlinks', data);
      });
    },
    goMainForm:function(){
      this.Bus.$emit('gomain','back');
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
    this.Bus.$on('changepath',file=>{
      this.goFileList(file.path);
    });
    this.Bus.$on('downfiles',files=>{
      this.downfiles(files);
    });
  },
  mounted(){
    this.goFileList('/');
  }
}
</script>