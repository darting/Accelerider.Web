<template lang="pug">
.disk
  el-row
    el-col(v-bind:span='8')
      el-breadcrumb(separator=">",v-bind:replace='true')
        el-breadcrumb-item(v-for='p in parseBreadCrumb(curPath)',key = 'p')
          | {{p}}
    el-col(v-bind:span='4')
      span Total: {{filescount}}
  el-row
    el-button(type='text',@click='backFileList',icon='arrow-left') BACK
  el-row
    el-col.flist(v-loading="isLoading")
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
	    this.$restAPI.filelist(token,uk,path)
      .then(list=>{
        this.curPath.push(path);
        this.filescount = list.length;
        this.Bus.$emit('showfilelist', list);
        this.isLoading = false;
      })
      .catch((e)=>{
        this.isLoading = false;
        this.$message.error(e.message)});
    },
    downfiles:function(files){
      const token = sessionStorage.getItem('accessToken');
      const uk = sessionStorage.getItem('accessUk');
	    this.$restAPI.downfiles(token,uk,files)
      .then(linksObj=>{
        this.Bus.$emit('showdownlinks', linksObj);
      })
      .catch((e)=>this.$message.error(e.message));
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

<style scoped>
.flist{
  height:100%;
  overflow: auto;
}
</style>